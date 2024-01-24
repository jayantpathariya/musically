import { config } from "@/constants/config";
import api from "@/services/api";
import { createDownloadLinks } from "../lib/utils";

export const getPlaylist = async ({ id, type }) => {
  try {
    const response = await api(config.endpoints.songs.link, {
      token: id,
      type,
    });

    const data = {
      ...response.data,
      image: response.data.image.replace("150x150", "500x500"),
      duration: response.data.list
        .map((item) => item?.more_info?.duration)
        .reduce((a, b) => +a + +b, 0),
      list: response.data.list.map((item) => ({
        ...item,
        download_links: createDownloadLinks(
          item?.more_info?.encrypted_media_url
        ),
      })),
    };

    return data;
  } catch (error) {
    console.log("[GET_SONG]", error);
    return null;
  }
};
