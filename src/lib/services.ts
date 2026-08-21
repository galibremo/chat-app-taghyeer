import { cache } from "react";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/api/client";

export const getSessionUser = cache(async (): Promise<AuthUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      return json as AuthUser;
    }
  } catch (error) {
    console.error("Failed to fetch session on server:", error);
  }
  return null;
});

