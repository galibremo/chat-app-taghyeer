import type { Metadata } from "next";
import { LoginPage } from "@/modules/auth/login/components/login-page";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in or register for ChatFlow to access your real-time direct and group conversations.",
  openGraph: {
    title: "Sign In | ChatFlow",
    description:
      "Sign in or register for ChatFlow to access your real-time direct and group conversations.",
    url: "/login",
  },
};

export default function Login() {
  return <LoginPage />;
}
