"use server";
import getMyToken from "@/utilities/getMyToken";
import { redirect } from "next/navigation";
 const addToCart = async(id: string) => {
  const token = await getMyToken();
  if (!token) {
    redirect("/login");
  }
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const payload = await res.json();
  return payload;
};
export default addToCart;