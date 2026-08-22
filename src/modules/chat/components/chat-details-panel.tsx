"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Cancel01Icon,
  PencilEdit01Icon,
  UserGroupIcon,
  UserAdd01Icon,
  Logout01Icon,
} from "hugeicons-react";

import { useAuth } from "@/providers/auth-provider";
import {
  usePromoteAdminMutation,
  useRemoveGroupParticipantMutation,
  useRenameGroupMutation,
} from "../actions/chat.mutations";
import { NormalizedConversation, User } from "../types/chat.types";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatDetailsPanelProps {
  conversation: NormalizedConversation;
  onClose: () => void;
  onOpenAddMembers: () => void;
}

export function ChatDetailsPanel({
  conversation,
  onClose,
  onOpenAddMembers,
}: ChatDetailsPanelProps) {
  const { user } = useAuth();
  const currentUserId = user?._id || "";
  const isGroup = conversation.type === "group";

  const isAdmin = isGroup && conversation.admins.includes(currentUserId);

  const [isEditingName, setIsEditingName] = useState(false);
  const [newGroupName, setNewGroupName] = useState(conversation.name);

  // Confirmation Alert Dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    variant?: "destructive" | "default" | "warning";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const renameGroupMutation = useRenameGroupMutation();
  const promoteAdminMutation = usePromoteAdminMutation();
  const removeParticipantMutation = useRemoveGroupParticipantMutation();

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim() || newGroupName === conversation.name) {
      setIsEditingName(false);
      return;
    }
    renameGroupMutation.mutate(
      { conversationId: conversation._id, name: newGroupName.trim() },
      { onSuccess: () => setIsEditingName(false) },
    );
  };

  const triggerPromoteAlert = (member: User) => {
    setConfirmDialog({
      isOpen: true,
      title: "Promote to Admin",
      description: `Are you sure you want to promote "${member.name}" to admin of "${conversation.name}"?`,
      confirmText: "Promote to Admin",
      variant: "warning",
      onConfirm: () => {
        promoteAdminMutation.mutate(
          { conversationId: conversation._id, userId: member._id },
          {
            onSuccess: () =>
              setConfirmDialog((prev) => ({ ...prev, isOpen: false })),
          },
        );
      },
    });
  };

  const triggerRemoveAlert = (member: User) => {
    setConfirmDialog({
      isOpen: true,
      title: "Remove Member",
      description: `Are you sure you want to remove "${member.name}" from "${conversation.name}"?`,
      confirmText: "Remove Member",
      variant: "destructive",
      onConfirm: () => {
        removeParticipantMutation.mutate(
          { conversationId: conversation._id, userId: member._id },
          {
            onSuccess: () =>
              setConfirmDialog((prev) => ({ ...prev, isOpen: false })),
          },
        );
      },
    });
  };

  const triggerLeaveAlert = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Leave Group",
      description: `Are you sure you want to leave "${conversation.name}"? You will lose access to messaging until re-added.`,
      confirmText: "Leave Group",
      variant: "destructive",
      onConfirm: () => {
        removeParticipantMutation.mutate(
          { conversationId: conversation._id, userId: currentUserId },
          {
            onSuccess: () => {
              setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
              onClose();
            },
          },
        );
      },
    });
  };

  return (
    <>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        className="fixed inset-0 z-50 md:relative md:inset-auto md:z-auto w-full h-full md:w-auto overflow-hidden shrink-0 select-none border-0 md:border-l border-border bg-background"
      >
        <div className="w-full md:w-80 lg:w-96 flex flex-col h-full shrink-0">
          {/* Header */}
          <div className="p-3.5 py-5 border-b border-border flex items-center justify-between bg-card text-card-foreground">
            <h3 className="text-sm font-semibold text-foreground">
              {isGroup ? "Group Details" : "Contact Details"}
            </h3>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Cancel01Icon className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Avatar & Title Section */}
            <div className="text-center space-y-3">
              {isGroup ? (
                <Avatar
                  size="xl"
                  className="mx-auto bg-primary text-primary-foreground"
                >
                  <AvatarFallback className="text-primary-foreground">
                    <UserGroupIcon className="w-9 h-9 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar
                  size="xl"
                  className="mx-auto bg-secondary text-secondary-foreground"
                >
                  <AvatarFallback className="text-secondary-foreground">
                    {conversation.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}

              <div>
                {isEditingName ? (
                  <form
                    onSubmit={handleRename}
                    className="flex items-center gap-2 justify-center"
                  >
                    <Input
                      type="text"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="w-44 text-center bg-background border-input text-foreground"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      variant="link"
                      size="xs"
                      disabled={renameGroupMutation.isPending}
                      className="cursor-pointer text-xs text-primary font-medium hover:underline p-0"
                    >
                      Save
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <h4 className="text-base font-bold text-foreground">
                      {conversation.name}
                    </h4>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => {
                          setNewGroupName(conversation.name);
                          setIsEditingName(true);
                        }}
                        title="Rename group"
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                      >
                        <PencilEdit01Icon className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-1">
                  {isGroup
                    ? `${conversation.participants.length} Participants`
                    : conversation.participant?.phone || "Direct Chat"}
                </p>
              </div>
            </div>

            {/* Group Participants List */}
            {isGroup && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-xs font-semibold text-foreground">
                    Members ({conversation.participants.length})
                  </span>
                  {isAdmin && (
                    <Button
                      variant="link"
                      size="xs"
                      onClick={onOpenAddMembers}
                      className="cursor-pointer flex items-center gap-1 text-xs text-primary hover:underline font-semibold p-0"
                    >
                      <UserAdd01Icon className="w-3.5 h-3.5" />
                      <span>Add Member</span>
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {conversation.participants.map((m) => {
                    const isMemberAdmin = conversation.admins.includes(m._id);
                    const isSelf = m._id === currentUserId;

                    return (
                      <div
                        key={m._id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border hover:bg-accent/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            size="sm"
                            className="bg-secondary text-secondary-foreground"
                          >
                            <AvatarFallback className="text-secondary-foreground">
                              {m.name ? m.name.charAt(0).toUpperCase() : "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-xs font-medium text-foreground flex items-center gap-1.5">
                              {m.name}{" "}
                              {isSelf && (
                                <span className="text-[10px] text-muted-foreground">
                                  (You)
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {m.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isMemberAdmin && (
                            <Badge variant="admin">Admin</Badge>
                          )}

                          {isAdmin && !isSelf && (
                            <div className="flex items-center gap-1">
                              {!isMemberAdmin && (
                                <Button
                                  variant="secondary"
                                  size="xs"
                                  onClick={() => triggerPromoteAlert(m)}
                                  disabled={promoteAdminMutation.isPending}
                                  title="Promote to admin"
                                  className="cursor-pointer text-[10px] px-2 py-1"
                                >
                                  Make Admin
                                </Button>
                              )}
                              <Button
                                variant="destructive"
                                size="xs"
                                onClick={() => triggerRemoveAlert(m)}
                                disabled={removeParticipantMutation.isPending}
                                title="Remove from group"
                                className="cursor-pointer text-[10px] px-2 py-1"
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Leave Group Action */}
            {isGroup && (
              <div className="pt-4 border-t border-border">
                <Button
                  variant="destructive"
                  onClick={triggerLeaveAlert}
                  disabled={removeParticipantMutation.isPending}
                  className="cursor-pointer w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Logout01Icon className="w-4 h-4" />
                  <span>Leave Group</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText={confirmDialog.confirmText}
        variant={confirmDialog.variant}
        isLoading={
          promoteAdminMutation.isPending || removeParticipantMutation.isPending
        }
      />
    </>
  );
}
