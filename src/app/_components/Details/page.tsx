"use client";

import { ProductType } from "@/types/product.type";
import React, { useState } from "react";
import AddBtn from "../AddBtn/AddBtn";
import Image from "next/image";

export default function Details({ data }: { data: ProductType }) {
  // State to handle the interactive image gallery
  const [activeImg, setActiveImg] = useState(data.imageCover);

  return (
    <>
      <div className="container mx-auto w-full lg:w-[80%] px-4 md:px-0 py-12 pt-24">
        {/* Main Product Section: Stacks on mobile, side-by-side on large screens */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* LEFT SIDE: Image Gallery (lg:w-1/2) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Main Hero Image */}
            <div className="w-full aspect-square relative bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden shadow-sm flex items-center justify-center p-8">
              <Image
                src={activeImg}
                alt={data.title}
                fill
                className="object-contain p-4 transition-all duration-300 ease-in-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnails (Only show if there are multiple images) */}
            {data.images && data.images.length > 1 && (
              <div className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {data.images.map((img: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => setActiveImg(img)}
                    className={`w-24 h-24 relative rounded-xl border-2 cursor-pointer overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      activeImg === img
                        ? "border-purple-600 shadow-md"
                        : "border-slate-200 hover:border-purple-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Product Info (lg:w-1/2) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                {data.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              {data.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-yellow-400 text-lg">
                <i className="fas fa-star"></i>
              </div>
              <span className="text-slate-700 font-semibold text-lg">
                {data.ratingsAverage}
              </span>
              <span className="text-slate-400 text-sm">(Verified Reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-black text-purple-700">
                {data.price}
              </span>
              <span className="text-xl font-bold text-slate-500 ml-2">EGP</span>
            </div>

            {/* Description Divider */}
            <hr className="border-slate-200 mb-6" />

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                About this item
              </h3>
              <p className="text-slate-600 leading-relaxed text-md">
                {data.description}
              </p>
            </div>

            {/* Call to Action (Add to Cart) */}
            <div className="mt-auto w-full md:w-2/3 lg:w-full xl:w-2/3">
              <AddBtn productId={data.id} />
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION WILL GO HERE */}
        <hr className="border-slate-200 mb-12" />
      </div>
    </>
  );
}
