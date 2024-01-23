import Link from "next/link";

import { cn } from "@/lib/utils";

export const SidebarItem = ({ name, active, href, icon: Icon }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 transition duration-300 hover:text-neutral-100",
        active && "text-neutral-100"
      )}
    >
      <Icon className="h-6 w-6" />
      <span>{name}</span>
    </Link>
  );
};
