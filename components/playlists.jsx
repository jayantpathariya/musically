import { formatArtist, getLink } from "@/lib/utils";
import { PlaylistCard } from "./playlist-card";

export const Playlists = ({ title, playlists }) => {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {playlists?.map((playlist) => {
          return (
            <PlaylistCard
              key={playlist.id}
              link={getLink(playlist)}
              title={playlist.title}
              image={playlist.image}
              subtitle={formatArtist(playlist?.more_info) || playlist?.subtitle}
              type={playlist.type}
            />
          );
        })}
      </div>
    </div>
  );
};
