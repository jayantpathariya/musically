import { config } from "@/constants/config";
import axios from "axios";

const client = axios.create({
  baseURL: config.baseURL,
  params: {
    _format: "json",
    _marker: 0,
    api_version: 4,
    ctx: "web6dot0",
    n: 100,
  },
});

const api = async (endpoint, params) => {
  try {
    const response = await client({
      params: {
        __call: endpoint,
        ...params,
      },
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log("[API]", error);
    return Promise.reject(error);
  }
};

export default api;
