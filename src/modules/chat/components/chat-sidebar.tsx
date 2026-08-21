"use client";

import { useState } from "react";
import { useSocket } from "@/providers/socket-provider";
import { useAuth } from "@/providers/auth-provider";
import { useLogout } from "@/modules/auth/login/actions/login.mutations";
import { NormalizedConversation } from "../types/chat.types";

interface ChatSidebarProps {
  conversations: NormalizedConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onOpenNewChat: () => void;
  onOpenCreateGroup: () => void;
  isLoading: boolean;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onOpenNewChat,
  onOpenCreateGroup,
  isLoading,
}: ChatSidebarProps) {
  const { user, logout } = useAuth();
  const { isConnected, isConnecting } = useSocket();
  const [filterText, setFilterText] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "direct" | "group">("all");

  const filteredConversations = conversations.filter((c) => {
    // Tab filter
    if (activeTab === "direct" && c.type !== "direct") return false;
    if (activeTab === "group" && c.type !== "group") return false;

    // Text search filter
    if (!filterText.trim()) return true;
    const query = filterText.toLowerCase();
    const matchesName = c.name.toLowerCase().includes(query);
    const matchesLastMsg = c.lastMessage?.text.toLowerCase().includes(query);
    return matchesName || matchesLastMsg;
  });

  const formatTimestamp = (isoDate: string) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-zinc-950 border-r border-zinc-800/80 select-none">
      {/* Header Profile Bar */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${
                isConnected
                  ? "bg-emerald-500 shadow-emerald-500/50 shadow-sm"
                  : isConnecting
                    ? "bg-amber-500 animate-pulse"
                    : "bg-rose-500"
              }`}
              title={
                isConnected
                  ? "Real-time socket connected"
                  : isConnecting
                    ? "Connecting socket..."
                    : "Socket disconnected"
              }
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-zinc-100 truncate">
              {user?.name || "User"}
            </h2>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span
                className={`font-medium ${
                  isConnected
                    ? "text-emerald-400"
                    : isConnecting
                      ? "text-amber-400"
                      : "text-rose-400"
                }`}
              >
                {isConnected
                  ? "Online"
                  : isConnecting
                    ? "Connecting..."
                    : "Offline"}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 truncate">{user?.phone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          title="Log out"
          className="p-2 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-zinc-800/80 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

      {/* Action Buttons & Search */}
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenNewChat}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98]"
          >
            <span>+ Direct</span>
          </button>
          <button
            onClick={onOpenCreateGroup}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700/50 transition-all active:scale-[0.98]"
          >
            <span>+ Group</span>
          </button>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2 pl-9 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <svg
            className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-zinc-900/70 p-1 rounded-xl border border-zinc-800/60 text-xs font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-1 rounded-lg transition-colors ${
              activeTab === "all"
                ? "bg-zinc-800 text-white shadow-sm"
                : "hover:text-zinc-200"
            }`}
          >
            All ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab("direct")}
            className={`flex-1 py-1 rounded-lg transition-colors ${
              activeTab === "direct"
                ? "bg-zinc-800 text-white shadow-sm"
                : "hover:text-zinc-200"
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setActiveTab("group")}
            className={`flex-1 py-1 rounded-lg transition-colors ${
              activeTab === "group"
                ? "bg-zinc-800 text-white shadow-sm"
                : "hover:text-zinc-200"
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {isLoading && (
          <div className="space-y-2 p-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-16 rounded-xl bg-zinc-900/60 animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && filteredConversations.length === 0 && (
          <div className="text-center py-12 px-4 space-y-2">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto text-zinc-500 text-xl">
              💬
            </div>
            <p className="text-xs font-medium text-zinc-400">
              No conversations found
            </p>
            <p className="text-[11px] text-zinc-600">
              Start a new direct chat or create a group to begin messaging.
            </p>
          </div>
        )}

        {filteredConversations.map((c) => {
          const isActive = c._id === activeConversationId;
          const isGroup = c.type === "group";

          return (
            <button
              key={c._id}
              onClick={() => onSelectConversation(c._id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group border ${
                isActive
                  ? "bg-linear-to-r from-indigo-950/80 to-zinc-900 text-white border-indigo-500/40 shadow-sm"
                  : "hover:bg-zinc-900/80 text-zinc-300 border-transparent hover:border-zinc-800/50"
              }`}
            >
              <div className="relative">
                {isGroup ? (
                  <div className="w-11 h-11 rounded-xl bg-linear-to-br from-purple-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-md text-sm">
                    👥
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-md text-sm">
                    {c.name ? c.name.charAt(0).toUpperCase() : "D"}
                  </div>
                )}

                {isGroup && (
                  <span className="absolute -top-1 -right-1 bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300 font-semibold px-1 rounded-full">
                    {c.participants.length}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`text-sm font-semibold truncate ${
                      isActive
                        ? "text-white"
                        : "text-zinc-200 group-hover:text-white"
                    }`}
                  >
                    {c.name}
                  </span>
                  {c.lastMessage && (
                    <span className="text-[10px] text-zinc-500 font-medium">
                      {formatTimestamp(c.lastMessage.createdAt)}
                    </span>
                  )}
                </div>

                <div className="text-xs text-zinc-400 truncate font-normal">
                  {c.lastMessage ? (
                    <span>{c.lastMessage.text}</span>
                  ) : (
                    <span className="italic text-zinc-500">
                      No messages yet
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
