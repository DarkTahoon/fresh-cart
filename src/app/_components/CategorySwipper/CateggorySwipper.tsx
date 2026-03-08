"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

export default function CateggorySwipper({ data }: { data: CategoryType[] }) {
  return (
    <>
      <div className="w-[80%] mx-auto my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Shop by Category
          </h2>
        </div>

        <div className="w-full pb-4">
          <Swiper
            spaceBetween={20}
            modules={[Autoplay]}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 7 },
            }}
            className="px-2 py-4"
          >
            {data.map((category: CategoryType) => (
              <SwiperSlide key={category._id} className="h-auto">
                <Link
                  href={`/categories/${category._id}`}
                  className="block h-full group"
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out flex flex-col items-center p-3 h-full border border-slate-100 group-hover:-translate-y-1">
                    <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-3 bg-slate-50">
                      <Image
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                    <h3 className="text-sm md:text-base text-center font-semibold text-slate-700 group-hover:text-purple-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
