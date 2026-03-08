"use client";
import React, { useContext } from "react";
import cart1 from "../../../../public/images/cart1.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { numOfCartProd } = useContext(CartContext);
 function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <nav className="bg-purple-700 fixed top-0 left-0 right-0 w-full z-50">
        <div className="container w-full lg:w-[80%] mx-auto p-4 gap-4 flex flex-col lg:flex-row justify-between items-center">
          <div className="left">
            <ul className="flex gap-2 lg:gap-6 items-center">
              <li className="text-2xl lg:text-xl flex gap-1">
                <Link className="text-white" href="/">
                  FRESH CART{" "}
                  <i className="text-white fa-solid fa-cart-shopping"></i>
                </Link>
              </li>
              <li>
                <Link className="text-white" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white" href="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link className="text-white" href="/categories">
                  Categories
                </Link>
              </li>
              <li>
                <Link className="text-white" href="/brands">
                  Brands
                </Link>
              </li>
              <li>
                <Link className="text-white flex items-center" href="/cart">
                  Cart
                  <div className="relative ml-1">
                    <Image width={300} height={300} src={cart1} alt="Cart" className="inline-block w-11 h-11" />
                    {session ? (<span className=" text-white rounded-full w-6 h-6 absolute top-[0px] right-[7px]">{numOfCartProd}</span>) : (<span className=" text-white rounded-full w-6 h-6 absolute top-[0px] right-[7px]">0</span>)}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="right ">
            <ul className="flex gap-4 items-center">
              {!session ? (
                <>
                  <li>
                    <i className="fab fa-facebook text-white"></i>
                  </li>
                  <li>
                    <i className="fab fa-twitter text-white"></i>
                  </li>
                  <li>
                    <i className="fab fa-instagram text-white"></i>
                  </li>
                  <li>
                    <i className="fab fa-tiktok text-white"></i>
                  </li>
                  <li>
                    <i className="fab fa-linkedin text-white"></i>
                  </li>
                  <li>
                    <Link className="text-white" href="/register">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link className="text-white" href="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span
                      className="text-white cursor-pointer"
                      onClick={logout}
                    >
                      Sign Out
                    </span>
                  </li>

                  {session && (
                    <li>
                      <h3 className="text-white text-xl">
                        Hi, {session?.user?.name}
                      </h3>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
