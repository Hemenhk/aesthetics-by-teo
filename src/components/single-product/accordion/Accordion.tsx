import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TheAccordion({ metafields }) {
  const mappedMetafields = metafields.slice(0, 3).map((field, idx) => (
    <AccordionItem key={idx} value={field?.key}>
      <AccordionTrigger className="uppercase text-sm tracking-widest leading-6 font-light">
        {field?.key}
      </AccordionTrigger>
      <AccordionContent className="whitespace-break-spaces">
        {field?.value}
      </AccordionContent>
    </AccordionItem>
  ));
  return (
    <>
      {metafields[0] !== null ? (
        <Accordion type="single" collapsible className="w-[450px]">
          {mappedMetafields}
        </Accordion>
      ) : (
        ""
      )}
    </>
  );
}
