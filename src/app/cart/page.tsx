"use client";
import clearCart from "@/CartActions/clearCart.acction";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import removeCartItem from "@/CartActions/removeCartItem.action";
import UpdateCart from "@/CartActions/updateCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CarProductType } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [products, setProducts] = useState<CarProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentID, setcurrentID] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // Combined disabled state
  const { numOfCartProd, setNumOfCartProd } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");

  async function getuserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        setProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice);
        setCartId(res.cartId);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    setcurrentID(id);
    setIsProcessing(true);
    const res = await removeCartItem(id);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Product removed from cart successfully", { duration: 3000 });
      let sum = 0;
      res.data.products.forEach((product: CarProductType) => {
        sum += product.count;
      });
      setNumOfCartProd(sum);
      setTotalPrice(res.data.totalCartPrice); // Update price without needing a full refetch
    } else {
      toast.error("Failed to remove product", { duration: 3000 });
    }
    setIsProcessing(false);
    setcurrentID("");
  }

  async function updateProductCount(id: string, count: string, sign: string) {
    setcurrentID(id);
    setIsProcessing(true);
    const res = await UpdateCart(id, count);
    if (res.status === "success") {
      setProducts(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
      
      if (sign === "+") {
        setNumOfCartProd(numOfCartProd + 1);
      } else if (sign === "-") {
        setNumOfCartProd(numOfCartProd - 1);
      }
    } else {
      toast.error("Failed to update quantity", { duration: 3000 });
    }
    setIsProcessing(false);
    setcurrentID("");
  }

  async function clearUserCart() {
    setIsProcessing(true);
    const res = await clearCart();
    if (res.message === "success") {
      setProducts([]);
      toast.success("Cart cleared successfully", { duration: 3000 });
      setNumOfCartProd(0);
      setTotalPrice(0);
    } else {
      toast.error("Failed to clear cart", { duration: 3000 });
    }
    setIsProcessing(false);
  }

  useEffect(() => {
    getuserCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="loader"></div> {/* Assuming you have CSS for this loader */}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 md:px-0 py-12 pt-24">
      <div className="mb-8 pb-4 border-b border-slate-100 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Your Cart</h2>
          <span className="block w-16 h-1 bg-purple-600 mt-3 rounded-full"></span>
        </div>
        <span className="text-slate-500 font-medium">{numOfCartProd} Items</span>
      </div>

      {products.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDE: Cart Items List */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {products.map((product: CarProductType) => (
              <div 
                key={product._id} 
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Product Image */}
                <div className="w-full sm:w-24 h-24 relative rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">
                  <Image
                    src={product.product.imageCover}
                    alt={product.product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{product.product.title}</h3>
                  <p className="text-purple-600 font-black mt-1">{product.price} EGP</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-slate-100 bg-slate-50 rounded-lg p-1">
                    <button
                      disabled={isProcessing || product.count <= 1}
                      onClick={() => updateProductCount(product.product.id, `${product.count - 1}`, "-")}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <i className="fas fa-minus text-xs"></i>
                    </button>
                    
                    <div className="w-10 text-center font-bold text-slate-800">
                      {isProcessing && currentID === product.product.id ? (
                        <i className="fas fa-spin fa-spinner text-purple-600"></i>
                      ) : (
                        product.count
                      )}
                    </div>

                    <button
                      disabled={isProcessing}
                      onClick={() => updateProductCount(product.product.id, `${product.count + 1}`, "+")}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <i className="fas fa-plus text-xs"></i>
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    disabled={isProcessing}
                    onClick={() => deleteProduct(product.product.id)}
                    className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing && currentID === product.product.id ? (
                      <i className="fas fa-spin fa-spinner"></i>
                    ) : (
                      <i className="fas fa-trash"></i>
                    )}
                  </button>
                </div>
              </div>
            ))}
            
            {/* Clear Cart Button */}
            <div className="flex justify-start mt-4">
              <button 
                onClick={clearUserCart}
                disabled={isProcessing}
                className="text-red-500 font-bold text-sm hover:underline disabled:opacity-50 flex items-center gap-2"
              >
                <i className="fas fa-trash-alt"></i> Clear Entire Cart
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary Card */}
          <div className="w-full lg:w-1/3">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 sticky top-24">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h3>
              
              <div className="flex justify-between items-center mb-4 text-slate-600">
                <span>Subtotal ({numOfCartProd} items)</span>
                <span className="font-semibold">{totalPrice} EGP</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <i className="fas fa-check-circle"></i> Free
                </span>
              </div>
              
              <hr className="border-slate-200 mb-6" />
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-slate-800">Total</span>
                <span className="text-3xl font-black text-purple-700">{totalPrice} <span className="text-lg">EGP</span></span>
              </div>

              <Link href={`/checkout/${cartId}`} className="block w-full">
                <Button className="w-full h-14 text-lg font-bold bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2">
                  Proceed to Checkout <i className="fas fa-arrow-right"></i>
                </Button>
              </Link>
            </div>
          </div>

        </div>
      ) : (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-shopping-cart text-4xl text-purple-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is completely empty</h2>
          <p className="text-slate-500 mb-8 text-center max-w-md">Looks like you haven&apos;t added anything to your cart yet. Let&apos;s get some items in there!</p>
          <Link href="/">
            <Button className="h-12 px-8 text-base font-bold bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg transition-all">
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}