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
import { registerSchema, registerSchemaType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { ExecOptions } from "child_process";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<registerSchemaType>({
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    setIsLoading(true);
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if (res.data.message === "success") {
        toast.success("Account created! Welcome to the family.");
        router.push("/login");
      }
    } catch (error: unknown) {
      toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message ?? "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      
      {/* --- LEFT SIDE: Brand Identity (Solid & Bold) --- */}
      <div className="w-full lg:w-2/5 bg-purple-600 p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <i className="text-purple-600 fa-solid fa-cart-shopping text-xl"></i>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase">FreshCart</span>
          </Link>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
            JOIN THE <br /> <span className="text-purple-200">FAMILY.</span>
          </h1>
          <p className="text-purple-100 mt-6 text-lg font-bold max-w-sm italic">
            Get access to exclusive deals, fast shipping, and a premium shopping experience.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-white/80 font-bold">
            <CheckCircle2 className="w-5 h-5 text-purple-200" />
            <span>Secure 256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 font-bold">
            <CheckCircle2 className="w-5 h-5 text-purple-200" />
            <span>24/7 Customer Support</span>
          </div>
        </div>
        
        {/* Large Decorative Icon Background */}
        <i className="fa-solid fa-cart-shopping absolute -bottom-20 -right-20 text-[300px] text-white/5 rotate-12"></i>
      </div>

      {/* --- RIGHT SIDE: Horizontal Form Layout --- */}
      <div className="w-full lg:w-3/5 bg-white flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-2xl">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create your account</h2>
            <p className="text-slate-500 font-bold mt-1">Fill in the details below to get started.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Full Name</FormLabel>
                    <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><FormControl>
                      <Input placeholder="John Doe" className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0" {...field} />
                    </FormControl></div><FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Email Address</FormLabel>
                    <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><FormControl>
                      <Input type="email" placeholder="john@example.com" className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0" {...field} />
                    </FormControl></div><FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Row 2: Phone Number (Wide) */}
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Phone Number</FormLabel>
                  <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><FormControl>
                    <Input type="tel" placeholder="01XXXXXXXXX" className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0" {...field} />
                  </FormControl></div><FormMessage />
                </FormItem>
              )} />

              {/* Row 3: Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Password</FormLabel>
                    <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><FormControl>
                      <Input type="password" placeholder="••••••••" className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0" {...field} />
                    </FormControl></div><FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="rePassword" render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Confirm Password</FormLabel>
                    <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><FormControl>
                      <Input type="password" placeholder="••••••••" className="h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 font-bold focus:border-purple-600 transition-all ring-0" {...field} />
                    </FormControl></div><FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Solid Submit Button */}
              <div className="pt-6">
                <Button 
                  disabled={isLoading}
                  className="w-full lg:w-auto px-12 h-16 bg-purple-600 hover:bg-purple-700 text-white font-black text-xl rounded-2xl shadow-[0px_8px_0px_0px_rgba(107,33,168,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Complete Registration <ArrowRight className="w-6 h-6" /></>}
                </Button>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <p className="text-slate-500 font-bold text-sm">
                  Already a member? <Link href="/login" className="text-purple-600 hover:underline">Log in to your account</Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}