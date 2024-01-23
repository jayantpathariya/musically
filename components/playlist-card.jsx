import Image from "next/image";
import Link from "next/link";

export const PlaylistCard = () => {
  return (
    <Link
      href="playlist"
      className="bg-neutral-800 rounded-md p-4 hover:bg-neutral-700 transition duration-300"
    >
      <Image
        src="/playlist.jpg"
        width={180}
        height={180}
        alt="playlist poster"
        className="w-full rounded-md mb-3"
      />
      <p className="font-semibold line-clamp-1 mb-1">Moody Mix</p>
      <p className="text-sm text-neutral-400 line-clamp-2">
        Beach House, Sasha Alex Sloan and Arijit Singh
      </p>
    </Link>
  );
};
