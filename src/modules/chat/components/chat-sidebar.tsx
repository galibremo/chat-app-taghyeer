"use client";

import { useState } from "react";
import {
  Logout01Icon,
  Search01Icon,
  UserGroupIcon,
  Add01Icon,
} from "hugeicons-react";

import { useSocket } from "@/providers/socket-provider";
import { useAuth } from "@/providers/auth-provider";
import { NormalizedConversation } from "../types/chat.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    if (activeTab === "direct" && c.type !== "direct") return false;
    if (activeTab === "group" && c.type !== "group") return false;

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
    <div className="w-full flex flex-col h-full bg-background select-none">
      {/* Header Profile Bar */}
      <div className="p-3.5 border-b border-border flex items-center justify-between bg-card text-card-foreground">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar size="md" className="bg-primary text-primary-foreground">
              <AvatarFallback className="text-primary-foreground">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background ${
                isConnected
                  ? "bg-emerald-500 shadow-emerald-500/50 shadow-xs"
                  : isConnecting
                    ? "bg-amber-500 animate-pulse"
                    : "bg-destructive"
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
            <h2 className="text-sm font-semibold text-foreground truncate">
              {user?.name || "User"}
            </h2>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span
                className={`font-medium ${
                  isConnected
                    ? "text-emerald-500"
                    : isConnecting
                      ? "text-amber-500"
                      : "text-destructive"
                }`}
              >
                {isConnected
                  ? "Online"
                  : isConnecting
                    ? "Connecting..."
                    : "Offline"}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground truncate">
                {user?.phone}
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={logout}
          title="Log out"
          className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-accent"
        >
          <Logout01Icon className="w-5 h-5" />
        </Button>
      </div>

      {/* Action Buttons & Search */}
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onOpenNewChat}
            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold shadow-xs"
          >
            <Add01Icon className="w-3.5 h-3.5" />
            <span>Direct</span>
          </Button>
          <Button
            variant="secondary"
            onClick={onOpenCreateGroup}
            className="cursor-pointer text-secondary-foreground text-xs font-semibold border border-border"
          >
            <UserGroupIcon className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Group</span>
          </Button>
        </div>

        {/* Filter Input */}
        <div className="relative flex items-center">
          <Search01Icon className="w-4 h-4 text-muted-foreground absolute left-3 z-10" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-9 bg-background border-input text-foreground"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex bg-muted/50 p-1 rounded-xl border border-border text-xs font-medium text-muted-foreground">
          <button
            onClick={() => setActiveTab("all")}
            className={`cursor-pointer flex-1 py-1 rounded-lg transition-colors ${
              activeTab === "all"
                ? "bg-background text-foreground shadow-xs"
                : "hover:text-foreground hover:bg-accent"
            }`}
          >
            All ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab("direct")}
            className={`cursor-pointer flex-1 py-1 rounded-lg transition-colors ${
              activeTab === "direct"
                ? "bg-background text-foreground shadow-xs"
                : "hover:text-foreground hover:bg-accent"
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setActiveTab("group")}
            className={`cursor-pointer flex-1 py-1 rounded-lg transition-colors ${
              activeTab === "group"
                ? "bg-background text-foreground shadow-xs"
                : "hover:text-foreground hover:bg-accent"
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Conversations Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {isLoading && (
          <div className="p-4 text-center text-xs text-muted-foreground animate-pulse">
            Loading chats...
          </div>
        )}

        {!isLoading && filteredConversations.length === 0 && (
          <div className="p-8 text-center text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">No chats found</p>
            <p className="text-[11px]">Start a new direct chat or group!</p>
          </div>
        )}

        {filteredConversations.map((conv) => {
          const isActive = conv._id === activeConversationId;
          const isGroup = conv.type === "group";

          return (
            <button
              key={conv._id}
              onClick={() => onSelectConversation(conv._id)}
              className={`cursor-pointer w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all duration-150 border ${
                isActive
                  ? "bg-accent text-accent-foreground border-border font-medium"
                  : "bg-transparent hover:bg-accent/50 text-foreground border-transparent"
              }`}
            >
              {/* Conversation Avatar */}
              <div className="relative shrink-0">
                {isGroup ? (
                  <Avatar
                    size="lg"
                    className="bg-primary text-primary-foreground"
                  >
                    <AvatarFallback className="text-primary-foreground">
                      <UserGroupIcon className="w-5 h-5 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar
                    size="lg"
                    className="bg-secondary text-secondary-foreground"
                  >
                    <AvatarFallback className="text-secondary-foreground">
                      {conv.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>

              {/* Info & Last Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3
                    className={`text-xs font-bold truncate ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {conv.name}
                  </h3>
                  <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                    {formatTimestamp(conv.updatedAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <p className="text-[11px] text-muted-foreground truncate">
                    {conv.lastMessage?.text || (
                      <span className="italic text-muted-foreground/60">
                        No messages yet
                      </span>
                    )}
                  </p>

                  {isGroup && (
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0.2 text-[9px] shrink-0"
                    >
                      Group
                    </Badge>
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
