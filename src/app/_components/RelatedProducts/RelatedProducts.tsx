import React from "react";
import getProductsByCategory from "@/api/productsByCategory.api";
import SingleProduct from "../singleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default async function RelatedProducts({ 
  categoryId, 
  currentProductId 
}: { 
  categoryId: string; 
  currentProductId: string;
}) {
  // Fetch products that share the same category
  const allRelated = await getProductsByCategory(categoryId);

  // Filter out the product we are currently looking at, and grab only the first 4
  const filteredProducts = allRelated
    ?.filter((product: ProductType) => product.id !== currentProductId)
    .slice(0, 4);

  // If there are no related products, don't render the section at all
  if (!filteredProducts || filteredProducts.length === 0) return null;

  return (
    <div className="w-full mb-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          You Might Also Like
        </h2>
      </div>

      <div className="flex flex-wrap -mx-4">
        {filteredProducts.map((product: ProductType) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}