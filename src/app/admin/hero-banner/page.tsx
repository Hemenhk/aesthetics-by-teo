"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import axios from "axios";

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

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HeroBanner,
  fetchHeroBanner,
  updateHeroBanner,
} from "@/axios-instances/axios-instances";

const formSchema = z.object({
  heroHeading: z.string(),
  heroSubHeading: z.string(),
  heroButtonText: z.string(),
  heroButtonColor: z.string(),
});

export default function HeroPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: heroBannerData } = useQuery({
    queryKey: ["hero-banner"],
    queryFn: fetchHeroBanner,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      heroHeading: heroBannerData?.heroHeading,
      heroSubHeading: heroBannerData?.heroSubHeading,
      heroButtonText: heroBannerData?.heroButtonText,
      heroButtonColor: heroBannerData?.heroButtonColor,
    },
  });

  const { mutateAsync: updateHeroMutation, isPending } = useMutation({
    mutationFn: async (data: HeroBanner) => {
      updateHeroBanner(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["hero-banner"], data);
      queryClient.refetchQueries({ queryKey: ["hero-banner"] });
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { heroButtonColor, heroButtonText, heroHeading, heroSubHeading } =
        values;

      await updateHeroMutation({
        heroButtonColor,
        heroButtonText,
        heroHeading,
        heroSubHeading,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goBackHandler = () => {
    router.push("/admin");
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
          Edit Hero Banner
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full lg:w-[80%] px-5"
        >
          <FormField
            control={form.control}
            name="heroHeading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Heading</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="hero heading" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroSubHeading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Sub-Heading</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="hero sub-heading"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroButtonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Button Text</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="hero button text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heroButtonColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Button Background Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    placeholder="hero button background color"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full rounded-sm px-16 uppercase tracking-widest"
            type="submit"
          >
            {isPending ? (
              <div className="flex flex-row items-center justify-center gap-2">
                <Oval
                  height={20}
                  width={20}
                  color="#e5e7eb"
                  secondaryColor="#e5e7eb"
                />
                Saving
              </div>
            ) : (
              <p>Save</p>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
