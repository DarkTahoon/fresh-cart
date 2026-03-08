export default async function getAllcategories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}