import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RegionProvider } from "@/components/RegionContext";

export const metadata: Metadata = {
  title: "Aurexa Technologies — Compliant eQMS & Quality Software",
  description:
    "Enterprise-grade eQMS, DMS, TMS and CMS for regulated industries. GxP and 21 CFR Part 11 ready. Featuring QC-Metric.",
  keywords: ["eQMS", "QMS", "QC-Metric", "21 CFR Part 11", "GxP", "Aurexa"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-brand-ink antialiased">
        <RegionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </RegionProvider>
      </body>
    </html>
  );
}
