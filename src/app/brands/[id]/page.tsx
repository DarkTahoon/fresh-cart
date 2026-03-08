// app/brands/[id]/page.tsx
import React from "react";
import getProductsByBrand from "@/api/productsByBrand.api";
import SingleProduct from "@/app/_components/singleProduct/SingleProduct"; // Adjust path as needed
import { ProductType } from "@/types/product.type";

export default async function BrandPage({ params }: { params: { id: string } }) {
  // Fetch products specific to this brand ID
  const data = await getProductsByBrand(params.id);

  return (
    <div className="container w-full lg:w-[80%] mx-auto my-12 pt-20">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 border-b-2 border-purple-200 pb-2">
        Brand Products
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
            No products found for this brand right now.
          </h3>
        </div>
      )}
    </div>
  );
}