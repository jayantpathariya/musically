import { config } from "@/constants/config";
import api from "@/services/api";
import { formatDuration } from "../lib/utils";

export const getSong = async ({ id, type }) => {
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
    };

    return data;
  } catch (error) {
    console.log("[GET_SONG]", error);
    return null;
  }
};
