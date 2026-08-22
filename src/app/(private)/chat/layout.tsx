"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useConversationsQuery } from "@/modules/chat/actions/chat.mutations";
import { ChatSidebar } from "@/modules/chat/components/chat-sidebar";
import { NewChatDialog } from "@/modules/chat/components/new-chat-dialog";
import { CreateGroupDialog } from "@/modules/chat/components/create-group-dialog";
import { cn } from "@/lib/utils";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: conversations = [], isLoading } = useConversationsQuery();

  // Extract active conversation ID from URL path (e.g., /chat/123 -> 123)
  const isChatRoom = pathname !== "/chat" && pathname !== "/chat/";
  const activeConversationId = isChatRoom ? pathname.split("/chat/")[1] || null : null;

  // Dialog states
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const handleSelectConversation = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Left Sidebar */}
      <div
        className={cn(
          "w-full md:w-80 lg:w-96 flex flex-col h-full bg-background border-r border-border select-none shrink-0",
          isChatRoom && "hidden md:flex"
        )}
      >
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onOpenNewChat={() => setIsNewChatOpen(true)}
          onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 h-full overflow-hidden flex flex-col",
          !isChatRoom && "hidden md:flex"
        )}
      >
        {children}
      </div>

      {/* Shared Dialogs */}
      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onSelectConversation={handleSelectConversation}
      />

      <CreateGroupDialog
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onSelectConversation={handleSelectConversation}
      />
    </div>
  );
}
