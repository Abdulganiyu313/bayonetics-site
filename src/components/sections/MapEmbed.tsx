import styles from "./MapEmbed.module.scss";
import Link from "next/link";

type Coords = { lat: number; lng: number };

type Props = {
  title?: string;
  /** If you pass coords, a red marker is shown at that exact point. */
  coords?: Coords;
  /** Optional label to show next to the marker (in Google’s UI). */
  label?: string;
  /** If you don’t know coords yet, you can still pass a text query. */
  query?: string;
  /** 12–18 is typical; 16 is a good default for streets. */
  zoom?: number;
  /** Smaller centered layout */
  compact?: boolean;
};

export default function MapEmbed({
  title = "Find us",
  coords,
  label = "Bayonetics Engineering",
  query,
  zoom = 16,
  compact = false,
}: Props) {
  // Build an embed URL that shows the red marker when coords are present.
  // Trick: use "q=lat,lng (Label)&output=embed" — this renders the standard pin.
  const q = coords
    ? `${coords.lat},${coords.lng} (${label})`
    : (query ?? label);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&hl=en&z=${zoom}&output=embed`;
  const directions = coords
    ? `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

  return (
    <section className="section" aria-labelledby="map-title">
      <div className="container">
        <div className={`${styles.wrap} ${compact ? styles.compact : ""}`}>
          <div className={styles.head}>
            <h2 id="map-title" className={styles.title}>
              {title}
            </h2>
            {coords ? (
              <p className={styles.sub}>{label}</p>
            ) : query ? (
              <p className={styles.sub}>{query}</p>
            ) : null}
          </div>

          <div className={styles.frame}>
            <iframe
              title="Bayonetics Engineering – map"
              src={src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Map"
            />
          </div>

          <div className={styles.actions}>
            <Link
              href={directions}
              target="_blank"
              rel="noopener"
              className={styles.cta}
            >
              Get Directions on Google Maps
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
