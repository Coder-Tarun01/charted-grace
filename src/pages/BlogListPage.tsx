import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { listBlogs } from "@/lib/blogStore";
import type { Blog } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ListState = {
  items: Blog[];
  page: number;
  totalPages: number;
  total: number;
};

export default function BlogListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<ListState>({ items: [], page: 1, totalPages: 1, total: 0 });

  useEffect(() => {
    document.title = "Blog | Compliance Desk India";
    let node = document.head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("name", "description");
      document.head.appendChild(node);
    }
    node.setAttribute("content", "Read latest finance, compliance, tax, and CFO insights for startups.");
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    listBlogs({ page, limit: 9, search, category, status: "published" })
      .then((res) => {
        if (!active) return;
        setState({ items: res.items, page: res.page, totalPages: res.totalPages, total: res.total });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page, search, category]);

  const categories = useMemo(() => {
    const set = new Set(state.items.map((item) => item.category).filter(Boolean));
    return Array.from(set);
  }, [state.items]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-muted/20 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold">Our Blog</h1>
          <p className="mt-3 text-muted-foreground">Insights on CFO strategy, compliance, finance, and growth.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <Input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by blog title"
            />
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
              className="h-10 rounded-md border border-border bg-background px-3 text-sm"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("");
                setPage(1);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading blogs...</p>
          ) : state.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No blogs found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.items.map((blog) => (
                <article key={blog.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt={blog.title} className="h-44 w-full object-cover" />
                  ) : (
                    <div className="h-44 w-full bg-muted" />
                  )}
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase text-primary">{blog.category}</p>
                    <h2 className="mt-2 text-lg font-semibold leading-snug">{blog.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{blog.shortDescription}</p>
                    <Link to={`/blog/${blog.slug}`} className="mt-4 inline-block text-sm font-semibold text-primary">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Page {state.page} of {state.totalPages} • {state.total} posts
            </p>
            <div className="flex gap-2">
              <Button variant="outline" disabled={state.page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={state.page >= state.totalPages}
                onClick={() => setPage((p) => Math.min(state.totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
