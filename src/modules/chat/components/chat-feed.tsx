"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useSocket } from "@/providers/socket-provider";
import {
  useMessagesQuery,
  useSendMessageMutation,
} from "../actions/chat.mutations";
import { NormalizedConversation, NormalizedMessage } from "@/types/chat";

interface ChatFeedProps {
  conversation: NormalizedConversation | null;
  onToggleDetails: () => void;
  isDetailsOpen: boolean;
}

export function ChatFeed({
  conversation,
  onToggleDetails,
  isDetailsOpen,
}: ChatFeedProps) {
  const { user } = useAuth();
  const currentUserId = user?._id || "";

  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const conversationId = conversation?._id || null;
  const { data, isLoading } = useMessagesQuery(conversationId);
  const sendMessageMutation = useSendMessageMutation();

  const messages = data?.messages || [];

  // Map participant IDs to names for displaying senders in group chat
  const participantMap = React.useMemo(() => {
    const map = new Map<string, string>();
    if (conversation?.participants) {
      conversation.participants.forEach((p) => map.set(p._id, p.name));
    }
    return map;
  }, [conversation]);

  // Scroll to bottom on new message, status update, or conversation change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, conversationId]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-6 text-center select-none">
        <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-4xl mb-4 shadow-xl">
          💬
        </div>
        <h3 className="text-lg font-bold text-zinc-200">Your Messages</h3>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          Select an existing conversation from the sidebar or start a new
          direct/group chat.
        </p>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !conversationId) return;

    const textToSend = messageText.trim();
    setMessageText("");

    // Send via REST mutation (optimistic UI + server persistence)
    sendMessageMutation.mutate({ conversationId, text: textToSend });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const formatMessageTime = (isoString: string) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 relative overflow-hidden">
      {/* Header */}
      <div className="p-3.5 px-6 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          {conversation.type === "group" ? (
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-md">
              👥
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-md">
              {conversation.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-zinc-100">
              {conversation.name}
            </h3>
            <p className="text-[11px] text-zinc-400">
              {conversation.type === "group"
                ? `${conversation.participants.length} members`
                : conversation.participant?.phone || "Direct Chat"}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleDetails}
          className={`p-2 rounded-xl border transition-colors ${
            isDetailsOpen
              ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40"
              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
          }`}
          title="Toggle Info Drawer"
        >
          ℹ️ Details
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {isLoading && (
          <div className="text-center py-10 text-xs text-zinc-500 animate-pulse">
            Loading message history...
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-xs text-zinc-400">
              No messages in this chat yet
            </p>
            <p className="text-[11px] text-zinc-600">
              Send a message below to start the conversation!
            </p>
          </div>
        )}

        {messages.map((msg: NormalizedMessage) => {
          const isOwn = msg.sender === currentUserId;
          const senderName =
            participantMap.get(msg.sender) ||
            (isOwn ? user?.name || "You" : "User");

          if (isOwn) {
            return (
              <div key={msg._id} className="flex flex-col items-end space-y-1">
                {/* Outgoing Message Bubble (Text Only) */}
                <div className="max-w-[75%] md:max-w-[65%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed wrap-break-word shadow-md bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-br-xs">
                  {msg.text}
                </div>

                {/* Time & Status OUTSIDE the bubble */}
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 px-1">
                  <span>{formatMessageTime(msg.createdAt)}</span>
                  <span className="inline-flex items-center">
                    {msg.status === "pending" ? (
                      <span
                        className="w-2.5 h-2.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"
                        title="Sending..."
                      />
                    ) : (
                      <span
                        className="text-[11px] font-bold text-indigo-400"
                        title="Sent"
                      >
                        ✓
                      </span>
                    )}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg._id} className="flex items-start gap-2.5 max-w-[80%] md:max-w-[70%]">
              {/* Incoming Sender Avatar */}
              <div
                className="w-8 h-8 rounded-full bg-linear-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-sm shrink-0 mt-0.5"
                title={senderName}
              >
                {senderName.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col items-start space-y-1">
                {/* Incoming Message Bubble (Text Only) */}
                <div className="px-4 py-2.5 rounded-2xl text-xs leading-relaxed wrap-break-word shadow-md bg-zinc-800/90 border border-zinc-700/50 text-zinc-100 rounded-bl-xs">
                  {msg.text}
                </div>

                {/* Time OUTSIDE the bubble */}
                <div className="text-[10px] text-zinc-500 font-mono px-1">
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <div className="p-3 md:p-4 border-t border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${conversation.name}...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-2xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />

          <button
            type="submit"
            disabled={!messageText.trim()}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Send</span>
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
