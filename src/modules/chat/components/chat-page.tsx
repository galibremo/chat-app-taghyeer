"use client";

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useConversationsQuery } from "../actions/chat.mutations";
import { ChatSidebar } from "./chat-sidebar";
import { ChatFeed } from "./chat-feed";
import { ChatDetailsPanel } from "./chat-details-panel";
import { NewChatDialog } from "./new-chat-dialog";
import { CreateGroupDialog } from "./create-group-dialog";
import { AddMembersDialog } from "./add-members-dialog";

export function ChatPage() {
  const { data: conversations = [], isLoading } = useConversationsQuery();

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Dialog states
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);

  const effectiveConversationId =
    activeConversationId ?? conversations[0]?._id ?? null;

  const activeConversation =
    conversations.find((c) => c._id === effectiveConversationId) || null;

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Left Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={effectiveConversationId}
        onSelectConversation={(id) => setActiveConversationId(id)}
        onOpenNewChat={() => setIsNewChatOpen(true)}
        onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
        isLoading={isLoading}
      />

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

      {/* Dialogs directly in components */}
      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onSelectConversation={(id) => setActiveConversationId(id)}
      />

      <CreateGroupDialog
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onSelectConversation={(id) => setActiveConversationId(id)}
      />

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

export default ChatPage;
