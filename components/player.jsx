"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "rc-slider";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuHeart, LuShuffle, LuRepeat } from "react-icons/lu";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiPlayFill } from "react-icons/ri";
import { MdOutlinePause, MdFullscreenExit, MdFullscreen } from "react-icons/md";
import {
  RxSpeakerLoud,
  RxSpeakerQuiet,
  RxSpeakerModerate,
  RxSpeakerOff,
} from "react-icons/rx";
import { HiOutlineQueueList } from "react-icons/hi2";
import { Howl } from "howler";

import { cn, formatArtist } from "@/lib/utils";
import { playNextSong, playPrevSong } from "@/redux/songSlice";

export const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.1);

  const dispatch = useDispatch();
  const pathname = usePathname();

  const { currentSong, songs, index } = useSelector((state) => state.song);

  const soundRef = useRef(null);

  useEffect(() => {
    if (currentSong?.download_links) {
      soundRef.current = new Howl({
        src: [currentSong?.download_links[4]?.link],
        autoplay: true,
        volume: volume,
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

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

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

  const handleTogglePlay = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = parseFloat(value);
    setVolume(newVolume);
  };

  const handleSeek = (value) => {
    const newPosition = parseFloat(value);
    setSeek(newPosition);
    if (soundRef.current) {
      soundRef.current.pause();
      soundRef.current.seek(newPosition);
      soundRef.current.play();
    }
  };

  const handleMute = () => {
    if (soundRef.current) {
      if (volume > 0) {
        soundRef.current.volume(0);
        setVolume(0);
      } else {
        soundRef.current.volume(0.1);
        setVolume(0.1);
      }
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleNextSong = () => {
    if (soundRef.current) {
      dispatch(playNextSong());
    }
  };

  const handlePrevSong = () => {
    if (soundRef.current) {
      dispatch(playPrevSong());
    }
  };

  return (
    <div className="hidden p-3 pt-0 text-sm md:grid grid-cols-4 gap-x-4 items-center">
      <div className="flex items-center gap-x-4">
        {currentSong?.image && (
          <>
            <Image
              src={currentSong?.image}
              width={56}
              height={56}
              alt={`${currentSong?.name} cover`}
              className="w-14 rounded-md"
            />

            <div className="flex items-center gap-x-4">
              <div>
                <p
                  className="line-clamp-1"
                  dangerouslySetInnerHTML={{
                    __html: currentSong?.title,
                  }}
                />
                <p className="text-xs text-neutral-400 line-clamp-1">
                  {formatArtist(currentSong?.more_info)}
                </p>
              </div>
              <button>
                <LuHeart className="w-4 h-4 text-neutral-400 hover:scale-110 hover:text-neutral-100" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-y-2 text-neutral-400 col-span-2 w-[80%] justify-self-center">
        <div className="flex items-center gap-x-4 text-neutral-400">
          <button
            className={cn(
              "cursor-auto",
              currentSong?.title &&
                "hover:text-neutral-100 transition cursor-auto",
              !currentSong?.title && "text-neutral-600"
            )}
          >
            <LuShuffle className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrevSong}
            className={cn(
              "cursor-auto",
              currentSong?.title &&
                "hover:text-neutral-100 transition cursor-auto",
              !currentSong?.title && "text-neutral-600"
            )}
          >
            <GiPreviousButton className="w-6 h-6" />
          </button>
          <button
            onClick={handleTogglePlay}
            className={cn(
              "bg-neutral-300 p-1 rounded-full hover:scale-105 transition cursor-auto",
              !currentSong?.title && "bg-neutral-600"
            )}
          >
            {isPlaying ? (
              <MdOutlinePause className="w-6 h-6 text-black" />
            ) : (
              <RiPlayFill className="w-6 h-6 text-black" />
            )}
          </button>
          <button
            onClick={handleNextSong}
            className={cn(
              "cursor-auto",
              currentSong?.title &&
                "hover:text-neutral-100 transition cursor-auto",
              !currentSong?.title && "text-neutral-600"
            )}
          >
            <GiNextButton className="w-6 h-6" />
          </button>
          <button
            className={cn(
              "cursor-auto",
              currentSong?.title &&
                "hover:text-neutral-100 transition cursor-auto",
              !currentSong?.title && "text-neutral-600"
            )}
          >
            <LuRepeat className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full flex items-center gap-x-2">
          <span className="text-xs">
            {new Date(seek * 1000).toISOString().substr(14, 5) || "--:--"}
          </span>
          <Slider
            className="w-full cursor-auto"
            disabled={!currentSong?.title}
            styles={{
              track: { backgroundColor: "#fff" },
              rail: { backgroundColor: "#636363" },
              handle: { backgroundColor: "#fff", border: "none", opacity: 100 },
            }}
            max={soundRef.current ? soundRef.current?.duration() : 100}
            step={0.01}
            value={seek}
            onChange={handleSeek}
          />
          <span className="text-xs">
            {new Date(
              soundRef.current ? soundRef.current?.duration() * 1000 : 0
            )
              .toISOString()
              .substr(14, 5) || "--:--"}
          </span>
        </div>
      </div>

      <div className="w-full flex items-center gap-x-4 text-neutral-400">
        <div className="flex items-center gap-x-2 w-full">
          <Link href="/queue">
            <HiOutlineQueueList
              className={cn(
                "w-5 h-5 hover:text-neutral-100 transition",
                pathname.includes("/queue") && "text-green-500"
              )}
            />
          </Link>
          <button onClick={handleMute} className="cursor-auto">
            {volume > 0.7 ? (
              <RxSpeakerLoud
                className={cn(
                  "w-4 h-4",
                  currentSong?.title && "hover:text-neutral-100 transition"
                )}
              />
            ) : volume > 0.3 ? (
              <RxSpeakerModerate
                className={cn(
                  "w-4 h-4",
                  currentSong?.title && "hover:text-neutral-100 transition"
                )}
              />
            ) : volume > 0 ? (
              <RxSpeakerQuiet
                className={cn(
                  "w-4 h-4",
                  currentSong?.title && "hover:text-neutral-100 transition"
                )}
              />
            ) : (
              <RxSpeakerOff
                className={cn(
                  "w-4 h-4",
                  currentSong?.title && "hover:text-neutral-100 transition"
                )}
              />
            )}
          </button>
          <Slider
            className="w-full cursor-auto"
            styles={{
              track: { backgroundColor: "#fff" },
              rail: { backgroundColor: "#636363" },
              handle: { backgroundColor: "#fff", border: "none", opacity: 100 },
            }}
            disabled={!currentSong?.title}
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <button onClick={toggleFullScreen}>
          {isFullscreen ? (
            <MdFullscreenExit className="w-6 h-6 hover:text-neutral-100 transition" />
          ) : (
            <MdFullscreen className="w-6 h-6 hover:text-neutral-100 transition" />
          )}
        </button>
      </div>
    </div>
  );
};
