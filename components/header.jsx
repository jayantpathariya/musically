import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

export const Header = ({ scrolled, bgColor }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.push(`/search/${debouncedValue.replaceAll(" ", "-")}`);
  }, [debouncedValue, router]);

  return (
    <header
      className={cn(
        "p-4 flex items-center justify-between sticky left-0 top-0 z-20",
        scrolled &&
          "flex items-center justify-between sticky left-0 top-0 z-20 transition duration-300",
        scrolled && bgColor
      )}
    >
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <button
            className="bg-neutral-800 flex items-center justify-center p-2 rounded-full disabled:bg-neutral-950"
            onClick={() => router.back()}
          >
            <BsChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="bg-neutral-800 flex items-center justify-center p-2 rounded-full disabled:bg-neutral-950"
            onClick={() => router.forward()}
          >
            <BsChevronRight className="h-4 w-4" />
          </button>
        </div>
        {pathname.includes("/search") && (
          <div className="relative">
            <GoSearch className="h-5 w-5 absolute left-2 top-2 text-neutral-300" />
            <input
              className="bg-neutral-800 py-2 px-4 rounded-full pl-8 text-sm placeholder:text-neutral-500 w-72"
              placeholder="What do you want to listen to?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )}
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
