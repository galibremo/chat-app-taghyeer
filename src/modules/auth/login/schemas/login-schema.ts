import { z } from "zod";
import { validateString } from "@/validators/common-rule";

export const loginSchema = z.object({
  phone: validateString("Phone number", { min: 3, max: 30 }),
  name: validateString("Name", { min: 2, max: 100 }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

