import Image from "next/image";

import { getSong } from "@/actions/get-song";
import { Playlists } from "@/components/playlists";
import { createImageLinks, secondsToMinutes } from "@/lib/utils";
import { getLyrics } from "@/actions/get-lyrics";
import { getAlbum } from "@/actions/get-album";
import { PlaylistHeader } from "@/components/playlist-header";

const SongIdPage = async ({ params }) => {
  const result = await getSong(params.songId);
  const song = result[0];
  const lyricsResult = await getLyrics(params.songId);
  const album = await getAlbum(song?.more_info?.album_url?.split("/")?.pop());

  return (
    <div>
      <div className="flex items-center gap-x-6 mb-8">
        <Image
          src={createImageLinks(song?.image)[2]?.link}
          width={150}
          height={150}
          alt="poster image"
          className="w-40 rounded-sm shadow-sm"
        />
        <div className="text-neutral-400 text-sm">
          <span className="capitalize text-neutral-300">{song?.type}</span>
          <h1 className="text-8xl font-bold text-neutral-100 line-clamp-1 pb-2">
            {song?.title}
          </h1>
          <p className="text-neutral-200">
            {song?.more_info?.artistMap?.primary_artists[0]?.name}
            {` • ${song?.more_info?.album} • ${song?.year}`}
            {` • ${secondsToMinutes(song?.more_info?.duration)}`}
          </p>
        </div>
      </div>
      <PlaylistHeader type="song" playlistId={song.id} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Lyrics</h2>
        <p
          className="text-neutral-300 text-sm"
          dangerouslySetInnerHTML={{ __html: lyricsResult.lyrics }}
        />
      </div>
      <div className="mt-8">
        <Playlists
          title={`More from ${song?.more_info?.album}`}
          playlists={album.list}
        />
      </div>
    </div>
  );
};

export default SongIdPage;
