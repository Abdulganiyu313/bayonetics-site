import "@/styles/globals.scss";
import type { Metadata } from "next";
import Script from "next/script";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Bayonetics Engineering – Precision Machining & Fabrication",
  description:
    "Custom parts, fabrication, and maintenance services in Ogun, Nigeria.",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <NavBar />
          <main>{children}</main>
          <Footer />
        </div>

        {/* Organization JSON-LD */}
        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Bayonetics Engineering Limited",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
              telephone: ["+2348161660213", "+2348117788403"],
              email: "mail.bayonetics@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Kajola Junction, Opp. Apple & Pears Company, Along Muhammadu Buhari Expressway",
                addressLocality: "Ogun State",
                addressCountry: "NG",
              },
              sameAs: ["https://www.facebook.com/BayoneticsEngineering"],
            }),
          }}
        />
      </body>
    </html>
  );
}
