"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={
        className +
        " relative bg-slate-700/40 w-full h-10 rounded-md text-white"
      }
      onClick={onClick}
    >
      {children}
      <div className="absolute inset-x-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] w-1/2  mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <div className="absolute blur-md inset-x-0 bottom-0 h-1 w-full  mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent" />
    </button>
  );
};
