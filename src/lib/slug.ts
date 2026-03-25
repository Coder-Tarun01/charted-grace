/**
 * URL-safe slug: lowercase, hyphens, alphanumeric only.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugifyModule(title: string): string {
  return slugify(title);
}
