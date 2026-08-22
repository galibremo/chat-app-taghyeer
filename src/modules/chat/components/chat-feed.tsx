"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import {
  SentIcon,
  InformationCircleIcon,
  UserGroupIcon,
  CheckmarkBadge01Icon,
  ArrowLeft01Icon,
} from "hugeicons-react";

import { useAuth } from "@/providers/auth-provider";
import {
  useMessagesQuery,
  useSendMessageMutation,
} from "../actions/chat.mutations";
import { NormalizedConversation, NormalizedMessage } from "@/types/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  const router = useRouter();
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
      <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-6 text-center select-none">
        <div className="w-20 h-20 rounded-3xl bg-card border border-border flex items-center justify-center text-4xl mb-4 shadow-xl">
          💬
        </div>
        <h3 className="text-lg font-bold text-foreground">Your Messages</h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1">
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-border flex items-center justify-between bg-card text-card-foreground backdrop-blur-md z-10">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Back Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => router.push("/chat")}
            className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer shrink-0 mr-0.5"
            title="Back to conversations"
          >
            <ArrowLeft01Icon className="w-5 h-5" />
          </Button>

          {conversation.type === "group" ? (
            <Avatar size="md" className="bg-primary text-primary-foreground">
              <AvatarFallback className="text-primary-foreground">
                <UserGroupIcon className="w-5 h-5 text-primary-foreground" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar
              size="md"
              className="bg-secondary text-secondary-foreground"
            >
              <AvatarFallback className="text-secondary-foreground">
                {conversation.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div>
            <h3 className="text-sm font-bold text-foreground">
              {conversation.name}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              {conversation.type === "group"
                ? `${conversation.participants.length} members`
                : conversation.participant?.phone || "Direct Chat"}
            </p>
          </div>
        </div>

        <Button
          variant={isDetailsOpen ? "secondary" : "outline"}
          size="sm"
          onClick={onToggleDetails}
          className="cursor-pointer border text-xs font-semibold"
          title="Toggle Info Drawer"
        >
          <InformationCircleIcon className="w-4 h-4" />
          <span>Details</span>
        </Button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {isLoading && (
          <div className="text-center py-10 text-xs text-muted-foreground animate-pulse">
            Loading message history...
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-xs text-muted-foreground">
              No messages in this chat yet
            </p>
            <p className="text-[11px] text-muted-foreground/80">
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
                <div className="max-w-[75%] md:max-w-[65%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words shadow-xs bg-primary text-primary-foreground rounded-br-xs">
                  {msg.text}
                </div>

                {/* Time & Status OUTSIDE the bubble */}
                <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1.5 px-1">
                  <span>{formatMessageTime(msg.createdAt)}</span>
                  <span className="inline-flex items-center">
                    {msg.status === "pending" ? (
                      <span
                        className="w-2.5 h-2.5 border-2 border-primary border-t-transparent rounded-full animate-spin"
                        title="Sending..."
                      />
                    ) : (
                      <span title="Sent">
                        <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-primary" />
                      </span>
                    )}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg._id}
              className="flex items-start gap-2.5 max-w-[80%] md:max-w-[70%]"
            >
              {/* Incoming Sender Avatar */}
              <Avatar
                size="sm"
                className="bg-secondary text-secondary-foreground shrink-0 mt-0.5"
                title={senderName}
              >
                <AvatarFallback className="text-secondary-foreground">
                  {senderName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start space-y-1">
                {/* Incoming Message Bubble (Text Only) */}
                <div className="px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words shadow-xs bg-muted border border-border text-muted-foreground rounded-bl-xs">
                  {msg.text}
                </div>

                {/* Time OUTSIDE the bubble */}
                <div className="text-[10px] text-muted-foreground font-mono px-1">
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <div className="p-3 md:p-4 border-t border-border bg-card/50 backdrop-blur-md">
        <form
          onSubmit={handleSend}
          className="flex items-end rounded-2xl bg-card border border-border p-2 pl-4 transition-all focus-within:ring-1 focus-within:ring-ring"
        >
          <TextareaAutosize
            minRows={2}
            maxRows={4}
            placeholder={`Message ${conversation.name}...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none bg-transparent border-0 py-1.5 pr-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
          />

          <Button
            type="submit"
            disabled={!messageText.trim()}
            title="Send message"
            size="icon"
            className="cursor-pointer w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 shadow-xs transition-all active:scale-95 shrink-0 mb-0.5"
          >
            <SentIcon className="w-3.5! h-3.5!" />
          </Button>
        </form>
      </div>
    </div>
  );
}
