import { getServices } from "@/lib/content";
import NavBarClient from "./NavBarClient";

export type ServiceLink = { slug: string; title: string };

export default async function NavBar() {
  const all = await getServices();
  const services: ServiceLink[] = all
    .map((s) => ({ slug: s.slug, title: s.title }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return <NavBarClient services={services} />;
}
