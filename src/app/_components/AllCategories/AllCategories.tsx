import getCategories from "@/api/categories.api";
import React from "react";
import SingleCategory from "../singleCategory/SingleCategory"; // Adjust path as needed
import { CategoryType } from "@/types/category.type";

export default async function AllCategories() {
  const data = await getCategories();
  
  return (
    <>
      {/* 1. Added px-4 so it doesn't hug the screen edges on mobile phones */}
      <div className="container w-full lg:w-[80%] mx-auto my-12 pt-20 px-4 md:px-0">
        
        {/* 2. Added the matching Title and Purple Accent Line */}
        <div className="mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            All Categories
          </h2>
          <span className="block w-16 h-1 bg-purple-600 mt-3 rounded-full"></span>
        </div>

        {/* 3. Added -mx-4 to align the cards flush with the title, and data? safety check */}
        <div className="flex flex-wrap -mx-4">
          {data?.map((currentCategory: CategoryType) => (
            <SingleCategory category={currentCategory} key={currentCategory._id} />
          ))}
        </div>
        
      </div>
    </>
  );
}