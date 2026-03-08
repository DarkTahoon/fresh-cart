export default async function getProducts() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  console.log(data);
  return data;
}
