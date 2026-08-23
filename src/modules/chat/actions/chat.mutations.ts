"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "@/providers/auth-provider";
import {
  addGroupParticipants,
  createGroup,
  getConversations,
  getMessages,
  promoteGroupAdmin,
  removeGroupParticipant,
  renameGroup,
  searchUsers,
  sendMessage,
  startDirectConversation,
} from "./chat.actions";
import {
  normalizeConversation,
  normalizeMessage,
  sortConversations,
  updateConversationsList,
} from "../utils/normalize";
import {
  NormalizedConversation,
  NormalizedMessage,
  RawConversation,
  User,
} from "../types/chat.types";

export const CHAT_QUERY_KEYS = {
  conversations: ["conversations"] as const,
  messages: (conversationId: string) => ["messages", conversationId] as const,
  userSearch: (query: string) => ["users", "search", query] as const,
};

export interface MessagesPage {
  messages: NormalizedMessage[];
  hasMore: boolean;
}

/**
 * Hook to fetch and normalize user conversations
 */
export function useConversationsQuery() {
  const { user } = useAuth();
  const currentUserId = user?._id;

  return useQuery({
    queryKey: CHAT_QUERY_KEYS.conversations,
    queryFn: async () => {
      const raw = await getConversations();
      const normalized = raw.map((conv) => normalizeConversation(conv, currentUserId));
      return sortConversations(normalized);
    },
    enabled: Boolean(currentUserId),
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Hook to fetch message history for an active conversation with infinite pagination
 */
export function useMessagesQuery(conversationId: string | null) {
  return useInfiniteQuery<MessagesPage>({
    queryKey: CHAT_QUERY_KEYS.messages(conversationId || ""),
    queryFn: async ({ pageParam }) => {
      if (!conversationId) return { messages: [], hasMore: false };
      const response = await getMessages(
        conversationId,
        20,
        pageParam as string | undefined,
      );
      const normalizedMessages = response.messages
        .map(normalizeMessage)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      return {
        messages: normalizedMessages,
        hasMore: response.hasMore,
      };
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || lastPage.messages.length === 0) return undefined;
      // Index 0 is the oldest message in lastPage because messages are sorted ascending by createdAt
      return lastPage.messages[0]._id;
    },
    enabled: Boolean(conversationId),
  });
}

/**
 * Hook for global user search
 */
export function useUserSearchQuery(searchTerm: string) {
  return useQuery<User[]>({
    queryKey: CHAT_QUERY_KEYS.userSearch(searchTerm),
    queryFn: () => searchUsers(searchTerm),
    enabled: searchTerm.trim().length >= 2,
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to start a direct 1-to-1 conversation
 */
export function useStartDirectMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (userId: string) => startDirectConversation(userId),
    onSuccess: (newRawConv) => {
      const normalized = normalizeConversation(newRawConv, user?._id);
      queryClient.setQueryData<NormalizedConversation[]>(
        CHAT_QUERY_KEYS.conversations,
        (old = []) => updateConversationsList(old, normalized),
      );
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.conversations,
      });
    },
  });
}

/**
 * Hook to create a group conversation
 */
export function useCreateGroupMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({
      name,
      participantIds,
    }: {
      name: string;
      participantIds: string[];
    }) => createGroup(name, participantIds),
    onSuccess: (rawGroup) => {
      const normalized = normalizeConversation(rawGroup, user?._id);
      queryClient.setQueryData<NormalizedConversation[]>(
        CHAT_QUERY_KEYS.conversations,
        (old = []) => updateConversationsList(old, normalized),
      );
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.conversations,
      });
    },
  });
}

/**
 * Hook to send a message via REST with optimistic UI update
 */
