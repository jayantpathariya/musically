import dayjs from "dayjs";
import duration from "dayjs/plugin//duration";
import { cipher, util } from "node-forge";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

dayjs.extend(duration);

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatArtist = (artist) => {
  if (artist?.artistMap?.artists?.length > 3) {
    return (
      artist?.artistMap?.artists
        ?.slice(0, 3)
        .map((item) => item.name)
        .join(", ") + " & more"
    );
  } else {
    return artist?.artistMap?.artists?.map((item) => item.name).join(", ");
  }
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

export const secondsToMinutes = (seconds) => {
  const durationObject = dayjs.duration(seconds, "seconds");
  const minutes = durationObject.minutes();
  const remainingSeconds = durationObject.seconds();

  let formattedDuration = "";

  if (minutes > 0) {
    formattedDuration += `${minutes}:`;
  }

  formattedDuration += `${remainingSeconds.toString().padStart(2, "0")}`;

  return formattedDuration.trim();
};

export const createDownloadLinks = (encryptedMediaUrl) => {
  if (!encryptedMediaUrl) return false;
  const url = decodeURIComponent(encryptedMediaUrl.replaceAll(" ", "+"));

  const qualities = [
    { id: "_12", bitrate: "12kbps" },
    { id: "_48", bitrate: "48kbps" },
    { id: "_96", bitrate: "96kbps" },
    { id: "_160", bitrate: "160kbps" },
    { id: "_320", bitrate: "320kbps" },
  ];

  const key = "38346591";
  const iv = "00000000";

  const encrypted = util.decode64(url);
  const decipher = cipher.createDecipher(
    "DES-ECB",
    util.createBuffer(key, "utf8")
  );

  decipher.start({ iv: util.createBuffer(iv, "utf8") });
  decipher.update(util.createBuffer(encrypted));
  decipher.finish();

  const decryptedLink = decipher.output.getBytes();

  const links =
    qualities.map((quality) => ({
      quality: quality.bitrate,
      link: decryptedLink.replace("_96", quality.id),
    })) || false;

  return links;
};
