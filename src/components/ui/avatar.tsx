"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-xs rounded-full",
      md: "w-10 h-10 text-sm rounded-xl",
      lg: "w-11 h-11 text-base rounded-xl",
      xl: "w-20 h-20 text-3xl rounded-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden shadow-xs font-bold text-secondary-foreground bg-secondary border border-border select-none transition-transform",
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Avatar.displayName = "Avatar";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-inherit font-bold text-secondary-foreground",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback };
