import { slugify } from "@/lib/slug";
import type { Blog, BlogInput, BlogListResponse } from "@/types/blog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });
  if (!response.ok) {
    let message = `API request failed: ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        const parsed = JSON.parse(text) as { message?: string };
        if (parsed.message) message = parsed.message;
      }
    } catch {
      // noop
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

function normalizeInput(input: BlogInput): BlogInput {
  const title = input.title.trim();
  const slug = slugify(input.slug?.trim() || title);
  return {
    ...input,
    title,
    slug,
    featuredImage: (input.featuredImage || "").trim(),
    shortDescription: input.shortDescription.trim(),
    content: input.content.trim(),
    tags: input.tags.map((t) => t.trim()).filter(Boolean),
    category: input.category.trim() || "General",
    metaTitle: (input.metaTitle || title).trim(),
    metaDescription: (input.metaDescription || input.shortDescription).trim(),
    keywords: (input.keywords || input.tags.join(", ")).trim(),
    author: input.author.trim() || "Admin",
    publishDate: input.publishDate,
    status: input.status,
  };
}

export async function createBlog(input: BlogInput) {
  return requestJson<Blog>("/blogs", {
    method: "POST",
    body: JSON.stringify(normalizeInput(input)),
  });
}

export async function updateBlog(id: string, input: BlogInput) {
  return requestJson<Blog>(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(normalizeInput(input)),
  });
}

export async function deleteBlog(id: string) {
  await fetch(`${API_BASE_URL}/blogs/${id}`, { method: "DELETE" });
}

export async function listBlogs(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}) {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.search) search.set("search", params.search);
  if (params?.category) search.set("category", params.category);
  if (params?.status) search.set("status", params.status);
  return requestJson<BlogListResponse>(`/blogs${search.toString() ? `?${search.toString()}` : ""}`);
}

export async function getBlogBySlug(slug: string) {
  return requestJson<Blog>(`/blogs/${slug}`);
}
