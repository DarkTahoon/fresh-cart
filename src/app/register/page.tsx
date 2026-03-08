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
import { registerSchema, registerSchemaType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    console.log(values);

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (res.data.message === "success") {
        toast.success("Registration successful",{duration : 3000});
        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `${error.response?.data?.message ?? "Something went wrong"}!`,
          {
            duration: 3000,
          }
        );
      } else {
        toast.error("Unexpected error occurred!", {
          duration: 3000,
        });
      }
    }
  }
  return (
    <>
      <div className="w-1/3 mx-auto my-12  p-12 backdrop-blur-md rounded-2xl shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>Name: </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>rePassword: </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>phone: </FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
