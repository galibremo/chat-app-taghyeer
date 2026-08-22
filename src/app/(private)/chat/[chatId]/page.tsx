"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useConversationsQuery } from "@/modules/chat/actions/chat.mutations";
import { ChatFeed } from "@/modules/chat/components/chat-feed";
import { ChatDetailsPanel } from "@/modules/chat/components/chat-details-panel";
import { AddMembersDialog } from "@/modules/chat/components/add-members-dialog";

export default function ChatRoomPage() {
  const params = useParams();
  const chatId = typeof params?.chatId === "string" ? params.chatId : "";

  const { data: conversations = [], isLoading } = useConversationsQuery();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);

  const activeConversation =
    conversations.find((c) => c._id === chatId) || null;

  return (
    <div className="flex-1 flex h-full w-full relative overflow-hidden bg-background">
      {/* Center Chat Feed */}
      <ChatFeed
        conversation={activeConversation}
        onToggleDetails={() => setIsDetailsOpen((prev) => !prev)}
        isDetailsOpen={isDetailsOpen}
      />

      {/* Right Details Panel */}
      <AnimatePresence>
        {isDetailsOpen && activeConversation && (
          <ChatDetailsPanel
            key={activeConversation._id}
            conversation={activeConversation}
            onClose={() => setIsDetailsOpen(false)}
            onOpenAddMembers={() => setIsAddMembersOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Add Members Dialog */}
      {activeConversation && activeConversation.type === "group" && (
        <AddMembersDialog
          isOpen={isAddMembersOpen}
          onClose={() => setIsAddMembersOpen(false)}
          conversation={activeConversation}
        />
      )}
    </div>
  );
}
