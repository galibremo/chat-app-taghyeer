import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { login } from "./login.actions";
import { route } from "@/routes/routes";
import { setAuthTokenCookie } from "@/lib/cookie";
import { useAuth } from "@/providers/auth-provider";
import { normalizeApiError } from "@/lib/api/errors";

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
      toast.success(
        data?.user?.name
          ? `Welcome back, ${data.user.name}!`
          : "Logged in successfully!",
      );
      const redirectTo = searchParams?.get("redirect") || route.private.chat;
      router.push(redirectTo);
      router.refresh();
    },
    onError: (error) => {
      const apiError = normalizeApiError(error);
      toast.error(apiError.message || "Failed to log in. Please try again.");
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
