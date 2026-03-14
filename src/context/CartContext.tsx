"use client";
import React, { createContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import { toast } from "sonner";
import getMyToken from "@/utilities/getMyToken";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import { CarProductType } from "@/types/cart.type";

type CartContextType = {
  numOfCartProd: number;
  setNumOfCartProd: Dispatch<SetStateAction<number>>;
  totalCartPrice: number;
  setTotalCartPrice: Dispatch<SetStateAction<number>>;
  addToCart: (productId: string) => Promise<boolean>;
};

export const CartContext = createContext<CartContextType>({
  numOfCartProd: 0,
  setNumOfCartProd: () => {},
  totalCartPrice: 0,
  setTotalCartPrice: () => {},
  addToCart: async () => false,
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [numOfCartProd, setNumOfCartProd] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  // Helper function to calculate total quantity so we don't repeat code
  const calculateTotalQuantity = (products: CarProductType[]) => {
    return products.reduce((acc, current) => acc + current.count, 0);
  };

  async function addToCart(productId: string): Promise<boolean> {
    const token = await getMyToken();
    if (!token) {
      toast.error("Please login first!");
      return false;
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token } }
      );

      if (data.status === "success") {
        // FIX: Don't use data.numOfCartItems. 
        // Calculate the real sum from the products array returned by the API.
        const totalCount = calculateTotalQuantity(data.data.products);
        
        setNumOfCartProd(totalCount);
        setTotalCartPrice(data.data.totalCartPrice);
        toast.success("Added to cart! 🛒");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Failed to add to cart");
      return false;
    }
  }

  useEffect(() => {
    (async () => {
      const payload = await getLoggedUserCart();
      if (payload?.status === "success") {
        const totalItems = calculateTotalQuantity(payload.data.products);
        setNumOfCartProd(totalItems);
        setTotalCartPrice(payload.data.totalCartPrice);
      }
    })();
  }, []);

  return (
    <CartContext.Provider value={{ numOfCartProd, setNumOfCartProd, totalCartPrice, setTotalCartPrice, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}