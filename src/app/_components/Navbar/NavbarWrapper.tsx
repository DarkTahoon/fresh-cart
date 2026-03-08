"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Define the routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/login", "/register"];
  
  // If the current path is login or register, return nothing
  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}