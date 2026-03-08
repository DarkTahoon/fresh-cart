import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("User not logged in");
  }
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = await res.json();
  console.log(payload);
  
  return payload;
}
