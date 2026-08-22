"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import {
  usePromoteAdminMutation,
  useRemoveGroupParticipantMutation,
  useRenameGroupMutation,
} from "../actions/chat.mutations";
import { NormalizedConversation, User } from "../types/chat.types";
import { AlertDialog } from "@/components/ui/alert-dialog";

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
      <div className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-zinc-950 border-l border-zinc-800/80 animate-in slide-in-from-right duration-200 select-none">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
          <h3 className="text-sm font-semibold text-zinc-100">
            {isGroup ? "Group Details" : "Contact Details"}
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Avatar & Title Section */}
          <div className="text-center space-y-3">
            {isGroup ? (
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
                👥
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
                {conversation.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              {isEditingName ? (
                <form
                  onSubmit={handleRename}
                  className="flex items-center gap-2 justify-center"
                >
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="rounded-lg bg-zinc-900 border border-zinc-700 px-2 py-1 text-sm text-zinc-100 text-center"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={renameGroupMutation.isPending}
                    className="cursor-pointer text-xs text-indigo-400 font-medium hover:underline"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h4 className="text-base font-bold text-zinc-100">
                    {conversation.name}
                  </h4>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setNewGroupName(conversation.name);
                        setIsEditingName(true);
                      }}
                      title="Rename group"
                      className="cursor-pointer text-zinc-500 hover:text-indigo-400 text-xs"
                    >
                      ✏️
                    </button>
                  )}
                </div>
              )}

              <p className="text-xs text-zinc-400 mt-1">
                {isGroup
                  ? `${conversation.participants.length} Participants`
                  : conversation.participant?.phone || "Direct Chat"}
              </p>
            </div>
          </div>

          {/* Group Participants List */}
          {isGroup && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-semibold text-zinc-300">
                  Members ({conversation.participants.length})
                </span>
                {isAdmin && (
                  <button
                    onClick={onOpenAddMembers}
                    className="cursor-pointer text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    + Add Member
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {conversation.participants.map((m) => {
                  const isMemberAdmin = conversation.admins.includes(m._id);
                  const isSelf = m._id === currentUserId;

                  return (
                    <div
                      key={m._id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-white text-xs">
                          {m.name ? m.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                            {m.name}{" "}
                            {isSelf && (
                              <span className="text-[10px] text-zinc-500">
                                (You)
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-400">
                            {m.phone}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isMemberAdmin && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Admin
                          </span>
                        )}

                        {isAdmin && !isSelf && (
                          <div className="flex items-center gap-1">
                            {!isMemberAdmin && (
                              <button
                                onClick={() => triggerPromoteAlert(m)}
                                disabled={promoteAdminMutation.isPending}
                                title="Promote to admin"
                                className="cursor-pointer text-[10px] px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                              >
                                Make Admin
                              </button>
                            )}
                            <button
                              onClick={() => triggerRemoveAlert(m)}
                              disabled={removeParticipantMutation.isPending}
                              title="Remove from group"
                              className="cursor-pointer text-[10px] px-2 py-1 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40 transition-colors"
                            >
                              Remove
                            </button>
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
            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={triggerLeaveAlert}
                disabled={removeParticipantMutation.isPending}
                className="cursor-pointer w-full py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/80 text-rose-400 border border-rose-900/60 text-xs font-semibold transition-colors"
              >
                Leave Group
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        }
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
