import getProducts from "@/api/products.api";
import React from "react";
import SingleProduct from "../singleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default async function AllProducts() {
  const data = await getProducts();
  return (
    <>
      <div className="container w-full lg:w-[80%] mx-auto my-12 pt-20">
        <div className=" flex flex-wrap">
          {data.map((currentProduct : ProductType) => (
            <SingleProduct product={currentProduct} key={currentProduct._id} />
          ))}
        </div>
      </div>
    </>
  );
}
