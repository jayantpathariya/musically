"use client";

import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { RiPlayFill } from "react-icons/ri";
import { setSong } from "@/redux/songSlice";
import { useCallback, useEffect, useState } from "react";
import { cn, secondsToMinutes } from "@/lib/utils";

export const SearchSongItem = ({ songId }) => {
  const [songDetails, setSongDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { currentSong } = useSelector((state) => state.song);

  const dispatch = useDispatch();

  const getSong = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axios(`/api/songs/${songId}`);
      const data = result.data;
      setSongDetails(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [songId]);

  useEffect(() => {
    getSong();
  }, [getSong]);

  const handlePlay = async () => {
    try {
      dispatch(
        setSong({
          playlist: [],
          song: songDetails,
          index: 0,
          playlistName: songDetails.title,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800 group">
      <div className="flex items-center gap-x-2">
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-full w-full bg-neutral-900/40 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button className="cursor-auto" onClick={handlePlay}>
              <RiPlayFill className="w-6 h-6" />
            </button>
          </div>
          {songDetails?.image && (
            <div className="w-10 h-10">
              <Image
                src={songDetails?.image}
                alt={`${songDetails?.title} cover`}
                width={40}
                height={40}
                className="w-full h-full rounded-sm"
              />
            </div>
          )}
        </div>
        <div>
          <p
            className={cn(
              "line-clamp-1",
              songDetails?.id === currentSong?.id && "text-green-500"
            )}
          >
            {songDetails.title}
          </p>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {songDetails?.more_info?.artistMap?.primary_artists
              ?.map((artist) => artist.name)
              ?.join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-4 text-neutral-400">
        <button className="hidden md:inline-block opacity-0 group-hover:opacity-100 hover:text-neutral-100 hover:scale-105 transition">
          <LuHeart className="w-4 h-4" />
        </button>
        <span className="text-sm hidden md:inline-block">
          {secondsToMinutes(songDetails?.more_info?.duration)}
        </span>
        <button className="md:opacity-0 group-hover:opacity-100 hover:text-neutral-100 transition">
          <HiDotsHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="bg-neutral-800 animate-pulse p-2 flex items-center justify-between mb-2">
      <div className="flex items-center gap-x-2">
        <div className="bg-neutral-700 w-10 h-10 rounded-sm" />
        <div className="flex gap-y-2 flex-col">
          <div className="bg-neutral-700 h-3 w-16 rounded-md" />
          <div className="bg-neutral-700 h-3 w-20 rounded-md" />
        </div>
      </div>
      <div className="bg-neutral-700 h-4 w-8 rounded-md" />
    </div>
  );
};
