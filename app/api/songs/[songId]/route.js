import { NextResponse } from "next/server";

import api from "@/services/api";
import { config } from "@/constants/config";
import { createDownloadLinks } from "@/lib/utils";

export async function GET(_, { params }) {
  try {
    const { songId } = params;
    const response = await api(config.endpoints.songs.id, {
      pids: songId,
    });

    const data = response.data.songs.map((song) => {
      return {
        ...song,
        download_links: createDownloadLinks(song.more_info.encrypted_media_url),
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),

      { status: 500 }
    );
  }
}
