"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { numOfCartProd } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-[100] transition-all duration-300">
        <div className="container mx-auto w-[95%] lg:w-[85%] bg-purple-700/90 backdrop-blur-2xl border border-white/20 rounded-[28px] shadow-2xl">
          <div className="px-6 py-4 flex justify-between items-center relative z-[101]">
            {/* --- LEFT SECTION --- */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 group pointer-events-auto"
              >
                <div className="bg-white p-1.5 rounded-xl shadow-lg">
                  <i className="text-purple-700 fa-solid fa-cart-shopping text-lg"></i>
                </div>
                <span className="text-white text-lg font-black tracking-tighter uppercase">
                  Fresh<span className="text-purple-200">Cart</span>
                </span>
              </Link>

              {/* Desktop Links */}
              <ul className="hidden lg:flex gap-6 items-center">
                <li>
                  <Link
                    className="text-sm font-bold text-white/80 hover:text-white transition-all"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm font-bold text-white/80 hover:text-white transition-all"
                    href="/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm font-bold text-white/80 hover:text-white transition-all"
                    href="/categories"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm font-bold text-white/80 hover:text-white transition-all"
                    href="/brands"
                  >
                    Brands
                  </Link>
                </li>
                {/* Orders Link pointing to homepage section */}
                <li>
                  <Link
                    className="text-sm font-bold text-white/80 hover:text-white transition-all"
                    href="/allorders"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </div>

            {/* --- RIGHT SECTION --- */}
            <div className="flex items-center gap-4">
              {/* CART ICON - Using imported cart1 */}
              <Link
                href="/cart"
                className="relative p-2 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all pointer-events-auto"
              >
                <Image
                  width={40}
                  height={40}
                  src="/images/cart1.png" // Next.js knows this is in the public folder
                  alt="Cart"
                  className="w-8 h-8 object-contain"
                />
                <span className="absolute -top-1 -right-1 bg-white text-purple-700 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-purple-700">
                  {status === "authenticated" ? numOfCartProd : 0}
                </span>
              </Link>

              {/* AUTH BUTTONS */}
              <div className="hidden lg:flex items-center gap-4">
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : status === "unauthenticated" ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="text-sm font-bold text-white px-4 py-2 hover:bg-white/10 rounded-xl transition-all pointer-events-auto"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm font-bold bg-white text-purple-700 px-5 py-2.5 rounded-2xl hover:bg-purple-50 transition-all shadow-lg pointer-events-auto"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-black text-purple-200 tracking-widest leading-none mb-1">
                        Welcome,
                      </p>
                      <p className="text-sm font-bold text-white leading-none">
                        {session?.user?.name}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className="bg-red-500/20 cursor-pointer hover:bg-red-500 text-white p-2.5 rounded-xl border border-red-500/20 transition-all pointer-events-auto"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white p-2 z-[110] relative pointer-events-auto"
              >
                <i
                  className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}
                ></i>
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {isMenuOpen && (
            <div className="lg:hidden px-6 py-8 bg-purple-800 rounded-b-[28px] border-t border-white/10 absolute top-full left-0 right-0 z-[90] animate-in fade-in slide-in-from-top-4">
              <ul className="flex flex-col gap-5">
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold text-white block"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold text-white block"
                    href="/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold text-white block"
                    href="/brands"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-bold text-white block"
                    href="/allorders"
                  >
                    Orders
                  </Link>
                </li>
                <hr className="border-white/10" />
                {status === "unauthenticated" ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href="/login"
                      className="w-full py-4 text-center border border-white/20 text-white font-bold rounded-2xl"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href="/register"
                      className="w-full py-4 text-center bg-white text-purple-700 font-bold rounded-2xl"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <li>
                    <button
                      onClick={logout}
                      className="w-full py-4 text-center cursor-pointer bg-red-500 text-white font-bold rounded-2xl"
                    >
                      Sign Out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
