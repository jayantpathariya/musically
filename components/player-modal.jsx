"use client";

import Image from "next/image";
import Slider from "rc-slider";
import Sheet from "react-modal-sheet";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlinePause } from "react-icons/md";
import { RiPlayFill } from "react-icons/ri";

import { playNextSong, playPrevSong } from "@/redux/songSlice";
import { cn, createImageLinks, formatArtist } from "@/lib/utils";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { LuRepeat, LuShuffle } from "react-icons/lu";

export const PlayerModal = ({
  isOpen,
  setIsOpen,
  soundRef,
  isPlaying,
  seek,
  setSeek,
}) => {
  const [lyrics, setLyrics] = useState("");

  const { currentSong, songs, index, playlistName } = useSelector(
    (state) => state.song
  );

  const dispatch = useDispatch();
  const ref = useRef();

  const updateProgress = useCallback(() => {
    if (soundRef.current) {
      setSeek(soundRef.current?.seek());
      requestAnimationFrame(updateProgress);
    }
  }, [soundRef, setSeek]);

  // update progress bar
  useEffect(() => {
    requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(updateProgress);
    };
  }, [currentSong, updateProgress]);

  const getSongLyrics = useCallback(async () => {
    try {
      const res = await axios(`/api/lyrics/${currentSong?.id}`);
      setLyrics(res.data.lyrics);
    } catch (error) {
      console.log(error);
    }
  }, [currentSong?.id]);

  useEffect(() => {
    if (currentSong?.id) {
      getSongLyrics();
    }
  }, [currentSong?.id, getSongLyrics]);

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
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="md:hidden"
    >
      <Sheet.Container>
        <Sheet.Content className="bg-neutral-900">
          <Sheet.Scroller className="p-4">
            <div>
              <header className="flex items-center gap-x-2 mb-8 mt-4">
                <button onClickCapture={() => setIsOpen(false)}>
                  <IoChevronDown className="h-5 w-5" />
                </button>
                <div className="flex-grow text-center">
                  <p className="text-sm font-bold">{playlistName}</p>
                </div>
              </header>
              <div className="w-full mx-auto flex flex-col items-center justify-center">
                <Image
                  src={createImageLinks(currentSong?.image)[2]?.link}
                  width={500}
                  height={500}
                  alt={`${currentSong?.title} cover`}
                  className="max-w-xs w-full h-full object-cover rounded-md mb-8"
                />
                <div className="mb-4 w-full">
                  <div>
                    <h3
                      className="text-lg font-bold line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: currentSong?.title }}
                    />
                    <p className="text-sm text-neutral-300 line-clamp-1">
                      {formatArtist(currentSong?.more_info)}
                    </p>
                  </div>
                </div>
                <div className="mb-6 w-full">
                  <Slider
                    disabled={!currentSong?.title}
                    styles={{
                      track: { backgroundColor: "#fff" },
                      rail: { backgroundColor: "#636363" },
                      handle: {
                        backgroundColor: "#fff",
                        border: "none",
                        opacity: 100,
                      },
                    }}
                    max={soundRef.current ? soundRef.current?.duration() : 100}
                    step={0.01}
                    value={seek}
                    onChange={handleSeek}
                  />
                  <div className="flex items-center justify-between text-neutral-400 p-1">
                    <span className="text-xs">
                      {new Date(seek * 1000).toISOString().substr(14, 5) ||
                        "--:--"}
                    </span>
                    <span className="text-xs">
                      {new Date(
                        soundRef.current
                          ? soundRef.current?.duration() * 1000
                          : 0
                      )
                        .toISOString()
                        .substr(14, 5) || "--:--"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-x-4 text-neutral-200 w-full">
                  <button
                    className={cn(
                      "cursor-auto",
                      currentSong?.title &&
                        "hover:text-neutral-100 transition cursor-auto",
                      !currentSong?.title && "text-neutral-800"
                    )}
                  >
                    <LuShuffle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handlePrevSong}
                    disabled={!songs[index - 1]?.title}
                    className={cn(
                      "cursor-auto",
                      songs[index - 1]?.title &&
                        "text-neutral-100 hover:text-neutral-100 transition cursor-auto",
                      !songs[index - 1]?.title && "text-neutral-600"
                    )}
                  >
                    <GiPreviousButton className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleTogglePlay}
                    className={cn(
                      "bg-neutral-300 p-2 rounded-full hover:scale-105 transition cursor-auto",
                      !currentSong?.title && "bg-neutral-600"
                    )}
                  >
                    {isPlaying ? (
                      <MdOutlinePause className="w-10 h-10 text-black" />
                    ) : (
                      <RiPlayFill className="w-10 h-10 text-black" />
                    )}
                  </button>
                  <button
                    onClick={handleNextSong}
                    disabled={!songs[index + 1]?.title}
                    className={cn(
                      "cursor-auto",
                      songs[index + 1]?.title &&
                        "hover:text-neutral-100 transition cursor-auto",
                      !songs[index + 1]?.title && "text-neutral-600"
                    )}
                  >
                    <GiNextButton className="w-10 h-10" />
                  </button>
                  <button
                    className={cn(
                      "cursor-auto",
                      currentSong?.title &&
                        "hover:text-neutral-100 transition cursor-auto",
                      !currentSong?.title && "text-neutral-600"
                    )}
                  >
                    <LuRepeat className="w-5 h-5" />
                  </button>
                </div>
                {!!lyrics && (
                  <div className="bg-neutral-800 mt-6 p-4 rounded-md">
                    <p
                      className="text-neutral-300"
                      dangerouslySetInnerHTML={{ __html: lyrics }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};
