import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/auth-provider";
import { getSessionUser } from "@/lib/services";
import { ThemeProvider } from "@/providers/theme-provider";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://chatflow.app"
  ),
  title: {
    default: "ChatFlow - Real-Time Direct & Group Messaging",
    template: "%s | ChatFlow",
  },
  description:
    "ChatFlow is a modern real-time messaging platform powered by Socket.io, featuring optimistic message updates, direct & group chat, and admin management.",
  keywords: [
    "ChatFlow",
    "real-time chat",
    "messaging app",
    "Socket.io",
    "group messaging",
    "direct chat",
    "Next.js",
  ],
  authors: [{ name: "ChatFlow Team" }],
  creator: "ChatFlow",
  publisher: "ChatFlow",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ChatFlow",
    title: "ChatFlow - Real-Time Direct & Group Messaging",
    description:
      "Connect instantly with real-time direct & group chat. Experience lightning-fast Socket.io messaging and optimistic updates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatFlow - Real-Time Direct & Group Messaging",
    description:
      "Connect instantly with real-time direct & group chat. Experience lightning-fast Socket.io messaging and optimistic updates.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<GlobalLayoutProps>) {
  const user = await getSessionUser();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <AuthProvider user={user}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
