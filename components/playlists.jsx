import { PlaylistCard } from "./playlist-card";

export const Playlists = ({ title }) => {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
      </div>
    </div>
  );
};
