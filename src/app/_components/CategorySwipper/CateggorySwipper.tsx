"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";

export default function CateggorySwipper({ data }: { data: CategoryType[] }) {
  
  return (
    <>
      <div className="w-[80%] mx-auto my-5">
        <h6 className="text-slate-600 text-lg font-semibold my-2">Categories : </h6>
        <div className="w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={8}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
          >
            {data.map((category : CategoryType) => (
              <SwiperSlide className="mx-3 border border-purple-600 rounded-3xl bg-purple-700 cursor-pointer" key={category._id}>
                <Image
                  className="w-full object-cover h-[200px] rounded-3xl"
                  src={category.image}
                  alt="Slider Image 5"
                  width={200}
                  height={200}
                />
                <h2 className=" text-center text-white font-bold">{category.name}</h2>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
