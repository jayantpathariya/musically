"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";
import { useSelector } from "react-redux";
import { MdOutlinePause } from "react-icons/md";
import { RiPlayFill } from "react-icons/ri";
import { TextAnimate } from "./text-animate";
import { PlayerModal } from "./player-modal";

import { createImageLinks, formatArtist } from "@/lib/utils";
import { usePlayer } from "@/hooks/use-player";

export const MobilePlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isPlaying, seek, handleTogglePlay, handleSeek } = usePlayer();

  const { currentSong } = useSelector((state) => state.song);

  const soundRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="md:hidden md:invisible md:pointer-events-none bg-neutral-800 flex p-2 rounded-md m-1 mb-0 fixed bottom-20 left-0 right-0 mr-12 w-[97%]">
      <div className="relative h-12 w-full" onClick={() => setIsOpen(true)}>
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
            <div className="overflow-hidden text-left">
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
            className="p-2 text-neutral-100 disabled:text-neutral-400"
            onClick={handleTogglePlay}
          >
            {isPlaying ? (
              <MdOutlinePause className="w-6 h-6 text-neutral-100" />
            ) : (
              <RiPlayFill className="w-6 h-6 text-neutral-100" />
            )}
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
            max={soundRef.current ? soundRef.current?.duration() : 100}
            step={0.01}
            value={seek}
            onChange={handleSeek}
          />
        </div>
      </div>
      {currentSong?.title && (
        <PlayerModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};
