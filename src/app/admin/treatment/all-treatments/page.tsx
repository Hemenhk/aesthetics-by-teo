"use client";

import { useAllTreatments } from "@/app/hooks/query-hooks";
import { Product, deleteTreatment } from "@/axios-instances/axios-instances";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

import { FaTrashCan } from "react-icons/fa6";

export default function AllTreatments() {
  // const queryClient = useQueryClient()
  const { data: allTreatments, isError, isFetching } = useAllTreatments();
  const {
    mutateAsync: deleteTreatmentMutation,
    isError: deleteError,
    isPending,
  } = useMutation({
    mutationFn: async (id: string) => deleteTreatment(id),
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
              await deleteTreatment(treatment._id);
            }}
          >
            <FaTrashCan />
          </Button>
        </CardFooter>
      </Card>
    </li>
  ));
  return (
    <ul className="flex flex-col gap-3 w-[90%] mx-auto pt-10">
      {allTreatmentsMap}
    </ul>
  );
}
