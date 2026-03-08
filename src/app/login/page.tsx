"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    console.log(values);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.ok) {
      toast.success("Logged in successfully", { duration: 3000 });
      window.location.href = "/";
    } else {
      toast.error(response?.error || "Invalid credentials", { duration: 3000 });
    }
  }

  return (
    <>
      <div className="w-1/3 mx-auto my-12  p-12 backdrop-blur-md rounded-2xl shadow-lg pt-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>password: </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
