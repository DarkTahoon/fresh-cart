import selectedProduct from "@/api/selcetedProduct.api";
import Details from "@/app/_components/Details/page";
import React from "react";

export default async function productDetails({ params } :{params : Promise<{id : string}>}) {
  const { id } = await params;
  const data = await selectedProduct(id);
  return (
    <>
      <Details data={data} />
    </>
  );
}
