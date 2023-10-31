import React from "react";
import Link from "next/link";

import classes from "./styles/HeroBanner.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchHeroBanner } from "@/axios-instances/axios-instances";

export default function HeroBanner() {
  const {
    data: heroBannerData,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["hero-banner"],
    queryFn: fetchHeroBanner,
  });
  return (
    <div
      className={`flex flex-col justify-center pl-10 w-[60%] gap-5 ${classes.container}`}
    >
      <h1 className="tracking-wider text-white text-2xl lg:text-3xl font-bold">
        {heroBannerData?.heroHeading}
      </h1>
      <p className="tracking-wider font-medium text-[#dbdbdb] lg:text-lg ">
        {heroBannerData?.heroSubHeading}
      </p>
      <Link href={"/product/sea-salt-spray"}>
        <button className={classes.btn}>
          {heroBannerData?.heroButtonText}
        </button>
      </Link>
    </div>
  );
}
