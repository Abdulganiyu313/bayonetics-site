import { getAllProjects, getProject } from "@/lib/projects";
import styles from "./Project.module.scss";
import Gallery from "@/components/projects/Gallery";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const p = await getProject(params.slug);
  return {
    title: p ? `${p.title} – Projects` : "Project – Bayonetics Engineering",
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const p = await getProject(params.slug);
  if (!p) return <div className="container section">Project not found.</div>;

  return (
    <div className="container section">
      <header className={styles.header}>
        <h1 className={styles.title}>{p.title}</h1>
        <div className={styles.meta}>
          {[p.client, p.location, p.date]?.filter(Boolean).join(" • ")}
        </div>
        {p.services && p.services.length > 0 && (
          <div className={styles.badges}>
            {p.services.map((s) => (
              <span key={s} className={styles.badge}>
                {s.replace("-", " ")}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className={styles.layout}>
        {p.images && p.images.length > 0 && (
          <div className={styles.sectionCard}>
            <h3 className={styles.h3}>Gallery</h3>
            <Gallery images={p.images} />
          </div>
        )}

        {p.outcomes && p.outcomes.length > 0 && (
          <div className={styles.sectionCard}>
            <h3 className={styles.h3}>Outcomes</h3>
            <ul className={styles.outcomes}>
              {p.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {p.body && (
          <div className={styles.sectionCard}>
            <h3 className={styles.h3}>Case Study</h3>
            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {p.body}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
