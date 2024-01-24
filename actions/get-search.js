import { config } from "@/constants/config";
import api from "@/services/api";

export const getSearch = async (query) => {
  try {
    const response = await api(config.endpoints.search.all, {
      query: query,
    });

    return response.data;
  } catch (error) {
    console.log("[GET_SEARCH]", error);
  }
};
