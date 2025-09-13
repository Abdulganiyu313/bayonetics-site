import { Flame, Wrench, Cog, Package } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const map: Record<string, Icon> = {
  "precision-machining": Cog,
  "welding-fabrication": Flame,
  "maintenance-repair": Wrench,
  "custom-parts": Package,
};

export function iconFor(slug: string): Icon {
  return map[slug] ?? Cog;
}
