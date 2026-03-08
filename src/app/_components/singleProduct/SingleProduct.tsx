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

export default function SingleProduct({ product } : { product: ProductType }) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
        <div className="prod p-4">
          <Card className="hover:shadow-lg hover:scale-105 transition-all p-2 duration-300 cursor-pointer border-purple-700">
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    className="w-full h-48 object-cover"
                    src={product.imageCover}
                    alt="test"
                    width={100}
                    height={100}
                  />
                </CardTitle>
                <CardDescription className="text-purple-600">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="line-clamp-1">
                <p>{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-300"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>
            <AddBtn productId={product.id} />
          </Card>
        </div>
      </div>
    </>
  );
}
