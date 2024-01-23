import { HorizontalPlaylistCard } from "@/components/horizontal-playlist-card";
import { Playlists } from "@/components/playlists";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Good evening</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
        <HorizontalPlaylistCard />
        <HorizontalPlaylistCard />
        <HorizontalPlaylistCard />
        <HorizontalPlaylistCard />
        <HorizontalPlaylistCard />
        <HorizontalPlaylistCard />
      </div>
      <div>
        <Playlists title="You top mixes" />
        <Playlists title="You top mixes" />
      </div>
    </div>
  );
}
