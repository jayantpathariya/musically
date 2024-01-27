"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { TbPlaylist } from "react-icons/tb";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        name: "Home",
        active:
          pathname === "/" ||
          pathname.includes("/playlist") ||
          pathname.includes("/album"),
        href: "/",
        icon: GoHomeFill,
      },
      {
        name: "Search",
        active: pathname.includes("/search"),
        href: "/search",
        icon: GoSearch,
      },
      {
        name: "Your Library",
        active: pathname.includes("/your-library"),
        href: "/your-library",
        icon: TbPlaylist,
      },
    ];
  }, [pathname]);

  return (
    <div className="sticky left-0 bg-black md:hidden p-4 flex items-center justify-between">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.name}
          className={cn(
            "flex flex-col items-center gap-y-1 text-neutral-400",
            route.active && "text-neutral-100"
          )}
        >
          <route.icon className="h-5 w-5 " />
          <p className="text-sm">{route.name}</p>
        </Link>
      ))}
    </div>
  );
};
