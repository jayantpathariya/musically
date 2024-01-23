"use client";

import Image from "next/image";
import Link from "next/link";

import { PlayButton } from "./play-button";

export const PlaylistCard = ({ title, image, subtitle }) => {
  return (
    <Link
      href="playlist"
      className="bg-neutral-800 rounded-md p-4 hover:bg-neutral-700 transition duration-300 group"
    >
      <div className="relative">
        <Image
          src={image}
          width={180}
          height={180}
          alt="playlist poster"
          className="w-full rounded-md mb-3"
        />
        <PlayButton
          onClick={() => {}}
          className="absolute bottom-2 right-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300"
          size="md"
        />
      </div>
      <p className="font-semibold line-clamp-1 mb-1">{title}</p>
      <p className="text-sm text-neutral-400 line-clamp-2">{subtitle}</p>
    </Link>
  );
};
