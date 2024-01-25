import { config } from "@/constants/config";
import { createDownloadLinks } from "@/lib/utils";
import api from "@/services/api";

export const getArtist = async (id) => {
  try {
    const response = await api(config.endpoints.artists.link, {
      token: id,
      type: "artist",
    });

    const data = {
      ...response.data,
      topSongs: response.data?.topSongs?.map((item) => ({
        ...item,
        download_links: createDownloadLinks(
          item?.more_info?.encrypted_media_url
        ),
      })),
    };

    return data;
  } catch (error) {
    console.log("[GET_ARTIST]", error);
  }
};
