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
import { useParams, useRouter } from "next/navigation";
import { CheckoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/onlineCheckout.action";


export default function Checkout() {
  const {id} : {id: string} = useParams();
  const router = useRouter();
  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
     resolver: zodResolver(CheckoutSchema),
  });

  async function handleCheckout(values : checkoutSchemaType) {
    console.log(values);
    const res = await onlinePayment(id,values);
    console.log(res);
    
    if(res.status === "success"){
      window.location.href = res.session.url;
    }else{
      toast.error("Checkout failed. Please try again.");
    }
    

  }

  return (
    <>
      <div className="w-1/3 mx-auto my-12  p-12 backdrop-blur-md rounded-2xl shadow-lg pt-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckout)}>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>Details: </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                  <FormLabel>Phone: </FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="rounded-md p-2 mb-4">
                  <FormLabel>City: </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
              Pay Now
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
