import { slugify } from "@/lib/slug";
import { menuSeed } from "@/data/menuSeed";
import { DEFAULT_HERO_BANNER_IMAGE, DEFAULT_SECTION_IMAGE } from "@/config/serviceTemplateImages";
import { DEFAULT_SERVICE_TEMPLATE_ID } from "@/config/serviceTemplates";
import type { NavMenuItem, NavMenuModule, NavMenuSection, Service, ServiceInput } from "@/types/service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const SERVICES_CACHE_KEY = "charted-grace-services-v1";

export function getServicesApiBaseUrl() {
  return API_BASE_URL;
}

export type ServiceDetailResult =
  | { kind: "ok"; service: Service }
  | { kind: "not_found" }
  | { kind: "error"; message: string };

const DEFAULT_CTA = {
  ctaHeadline: "Ready to get started?",
  ctaSubtext: "Share your requirement and our team will reach out with next steps.",
  ctaButtonLabel: "Get free consultation",
} as const;

const DEFAULT_HERO_RIGHT_IMAGE = DEFAULT_SECTION_IMAGE;

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
    let errorMessage = `API request failed: ${response.status}`;
    try {
      const text = await response.text();
      if (text) {
        try {
          const parsed = JSON.parse(text) as { message?: string };
          if (parsed?.message) {
            errorMessage = parsed.message;
          }
        } catch {
          errorMessage = `${errorMessage} - ${text.slice(0, 180)}`;
        }
      }
    } catch {
      // keep default message
    }
    throw new Error(errorMessage);
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
    templateId: input.templateId ?? DEFAULT_SERVICE_TEMPLATE_ID,
    heroBannerImage: input.heroBannerImage?.trim() || DEFAULT_HERO_BANNER_IMAGE,
    heroRightImage: input.heroRightImage?.trim() || DEFAULT_HERO_RIGHT_IMAGE,
    overviewImage: input.overviewImage?.trim() || input.heroRightImage?.trim() || DEFAULT_SECTION_IMAGE,
    featuresImage: input.featuresImage?.trim() || input.heroBannerImage?.trim() || DEFAULT_HERO_BANNER_IMAGE,
    benefitsImage: input.benefitsImage?.trim() || input.heroRightImage?.trim() || DEFAULT_SECTION_IMAGE,
    ...DEFAULT_CTA,
  };
}

function readCachedServices(): Service[] {
  if (typeof sessionStorage === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(SERVICES_CACHE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Service[];
  } catch {
    return [];
  }
}

/** Sync read for first paint — avoids empty nav / 404 flash while /services is loading. */
export function getCachedServicesForHydration(): Service[] {
  return readCachedServices();
}

function writeCachedServices(services: Service[]) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(services));
  } catch {
    /* quota / private mode */
  }
}

export async function getAllServices() {
  try {
    const data = await requestJson<Service[]>("/services");
    writeCachedServices(data);
    return data;
  } catch {
    const cached = readCachedServices();
    return cached.length > 0 ? cached : [];
  }
}

export async function fetchServiceDetail(moduleSlug: string, slug: string): Promise<ServiceDetailResult> {
  const path = `/services/${encodeURIComponent(moduleSlug)}/${encodeURIComponent(slug)}`;
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 404) return { kind: "not_found" };
    if (!response.ok) {
      const text = await response.text();
      return {
        kind: "error",
        message: `HTTP ${response.status}${text ? `: ${text.slice(0, 160)}` : ""}`,
      };
    }
    const service = (await response.json()) as Service;
    return { kind: "ok", service };
  } catch (e) {
    return {
      kind: "error",
      message: e instanceof Error ? e.message : "Network error",
    };
  }
}

export async function getServiceBySlug(moduleSlug: string, slug: string) {
  const result = await fetchServiceDetail(moduleSlug, slug);
  if (result.kind === "ok") return result.service;
  return undefined;
}

export async function createService(input: ServiceInput) {
  const existing = await getAllServices();
  const targetModule = slugify(input.module) || "general";
  const targetTitle = input.title.trim();
  const targetSlug = slugify(input.slug?.trim() || targetTitle);
  const matched = existing.find((item) => item.module === targetModule && item.slug === targetSlug);

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

export async function clearAllServices() {
  const response = await fetch(`${API_BASE_URL}/admin/clear-services`, { method: "POST" });
  if (!response.ok) {
    throw new Error(`Clear failed with status ${response.status}`);
  }
}

/** Static menu when DB has no rows or API is unreachable — same URLs as seeded services. */
export function buildNavMenuFromSeed(): NavMenuModule[] {
  return menuSeed.map((moduleEntry) => {
    const moduleSlug = slugify(moduleEntry.title);
    return {
      title: moduleEntry.title,
      sections: moduleEntry.sections.map((section) => ({
        title: section.title,
        items: section.items.map((name) => ({
          name,
          href: `/services/${moduleSlug}/${slugify(name)}`,
        })),
      })),
    };
  });
}

function sectionKey(title?: string) {
  return title ?? "__general__";
}

function orderItemsBySeed(seedNames: string[], items: NavMenuItem[]): NavMenuItem[] {
  const byName = new Map(items.map((i) => [i.name, i]));
  const ordered: NavMenuItem[] = [];
  const seen = new Set<string>();
  for (const name of seedNames) {
    const hit = byName.get(name);
    if (hit) {
      ordered.push(hit);
      seen.add(name);
    }
  }
  for (const i of items) {
    if (!seen.has(i.name)) ordered.push(i);
  }
  return ordered;
}

/** Match screenshot / menuSeed: module order, section order, item order within sections. */
export function applyMenuSeedOrdering(menu: NavMenuModule[]): NavMenuModule[] {
  const sortedModules = [...menu].sort((a, b) => {
    const ia = menuSeed.findIndex((m) => m.title === a.title || slugify(m.title) === slugify(a.title));
    const ib = menuSeed.findIndex((m) => m.title === b.title || slugify(m.title) === slugify(b.title));
    const ra = ia === -1 ? 1000 : ia;
    const rb = ib === -1 ? 1000 : ib;
    return ra - rb || a.title.localeCompare(b.title);
  });

  return sortedModules.map((mod) => {
    const seedMod = menuSeed.find((m) => m.title === mod.title || slugify(m.title) === slugify(mod.title));
    if (!seedMod) return mod;

    const dbBySection = new Map<string, NavMenuSection>();
    for (const sec of mod.sections) {
      dbBySection.set(sectionKey(sec.title), sec);
    }

    const outSections: NavMenuSection[] = [];
    for (const seedSec of seedMod.sections) {
      const key = sectionKey(seedSec.title);
      const dbSec = dbBySection.get(key);
      if (!dbSec) continue;
      outSections.push({
        ...dbSec,
        items: orderItemsBySeed(seedSec.items, dbSec.items),
      });
      dbBySection.delete(key);
    }
    for (const [, sec] of dbBySection) {
      outSections.push(sec);
    }
    return { ...mod, sections: outSections };
  });
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
      items,
    })),
  }));
}

/** Prefer DB-backed links; fall back to seed menu so the header never goes empty. */
export function buildEffectiveNavMenu(_services: Service[]): NavMenuModule[] {
  // Keep navbar structure stable and unchanged; page content still loads from DB by route.
  return applyMenuSeedOrdering(buildNavMenuFromSeed());
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

