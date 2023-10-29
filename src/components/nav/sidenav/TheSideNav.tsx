import React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FiMenu } from "react-icons/fi";

import TheNavLinks from "./TheNavLinks";


type SideNavProps = {
  isHovered: boolean
  isHomePage: boolean
}

export default function TheSideNav({ isHomePage, isHovered }: SideNavProps) {
  const btnColorValue = isHomePage
    ? `${isHovered ? "text-black" : "text-white"}`
    : "text-white";

  return (
    <Sheet>
      <SheetTrigger className={btnColorValue}>
        <FiMenu size={35} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="uppercase text-lg tracking-wider text-slate-700 border-b pb-5">
          behandlingar
        </SheetHeader>
        <TheNavLinks />
      </SheetContent>
    </Sheet>
  );
}