export default async function selectedProduct(id : string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  console.log(data);
  return data;
}
