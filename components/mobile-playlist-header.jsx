"use client";

import axios from "axios";
import { RiPlayFill } from "react-icons/ri";
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

      if (type !== "song") {
        dispatch(
          setSong({ playlist: data.list, song: data.list[0], index: 0 })
        );
      } else {
        dispatch(setSong({ playlist: data, song: data[0], index: 0 }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex mb-6">
      <button
        onClick={handlePlay}
        className="ml-auto bg-green-500 h-10 w-10 flex items-center justify-center rounded-full hover:scale-105 transition"
      >
        <RiPlayFill className="h-7 w-7 text-black" />
      </button>
    </header>
  );
};
