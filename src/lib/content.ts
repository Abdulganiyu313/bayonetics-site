"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { parse as parseYAML } from "yaml";

/* ========= Types ========= */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  content?: string;
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
  // legacy images list (still supported)
  images?: string[];
  // preferred gallery with captions
  gallery?: { src: string; caption?: string }[];
  // optional notes block
  notes?: string[];
  // optional markdown body (if you use it)
  body?: string;
};

/* ========= Paths ========= */

const ROOT = process.cwd();
const SERVICES_DIR = path.join(ROOT, "src", "content", "services");
const PROJECTS_DIR = path.join(ROOT, "src", "content", "projects");

/* ========= Helpers ========= */

const isYaml = (name: string) => /\.ya?ml$/i.test(name);

async function readYamlDir(
  dir: string
): Promise<Array<{ file: string; data: any }>> {
  try {
    const ents = await fs.readdir(dir, { withFileTypes: true });
    const files = ents
      .filter((e) => e.isFile() && isYaml(e.name))
      .map((e) => path.join(dir, e.name));
    const docs: Array<{ file: string; data: any }> = [];
    for (const file of files) {
      const raw = await fs.readFile(file, "utf8");
      const data = parseYAML(raw) ?? {};
      docs.push({ file, data });
    }
    return docs;
  } catch {
    return [];
  }
}

function filenameSlug(filePath: string) {
  const base = path.basename(filePath);
  return base.replace(/\.ya?ml$/i, "");
}

function normalizeService(input: any, file: string): Service {
  const slug =
    (typeof input.slug === "string" && input.slug) || filenameSlug(file);
  const title =
    (typeof input.title === "string" && input.title) || "Untitled Service";
  const summary = typeof input.summary === "string" ? input.summary : "";
  const bullets = Array.isArray(input.bullets) ? input.bullets.map(String) : [];
  const content = typeof input.content === "string" ? input.content : undefined;
  return { slug, title, summary, bullets, content };
}

function normalizeProject(input: any, file: string): Project {
  const slug =
    (typeof input.slug === "string" && input.slug) || filenameSlug(file);
  const title =
    (typeof input.title === "string" && input.title) || "Untitled Project";

  // Keep legacy images AND preferred gallery; synthesize gallery from images if needed
  const images: string[] | undefined = Array.isArray(input.images)
    ? input.images.map(String)
    : undefined;
  const gallery =
    Array.isArray(input.gallery) && input.gallery.length
      ? input.gallery.map((g: any) => ({
          src: String(g?.src ?? ""),
          caption: typeof g?.caption === "string" ? g.caption : undefined,
        }))
      : images
        ? images.map((src) => ({ src }))
        : undefined;

  const services =
    Array.isArray(input.services) && input.services.length
      ? input.services.map(String)
      : undefined;

  const outcomes =
    Array.isArray(input.outcomes) && input.outcomes.length
      ? input.outcomes.map(String)
      : undefined;

  const notes =
    Array.isArray(input.notes) && input.notes.length
      ? input.notes.map(String)
      : undefined;

  return {
    slug,
    title,
    headline: typeof input.headline === "string" ? input.headline : undefined,
    client: typeof input.client === "string" ? input.client : undefined,
    location: typeof input.location === "string" ? input.location : undefined,
    date: typeof input.date === "string" ? input.date : undefined,
    summary: typeof input.summary === "string" ? input.summary : undefined,
    services,
    outcomes,
    hero: typeof input.hero === "string" ? input.hero : undefined,
    images,
    gallery,
    notes,
    body: typeof input.body === "string" ? input.body : undefined,
  };
}

function sortProjectsByDateDesc(a: Project, b: Project) {
  // push undated items to the bottom
  const da = a.date ? Date.parse(a.date) : NaN;
  const db = b.date ? Date.parse(b.date) : NaN;
  if (isNaN(da) && isNaN(db)) return a.title.localeCompare(b.title);
  if (isNaN(da)) return 1;
  if (isNaN(db)) return -1;
  return db - da;
}

/* ========= Public API ========= */

export async function getServices(): Promise<Service[]> {
  const docs = await readYamlDir(SERVICES_DIR);
  const items = docs.map((d) => normalizeService(d.data, d.file));
  // Sort by title for stable UI anchors
  return items.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getProjects(): Promise<Project[]> {
  const docs = await readYamlDir(PROJECTS_DIR);
  const items = docs.map((d) => normalizeProject(d.data, d.file));
  return items.sort(sortProjectsByDateDesc);
}

export async function getProject(slug: string): Promise<Project | null> {
  const items = await getProjects();
  return items.find((p) => p.slug === slug) ?? null;
}
