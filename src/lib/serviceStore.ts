import { slugify } from "@/lib/slug";
import { menuSeed } from "@/data/menuSeed";
import type { NavMenuModule, Service, ServiceInput } from "@/types/service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const DEFAULT_CTA = {
  ctaHeadline: "Ready to get started?",
  ctaSubtext: "Share your requirement and our team will reach out with next steps.",
  ctaButtonLabel: "Get free consultation",
} as const;

const DEFAULT_HERO_BANNER_IMAGE = "/images/hero-ca-3.svg";
const DEFAULT_HERO_RIGHT_IMAGE = "/images/hero-ca.svg";

function toTitleCase(text: string) {
  return text
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `svc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function ensureUniqueSlug(
  services: Service[],
  moduleSlug: string,
  baseSlug: string,
  ignoreId?: string,
) {
  const safeBase = baseSlug || "service";
  let candidate = safeBase;
  let index = 2;
  while (
    services.some(
      (service) => service.module === moduleSlug && service.slug === candidate && service.id !== ignoreId,
    )
  ) {
    candidate = `${safeBase}-${index++}`;
  }
  return candidate;
}

function normalizeInput(input: ServiceInput, existing: Service[], ignoreId?: string): Service {
  const moduleSlug = slugify(input.module) || "general";
  const title = input.title.trim();
  const categoryLabel = (input.categoryLabel ?? "General").trim() || "General";
  const category = slugify(input.category ?? categoryLabel) || "general";
  const slugBase = slugify(input.slug?.trim() || title);
  const slug = ensureUniqueSlug(existing, moduleSlug, slugBase, ignoreId);

  return {
    id: ignoreId ?? generateId(),
    module: moduleSlug,
    moduleTitle: input.moduleTitle?.trim() || toTitleCase(moduleSlug),
    category,
    categoryLabel,
    slug,
    title,
    introduction: input.introduction.trim(),
    overview: input.overview.trim(),
    features: input.features.filter(Boolean),
    benefits: input.benefits.filter(Boolean),
    process: input.process.filter(Boolean),
    heroBannerImage: input.heroBannerImage?.trim() || DEFAULT_HERO_BANNER_IMAGE,
    heroRightImage: input.heroRightImage?.trim() || DEFAULT_HERO_RIGHT_IMAGE,
    ...DEFAULT_CTA,
  };
}

export async function getAllServices() {
  try {
    return await requestJson<Service[]>("/services");
  } catch {
    return [];
  }
}

export async function getServiceBySlug(moduleSlug: string, slug: string) {
  try {
    return await requestJson<Service>(`/services/${moduleSlug}/${slug}`);
  } catch {
    return undefined;
  }
}

export async function createService(input: ServiceInput) {
  const existing = await getAllServices();
  const preview = normalizeInput(input, existing);
  const matched = existing.find((item) => item.module === preview.module && item.slug === preview.slug);

  if (matched) {
    return updateService(matched.id, input);
  }

  const payload = normalizeInput(input, existing);
  return requestJson<Service>("/services", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateService(serviceId: string, input: ServiceInput) {
  const existing = await getAllServices();
  const target = existing.find((item) => item.id === serviceId);
  if (!target) return undefined;
  const next = normalizeInput(input, existing, serviceId);
  return requestJson<Service>(`/services/${serviceId}`, {
    method: "PUT",
    body: JSON.stringify(next),
  });
}

export async function deleteService(serviceId: string) {
  await fetch(`${API_BASE_URL}/services/${serviceId}`, { method: "DELETE" });
}

export async function seedServices(replace = false) {
  const url = `${API_BASE_URL}/admin/seed-services${replace ? "?replace=true" : ""}`;
  const response = await fetch(url, { method: "POST" });
  if (!response.ok) {
    throw new Error(`Seed failed with status ${response.status}`);
  }
}

export function buildNavServicesMenu(services: Service[]): NavMenuModule[] {
  const moduleMap = new Map<string, { title: string; categories: Map<string, { name: string; href: string }[]> }>();

  for (const service of services) {
    if (!moduleMap.has(service.module)) {
      moduleMap.set(service.module, {
        title: service.moduleTitle || toTitleCase(service.module),
        categories: new Map(),
      });
    }
    const moduleEntry = moduleMap.get(service.module)!;
    const sectionName = service.categoryLabel || "General";
    if (!moduleEntry.categories.has(sectionName)) {
      moduleEntry.categories.set(sectionName, []);
    }
    moduleEntry.categories.get(sectionName)!.push({
      name: service.title,
      href: `/services/${service.module}/${service.slug}`,
    });
  }

  return Array.from(moduleMap.values()).map((moduleEntry) => ({
    title: moduleEntry.title,
    sections: Array.from(moduleEntry.categories.entries()).map(([sectionTitle, items]) => ({
      title: sectionTitle === "General" ? undefined : sectionTitle,
      items: [...items].sort((a, b) => a.name.localeCompare(b.name)),
    })),
  }));
}

export function getModuleOptions(services: Service[]) {
  const map = new Map<string, string>();
  for (const moduleEntry of menuSeed) {
    map.set(slugify(moduleEntry.title), moduleEntry.title);
  }
  for (const service of services) {
    map.set(service.module, service.moduleTitle || toTitleCase(service.module));
  }
  return Array.from(map.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

