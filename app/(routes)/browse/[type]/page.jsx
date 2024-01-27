import { getDiscover } from "@/actions/get-discover";
import { HeaderBackButton } from "@/components/header-back-button";
import { PlaylistCard } from "@/components/playlist-card";
import { createImageLinks, formatArtist, getLink } from "@/lib/utils";

const BrowseTypePage = async ({ params }) => {
  const pageName = params.type
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const result = await getDiscover(params.type);

  return (
    <div className="md:mt-8">
      <HeaderBackButton />
      <h1 className="text-4xl md:text-7xl font-bold">{pageName}</h1>
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Discover {pageName}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {result?.map((item) => {
            return (
              <PlaylistCard
                key={item.id}
                id={item.id}
                link={getLink(item)}
                title={item.title || item?.name}
                image={createImageLinks(item.image)[2]?.link}
                subtitle={formatArtist(item?.more_info) || item?.subtitle}
                type={params.type === "top-artists" ? "artist" : item.type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseTypePage;
