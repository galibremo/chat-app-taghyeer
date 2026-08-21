import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, "Group name is required"),
  participantIds: z.array(z.string()).min(1, "Select at least one member"),
});

export type CreateGroupSchemaType = z.infer<typeof createGroupSchema>;

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
  text: z.string().trim().min(1, "Message text cannot be empty"),
});

export type SendMessageSchemaType = z.infer<typeof sendMessageSchema>;

export const searchUserSchema = z.object({
  query: z.string().trim(),
});

export type SearchUserSchemaType = z.infer<typeof searchUserSchema>;
