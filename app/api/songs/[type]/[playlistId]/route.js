import { NextResponse } from "next/server";

import api from "@/services/api";
import { config } from "@/constants/config";
import { createDownloadLinks } from "@/lib/utils";

export async function GET(_, { params }) {
  try {
    const { type, playlistId } = params;
    const response = await api(config.endpoints.songs.link, {
      token: playlistId,
      type,
    });

    const data = {
      ...response.data,
      image: response.data.image.replace("150x150", "500x500"),
      duration: response.data.list
        .map((item) => item?.more_info?.duration)
        .reduce((a, b) => +a + +b, 0),
      list: response.data.list.map((item) => ({
        ...item,
        download_links: createDownloadLinks(
          item?.more_info?.encrypted_media_url
        ),
      })),
    };

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),

      { status: 500 }
    );
  }
}
