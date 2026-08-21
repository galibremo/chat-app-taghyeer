import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { route } from "@/routes/routes";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPrivateKey = pathname.startsWith(route.private.chat);
  const isAuthKey = pathname.startsWith(route.protected.login);

  // 1. If trying to access protected /chat without token -> redirect to /login?redirect=/chat
  if (isPrivateKey && !token) {
    const loginUrl = new URL(route.protected.login, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If already logged in with token and visiting /login -> redirect to /chat
  if (isAuthKey && token) {
    return NextResponse.redirect(new URL(route.private.chat, request.url));
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: ["/chat", "/chat/:path*", "/login"],
};
