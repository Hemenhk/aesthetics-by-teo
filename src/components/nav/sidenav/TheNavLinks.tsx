"use client";

import Link from "next/link";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { Product, fetchAllTreatments } from "@/axios-instances/axios-instances";
import { useAllTreatments } from "@/app/hooks/query-hooks";

export default function TheNavLinks() {
  const { data: treatments, isError, isLoading } = useAllTreatments();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>no treatments</p>;
  }

  return (
    <ul className="flex flex-col gap-4 pt-16 pl-1 uppercase text-sm text-slate-600 font-medium tracking-widest">
      <li className=" border-b pb-4">
        <Link href={"/"}>Hem</Link>
      </li>
      <Accordion type="single" collapsible>
        <AccordionItem value="behandlingar">
          <AccordionTrigger>Behandlingar</AccordionTrigger>
          {treatments.map((treatment: Product) => (
            <AccordionContent key={treatment._id}>
              <li className="text-xs pl-2 border-b py-2">
                <Link href={`/treatments/${treatment._id}`}>
                  {treatment.title}
                </Link>
              </li>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
      <li className=" border-b pb-4">
        <Link href={"/faq"}>FAQ</Link>
      </li>
    </ul>
  );
}
