import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

const contentDirectory = path.join(process.cwd(), "content/blog");

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author || "TikDown Team",
        thumbnail: data.thumbnail || "/og-image.png",
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "TikDown Team",
      thumbnail: data.thumbnail || "/og-image.png",
    },
    content,
  };
}
