export const route = {
  public: {
    home: "/",
  },
  private: {
    chat: "/chat",
    chatRoom: (conversationId: string) => `/chat/${conversationId}`,
  },
  protected: {
    login: "/login",
  },
} as const;

export const apiRoute = {
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/auth/me",
  conversations: {
    base: "/conversations",
    group: "/conversations/group",
    searchUsers: "/users/search",
    messages: (conversationId: string) =>
      `/conversations/${conversationId}/messages`,
    participants: (conversationId: string) =>
      `/conversations/${conversationId}/participants`,
    participant: (conversationId: string, userId: string) =>
      `/conversations/${conversationId}/participants/${userId}`,
    admins: (conversationId: string) =>
      `/conversations/${conversationId}/admins`,
    detail: (conversationId: string) => `/conversations/${conversationId}`,
  },
  messages: {
    send: "/messages",
  },
} as const;
