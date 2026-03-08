import * as z from "zod";
export const CheckoutSchema = z
  .object({
    details: z.string().nonempty("Details are required"),
    phone: z.string().regex(/^01[1250][0-9]{8}$/, "Invalid phone number").nonempty("Phone number is required"),
    city: z.string().nonempty("City is required"),
  });

export type checkoutSchemaType = z.infer<typeof CheckoutSchema>;