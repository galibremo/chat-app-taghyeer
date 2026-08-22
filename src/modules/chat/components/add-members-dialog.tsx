"use client";

import React, { useState } from "react";
import {
  useAddGroupParticipantsMutation,
  useUserSearchQuery,
} from "../actions/chat.mutations";
import { NormalizedConversation, User } from "../types/chat.types";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AddMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: NormalizedConversation;
}

export function AddMembersDialog({
  isOpen,
  onClose,
  conversation,
}: AddMembersDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const { data: searchedUsers, isLoading } = useUserSearchQuery(searchTerm);
  const addMembersMutation = useAddGroupParticipantsMutation();

  const existingMemberIds = new Set(
    conversation.participants.map((p) => p._id),
  );

  const toggleSelectUser = (user: User) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleAddMembers = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUsers.length === 0) return;

    addMembersMutation.mutate(
      {
        conversationId: conversation._id,
        userIds: selectedUsers.map((u) => u._id),
      },
      {
        onSuccess: () => {
          onClose();
          setSearchTerm("");
          setSelectedUsers([]);
        },
      },
    );
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <div>
          <DialogTitle>Add Group Members</DialogTitle>
          <DialogDescription>
            Add new participants to &quot;{conversation.name}&quot;
          </DialogDescription>
        </div>
        <DialogClose onClick={onClose} />
      </DialogHeader>

      <form onSubmit={handleAddMembers} className="space-y-4 pt-2">
        {selectedUsers.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              New Members to Add ({selectedUsers.length})
            </label>
            <div className="flex flex-wrap gap-1.5 p-1 max-h-24 overflow-y-auto">
              {selectedUsers.map((u) => (
                <Badge
                  key={u._id}
                  variant="default"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs"
                >
                  {u.name}
                  <button
                    type="button"
                    onClick={() => toggleSelectUser(u)}
                    className="hover:text-primary-foreground/80 cursor-pointer font-bold"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <Input
            type="text"
            placeholder="Search users by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1 border border-border rounded-xl p-2 bg-background/50">
          {isLoading && (
            <div className="text-center py-4 text-xs text-muted-foreground animate-pulse">
              Searching users...
            </div>
          )}

          {!isLoading && searchTerm.trim().length < 2 && (
            <div className="text-center py-4 text-xs text-muted-foreground">
              Type at least 2 characters to search users
            </div>
          )}

          {!isLoading &&
            searchTerm.trim().length >= 2 &&
            (!searchedUsers || searchedUsers.length === 0) && (
              <div className="text-center py-4 text-xs text-muted-foreground">
                No users found matching &quot;{searchTerm}&quot;
              </div>
            )}

          {searchedUsers?.map((u) => {
            const isAlreadyMember = existingMemberIds.has(u._id);
            const isSelected = selectedUsers.some((sel) => sel._id === u._id);

            return (
              <button
                type="button"
                key={u._id}
                disabled={isAlreadyMember}
                onClick={() => !isAlreadyMember && toggleSelectUser(u)}
                className={`cursor-pointer w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors border ${
                  isAlreadyMember
                    ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground border-transparent"
                    : isSelected
                      ? "bg-accent text-accent-foreground border-border font-medium"
                      : "bg-transparent hover:bg-accent/50 text-foreground border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Avatar size="sm" className="bg-secondary text-secondary-foreground">
                    <AvatarFallback className="text-secondary-foreground">
                      {u.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.phone}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold">
                  {isAlreadyMember
                    ? "Already Member"
                    : isSelected
                      ? "✓ Selected"
                      : "+ Select"}
                </span>
              </button>
            );
          })}
        </div>

        <DialogFooter className="pt-2 border-t-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={selectedUsers.length === 0 || addMembersMutation.isPending}
            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {addMembersMutation.isPending ? "Adding..." : "Add Members"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
