import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

export const Header = ({ scrolled, bgColor }) => {
  const pathname = usePathname();
  const router = useRouter();

  const query = pathname.includes("/search")
    ? pathname.split("/").length > 2
      ? pathname.split("/").pop()
      : ""
    : "";

  const [value, setValue] = useState(query || "");
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (!debouncedValue) return;
    if (pathname.includes("/search") && value) {
      router.push(`/search/${debouncedValue.replaceAll(" ", "-")}`);
    }
  }, [debouncedValue, router, pathname, value]);

  useEffect(() => {
    if (pathname === "/") {
      setValue("");
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        "p-4 hidden md:flex items-center justify-between sticky left-0 top-0 z-50 transition duration-300",
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
              className="bg-neutral-800 py-2 px-8 rounded-full text-sm placeholder:text-neutral-500 w-72"
              placeholder="What do you want to listen to?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <button
                className="cursor-auto"
                onClick={() => {
                  setValue("");
                  router.push("/search");
                }}
              >
                <RxCross1 className="h-4 w-4 absolute right-2 top-2.5 text-neutral-300" />
              </button>
            )}
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
