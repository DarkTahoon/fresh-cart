"use client";
import Image from "next/image";
import React from "react";
import img1 from "../../../../public/images/slider-image-1.jpeg";
import img2 from "../../../../public/images/slider-image-2.jpeg";
import img3 from "../../../../public/images/slider-image-3.jpeg";
import img4 from "../../../../public/images/grocery-banner.png";
import img5 from "../../../../public/images/grocery-banner-2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Pagination } from "swiper/modules";

export default function MainSlider() {
  return (
    <>
      <div className="w-full md:w-[80%] mx-auto my-5 flex flex-col md:flex-row pt-30 px-4 md:px-0 gap-4">
        <div className="w-full md:w-3/4 rounded-2xl overflow-hidden shadow-sm">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            className="h-full"
          >
            <SwiperSlide>
              <Image priority className="w-full object-cover h-[300px] md:h-[400px]" src={img1} alt="Main Banner 1" />
            </SwiperSlide>
            <SwiperSlide>
              <Image className="w-full object-cover h-[300px] md:h-[400px]" src={img4} alt="Main Banner 2" />
            </SwiperSlide>
            <SwiperSlide>
              <Image className="w-full object-cover h-[300px] md:h-[400px]" src={img5} alt="Main Banner 3" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-4">
          <div className="w-1/2 md:w-full h-[150px] md:h-[192px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
            <Image
              priority
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              src={img2}
              alt="Promo Banner 1"
            />
          </div>
          <div className="w-1/2 md:w-full h-[150px] md:h-[192px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
            <Image
              priority
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              src={img3}
              alt="Promo Banner 2"
            />
          </div>
        </div>
        
      </div>
    </>
  );
}