import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Update the import to the wrapper
import NavbarWrapper from "./_components/Navbar/NavbarWrapper"; 
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from "@/MySessionProvider/MySessionProvider";
import CartContextProvider from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart | Omar Mohamed", // Updated for your brand
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
          <CartContextProvider>
            <Toaster position="top-right" richColors />
            
            {/* The wrapper handles the conditional logic */}
            <NavbarWrapper />
            
            {children}
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}