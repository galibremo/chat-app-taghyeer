import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Messages",
  description:
    "View and manage your real-time direct and group chat conversations on ChatFlow.",
  openGraph: {
    title: "Messages | ChatFlow",
    description:
      "View and manage your real-time direct and group chat conversations on ChatFlow.",
    url: "/chat",
  },
};

export default function ChatRootPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-6 text-center select-none h-full">
      <div className="w-20 h-20 rounded-3xl bg-card border border-border flex items-center justify-center text-4xl mb-4 shadow-xl">
        💬
      </div>
      <h3 className="text-lg font-bold text-foreground">Your Messages</h3>
      <p className="text-xs text-muted-foreground max-w-sm mt-1">
        Select an existing conversation from the sidebar or start a new direct or group chat to begin messaging.
      </p>
    </div>
  );
}
