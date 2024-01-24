"use client";

import { useRef } from "react";
import { useScroll } from "react-use";

import { Box } from "@/components/box";
import { Header } from "@/components/header";

const SiteLayout = ({ children }) => {
  const scrollRef = useRef(null);
  const { y } = useScroll(scrollRef);

  return (
    <Box
      ref={scrollRef}
      className="overflow-y-auto h-[calc(100vh-5.74rem)] overflow-x-hidden"
    >
      <div className="bg-gradient-to-b from-orange-800/40 to-[20rem]">
        <Header scrolled={y > 80} bgColor="bg-orange-950" />
        <div className="p-4">{children}</div>
      </div>
    </Box>
  );
};

export default SiteLayout;
