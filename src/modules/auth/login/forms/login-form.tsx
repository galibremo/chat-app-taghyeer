"use client";

import React, { useState } from "react";
import { useLogin } from "../actions/login.mutations";
import { loginSchema } from "../schemas/login-schema";
import { normalizeApiError } from "@/lib/api/errors";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; name?: string }>({});

  const { mutate: loginMutate, isPending, error: apiRawError } = useLogin();

  const apiError = apiRawError ? normalizeApiError(apiRawError) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ phone, name });
    if (!result.success) {
      const fieldErrors: { phone?: string; name?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "phone") {
          fieldErrors.phone = issue.message;
        }
        if (issue.path[0] === "name") {
          fieldErrors.name = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    loginMutate(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {apiError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive font-medium flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <svg
            className="size-5 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span>
            {apiError.message ||
              "Failed to log in. Please check your credentials."}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Display Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            className={`w-full rounded-xl border bg-background/50 pl-11 pr-4 py-2.5 text-sm font-medium text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-destructive focus:ring-destructive/30"
                : "border-input focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive font-medium pl-1">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 text-left">
        <label
          htmlFor="phone"
          className="text-sm font-semibold text-foreground"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.114-3.758-6.584-6.584l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="01700000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isPending}
            className={`w-full rounded-xl border bg-background/50 pl-11 pr-4 py-2.5 text-sm font-medium text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
              errors.phone
                ? "border-destructive focus:ring-destructive/30"
                : "border-input focus:border-primary focus:ring-primary/20"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-destructive font-medium pl-1">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="size-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </span>
          ) : (
            "Continue to Chat"
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground pt-1">
        New around here? Entering a new phone number automatically registers
        your account.
      </p>
    </form>
  );
}
