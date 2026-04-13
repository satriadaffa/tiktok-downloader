"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2.5rem 0",
        marginTop: "4rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "18px",
            background: "linear-gradient(135deg, var(--accent), var(--cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TikDown
        </span>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { href: "/", label: "Downloader" },
            { href: "/how-to", label: "Cara Pakai" },
            { href: "/blog", label: "Blog" },
            { href: "/privacy-policy", label: "Kebijakan Privasi" },
            { href: "/terms", label: "Syarat & Ketentuan" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            maxWidth: "560px",
            lineHeight: 1.7,
          }}
        >
          TikDown tidak berafiliasi dengan TikTok™ atau ByteDance Ltd. Gunakan layanan ini
          hanya untuk konten yang kamu miliki atau memiliki izin untuk didownload. Hormati
          hak cipta kreator.
        </p>

        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} TikDown. Dibuat dengan ♥
        </p>
      </div>
    </footer>
  );
}