"use client"
import addToCart from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
export default function AddBtn( {productId} : {productId:string}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { setNumOfCartProd } = useContext(CartContext);
  async function checkAddToCart(productId : string) {
    setIsLoading(true);
    setIsDisabled(true);
    const res = await addToCart(productId);
    if (res.status === "success") {
      toast.success("Product added to cart successfully!", { duration: 3000 });
      setIsLoading(false);
      setIsDisabled(false);
      setNumOfCartProd((prev) => prev + 1);
    }else{
      toast.error("Failed to add product to cart.", { duration: 3000 });
      setIsLoading(false);
      setIsDisabled(false);
    }
  }
  return (
    <>
      <Button
      disabled={isDisabled}
       onClick={() => checkAddToCart(productId)} className="disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-purple-800 w-full cursor-pointer bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-all duration-300">
        {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Add to Cart"}
      </Button>
    </>
  );
}
