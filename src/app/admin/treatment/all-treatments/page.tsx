"use client";

import { useAllTreatments } from "@/app/hooks/query-hooks";
import { Product, deleteTreatment } from "@/axios-instances/axios-instances";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { FaTrashCan } from "react-icons/fa6";

export default function AllTreatments() {
  const router = useRouter();
  const queryClient = useQueryClient()

  const goBackHandler = () => {
    router.push("/admin");
  };


  const { data: allTreatments, isError, isFetching } = useAllTreatments();
  const {
    mutateAsync: deleteTreatmentMutation,
    isError: deleteError,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => deleteTreatment(id),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["treatments"]})
  });

  if (isFetching) {
    <p>Loading...</p>;
  }
  if (isError) {
    <p>Error</p>;
  }
  const allTreatmentsMap = allTreatments?.map((treatment: Product) => (
    <li key={treatment?._id} className="flex flex-col gap-2">
      <Card className="flex flex-col gap-5">
        <CardHeader>{treatment?.title}</CardHeader>
        <CardFooter className="flex justify-between items-center gap-3">
          <Link href={`/admin/treatment/edit-treatment/${treatment?._id}`}>Edit</Link>
          <Button
            onClick={async () => {
              await deleteTreatmentMutation(treatment._id);
            }}
          >
            <FaTrashCan />
          </Button>
        </CardFooter>
      </Card>
    </li>
  ));
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
         Alla behandlingar
        </h1>
      </div>
    <ul className="flex flex-col gap-3 w-[90%] mx-auto pt-10">
      {allTreatmentsMap}
    </ul>
    </div>
  );
}
