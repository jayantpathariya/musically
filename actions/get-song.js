import { config } from "@/constants/config";
import { createDownloadLinks } from "@/lib/utils";
import api from "@/services/api";

export const getSong = async (songId) => {
  try {
    const response = await api(config.endpoints.songs.id, {
      pids: songId,
    });

    const data = response.data.songs.map((song) => {
      return {
        ...song,
        download_links: createDownloadLinks(song.more_info.encrypted_media_url),
      };
    });

    return data;
  } catch (error) {
    console.log("[GET_SONG]", error);
  }
};
