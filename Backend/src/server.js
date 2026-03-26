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
      template_id TEXT NOT NULL DEFAULT 'classic',
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
      overview_image TEXT NOT NULL DEFAULT '/images/hero-ca.svg',
      features_image TEXT NOT NULL DEFAULT '/images/hero-ca-3.svg',
      benefits_image TEXT NOT NULL DEFAULT '/images/hero-ca.svg',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(
    `ALTER TABLE services ADD COLUMN IF NOT EXISTS overview_image TEXT NOT NULL DEFAULT '/images/hero-ca.svg'`,
  );
  await pool.query(
    `ALTER TABLE services ADD COLUMN IF NOT EXISTS features_image TEXT NOT NULL DEFAULT '/images/hero-ca-3.svg'`,
  );
  await pool.query(
    `ALTER TABLE services ADD COLUMN IF NOT EXISTS benefits_image TEXT NOT NULL DEFAULT '/images/hero-ca.svg'`,
  );

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS services_module_slug_uniq
    ON services (module, slug);
  `);

  await pool.query(`ALTER TABLE services ADD COLUMN IF NOT EXISTS template_id TEXT NOT NULL DEFAULT 'classic'`);
}

async function ensureBlogsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      featured_image TEXT NOT NULL DEFAULT '',
      short_description TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      tags TEXT[] NOT NULL DEFAULT '{}',
      category TEXT NOT NULL DEFAULT 'General',
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      keywords TEXT NOT NULL DEFAULT '',
      author TEXT NOT NULL DEFAULT 'Admin',
      publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
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
    templateId: row.template_id || "classic",
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
    overviewImage: row.overview_image,
    featuresImage: row.features_image,
    benefitsImage: row.benefits_image,
  };
}

function rowToBlog(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    featuredImage: row.featured_image,
    shortDescription: row.short_description,
    content: row.content,
    tags: row.tags || [],
    category: row.category,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    keywords: row.keywords,
    author: row.author,
    publishDate: row.publish_date,
    status: row.status,
    createdAt: row.created_at,
  };
}

async function getExistingBlogs() {
  const result = await pool.query(`SELECT * FROM blogs`);
  return result.rows.map(rowToBlog);
}

function ensureUniqueBlogSlug(blogs, baseSlug, ignoreId) {
  const safeBase = baseSlug || "blog-post";
  let candidate = safeBase;
  let idx = 2;
  while (blogs.some((b) => b.slug === candidate && b.id !== ignoreId)) {
    candidate = `${safeBase}-${idx++}`;
  }
  return candidate;
}

function normalizeBlogPayload(input, blogs, ignoreId) {
  const title = (input.title || "").trim();
  const baseSlug = slugify(input.slug || title || "blog-post");
  const slug = ensureUniqueBlogSlug(blogs, baseSlug, ignoreId);
  const featuredImage = (input.featuredImage || "").trim();
  const shortDescription = (input.shortDescription || "").trim();
  const content = (input.content || "").trim();
  const tags = Array.isArray(input.tags) ? input.tags.map((t) => String(t).trim()).filter(Boolean) : [];
  const category = (input.category || "General").trim() || "General";
  const metaTitle = (input.metaTitle || title).trim();
  const metaDescription = (input.metaDescription || shortDescription).trim();
  const keywords = (input.keywords || tags.join(", ")).trim();
  const author = (input.author || "Admin").trim() || "Admin";
  const publishDate = (input.publishDate || new Date().toISOString().slice(0, 10)).trim();
  const status = input.status === "published" ? "published" : "draft";

  return {
    id: ignoreId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    slug,
    featuredImage,
    shortDescription,
    content,
    tags,
    category,
    metaTitle,
    metaDescription,
    keywords,
    author,
    publishDate,
    status,
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
  const slug = slugify(input.slug || title) || "service";
  const existingBySlug = services.find((s) => s.module === module && s.slug === slug);

  return {
    id: ignoreId || existingBySlug?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    module,
    moduleTitle: (input.moduleTitle || module).trim(),
    category,
    categoryLabel,
    slug,
    title,
    templateId: (input.templateId || "classic").trim(),
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
    overviewImage: (input.overviewImage || input.heroRightImage || "/images/hero-ca.svg").trim(),
    featuresImage: (input.featuresImage || input.heroBannerImage || "/images/hero-ca-3.svg").trim(),
    benefitsImage: (input.benefitsImage || input.heroRightImage || "/images/hero-ca.svg").trim(),
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
        id, module, module_title, category, category_label, slug, title, template_id,
        introduction, overview, features, benefits, process,
        cta_headline, cta_subtext, cta_button_label, hero_banner_image, hero_right_image,
        overview_image, features_image, benefits_image
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21
      )
      ON CONFLICT (module, slug)
      DO UPDATE SET
        module_title = EXCLUDED.module_title,
        category = EXCLUDED.category,
        category_label = EXCLUDED.category_label,
        title = EXCLUDED.title,
        template_id = EXCLUDED.template_id,
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
        overview_image = EXCLUDED.overview_image,
        features_image = EXCLUDED.features_image,
        benefits_image = EXCLUDED.benefits_image,
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
      service.templateId,
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
      service.overviewImage,
      service.featuresImage,
      service.benefitsImage,
    ],
  );
}

/** Only inserts if (module, slug) is new — does not overwrite pages already edited in Admin. */
async function insertPlaceholderIfMissing(service) {
  await pool.query(
    `
      INSERT INTO services (
        id, module, module_title, category, category_label, slug, title, template_id,
        introduction, overview, features, benefits, process,
        cta_headline, cta_subtext, cta_button_label, hero_banner_image, hero_right_image,
        overview_image, features_image, benefits_image
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
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
      service.templateId,
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
      service.overviewImage,
      service.featuresImage,
      service.benefitsImage,
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
        template_id = $8,
        introduction = $9,
        overview = $10,
        features = $11,
        benefits = $12,
        process = $13,
        cta_headline = $14,
        cta_subtext = $15,
        cta_button_label = $16,
        hero_banner_image = $17,
        hero_right_image = $18,
        overview_image = $19,
        features_image = $20,
        benefits_image = $21,
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
      next.templateId,
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
      next.overviewImage,
      next.featuresImage,
      next.benefitsImage,
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

app.post("/blogs", async (req, res) => {
  apiLog("POST", "/blogs", "create blog");
  try {
    const existing = await getExistingBlogs();
    const next = normalizeBlogPayload(req.body, existing);
    await pool.query(
      `
        INSERT INTO blogs (
          id, title, slug, featured_image, short_description, content, tags, category,
          meta_title, meta_description, keywords, author, publish_date, status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      `,
      [
        next.id,
        next.title,
        next.slug,
        next.featuredImage,
        next.shortDescription,
        next.content,
        next.tags,
        next.category,
        next.metaTitle,
        next.metaDescription,
        next.keywords,
        next.author,
        next.publishDate,
        next.status,
      ],
    );
    apiLog("POST", "/blogs", `→ 201 ${next.slug}`);
    return res.status(201).json(next);
  } catch (err) {
    console.error("[api] POST /blogs failed:", err);
    return res.status(500).json({ message: "Failed to create blog" });
  }
});

app.get("/blogs", async (req, res) => {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(20, Math.max(1, Number(req.query.limit || 9)));
  const offset = (page - 1) * limit;
  const search = String(req.query.search || "").trim();
  const category = String(req.query.category || "").trim();
  const status = String(req.query.status || "").trim();
  apiLog("GET", "/blogs", `page=${page} limit=${limit} search=${search || "-"} category=${category || "-"}`);
  try {
    const conditions = [];
    const params = [];
    let idx = 1;
    if (search) {
      conditions.push(`(title ILIKE $${idx} OR short_description ILIKE $${idx})`);
      params.push(`%${search}%`);
      idx += 1;
    }
    if (category) {
      conditions.push(`category = $${idx}`);
      params.push(category);
      idx += 1;
    }
    if (status) {
      conditions.push(`status = $${idx}`);
      params.push(status);
      idx += 1;
    }
    const whereSql = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const totalResult = await pool.query(`SELECT COUNT(*)::int AS count FROM blogs ${whereSql}`, params);
    const total = totalResult.rows[0]?.count || 0;

    const listResult = await pool.query(
      `SELECT * FROM blogs ${whereSql} ORDER BY publish_date DESC, created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, limit, offset],
    );
    const rows = listResult.rows.map(rowToBlog);
    return res.json({ items: rows, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) {
    console.error("[api] GET /blogs failed:", err);
    return res.status(500).json({ message: "Failed to load blogs" });
  }
});

app.get("/blogs/:slug", async (req, res) => {
  const { slug } = req.params;
  apiLog("GET", "/blogs/:slug", slug);
  try {
    const result = await pool.query(`SELECT * FROM blogs WHERE slug = $1 LIMIT 1`, [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(rowToBlog(result.rows[0]));
  } catch (err) {
    console.error(`[api] GET /blogs/${slug} failed:`, err);
    return res.status(500).json({ message: "Failed to load blog" });
  }
});

app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  apiLog("PUT", "/blogs/:id", id);
  try {
    const existing = await getExistingBlogs();
    const found = existing.find((b) => b.id === id);
    if (!found) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const next = normalizeBlogPayload(req.body, existing, id);
    await pool.query(
      `
        UPDATE blogs
        SET
          title = $2,
          slug = $3,
          featured_image = $4,
          short_description = $5,
          content = $6,
          tags = $7,
          category = $8,
          meta_title = $9,
          meta_description = $10,
          keywords = $11,
          author = $12,
          publish_date = $13,
          status = $14,
          updated_at = NOW()
        WHERE id = $1
      `,
      [
        id,
        next.title,
        next.slug,
        next.featuredImage,
        next.shortDescription,
        next.content,
        next.tags,
        next.category,
        next.metaTitle,
        next.metaDescription,
        next.keywords,
        next.author,
        next.publishDate,
        next.status,
      ],
    );
    return res.json(next);
  } catch (err) {
    console.error(`[api] PUT /blogs/${id} failed:`, err);
    return res.status(500).json({ message: "Failed to update blog" });
  }
});

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  apiLog("DELETE", "/blogs/:id", id);
  try {
    await pool.query(`DELETE FROM blogs WHERE id = $1`, [id]);
    return res.status(204).send();
  } catch (err) {
    console.error(`[api] DELETE /blogs/${id} failed:`, err);
    return res.status(500).json({ message: "Failed to delete blog" });
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
Promise.all([ensureServicesTable(), ensureBlogsTable()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start backend:", error);
    process.exit(1);
  });
