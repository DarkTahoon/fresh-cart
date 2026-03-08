import getBrands from "@/api/brands.api";
import React from "react";
import SingleBrand from "../singleBrand/SingleBrand"; // Adjust path as needed
import { BrandType } from "@/types/brand.type";

export default async function AllBrands() {
  const data = await getBrands();
  
  return (
    <>
      {/* 1. Added mobile padding */}
      <div className="container w-full lg:w-[80%] mx-auto my-12 pt-20 px-4 md:px-0">
        
        {/* 2. Added the matching Title and Purple Accent Line */}
        <div className="mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            All Brands
          </h2>
          <span className="block w-16 h-1 bg-purple-600 mt-3 rounded-full"></span>
        </div>
        <div className="flex flex-wrap -mx-4">
          {data?.map((currentBrand: BrandType) => (
            <SingleBrand brand={currentBrand} key={currentBrand._id} />
          ))}
        </div>
        
      </div>
    </>
  );
}