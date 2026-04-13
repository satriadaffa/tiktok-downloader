import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

// Generate static params for faster loading
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      images: [post.meta.thumbnail],
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container" style={{ maxWidth: "760px", padding: "4rem 1.5rem" }}>
      <Link 
        href="/blog" 
        style={{ color: "var(--text-muted)", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem" }}
      >
        <span>←</span> Kembali ke Blog
      </Link>

      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
          {post.meta.title}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "var(--text-muted)" }}>
          <span>{post.meta.author}</span>
          <span>•</span>
          <span>{new Date(post.meta.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </header>

      {/* Featured Image */}
      {post.meta.thumbnail && (
        <div style={{ marginBottom: "3rem", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" }}>
          <img src={post.meta.thumbnail} alt={post.meta.title} style={{ width: "100%", height: "auto" }} />
        </div>
      )}

      {/* Content wrapper with markdown styles */}
      <article className="prose">
        <MDXRemote source={post.content} />
      </article>

      <style>{`
        .prose {
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .prose h2 { color: var(--text-primary); margin: 2rem 0 1rem; font-size: 1.5rem; }
        .prose h3 { color: var(--text-primary); margin: 1.5rem 0 0.75rem; font-size: 1.25rem; }
        .prose p { margin-bottom: 1.5rem; }
        .prose ul, .prose ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose strong { color: var(--text-primary); }
        .prose a { color: var(--accent); text-decoration: underline; }
        .prose blockquote { 
          border-left: 4px solid var(--accent); 
          padding-left: 1rem; 
          font-style: italic; 
          margin: 1.5rem 0;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
