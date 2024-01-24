"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GoHomeFill, GoSearch, GoPlus } from "react-icons/go";
import { TbPlaylist } from "react-icons/tb";
import { IoIosList } from "react-icons/io";

import { Box } from "./box";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { Badge } from "./badge";
import { SidebarPlaylist } from "./sidebar-playlist";
import { cn } from "@/lib/utils";

const playlists = [
  {
    id: 1,
    name: "Playlist 1",
    image: "/playlist.jpg",
  },
  {
    id: 2,
    name: "Playlist 2",
    image: "/playlist.jpg",
  },
  {
    id: 3,
    name: "Playlist 3",
    image: "/playlist.jpg",
  },
  {
    id: 4,
    name: "Playlist 4",
    image: "/playlist.jpg",
  },
  {
    id: 5,
    name: "Playlist 5",
    image: "/playlist.jpg",
  },
  {
    id: 6,
    name: "Playlist 6",
    image: "/playlist.jpg",
  },
  {
    id: 7,
    name: "Playlist 7",
    image: "/playlist.jpg",
  },
  {
    id: 8,
    name: "Playlist 8",
    image: "/playlist.jpg",
  },
];

export const Sidebar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollYRef = useRef(null);

  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        name: "Home",
        active: !pathname.includes("/search"),
        href: "/",
        icon: GoHomeFill,
      },
      {
        name: "Search",
        active: pathname.includes("/search"),
        href: "/search",
        icon: GoSearch,
      },
    ];
  }, [pathname]);

  useEffect(() => {
    const element = scrollYRef.current;

    const handleScroll = () => {
      if (element) {
        setScrollY(element.scrollTop);
      }
    };
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <aside className="hidden md:flex flex-col gap-y-2 text-neutral-400 font-semibold   h-[calc(100vh-5.74rem)]">
      <Box className="p-4 flex flex-col gap-y-4">
        {routes.map((route) => (
          <SidebarItem key={route.name} {...route} />
        ))}
      </Box>
      <Box className="overflow-y-hidden">
        <div className={cn("p-4", scrollY > 10 && "shadow-md shadow-black")}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-2">
              <TbPlaylist className="h-6 w-6" />
              <span>Library</span>
            </div>
            <button className="hover:text-neutral-100 p-1 transition duration-300 hover:bg-neutral-800 rounded-full">
              <GoPlus className="h-6 w-6" />
            </button>
          </div>
          <div className="flex gap-2 flex-wrap ">
            <Badge name="Playlists" />
            <Badge name="Artists" />
            <Badge name="Albums" />
          </div>
        </div>
        <div
          className="overflow-y-scroll max-h-[calc(100%-6rem)] p-2 overflow-hidden"
          ref={scrollYRef}
        >
          <div className="flex items-center justify-between gap-x-2 mb-2">
            {showSearch ? (
              <div className="relative">
                <GoSearch className="h-4 w-4 absolute top-2 left-2" />
                <input
                  type="text"
                  className="pl-7 bg-neutral-800 text-neutral-400 placeholder:text-neutral-400 text-xs px-3 py-2 outline-none rounded-md"
                  autoFocus
                  placeholder="Search in your library"
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <button
                className="p-2 hover:bg-neutral-800 transition duration-300 rounded-full hover:text-neutral-100"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <GoSearch className="h-4 w-4" />
              </button>
            )}
            <button className="flex items-center text-neutral-400 gap-x-1 hover:text-neutral-100 transition duration-300 hover:scale-105">
              <span className="text-sm">Recents</span>
              <IoIosList className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            {playlists.map((playlist) => (
              <SidebarPlaylist key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      </Box>
    </aside>
  );
};
