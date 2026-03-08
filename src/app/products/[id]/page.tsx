import React from "react";
import Details from "@/app/_components/Details/page"; // Adjust path if needed
import RelatedProducts from "@/app/_components/RelatedProducts/RelatedProducts"; // Adjust path if needed
import getSingleProduct from "@/api/selcetedProduct.api"; // Use your actual API fetcher here

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch the main product data
  const product = await getSingleProduct(params.id);

  return (
    <main>
      {/* 1. The interactive client component for the gallery and info */}
      <Details data={product} />

      {/* 2. The server component for related products placed right underneath! */}
      <div className="container mx-auto w-full lg:w-[80%] px-4 md:px-0">
        <RelatedProducts 
          categoryId={product.category._id} 
          currentProductId={product.id} 
        />
      </div>
    </main>
  );
}