"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useHover } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";

import { BsInstagram } from "react-icons/bs";
import { AiTwotonePhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

import SideNav from "./sidenav/TheSideNav";
import TheButton from "../ui/TheButton";
import axios from "axios";


export default function MainNav() {
  const [logo, setLogo] = useState("");

  const { data: session } = useSession();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin";
  const isHomePage = pathname === "/";

  const colorValue = isHomePage
  ? `${isHovered ? "text-black" : "text-white"}`
  : "text-white";

  const signOutHandler = () => {
    signOut();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedLogoValue = localStorage.getItem("logo");
        if (cachedLogoValue) {
          setLogo(JSON.parse(cachedLogoValue));
        }
        const res = await axios.get("/api/auth/admin-dashboard/hero-banner");
        const data = res.data.heroValues[0];
        localStorage.setItem("logo", JSON.stringify(data));
        setLogo(data.logo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const adminHeader = (
    <>
      <SideNav isHovered={isHovered} isHomePage={isHomePage} />
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <TheButton label="sign out" onClick={signOutHandler} width="w-[150px]" />
    </>
  );

  const notAdminHeader = (
    <>
      <SideNav isHovered={isHovered} isHomePage={isHomePage}/>
      <Link href={"/"} className="pl-20">
        <Image src={logo} alt="logo" width={50} height={50} />
      </Link>
      <div className={`flex items-center gap-3 ${colorValue}`}>
        <BsInstagram size={25} />
        <AiTwotonePhone size={27} />
        <MdEmail size={28}/>
      </div>
    </>
  );

  return (
    <div
      className={`flex h-[125px] justify-between items-center p-10 border-b transition ease-out duration-300 bg-transparent ${
        session
          ? isHomePage && "absolute w-full"
          : isHomePage && "absolute w-full"
      } hover:bg-white`}
      ref={hoverRef}
    >
      {isAdminPage ? adminHeader : notAdminHeader}
    </div>
  );
}
