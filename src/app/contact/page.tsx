import Form from "./Form";
import styles from "./Contact.module.scss";
import { getServices } from "@/lib/content";

type RouteProps = {
  // In Next.js 15 server components, searchParams is async
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata = {
  title: "Request a Quote | Bayonetics Engineering",
  description:
    "Send your RFQ with drawings/photos. We’ll get right back to you.",
};

export default async function ContactPage({ searchParams }: RouteProps) {
  const services = await getServices();
  const sp = await searchParams; // <-- await it

  const selectedSlug =
    typeof sp?.service === "string" ? (sp.service as string) : undefined;

  return (
    <div className="container section">
      <div className={styles.wrap}>
        <header className={styles.head}>
          <h1 className={styles.title}>Request a Quote</h1>
          <p className={styles.lede}>
            Tell us about your job and we’ll get right back to you.
          </p>
        </header>

        {selectedSlug ? (
          <div className={styles.banner} role="status" aria-live="polite">
            <strong>Selected service:</strong> {selectedSlug.replace(/-/g, " ")}
          </div>
        ) : null}

        <Form services={services} selectedSlug={selectedSlug} />
      </div>
    </div>
  );
}
