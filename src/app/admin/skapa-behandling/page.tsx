"use client";

import React from "react";

import {
  Product,
  addTreatment,
  updateTreatment,
} from "@/axios-instances/axios-instances";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RotatingLines } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  imageCover: z.string(),
});

export default function AddTreatment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const goBackHandler = () => {
    router.push("/admin");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageCover: "",
      price: "",
    },
  });

  const {
    mutateAsync: addTreatmentMutation,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: Product) => addTreatment(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["treatments"], data);
      queryClient.invalidateQueries({queryKey: ["treatments"]})
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { description, title, imageCover } = values;
    const price = parseFloat(values.price);

    try {
      const response = await addTreatmentMutation({
        title,
        description,
        price,
        imageCover:
          values.imageCover ||
          "https://res.cloudinary.com/hemen/image/upload/v1696246559/default_post_kh6p7i.webp",
      });

      const id = response.data.treatments._id;
      setTimeout(() => {
        router.push(`/treatments/${id}`);
      }, 2000);
      console.log("skapade behandling", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center gap-8 pt-6">
      <div className="flex flex-row justify-between border-b px-5 pb-4">
        <div className="pl-4 text-gray-800 transition ease-out duration-300 hover:text-gray-600">
          <BsFillArrowLeftCircleFill
            size={30}
            cursor={"pointer"}
            onClick={goBackHandler}
          />
        </div>
        <h1 className="tracking-wide uppercase text-base lg:text-xl">
          Skapa ny behandling
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-[90%] mx-auto mt-6 space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input required placeholder="titel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beskrivning</FormLabel>
                <FormControl>
                  <Input placeholder="beskrivning" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pris</FormLabel>
                <FormControl>
                  <Input required type="number" placeholder="pris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageCover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bild</FormLabel>
                <FormControl>
                  <Input
                    className="cursor-pointer"
                    type="file"
                    placeholder="bild"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex items-center gap-3">
            Submit
          </Button>
          {isError && (
            <Alert>
              <AlertTitle>Något gick snett!</AlertTitle>
              <AlertDescription>
                Kontrollera att du fyllde i fälten korrekt.
              </AlertDescription>
            </Alert>
          )}
          {isSuccess && (
            <Alert>
              <AlertTitle>Härligt!</AlertTitle>
              <AlertDescription>
                En ny behandling har lagts till!
              </AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </div>
  );
}
