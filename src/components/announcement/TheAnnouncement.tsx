"use client";

import { fetchAnnouncement } from "@/axios-instances/axios-instances";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TheAnnouncement() {
  const { data: announcementData } = useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
  });
  return (
    <div
      className={`flex justify-center items-center h-[5vh]`}
      style={{background: announcementData?.announcementColor}}
    >
      <p className="tracking-widest text-black uppercase">
        {announcementData?.announcementText}
      </p>
    </div>
  );
}
