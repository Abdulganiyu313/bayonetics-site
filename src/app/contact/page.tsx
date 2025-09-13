import { getServices } from "@/lib/content";
import ContactForm from "./Form";
import styles from "./Contact.module.scss";
import MapEmbed from "@/components/sections/MapEmbed";

const ADDRESS =
  "Kajola Junction, Beside Apple & Pears Company, Along Muhammadu Buhari Expressway, Ogun State, Nigeria";

const BAYONETICS = { lat: 6.87, lng: 3.25 };

export const metadata = { title: "Request a Quote – Bayonetics Engineering" };

const EMAIL = "mail.bayonetics@gmail.com";
const WHATSAPP = "2348161660213";

export default async function ContactPage() {
  const services = (await getServices()).map((s) => ({
    slug: s.slug,
    title: s.title,
  }));

  return (
    <div className="container section">
      <h1>Request a Quote</h1>
      <p>
        Kajola Junction, Beside Apple &amp; Pears Company, Along Muhammadu
        Buhari Expressway, Ogun State, Nigeria
        <br />
        Tel: +234 816 166 0213 · +234 811 778 8403 · Email: {EMAIL}
      </p>
      <ContactForm services={services} email={EMAIL} whatsapp={WHATSAPP} />
      <MapEmbed
        title="Visit Us"
        coords={BAYONETICS}
        label="Bayonetics Engineering, Kajola Junction"
        zoom={16}
        compact
      />
    </div>
  );
}
