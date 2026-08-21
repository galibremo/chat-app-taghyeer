/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  badge?: string;
  isUpcoming?: boolean;
}

export interface RoadmapPhase {
  stage: string;
  title: string;
  status: string;
  description: string;
  items: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface Message {
  id: string;
  sender: 'customer' | 'agent' | 'ai';
  text: string;
  time: string;
  status?: 'sent' | 'read' | 'draft';
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
