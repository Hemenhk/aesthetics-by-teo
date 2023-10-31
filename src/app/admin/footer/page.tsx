"use client";

import React from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Footer,
  fetchFooter,
  updateFooter,
} from "@/axios-instances/axios-instances";

const formSchema = z.object({
  footerBackgroundColor: z.string(),
});

export default function FooterPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: footerData,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["footer"],
    queryFn: fetchFooter,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      footerBackgroundColor: footerData?.footerBackgroundColor,
    },
  });

  const {
    mutateAsync: updateFooterMutation,
    isError: mutationError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: Footer) => {
      updateFooter(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["footer"], data);
      queryClient.refetchQueries({ queryKey: ["footer"] });
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { footerBackgroundColor } = values;
      await updateFooterMutation({ footerBackgroundColor });
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
          Edit Footer
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full lg:w-[80%] px-5"
        >
          <FormField
            control={form.control}
            name="footerBackgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Footer Background Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    placeholder="footer background color"
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
            {mutationError ? (
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
