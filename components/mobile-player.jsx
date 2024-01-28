"use client";

import Image from "next/image";

import { Howl } from "howler";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useMedia } from "react-use";

import { playNextSong, playPrevSong } from "@/redux/songSlice";
import { createImageLinks, formatArtist } from "@/lib/utils";
import { useSelector } from "react-redux";
import { MdOutlinePause } from "react-icons/md";
import { RiPlayFill } from "react-icons/ri";
import { TextAnimate } from "./text-animate";
import { PlayerModal } from "./player-modal";
import { ProgressBar } from "./progress-bar";

export const MobilePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { currentSong } = useSelector((state) => state.song);

  const dispatch = useDispatch();
  const isMobile = useMedia("(max-width: 768px)");

  const soundRef = useRef(null);

  useEffect(() => {
    if (!currentSong?.download_links || !isMobile) return;

    soundRef.current = new Howl({
      src: [currentSong.download_links[4]?.link],
      autoplay: true,
      html5: true,
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

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: formatArtist(currentSong.more_info),
        artwork: createImageLinks(currentSong.image).map((image) => ({
          src: image.link,
          sizes: image.quality,
          type: `image/${image.link.split(".").pop()}`,
        })),
      });

      navigator.mediaSession.setActionHandler("play", () => {
        soundRef.current.play();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        soundRef.current.pause();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        dispatch(playNextSong());
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        dispatch(playPrevSong());
      });

      navigator.mediaSession.setActionHandler("seekbackward", () => {
        soundRef.current.seek(soundRef.current.seek() - 10);
      });

      navigator.mediaSession.setActionHandler("seekforward", () => {
        soundRef.current.seek(soundRef.current.seek() + 10);
      });

      navigator.mediaSession.setActionHandler("seekto", (details) => {
        soundRef.current.seek(details.seekTime);
      });

      navigator.mediaSession.setActionHandler("stop", () => {
        soundRef.current.stop();
      });
    }

    return () => {
      soundRef.current?.unload();
    };
  }, [currentSong, isMobile, dispatch]);

  const handleSeek = useCallback(
    (value) => {
      const newPosition = parseFloat(value);
      setSeek(newPosition);
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current.seek(newPosition);
        soundRef.current.play();
      }
    },
    [soundRef]
  );

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    }
  };

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
          <ProgressBar
            soundRef={soundRef}
            seek={seek}
            handleSeek={handleSeek}
            currentSong={currentSong}
            setSeek={setSeek}
          />
        </div>
      </div>
      {currentSong?.title && (
        <PlayerModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          soundRef={soundRef}
          isPlaying={isPlaying}
          seek={seek}
          setSeek={setSeek}
        />
      )}
    </div>
  );
};
