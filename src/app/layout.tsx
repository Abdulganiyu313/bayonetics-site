import "@/styles/globals.scss";
import type { Metadata } from "next";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Bayonetics Engineering – Precision Machining & Fabrication",
  description:
    "Custom parts, fabrication, and maintenance services in Ogun, Nigeria.",
};

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
      </body>
    </html>
  );
}
