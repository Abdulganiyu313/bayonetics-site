import Link from "next/link";

export default function Home() {
  return (
    <section className="section">
      <div
        className="container"
        style={{ display: "grid", gap: 24, alignItems: "center" }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Precision Machining & Fabrication
          </h1>
          <p style={{ opacity: 0.85, marginTop: 12 }}>
            Custom industrial parts, intricate welds, and dependable
            maintenance.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Link className="button" href="/contact">
              Request a Quote
            </Link>
            <Link
              className="button"
              href="/projects"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #1f2937",
              }}
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
