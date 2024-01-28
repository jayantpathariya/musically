"use client";

import Image from "next/image";
import { useMedia } from "react-use";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { GrPlayFill } from "react-icons/gr";
import { LuHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

import { cn, formatArtist, secondsToMinutes } from "@/lib/utils";
import { setSong } from "@/redux/songSlice";
import { useEffect, useState } from "react";

export const Table = ({
  playlist,
  startIndex = 1,
  showHeader = true,
  isLiked,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { currentSong } = useSelector((state) => state.song);
  const dispatch = useDispatch();

  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handlePlaySong = (playlist, song, index) => {
    dispatch(setSong({ playlist, song, index }));
  };

  return (
    <table className="w-full text-left overflow-hidden text-sm text-neutral-400">
      {showHeader && !isMobile && (
        <thead className="border-b border-neutral-700/40">
          <tr className="text-neutral-400">
            <th className="p-2 font-normal">#</th>
            <th className="p-2 font-normal">Title</th>
            <th className="p-2 font-normal">Album</th>
            <th className="p-2"></th>
            <th className="p-2 font-normal">
              <MdOutlineWatchLater className="h-4 w-5" />
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {playlist?.map((song, index) => {
          return (
            <tr
              key={song.id}
              className="hover:bg-neutral-700/40 cursor-pointer transition duration-300 text-neutral-400 group text-left"
              onClick={() => handlePlaySong(playlist, song, index)}
            >
              {!isMobile && (
                <td className="p-2">
                  <div className="w-4 h-4">
                    <span
                      className={cn(
                        "group-hover:hidden",
                        currentSong?.id === song?.id && "text-green-500"
                      )}
                    >
                      {index + startIndex}
                    </span>
                    <GrPlayFill className="text-white hidden group-hover:block" />
                  </div>
                </td>
              )}
              <td className="p-2">
                <div className="flex items-center gap-x-4">
                  <Image
                    src={song?.image}
                    alt={`${song.title} image`}
                    width={42}
                    height={42}
                    className="w-10 h-10 rounded-sm"
                  />
                  <div>
                    <h3
                      dangerouslySetInnerHTML={{ __html: song?.title }}
                      className={cn(
                        "font-semibold line-clamp-1 text-neutral-300",
                        currentSong?.id === song.id && "text-green-500"
                      )}
                    />

                    <p
                      className="line-clamp-1"
                      dangerouslySetInnerHTML={{
                        __html: formatArtist(song?.more_info),
                      }}
                    />
                  </div>
                </div>
              </td>
              {!isMobile && (
                <td>
                  <p
                    className="p-2 line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: song?.more_info?.album }}
                  />
                </td>
              )}
              {!isMobile && (
                <td className="p-2 ">
                  <LuHeart
                    className={cn(
                      "opacity-0 group-hover:opacity-100 hover:text-neutral-100 transition",
                      isLiked &&
                        "opacity-100 fill-green-500 text-green-500 hover:text-green-500 hover:scale-105 transition"
                    )}
                  />
                </td>
              )}
              {!isMobile && (
                <td className="p-2">
                  {secondsToMinutes(song?.more_info?.duration)}
                </td>
              )}
              <td className="p-2 md:opacity-0 group-hover:opacity-100 hover:text-neutral-100 transition">
                <HiDotsHorizontal className="w-4 h-4" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
