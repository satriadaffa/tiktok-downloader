"use client";

interface VideoResult {
  type: "video";
  title: string;
  author: { username: string; nickname: string; avatar: string };
  statistics: { likeCount: number; playCount: number };
  video: { noWatermark: string[]; watermark: string[]; cover: string; duration: number };
}

interface MusicResult {
  type: "music";
  title: string;
  author: string;
  audio: string;
  cover: string;
  duration: number;
}

interface ResultCardProps {
  result: VideoResult | MusicResult;
  onReset: () => void;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function DownloadButton({
  href,
  label,
  accent = false,
}: {
  href: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      download
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "11px 20px",
        background: accent
          ? "linear-gradient(135deg, var(--accent), #c41e3a)"
          : "var(--bg-input)",
        color: accent ? "#fff" : "var(--text-primary)",
        border: accent ? "none" : "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "var(--font-syne)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.2s",
        flex: 1,
        minWidth: "140px",
      }}
      onMouseEnter={(e) => {
        if (!accent) e.currentTarget.style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        if (!accent) e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <span style={{ fontSize: "16px" }}>↓</span>
      {label}
    </a>
  );
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const cover = result.type === "video" ? result.video.cover : result.cover;
  const authorName =
    result.type === "video" ? result.author.nickname : result.author;

  return (
    <div
      style={{
        marginTop: "20px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        animation: "slideUp 0.3s ease",
      }}
    >
      {/* Cover + info */}
      <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
        {/* Thumbnail */}
        {cover && (
          <div style={{
            flexShrink: 0,
            width: "80px",
            height: "80px",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            background: "var(--bg-input)",
          }}>
            <img
              src={cover}
              alt="cover"
              width={80}
              height={80}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        )}

        {/* Info */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <p style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "15px",
            marginBottom: "6px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {result.title || "TikTok Video"}
          </p>

          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>
            @{authorName}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {result.type === "video" && (
              <>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  ▶ {formatCount(result.statistics.playCount)} views
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  ♥ {formatCount(result.statistics.likeCount)}
                </span>
              </>
            )}
            {result.type === "music" && result.duration > 0 && (
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                🎵 {formatDuration(result.duration)}
              </span>
            )}
            {result.type === "video" && result.video.duration > 0 && (
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                ⏱ {formatDuration(result.video.duration)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)" }} />

      {/* Download buttons */}
      <div style={{ padding: "16px 20px" }}>
        {result.type === "video" && (
          <>
            <p style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginBottom: "12px",
              fontWeight: 500,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              Pilih Format Download
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {result.video.noWatermark.length > 0 && (
                <DownloadButton
                  href={result.video.noWatermark[0]}
                  label="Tanpa Watermark"
                  accent
                />
              )}
              {result.video.watermark.length > 0 && (
                <DownloadButton
                  href={result.video.watermark[0]}
                  label="Dengan Watermark"
                />
              )}
            </div>
          </>
        )}

        {result.type === "music" && result.audio && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <DownloadButton href={result.audio} label="Download Audio MP3" accent />
          </div>
        )}
      </div>

      {/* Footer — reset */}
      <div style={{
        padding: "12px 20px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <button
          onClick={onReset}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          ↺ Download lagi
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}