import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatArtist = (artist) => {
  return artist?.artistMap?.artists?.map((item) => item.name).join(", ");
};
