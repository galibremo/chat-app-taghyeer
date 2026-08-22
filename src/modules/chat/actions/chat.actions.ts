import { fetchClient } from "@/lib/api/client";
import { apiRoute } from "@/routes/routes";
import {
  RawConversation,
  RawMessage,
  User,
} from "../types/chat.types";

export interface GetMessagesResponse {
  messages: RawMessage[];
  hasMore: boolean;
}

export async function getConversations(): Promise<RawConversation[]> {
  return fetchClient<RawConversation[]>({
    url: apiRoute.conversations.base,
    method: "GET",
  });
}

export async function searchUsers(query: string): Promise<User[]> {
  if (!query.trim()) return [];
  return fetchClient<User[]>({
    url: apiRoute.conversations.searchUsers,
    method: "GET",
    params: { q: query.trim() },
  });
}

export async function startDirectConversation(userId: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: apiRoute.conversations.base,
    method: "POST",
    body: { userId },
  });
}

export async function createGroup(name: string, participantIds: string[]): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: apiRoute.conversations.group,
    method: "POST",
    body: { name: name.trim(), participantIds },
  });
}

export async function getMessages(conversationId: string, limit = 50): Promise<GetMessagesResponse> {
  return fetchClient<GetMessagesResponse>({
    url: apiRoute.conversations.messages(conversationId),
    method: "GET",
    params: { limit },
  });
}

export async function sendMessage(conversationId: string, text: string): Promise<RawMessage> {
  return fetchClient<RawMessage>({
    url: apiRoute.messages.send,
    method: "POST",
    body: { conversationId, text: text.trim() },
  });
}

export async function addGroupParticipants(conversationId: string, userIds: string[]): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: apiRoute.conversations.participants(conversationId),
    method: "POST",
    body: { userIds },
  });
}

export async function removeGroupParticipant(conversationId: string, userId: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: apiRoute.conversations.participant(conversationId, userId),
    method: "DELETE",
  });
}

export async function promoteGroupAdmin(conversationId: string, userId: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: apiRoute.conversations.admins(conversationId),
    method: "POST",
    body: { userId },
  });
}

export async function renameGroup(conversationId: string, name: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: apiRoute.conversations.detail(conversationId),
    method: "PATCH",
    body: { name: name.trim() },
  });
}
