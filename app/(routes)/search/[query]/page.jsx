import { getSearch } from "@/actions/get-search";
import { Playlists } from "@/components/playlists";
import { SearchSongItem } from "@/components/search-song-item";
import { getLink } from "@/lib/utils";
import { SearchTopResultCard } from "@/components/search-top-result-card";

const SearchQueryPage = async ({ params }) => {
  const result = await getSearch(params.query);

  const topQuery = result?.topquery?.data[0];
  const playlists = result?.playlists?.data;
  const albums = result?.albums?.data;
  const artists = result?.artists?.data;
  const songs = result?.songs?.data;

  console.log(songs);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Top result</h2>
          <SearchTopResultCard song={topQuery} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Songs</h2>
          <div>
            {songs?.map((song) => (
              <SearchSongItem key={song.id} songId={song.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        {playlists?.length > 0 && (
          <Playlists title="Playlists" playlists={playlists} />
        )}
        {albums?.length > 0 && <Playlists title="Albums" playlists={albums} />}
        {artists?.length > 0 && (
          <Playlists title="Artists" playlists={artists} />
        )}
      </div>
    </div>
  );
};

export default SearchQueryPage;
