import Image from "next/image";

import { getArtist } from "@/actions/get-artist";
import { Table } from "@/components/table";
import { createImageLinks, formatNumber } from "@/lib/utils";
import { Playlists } from "@/components/playlists";

const ArtistIdPage = async ({ params }) => {
  const result = await getArtist(params.artistId);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-x-6 mb-8">
        <Image
          src={createImageLinks(result?.image)[2]?.link}
          width={150}
          height={150}
          alt="poster image"
          className="w-60 md:w-40 rounded-sm shadow-sm"
        />
        <div className="text-neutral-400 text-sm self-start mt-4">
          <span className="capitalize text-neutral-300 hidden md:inline-block">
            {formatNumber(result?.follower_count)} followers
          </span>
          <h1 className="md:text-8xl font-bold text-neutral-100 line-clamp-1 pb-2">
            {result?.name}
          </h1>
          {/* <p className="mb-2">{formatArtist(result?.more_info)}</p> */}
          <p>
            <span className="text-neutral-200">{result?.subtitle}</span>{" "}
            {/* {`• about ${formatDuration(result?.duration)}`} */}
          </p>
        </div>
      </div>
      <div>
        {/* <PlaylistHeader type={result.type} playlistId={params.playlistId} /> */}
        <Table playlist={result?.topSongs} playlistName={result?.name} />
      </div>
      <div className="mt-8">
        <Playlists title="Top Albums" playlists={result?.topAlbums} />
        <Playlists
          title="Playlist"
          playlists={result?.dedicated_artist_playlist}
        />
        <Playlists
          title="Featured"
          playlists={result?.featured_artist_playlist}
        />
        <Playlists title="Singles" playlists={result?.singles} />
      </div>
    </div>
  );
};

export default ArtistIdPage;
