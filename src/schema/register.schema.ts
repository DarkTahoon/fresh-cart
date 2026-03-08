import * as z from "zod";
export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z.string().nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
    rePassword: z.string().nonempty("Confirm Password is required"),
    phone: z
      .string()
      .regex(/^01[0251][0-9]{8}$/,)
      .nonempty("Phone number is required"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
  });



export type registerSchemaType = z.infer<typeof registerSchema>;