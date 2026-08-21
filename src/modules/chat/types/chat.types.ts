/**
 * Core Data Models for Chat System
 */

export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface RawMessage {
  _id?: string;
  id?: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: string | number;
}

export interface NormalizedMessage {
  _id: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: string; // ISO 8601 string format
  status?: "pending" | "sent" | "failed";
}

export interface RawDirectConversation {
  _id: string;
  type?: "direct";
  participant?: User;
  participants?: string[] | User[];
  lastMessage?: RawMessage | Record<string, never>;
  updatedAt?: string;
  createdAt?: string;
}

export interface RawGroupConversation {
  _id: string;
  type: "group";
  name: string;
  createdBy: string;
  admins: string[];
  participants: User[];
  lastMessage?: RawMessage | Record<string, never>;
  updatedAt: string;
  createdAt?: string;
}

export type RawConversation = RawDirectConversation | RawGroupConversation;

export interface NormalizedConversation {
  _id: string;
  type: "direct" | "group";
  name: string;
  participants: User[];
  participant?: User; // Present if type === 'direct'
  admins: string[];
  createdBy?: string;
  lastMessage: NormalizedMessage | null;
  updatedAt: string;
}

export interface SocketMessageNewPayload {
  id: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: number;
}

export interface SocketConversationUpdatedPayload {
  _id: string;
  type: "group";
  name: string;
  createdBy: string;
  admins: string[];
  participants: User[];
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
}

export interface CreateGroupPayload {
  name: string;
  participantIds: string[];
}
