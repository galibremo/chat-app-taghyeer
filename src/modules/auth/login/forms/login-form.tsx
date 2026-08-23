"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User02Icon,
  SmartPhone01Icon,
  AlertCircleIcon,
  Loading01Icon,
} from "hugeicons-react";

import { useLogin } from "../actions/login.mutations";
import { loginSchema, type LoginSchemaType } from "../schemas/login-schema";
import { normalizeApiError } from "@/lib/api/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

export default function LoginForm() {
  const { mutate: loginMutate, isPending, error: apiRawError } = useLogin();
  const apiError = apiRawError ? normalizeApiError(apiRawError) : null;

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      name: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    loginMutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {apiError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive font-medium flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircleIcon className="w-5 h-5 shrink-0 mt-0.5" />
          <span>
            {apiError.message ||
              "Failed to log in. Please check your credentials."}
          </span>
        </div>
      )}

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="name">Display Name</FieldLabel>
            <FieldContent>
              <div className="relative flex items-center">
                <User02Icon className="w-5 h-5 text-muted-foreground absolute left-3.5 z-10 pointer-events-none" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...field}
                  disabled={isPending}
                  className={`pl-11 h-11 rounded-xl text-sm font-medium ${
                    fieldState.error
                      ? "border-destructive focus-visible:ring-destructive/30"
                      : ""
                  }`}
                />
              </div>
              <FieldError>{fieldState.error?.message}</FieldError>
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <FieldContent>
              <div className="relative flex items-center">
                <SmartPhone01Icon className="w-5 h-5 text-muted-foreground absolute left-3.5 z-10 pointer-events-none" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01700000000"
                  {...field}
                  disabled={isPending}
                  className={`pl-11 h-11 rounded-xl text-sm font-medium ${
                    fieldState.error
                      ? "border-destructive focus-visible:ring-destructive/30"
                      : ""
                  }`}
                />
              </div>
              <FieldError>{fieldState.error?.message}</FieldError>
            </FieldContent>
          </Field>
        )}
      />

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loading01Icon className="w-5 h-5 animate-spin" />
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
