import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Artikel TikDown — Info Seputar TikTok",
  description: "Dapatkan info terbaru, tips, dan trik seputar penggunaan TikTok dan cara download video terbaru.",
  alternates: { canonical: "/blog" },
};

export default function BlogListingPage() {
  const posts = getBlogPosts();

  return (
    <div className="container" style={{ padding: "4rem 1.5rem" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>
          Blog TikDown
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "18px" }}>
          Update terbaru dan tips seputar konten TikTok.
        </p>
      </header>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "2rem" 
      }}>
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="blog-card"
            style={{ 
              display: "block",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              transition: "transform 0.2s, border-color 0.2s",
              textDecoration: "none"
            }}
          >
            {/* Thumbnail */}
            <div style={{ height: "200px", overflow: "hidden", background: "var(--bg-input)" }}>
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            
            {/* Content preview */}
            <div style={{ padding: "1.5rem" }}>
              <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, textTransform: "uppercase" }}>
                {new Date(post.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <h2 style={{ fontSize: "1.25rem", margin: "0.75rem 0", color: "var(--text-primary)" }}>
                {post.title}
              </h2>
              <p style={{ 
                fontSize: "14px", 
                color: "var(--text-secondary)", 
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {post.description}
              </p>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
            Belum ada artikel saat ini.
          </div>
        )}
      </div>
    </div>
  );
}
