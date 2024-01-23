import { config } from "@/constants/config";
import api from "@/services/api";

export const getHomeData = async () => {
  try {
    const response = await api(config.endpoints.home);

    const data = {
      new_trending: response.data.new_trending.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
        year: item.year,
        link: item.perma_url.split("/").pop(),
        play_count: item.play_count,
        list_count: item.list_count,
        list_type: item.list_type,
        list: item.list,
        more_info: item.more_info,
      })),
      top_playlists: response.data.top_playlists.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        link: item.perma_url.split("/").pop(),
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
        more_info: item.more_info,
      })),
      new_albums: response.data.new_albums.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        link: item.perma_url.split("/").pop(),
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
        year: item.year,
        play_count: item.play_count,
        list_count: item.list_count,
        list_type: item.list_type,
        list: item.list,
        more_info: item.more_info,
      })),
      browse_discover: response.data.browse_discover.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        link: item.perma_url.split("/").pop(),
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
        more_info: item.more_info,
      })),
      charts: response.data.charts.map((item) => ({
        id: item.id,
        title: item.title,
        link: item.perma_url.split("/").pop(),
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
        count: item.count,
      })),
      radio: response.data.radio.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        link: item.perma_url.split("/").pop(),
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
      })),
      artist_recos: response.data.artist_recos.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        link: item.perma_url.split("/").pop(),
        type: item.type,
        image: item.image.replace("150x150", "500x500"),
        more_info: item.more_info,
      })),
      tag_mixes: response.data.tag_mixes.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        type: item.type,
        link: item.perma_url.split("/").pop(),
        image: item.image.replace("150x150", "500x500"),
        year: item.year,
        play_count: item.play_count,
        list_count: item.list_count,
        list_type: item.list_type,
        list: item.list,
        more_info: item.more_info,
      })),
      "promo:vx:data:76": response.data["promo:vx:data:76"],
      "promo:vx:data:185": response.data["promo:vx:data:185"],
      "promo:vx:data:107": response.data["promo:vx:data:107"],
      "promo:vx:data:113": response.data["promo:vx:data:113"],
      "promo:vx:data:114": response.data["promo:vx:data:114"],
      "promo:vx:data:116": response.data["promo:vx:data:116"],
      "promo:vx:data:212": response.data["promo:vx:data:212"],
      // modules: response.data.modules,
      // only take source, position, title from modules object
      modules: Object.keys(response.data.modules).map((key) => ({
        source: response.data.modules[key].source,
        position: response.data.modules[key].position,
        title: response.data.modules[key].title,
      })),
    };

    return data;
  } catch (error) {
    console.log("[GET_HOME_DATA]", error);
    return null;
  }
};
