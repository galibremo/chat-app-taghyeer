"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "default" | "warning";
  isLoading?: boolean;
}

export function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "destructive",
  isLoading = false,
}: AlertDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-in fade-in duration-150 select-none">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {variant === "destructive" && (
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-bold">
                ⚠️
              </div>
            )}
            {variant === "warning" && (
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                👑
              </div>
            )}
            {variant === "default" && (
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">
                ℹ️
              </div>
            )}
            <h3 className="text-base font-bold text-zinc-100">{title}</h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed pl-10">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-800/80">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
          >
            {cancelText}
          </Button>

          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold transition-all shadow-md",
              variant === "warning" &&
                "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30",
              variant === "destructive" &&
                "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30",
              variant === "default" &&
                "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30",
            )}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
