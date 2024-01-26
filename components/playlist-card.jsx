"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { PlayButton } from "./play-button";
import { setSong } from "@/redux/songSlice";
import { cn } from "@/lib/utils";

export const PlaylistCard = ({ title, image, subtitle, type, link, id }) => {
  const dispatch = useDispatch();

  const handlePlay = async (e) => {
    e.preventDefault();

    try {
      let result = {};
      if (type !== "song") {
        result = await axios(`/api/playlist/${type}/${link}`);
      } else {
        result = await axios(`/api/songs/${id}`);
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
    <>
      <Link
        href={`/playlist/${type}/${link}`}
        className={cn(type === "radio_station" && "text-center")}
      >
        <div
          className={cn(
            "bg-neutral-800 rounded-md p-4 hover:bg-neutral-700 transition duration-300 group h-full",
            type === "radio_station" && "rounded-full mb-2 h-auto"
          )}
        >
          <div className="relative">
            <Image
              src={image}
              width={180}
              height={180}
              alt="playlist poster"
              className={cn(
                "w-full rounded-md mb-3",
                type === "radio_station" && "rounded-full mb-0"
              )}
            />
            <PlayButton
              onClick={handlePlay}
              className={cn(
                "absolute bottom-2 right-2 translate-y-2 opacity-0  group-hover:opacity-100 transition duration-300",
                type !== "radio_station" && "group-hover:translate-y-0",
                type === "radio_station" &&
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              )}
              size="md"
            />
          </div>
          {type !== "radio_station" && (
            <>
              <p
                className="font-semibold line-clamp-1 mb-1"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p className="text-sm text-neutral-400 line-clamp-2">
                {subtitle}
              </p>
            </>
          )}
        </div>
        {type === "radio_station" && (
          <>
            <p className="font-semibold line-clamp-1 mb-1">{title}</p>
            <p className="text-sm text-neutral-400 line-clamp-2">{subtitle}</p>
          </>
        )}
      </Link>
    </>
  );
};
