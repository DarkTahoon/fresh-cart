"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import getMyToken from "@/utilities/getMyToken";
import { Trash2, ShoppingCart, Heart, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import Link from "next/link";

// Define the structure for the Product in the wishlist
interface WishlistProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string };
  ratingsAverage: number;
}

export default function WishlistPage() {
  const { addToCart } = useContext(CartContext);
  const { wishlistIds, removeFromWishlist } = useContext(WishlistContext);
  
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movingToCartId, setMovingToCartId] = useState<string | null>(null);

  // 1. Fetch the full product details for the wishlist
  async function fetchWishlistData() {
    const token = await getMyToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      if (data.status === "success") {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error("Failed to load wishlist items");
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }

  // 2. Handle the "Move to Cart" logic
  async function handleMoveToCart(productId: string) {
    setMovingToCartId(productId);
    
    // Attempt to add to cart using our new Context function
    const success = await addToCart(productId);
    
    if (success) {
      // If added to cart successfully, remove from wishlist
      await removeFromWishlist(productId);
      // Update local UI state to remove the item from the list
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Item moved to your cart!");
    }
    
    setMovingToCartId(null);
  }

  // 3. Handle simple removal
  async function handleRemove(productId: string) {
    await removeFromWishlist(productId);
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  }

  useEffect(() => {
    fetchWishlistData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaff]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <p className="font-black text-slate-900 uppercase tracking-widest text-sm">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-32 min-h-screen">
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
            My <span className="text-purple-600">Wishlist</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 italic flex items-center gap-2">
            You have {products.length} items saved to your collection.
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white border-2 border-slate-100 rounded-4x p-6 flex flex-col md:flex-row items-center gap-8 shadow-[12px_12px_0px_0px_rgba(147,51,234,0.05)] transition-all hover:shadow-[16px_16px_0px_0px_rgba(147,51,234,0.1)] hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="w-40 h-40 shrink-0 bg-slate-50 rounded-2xl overflow-hidden p-4 relative">
                <img 
                  src={product.imageCover} 
                  alt={product.title} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              {/* Product Info */}
              <div className="grow text-center md:text-left">
                <span className="text-purple-600 font-black text-[10px] uppercase tracking-widest bg-purple-50 px-2 py-1 rounded-md">
                  {product.category.name}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 line-clamp-1 tracking-tight">
                  {product.title}
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                   <p className="text-3xl font-black text-slate-900 tracking-tighter">{product.price} EGP</p>
                   <span className="text-yellow-500 font-bold text-sm flex items-center gap-1">
                     <i className="fa-solid fa-star"></i> {product.ratingsAverage}
                   </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button 
                  onClick={() => handleMoveToCart(product._id)}
                  disabled={movingToCartId === product._id}
                  className="h-14 px-8 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-[0px_6px_0px_0px_rgba(107,33,168,1)] active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 min-w-45"
                >
                  {movingToCartId === product._id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" /> Move to Cart
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={() => handleRemove(product._id)}
                  variant="outline" 
                  className="h-14 px-6 border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all rounded-2xl font-black group/trash"
                >
                  <Trash2 className="w-5 h-5 group-hover/trash:shake" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white/50 backdrop-blur-md border-4 border-dashed border-slate-200 rounded-[40px] p-20 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Your wishlist is empty, Omar!</h2>
          <p className="text-slate-500 font-medium mt-2">Looks like you have not found your favorites yet.</p>
          <Link href="/">
            <Button className="mt-8 h-14 px-10 bg-slate-900 hover:bg-black text-white font-black rounded-2xl flex items-center gap-2 mx-auto transition-all hover:gap-4 shadow-xl">
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}