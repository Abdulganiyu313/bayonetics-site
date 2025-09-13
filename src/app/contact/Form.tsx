"use client";
import { useMemo, useState } from "react";
import styles from "./Contact.module.scss";

type Props = {
  services: { slug: string; title: string }[];
  email: string;
  whatsapp: string;
};

export default function ContactForm({ services, email, whatsapp }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [service, setService] = useState(services[0]?.slug ?? "");
  const [message, setMessage] = useState("I would like a quote.");

  const subject = useMemo(
    () => `Quote request – ${service || "general"}`,
    [service]
  );

  function composeBody() {
    return [
      `Name: ${name}`,
      `Email: ${mail}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      "",
      message,
    ].join("\n");
  }

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(composeBody());
    const subj = encodeURIComponent(subject);
    window.location.href = `mailto:${email}?subject=${subj}&body=${body}`;
  }

  function submitWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(`*${subject}*\n\n${composeBody()}`);
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
  }

  const disabled = !name.trim() || (!mail.trim() && !phone.trim());

  return (
    <form className={styles.form} onSubmit={submitEmail}>
      <div className={styles.row}>
        <label>
          Full name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+234…"
          />
        </label>
      </div>
      <div className={styles.row}>
        <label>
          Email
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="you@company.com"
          />
        </label>
        <label>
          Service
          <select value={service} onChange={(e) => setService(e.target.value)}>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <div className={styles.actions}>
        <button className={styles.primary} type="submit" disabled={disabled}>
          Send via Email
        </button>
        <button
          className={styles.ghost}
          onClick={submitWhatsApp}
          disabled={disabled}
          type="button"
        >
          Send via WhatsApp
        </button>
      </div>
      <p className={styles.help}>
        We’ll reply quickly with a clear quote and lead time.
      </p>
    </form>
  );
}
