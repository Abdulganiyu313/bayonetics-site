import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  content?: string;
  materials?: string[];
};

const ROOT = process.cwd();
const SERVICES_DIR = path.join(ROOT, "src", "content", "services");

function toArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === "string")
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function normalizeService(raw: any): Service {
  const materialsRaw = raw.materials ?? raw.Materials;
  return {
    slug: String(raw.slug ?? "").trim(),
    title: String(raw.title ?? "").trim(),
    summary: String(raw.summary ?? "").trim(),
    content: typeof raw.content === "string" ? raw.content : undefined,
    bullets: toArray(raw.bullets),
    materials: toArray(materialsRaw),
  };
}

export async function getServices(): Promise<Service[]> {
  const files = await fs.readdir(SERVICES_DIR);
  const ymlFiles = files.filter((f) => f.endsWith(".yml"));
  const items = await Promise.all(
    ymlFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(SERVICES_DIR, file), "utf8");
      const data = YAML.parse(raw);
      return normalizeService(data);
    })
  );
  return items.sort((a, b) => a.title.localeCompare(b.title));
}
