import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./_components/Navbar/NavbarWrapper"; 
import Footer from "./_components/Footer/page"; 
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from "@/MySessionProvider/MySessionProvider";
import CartContextProvider from "@/context/CartContext";
import WishlistContextProvider from "@/context/WishlistContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Premium E-commerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        bg-[url('/images/wallpaper.png')] bg-fixed bg-repeat bg-[length:200px_200px] bg-[#fcfaff]
        min-h-screen flex flex-col`}
      >
        <MySessionProvider>
          <CartContextProvider>
            {/* 2. WRAP WITH WISHLIST CONTEXT PROVIDER */}
            <WishlistContextProvider>
              <Toaster position="top-right" richColors />
              
              <NavbarWrapper />
              
              <main className="relative z-10 flex-grow">
                {children}
              </main>

              <Footer />
            </WishlistContextProvider>
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}