"use client";
import React from "react";
import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  ShoppingBag, 
  Send,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/20">
      {/* GLASSY WRAPPER */}
      <div className="bg-white/40 backdrop-blur-xl py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* COLUMN 1: BRAND IDENTITY */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">
                Fresh<span className="text-purple-600">Cart</span>
              </span>
            </Link>
            <p className="text-slate-600 font-bold text-sm leading-relaxed">
              Your premium destination for fresh groceries and daily essentials. 
              Experience the future of shopping with FreshCart.
            </p>
            {/* SOCIAL LINKS */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all hover:-translate-y-1 shadow-sm">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-4">
              {["Products", "Categories", "Wishlist", "Cart","AllOrders"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-slate-500 font-bold text-sm hover:text-purple-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT INFO */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <MapPin className="w-4 h-4 text-purple-600" /> Cairo, Egypt
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <Phone className="w-4 h-4 text-purple-600" /> +20 123 456 789
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                <Mail className="w-4 h-4 text-purple-600" /> support@freshcart.com
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER (STYLISH) */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em]">Stay Fresh</h4>
            <p className="text-slate-600 font-bold text-xs italic">Get 10% off your first order!</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full h-12 bg-white/80 border-2 border-slate-100 rounded-xl px-4 font-bold text-sm focus:border-purple-600 transition-all outline-none"
              />
              <button className="absolute right-1 top-1 w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            © 2026 FreshCart — Designed by <span className="text-purple-600 underline">Omar_Sameh_Tahoun</span>
          </p>
          <div className="flex gap-6">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">Privacy Policy</span>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}