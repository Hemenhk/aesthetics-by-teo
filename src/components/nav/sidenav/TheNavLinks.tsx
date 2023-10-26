import Link from "next/link";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const treatmentLinks = [
  { href: "/behandlingar", handle: "dermapen" },
  { href: "/ansiktsspa", handle: "ansiktsspa med ånga" },
  { href: "/botox", handle: "botox" },
  { href: "/buttlift", handle: "butt lidft" },
  { href: "/dermapen", handle: "dermapen" },
  { href: "/fettreducering", handle: "fettreducering" },
  { href: "/laserbehandling", handle: "laserbehandling" },
  { href: "/filler", handle: "filler" },
  { href: "/profhilo", handle: "profhilo" },
  { href: "/prp", handle: "prp behandling" },
  { href: "/trådlyft", handle: "trådlyft" },
  { href: "/vitaminboost", handle: "vitamin boost" },
];

export default function TheNavLinks() {
  return (
    <ul className="flex flex-col gap-4 pt-16 pl-1 uppercase text-sm text-slate-600 font-medium tracking-widest">
      <li className=" border-b pb-4">
        <Link href={"/"}>Hem</Link>
      </li>
      <Accordion type="single" collapsible>
        <AccordionItem value="behandlingar">
          <AccordionTrigger>Behandlingar</AccordionTrigger>

          {treatmentLinks.map((treatment) => (
            <AccordionContent key={treatment.href}>
              <li className="text-xs pl-2 border-b py-2">
                <Link href={treatment.href}>{treatment.handle}</Link>
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