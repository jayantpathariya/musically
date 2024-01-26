import { config } from "@/constants/config";
import axios from "axios";

const client = axios.create({
  baseURL: config.baseURL,
  params: {
    _format: "json",
    _marker: 0,
    ctx: "web6dot0",
    n: 100,
  },
});

const api = async (endpoint, params, isVersion4 = true) => {
  try {
    const v4 = isVersion4 ? { api_version: 4 } : undefined;

    const response = await client({
      params: {
        __call: endpoint,
        ...v4,
        ...params,
      },
      method: "GET",
    });

    console.log(
      client.getUri({ params: { __call: endpoint, ...v4, ...params } })
    );

    return response;
  } catch (error) {
    console.log("[API]", error);
    return Promise.reject(error);
  }
};

export default api;
