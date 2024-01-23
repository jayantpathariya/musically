import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SidebarPlaylist = ({ playlist }) => {
  return (
    <Link
      href="playlists"
      className="hover:bg-neutral-800 p-2 rounded-md transition duration-300 flex gap-x-3 items-center"
    >
      <Image
        src={playlist.image}
        alt={`${playlist.name} poster`}
        width={50}
        height={50}
        className="rounded-md"
      />
      <div>
        <p className="text-neutral-200">{playlist.name}</p>
        <p className="text-sm">Playlist • Jayant</p>
      </div>
    </Link>
  );
};
