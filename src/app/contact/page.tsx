import { getServices } from "@/lib/content";
import ContactForm from "./Form";
import styles from "./Contact.module.scss";

export const metadata = { title: "Request a Quote – Bayonetics Engineering" };

const EMAIL = "hello@bayonetics.ng"; // TODO: your email
const WHATSAPP = "2348012345678"; // TODO: your WhatsApp without +

export default async function ContactPage() {
  const services = (await getServices()).map((s) => ({
    slug: s.slug,
    title: s.title,
  }));

  return (
    <div className="container section">
      <h1>Request a Quote</h1>
      <p>
        Attach drawings or a sample part reference if available. We’ll respond
        quickly with a clear quote and lead time.
      </p>
      <ContactForm services={services} email={EMAIL} whatsapp={WHATSAPP} />
    </div>
  );
}
