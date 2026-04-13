import { NextRequest, NextResponse } from "next/server";
import { downloadTikTok } from "@/lib/tiktok";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30; // 30 detik untuk Vercel Pro, 10s untuk free tier

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const rateResult = await checkRateLimit(req);
  if (!rateResult.success) {
    return NextResponse.json(
      {
        status: "error",
        message: "Terlalu banyak request. Tunggu 1 menit sebelum mencoba lagi.",
        code: "RATE_LIMITED",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(rateResult.limit),
          "X-RateLimit-Remaining": String(rateResult.remaining),
          "X-RateLimit-Reset": String(rateResult.reset),
          "Retry-After": "60",
        },
      }
    );
  }

  // 2. Parse body
  let url: string;
  try {
    const body = await req.json();
    url = body?.url;
  } catch {
    return NextResponse.json(
      { status: "error", message: "Request body tidak valid.", code: "INVALID_BODY" },
      { status: 400 }
    );
  }

  if (!url) {
    return NextResponse.json(
      { status: "error", message: "Parameter url diperlukan.", code: "MISSING_URL" },
      { status: 400 }
    );
  }

  // 3. Download
  const result = await downloadTikTok(url);

  if (result.status === "error") {
    const statusCode =
      result.code === "INVALID_URL" ? 400 : result.code === "TIMEOUT" ? 504 : 500;
    return NextResponse.json(result, { status: statusCode });
  }

  return NextResponse.json(result, {
    status: 200,
    headers: {
      // Cache 5 menit di CDN untuk URL yang sama
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      "X-RateLimit-Remaining": String(rateResult.remaining),
    },
  });
}

// Handle preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}