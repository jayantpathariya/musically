import { DiscoverCard } from "@/components/discover-card";

const categories = [
  {
    id: 1,
    title: "New Releases",
    color: "bg-pink-600",
    href: "new-releases",
  },
  {
    id: 2,
    title: "Top Chart",
    color: "bg-green-600",
    href: "top-chart",
  },
  {
    id: 3,
    title: "Top Playlists",
    color: "bg-yellow-600",
    href: "top-playlists",
  },
];

const SearchPage = () => {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">Browse all</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories.map((category) => (
          <DiscoverCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
