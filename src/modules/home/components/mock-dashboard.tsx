"use client";

import { useState } from "react";
import {
  SentIcon,
  InformationCircleIcon,
  UserGroupIcon,
  CheckmarkBadge01Icon,
  Search01Icon,
  Add01Icon,
  Logout01Icon,
  Cancel01Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function MockHeader({ path }: { path: string }) {
  return (
    <div className="bg-muted/70 px-4 py-2.5 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
      </div>
      <div className="text-[11px] font-mono text-muted-foreground bg-background/60 px-3 py-1 rounded-full border border-border">
        {path}
      </div>
      <div className="w-12" />
    </div>
  );
}

export default function MockDashboard() {
  const [activeTab, setActiveTab] = useState<"all" | "direct" | "group">("all");
  const [selectedChatId, setSelectedChatId] = useState("conv-1");
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  // Realistic mock dataset for the interactive landing page demo
  const mockConversations = [
    {
      id: "conv-1",
      name: "Product Design Squad",
      type: "group",
      unread: 2,
      lastMsg: "Sarah: The new Shadcn theme components look clean! 🚀",
      time: "10:42 AM",
      participantsCount: 5,
    },
    {
      id: "conv-2",
      name: "Galib Remo",
      type: "direct",
      unread: 0,
      lastMsg: "Let me check the Socket.io connection fallback.",
      time: "Yesterday",
      phone: "+880 1744 123456",
    },
    {
      id: "conv-3",
      name: "Frontend Core Team",
      type: "group",
      unread: 0,
      lastMsg: "Alex: Next.js 16 build passed with 0 errors.",
      time: "Aug 20",
      participantsCount: 8,
    },
  ];

  const mockMessages: Record<
    string,
    Array<{
      id: string;
      sender: string;
      isOwn: boolean;
      text: string;
      time: string;
      status?: "sent" | "pending";
    }>
  > = {
    "conv-1": [
      {
        id: "m1",
        sender: "Alex Rivers",
        isOwn: false,
        text: "Hey team! I just finished updating the design system to use standard Shadcn tokens.",
        time: "10:38 AM",
      },
      {
        id: "m2",
        sender: "Galib",
        isOwn: true,
        text: "That's awesome! Did you replace all hardcoded color classes?",
        time: "10:40 AM",
        status: "sent",
      },
      {
        id: "m3",
        sender: "Sarah Jenkins",
        isOwn: false,
        text: "The new Shadcn theme components look clean! 🚀",
        time: "10:42 AM",
      },
    ],
    "conv-2": [
      {
        id: "m10",
        sender: "Galib Remo",
        isOwn: false,
        text: "Hey! Is the real-time websocket connection working on mobile?",
        time: "Yesterday",
      },
      {
        id: "m11",
        sender: "You",
        isOwn: true,
        text: "Let me check the Socket.io connection fallback.",
        time: "Yesterday",
        status: "sent",
      },
    ],
    "conv-3": [
      {
        id: "m20",
        sender: "Alex Rivers",
        isOwn: false,
        text: "Next.js 16 build passed with 0 errors.",
        time: "Aug 20",
      },
    ],
  };

  const selectedConv =
    mockConversations.find((c) => c.id === selectedChatId) ||
    mockConversations[0];
  const activeMessages = mockMessages[selectedChatId] || [];


  // Content renderers for reusability across mobile stack and desktop row
  const renderSidebarContent = () => (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* User Profile Bar */}
      <div className="p-3 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Avatar size="sm" className="bg-primary text-primary-foreground">
              <AvatarFallback className="text-primary-foreground font-bold">
                Y
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-background" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold truncate">You (Logged In)</div>
            <div className="text-[10px] text-emerald-500 font-medium">
              Online
            </div>
          </div>
        </div>
        <Logout01Icon className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Action buttons & Search */}
      <div className="p-2.5 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            size="xs"
            className="bg-primary text-primary-foreground text-[10px] gap-1"
          >
            <Add01Icon className="w-3 h-3" />
            <span>Direct</span>
          </Button>
          <Button size="xs" variant="secondary" className="text-[10px] gap-1">
            <UserGroupIcon className="w-3 h-3" />
            <span>Group</span>
          </Button>
        </div>

        <div className="relative flex items-center">
          <Search01Icon className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5" />
          <input
            type="text"
            readOnly
            placeholder="Search..."
            className="w-full bg-background border border-input rounded-xl pl-8 pr-2 py-1 text-[11px] text-foreground focus:outline-none"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-muted/60 p-0.5 rounded-lg text-[10px] font-medium text-muted-foreground">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-0.5 rounded ${
              activeTab === "all"
                ? "bg-background text-foreground shadow-xs"
                : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("direct")}
            className={`flex-1 py-0.5 rounded ${
              activeTab === "direct"
                ? "bg-background text-foreground shadow-xs"
                : ""
            }`}
          >
            Direct
          </button>
          <button
            onClick={() => setActiveTab("group")}
            className={`flex-1 py-0.5 rounded ${
              activeTab === "group"
                ? "bg-background text-foreground shadow-xs"
                : ""
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-1.5 space-y-1">
        {mockConversations
          .filter((c) => activeTab === "all" || c.type === activeTab)
          .map((conv) => {
            const isActive = conv.id === selectedChatId;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedChatId(conv.id)}
                className={`w-full p-2 rounded-xl flex items-center gap-2 text-left transition-all border ${
                  isActive
                    ? "bg-accent text-accent-foreground border-border font-medium"
                    : "bg-transparent hover:bg-accent/40 text-foreground border-transparent"
                }`}
              >
                <Avatar
                  size="sm"
                  className={
                    conv.type === "group"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }
                >
                  <AvatarFallback className="text-xs">
                    {conv.type === "group" ? (
                      <UserGroupIcon className="w-3.5 h-3.5" />
                    ) : (
                      conv.name.charAt(0)
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-bold truncate">
                      {conv.name}
                    </span>
                    <span className="text-[9px] text-muted-foreground">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {conv.lastMsg}
                  </p>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );

  const renderFeedContent = () => (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-2.5">
          <Avatar
            size="sm"
            className={
              selectedConv.type === "group"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }
          >
            <AvatarFallback className="text-xs">
              {selectedConv.type === "group" ? (
                <UserGroupIcon className="w-3.5 h-3.5" />
              ) : (
                selectedConv.name.charAt(0)
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-xs font-bold">{selectedConv.name}</h4>
            <p className="text-[10px] text-muted-foreground">
              {selectedConv.type === "group"
                ? `${selectedConv.participantsCount} members`
                : selectedConv.phone}
            </p>
          </div>
        </div>

        <Button
          size="xs"
          variant={isDetailsOpen ? "secondary" : "outline"}
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="text-[10px] gap-1 cursor-pointer"
        >
          <InformationCircleIcon className="w-3.5 h-3.5" />
          <span>Details</span>
        </Button>
      </div>

      {/* Feed Scroll */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
        {activeMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start gap-2"}`}
          >
            {!msg.isOwn && (
              <Avatar
                size="sm"
                className="bg-secondary text-secondary-foreground shrink-0 mt-0.5"
              >
                <AvatarFallback className="text-[10px]">
                  {msg.sender.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"} space-y-1`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-[11px] leading-relaxed whitespace-pre-wrap wrap-break-word shadow-xs ${
                  msg.isOwn
                    ? "bg-primary text-primary-foreground rounded-br-xs"
                    : "bg-muted border border-border text-muted-foreground rounded-bl-xs"
                }`}
              >
                {msg.text}
              </div>

              <div className="text-[9px] text-muted-foreground font-mono flex items-center gap-1 px-1">
                <span>{msg.time}</span>
                {msg.isOwn && (
                  <CheckmarkBadge01Icon className="w-3 h-3 text-primary" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-2.5 border-t border-border bg-card/50">
        <div className="flex items-center rounded-xl bg-card border border-border p-1.5 pl-3">
          <input
            type="text"
            readOnly
            placeholder={`Message ${selectedConv.name}...`}
            className="flex-1 bg-transparent text-[11px] text-foreground focus:outline-none"
          />
          <Button
            size="icon"
            className="w-7 h-7 rounded-full bg-primary text-primary-foreground shrink-0"
          >
            <SentIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDetailsContent = () => (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between bg-card">
        <h5 className="text-xs font-bold">Details</h5>
        <Cancel01Icon
          className="w-3.5 h-3.5 text-muted-foreground cursor-pointer"
          onClick={() => setIsDetailsOpen(false)}
        />
      </div>

      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        <div className="text-center space-y-2">
          <Avatar
            size="lg"
            className="mx-auto bg-primary text-primary-foreground"
          >
            <AvatarFallback>
              {selectedConv.type === "group" ? (
                <UserGroupIcon className="w-5 h-5" />
              ) : (
                selectedConv.name.charAt(0)
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-xs font-bold">{selectedConv.name}</h6>
            <p className="text-[10px] text-muted-foreground">
              {selectedConv.type === "group"
                ? `${selectedConv.participantsCount} Members`
                : "Direct Conversation"}
            </p>
          </div>
        </div>

        {selectedConv.type === "group" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold border-b border-border pb-1">
              <span>Members</span>
              <span className="text-primary text-[10px] flex items-center gap-0.5">
                <UserAdd01Icon className="w-3 h-3" /> Add
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2">
                  <Avatar
                    size="sm"
                    className="bg-secondary text-secondary-foreground"
                  >
                    <AvatarFallback className="text-[10px]">A</AvatarFallback>
                  </Avatar>
                  <span>Alex Rivers</span>
                </div>
                <Badge variant="admin">Admin</Badge>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2">
                  <Avatar
                    size="sm"
                    className="bg-secondary text-secondary-foreground"
                  >
                    <AvatarFallback className="text-[10px]">S</AvatarFallback>
                  </Avatar>
                  <span>Sarah Jenkins</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full select-none text-foreground font-sans">
      {/* MOBILE / SMALL SCREENS: 3 Separate Column Cards each with top header */}
      <div className="md:hidden space-y-6">
        {/* Column 1: Sidebar Mock Window */}
        <div className="w-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
          <MockHeader path="https://chatflow.app/chat/conversations" />
          <div className="h-112.5">{renderSidebarContent()}</div>
        </div>

        {/* Column 2: Chat Feed Mock Window */}
        <div className="w-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
          <MockHeader path="https://chatflow.app/chat/feed" />
          <div className="h-112.5">{renderFeedContent()}</div>
        </div>

        {/* Column 3: Details Panel Mock Window */}
        <div className="w-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden">
          <MockHeader path="https://chatflow.app/chat/details" />
          <div className="h-112.5">{renderDetailsContent()}</div>
        </div>
      </div>

      {/* DESKTOP SCREENS: 1 Unified Browser Window with side-by-side 3-panel row */}
      <div className="hidden md:block w-full rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        <MockHeader path="https://chatflow.app/chat" />

        <div className="flex h-135 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 lg:w-72 border-r border-border shrink-0">
            {renderSidebarContent()}
          </div>

          {/* Center Feed */}
          <div className="flex-1 shrink-0">{renderFeedContent()}</div>

          {/* Right Details Panel */}
          {isDetailsOpen && (
            <div className="hidden lg:block w-64 border-l border-border shrink-0">
              {renderDetailsContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
