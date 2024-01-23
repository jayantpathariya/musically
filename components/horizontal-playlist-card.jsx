import Image from "next/image";
import Link from "next/link";

export const HorizontalPlaylistCard = () => {
  return (
    <Link
      href="/playlist"
      className="bg-neutral-800 flex items-center gap-x-2 rounded-md overflow-hidden"
    >
      <Image src="/playlist.jpg" height={50} width={50} alt="playlist poster" />
      <p className="font-semibold text-sm">Playlist 1</p>
    </Link>
  );
};
