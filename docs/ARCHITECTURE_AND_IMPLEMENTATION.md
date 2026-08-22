# Complete Architecture & Implementation Documentation

This document provides a comprehensive, step-by-step technical walkthrough of the Chat Application implementation. It covers architectural design decisions, state management with TanStack Query, real-time WebSockets, data normalization, error handling, and component structure.

---

## 📖 Table of Contents

1. [Executive Summary & Architectural Highlights](#1-executive-summary--architectural-highlights)
2. [Key Design Choices & Rationales](#2-key-design-choices--rationales)
   - [Why TanStack Query over Global State Libraries](#why-tanstack-query-over-global-state-libraries)
   - [Hybrid Messaging Architecture (REST Send + Socket Receive)](#hybrid-messaging-architecture-rest-send--socket-receive)
   - [Layout Architecture (`/chat` Single-View vs. `/chat/[chatId]`)](#layout-architecture-chat-single-view-vs-chatchatid)
   - [Next.js Rewrite Proxy & CORS Bypass](#nextjs-rewrite-proxy--cors-bypass)
3. [Data Normalization Pipeline](#3-data-normalization-pipeline)
   - [Bridging API & WebSocket Inconsistencies](#bridging-api--websocket-inconsistencies)
   - [Normalization Utilities](#normalization-utilities)
4. [Real-Time WebSocket System (`SocketProvider`)](#4-real-time-websocket-system-socketprovider)
   - [Connection Handshake & Reconnection Strategy](#connection-handshake--reconnection-strategy)
   - [Real-Time Event Processing](#real-time-event-processing)
5. [TanStack Query & Cache Management](#5-tanstack-query--cache-management)
   - [Query Keys Structure](#query-keys-structure)
   - [Optimistic UI Updates & Cache Merging](#optimistic-ui-updates--cache-merging)
   - [Cache Invalidation & Background Refetching](#cache-invalidation--background-refetching)
6. [Defensive Error Handling Strategy](#6-defensive-error-handling-strategy)
   - [Handling Generic 500 Server Errors & Mongoose Leaks](#handling-generic-500-server-errors--mongoose-leaks)
7. [Step-by-Step Feature Walkthrough](#7-step-by-step-feature-walkthrough)
   - [Authentication & Session Flow](#authentication--session-flow)
   - [User Search & Direct Chat Creation](#user-search--direct-chat-creation)
   - [Group Chat Creation & Admin Operations](#group-chat-creation--admin-operations)
   - [Message Sending & Real-time Delivery](#message-sending--real-time-delivery)

---

## 1. Executive Summary & Architectural Highlights

The application is built on **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, **TanStack Query (v5)**, and **Socket.io-client**. It connects to a backend REST API hosted at `https://frontend-task-chatapp.onrender.com/api` and a WebSocket server at the root URL.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               NEXT.JS FRONTEND                                  │
│                                                                                 │
│   ┌─────────────────────┐    REST    ┌──────────────────────────────────────┐   │
│   │   TanStack Query    │ ─────────► │ Next.js Rewrites Proxy (`/api/*`)    │   │
│   │  (Server State/Cache│            └──────────────────┬───────────────────┘   │
│   └──────────▲──────────┘                               │ REST                  │
│              │ Updates                                  ▼                       │
│   ┌──────────┴──────────┐   Socket   ┌──────────────────────────────────────┐   │
│   │   SocketProvider    │ ◄────────► │        Backend Remote Server         │   │
│   │ (Real-time Manager) │            │ (REST API + Socket.io Server)        │   │
│   └─────────────────────┘            └──────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Design Choices & Rationales

### Why TanStack Query over Global State Libraries
For a real-time messaging application, server state management is fundamentally different from local UI state:
- **Server State Challenges**: Data resides remotely, requires async fetching, can become stale, needs background polling/revalidation, and must handle optimistic updates with rollback capabilities.
- **Why Redux / Zustand was avoided for async data**: Managing cache expiry, refetching on window focus, loading/error states, and manual deduplication in Redux requires massive boilerplate and introduces race-condition bugs.
- **TanStack Query Benefits**: Provides automatic query caching, instant optimistic UI updates via `setQueryData`, automatic background refetching, and clean cache invalidation out of the box.

### Hybrid Messaging Architecture (REST Send + Socket Receive)
The messaging system employs a **Hybrid REST + WebSocket** approach:

```
                  ┌────────────────────────────┐
                  │   User Types & Hits Send   │
                  └──────────────┬─────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
      1. REST Mutation (Primary)       2. Socket Event (Fallback/Real-time)
   POST /api/messages                socket.emit("message:send")
   - Immediate HTTP Status           - Low-latency broadcast to peers
   - Canonical DB Message returned   - Socket server pushes `message:new`
                 │                               │
                 └───────────────┬───────────────┘
                                 ▼
                     3. TanStack Query Cache
                Replaces optimistic temp message
```

1. **Sending via REST (`POST /messages`)**:
   - Gives standard HTTP status codes (`200 OK`, `400 Bad Request`, `500 Server Error`).
   - Returns the canonical created message object (`_id`, populated `createdAt` ISO string).
   - Allows strict input validation and predictable mutation error callbacks.
2. **Receiving via Socket (`message:new`)**:
   - The Socket server broadcasts new messages to all active room participants.
   - When `message:new` arrives, the client inspects its TanStack cache: if the message was sent by the logged-in user and an optimistic or REST message is already cached, it replaces/deduplicates it seamlessly; if it's from another participant, it appends it directly.
3. **Socket Send (`message:send`) as Fallback**:
   - Used if REST requests fail or for lower-latency peer messaging when socket connection is active.

### Layout Architecture (`/chat` Single-View vs. `/chat/[chatId]`)
Instead of using dynamic nested routes (`/chat/[chatId]`), the app utilizes a centralized `/chat` route with internal state management (`activeConversationId`):

- **Persistent WebSocket Connection**: Navigating between chats does NOT trigger page-level remounts or re-initialize the Socket connection.
- **Optimized Mobile & Desktop Split View**: Allows instant switching on desktop while supporting slide-in panel animations on mobile using smooth CSS transitions (`transform / opacity`).
- **Zero Component Flashing**: Switching chats updates local state and triggers TanStack Query hook `useMessagesQuery(activeConversationId)`, which serves cached messages instantly while fetching fresh history in the background.

### Next.js Rewrite Proxy & CORS Bypass
To prevent CORS issues in production and local development, requests are routed through Next.js rewrites ([next.config.ts](file:///Users/galibremo/Code/chat-app/next.config.ts)):

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://frontend-task-chatapp.onrender.com/api/:path*",
      },
    ];
  },
};
```
In browser context, [client.ts](file:///Users/galibremo/Code/chat-app/src/lib/api/client.ts) uses relative path `/api`, eliminating cross-origin preflight overhead.

---

## 3. Data Normalization Pipeline

### Bridging API & WebSocket Inconsistencies
The API responses exhibit structural inconsistencies between REST endpoints and Socket events. The frontend handles these transparently through a dedicated normalization layer ([normalize.ts](file:///Users/galibremo/Code/chat-app/src/modules/chat/utils/normalize.ts)):

| Resource / Field | REST API Behavior | Socket.io Behavior | Normalized Standard |
| :--- | :--- | :--- | :--- |
| **Message Identifier** | Uses `_id` | Uses `id` | Standardized to `_id` |
| **Timestamp** | ISO 8601 String (`"2026-08-21T10:42:09.821Z"`) | Unix Timestamp Number (`1787313761682`) | Standardized to ISO String |
| **Direct Conversation** | Key `participant: { _id, name, phone }` | N/A | Transformed to unified `participants: User[]` + `participant: User` |
| **Group Conversation** | Key `participants: User[]` + `name` | Returns same updated group payload | Unified into `NormalizedConversation` |
| **Empty Group Message** | Returns `{}` instead of `null` | N/A | Sanitized to `null` via `isValidLastMessage` |

### Normalization Utilities
Defined in [src/modules/chat/utils/normalize.ts](file:///Users/galibremo/Code/chat-app/src/modules/chat/utils/normalize.ts):

```typescript
export function normalizeMessage(raw: RawMessage | SocketMessageNewPayload): NormalizedMessage {
  const _id = ("_id" in raw && raw._id) || ("id" in raw && raw.id) || `temp-${Date.now()}`;
  
  let createdAtIso: string;
  if (typeof raw.createdAt === "number") {
    createdAtIso = new Date(raw.createdAt).toISOString();
  } else if (typeof raw.createdAt === "string") {
    createdAtIso = raw.createdAt;
  } else {
    createdAtIso = new Date().toISOString();
  }

  return {
    _id,
    conversation: raw.conversation,
    sender: typeof raw.sender === "string" ? raw.sender : (raw.sender as any)?._id || "",
    text: raw.text || "",
    createdAt: createdAtIso,
    status: "sent",
  };
}
```

---

## 4. Real-Time WebSocket System (`SocketProvider`)

### Connection Handshake & Reconnection Strategy
Implemented in [src/providers/socket-provider.tsx](file:///Users/galibremo/Code/chat-app/src/providers/socket-provider.tsx):

```typescript
const socketInstance = io(SOCKET_SERVER_URL, {
  auth: { token },
  transports: ["polling", "websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});
```

- **Authentication**: JWT token retrieved from cookies via `getAuthTokenCookie()` is passed in the `auth` handshake object.
- **Transport Fallback**: Starts with HTTP long-polling and upgrades to WebSocket to bypass strict corporate firewalls.
- **Automatic Reconnection**: Reattempts connection up to 10 times with exponential backoff.

### Real-Time Event Processing

#### Event 1: `message:new`
Fires when any user sends a message in a conversation:

```typescript
socketInstance.on("message:new", (payload: SocketMessageNewPayload) => {
  const normalized = normalizeMessage(payload);

  // 1. Append message to target conversation's message cache
  queryClient.setQueryData<{ messages: NormalizedMessage[]; hasMore: boolean }>(
    CHAT_QUERY_KEYS.messages(normalized.conversation),
    (old) => {
      if (!old) return { messages: [normalized], hasMore: false };

      // Deduplicate if ID already exists
      const existsById = old.messages.some((m) => m._id === normalized._id);
      if (existsById) {
        return {
          ...old,
          messages: old.messages.map((m) => (m._id === normalized._id ? normalized : m)),
        };
      }

      // Replace optimistic temp message if present
      const tempIdx = old.messages.findIndex(
        (m) => (m._id.startsWith("temp-") || m.status === "pending") &&
               m.text === normalized.text && m.sender === normalized.sender
      );

      if (tempIdx !== -1) {
        const updated = [...old.messages];
        updated[tempIdx] = normalized;
        return { ...old, messages: updated };
      }

      return { ...old, messages: [...old.messages, normalized] };
    }
  );

  // 2. Update conversation list lastMessage preview & position
  queryClient.setQueryData<NormalizedConversation[]>(
    CHAT_QUERY_KEYS.conversations,
    (old = []) => old.map((conv) => conv._id === normalized.conversation
      ? { ...conv, lastMessage: normalized, updatedAt: normalized.createdAt }
      : conv
    )
  );
});
```

#### Event 2: `conversation:updated`
Fires when group metadata changes (name updated, member added/removed, admin promoted):

```typescript
socketInstance.on("conversation:updated", (payload: SocketConversationUpdatedPayload) => {
  const normalized = normalizeConversation(payload as unknown as RawConversation, currentUserIdRef.current);

  queryClient.setQueryData<NormalizedConversation[]>(
    CHAT_QUERY_KEYS.conversations,
    (old = []) => {
      const exists = old.some((c) => c._id === normalized._id);
      if (exists) {
        return old.map((c) => (c._id === normalized._id ? normalized : c));
      }
      return [normalized, ...old];
    }
  );
});
```

---

## 5. TanStack Query & Cache Management

### Query Keys Structure
Centralized in [src/modules/chat/actions/chat.mutations.ts](file:///Users/galibremo/Code/chat-app/src/modules/chat/actions/chat.mutations.ts#L28-L32):

```typescript
export const CHAT_QUERY_KEYS = {
  conversations: ["conversations"] as const,
  messages: (conversationId: string) => ["messages", conversationId] as const,
  userSearch: (query: string) => ["users", "search", query] as const,
};
```

### Optimistic UI Updates & Cache Merging
When sending a message (`useSendMessageMutation`), the UI updates **instantly** before the network request finishes:

```typescript
onMutate: async ({ conversationId, text }) => {
  await queryClient.cancelQueries({ queryKey: CHAT_QUERY_KEYS.messages(conversationId) });

  const previousMessagesData = queryClient.getQueryData(CHAT_QUERY_KEYS.messages(conversationId));

  const optimisticMsg: NormalizedMessage = {
    _id: `temp-${Date.now()}`,
    conversation: conversationId,
    sender: user?._id || "",
    text,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  if (previousMessagesData) {
    queryClient.setQueryData(CHAT_QUERY_KEYS.messages(conversationId), {
      ...previousMessagesData,
      messages: [...previousMessagesData.messages, optimisticMsg],
    });
  }

  return { previousMessagesData };
},
onError: (err, variables, context) => {
  // Roll back to previous cache state if network fails
  if (context?.previousMessagesData) {
    queryClient.setQueryData(CHAT_QUERY_KEYS.messages(variables.conversationId), context.previousMessagesData);
  }
}
```

### Cache Invalidation & Background Refetching
- **Conversations List (`useConversationsQuery`)**: Configured with `staleTime: 30,000ms`. Automatically invalidates on direct/group creation and group metadata mutations using `queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.conversations })`.
- **User Search (`useUserSearchQuery`)**: Executed only when search string length $\ge 2$, with `staleTime: 60,000ms` to prevent redundant network requests while typing.

---

## 6. Defensive Error Handling Strategy

### Handling Generic 500 Server Errors & Mongoose Leaks
As identified in testing, backend database validation failures (e.g. invalid MongoDB ObjectId strings) return unhandled 500 server errors leaking raw Mongoose cast error messages:

```json
{
  "error": {
    "message": "Cast to ObjectId failed for value \"xyz\" at path \"_id\" for model \"User\"",
    "code": "SERVER_ERROR"
  }
}
```

#### Client Error Layer ([src/lib/api/errors.ts](file:///Users/galibremo/Code/chat-app/src/lib/api/errors.ts)):
1. `fetchClient` parses non-2xx responses and wraps error payloads into a typed `ApiError` instance.
2. `normalizeApiError` converts raw standard JS errors or network disconnects (`TypeError: Failed to fetch`) into safe, user-facing notifications.
3. UI components sanitize internal Mongoose stack traces before displaying feedback to the user via toast notifications or error banners.

---

## 7. Step-by-Step Feature Walkthrough

### Authentication & Session Flow
1. **Login Request**: User submits phone and display name via `LoginForm`.
2. **REST Execution**: Calls `POST /auth/login` via `fetchClient`.
3. **Cookie Storage**: JWT token saved in document cookies via `setAuthTokenCookie(token)`.
4. **Session Hydration**: `AuthProvider` calls `GET /auth/me` to fetch current user profile.
5. **Socket Handshake**: `SocketProvider` automatically establishes an authenticated Socket.io connection.

### User Search & Direct Chat Creation
1. **Search Modal**: Opening `NewChatDialog` triggers `useUserSearchQuery(debouncedQuery)` calling `GET /users/search?q=...`.
2. **Start Conversation**: Selecting a user executes `useStartDirectMutation` calling `POST /conversations` with `{ userId }`.
3. **Cache Insert**: The new conversation is normalized and prepended to `CHAT_QUERY_KEYS.conversations` cache.

### Group Chat Creation & Admin Operations
1. **Creation**: `CreateGroupDialog` submits name and `participantIds` array to `POST /conversations/group`. Creator is automatically assigned admin rights.
2. **Add Members**: Admin opens `AddMembersDialog` calling `POST /conversations/{id}/participants` with `{ userIds }`.
3. **Promote Admin**: Admin triggers `promoteGroupAdmin()` calling `POST /conversations/{id}/admins`.
4. **Remove Member / Leave Group**: Triggers `removeGroupParticipant()` calling `DELETE /conversations/{id}/participants/{userId}`.
5. **Rename Group**: Triggers `renameGroup()` calling `PATCH /conversations/{id}`.
6. **Real-time Synchronization**: All group mutations return the complete updated group payload, which is pushed to all participants via `conversation:updated` socket event.

### Message Sending & Real-time Delivery
1. **User Action**: User types a message in `ChatFeed` and hits enter or click send.
2. **Optimistic Rendering**: Message appears immediately with a pending state indicator.
3. **REST Dispatch**: `POST /messages` sends `{ conversationId, text }` to server.
4. **Socket Reception**: Receiving client receives `message:new` event and merges the message smoothly into TanStack Query cache.
5. **Auto Scroll**: `ChatFeed` smoothly auto-scrolls to the bottom upon receipt of new messages.

---

*Documentation maintained in `/docs/ARCHITECTURE_AND_IMPLEMENTATION.md`.*
