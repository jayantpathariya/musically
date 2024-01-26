"use client";

import { useRef } from "react";
import { useScroll } from "react-use";

import { Box } from "@/components/box";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SiteLayout = ({ children }) => {
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);
  const pathname = usePathname();

  return (
    <Box
      ref={scrollRef}
      className="overflow-y-auto h-[calc(100vh-5.74rem)] overflow-x-hidden"
    >
      <div
        className={cn(
          "h-full",
          !pathname.includes("/search") &&
            "bg-gradient-to-b from-orange-800/40 to-[20rem]"
        )}
      >
        <Header scrolled={y > 80} bgColor={"bg-orange-950"} />
        <div className="p-4 h-[calc(100%-3.98rem)]">{children}</div>
      </div>
    </Box>
  );
};

export default SiteLayout;
