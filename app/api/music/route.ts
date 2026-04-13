import { NextRequest, NextResponse } from "next/server";
import { downloadTikTok } from "@/lib/tiktok";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const rateResult = await checkRateLimit(req);
  if (!rateResult.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Terlalu banyak request. Coba lagi setelah 1 menit.",
        code: "RATE_LIMITED",
      },
      { status: 429 }
    );
  }

  let url: string;
  try {
    const body = await req.json();
    url = body?.url;
  } catch {
    return NextResponse.json(
      { status: "error", message: "Request body tidak valid." },
      { status: 400 }
    );
  }

  if (!url) {
    return NextResponse.json(
      { status: "error", message: "Parameter url diperlukan." },
      { status: 400 }
    );
  }

  const result = await downloadTikTok(url);

  if (result.status === "error") {
    return NextResponse.json(result, { status: 400 });
  }

  // Jika content adalah video, kita tetap bisa ambil musiknya
  if (result.type === "video") {
    // Cari audio di result (biasanya tiktok-api-dl menyertakan music object di video)
    // Jika tidak ada di result.video, kita coba cari di field lain jika ada
    return NextResponse.json({
      status: "success",
      type: "music",
      title: result.title,
      author: result.author.nickname,
      audio: "", // TikTok V3 terkadang tidak langsung kasih audio di video object, butuh v2 atau parsing lain
      cover: result.video.cover,
      duration: result.video.duration,
      isFromVideo: true,
      videoResult: result // Sediakan video result sebagai fallback
    });
  }

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
    },
  });
}