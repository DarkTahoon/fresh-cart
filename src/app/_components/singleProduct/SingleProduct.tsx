import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";
import WishlistToggle from "@/app/_components/WishlistToggle/WishlistToggle"; // 1. Import the toggle

export default function SingleProduct({ product }: { product: ProductType }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
      <div className="prod p-4">
        {/* UPDATED: Added better rounding and a subtle solid shadow */}
        <Card className="relative bg-white border-2 border-slate-100 rounded-[32px] overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(147,51,234,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          
          {/* 2. THE FLOATING HEART TOGGLE */}
          <div className="absolute top-4 right-4 z-20">
            <WishlistToggle productId={product.id} />
          </div>

          <Link href={`/products/${product.id}`}>
            <CardHeader className="p-0">
              <CardTitle>
                <div className="bg-slate-50 p-6">
                   <Image
                    className="w-full h-48 object-contain mix-blend-multiply transition-transform duration-500 hover:scale-110"
                    src={product.imageCover}
                    alt={product.title}
                    width={200}
                    height={200}
                  />
                </div>
              </CardTitle>
              <div className="px-6 pt-4">
                <CardDescription className="text-purple-600 font-black text-[10px] uppercase tracking-widest">
                  {product.category.name}
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="px-6 py-2">
              <p className="text-slate-900 font-bold line-clamp-1 text-lg tracking-tight">
                {product.title}
              </p>
            </CardContent>

            <CardFooter className="px-6 pb-6">
              <div className="flex justify-between items-center w-full">
                <span className="font-black text-slate-900 text-xl tracking-tighter">
                  {product.price} EGP
                </span>
                <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700 font-black text-xs">
                  {product.ratingsAverage}
                  <i className="fas fa-star text-yellow-400"></i>
                </span>
              </div>
            </CardFooter>
          </Link>

          {/* ADD TO CART ACTION */}
          <div className="px-6 pb-6">
            <AddBtn productId={product.id} />
          </div>
        </Card>
      </div>
    </div>
  );
}