import Image from "next/image";

import { getPlaylist } from "@/actions/get-playlist";
import { formatArtist, formatDuration, getLink } from "@/lib/utils";
import { Table } from "@/components/table";
import { PlaylistHeader } from "@/components/playlist-header";
import { HeaderBackButton } from "@/components/header-back-button";

const PlaylistIdPage = async ({ params }) => {
  const result = await getPlaylist({
    id: params.playlistId,
    type: params.type,
  });

  return (
    <div>
      <HeaderBackButton />
      <div className="flex flex-col md:flex-row items-center gap-x-6 mb-8">
        <Image
          src={result?.image}
          width={150}
          height={150}
          alt="poster image"
          className="w-60 md:w-40 rounded-sm shadow-sm mb-4 md:mb-0"
        />
        <div className="text-neutral-400 text-sm self-start">
          <span className="hidden md:inline-block capitalize text-neutral-300">
            {result?.type}
          </span>
          <h1 className="hidden md:block text-8xl font-bold text-neutral-100 line-clamp-1 pb-2">
            {result?.title}
          </h1>
          <p className="mb-2">{formatArtist(result?.more_info)}</p>
          <p>
            <span className="text-neutral-200">
              {result?.list_count} {result?.list_count == 1 ? "Song" : "Songs"}{" "}
            </span>{" "}
            {`• about ${formatDuration(result?.duration)}`}
          </p>
        </div>
      </div>
      <div>
        <PlaylistHeader
          type={params.type}
          playlistId={params.playlistId}
          link={getLink(result)}
        />
        <Table playlist={result?.list} />
      </div>
    </div>
  );
};

export default PlaylistIdPage;
