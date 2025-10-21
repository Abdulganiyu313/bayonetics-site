import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

/* ================== Types ================== */
export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  hero?: string;
  alt?: string;
  content?: string;
  /** Optional tags used for client-side filtering */
  tags?: string[];
};

export type Project = {
  slug: string;
  title: string;
  headline?: string;
  client?: string;
  location?: string;
  date?: string;
  summary?: string;
  services?: string[];
  outcomes?: string[];
  hero?: string;
  // legacy:
  images?: string[];
  // preferred:
  gallery?: { src: string; caption?: string }[];
};

/* ================== Helpers ================== */

const root = process.cwd();

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.map((x) => String(x)) : [];
}
function asRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
}
function asGallery(v: unknown): { src: string; caption?: string }[] {
  if (!Array.isArray(v)) return [];
  const out: { src: string; caption?: string }[] = [];
  for (const item of v) {
    if (item && typeof item === "object") {
      const r = item as Record<string, unknown>;
      const src = asString(r.src);
      if (!src) continue;
      const caption = r.caption != null ? String(r.caption) : undefined;
      out.push({ src, caption });
    }
  }
  return out;
}

async function listYamlFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /\.(ya?ml)$/i.test(e.name))
    .map((e) => path.join(dir, e.name));
}

async function readYamlFile<T>(
  filePath: string,
  map: (raw: Record<string, unknown>) => T
): Promise<T> {
  const rawStr = await fs.readFile(filePath, "utf8");
  const parsed = YAML.parse(rawStr) as unknown;
  const rec = asRecord(parsed);
  return map(rec);
}

/* ================== Services ================== */

export async function getServices(): Promise<Service[]> {
  const dir = path.join(root, "src", "content", "services");
  const files = await listYamlFiles(dir);

  const items = await Promise.all(
    files.map((f) =>
      readYamlFile<Service>(f, (r) => ({
        slug: asString(r.slug),
        title: asString(r.title),
        summary: asString(r.summary),
        bullets: asStringArray(r.bullets),
        hero: asString(r.hero),
        alt: asString(r.alt),
        content: asString(r.content),
        tags: asStringArray(r.tags), // <-- NEW: optional tags from YAML
      }))
    )
  );

  return items
    .filter((s) => s.slug && s.title)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/* ================== Projects ================== */

export async function getProjects(): Promise<Project[]> {
  const dir = path.join(root, "src", "content", "projects");
  const files = await listYamlFiles(dir);

  const items = await Promise.all(
    files.map((f) =>
      readYamlFile<Project>(f, (r) => ({
        slug: asString(r.slug) || path.basename(f).replace(/\.(ya?ml)$/i, ""),
        title: asString(r.title),
        headline: asString(r.headline),
        client: asString(r.client),
        location: asString(r.location),
        date: asString(r.date),
        summary: asString(r.summary),
        services: asStringArray(r.services),
        outcomes: asStringArray(r.outcomes),
        hero: asString(r.hero),
        images: asStringArray(r.images),
        gallery: asGallery(r.gallery),
      }))
    )
  );

  // Newest first if date present
  return items
    .filter((p) => p.slug && p.title)
    .sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0;
      const db = b.date ? Date.parse(b.date) : 0;
      return db - da;
    });
}

export async function getProject(slug: string): Promise<Project | null> {
  const dir = path.join(root, "src", "content", "projects");
  const file = path.join(dir, `${slug}.yml`);
  try {
    const item = await readYamlFile<Project>(file, (r) => ({
      slug: asString(r.slug) || slug,
      title: asString(r.title),
      headline: asString(r.headline),
      client: asString(r.client),
      location: asString(r.location),
      date: asString(r.date),
      summary: asString(r.summary),
      services: asStringArray(r.services),
      outcomes: asStringArray(r.outcomes),
      hero: asString(r.hero),
      images: asStringArray(r.images),
      gallery: asGallery(r.gallery),
    }));
    return item;
  } catch {
    return null;
  }
}
