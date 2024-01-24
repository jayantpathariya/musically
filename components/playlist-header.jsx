"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import { LuHeart } from "react-icons/lu";
import { PlayButton } from "./play-button";
import { PiDotsThreeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSong } from "@/redux/songSlice";

export const PlaylistHeader = ({ type, playlistId }) => {
  const dispatch = useDispatch();

  const handlePlay = async () => {
    try {
      const result = await axios(`/api/songs/${type}/${playlistId}`);
      const data = result.data;
      dispatch(setSong({ playlist: data.list, song: data.list[0], index: 0 }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-x-6 mb-6">
      <PlayButton size="lg" onClick={handlePlay} />
      <button>
        <LuHeart className="h-8 w-8 text-neutral-400 hover:text-neutral-100 hover:scale-105 transition " />
      </button>
      <button>
        <PiDotsThreeBold className="h-8 w-8 text-neutral-400 hover:text-neutral-100 hover:scale-105 transition " />
      </button>
    </div>
  );
};
