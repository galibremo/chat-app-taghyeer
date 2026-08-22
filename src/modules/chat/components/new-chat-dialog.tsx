"use client";

import { useState } from "react";
import {
  useStartDirectMutation,
  useUserSearchQuery,
} from "../actions/chat.mutations";
import { User } from "../types/chat.types";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NewChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConversation: (conversationId: string) => void;
}

export function NewChatDialog({
  isOpen,
  onClose,
  onSelectConversation,
}: NewChatDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, isLoading } = useUserSearchQuery(searchTerm);
  const startDirectMutation = useStartDirectMutation();

  const handleSelectUser = (user: User) => {
    startDirectMutation.mutate(user._id, {
      onSuccess: (rawConv) => {
        onSelectConversation(rawConv._id);
        onClose();
        setSearchTerm("");
      },
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <div>
          <DialogTitle>Start New Direct Chat</DialogTitle>
          <DialogDescription>
            Search users by name or phone number
          </DialogDescription>
        </div>
        <DialogClose onClick={onClose} />
      </DialogHeader>

      <div className="pt-2">
        <Input
          type="text"
          placeholder="Type name or phone e.g. 01744..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-background border-input text-foreground"
          autoFocus
        />
      </div>

      <div className="max-h-64 overflow-y-auto space-y-1.5 pt-2">
        {isLoading && (
          <div className="text-center py-6 text-xs text-muted-foreground animate-pulse">
            Searching users...
          </div>
        )}

        {!isLoading && searchTerm.trim().length < 2 && (
          <div className="text-center py-6 text-xs text-muted-foreground">
            Type at least 2 characters to search
          </div>
        )}

        {!isLoading &&
          searchTerm.trim().length >= 2 &&
          (!users || users.length === 0) && (
            <div className="text-center py-6 text-xs text-muted-foreground">
              No registered users found matching &quot;{searchTerm}&quot;
            </div>
          )}

        {users?.map((u) => (
          <button
            key={u._id}
            onClick={() => handleSelectUser(u)}
            disabled={startDirectMutation.isPending}
            className="cursor-pointer w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent/60 border border-transparent hover:border-border transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <Avatar size="md" className="bg-primary text-primary-foreground">
                <AvatarFallback className="text-primary-foreground">
                  {u.name ? u.name.charAt(0).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary">
                  {u.name}
                </div>
                <div className="text-xs text-muted-foreground">{u.phone}</div>
              </div>
            </div>
            <span className="text-xs text-primary font-medium group-hover:translate-x-0.5 transition-transform">
              Chat →
            </span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
