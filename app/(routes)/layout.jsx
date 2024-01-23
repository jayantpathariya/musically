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
      className="overflow-y-auto max-h-[calc(100vh-1.5rem)] from-orange-800/40"
    >
      <Header scrolled={y > 150} />
      <div className="p-4 pt-0">{children}</div>
    </Box>
  );
};

export default SiteLayout;
