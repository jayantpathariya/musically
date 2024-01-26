import { config } from "@/constants/config";
import api from "@/services/api";

export const getDiscover = async (type) => {
  try {
    const isTopChart = type === "top-chart";
    const isTopPlaylist = type === "top-playlists";
    const isTopArtist = type === "top-artists";

    let endpoint = config.endpoints.discover.newReleases;

    if (isTopChart) {
      endpoint = config.endpoints.discover.topCharts;
    } else if (isTopPlaylist) {
      endpoint = config.endpoints.discover.topPlaylists;
    } else if (isTopArtist) {
      endpoint = config.endpoints.discover.topArtists;
    }

    const response = await api(endpoint);

    if (isTopChart) {
      return response.data;
    } else if (isTopArtist) {
      return response.data.top_artists;
    } else {
      return response.data.data;
    }
  } catch (error) {
    console.log("[GET_NEW_RELEASES]", error);
  }
};
