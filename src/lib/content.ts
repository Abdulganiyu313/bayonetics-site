import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

const ROOT = process.cwd();
const SERVICES_DIR = path.join(ROOT, "src", "content", "services");

export async function getServices(): Promise<Service[]> {
  const files = await fs.readdir(SERVICES_DIR);
  const ymlFiles = files.filter((f) => f.endsWith(".yml"));
  const items = await Promise.all(
    ymlFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(SERVICES_DIR, file), "utf8");
      const data = YAML.parse(raw);
      return data as Service;
    })
  );
  // sort by title for stable output
  return items.sort((a, b) => a.title.localeCompare(b.title));
}
