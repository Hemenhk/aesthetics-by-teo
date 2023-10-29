"use client";

import React from "react";
import { useTreatmentById } from "@/app/hooks/query-hooks";
import ProductImage from "./images/ProductImage";
import TheButton from "../ui/TheButton";
import Link from "next/link";

type Props = {
  treatmentId: string;
};

export default function SingleTreatment({ treatmentId }: Props) {
  const { data: treatment, isError, isLoading } = useTreatmentById(treatmentId);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 p-[5rem] bg-[#fafafa] w-screen">
      <div className="flex  flex-col gap-10">
        <div className="flex flex-col">
          <ProductImage imageCover={treatment?.imageCover} />
          <div className="mt-[100px] hidden lg:flex">
            {/* <TheAccordion
          productHandle={params.productHandle}
          metafields={product.metafields}
        /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col relative items-center lg:items-start lg:left-[50px] lg:w-[400px] gap-10">
        <div className="flex flex-col items-start gap-5">
          <p className="text-xl tracking-wide uppercase">{treatment?.title}</p>
          {/* <AverageRating itemHandle={params.productHandle} /> */}
          <div className="flex items-center justify-start gap-5 w-full border-b pb-5">
            {treatment?.price} KR
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-[3rem] w-[400px]">
          <div className="flex flex-col gap-4 w-[400px]">
            <TheButton variant="primary" label={"Boka din tid"} />
            <Link href={`/admin/treatment/${treatmentId}`}>
              <TheButton variant="secondary" label={"Ändra behandling"} />
            </Link>
          </div>

          <p className="text-sm tracking-wide whitespace-break-spaces leading-6 text-center lg:text-left">
            {treatment?.description}
          </p>
          <div className="flex w-[300px] lg:hidden">
            {/* <TheAccordion
          productHandle={params.productHandle}
          metafields={product.metafields}
        /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
