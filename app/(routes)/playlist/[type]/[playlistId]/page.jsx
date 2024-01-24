import Image from "next/image";

import { getPlaylist } from "@/actions/get-playlist";
import { formatArtist, formatDuration } from "@/lib/utils";
import { Table } from "@/components/table";
import { PlaylistHeader } from "@/components/playlist-header";

const PlaylistIdPage = async ({ params }) => {
  const result = await getPlaylist({
    id: params.playlistId,
    type: params.type,
  });

  return (
    <div>
      <div className="flex items-center gap-x-6 mb-8">
        <Image
          src={result?.image}
          width={150}
          height={150}
          alt="poster image"
          className="w-40 rounded-sm shadow-sm"
        />
        <div className="text-neutral-400 text-sm">
          <span className="capitalize text-neutral-300">{result?.type}</span>
          <h1 className="text-8xl font-bold text-neutral-100 line-clamp-1 pb-2">
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
        <PlaylistHeader type={params.type} playlistId={params.playlistId} />
        <Table playlist={result?.list} />
      </div>
    </div>
  );
};

export default PlaylistIdPage;
