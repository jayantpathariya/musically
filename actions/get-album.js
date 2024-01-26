import { config } from "@/constants/config";
import api from "@/services/api";

export const getAlbum = async (albumId) => {
  try {
    const response = await api(config.endpoints.albums.link, {
      token: albumId,
      type: "album",
    });

    return response.data;
  } catch (error) {
    console.log("[GET_ALBUM]", error);
  }
};
