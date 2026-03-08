import getProducts from "@/api/products.api";
import React from "react";
import SingleProduct from "../singleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default async function AllProducts() {
  const data = await getProducts();
  
  return (
    <>
      {/* 1. Added px-4 for mobile safety */}
      <div className="container w-full lg:w-[80%] mx-auto my-12 pt-20 px-4 md:px-0">
        
        {/* 2. Modernized Title with a subtle border and your purple brand accent */}
        <div className="mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            All Products
          </h2>
          <span className="block w-16 h-1 bg-purple-600 mt-3 rounded-full"></span>
        </div>

        {/* 3. Added -mx-4 to perfectly align the product grid edges with the title */}
        {/* Added a safety '?' to data.map in case the API is slow */}
        <div className="flex flex-wrap -mx-4">
          {data?.map((currentProduct: ProductType) => (
            <SingleProduct product={currentProduct} key={currentProduct.id} />
          ))}
        </div>
        
      </div>
    </>
  );
}