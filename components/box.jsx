import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const Box = forwardRef(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-neutral-900 md:rounded-lg w-full", className)}
    >
      {children}
    </div>
  );
});

Box.displayName = "Box";
