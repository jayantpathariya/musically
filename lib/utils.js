import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import duration from "dayjs/plugin//duration";

dayjs.extend(duration);

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatArtist = (artist) => {
  return artist?.artistMap?.artists?.map((item) => item.name).join(", ");
};

export const formatDuration = (seconds) => {
  const durationObject = dayjs.duration(seconds, "seconds");
  const hours = durationObject.hours();
  const minutes = durationObject.minutes();
  const remainingSeconds = durationObject.seconds();

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours} hr `;
  }

  if (minutes > 0) {
    formattedDuration += `${minutes} min`;
  }

  // Only show seconds if there are remaining seconds and the duration is less than an hour
  if (remainingSeconds > 0 && hours === 0) {
    formattedDuration += ` ${remainingSeconds} sec`;
  }

  // Handle the case where the duration is less than a minute
  if (formattedDuration === "" && remainingSeconds === 0) {
    formattedDuration = "0 sec";
  }

  return formattedDuration.trim();
};
