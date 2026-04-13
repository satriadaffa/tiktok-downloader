"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid var(--border)",
      background: "rgba(10,10,15,0.85)",
      backdropFilter: "blur(16px)",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "20px",
            background: "linear-gradient(135deg, var(--accent), var(--cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}>
            TikDown
          </span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {[
            { href: "/", label: "Downloader" },
            { href: "/how-to", label: "Cara Pakai" },
            { href: "/blog", label: "Blog" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}