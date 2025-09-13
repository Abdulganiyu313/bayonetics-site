import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.scss";
import { getAllProjects } from "@/lib/projects";

export const metadata = { title: "Projects – Bayonetics Engineering" };

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="container section">
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.sub}>
          Recent work and case studies. Swap images with your own when ready.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={styles.card}
          >
            <div className={styles.thumb}>
              <Image
                src={
                  p.hero ||
                  (p.images?.[0] ??
                    "https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1600&auto=format&fit=crop")
                }
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.h3}>{p.title}</h3>
              <div className={styles.meta}>
                {(p.client || p.location) && (
                  <span>
                    {[p.client, p.location].filter(Boolean).join(" • ")}
                  </span>
                )}
              </div>
              <span className={styles.link}>View case study →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
