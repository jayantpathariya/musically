import { cn } from "@/lib/utils";

export const Box = ({ children, className }) => {
  return (
    <div className={cn("bg-neutral-900 rounded-lg w-full", className)}>
      {children}
    </div>
  );
};
