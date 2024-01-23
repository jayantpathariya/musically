import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { cn } from "@/lib/utils";

export const Header = ({ scrolled }) => {
  return (
    <header
      className={cn(
        "p-4 flex items-center justify-between sticky left-0 top-0 z-20",
        scrolled && "bg-neutral-800"
      )}
    >
      <div className="flex items-center gap-x-2">
        <button className="bg-neutral-900 flex items-center justify-center p-2 rounded-full disabled:bg-neutral-950">
          <BsChevronLeft className="h-4 w-4" />
        </button>
        <button className="bg-neutral-900 flex items-center justify-center p-2 rounded-full disabled:bg-neutral-950">
          <BsChevronRight className="h-4 w-4" />
        </button>
      </div>
      <button className="p-0.5 bg-black rounded-full hover:scale-105">
        <Image
          src="/profile-image.jpg"
          width={26}
          height={26}
          alt="profile image"
          className="rounded-full h-7 w-7"
        />
      </button>
    </header>
  );
};
