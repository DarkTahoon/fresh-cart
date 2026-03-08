// components/singleCategory/SingleCategory.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { CategoryType } from "@/types/category.type";

export default function SingleCategory({ category }: { category: CategoryType }) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
        <div className="prod p-4 h-full">
          <Card className="hover:shadow-lg hover:scale-105 transition-all p-2 duration-300 cursor-pointer border-purple-700 h-full">
            {/* Assuming you want to route to a category page */}
            <Link href={`/categories/${category._id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    className="w-full h-48 object-cover rounded-md"
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center mt-2">
                <p className="text-lg font-bold text-purple-700 uppercase tracking-wide">
                  {category.name}
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}