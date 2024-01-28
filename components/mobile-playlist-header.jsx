"use client";

import axios from "axios";
import { RiPlayFill } from "react-icons/ri";
import { LuPlusCircle, LuShuffle } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";

import { setSong } from "@/redux/songSlice";

export const MobilePlaylistHeader = ({ type, playlistId, link }) => {
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

      console.log(data);

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
        dispatch(setSong({ playlist: data, song: data[0], index: 0 }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center justify-between mb-6 md:hidden">
      <div className="flex items-center gap-x-3 text-neutral-400">
        <button>
          <LuPlusCircle className="h-6 w-6 " />
        </button>
        <button>
          <HiDotsHorizontal className="h-6 w-6 " />
        </button>
      </div>
      <div className="flex items-center gap-x-4 text-neutral-400">
        <button>
          <LuShuffle className="h-5 w-5 " />
        </button>
        <button
          onClick={handlePlay}
          className="ml-auto bg-green-500 h-12 w-12 flex items-center justify-center rounded-full hover:scale-105 transition"
        >
          <RiPlayFill className="h-9 w-9 text-black" />
        </button>
      </div>
    </header>
  );
};
