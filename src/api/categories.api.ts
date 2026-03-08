// api/categories.api.ts
export default async function getCategories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  console.log(data);
  return data;
}