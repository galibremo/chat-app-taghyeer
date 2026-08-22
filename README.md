# 💬 ChatFlow — Real-Time Messaging Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-chat--app--taghyeer.vercel.app-4F46E5?style=for-the-badge&logo=vercel)](https://chat-app-taghyeer.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery)](https://tanstack.com/query/latest)

A state-of-the-art, real-time messaging web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **TanStack Query (v5)**, **Socket.io-client**, and **Tailwind CSS v4**.

Featuring a hybrid REST + WebSocket architecture, optimistic UI updates, automated real-time conversation sorting, defensive error handling, and a responsive design that seamlessly adapts between desktop split-views and mobile touch drawers.

---

## 🌐 Live Application

- **Live URL**: [https://chat-app-taghyeer.vercel.app/](https://chat-app-taghyeer.vercel.app/)

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Full-stack React framework utilizing Server Components & App Router |
| **Language** | **TypeScript 5** | End-to-end type safety, interfaces, and strict compiler checks |
| **State & Cache** | **TanStack Query (v5)** | Declarative server-state fetching, caching, and optimistic UI mutations |
| **Real-time Engine** | **Socket.io-client (v4)** | Persistent WebSocket client for instant incoming message broadcasts |
| **Styling & Theme** | **Tailwind CSS (v4)** & `next-themes` | Utility-first CSS engine with modern dark mode and CSS variable design tokens |
| **UI Components** | **Base UI / Shadcn UI / Radix primitives** | Accessible, customizable headless component primitives |
| **Animations** | **Motion (`framer-motion` v13)** | Declarative micro-animations, layout transitions, and mobile drawer slides |
| **Icons & Assets** | **HugeIcons React** | Modern vector icon set |
| **Validation** | **Zod (v4)** | Schema validation for forms, payload normalization, and route params |
| **Package Manager**| **pnpm (v11)** | Fast, disk space efficient node package manager |

---

## 🚀 Setup & Run Instructions

### Prerequisites
Ensure you have the following installed locally:
- **Node.js**: `v18.17.0` or higher (Recommended: `v20+`)
- **pnpm**: `v10.0.0` or higher (e.g. `pnpm@11.21.0`)

---

### Step 1: Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/galibremo/chat-app-taghyeer.git

# Navigate into the project directory
cd chat-app-taghyeer

# Install project dependencies
pnpm install
```

---

### Step 2: Environment Variables

Create a `.env` file in the root directory (or use the configured default environment variables):

```env
NEXT_PUBLIC_API_URL="https://frontend-task-chatapp.onrender.com/api"
NEXT_PUBLIC_SOCKET_URL="https://frontend-task-chatapp.onrender.com"
```

*Note: If `NEXT_PUBLIC_SOCKET_URL` is omitted, the app automatically falls back to `https://frontend-task-chatapp.onrender.com`.*

---

### Step 3: Run Development Server

Start the Next.js local development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

### Step 4: Build & Run Production Bundle

To test production build optimization and static generation locally:

```bash
# Build the production bundle
pnpm build

# Start the production server
pnpm start

# Run ESLint code checks
pnpm lint
```

---

## ✨ Key Features

- **⚡ Hybrid Messaging Engine**:
  - **REST API (`POST /messages`)**: Sends primary messages with canonical HTTP status codes and backend-minted ISO timestamps.
  - **WebSocket (`message:new`)**: Pushes real-time push broadcasts to all active room participants with low latency.
- **🔄 Deterministic Real-time Conversation Sorting**:
  - Conversations automatically reorder in real-time, popping active chats to the top of the sidebar upon incoming messages or group metadata updates.
- **⚡ Optimistic UI Updates**:
  - Messages appear instantly in the chat feed (`status: pending`) before network request completion, with automatic rollback on failure.
- **📱 Responsive Mobile & Desktop Layout**:
  - **Desktop ($\ge 1024\text{px}$)**: 3-column split view (Sidebar, Chat Feed, Chat Details).
  - **Mobile ($< 1024\text{px}$)**: Touch-friendly slide-in details drawer with animated dark backdrop powered by Motion (`framer-motion`).
- **👥 Direct & Group Chat Management**:
  - User search, direct chat initiation, group chat creation, member management, admin promotion, and group renaming.
- **🛡️ Defensive Error Shield**:
  - Transparent parsing of backend error responses, preventing raw Mongoose stack trace leaks.
- **🌐 SEO Optimized & Server Components**:
  - Dynamic Next.js App Router metadata generation for search engines and open-graph previews.
- **🎨 Creative Landing Page**:
  - Includes interactive live chat preview simulator, 4-card Bento Grid, roadmap timeline, and collapsible FAQ accordion.

---

## 📁 Directory Architecture

```
chat-app-taghyeer/
├── docs/
│   ├── ARCHITECTURE_AND_IMPLEMENTATION.md  # Detailed technical walkthrough
│   ├── API_DOCUMENTATION.md                # Comprehensive REST & Socket API spec
│   └── SUMMARY.md                          # Technical reflection & trade-offs (Part 3)
├── src/
│   ├── app/                                # Next.js App Router (Public & Private routes)
│   │   ├── (auth)/login/                   # Authentication route
│   │   ├── (private)/chat/                 # Chat application layout & rooms
│   │   ├── (public)/                       # Creative landing page
│   │   └── layout.tsx                      # Root layout with providers & SEO metadata
│   ├── components/                         # Shared UI components & centralized icons
│   ├── hooks/                              # Custom React hooks (e.g. useMediaQuery)
│   ├── lib/                                # API client, error parsing & cookie utilities
│   ├── modules/                            # Domain modules (auth, chat, home)
│   │   └── chat/                           # Chat state, actions, mutations & utils
│   ├── providers/                          # AuthProvider, SocketProvider & QueryProvider
│   ├── routes/                             # Centralized route & API endpoint registry
│   └── types/                              # TypeScript type definitions
└── package.json
```

---

## 📝 Part 3 Write-Up & Technical Reflection

*(Persisted in [`docs/SUMMARY.md`](file:///Users/galibremo/Code/chat-app/docs/SUMMARY.md))*

### 1. Architectural & Library Choices & Trade-offs (Part 1)

#### 1.1 State Management: TanStack Query (v5) vs. Global Redux/Zustand
- **Rationale**: In a real-time chat application, remote chat data, message feeds, and active room states are fundamentally *server state*.
- **Why Redux / Zustand was avoided**: Redux or Zustand require extensive boilerplate to handle asynchronous request thunks, loading/error flags, deduplication, cache expiry, and manual window re-focus refetching.
- **TanStack Query Benefits**: Provides declarative query keys (`["conversations"]`, `["messages", id]`), configurable `staleTime`, automatic background revalidation, instant optimistic UI updates via `setQueryData`, and clean rollback handlers.

#### 1.2 Messaging Architecture: Hybrid REST Send + Socket Receive
- **Rationale**:
  - **REST (`POST /messages`) for Primary Send**: Gives immediate standard HTTP status codes (`200 OK`, `400 Bad Request`, `500 Server Error`), returns the canonical backend-generated message payload (`_id`, server ISO timestamp), and allows standard input validation error callbacks.
  - **WebSocket (`message:new`) for Receiving**: Delivers ultra-low latency push broadcasts to all active room participants without polling overhead.
- **Trade-offs Considered**:
  - *Pure WebSocket (Send & Receive)*: Eliminates HTTP preflight overhead, but handling DB delivery failures, validation errors, and tracking request-response acknowledgments over pure WS requires complex custom socket timeout wrappers.
  - *Pure REST Polling*: Simple to implement, but introduces unacceptable latency and wasteful network traffic.
  - *Chosen Hybrid Approach*: Balances HTTP request reliability with low-latency WebSocket push delivery.

#### 1.3 Normalization & Real-Time Deterministic Sorting
- **Rationale**: Backend REST API endpoints and WebSocket events format data inconsistently (e.g. REST uses `_id` and ISO 8601 strings, while socket payloads return `id` and numerical timestamps; group updates return full modified conversation objects).
- **Implementation**: Defined a dedicated normalization module ([`src/modules/chat/utils/normalize.ts`](file:///Users/galibremo/Code/chat-app/src/modules/chat/utils/normalize.ts)). Implemented `getConversationTimestamp()`, `sortConversations()`, and `updateConversationsList()` to calculate `Math.max(lastMessage.createdAt, conv.updatedAt)`, ensuring active chats deterministically pop to the top of the sidebar on incoming events.

#### 1.4 Centralized Route Registry (`src/routes/routes.ts`)
- **Rationale**: Replaced hardcoded string URLs (e.g. `"/api/conversations"`, `"/chat/" + id`) with strongly-typed `route` and `apiRoute` helpers across all actions, mutations, and navigation links to enforce compile-time safety and ease future route refactoring.

---

### 2. Creative Landing Page Design Rationale (Part 2)

#### 2.1 Aesthetic & Visual Identity
- **Modern Dark Mode & Glassmorphism**: Built a high-contrast dark theme using Tailwind CSS, featuring subtle indigo/violet primary gradients, glassmorphism cards (`backdrop-blur-md`, subtle translucent borders), and vibrant glow effects.
- **Typography & Layout**: Used clean sans-serif typography with strict hierarchy, distinct pill badges, and structured spacing to create a state-of-the-art tech aesthetic.

#### 2.2 Section Structure & Interactive Components
1. **Hero Section**: High-impact value proposition featuring animated badge pills, primary CTA buttons, and feature highlights.
2. **Interactive Mock Dashboard**: Embedded live chat simulator allowing visitors to interactively click through direct and group chats, send mock messages, and test online status indicators directly on the landing page.
3. **Bento Grid Feature Showcase**: Structured 4-card layout emphasizing key architecture features (Hybrid Real-Time, TanStack Cache, Group Admin Powers, Defensive Error Shield).
4. **Timeline Roadmap**: Visual step-by-step progress timeline demonstrating platform milestones.
5. **Interactive FAQ Accordion**: Smooth collapsible accordion addressing transport architecture, security, and performance.
6. **Interactive Contact Form & Footer**: Contact section with input validation and responsive footer links.

#### 2.3 Micro-Animations & Responsive Adaptability
- **Animations**: Powered by Motion (`framer-motion`), providing subtle entry fades, stagger child animations, tab indicator slides, and hover elevations.
- **Responsiveness**: Flexibly transitions from desktop multi-column grids to single-column stacked mobile views.

---

### 3. AI Tools Usage, Refinements & Manual Code (Part 3)

#### 3.1 AI Tools Employed
- **AI Tool**: Google Antigravity / Gemini 3.6 Flash.
- **Usage Areas**: 
  - Rapid UI layout scaffolding and Shadcn component assembly.
  - Investigating backend Mongoose ObjectId 500 error responses during API debugging.
  - Drafting initial structured documentation outlines.

#### 3.2 What Was Changed, Rejected, or Written Manually

| Feature Area | AI-Generated Draft / Suggestion | Manual Refinement / Rejection | Rationale |
| :--- | :--- | :--- | :--- |
| **Real-time Socket Handling** | Direct `socket.on()` listeners inside individual UI components (`ChatFeed`, `ChatSidebar`). | **Rejected & Rewritten**: Built a centralized [`SocketProvider`](file:///Users/galibremo/Code/chat-app/src/providers/socket-provider.tsx) that directly updates the TanStack Query cache. | Prevents duplicate socket listeners, memory leaks, and out-of-sync component states. |
| **Conversation List Reordering** | Basic `.map()` replacement in socket event callbacks. | **Rewritten**: Authored `updateConversationsList` and `getConversationTimestamp` in [`normalize.ts`](file:///Users/galibremo/Code/chat-app/src/modules/chat/utils/normalize.ts). | Guarantees incoming messages or group updates immediately push active chats to the top. |
| **Socket State Deferred Setter** | Synchronous `setSocket(socketInstance)` in `useEffect`. | **Refactored**: Wrapped in `queueMicrotask(() => setSocket(socketInstance))`. | Resolved React 19 / Next.js state update during render cycle warnings. |
| **Defensive API Error Layer** | Generic `catch (err) { toast(err.message) }`. | **Hand-crafted**: Built [`fetchClient`](file:///Users/galibremo/Code/chat-app/src/lib/api/client.ts) error parser & [`ApiError`](file:///Users/galibremo/Code/chat-app/src/lib/api/errors.ts) normalizer. | Sanitizes raw Mongoose database cast error stack traces before displaying to users. |
| **Centralized Routing** | Hardcoded string paths throughout actions and components. | **Hand-crafted**: Created route registry in [`src/routes/routes.ts`](file:///Users/galibremo/Code/chat-app/src/routes/routes.ts). | Replaced fragile string paths with compile-time type-safe helpers. |
| **Responsive Details Drawer** | Basic `hidden lg:block` sidebar toggle. | **Hand-crafted**: Created [`useMediaQuery`](file:///Users/galibremo/Code/chat-app/src/hooks/use-media-query.ts) hook and animated mobile drawer. | Provides native mobile drawer experience ($< 1024\text{px}$) while preserving desktop column layout. |

---

### 4. Future Improvements & Retrospective

With additional time, the following architectural and feature enhancements would be implemented:

1. **Virtualized Message List (`@tanstack/react-virtual`)**:
   - *Current Implementation*: Standard scroll container rendering loaded message items.
   - *Improvement*: Introduce DOM window virtualization so chat rooms containing $10,000+$ messages render only visible DOM nodes, maintaining 60fps scrolling and low memory overhead.

2. **WebRTC Voice & Video Calls**:
   - Expand the Socket.io signal transport (`offer`, `answer`, `ice-candidate`) to support peer-to-peer and mesh group voice and video calls.

3. **Typing Indicators & Read Receipts**:
   - Emit debounced `typing:start` / `typing:stop` socket events and track read status (`readBy: User[]`) to show double checkmarks when messages are seen.

4. **End-to-End Encryption (E2EE)**:
   - Implement client-side key exchange via Web Crypto API (ECDH / Signal Protocol), ensuring zero-knowledge privacy where even the backend server cannot read message payloads.

5. **Offline Storage & Sync (`@tanstack/query-persist-client`)**:
   - Persist TanStack Query cache to IndexedDB, allowing users to view messages offline and auto-queue outgoing messages for sync when connectivity returns.

6. **Automated End-to-End (E2E) Testing**:
   - Create Playwright test suites validating WebSocket real-time delivery across multiple browser sessions, network disconnect/reconnect scenarios, and admin permission edge cases.

---

## 📄 License & Attribution

Designed and developed for the Chat Application Task.

- **Live Application**: [chat-app-taghyeer.vercel.app](https://chat-app-taghyeer.vercel.app/)

