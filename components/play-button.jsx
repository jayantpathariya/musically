"use client";

import { RiPlayFill } from "react-icons/ri";

import { cn } from "@/lib/utils";
import { MdOutlinePause } from "react-icons/md";

export const PlayButton = ({ className, size, onClick, isPlaying }) => {
  return (
    <button
      className={cn(
        "hidden bg-green-500 h-8 w-8 md:flex items-center justify-center rounded-full hover:scale-105 transition",
        size === "md" && "h-12 w-12",
        size === "lg" && "h-14 w-14",
        className
      )}
      type="button"
      onClick={onClick}
    >
      {isPlaying ? (
        <MdOutlinePause
          className={cn(
            "h-6 w-6 text-black",
            size == "md" && "h-8 w-8",
            size === "lg" && "h-9 w-9"
          )}
        />
      ) : (
        <RiPlayFill
          className={cn(
            "h-6 w-6 text-black",
            size == "md" && "h-8 w-8",
            size === "lg" && "h-9 w-9"
          )}
        />
      )}
    </button>
  );
};
