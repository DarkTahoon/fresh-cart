// app/categories/[id]/page.tsx
import React from "react";
import getProductsByCategory from "@/api/productsByCategory.api";
import SingleProduct from "@/app/_components/singleProduct/SingleProduct"; // Adjust path as needed
import { ProductType } from "@/types/product.type";

export default async function CategoryPage({ params }: { params: { id: string } }) {
  // Fetch products specific to this category ID
  const data = await getProductsByCategory(params.id);

  return (
    <div className="container w-full lg:w-[80%] mx-auto my-12 pt-20">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 border-b-2 border-purple-200 pb-2">
        Category Products
      </h2>
      
      {/* Check if there are products, otherwise show a fallback message */}
      {data && data.length > 0 ? (
        <div className="flex flex-wrap">
          {data.map((product: ProductType) => (
            <SingleProduct product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-500">
            No products found in this category right now.
          </h3>
        </div>
      )}
    </div>
  );
}