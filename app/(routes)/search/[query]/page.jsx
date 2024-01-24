import Link from "next/link";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiPlayFill } from "react-icons/ri";

import { getSearch } from "@/actions/get-search";
import { PlayButton } from "@/components/play-button";
import { Playlists } from "@/components/playlists";

const SearchQueryPage = async ({ params }) => {
  const result = await getSearch(params.query);

  const topQuery = result?.topquery?.data[0];
  const playlists = result?.playlists?.data;
  const albums = result?.albums?.data;
  const artists = result?.artists?.data;

  console.log(topQuery);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Top result</h2>

          <Link
            href={`/playlist`}
            className="inline-block bg-neutral-800 p-4 rounded-md w-full hover:bg-neutral-700 transition duration-300 relative group"
          >
            <Image
              src={topQuery?.image?.replace("150x150", "500x500")}
              alt={`${topQuery?.title} cover`}
              width={100}
              height={100}
              className="w-28 rounded-md mb-2 shadow-lg shadow-black"
            />

            <p className="text-3xl font-bold mb-1">{topQuery?.title}</p>
            <p className="text-sm">
              <span className="text-neutral-400 capitalize">
                {topQuery?.type} •{" "}
              </span>
              {topQuery?.more_info?.singers}
            </p>
            <PlayButton
              size="md"
              className="absolute bottom-4 right-4 opacity-0  group-hover:opacity-100 transition duration-300 group-hover:translate-y-0 translate-y-2"
            />
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Songs</h2>
          <div>
            {result?.songs?.data.map((song) => (
              <Link
                href={`playlist`}
                key={song?.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800 group"
              >
                <div className="flex items-center gap-x-2">
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 h-full w-full bg-neutral-900/40 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <RiPlayFill className="w-6 h-6" />
                    </div>
                    <Image
                      src={song?.image}
                      alt={`${song.title} cover`}
                      width={40}
                      height={40}
                      className=""
                    />
                  </div>
                  <div>
                    <p>{song.title}</p>
                    <p className="text-sm text-neutral-400 line-clamp-1">
                      {song.more_info?.singers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-4 text-neutral-400">
                  <button className="hover:text-neutral-100 hover:scale-105 transition">
                    <LuHeart className="w-4 h-4" />
                  </button>
                  <button className="opacity-0 group-hover:opacity-100 hover:text-neutral-100 transition">
                    <HiDotsHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Playlists title="Playlists" playlists={playlists} />
        <Playlists title="Albums" playlists={albums} />
        <Playlists title="Artists" playlists={artists} />
      </div>
    </div>
  );
};

export default SearchQueryPage;
