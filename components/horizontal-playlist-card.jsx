"use client";

import Image from "next/image";
import Link from "next/link";

import { PlayButton } from "./play-button";

export const HorizontalPlaylistCard = () => {
  return (
    <Link
      href="/playlist"
      className="bg-neutral-800 rounded-md overflow-hidden flex  items-center justify-between gap-x-2 md:hover:bg-neutral-700 transition duration-300 group"
    >
      <div className="flex items-center gap-x-2 ">
        <Image
          src="/playlist.jpg"
          height={50}
          width={50}
          alt="playlist poster"
        />
        <p className="font-semibold text-xs md:text-sm">Playlist 1</p>
      </div>
      <div className="p-2 opacity-0 group-hover:opacity-100">
        <PlayButton onClick={() => {}} />
      </div>
    </Link>
  );
};
