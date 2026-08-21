export const route = {
  public: {
    home: "/",
  },
  private: {
    chat: "/chat",
  },
  protected: {
    login: "/login",
  },
} as const;

export const apiRoute = {
  me: "/auth/me",
  login: "/auth/login",
  logout: "/auth/logout",
} as const;

