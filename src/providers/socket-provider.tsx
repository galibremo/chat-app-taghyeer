"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthTokenCookie } from "@/lib/cookie";
import { useAuth } from "@/providers/auth-provider";
import { CHAT_QUERY_KEYS } from "@/modules/chat/actions/chat.mutations";
import {
  normalizeConversation,
  normalizeMessage,
  updateConversationsList,
} from "@/modules/chat/utils/normalize";
import {
  NormalizedConversation,
  NormalizedMessage,
  RawConversation,
  SocketConversationUpdatedPayload,
  SocketMessageNewPayload,
} from "@/types/chat";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  socketError: string | null;
  sendSocketMessage: (conversationId: string, text: string) => Promise<boolean>;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  isConnecting: false,
  socketError: null,
  sendSocketMessage: async () => false,
});

const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  "https://frontend-task-chatapp.onrender.com";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [socketError, setSocketError] = useState<string | null>(null);

  const currentUserIdRef = useRef<string | undefined>(user?._id);

  useEffect(() => {
    currentUserIdRef.current = user?._id;
  }, [user?._id]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const token = getAuthTokenCookie();
    if (!token) return;

    const socketInstance = io(SOCKET_SERVER_URL, {
      auth: { token },
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketInstance.on("connect", () => {
      console.log("[Socket] Connected successfully:", socketInstance.id);
      setIsConnected(true);
      setIsConnecting(false);
      setSocketError(null);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("[Socket] Connection error:", err.message);
      setIsConnected(false);
      setIsConnecting(false);
      setSocketError(
        err.message || "Failed to connect to real-time chat server",
      );
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
      setIsConnected(false);
      setIsConnecting(false);
    });

    // Real-Time Event: New Message from server
    socketInstance.on("message:new", (payload: SocketMessageNewPayload) => {
      console.log("[Socket] Received message:new event:", payload);
      const normalized = normalizeMessage(payload);

      // 1. Append message to target conversation's message cache
      queryClient.setQueryData<{
        messages: NormalizedMessage[];
        hasMore: boolean;
      }>(CHAT_QUERY_KEYS.messages(normalized.conversation), (old) => {
        if (!old) return { messages: [normalized], hasMore: false };

        // 1. If message with exact _id exists, update it
        const existsById = old.messages.some((m) => m._id === normalized._id);
        if (existsById) {
          return {
            ...old,
            messages: old.messages.map((m) =>
              m._id === normalized._id ? normalized : m,
            ),
          };
        }

        // 2. If optimistic temp message exists, replace it
        const tempIdx = old.messages.findIndex(
          (m) =>
            (m._id.startsWith("temp-") || m.status === "pending") &&
            m.text === normalized.text &&
            m.sender === normalized.sender,
        );

        if (tempIdx !== -1) {
          const updated = [...old.messages];
          updated[tempIdx] = normalized;
          return { ...old, messages: updated };
        }

        return { ...old, messages: [...old.messages, normalized] };
      });

      // 2. Update last message & updatedAt in conversations list and move to top
      queryClient.setQueryData<NormalizedConversation[]>(
        CHAT_QUERY_KEYS.conversations,
        (old = []) => {
          const targetConv = old.find((c) => c._id === normalized.conversation);
          if (targetConv) {
            const updatedConv: NormalizedConversation = {
              ...targetConv,
              lastMessage: normalized,
              updatedAt: normalized.createdAt,
            };
            return updateConversationsList(old, updatedConv);
          }
          queryClient.invalidateQueries({
            queryKey: CHAT_QUERY_KEYS.conversations,
          });
          return old;
        },
      );
    });

    // Real-Time Event: Group metadata updated (rename, members change, admin promoted)
    socketInstance.on(
      "conversation:updated",
      (payload: SocketConversationUpdatedPayload) => {
        console.log("[Socket] Received conversation:updated event:", payload);
        const normalized = normalizeConversation(
          payload as unknown as RawConversation,
          currentUserIdRef.current,
        );

        queryClient.setQueryData<NormalizedConversation[]>(
          CHAT_QUERY_KEYS.conversations,
          (old = []) => updateConversationsList(old, normalized),
        );
      },
    );

    queueMicrotask(() => {
      setSocket(socketInstance);
    });

    return () => {
      socketInstance.off("connect");
      socketInstance.off("connect_error");
      socketInstance.off("disconnect");
      socketInstance.off("message:new");
      socketInstance.off("conversation:updated");
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
      setIsConnecting(false);
    };
  }, [isAuthenticated, user?._id, queryClient]);

  const sendSocketMessage = (
    conversationId: string,
    text: string,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!socket || !isConnected) {
        resolve(false);
        return;
      }

      socket.emit(
        "message:send",
        { conversationId, text: text.trim() },
        (ack: { ok?: boolean } | null) => {
          if (ack && ack.ok) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
      );
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        isConnecting,
        socketError,
        sendSocketMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
