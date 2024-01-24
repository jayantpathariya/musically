"use client";

import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { RiPlayFill } from "react-icons/ri";
import { setSong } from "@/redux/songSlice";

export const SearchSongItem = ({ song, link }) => {
  const dispatch = useDispatch();

  const handlePlay = async (e) => {
    e.preventDefault();
    console.log(link);

    try {
      const result = await axios(`/api/playlist/song/${link}`);
      const data = result.data;
      dispatch(setSong({ playlist: data.list, song: data.list[0], index: 0 }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800 group">
      <div className="flex items-center gap-x-2">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-full w-full bg-neutral-900/40 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button onClick={handlePlay}>
              <RiPlayFill className="w-6 h-6" />
            </button>
          </div>
          <Image
            src={song?.image}
            alt={`${song.title} cover`}
            width={40}
            height={40}
            className=""
          />
        </div>
        <div>
          <p>{song.title}</p>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {song.more_info?.singers}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-4 text-neutral-400">
        <button className="hover:text-neutral-100 hover:scale-105 transition">
          <LuHeart className="w-4 h-4" />
        </button>
        <button className="opacity-0 group-hover:opacity-100 hover:text-neutral-100 transition">
          <HiDotsHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
