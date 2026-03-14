"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import getMyToken from "@/utilities/getMyToken";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistIds: string[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isLoadingWishlist: boolean;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isLoadingWishlist: true,
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);

  // 1. Fetch current wishlist IDs on app load
  async function getLoggedUserWishlist() {
    const token = await getMyToken();
    
    // GUARD: If no token, don't even try the API
    if (!token) {
      setIsLoadingWishlist(false);
      return;
    }

    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      if (data.status === "success") {
        // Storing IDs as strings for fast comparison in buttons
        const ids = data.data.map((item: { _id?: string; id?: string }) => item._id || item.id);
        setWishlistIds(ids);
      }
    } catch (error) {
      console.error("Wishlist GET Error:", error);
    } finally {
      setIsLoadingWishlist(false);
    }
  }

  // 2. Verified Add Function
  async function addToWishlist(productId: string) {
    const token = await getMyToken();
    
    if (!token) {
      toast.error("You must be logged in to save items.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: productId }, // API strictly requires this key name
        { headers: { token } }
      );
      
      if (data.status === "success") {
        setWishlistIds(data.data); // Update local state with new IDs array
        toast.success(data.message || "Added to wishlist! ❤️");
      }
    } catch (error) {
      console.error("Wishlist POST Error:", error);
      toast.error("Could not add to wishlist.");
    }
  }

  // 3. Verified Remove Function
  async function removeFromWishlist(productId: string) {
    const token = await getMyToken();
    
    if (!token) return;

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );
      if (data.status === "success") {
        setWishlistIds(data.data); // Update local state
        toast.success(data.message || "Removed from wishlist");
      }
    } catch (error) {
      console.error("Wishlist DELETE Error:", error);
      toast.error("Could not remove from wishlist.");
    }
  }

  // Initialize wishlist on mount
  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistIds, addToWishlist, removeFromWishlist, isLoadingWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}