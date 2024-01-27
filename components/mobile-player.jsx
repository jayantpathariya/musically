"use client";

import Image from "next/image";
import Slider from "rc-slider";
import { Howl } from "howler";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useMedia } from "react-use";

import { playNextSong } from "@/redux/songSlice";
import { createImageLinks, formatArtist } from "@/lib/utils";
import { useSelector } from "react-redux";
import { MdOutlinePause } from "react-icons/md";
import { RiPlayFill } from "react-icons/ri";
import { TextAnimate } from "./text-animate";

export const MobilePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const { currentSong, songs, index } = useSelector((state) => state.song);

  const dispatch = useDispatch();
  const isMobile = useMedia("(max-width: 768px)");

  const soundRef = useRef(null);

  useEffect(() => {
    if (currentSong?.download_links && isMobile) {
      soundRef.current = new Howl({
        src: [currentSong?.download_links[4]?.link],
        autoplay: true,
        volume: 0.1,
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onend: () => {
          setSeek(0);
          setIsPlaying(false);
          dispatch(playNextSong());
        },
      });
    }

    return () => {
      soundRef.current?.unload();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs, index, currentSong?.download_links, dispatch]);

  const updateProgress = useCallback(() => {
    if (soundRef.current) {
      setSeek(soundRef.current?.seek());
      requestAnimationFrame(updateProgress);
    }
  }, []);

  // update progress bar
  useEffect(() => {
    requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(updateProgress);
    };
  }, [currentSong, updateProgress]);

  const handleSeek = (value) => {
    const newPosition = parseFloat(value);
    setSeek(newPosition);
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.seek(newPosition);
      soundRef.current.play();
    }
  };

  const handleTogglePlay = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  };

  return (
    <div className="md:hidden md:invisible md:pointer-events-none bg-neutral-800 flex p-2 rounded-md m-1 mb-0 fixed bottom-20 left-0 right-0 mr-12 w-[97%]">
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
    </div>
  );
};
