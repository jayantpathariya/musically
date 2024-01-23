import { HorizontalPlaylistCard } from "@/components/horizontal-playlist-card";
import { Playlists } from "@/components/playlists";
import { getHomeData } from "@/actions/get-home-data";

export default async function Home() {
  const results = await getHomeData();

  const sortedResults = Object?.values(results?.modules)?.sort(
    (a, b) => a.position - b.position
  );

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
        {sortedResults.map((result) => (
          <Playlists
            key={result.source}
            title={result.title}
            playlists={results[result.source]}
          />
        ))}
      </div>
    </div>
  );
}
