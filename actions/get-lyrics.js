import { config } from "@/constants/config";
import api from "@/services/api";

export const getLyrics = async (songId) => {
  try {
    const response = await api(config.endpoints.lyrics, {
      lyrics_id: songId,
    });

    return response.data;
  } catch (error) {
    console.log("[GET_LYRICS]", error);
  }
};
