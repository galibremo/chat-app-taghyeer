"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeAuthTokenCookie } from "@/lib/cookie";
import { route } from "@/routes/routes";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: React.ReactNode;
  user: AuthUser | null;
}

export default function AuthProvider({
  children,
  user,
}: Readonly<AuthProviderProps>) {
  const [updatedUser, setUpdatedUser] = useState<AuthUser | null>(user);
  const router = useRouter();

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const setUser = (nextUser: AuthUser | null) => {
    setUpdatedUser(nextUser);
  };

  const logout = () => {
    removeAuthTokenCookie();
    toast.info("Logged out successfully");
    router.push(route.public.home);
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user: updatedUser,
        isAuthenticated: Boolean(updatedUser),
        isLoading: false,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
