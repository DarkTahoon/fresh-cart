import { ProductType } from "@/types/product.type";
import React from "react";
import AddBtn from "../AddBtn/AddBtn";
import Image from "next/image";

export default function Details({data} : {data : ProductType}) {
  return (
    <>
      <div className="container mx-auto w-full  lg:w-[80%] p-5 flex pt-25">
        <div className="w-1/4">
          <div className="border p-5">
            <Image src={data.imageCover} alt={data.title} width={300} height={300} />
          </div>
        </div>
        <div className="w-3/4">
          <div className="p-5">
            <h1 className="text-2xl font-bold my-5">{data.title}</h1>
            <p className="text-gray-600">{data.description}</p>
            <p className="text-lg my-2 text-purple-700 mb-7">{data.category.name}</p>
            <div className="flex justify-between items-center w-full my-4">
              <span>{data.price} EGP</span>
              <span>
                {data.ratingsAverage}
                <i className="fas fa-star text-yellow-300"></i>
              </span>
            </div>
            <AddBtn productId={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
