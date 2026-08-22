/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Message {
  id: string;
  sender: "customer" | "agent" | "ai";
  text: string;
  time: string;
  status?: "sent" | "read" | "draft";
}

export interface ChatChannel {
  id: string;
  name: string;
  icon: string;
  handle: string;
  unreadCount: number;
  lastMessage: string;
  messages: Message[];
}
