import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Inisialisasi Redis — set env vars di Vercel dashboard:
// UPSTASH_REDIS_REST_URL dan UPSTASH_REDIS_REST_TOKEN
// Free tier Upstash cukup untuk ~10k requests/hari
let ratelimit: Ratelimit | null = null;

function getRatelimiter(): Ratelimit {
  if (!ratelimit) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error("UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required");
    }
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      // 10 request per 60 detik per IP
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "tiktok-dl",
    });
  }
  return ratelimit;
}

// Fallback in-memory untuk development (tanpa Redis)
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

function inMemoryRateLimit(ip: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = inMemoryStore.get(ip);

  if (!entry || now > entry.resetAt) {
    inMemoryStore.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }

  if (entry.count >= limit) {
    return false; // blocked
  }

  entry.count++;
  return true; // allowed
}

export function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? "127.0.0.1";
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  limit: number;
}

export async function checkRateLimit(req: NextRequest): Promise<RateLimitResult> {
  const ip = getClientIP(req);

  // Development mode: pakai in-memory
  if (process.env.NODE_ENV === "development" || !process.env.UPSTASH_REDIS_REST_URL) {
    const allowed = inMemoryRateLimit(ip);
    return {
      success: allowed,
      remaining: allowed ? 9 : 0,
      reset: Date.now() + 60_000,
      limit: 10,
    };
  }

  // Production: pakai Upstash Redis
  try {
    const limiter = getRatelimiter();
    const { success, remaining, reset, limit } = await limiter.limit(ip);
    return { success, remaining, reset, limit };
  } catch (error) {
    console.error("[RateLimit] Redis error, allowing request:", error);
    // Fail open — jangan block user kalau Redis down
    return { success: true, remaining: 1, reset: Date.now() + 60_000, limit: 10 };
  }
}