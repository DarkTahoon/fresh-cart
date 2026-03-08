"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { CheckoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/checkoutActions/onlineCheckout.action";
import axios from "axios";
// 1. IMPORT YOUR NEW TOKEN FUNCTION
import getMyToken from "@/utilities/getMyToken";

type AddressType = {
  _id: string;
  name?: string;
  details: string;
  phone: string;
  city: string;
};

export default function Checkout() {
  const { id }: { id: string } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<AddressType[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  const form = useForm<checkoutSchemaType>({
    defaultValues: { details: "", phone: "", city: "" },
    resolver: zodResolver(CheckoutSchema),
  });

  // --- 1. INITIALIZE: GRAB TOKEN & ADDRESSES ---
  useEffect(() => {
    async function initCheckout() {
      try {
        // Use your Server Action to get the token directly from the cookie
        const token = await getMyToken();

        if (token) {
          setUserToken(token as string);

          // Now that we have the token, fetch the addresses
          const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/addresses",
            {
              headers: { token },
            },
          );

          if (data.status === "success") {
            setSavedAddresses(data.data);
          }
        }
      } catch (error) {
        console.error("Initialization Error:", error);
      } finally {
        // Spinner stops here no matter what happens
        setIsLoadingAddresses(false);
      }
    }

    initCheckout();
  }, []);

  // --- 2. SAVE NEW ADDRESS ---
  async function saveAddressToBook() {
    const isValid = await form.trigger();
    if (!isValid || !userToken) return;

    setIsSavingAddress(true);
    const formValues = form.getValues();

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        {
          name: "Home",
          details: formValues.details,
          phone: formValues.phone,
          city: formValues.city,
        },
        { headers: { token: userToken } },
      );

      if (data.status === "success") {
        toast.success("Address saved successfully!");
        setSavedAddresses(data.data);
      }
    } catch (error) {
      toast.error("Failed to save address.");
    } finally {
      setIsSavingAddress(false);
    }
  }

  // --- 3. DELETE ADDRESS ---
  async function deleteAddress(addressId: string) {
    if (!userToken) return;
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
        { headers: { token: userToken } },
      );
      if (data.status === "success") {
        toast.success("Address deleted.");
        setSavedAddresses(data.data);
      }
    } catch (error) {
      toast.error("Could not delete address.");
    }
  }

  // --- 4. SELECT ADDRESS ---
  function handleSelectAddress(address: AddressType) {
    form.setValue("details", address.details);
    form.setValue("phone", address.phone);
    form.setValue("city", address.city);
    toast.success("Address selected!");
  }

  // --- 5. FINAL CHECKOUT ---
  async function handleCheckout(values: checkoutSchemaType) {
    setIsSubmitting(true);
    try {
      const res = await onlinePayment(id, values);
      if (res.status === "success") {
        window.location.href = res.session.url;
      } else {
        toast.error("Checkout failed.");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Payment gateway error.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-24 min-h-[80vh]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Shipping Form */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <i className="fas fa-lock"></i>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                Secure Checkout
              </h2>
            </div>

            <div className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCheckout)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cairo"
                            className="h-12 rounded-xl bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Address Details
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Street, Building, Apt"
                            className="h-12 rounded-xl bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="01XXXXXXXXX"
                            className="h-12 rounded-xl bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-2/3 h-14 bg-purple-600 hover:bg-purple-700 font-bold rounded-xl shadow-lg transition-all"
                    >
                      {isSubmitting ? (
                        <i className="fas fa-spin fa-spinner"></i>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={saveAddressToBook}
                      disabled={isSavingAddress || !userToken}
                      className="w-full sm:w-1/3 h-14 border-purple-200 text-purple-700 font-bold rounded-xl"
                    >
                      {isSavingAddress ? (
                        <i className="fas fa-spin fa-spinner"></i>
                      ) : (
                        "Save Address"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* RIGHT: Address Book */}
        <div className="w-full lg:w-2/5">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 sticky top-24">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-address-book text-purple-600"></i> My Address
              Book
            </h3>

            {isLoadingAddresses ? (
              <div className="flex justify-center py-10">
                <i className="fas fa-spin fa-spinner text-3xl text-purple-600"></i>
              </div>
            ) : savedAddresses.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {savedAddresses.map((address: AddressType) => (
                  <div
                    key={address._id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-400 relative transition-all group shadow-sm"
                  >
                    <button
                      onClick={() => deleteAddress(address._id)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <h4 className="font-bold text-slate-800">{address.city}</h4>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                      {address.details}
                    </p>
                    <Button
                      onClick={() => handleSelectAddress(address)}
                      className="w-full bg-slate-100 text-slate-700 hover:bg-purple-600 hover:text-white rounded-lg font-bold"
                    >
                      Use This Address
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400">No saved addresses found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
