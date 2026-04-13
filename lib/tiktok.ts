import { Downloader } from "@tobyg74/tiktok-api-dl";

export type VideoQuality = "hd" | "watermark" | "nowatermark";

export interface TikTokVideoResult {
  status: "success";
  type: "video";
  title: string;
  author: {
    username: string;
    nickname: string;
    avatar: string;
  };
  statistics: {
    playCount: number;
    downloadCount: number;
    shareCount: number;
    commentCount: number;
    likeCount: number;
  };
  video: {
    noWatermark: string[];
    watermark: string[];
    cover: string;
    dynamicCover: string;
    duration: number;
  };
}

export interface TikTokMusicResult {
  status: "success";
  type: "music";
  title: string;
  author: string;
  audio: string;
  cover: string;
  duration: number;
}

export interface TikTokErrorResult {
  status: "error";
  message: string;
  code?: string;
}

export type TikTokResult = TikTokVideoResult | TikTokMusicResult | TikTokErrorResult;

function isValidTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "tiktok.com",
      "www.tiktok.com",
      "vm.tiktok.com",
      "vt.tiktok.com",
      "m.tiktok.com",
    ];
    return validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
  } catch {
    return false;
  }
}

function sanitizeUrl(url: string): string {
  // Hapus tracking params yang tidak perlu
  try {
    const parsed = new URL(url);
    const keepParams = ["id"];
    const cleanParams = new URLSearchParams();
    keepParams.forEach((key) => {
      const val = parsed.searchParams.get(key);
      if (val) cleanParams.set(key, val);
    });
    parsed.search = cleanParams.toString();
    return parsed.toString();
  } catch {
    return url;
  }
}

export async function downloadTikTok(rawUrl: string): Promise<TikTokResult> {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { status: "error", message: "URL tidak boleh kosong", code: "EMPTY_URL" };
  }

  const url = sanitizeUrl(rawUrl.trim());

  if (!isValidTikTokUrl(url)) {
    return {
      status: "error",
      message: "URL tidak valid. Pastikan link berasal dari TikTok.",
      code: "INVALID_URL",
    };
  }

  try {
    const result = await Promise.race([
      Downloader(url, { version: "v3" }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), 25_000)
      ),
    ]);

    if (!result || result.status === "error") {
      return {
        status: "error",
        message: "Gagal mengambil data video. Coba lagi beberapa saat.",
        code: "FETCH_FAILED",
      };
    }

    // Handle video result
    if (result.result?.type === "video") {
      const r = result.result;
      return {
        status: "success",
        type: "video",
        title: r.desc ?? "TikTok Video",
        author: {
          username: (r.author as any)?.uniqueId ?? (r.author as any)?.username ?? "",
          nickname: (r.author as any)?.nickname ?? "",
          avatar: (r.author as any)?.avatarThumb ?? (r.author as any)?.avatar ?? "",
        },
        statistics: {
          playCount: (r as any).statistics?.playCount ?? 0,
          downloadCount: (r as any).statistics?.downloadCount ?? 0,
          shareCount: (r as any).statistics?.shareCount ?? 0,
          commentCount: (r as any).statistics?.commentCount ?? 0,
          likeCount: (r as any).statistics?.diggCount ?? (r as any).statistics?.likeCount ?? 0,
        },
        video: {
          noWatermark: Array.isArray((r as any).video?.noWatermark)
            ? (r as any).video.noWatermark
            : (r as any).video?.noWatermark
            ? [(r as any).video.noWatermark]
            : [],
          watermark: Array.isArray((r as any).video?.watermark)
            ? (r as any).video.watermark
            : (r as any).video?.watermark
            ? [(r as any).video.watermark]
            : [],
          cover: (r as any).video?.cover ?? "",
          dynamicCover: (r as any).video?.dynamicCover ?? "",
          duration: (r as any).video?.duration ?? 0,
        },
      };
    }

    // Handle music/slideshow result
    if ((result.result as any)?.type === "music" || result.result?.music) {
      const r = result.result;
      const music = (r as any).music ?? (r as any);
      return {
        status: "success",
        type: "music",
        title: (music as any).title ?? "TikTok Audio",
        author: (music as any).authorName ?? (r as any).author?.nickname ?? "",
        audio: (music as any).playUrl ?? (music as any).url ?? "",
        cover: (music as any).coverLarge ?? (music as any).coverThumb ?? "",
        duration: (music as any).duration ?? 0,
      };
    }

    return {
      status: "error",
      message: "Format konten tidak didukung.",
      code: "UNSUPPORTED_FORMAT",
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";

    if (msg === "TIMEOUT") {
      return {
        status: "error",
        message: "Request timeout. Server TikTok lambat, coba lagi.",
        code: "TIMEOUT",
      };
    }

    console.error("[TikTok Downloader] Error:", msg);
    return {
      status: "error",
      message: "Terjadi kesalahan. Coba lagi beberapa saat.",
      code: "INTERNAL_ERROR",
    };
  }
}