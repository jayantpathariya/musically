"use client";

import Image from "next/image";
import Slider from "rc-slider";
import { createImageLinks, formatArtist } from "@/lib/utils";
import { useSelector } from "react-redux";
import { MdOutlinePause } from "react-icons/md";
import { RiPlayFill } from "react-icons/ri";
import { TextAnimate } from "./text-animate";

export const MobilePlayer = () => {
  const { currentSong } = useSelector((state) => state.song);

  return (
    <div className="md:hidden bg-neutral-800 flex p-2 rounded-md m-1 mb-0 fixed bottom-20 left-0 right-0 mr-12 w-[97%]">
      <div className="relative h-12 w-full">
        <div className="flex items-center justify-between gap-x-2 h-full">
          <div className="flex items-center gap-x-2 overflow-hidden">
            <div className="w-12 h-12 shrink-0">
              {currentSong?.image && (
                <Image
                  src={createImageLinks(currentSong?.image)[1]?.link}
                  width={44}
                  height={44}
                  alt="cover image"
                  className="w-full h-full rounded-md"
                />
              )}
            </div>
            <div className="overflow-hidden">
              <TextAnimate className="text-sm font-semibold text-neutral-100 ">
                {currentSong?.title}
              </TextAnimate>

              <TextAnimate className="text-xs text-neutral-400">
                {formatArtist(currentSong?.more_info)}
              </TextAnimate>
            </div>
          </div>
          <button
            disabled={!currentSong?.title}
            className=" text-neutral-100 disabled:text-neutral-400"
          >
            {/* <MdOutlinePause className="w-6 h-6 text-neutral-100" /> */}
            <RiPlayFill className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute -bottom-3.5 left-0 w-full">
          <Slider
            className="mobile-slider"
            disabled={!currentSong?.title}
            styles={{
              track: { backgroundColor: "#fff", height: "2px" },
              rail: { backgroundColor: "#636363", height: "2px" },
              handle: { display: "none" },
            }}
          />
        </div>
      </div>
    </div>
  );
};
