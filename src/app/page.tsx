import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TrustMarkers from "@/components/sections/TrustMarkers";
import CTA from "@/components/sections/CTA";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import MapEmbed from "@/components/sections/MapEmbed";

export const metadata = {
  title: "Bayonetics Engineering",
  description:
    "Precision machining, fabrication, and dependable maintenance for industry in Ogun and across Nigeria.",
  alternates: { canonical: "/" },
};
const BAYONETICS = { lat: 6.87, lng: 3.25 };

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <MapEmbed
        title="Workshop Location"
        coords={BAYONETICS}
        label="Bayonetics Engineering, Kajola Junction"
        zoom={16}
        compact
      />
      <ServicesOverview />
      <TrustMarkers />
      <CTA />
    </>
  );
}
