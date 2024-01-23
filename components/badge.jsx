import { cn } from "@/lib/utils";

export const Badge = ({ onClick, name, active }) => {
  return (
    <button
      className={cn(
        "bg-neutral-800 py-1 px-2 text-sm rounded-full text-neutral-300 hover:bg-neutral-700/50",
        active && "bg-neutral-300 text-neutral-700 hover:bg-neutral-300"
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
