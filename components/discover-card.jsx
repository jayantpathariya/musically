import { cn } from "@/lib/utils";
import Link from "next/link";

export const DiscoverCard = ({ color, title, href }) => {
  return (
    <Link
      href={`/browse/${href}`}
      className={cn("inline-block bg-pink-600 p-2 h-40 rounded-md", color)}
    >
      <p className="text-lg font-bold">{title}</p>
    </Link>
  );
};
