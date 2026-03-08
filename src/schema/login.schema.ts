import * as z from "zod";
export const loginSchema = z
  .object({
    email: z.string().nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
  });

export type loginSchemaType = z.infer<typeof loginSchema>;