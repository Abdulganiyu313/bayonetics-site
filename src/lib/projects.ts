import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export type Project = {
  slug: string;
  title: string;
  client?: string;
  location?: string;
  date?: string;
  summary: string;
  services?: string[];
  outcomes?: string[];
  hero?: string;
  images?: string[];
  body?: string;
};

const ROOT = process.cwd();
const DIR = path.join(ROOT, "src", "content", "projects");

export async function getAllProjects(): Promise<Project[]> {
  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".yml"));
  const items = await Promise.all(
    files.map(async (f) => {
      const raw = await fs.readFile(path.join(DIR, f), "utf8");
      const data = YAML.parse(raw) as Project;
      return data;
    })
  );
  // newest first if date exists
  return items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const raw = await fs.readFile(path.join(DIR, `${slug}.yml`), "utf8");
    return YAML.parse(raw) as Project;
  } catch {
    return null;
  }
}
