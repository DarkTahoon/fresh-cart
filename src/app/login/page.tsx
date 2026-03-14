"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
// Added Home to the icon imports
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, Zap, Home } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.ok) {
      toast.success(`Welcome back!`, { duration: 3000 });
      window.location.href = "/";
    } else {
      setIsLoading(false);
      toast.error(response?.error || "Invalid credentials", { duration: 3000 });
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0f111a]">
      
      {/* --- LEFT SIDE: Brand Identity (Solid Purple) --- */}
      <div className="w-full lg:w-2/5 bg-purple-600 p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              <i className="text-purple-600 fa-solid fa-cart-shopping text-xl"></i>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">FreshCart</span>
          </Link>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
            HELLO <br /> <span className="text-purple-200">AGAIN.</span>
          </h1>
          <p className="text-purple-100 mt-6 text-lg font-bold max-w-sm italic">
            Log in to access your saved addresses, track your orders, and manage your wishlist.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-white/80 font-bold">
            <ShieldCheck className="w-5 h-5 text-purple-200" />
            <span>Secure Authentication</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 font-bold">
            <Zap className="w-5 h-5 text-purple-200" />
            <span>Faster Checkout Process</span>
          </div>
        </div>
        
        {/* Large Decorative Icon Background */}
        <i className="fa-solid fa-cart-shopping absolute -bottom-20 -right-20 text-[300px] text-white/5 rotate-12"></i>
      </div>

      {/* --- RIGHT SIDE: Login Form Area --- */}
      {/* Wrapped in bg-slate-50 to make the white "Floating Card" stand out */}
      <div className="w-full lg:w-3/5 bg-slate-50 flex items-center justify-center p-8 lg:p-16">
        
        {/* THE FLOATING CARD CONTAINER */}
        <div className="w-full max-w-md bg-white p-10 rounded-[40px] border-2 border-slate-100 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.03)]">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sign In.</h2>
            <p className="text-slate-500 font-bold mt-2">Enter your credentials to continue.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest ml-1">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                      <FormControl>
                        <Input 
                          placeholder="omar@example.com" 
                          className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0 shadow-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500 font-bold text-xs" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Password</FormLabel>
                      <button type="button" className="text-[10px] font-black text-purple-600 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0 shadow-none" 
                          {...field} 
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500 font-bold text-xs" />
                  </FormItem>
                )}
              />

              {/* Button Row: Sign In (Primary) + Home (Secondary) */}
              <div className="pt-6 flex gap-4">
                {/* Submit Button */}
                <Button 
                  disabled={isLoading}
                  className="flex-[3] h-16 bg-purple-600 hover:bg-purple-700 text-white font-black text-xl rounded-2xl shadow-[0px_8px_0px_0px_rgba(107,33,168,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </Button>

                {/* Home Button (Matching Design) */}
                <Link href="/" className="flex-1">
                  <Button 
                    type="button"
                    className="w-full h-16 bg-purple-600 hover:bg-purple-700 text-white font-black text-xl rounded-2xl shadow-[0px_8px_0px_0px_rgba(107,33,168,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Home className="w-7 h-7" />
                  </Button>
                </Link>
              </div>

              <div className="pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-500 font-bold text-sm">
                  New here? <Link href="/register" className="text-purple-600 hover:underline">Create a FreshCart account</Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}