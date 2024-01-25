"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { PlayButton } from "@/components/play-button";
import { setSong } from "@/redux/songSlice";
import { cn } from "@/lib/utils";

export const SearchTopResultCard = ({ song }) => {
  const dispatch = useDispatch();
  const { currentSong } = useSelector((state) => state.song);

  const handlePlay = async (e) => {
    e.preventDefault();

    try {
      const result = await axios(`/api/songs/${song.id}`);
      const data = result.data;

      dispatch(setSong({ playlist: [], song: data[0], index: 0 }));
    } catch (error) {
      console.log(error);
    }
  };

  const isPlaying = currentSong?.id === song?.id;

  return (
    <Link
      href={`/playlist`}
      className="inline-block bg-neutral-800 p-4 rounded-md w-full hover:bg-neutral-700 transition duration-300 relative group"
    >
      <Image
        src={song?.image?.replace("150x150", "500x500")}
        alt={`${song?.title} cover`}
        width={100}
        height={100}
        className="w-28 rounded-md mb-2 shadow-lg shadow-black"
      />

      <p className="text-3xl font-bold mb-1">{song?.title}</p>
      <p className="text-sm">
        <span className="text-neutral-400 capitalize">{song?.type} • </span>
        {song?.more_info?.singers}
      </p>
      <PlayButton
        size="md"
        isPlaying={isPlaying}
        onClick={handlePlay}
        className={cn(
          "absolute bottom-4 right-4 opacity-0  group-hover:opacity-100 transition duration-300 group-hover:translate-y-0 translate-y-2",
          isPlaying && "opacity-100 translate-y-0"
        )}
      />
    </Link>
  );
};
