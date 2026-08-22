import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(3, "Phone number must be at least 3 characters")
    .max(30, "Phone number must be at most 30 characters"),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
