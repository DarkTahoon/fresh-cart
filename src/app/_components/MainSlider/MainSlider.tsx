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
import { Autoplay} from "swiper/modules";
export default function MainSlider() {
  return (
    <>
      <div className="w-[80%] mx-auto my-5 flex pt-20">
        <div className="w-3/4">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide><Image className='w-full object-cover h-[400px]' src={img1} alt="Slider Image 1" /></SwiperSlide>
            <SwiperSlide><Image className='w-full object-cover h-[400px]' src={img4} alt="Slider Image 4" /></SwiperSlide>
            <SwiperSlide><Image className='w-full object-cover h-[400px]' src={img5} alt="Slider Image 5" /></SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <Image
            className="w-full object-cover h-[200px]"
            src={img2}
            alt="Slider Image 2"
          />
          <Image
            className="w-full object-cover h-[200px]"
            src={img3}
            alt="Slider Image 3"
          />
        </div>
      </div>
    </>
  );
}
