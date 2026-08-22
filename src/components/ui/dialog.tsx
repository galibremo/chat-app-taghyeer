"use client";

import * as React from "react";
import { Cancel01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function Dialog({ isOpen, onClose, children, className }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xs p-4 animate-in fade-in duration-150 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-md rounded-2xl bg-card text-card-foreground border border-border p-6 shadow-xl space-y-4 animate-in zoom-in-95 duration-150 relative",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border pb-3",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-bold text-foreground", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-muted-foreground mt-0.5", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2.5 pt-3 border-t border-border",
        className,
      )}
      {...props}
    />
  );
}

function DialogClose({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
        className,
      )}
      title="Close"
    >
      <Cancel01Icon className="w-4 h-4" />
    </button>
  );
}

export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
