import { type FormEvent, useEffect, useRef, useState } from "react";
import { slugify } from "@/lib/slug";
import type { Blog, BlogInput, BlogStatus } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

type BlogFormProps = {
  initial?: Blog | null;
  isSubmitting?: boolean;
  onSubmit: (input: BlogInput) => Promise<void> | void;
  onCancel?: () => void;
};

async function fileToDataUrl(file: File) {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image"));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
}

export default function BlogForm({ initial, onSubmit, onCancel, isSubmitting = false }: BlogFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [featuredImage, setFeaturedImage] = useState(initial?.featuredImage || "");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription || "");
  const [content, setContent] = useState(initial?.content || "");
  const [tags, setTags] = useState<string[]>(initial?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState(initial?.category || "General");
  const [metaTitle, setMetaTitle] = useState(initial?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initial?.metaDescription || "");
  const [keywords, setKeywords] = useState(initial?.keywords || "");
  const [author, setAuthor] = useState(initial?.author || "Admin");
  const [publishDate, setPublishDate] = useState(initial?.publishDate?.slice(0, 10) || new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<BlogStatus>(initial?.status || "draft");
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!initial) setSlug(slugify(title));
  }, [title, initial]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const addTag = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (!tags.includes(value)) setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const htmlContent = editorRef.current?.innerHTML || content;
    await onSubmit({
      title,
      slug,
      featuredImage,
      shortDescription,
      content: htmlContent,
      tags,
      category,
      metaTitle,
      metaDescription,
      keywords,
      author,
      publishDate,
      status,
    });
  };

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    setContent(editorRef.current?.innerHTML || "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-background p-6">
      <Heading level={3}>{initial ? "Update Blog" : "Post Blog"}</Heading>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Slug</label>
          <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Category</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setFeaturedImage(await fileToDataUrl(file));
            }}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
          {featuredImage && <img src={featuredImage} alt="preview" className="h-36 w-full rounded-md border border-border object-cover" />}
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Short Description</label>
          <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={3} required className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Content (Rich Text)</label>
          <div className="rounded-md border border-border">
            <div className="flex flex-wrap gap-2 border-b border-border p-2">
              <Button type="button" variant="outline" onClick={() => exec("bold")}>
                Bold
              </Button>
              <Button type="button" variant="outline" onClick={() => exec("italic")}>
                Italic
              </Button>
              <Button type="button" variant="outline" onClick={() => exec("formatBlock", "<h2>")}>
                H2
              </Button>
              <Button type="button" variant="outline" onClick={() => exec("insertUnorderedList")}>
                Bullet List
              </Button>
            </div>
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
              className="min-h-[220px] rounded-b-md p-3 text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Tags</label>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="w-full rounded-md border border-border px-3 py-2 text-sm"
              placeholder="Add tag and press Enter"
            />
            <Button type="button" variant="outline" onClick={addTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                className="rounded-full border border-border px-3 py-1 text-xs"
              >
                {tag} ×
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Meta Title</label>
          <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Keywords</label>
          <input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Meta Description</label>
          <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Publish Date</label>
          <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required className="w-full rounded-md border border-border px-3 py-2 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as BlogStatus)} className="w-full rounded-md border border-border px-3 py-2 text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initial ? "Update Blog" : "Publish Blog"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
