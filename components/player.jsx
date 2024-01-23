"use client";

import Image from "next/image";
import Slider from "rc-slider";
import { useSelector } from "react-redux";
import { LuHeart, LuShuffle, LuRepeat } from "react-icons/lu";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";
import { RiPlayFill } from "react-icons/ri";
import { RxSpeakerLoud } from "react-icons/rx";
import { MdFullscreen } from "react-icons/md";

export const Player = () => {
  const { song } = useSelector((state) => state.song);
  console.log(song);

  return (
    <div className="p-3 pt-0 text-sm grid grid-cols-4 gap-x-4 items-center">
      <div className="flex items-center gap-x-4">
        <Image
          src="/playlist.jpg"
          width={56}
          height={56}
          alt="song poster"
          className="w-14 rounded-md"
        />
        <div className="flex items-center gap-x-4">
          <div>
            <p className="line-clamp-1">Play Date</p>
            <p className="text-xs text-neutral-400 line-clamp-1">
              Melanie Martinez
            </p>
          </div>
          <button>
            <LuHeart className="w-4 h-4 text-neutral-400 hover:scale-110 hover:text-neutral-100" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-2 text-neutral-400 col-span-2 w-[80%] justify-self-center">
        <div className="flex items-center gap-x-4 text-neutral-400">
          <button>
            <LuShuffle className="w-4 h-4" />
          </button>
          <button>
            <GiPreviousButton className="w-6 h-6" />
          </button>
          <button className="bg-neutral-300 p-1 rounded-full hover:scale-105 transition">
            <RiPlayFill className="w-6 h-6 text-black" />
          </button>
          <button>
            <GiNextButton className="w-6 h-6" />
          </button>
          <button>
            <LuRepeat className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full">
          <Slider
            className="w-full"
            styles={{
              track: { backgroundColor: "#fff" },
              rail: { backgroundColor: "#636363" },
              handle: { backgroundColor: "#fff", border: "none", opacity: 100 },
            }}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-x-4 text-neutral-400">
        <div className="flex items-center gap-x-2 w-full">
          <button>
            <RxSpeakerLoud className="w-4 h-4" />
          </button>
          <Slider
            className="w-full"
            styles={{
              track: { backgroundColor: "#fff" },
              rail: { backgroundColor: "#636363" },
              handle: { backgroundColor: "#fff", border: "none", opacity: 100 },
            }}
          />
        </div>
        <button>
          <MdFullscreen className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
