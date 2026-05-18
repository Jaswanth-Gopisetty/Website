import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RegionProvider } from "@/components/RegionContext";

export const metadata: Metadata = {
  title: "Aurexa Technologies — Enterprise Digital Platforms for Regulated Industries",
  description:
    "Aurexa delivers enterprise digital platforms and managed services for regulated industries. Integrated quality, compliance, and operational control. GxP, FDA 21 CFR Part 11, ISO, GDPR, HIPAA ready.",
  keywords: ["eQMS", "QMS", "21 CFR Part 11", "GxP", "Aurexa", "Compliance Management", "Quality Management", "Regulated Industries"],
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
