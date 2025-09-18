"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Contact.module.scss";
import type { Service } from "@/lib/content";

type Props = {
  services: Service[];
  selectedSlug?: string;
};

function titleFor(services: Service[], slug: string | undefined) {
  if (!slug) return "";
  return (
    services.find((s) => s.slug === slug)?.title ?? slug.replace(/-/g, " ")
  );
}

export default function Form({ services, selectedSlug }: Props) {
  const router = useRouter();
  const [service, setService] = useState<string>(selectedSlug ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [sendCopy, setSendCopy] = useState<boolean>(true);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setService(selectedSlug ?? "");
  }, [selectedSlug]);

  const options = useMemo(
    () => [...services].sort((a, b) => a.title.localeCompare(b.title)),
    [services]
  );

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []);
    setFiles(list);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const fd = new FormData(formRef.current!);
      fd.set("service", service);
      fd.set("service_title", titleFor(services, service));
      if (sendCopy) fd.set("sendcopy", "on");
      else fd.delete("sendcopy");

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Failed to send");
      }

      setStatus("ok");
      // Optional: clear in case user navigates back
      formRef.current?.reset();
      setFiles([]);
      setService("");

      // Redirect to thank you page
      router.push("/contact/thank-you");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {status === "error" && (
        <div className={styles.alertError} role="alert">
          Couldn’t send your request: {errorMsg}
        </div>
      )}

      <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="company" className={styles.label}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldWide}>
            <label htmlFor="service" className={styles.label}>
              Service
            </label>
            <select
              id="service"
              name="service"
              className={styles.select}
              value={service}
              onChange={(e) => setService(e.target.value)}
              aria-describedby="service-help"
              required
            >
              <option value="" disabled>
                Select a service…
              </option>
              {options.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            <div id="service-help" className={styles.help}>
              Pre-selected when you click from a service page. You can change it
              here.
            </div>
            <input
              type="hidden"
              name="service_title"
              value={titleFor(services, service)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldWide}>
            <label htmlFor="details" className={styles.label}>
              Project details / specs
            </label>
            <textarea
              id="details"
              name="details"
              className={styles.textarea}
              rows={6}
              placeholder="Dimensions, tolerances, materials, finish, quantities, timelines…"
            />
          </div>
        </div>

        {/* Send me a copy */}
        <div className={styles.row}>
          <div className={styles.fieldWide}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={sendCopy}
                onChange={(e) => setSendCopy(e.target.checked)}
              />
              <span>Email me a copy of this request</span>
            </label>
          </div>
        </div>

        {/* Attachments */}
        <div className={styles.row}>
          <div className={styles.fieldWide}>
            <label htmlFor="attachments" className={styles.label}>
              Upload drawings / photos (optional)
            </label>
            <input
              id="attachments"
              name="attachments"
              className={styles.file}
              type="file"
              multiple
              onChange={onFileChange}
              accept="
                image/*,
                application/pdf,
                .dxf,.dwg,
                .step,.stp,.iges,.igs,
                .zip
              "
            />
            <div className={styles.help}>
              Accepted: images, PDF, CAD (DXF/DWG/STEP/IGES), ZIP. Up to 5
              files, 20&nbsp;MB total.
            </div>

            {files.length > 0 && (
              <ul className={styles.fileList} aria-live="polite">
                {files.map((f, i) => (
                  <li key={i} className={styles.fileItem}>
                    <span className={styles.fileName}>{f.name}</span>
                    <span className={styles.fileSize}>
                      {(f.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.submitRow}>
          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? "Sending…" : "Send Request"}
          </button>
        </div>
      </form>
    </>
  );
}
