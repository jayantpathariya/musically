"use client";

import { RiPlayFill } from "react-icons/ri";

import { cn } from "@/lib/utils";

export const PlayButton = ({ className, size, onClick }) => {
  return (
    <button
      className={cn(
        "bg-green-500 h-8 w-8 flex items-center justify-center rounded-full hover:scale-105 transition",
        size === "md" && "h-12 w-12",
        className
      )}
      onClick={onClick}
    >
      <RiPlayFill
        className={cn("h-6 w-6 text-black", size == "md" && "h-8 w-8")}
      />
    </button>
  );
};
