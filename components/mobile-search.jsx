"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

export const MobileSearch = () => {
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
    <div className="mb-6 md:hidden">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <div className="relative">
        <GoSearch className="h-5 w-5 absolute left-2 top-[20%] text-neutral-900" />
        <input
          type="text"
          value={value}
          className="w-full p-2 text-neutral-900 text-sm px-8 rounded-md placeholder:text-neutral-600"
          placeholder="What do you want to listen to?"
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button
            onClick={() => {
              setValue("");
              router.push("/search");
            }}
            className="absolute right-2 top-[20%] text-neutral-900"
          >
            <RxCross1 className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
