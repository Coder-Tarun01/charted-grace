export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  shortDescription: string;
  content: string;
  tags: string[];
  category: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  author: string;
  publishDate: string;
  status: BlogStatus;
  createdAt: string;
};

export type BlogInput = {
  title: string;
  slug?: string;
  featuredImage?: string;
  shortDescription: string;
  content: string;
  tags: string[];
  category: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  author: string;
  publishDate: string;
  status: BlogStatus;
};

export type BlogListResponse = {
  items: Blog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