export function useSendMessageMutation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({
      conversationId,
      text,
    }: {
      conversationId: string;
      text: string;
    }) => sendMessage(conversationId, text),
    onMutate: async ({ conversationId, text }) => {
      await queryClient.cancelQueries({
        queryKey: CHAT_QUERY_KEYS.messages(conversationId),
      });

      const previousMessagesData = queryClient.getQueryData<
        InfiniteData<MessagesPage>
      >(CHAT_QUERY_KEYS.messages(conversationId));

      const previousConversationsData = queryClient.getQueryData<NormalizedConversation[]>(
        CHAT_QUERY_KEYS.conversations,
      );

      const optimisticMsg: NormalizedMessage = {
        _id: `temp-${Date.now()}`,
        conversation: conversationId,
        sender: user?._id || "",
        text,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      if (previousMessagesData) {
        queryClient.setQueryData<InfiniteData<MessagesPage>>(
          CHAT_QUERY_KEYS.messages(conversationId),
          (old) => {
            if (!old || !old.pages.length) {
              return {
                pages: [{ messages: [optimisticMsg], hasMore: false }],
                pageParams: [undefined],
              };
            }
            const firstPage = old.pages[0];
            const updatedFirstPage: MessagesPage = {
              ...firstPage,
              messages: [...firstPage.messages, optimisticMsg],
            };
            return {
              ...old,
              pages: [updatedFirstPage, ...old.pages.slice(1)],
            };
          },
        );
      }

      if (previousConversationsData) {
        queryClient.setQueryData<NormalizedConversation[]>(
          CHAT_QUERY_KEYS.conversations,
          (old = []) => {
            const existingConv = old.find((c) => c._id === conversationId);
            if (!existingConv) return old;
            const updatedConv: NormalizedConversation = {
              ...existingConv,
              lastMessage: optimisticMsg,
              updatedAt: optimisticMsg.createdAt,
            };
            return updateConversationsList(old, updatedConv);
          },
        );
      }

      return { previousMessagesData, previousConversationsData };
    },
    onError: (err, variables, context) => {
      if (context?.previousMessagesData) {
        queryClient.setQueryData(
          CHAT_QUERY_KEYS.messages(variables.conversationId),
          context.previousMessagesData,
        );
      }
      if (context?.previousConversationsData) {
        queryClient.setQueryData(
          CHAT_QUERY_KEYS.conversations,
          context.previousConversationsData,
        );
      }
    },
    onSuccess: (savedRawMsg, variables) => {
      const normalized = normalizeMessage(savedRawMsg);

      queryClient.setQueryData<InfiniteData<MessagesPage>>(
        CHAT_QUERY_KEYS.messages(variables.conversationId),
        (old) => {
          if (!old || !old.pages.length) {
            return {
              pages: [{ messages: [normalized], hasMore: false }],
              pageParams: [undefined],
            };
          }

          const firstPage = old.pages[0];
          const tempIdx = firstPage.messages.findIndex(
            (m) =>
              m._id.startsWith("temp-") ||
              (m.text === normalized.text && m.sender === normalized.sender),
          );

          let updatedMessages: NormalizedMessage[];
          if (tempIdx !== -1) {
            updatedMessages = [...firstPage.messages];
            updatedMessages[tempIdx] = normalized;
          } else if (firstPage.messages.some((m) => m._id === normalized._id)) {
            return old;
          } else {
            updatedMessages = [...firstPage.messages, normalized];
          }

          const updatedFirstPage: MessagesPage = {
            ...firstPage,
            messages: updatedMessages,
          };

          return {
            ...old,
            pages: [updatedFirstPage, ...old.pages.slice(1)],
          };
        },
      );

      queryClient.setQueryData<NormalizedConversation[]>(
        CHAT_QUERY_KEYS.conversations,
        (old = []) => {
          const existingConv = old.find((c) => c._id === variables.conversationId);
          if (!existingConv) return old;
          const updatedConv: NormalizedConversation = {
            ...existingConv,
            lastMessage: normalized,
            updatedAt: normalized.createdAt,
          };
          return updateConversationsList(old, updatedConv);
        },
      );
    },
  });
}

function useUpdateGroupMutation<T>(
  mutationFn: (args: T) => Promise<RawConversation>,
) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn,
    onSuccess: (updatedRawGroup) => {
      const normalized = normalizeConversation(updatedRawGroup, user?._id);
      queryClient.setQueryData<NormalizedConversation[]>(
        CHAT_QUERY_KEYS.conversations,
        (old = []) => updateConversationsList(old, normalized),
      );
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEYS.conversations,
      });
    },
  });
}

export function useAddGroupParticipantsMutation() {
  return useUpdateGroupMutation<{ conversationId: string; userIds: string[] }>(
    ({ conversationId, userIds }) =>
      addGroupParticipants(conversationId, userIds),
  );
}

export function useRemoveGroupParticipantMutation() {
  return useUpdateGroupMutation<{ conversationId: string; userId: string }>(
    ({ conversationId, userId }) =>
      removeGroupParticipant(conversationId, userId),
  );
}

export function usePromoteAdminMutation() {
  return useUpdateGroupMutation<{ conversationId: string; userId: string }>(
    ({ conversationId, userId }) => promoteGroupAdmin(conversationId, userId),
  );
}

export function useRenameGroupMutation() {
  return useUpdateGroupMutation<{ conversationId: string; name: string }>(
    ({ conversationId, name }) => renameGroup(conversationId, name),
  );
}
