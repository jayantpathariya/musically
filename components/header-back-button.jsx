"use client";

import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

export const HeaderBackButton = () => {
  const router = useRouter();

  return (
    <button>
      <BsChevronLeft className="h-4 w-4" onClick={() => router.back()} />
    </button>
  );
};
