import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { getBlogBySlug, listBlogs } from "@/lib/blogStore";
import type { Blog } from "@/types/blog";
import HeroSection from "@/components/blog/HeroSection";
import StatsSection from "@/components/blog/StatsSection";
import CTASection from "@/components/blog/CTASection";
import FeatureCard from "@/components/blog/FeatureCard";

type DetailState = { loading: boolean; blog?: Blog; related: Blog[]; error?: string };

function upsertMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let node = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement("meta");
    if (property) node.setAttribute("property", name);
    else node.setAttribute("name", name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

export default function BlogDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [state, setState] = useState<DetailState>({ loading: true, related: [] });

  useEffect(() => {
    let active = true;
    setState({ loading: true, related: [] });
    getBlogBySlug(slug)
      .then(async (blog) => {
        if (!active) return;
        const list = await listBlogs({ limit: 4, category: blog.category, status: "published" });
        const related = list.items.filter((item) => item.slug !== blog.slug).slice(0, 3);

        document.title = blog.metaTitle || blog.title;
        upsertMeta("description", blog.metaDescription || blog.shortDescription);
        upsertMeta("og:title", blog.metaTitle || blog.title, true);
        upsertMeta("og:description", blog.metaDescription || blog.shortDescription, true);
        upsertMeta("og:image", blog.featuredImage || "", true);

        setState({ loading: false, blog, related });
      })
      .catch((err) => {
        if (!active) return;
        setState({ loading: false, related: [], error: err instanceof Error ? err.message : "Failed to load blog" });
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (state.loading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-4xl px-4 py-16 text-sm text-muted-foreground">Loading blog...</div>
      </SiteLayout>
    );
  }

  if (!state.blog || state.error) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-2xl font-semibold">Blog not found</h1>
          <p className="mt-2 text-muted-foreground">{state.error || "This blog does not exist."}</p>
          <Link to="/blog" className="mt-4 inline-block text-primary">
            ← Back to Blog
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const blog = state.blog;

  return (
    <SiteLayout>
      <HeroSection title={blog.title} subtitle={blog.shortDescription} image={blog.featuredImage} />
      <StatsSection
        stats={[
          { label: "Author", value: blog.author },
          { label: "Published", value: new Date(blog.publishDate).toLocaleDateString() },
          { label: "Category", value: blog.category },
          { label: "Status", value: blog.status },
        ]}
      />

      <section className="py-6">
        <article className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-3xl font-semibold">Overview</h2>
          <p className="mb-6 text-base text-muted-foreground">{blog.shortDescription}</p>
          <h3 className="mb-3 text-2xl font-semibold">{blog.title}</h3>
          <div className="mb-6 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
          <div className="prose prose-slate max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-2xl font-semibold">Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {(blog.tags.length ? blog.tags.slice(0, 3) : ["Expert Insights", "Startup Focus", "Actionable Guidance"]).map(
              (item, idx) => (
                <FeatureCard
                  key={`${item}-${idx}`}
                  title={item}
                  description="Practical perspective designed for founders, finance teams, and growth-stage operators."
                />
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Read the strategic context and key framework.",
              "Apply checklist-based steps to your current finance workflow.",
              "Consult our team to execute with compliance certainty.",
            ].map((step, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card p-4 text-sm">
                <p className="mb-2 text-xs font-semibold uppercase text-primary">Step {idx + 1}</p>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-2xl font-semibold">Testimonials</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <blockquote className="rounded-xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground">
              "The frameworks shared here helped us streamline reporting and communicate with investors better."
            </blockquote>
            <blockquote className="rounded-xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground">
              "Clear, practical, and startup-specific. We implemented the checklist in less than two weeks."
            </blockquote>
          </div>
        </div>
      </section>

      {!!state.related.length && (
        <section className="border-t border-border py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-2xl font-semibold">Related Blogs</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {state.related.map((item) => (
                <article key={item.id} className="rounded-xl border border-border p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.shortDescription}</p>
                  <Link to={`/blog/${item.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary">
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Need finance leadership for your startup?"
        description="Connect with our team to build a compliance-safe and investor-ready finance function."
      />
    </SiteLayout>
  );
}
