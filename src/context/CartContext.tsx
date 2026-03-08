"use client";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import { CarProductType } from "@/types/cart.type";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type CartContextType = {
  numOfCartProd: number;
  setNumOfCartProd: Dispatch<SetStateAction<number>>;
  totalCartPrice: number;
  setTotalCartPrice: Dispatch<SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType>({
  numOfCartProd: 0,
  setNumOfCartProd: () => {},
  totalCartPrice: 0,
  setTotalCartPrice: () => {},
});

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numOfCartProd, setNumOfCartProd] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const payload = await getLoggedUserCart();
      if (payload.status === "success") {
        const totalItems = payload.data.products.reduce(
          (a: number, c: CarProductType) => a + c.count,
          0
        );
        setNumOfCartProd(totalItems);
        setTotalCartPrice(payload.data.totalCartPrice);
      }
    })();
  }, []);
  return (
    <CartContext.Provider
      value={{
        numOfCartProd,
        setNumOfCartProd,
        totalCartPrice,
        setTotalCartPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}