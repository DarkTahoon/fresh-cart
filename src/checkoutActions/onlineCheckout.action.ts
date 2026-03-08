"use server";
import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/getMyToken";

export default async function onlinePayment(
  cartId: string,
  formValues: checkoutSchemaType
) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  const payload = await res.json();
  return payload;
}
