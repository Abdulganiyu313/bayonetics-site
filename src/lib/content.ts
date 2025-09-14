import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

/* ========= Services ========= */
export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

/* ========= Projects ========= */
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
  notes?: string[];
  hero?: string;
  images?: string[]; // legacy
  gallery?: { src: string; caption?: string }[];
};

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "src", "content", "projects");
const PROJECT_EXTS = [".yml", ".yaml"];

export async function getProjects(): Promise<Project[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const ymlFiles = files.filter((f) =>
    PROJECT_EXTS.includes(path.extname(f).toLowerCase())
  );
  const items = await Promise.all(
    ymlFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
      const data = YAML.parse(raw) as Project;
      return data;
    })
  );
  return items.sort(
    (a, b) =>
      (b.date || "").localeCompare(a.date || "") ||
      a.title.localeCompare(b.title)
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  // 1) Try exact filename with .yml/.yaml
  for (const ext of PROJECT_EXTS) {
    try {
      const raw = await fs.readFile(
        path.join(PROJECTS_DIR, `${slug}${ext}`),
        "utf8"
      );
      return YAML.parse(raw) as Project;
    } catch {}
  }

  // 2) Fallback: scan all and match by the internal `slug:` field
  try {
    const files = await fs.readdir(PROJECTS_DIR);
    const ymlFiles = files.filter((f) =>
      PROJECT_EXTS.includes(path.extname(f).toLowerCase())
    );
    for (const file of ymlFiles) {
      const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
      const data = YAML.parse(raw) as Project;
      if (data?.slug === slug) return data;
    }
  } catch {}
  return null;
}
