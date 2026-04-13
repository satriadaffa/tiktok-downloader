"use client";

import { useState, useCallback } from "react";
import ResultCard from "./ResultCard";

type DownloadState = "idle" | "loading" | "success" | "error";

export default function DownloaderForm() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<DownloadState>("idle");
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setState("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setState("error");
        setErrorMsg(data.message ?? "Gagal memproses URL. Coba lagi.");
        return;
      }

      setState("success");
      setResult(data);
    } catch {
      setState("error");
      setErrorMsg("Koneksi gagal. Periksa internet kamu dan coba lagi.");
    }
  }, [url]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // Clipboard API might be blocked
    }
  }, []);

  const handleReset = () => {
    setUrl("");
    setState("idle");
    setResult(null);
    setErrorMsg("");
  };

  return (
    <div>
      {/* Input area */}
      <div style={{
        display: "flex",
        gap: "10px",
        alignItems: "stretch",
        marginBottom: "12px",
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Tempel link TikTok di sini..."
            disabled={state === "loading"}
            style={{
              width: "100%",
              height: "52px",
              padding: "0 52px 0 18px",
              background: "var(--bg-input)",
              border: `1px solid ${state === "error" ? "var(--accent)" : "var(--border)"}`,
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "15px",
              fontFamily: "var(--font-dm)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              if (state !== "error") e.target.style.borderColor = "var(--border-hover)";
            }}
            onBlur={(e) => {
              if (state !== "error") e.target.style.borderColor = "var(--border)";
            }}
          />
          {/* Tombol paste */}
          <button
            onClick={handlePaste}
            title="Paste dari clipboard"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "18px",
              padding: "4px",
              lineHeight: 1,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            📋
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={state === "loading" || !url.trim()}
          style={{
            height: "52px",
            padding: "0 28px",
            background: state === "loading"
              ? "var(--accent-dim)"
              : "linear-gradient(135deg, var(--accent), #c41e3a)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "var(--font-syne)",
            cursor: state === "loading" || !url.trim() ? "not-allowed" : "pointer",
            opacity: !url.trim() ? 0.5 : 1,
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            minWidth: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {state === "loading" ? (
            <>
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
              Memproses...
            </>
          ) : (
            <>
              <span>↓</span> Download
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {state === "error" && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--accent-dim)",
          border: "1px solid rgba(254,44,85,0.2)",
          borderRadius: "var(--radius-sm)",
          marginBottom: "16px",
          gap: "12px",
        }}>
          <span style={{ fontSize: "14px", color: "#ff8fa3" }}>⚠ {errorMsg}</span>
          <button
            onClick={handleReset}
            style={{
              background: "none",
              border: "1px solid rgba(254,44,85,0.3)",
              borderRadius: "6px",
              color: "var(--accent)",
              padding: "4px 10px",
              fontSize: "12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Reset
          </button>
        </div>
      )}

      {/* Hint text */}
      {state === "idle" && (
        <p style={{ fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
          Mendukung video TikTok, Reels, dan konten musik. Gratis & tanpa watermark.
        </p>
      )}

      {/* Result */}
      {state === "success" && result && (
        <ResultCard result={result} onReset={handleReset} />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--text-muted); }
      `}</style>
    </div>
  );
}