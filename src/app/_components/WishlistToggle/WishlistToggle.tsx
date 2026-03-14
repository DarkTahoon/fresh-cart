"use client";
import React, { useContext, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { WishlistContext } from "@/context/WishlistContext";


export default function WishlistToggle({ productId }: { productId: string }) {
  const { wishlistIds, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [isPending, setIsPending] = useState(false);
  

  // Check if this specific product is in the global wishlist array
  const isWishlisted = wishlistIds.includes(productId);

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    setIsPending(true);
    
    if (isWishlisted) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
    
    setIsPending(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`
        w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
        ${isWishlisted 
          ? "bg-purple-600 text-white shadow-lg scale-110 rotate-[10deg]" 
          : "bg-white text-slate-400 border border-slate-100 hover:text-purple-600 hover:border-purple-200 shadow-sm"
        }
        active:scale-90 disabled:opacity-50
      `}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
      )}
    </button>
  );
}