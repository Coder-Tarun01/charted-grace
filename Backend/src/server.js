import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { menuSeed } from "./menuSeed.js";

dotenv.config();

const app = express();
app.use(cors());
// Base64 hero images in JSON exceed the default ~100kb body limit
const jsonLimit = process.env.JSON_BODY_LIMIT || "50mb";
app.use(express.json({ limit: jsonLimit }));
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

if (process.env.allow_origin) {
  app.use(
    cors({
      origin: process.env.allow_origin,
    }),
  );
}

function apiLog(method, path, detail = "") {
  const ts = new Date().toISOString();
  const suffix = detail ? ` | ${detail}` : "";
  console.log(`[api ${ts}] ${method} ${path}${suffix}`);
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureServicesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      module TEXT NOT NULL,
      module_title TEXT NOT NULL,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      introduction TEXT NOT NULL,
      overview TEXT NOT NULL,
      features TEXT[] NOT NULL DEFAULT '{}',
      benefits TEXT[] NOT NULL DEFAULT '{}',
      process TEXT[] NOT NULL DEFAULT '{}',
      cta_headline TEXT NOT NULL,
      cta_subtext TEXT NOT NULL,
      cta_button_label TEXT NOT NULL,
      hero_banner_image TEXT NOT NULL,
      hero_right_image TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS services_module_slug_uniq
    ON services (module, slug);
  `);
}

function rowToService(row) {
  return {
    id: row.id,
    module: row.module,
    moduleTitle: row.module_title,
    category: row.category,
    categoryLabel: row.category_label,
    slug: row.slug,
    title: row.title,
    introduction: row.introduction,
    overview: row.overview,
    features: row.features || [],
    benefits: row.benefits || [],
    process: row.process || [],
    ctaHeadline: row.cta_headline,
    ctaSubtext: row.cta_subtext,
    ctaButtonLabel: row.cta_button_label,
    heroBannerImage: row.hero_banner_image,
    heroRightImage: row.hero_right_image,
  };
}

function ensureUniqueSlug(services, moduleSlug, baseSlug, ignoreId) {
  const safeBase = baseSlug || "service";
  let candidate = safeBase;
  let idx = 2;
  while (services.some((s) => s.module === moduleSlug && s.slug === candidate && s.id !== ignoreId)) {
    candidate = `${safeBase}-${idx++}`;
  }
  return candidate;
}

const COMING_SOON_INTRO = "Coming soon.";
const COMING_SOON_OVERVIEW =
  "We're preparing detailed content for this service. Please check back shortly or contact us for assistance.";

function normalizePayload(input, services, ignoreId) {
  const module = slugify(input.module) || "general";
  const title = (input.title || "").trim();
  const categoryLabel = (input.categoryLabel || "General").trim() || "General";
  const category = slugify(input.category || categoryLabel) || "general";
  const slug = ensureUniqueSlug(services, module, slugify(input.slug || title), ignoreId);

  return {
    id: ignoreId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    module,
    moduleTitle: (input.moduleTitle || module).trim(),
    category,
    categoryLabel,
    slug,
    title,
    introduction: (input.introduction || "").trim(),
    overview: (input.overview || "").trim(),
    features: Array.isArray(input.features) ? input.features.filter(Boolean) : [],
    benefits: Array.isArray(input.benefits) ? input.benefits.filter(Boolean) : [],
    process: Array.isArray(input.process) ? input.process.filter(Boolean) : [],
    ctaHeadline: "Ready to get started?",
    ctaSubtext: "Share your requirement and our team will reach out with next steps.",
    ctaButtonLabel: "Get free consultation",
    heroBannerImage: (input.heroBannerImage || "/images/hero-ca-3.svg").trim(),
    heroRightImage: (input.heroRightImage || "/images/hero-ca.svg").trim(),
  };
}

/** One row per menu item: default "Coming soon" until Admin publishes real content. */
function buildComingSoonPlaceholders() {
  const rows = [];
  for (const moduleEntry of menuSeed) {
    const module = slugify(moduleEntry.title);
    for (const section of moduleEntry.sections) {
      const categoryLabel = section.title || "General";
      const category = slugify(categoryLabel) || "general";
      for (const itemTitle of section.items) {
        const itemSlug = slugify(itemTitle);
        const stableId = `${module}__${itemSlug}`;
        const row = normalizePayload(
          {
            title: itemTitle,
            module,
            moduleTitle: moduleEntry.title,
            category,
            categoryLabel,
            slug: itemSlug,
            introduction: COMING_SOON_INTRO,
            overview: COMING_SOON_OVERVIEW,
            features: ["Coming soon"],
            benefits: [],
            process: [],
            heroBannerImage: "/images/hero-ca-3.svg",
            heroRightImage: "/images/hero-ca.svg",
          },
          rows,
          stableId,
        );
        rows.push(row);
      }
    }
  }
  return rows;
}

/**
 * If this route matches the static menu, return the same placeholder row used by bulk seed.
 * Used so the first visit creates "Coming soon" without running /admin/seed-services first.
 */
function findComingSoonPlaceholderForRoute(moduleSlug, itemSlug) {
  for (const moduleEntry of menuSeed) {
    if (slugify(moduleEntry.title) !== moduleSlug) continue;
    for (const section of moduleEntry.sections) {
      const categoryLabel = section.title || "General";
      const category = slugify(categoryLabel) || "general";
      for (const itemTitle of section.items) {
        if (slugify(itemTitle) !== itemSlug) continue;
        const stableId = `${moduleSlug}__${itemSlug}`;
        return normalizePayload(
          {
            title: itemTitle,
            module: moduleSlug,
            moduleTitle: moduleEntry.title,
            category,
            categoryLabel,
            slug: itemSlug,
            introduction: COMING_SOON_INTRO,
            overview: COMING_SOON_OVERVIEW,
            features: ["Coming soon"],
            benefits: [],
            process: [],
            heroBannerImage: "/images/hero-ca-3.svg",
            heroRightImage: "/images/hero-ca.svg",
          },
          [],
          stableId,
        );
      }
    }
  }
  return null;
}

async function upsertService(service) {
  await pool.query(
    `
      INSERT INTO services (
        id, module, module_title, category, category_label, slug, title,
        introduction, overview, features, benefits, process,
        cta_headline, cta_subtext, cta_button_label, hero_banner_image, hero_right_image
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
      )
      ON CONFLICT (module, slug)
      DO UPDATE SET
        module_title = EXCLUDED.module_title,
        category = EXCLUDED.category,
        category_label = EXCLUDED.category_label,
        title = EXCLUDED.title,
        introduction = EXCLUDED.introduction,
        overview = EXCLUDED.overview,
        features = EXCLUDED.features,
        benefits = EXCLUDED.benefits,
        process = EXCLUDED.process,
        cta_headline = EXCLUDED.cta_headline,
        cta_subtext = EXCLUDED.cta_subtext,
        cta_button_label = EXCLUDED.cta_button_label,
        hero_banner_image = EXCLUDED.hero_banner_image,
        hero_right_image = EXCLUDED.hero_right_image,
        updated_at = NOW()
    `,
    [
      service.id,
      service.module,
      service.moduleTitle,
      service.category,
      service.categoryLabel,
      service.slug,
      service.title,
      service.introduction,
      service.overview,
      service.features,
      service.benefits,
      service.process,
      service.ctaHeadline,
      service.ctaSubtext,
      service.ctaButtonLabel,
      service.heroBannerImage,
      service.heroRightImage,
    ],
  );
}

/** Only inserts if (module, slug) is new — does not overwrite pages already edited in Admin. */
async function insertPlaceholderIfMissing(service) {
  await pool.query(
    `
      INSERT INTO services (
        id, module, module_title, category, category_label, slug, title,
        introduction, overview, features, benefits, process,
        cta_headline, cta_subtext, cta_button_label, hero_banner_image, hero_right_image
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      ON CONFLICT (module, slug) DO NOTHING
    `,
    [
      service.id,
      service.module,
      service.moduleTitle,
      service.category,
      service.categoryLabel,
      service.slug,
      service.title,
      service.introduction,
      service.overview,
      service.features,
      service.benefits,
      service.process,
      service.ctaHeadline,
      service.ctaSubtext,
      service.ctaButtonLabel,
      service.heroBannerImage,
      service.heroRightImage,
    ],
  );
}

app.post("/admin/clear-services", async (_req, res) => {
  apiLog("POST", "/admin/clear-services", "truncate services table");
  try {
    await pool.query(`DELETE FROM services`);
    apiLog("POST", "/admin/clear-services", "→ 200");
    return res.json({ ok: true, message: "All services removed." });
  } catch (err) {
    console.error("[api] clear-services failed:", err);
    return res.status(500).json({ message: "Failed to clear services" });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/services", async (_req, res) => {
  apiLog("GET", "/services", "list all");
  try {
    const result = await pool.query(`SELECT * FROM services ORDER BY module_title ASC, title ASC`);
    const rows = result.rows.map(rowToService);
    apiLog("GET", "/services", `→ 200, ${rows.length} services`);
    res.json(rows);
  } catch (err) {
    console.error("[api] GET /services failed:", err);
    res.status(500).json({ message: "Failed to load services" });
  }
});

app.get("/services/:module/:slug", async (req, res) => {
  const { module, slug } = req.params;
  apiLog("GET", `/services/:module/:slug`, `module=${module} slug=${slug}`);
  try {
    const result = await pool.query(`SELECT * FROM services WHERE module = $1 AND slug = $2 LIMIT 1`, [
      module,
      slug,
    ]);
    if (result.rows.length > 0) {
      apiLog("GET", `/services/${module}/${slug}`, "→ 200 OK (existing row)");
      return res.json(rowToService(result.rows[0]));
    }

    const placeholder = findComingSoonPlaceholderForRoute(module, slug);
    if (!placeholder) {
      apiLog("GET", `/services/${module}/${slug}`, "→ 404 unknown route (not in menu seed)");
      return res.status(404).json({ message: "Service not found" });
    }

    await insertPlaceholderIfMissing(placeholder);
    const afterInsert = await pool.query(`SELECT * FROM services WHERE module = $1 AND slug = $2 LIMIT 1`, [
      module,
      slug,
    ]);
    if (afterInsert.rows.length === 0) {
      console.error(`[api] Lazy placeholder insert failed for ${module}/${slug}`);
      return res.status(500).json({ message: "Failed to create placeholder" });
    }
    apiLog("GET", `/services/${module}/${slug}`, "→ 200 OK (lazy Coming soon placeholder)");
    return res.json(rowToService(afterInsert.rows[0]));
  } catch (err) {
    console.error(`[api] GET /services/${module}/${slug} failed:`, err);
    return res.status(500).json({ message: "Failed to load service" });
  }
});

app.post("/services", async (req, res) => {
  apiLog("POST", "/services", "create / upsert");
  const existingResult = await pool.query(`SELECT * FROM services`);
  const services = existingResult.rows.map(rowToService);
  const next = normalizePayload(req.body, services);

  await upsertService(next);

  apiLog("POST", "/services", `→ 201 id=${next.id} ${next.module}/${next.slug}`);
  res.status(201).json(next);
});

app.put("/services/:id", async (req, res) => {
  apiLog("PUT", `/services/${req.params.id}`, "update");
  const existingResult = await pool.query(`SELECT * FROM services`);
  const services = existingResult.rows.map(rowToService);
  const existing = services.find((s) => s.id === req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Service not found" });
  }

  const next = normalizePayload(req.body, services, existing.id);
  await pool.query(
    `
      UPDATE services
      SET
        module = $2,
        module_title = $3,
        category = $4,
        category_label = $5,
        slug = $6,
        title = $7,
        introduction = $8,
        overview = $9,
        features = $10,
        benefits = $11,
        process = $12,
        cta_headline = $13,
        cta_subtext = $14,
        cta_button_label = $15,
        hero_banner_image = $16,
        hero_right_image = $17,
        updated_at = NOW()
      WHERE id = $1
    `,
    [
      existing.id,
      next.module,
      next.moduleTitle,
      next.category,
      next.categoryLabel,
      next.slug,
      next.title,
      next.introduction,
      next.overview,
      next.features,
      next.benefits,
      next.process,
      next.ctaHeadline,
      next.ctaSubtext,
      next.ctaButtonLabel,
      next.heroBannerImage,
      next.heroRightImage,
    ],
  );
  apiLog("PUT", `/services/${req.params.id}`, `→ 200 ${next.module}/${next.slug}`);
  return res.json(next);
});

app.delete("/services/:id", async (req, res) => {
  apiLog("DELETE", `/services/${req.params.id}`);
  await pool.query(`DELETE FROM services WHERE id = $1`, [req.params.id]);
  return res.status(204).send();
});

app.post("/admin/seed-services", async (req, res) => {
  const replace = req.query.replace === "true";
  apiLog("POST", "/admin/seed-services", replace ? "replace=true (full reset)" : "fill-missing only");
  try {
    if (replace) {
      await pool.query(`DELETE FROM services`);
    }
    const placeholderRows = buildComingSoonPlaceholders();
    for (const row of placeholderRows) {
      if (replace) {
        await upsertService(row);
      } else {
        await insertPlaceholderIfMissing(row);
      }
    }
    apiLog(
      "POST",
      "/admin/seed-services",
      `→ ${replace ? "reset" : "fill-missing"} totalPlaceholders=${placeholderRows.length}`,
    );
    return res.json({
      ok: true,
      placeholders: placeholderRows.length,
      replace,
    });
  } catch (err) {
    console.error("[api] seed-services failed:", err);
    return res.status(500).json({ message: "Seed failed" });
  }
});

// Friendly error response for oversized payloads (e.g. large base64 images)
app.use((err, _req, res, next) => {
  if (err?.type === "entity.too.large" || err?.status === 413) {
    return res.status(413).json({
      message: "Uploaded images are too large. Please use smaller/compressed images.",
    });
  }
  return next(err);
});

const PORT = process.env.PORT || 4000;
ensureServicesTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start backend:", error);
    process.exit(1);
  });
