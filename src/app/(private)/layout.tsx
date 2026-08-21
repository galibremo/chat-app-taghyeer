"use client";

import React from "react";
import { SocketProvider } from "@/providers/socket-provider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocketProvider>{children}</SocketProvider>;
}
