"use client";

import axios from "axios";
import { LuHeart } from "react-icons/lu";
import { PlayButton } from "./play-button";
import { PiDotsThreeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSong } from "@/redux/songSlice";

export const PlaylistHeader = ({ type, playlistId, link }) => {
  const dispatch = useDispatch();

  const handlePlay = async () => {
    try {
      let result = {};
      if (type !== "song") {
        result = await axios(`/api/playlist/${type}/${link}`);
      } else {
        result = await axios(`/api/songs/${playlistId}`);
      }
      const data = result.data;

      if (type !== "song") {
        dispatch(
          setSong({
            playlist: data.list,
            song: data.list[0],
            index: 0,
            playlistName: data.title,
          })
        );
      } else {
        dispatch(
          setSong({
            playlist: data,
            song: data[0],
            index: 0,
            playlistName: data.title,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hidden md:flex items-center gap-x-6 mb-6 ">
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
