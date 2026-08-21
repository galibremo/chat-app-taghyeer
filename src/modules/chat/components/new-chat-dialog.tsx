"use client";

import { useState } from "react";
import {
  useStartDirectMutation,
  useUserSearchQuery,
} from "../actions/chat.mutations";
import { User } from "../types/chat.types";

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100">
              Start New Direct Chat
            </h3>
            <p className="text-xs text-zinc-400">
              Search users by name or phone number
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Type name or phone e.g. 01744..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-1.5 pt-2">
          {isLoading && (
            <div className="text-center py-6 text-xs text-zinc-400 animate-pulse">
              Searching users...
            </div>
          )}

          {!isLoading && searchTerm.trim().length < 2 && (
            <div className="text-center py-6 text-xs text-zinc-500">
              Type at least 2 characters to search
            </div>
          )}

          {!isLoading &&
            searchTerm.trim().length >= 2 &&
            (!users || users.length === 0) && (
              <div className="text-center py-6 text-xs text-zinc-400">
                No registered users found matching &quot;{searchTerm}&quot;
              </div>
            )}

          {users?.map((u) => (
            <button
              key={u._id}
              onClick={() => handleSelectUser(u)}
              disabled={startDirectMutation.isPending}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/70 border border-transparent hover:border-zinc-700/50 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {u.name ? u.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-200 group-hover:text-white">
                    {u.name}
                  </div>
                  <div className="text-xs text-zinc-400">{u.phone}</div>
                </div>
              </div>
              <span className="text-xs text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                Chat →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
