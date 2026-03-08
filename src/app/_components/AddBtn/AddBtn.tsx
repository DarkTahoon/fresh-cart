"use client";
import addToCart from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddBtn({ productId }: { productId: string }) {
  // We only need one state to handle both the spinner and disabling the button!
  const [isLoading, setIsLoading] = useState(false);
  const { setNumOfCartProd } = useContext(CartContext);

  async function handleAddToCart() {
    setIsLoading(true);
    
    const res = await addToCart(productId);
    
    if (res.status === "success") {
      toast.success("Product added to cart successfully!", { duration: 3000 });
      setNumOfCartProd((prev: number) => prev + 1);
    } else {
      toast.error("Failed to add product to cart.", { duration: 3000 });
    }
    
    // We only need to set this to false once at the very end
    setIsLoading(false);
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleAddToCart}
      className="w-full h-14 text-lg font-bold bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
    >
      {isLoading ? (
        <i className="fas fa-spin fa-spinner text-xl"></i>
      ) : (
        <>
          <i className="fas fa-cart-plus text-xl"></i>
          Add to Cart
        </>
      )}
    </Button>
  );
}