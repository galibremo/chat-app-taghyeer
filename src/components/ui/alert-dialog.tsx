"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader className="border-b-0 pb-0">
        <div className="flex items-center gap-2">
          {variant === "destructive" && (
            <div className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-sm font-bold shrink-0">
              ⚠️
            </div>
          )}
          {variant === "warning" && (
            <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              👑
            </div>
          )}
          {variant === "default" && (
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
              ℹ️
            </div>
          )}
          <DialogTitle>{title}</DialogTitle>
        </div>
      </DialogHeader>

      <DialogDescription className="pl-10 text-xs leading-relaxed">
        {description}
      </DialogDescription>

      <DialogFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          disabled={isLoading}
          className="cursor-pointer"
        >
          {cancelText}
        </Button>

        <Button
          variant={variant === "destructive" ? "destructive" : "default"}
          size="sm"
          onClick={onConfirm}
          disabled={isLoading}
          className="cursor-pointer"
        >
          {isLoading ? "Processing..." : confirmText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
