import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { login } from "./login.actions";
import { route } from "@/routes/routes";
import { setAuthTokenCookie } from "@/lib/cookie";
import { useAuth } from "@/providers/auth-provider";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.token) {
        setAuthTokenCookie(data.token);
      }
      if (data?.user) {
        setUser(data.user);
      }
      const redirectTo = searchParams?.get("redirect") || route.private.chat;
      router.push(redirectTo);
      router.refresh();
    },
  });
};

export const useLogout = () => {
  const { logout: authLogout } = useAuth();

  return {
    mutate: () => {
      authLogout();
    },
    isPending: false,
  };
};
