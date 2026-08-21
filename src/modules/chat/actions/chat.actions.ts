import { fetchClient } from "@/lib/api/client";
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
    url: "/conversations",
    method: "GET",
  });
}

export async function searchUsers(query: string): Promise<User[]> {
  if (!query.trim()) return [];
  return fetchClient<User[]>({
    url: "/users/search",
    method: "GET",
    params: { q: query.trim() },
  });
}

export async function startDirectConversation(userId: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: "/conversations",
    method: "POST",
    body: { userId },
  });
}

export async function createGroup(name: string, participantIds: string[]): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: "/conversations/group",
    method: "POST",
    body: { name: name.trim(), participantIds },
  });
}

export async function getMessages(conversationId: string, limit = 50): Promise<GetMessagesResponse> {
  return fetchClient<GetMessagesResponse>({
    url: `/conversations/${conversationId}/messages`,
    method: "GET",
    params: { limit },
  });
}

export async function sendMessage(conversationId: string, text: string): Promise<RawMessage> {
  return fetchClient<RawMessage>({
    url: "/messages",
    method: "POST",
    body: { conversationId, text: text.trim() },
  });
}

export async function addGroupParticipants(conversationId: string, userIds: string[]): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: `/conversations/${conversationId}/participants`,
    method: "POST",
    body: { userIds },
  });
}

export async function removeGroupParticipant(conversationId: string, userId: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: `/conversations/${conversationId}/participants/${userId}`,
    method: "DELETE",
  });
}

export async function promoteGroupAdmin(conversationId: string, userId: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: `/conversations/${conversationId}/admins`,
    method: "POST",
    body: { userId },
  });
}

export async function renameGroup(conversationId: string, name: string): Promise<RawConversation> {
  return fetchClient<RawConversation>({
    url: `/conversations/${conversationId}`,
    method: "PATCH",
    body: { name: name.trim() },
  });
}
