"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

type SideBarItemProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

export const SideBarItem = ({ href, title, icon }: SideBarItemProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const selected = pathName === href;

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`}
      onClick={handleClick}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};
