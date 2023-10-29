"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTreatmentById } from "@/app/hooks/query-hooks";
import { Product, updateTreatment } from "@/axios-instances/axios-instances";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  imageCover: z.string(),
});

export default function EditTreatmentPage({
  params,
}: {
  params: { editTreatmentId: string };
}) {
  const id = params.editTreatmentId;
  const queryClient = useQueryClient();

  const { data: treatmentData, isLoading } = useTreatmentById(id);
  console.log("this is the treatment data", treatmentData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: treatmentData?.title,
      description: treatmentData?.description,
      imageCover: "",
      price: treatmentData?.price,
    },
  });

  if (isLoading) {
    <p>Loading</p>;
  }

  const {
    mutateAsync: updateMutation,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: Product) => updateTreatment(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["treatments", id], data);
    },
  });

  console.log("hallå", treatmentData);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, description, price } = values;
    try {
      await updateMutation({ title, description, price });

      if (isSuccess) {
        setTimeout(() => {
          <Alert variant="default">
            <AlertTitle>Lyckades!</AlertTitle>
            <AlertDescription>Ändringen lyckades!</AlertDescription>
          </Alert>;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center w-[100%] space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="price" {...field} />
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
              <FormLabel>Image Cover</FormLabel>
              <FormControl>
                <Input type="file" placeholder="imageCover" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex items-center gap-3">
          Submit
        </Button>
        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Oj, något gick fel!</AlertTitle>
            <AlertDescription>
              Ändringen lyckades inte, testa igen.
            </AlertDescription>
          </Alert>
        )}
        {isSuccess && (
          <Alert variant="default">
            <AlertTitle>Lyckades!</AlertTitle>
            <AlertDescription>Ändringen lyckades!</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
