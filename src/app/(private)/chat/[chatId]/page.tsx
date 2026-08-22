import type { Metadata } from "next";
import { ChatRoomClient } from "@/modules/chat/components/chat-room-client";

type Props = {
  params: Promise<{ chatId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chatId } = await params;
  return {
    title: "Chat Room",
    description: `Real-time chat conversation room (${chatId}) on ChatFlow.`,
    openGraph: {
      title: "Chat Room | ChatFlow",
      description: `Real-time chat conversation room (${chatId}) on ChatFlow.`,
    },
  };
}

export default async function ChatRoomPage({ params }: Props) {
  const { chatId } = await params;
  return <ChatRoomClient chatId={chatId} />;
}
