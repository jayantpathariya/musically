import { config } from "@/constants/config";
import api from "@/services/api";

export const getArtistOtherTopSongs = async ({
  artistId,
  songId,
  language,
}) => {
  try {
    const response = await api(config.endpoints.artists.topSongs, {
      artist_ids: artistId,
      song_id: songId,
      language,
    });

    return response.data;
  } catch (error) {
    console.log("[GET_ARTIST]", error);
  }
};
