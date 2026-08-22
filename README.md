# 💬 ChatFlow — Real-Time Messaging Application

A state-of-the-art, real-time messaging web application built with **Next.js 16 (App Router)**, **TypeScript**, **TanStack Query (v5)**, **Socket.io-client**, and **TailwindCSS**.

Featuring a hybrid REST + WebSocket architecture, optimistic UI updates, automated real-time conversation sorting, defensive error handling, and a responsive design that seamlessly adapts between desktop split-views and mobile touch drawers.

---

## 🚀 Quick Start Guide

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher
- **pnpm**: `v10.0.0` or higher (Recommended package manager)

---

### Step 1: Installation

Clone the repository and install dependencies using `pnpm`:

```bash
# Install dependencies
pnpm install
```

---

### Step 2: Environment Setup

Create a `.env` file in the root directory (or use the existing `.env` file):

```env
NEXT_PUBLIC_API_URL="https://frontend-task-chatapp.onrender.com/api"
NEXT_PUBLIC_SOCKET_URL="https://frontend-task-chatapp.onrender.com"
```

*Note: If `NEXT_PUBLIC_SOCKET_URL` is omitted, the app automatically falls back to `https://frontend-task-chatapp.onrender.com`.*

---

### Step 3: Run Development Server

Start the local development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

### Step 4: Production Build & Testing

To test production build optimization locally:

```bash
# Build the Next.js production bundle
pnpm build

# Start the production server
pnpm start

# Run ESLint validation
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
chat-app/
├── docs/
│   ├── ARCHITECTURE_AND_IMPLEMENTATION.md  # Detailed technical walkthrough
│   ├── API_DOCUMENTATION.md                # Comprehensive REST & Socket API spec
│   └── SUMMARY.md                          # Part 3 technical reflection & trade-offs
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

## 📖 Documentation & References

- [Architecture & Implementation Guide](file:///Users/galibremo/Code/chat-app/docs/ARCHITECTURE_AND_IMPLEMENTATION.md)
- [API Documentation](file:///Users/galibremo/Code/chat-app/docs/API_DOCUMENTATION.md)
- [Technical Reflection Summary (Part 3)](file:///Users/galibremo/Code/chat-app/docs/SUMMARY.md)

---

*Maintained by the ChatFlow Development Team.*
