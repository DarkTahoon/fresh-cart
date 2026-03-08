// api/productsByCategory.api.ts
export default async function getProductsByCategory(categoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  return data;
}