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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeDisabled, setremoveDisabled] = useState(false);
  const [updateDisabled, setupdateDisabled] = useState(false);
  const [currentID, setcurrentID] = useState("");
  const [updateLoading, setupdateLoading] = useState(false);
  const { numOfCartProd , setNumOfCartProd } = useContext(CartContext);
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
    setremoveDisabled(true);
    const res = await removeCartItem(id);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Product removed from cart successfully", {
        duration: 3000,
      });
      let sum =0;
      setremoveDisabled(false);
      res.data.products.forEach((product: CarProductType) => {
        sum += product.count;
      });
      setNumOfCartProd(sum);
      getuserCart();
    } else {
      toast.error("Failed to remove product from cart", { duration: 3000 });
      setremoveDisabled(false);
    }
  }

  async function updateProductCount(id: string, count: string, sign: string) {
    setcurrentID(id);
    setupdateLoading(true);
    setupdateDisabled(true);
    const res = await UpdateCart(id, count);
    if (res.status === "success") {
      setProducts(res.data.products);
      toast.success("Product quantity updated successfully", {
        duration: 3000,
      });
      if (sign === "+") {
        setNumOfCartProd(numOfCartProd + 1);
      } else if (sign === "-") {
        setNumOfCartProd(numOfCartProd - 1);
      }
      setupdateDisabled(false);
      setupdateLoading(false);
      getuserCart();
    } else {
      toast.error("Failed to update product quantity", { duration: 3000 });
      setupdateDisabled(false);
      setupdateLoading(false);
    }
    
  }

  async function clearUserCart() {
    const res = await clearCart();
    if (res.message === "success") {
      setProducts([]);
      toast.success("Cart cleared successfully", {
        duration: 3000,
      });
      setNumOfCartProd(0);
    } else {
      toast.error("Failed to clear cart", { duration: 3000 });
    }
  }

  useEffect(() => {
    getuserCart();
  }, []);

  if (loading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center mt-30">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="w-2/3 mx-auto my-12 bg-purple-300 p-6 rounded-lg flex flex-col gap-6 shadow-2xl mt-30">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRODUCT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    QTY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRICE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product : CarProductType) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        width={100}
                        height={100}
                        src={product.product.imageCover}
                        className="rounded-2xl w-16 md:w-32 max-w-full max-h-full shadow-lg"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center border-2 border-purple-300 max-w-max rounded-lg px-2 py-1">
                        <button
                          disabled= {updateDisabled}
                          onClick={() => updateProductCount(product.product.id, `${product.count - 1}`, "-")}
                          className="disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          { product.product.id === currentID ? updateLoading ? <i className="fas fa-spin fa-spinner"></i> : <span>{product.count}</span> :<span>{product.count}</span>}
                          {}
                        </div>
                        <button
                          disabled= {updateDisabled}
                          onClick={() => updateProductCount(product.product.id, `${product.count + 1}`, "+")}
                          className="disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        disabled={removeDisabled}
                        onClick={() => deleteProduct(product.product.id)}
                        className="disabled:opacity-80 disabled:cursor-not-allowed disabled:bg-red-700 flex items-center font-bold dark:text-red-500 bg-red-600 text-white cursor-pointer border-2 border-red-500 px-6 py-3 rounded-4xl hover:bg-red-700 hover:border-red-700"
                      >
                        Remove{" "}
                        <i className="fas fa-trash mb-[-5px] text-white"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h1 className="text-white text-2xl text-center p-9 font-bold bg-purple-600 rounded-lg shadow-md">
            Total Price: {totalPrice} EGP
          </h1>
          <div className="flex justify-center space-x-4 mt-4">
               <Button className="bg-red-600 text-white hover:bg-red-700 w-1/2 cursor-pointer" onClick={() => clearUserCart()}>Clear Cart{" "} <i className="fas fa-trash mb-[-3px]"></i></Button>
               <Link className="w-1/2" href={`/checkout/${cartId}`}>
               <Button className="bg-indigo-500 text-white hover:bg-indigo-700 w-full cursor-pointer">check out{" "} <i className="fa-solid fa-bag-shopping mb-[-3px]" style={{color: "#ffffff"}}></i></Button>
               </Link>
          </div>
        </div>
      ) : (
        <div className="bg-purple-500 rounded-2xl shadow-2xl w-2/3 mx-auto my-12 mt-30">
          <h1 className="text-white text-2xl text-center p-9 font-bold">
            Your cart is empty
          </h1>
        </div>
      )}
    </>
  );
}
