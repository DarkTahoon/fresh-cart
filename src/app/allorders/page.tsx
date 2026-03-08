"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import getMyToken from "@/utilities/getMyToken"; // Ensure this path is correct
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    title: string;
    imageCover: string;
    id: string;
  };
}

interface Order {
  _id: string;
  id: number;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: string;
  totalOrderPrice: number;
  cartItems: OrderItem[];
}

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getUserOrders() {
    try {
      // 1. Get the token from your Server Action
      const token = await getMyToken();
      if (!token) {
        setLoading(false);
        return;
      }

      // 2. Decode the token to get your unique User ID
      const decoded  = jwtDecode(token) as { id: string };
      const userId = decoded.id; 

      // 3. Fetch orders specifically for you
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      
      // 4. Reverse so the most recent purchase is at the top
      setOrders(data.reverse());
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader border-t-purple-600 animate-spin rounded-full border-4 border-slate-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-24 min-h-screen mt-20">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Order History</h1>
        <p className="text-slate-500 mt-2 font-medium italic">Track your shipments and view past purchases.</p>
        <div className="w-16 h-1.5 bg-purple-600 mt-5 rounded-full"></div>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-slate-100 shadow-sm rounded-[32px] overflow-hidden hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300">
              
              {/* Order Metadata Header */}
              <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6">
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Date Placed</p>
                    <p className="text-sm font-bold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Total Price</p>
                    <p className="text-sm font-black text-purple-700">{order.totalOrderPrice} EGP</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Badges */}
                  <span className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider ${
                    order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {order.isPaid ? "● Paid Online" : "○ Unpaid"}
                  </span>
                  
                  <span className="px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {order.paymentMethodType === "card" ? "💳 Card" : "💵 Cash"}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-8">
                <div className="space-y-8">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-6">
                      <div className="w-24 h-24 relative bg-slate-50 rounded-3xl border border-slate-100 p-3 shrink-0 shadow-inner">
                        <Image 
                          src={item.product.imageCover} 
                          alt={item.product.title} 
                          fill 
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-lg truncate">{item.product.title}</h4>
                        <p className="text-sm text-slate-500 mt-1 font-medium">
                          Quantity: <span className="text-slate-900">{item.count}</span> • Unit Price: <span className="text-slate-900">{item.price} EGP</span>
                        </p>
                      </div>
                      <div className="text-right font-black text-slate-900 text-lg hidden sm:block">
                        {item.price * item.count} <span className="text-xs text-slate-400">EGP</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Status Footer */}
                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${order.isDelivered ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest">
                      {order.isDelivered ? "Successfully Delivered" : "Processing Shipment"}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Order Ref: {order.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-24 flex flex-col items-center justify-center bg-slate-50/50 rounded-[50px] border-4 border-dashed border-slate-100">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/10">
            <i className="fas fa-shopping-bag text-4xl text-slate-200"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-800">Your order history is empty</h2>
          <p className="text-slate-500 mt-3 mb-10 text-center max-w-sm font-medium">Looks like you haven&apos;t treated yourself to anything yet!</p>
          <Link href="/" className="bg-purple-600 text-white px-12 py-5 rounded-2xl font-black hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95">
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
}