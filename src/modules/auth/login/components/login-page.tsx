"use client";

import LoginForm from "../forms/login-form";

export function LoginPage() {
  return (
    <main className="from-background via-background to-muted/20 relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br p-4 sm:p-6">
      {/* Dynamic Background Blur Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="bg-primary/10 absolute -top-20 -left-20 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/15 absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="border-border/60 bg-background/80 hover:border-border/80 space-y-6 rounded-3xl border p-8 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300">
          <div className="flex flex-col items-center space-y-2 text-center">
            {/* App Icon / Logo */}
            <div className="size-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 mb-2">
              <svg
                className="size-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.007-.887l.583-2.332A7.323 7.323 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <h1 className="text-foreground text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Enter your name and phone number to sign in or register
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
