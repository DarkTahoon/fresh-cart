// api/brands.api.ts
export default async function getBrands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  console.log(data);
  return data;
}