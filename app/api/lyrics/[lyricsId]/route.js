import { NextResponse } from "next/server";

import { config } from "@/constants/config";
import api from "@/services/api";

export async function GET(_, { params }) {
  try {
    const response = await api(config.endpoints.lyrics, {
      lyrics_id: params.lyricsId,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),

      { status: 500 }
    );
  }
}
