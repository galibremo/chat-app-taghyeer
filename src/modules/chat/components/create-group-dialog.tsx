"use client";

import React, { useState } from "react";
import {
  useCreateGroupMutation,
  useUserSearchQuery,
} from "../actions/chat.mutations";
import { User } from "../types/chat.types";
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

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConversation: (conversationId: string) => void;
}

export function CreateGroupDialog({
  isOpen,
  onClose,
  onSelectConversation,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const { data: searchedUsers, isLoading } = useUserSearchQuery(searchTerm);
  const createGroupMutation = useCreateGroupMutation();

  const toggleSelectUser = (user: User) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
      setSearchTerm("");
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || selectedUsers.length === 0) return;

    createGroupMutation.mutate(
      {
        name: groupName.trim(),
        participantIds: selectedUsers.map((u) => u._id),
      },
      {
        onSuccess: (rawGroup) => {
          onSelectConversation(rawGroup._id);
          onClose();
          setGroupName("");
          setSearchTerm("");
          setSelectedUsers([]);
        },
      },
    );
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <DialogHeader>
        <div>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Name your group and add team members
          </DialogDescription>
        </div>
        <DialogClose onClick={onClose} />
      </DialogHeader>

      <form onSubmit={handleCreateGroup} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Group Name *
          </label>
          <Input
            type="text"
            placeholder="e.g. Product Team, Launch Squad..."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        {selectedUsers.length > 0 && (
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Selected Members ({selectedUsers.length})
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
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
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Search & Add Members *
          </label>
          <Input
            type="text"
            placeholder="Search by user name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            const isSelected = selectedUsers.some((sel) => sel._id === u._id);
            return (
              <button
                type="button"
                key={u._id}
                onClick={() => toggleSelectUser(u)}
                className={`cursor-pointer w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors border ${
                  isSelected
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
                  {isSelected ? "✓ Added" : "+ Add"}
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
            disabled={
              !groupName.trim() ||
              selectedUsers.length === 0 ||
              createGroupMutation.isPending
            }
            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {createGroupMutation.isPending ? "Creating..." : "Create Group"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
