"use client";

import { RiPlayFill } from "react-icons/ri";

import { cn } from "@/lib/utils";

export const PlayButton = ({ className, size, onClick }) => {
  return (
    <button
      className={cn(
        "bg-green-500 h-8 w-8 flex items-center justify-center rounded-full hover:scale-105 transition cursor-auto",
        size === "md" && "h-12 w-12",
        size === "lg" && "h-14 w-14",
        className
      )}
      type="button"
      onClick={onClick}
    >
      <RiPlayFill
        className={cn(
          "h-6 w-6 text-black",
          size == "md" && "h-8 w-8",
          size === "lg" && "h-9 w-9"
        )}
      />
    </button>
  );
};
