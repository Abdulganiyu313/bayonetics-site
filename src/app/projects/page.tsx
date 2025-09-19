import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.scss";
import { getAllProjects } from "@/lib/projects";

export const metadata = { title: "Projects – Bayonetics Engineering" };

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const imgOrFallback = (src?: string) =>
    src && src.startsWith("/") ? src : "/images/placeholders/project.jpg";

  return (
    <div className="container section">
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.sub}>
          Proof of work from the shop floor and on-site precision machining,
          fabrication, and dependable maintenance. Explore case studies to see
          our approach, outcomes, and turnaround.
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
                src={imgOrFallback(p.hero)}
                alt={p.title}
                fill
                sizes="(max-width: 900px) 100vw, 320px"
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
