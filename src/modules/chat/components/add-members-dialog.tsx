"use client";

import React, { useState } from "react";
import { useAddGroupParticipantsMutation, useUserSearchQuery } from "../actions/chat.mutations";
import { NormalizedConversation, User } from "../types/chat.types";

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

  if (!isOpen) return null;

  const existingMemberIds = new Set(conversation.participants.map((p) => p._id));

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">Add Group Members</h3>
            <p className="text-xs text-zinc-400">Add new participants to &quot;{conversation.name}&quot;</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleAddMembers} className="space-y-4">
          {selectedUsers.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                New Members to Add ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-1.5 p-1 max-h-24 overflow-y-auto">
                {selectedUsers.map((u) => (
                  <span
                    key={u._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-200 border border-indigo-700/50"
                  >
                    {u.name}
                    <button
                      type="button"
                      onClick={() => toggleSelectUser(u)}
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Search users by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1 border border-zinc-800 rounded-xl p-2 bg-zinc-950/50">
            {isLoading && (
              <div className="text-center py-4 text-xs text-zinc-500 animate-pulse">
                Searching users...
              </div>
            )}

            {!isLoading && searchTerm.trim().length < 2 && (
              <div className="text-center py-4 text-xs text-zinc-500">
                Type at least 2 characters to search users
              </div>
            )}

            {!isLoading && searchTerm.trim().length >= 2 && (!searchedUsers || searchedUsers.length === 0) && (
              <div className="text-center py-4 text-xs text-zinc-500">
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
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                    isAlreadyMember
                      ? "opacity-50 cursor-not-allowed bg-zinc-900 text-zinc-500"
                      : isSelected
                        ? "bg-indigo-900/40 text-indigo-200 border border-indigo-700/50"
                        : "hover:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center font-semibold text-white">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-200">{u.name}</div>
                      <div className="text-[10px] text-zinc-400">{u.phone}</div>
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

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedUsers.length === 0 || addMembersMutation.isPending}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all shadow-md shadow-indigo-600/30"
            >
              {addMembersMutation.isPending ? "Adding..." : "Add Members"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
