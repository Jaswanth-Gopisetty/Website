# Aurexa Technologies — Website Source Code (Single-File MD)

> Complete, drop-in source code for the **Aurexa Technologies corporate website** featuring the **QC-Metric** product showcase. Stack: **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons**.
>
> This file is structured so each fenced code block represents a standalone file. Create the project, copy each block to the indicated file path, run `npm install` and `npm run dev`.

---

## 0. Project Bootstrap

```bash
# 1. Create the app
npx create-next-app@latest aurexa-website --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd aurexa-website

# 2. Install runtime dependencies
npm install framer-motion lucide-react clsx class-variance-authority

# 3. Run
npm run dev
```

---

## 1. `package.json`

```json
{
  "name": "aurexa-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.468.0",
    "clsx": "^2.1.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

## 2. `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette: thick blue + teal/sea-green + purple accent
        brand: {
          blue: "#0A2A66",
          blueDark: "#061A40",
          teal: "#14B8A6",
          tealDark: "#0F766E",
          accent: "#7C3AED",
          ink: "#0B1220",
          surface: "#F6F9FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(20,184,166,0.35)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: { floaty: "floaty 6s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
```

---

## 3. `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #ffffff;
  --fg: #0b1220;
}

html, body { background: var(--bg); color: var(--fg); }

.gradient-hero {
  background: radial-gradient(80% 60% at 50% 0%, rgba(20,184,166,0.18), transparent 60%),
              radial-gradient(60% 40% at 100% 0%, rgba(124,58,237,0.18), transparent 60%),
              linear-gradient(180deg, #061A40 0%, #0A2A66 100%);
}

.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.12);
}

.section { @apply max-w-7xl mx-auto px-6 lg:px-10 py-20; }
.h1 { @apply text-4xl md:text-6xl font-bold tracking-tight; }
.h2 { @apply text-3xl md:text-4xl font-bold tracking-tight; }
.lede { @apply text-lg md:text-xl text-slate-300; }
```

---

## 4. `app/layout.tsx` (root layout)

```tsx
import type { Metadata } from "next";
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
```

---

## 5. `app/page.tsx` (home)

```tsx
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import USPCarousel from "@/components/sections/USPCarousel";
import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";
import Industries from "@/components/sections/Industries";
import ProductsPanel from "@/components/sections/ProductsPanel";
import QCMetricSpotlight from "@/components/sections/QCMetricSpotlight";
import Compliance from "@/components/sections/Compliance";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <USPCarousel />
      <ProductsPanel />
      <QCMetricSpotlight />
      <About />
      <MissionVision />
      <Industries />
      <Compliance />
      <CTA />
    </>
  );
}
```

---

## 6. `components/RegionContext.tsx`

```tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Region = "USA" | "Europe" | "Middle East" | "India";

interface Ctx { region: Region; setRegion: (r: Region) => void; }
const RegionCtx = createContext<Ctx>({ region: "USA", setRegion: () => {} });

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("USA");
  return <RegionCtx.Provider value={{ region, setRegion }}>{children}</RegionCtx.Provider>;
}
export const useRegion = () => useContext(RegionCtx);

export const REGION_DATA: Record<Region, { phone: string; address: string; hours: string; compliance: string; }> = {
  "USA":         { phone: "+1 (555) 010-2025", address: "Austin, TX, USA",          hours: "Mon–Fri 9:00–18:00 CT",  compliance: "FDA 21 CFR Part 11 · HIPAA" },
  "Europe":      { phone: "+44 20 4525 1010",  address: "London, United Kingdom",   hours: "Mon–Fri 9:00–18:00 GMT", compliance: "EU Annex 11 · GDPR" },
  "Middle East": { phone: "+971 4 555 1010",   address: "Dubai, UAE",               hours: "Sun–Thu 9:00–18:00 GST", compliance: "GxP · ISO 27001" },
  "India":       { phone: "+91 40 4555 1010",  address: "Hyderabad, India",         hours: "Mon–Sat 9:30–18:30 IST", compliance: "CDSCO · GxP · ISO" },
};
```

---

## 7. `components/Header.tsx`

```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import RegionSwitcher from "./RegionSwitcher";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/qc-metric", label: "QC-Metric" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal" />
          <span className="font-bold text-lg tracking-tight">Aurexa</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
          {NAV.map(n => <Link key={n.href} href={n.href} className="hover:text-brand-blue">{n.label}</Link>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <RegionSwitcher />
          <Link href="/book-demo" className="px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blueDark">Book a Demo</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 px-6 py-4 space-y-3">
          {NAV.map(n => <Link key={n.href} href={n.href} className="block">{n.label}</Link>)}
          <RegionSwitcher />
          <Link href="/book-demo" className="block w-full text-center py-2 rounded-lg bg-brand-blue text-white">Book a Demo</Link>
        </div>
      )}
    </header>
  );
}
```

---

## 8. `components/RegionSwitcher.tsx`

```tsx
"use client";
import { useRegion, Region } from "./RegionContext";
import { Globe } from "lucide-react";

const REGIONS: Region[] = ["USA", "Europe", "Middle East", "India"];

export default function RegionSwitcher() {
  const { region, setRegion } = useRegion();
  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-700">
      <Globe size={16} />
      <select
        className="bg-transparent border border-slate-300 rounded-md px-2 py-1 focus:outline-none"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
      >
        {REGIONS.map(r => <option key={r}>{r}</option>)}
      </select>
    </label>
  );
}
```

---

## 9. `components/Footer.tsx`

```tsx
import Link from "next/link";
import { Linkedin, Youtube, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-blueDark text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-teal to-brand-accent" />
            <span className="font-bold text-white text-lg">Aurexa Technologies</span>
          </div>
          <p className="text-sm">Where innovation meets compliance, and technology drives growth.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/qc-metric">QC-Metric (eQMS)</Link></li>
            <li><Link href="/products#dms">Document Management</Link></li>
            <li><Link href="/products#tms">Training Management</Link></li>
            <li><Link href="/products#cms">Content Management</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow us</h4>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
            <a href="#" aria-label="X"><Twitter size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          </div>
          <p className="mt-3 text-xs">Updates · Regulatory guidance · Case studies.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 text-xs flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Aurexa Technologies. All rights reserved.</span>
          <span>QC-Metric™ is a trademark of Aurexa Technologies.</span>
        </div>
      </div>
    </footer>
  );
}
```

---

## 10. `components/sections/Hero.tsx`

```tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="gradient-hero text-white">
      <div className="section relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal">
            <Sparkles size={14} /> Aurexa Technologies
          </span>
          <h1 className="h1 mt-4 max-w-4xl">
            Where <span className="text-brand-teal">Innovation</span> Meets <span className="text-brand-accent">Compliance</span>, and Technology Drives Growth.
          </h1>
          <p className="lede mt-6 max-w-3xl">
            Shaping the future of regulated industries with compliant, intelligent and scalable digital solutions
            for Life Sciences and adjacent sectors.
          </p>
          <p className="mt-4 max-w-3xl text-slate-300/90">
            We deliver enterprise-grade platforms and managed services that make compliance auditable, processes
            measurable, and quality decisions timely. Our products — including <strong>QC-Metric</strong> — connect
            documents, training and corrective workflows so quality becomes proactive instead of reactive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-demo" className="px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow hover:brightness-110">Book a Demo</Link>
            <Link href="#products" className="px-5 py-3 rounded-lg glass font-semibold">Explore Products</Link>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck size={16} className="text-brand-teal" />
            Validated to global standards: GxP · FDA 21 CFR Part 11 · ISO · GDPR · HIPAA.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 11. `components/sections/WhatWeDo.tsx`

```tsx
import { Boxes, ServerCog, Workflow } from "lucide-react";

const ITEMS = [
  { icon: Boxes,     title: "Industry-Focused Products",     body: "Pre-validated modules for DMS, TMS, CMS, LIMS integrations and the QC-Metric quality suite (CAPA, Change Control, Deviations, Complaints, OOS/OOT, Audit workflows)." },
  { icon: ServerCog, title: "Secure Hosting & Managed Services", body: "Compliance-ready environments, high availability, automated backups and SOC-style operational controls to preserve data integrity." },
  { icon: Workflow,  title: "End-to-End IT Services",        body: "System integration, migration, validation and custom development with GxP-aware processes and traceable audit evidence." },
];

export default function WhatWeDo() {
  return (
    <section className="section">
      <h2 className="h2">What we do</h2>
      <p className="text-slate-600 mt-2 max-w-2xl">A short, scannable view of our value to regulated organisations.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 font-semibold text-lg">{title}</h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 12. `components/sections/USPCarousel.tsx`

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const USPS = [
  { title: "Drag-and-Configure Workflows", points: ["Low consulting dependency", "Business-user authoring", "Versioned, audit-trailed"] },
  { title: "Modern Role-Based UI",         points: ["Guided tasks for fast onboarding", "Role-aware dashboards", "Mobile-friendly"] },
  { title: "Native Integration APIs",      points: ["LIMS · HR · IDAM/SSO", "REST + Webhooks", "Real-time SignalR events"] },
  { title: "Real-Time Metrics & KPIs",     points: ["Predictive flags", "Drill-down dashboards", "Exec & operator views"] },
  { title: "Validation-Ready Templates",   points: ["IQ/OQ/PQ assets", "Inspector-ready evidence", "GAMP 5 aligned"] },
  { title: "Embedded Training Linkage",    points: ["Doc → Training → CAPA closure", "Auto-trigger on revisions", "Time-stamped attestation"] },
  { title: "Value-Based Pricing",          points: ["Tier per regulated team", "No hidden audit fees", "Scale with growth"] },
  { title: "Rapid Deployment",             points: ["Industry packs", "Sandbox-first onboarding", "Go-live in weeks"] },
];

export default function USPCarousel() {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % USPS.length);
  const prev = () => setI((i - 1 + USPS.length) % USPS.length);
  const card = USPS[i];

  return (
    <section className="bg-brand-surface">
      <div className="section">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="h2">Why teams choose Aurexa</h2>
            <p className="text-slate-600 mt-2">Eight differentiators that make compliance a velocity advantage.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="p-2 rounded-full bg-white border border-slate-200" aria-label="Previous"><ChevronLeft /></button>
            <button onClick={next} className="p-2 rounded-full bg-white border border-slate-200" aria-label="Next"><ChevronRight /></button>
          </div>
        </div>
        <div className="mt-8 relative h-72">
          <AnimatePresence mode="wait">
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 grid md:grid-cols-2 gap-6 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blueDark text-white p-8"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-teal">USP {i + 1}/{USPS.length}</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2">{card.title}</h3>
                <ul className="mt-5 space-y-2 text-slate-200">
                  {card.points.map(p => <li key={p}>• {p}</li>)}
                </ul>
                <button className="mt-6 px-4 py-2 rounded-lg bg-brand-teal text-brand-blueDark font-semibold">See Example</button>
              </div>
              <div className="rounded-xl glass grid place-items-center text-slate-200/60 text-sm">
                [ Workflow micro-animation ]
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

---

## 13. `components/sections/ProductsPanel.tsx`

```tsx
import Link from "next/link";
import { FileText, GraduationCap, Layers, Activity } from "lucide-react";

const PRODUCTS = [
  { id: "qc-metric", icon: Activity,    name: "QC-Metric (eQMS)",        tag: "Flagship", body: "Predictive quality intelligence: CAPA, Deviation, Change Control, Audit Trail, dynamic workflows.", href: "/qc-metric" },
  { id: "dms",       icon: FileText,    name: "Document Management",     tag: "DMS",      body: "Single source of truth for controlled content, redlines, audit-ready evidence.", href: "/products#dms" },
  { id: "tms",       icon: GraduationCap, name: "Training Management",   tag: "TMS",      body: "Competency-first training, auto-triggered learning, timestamped attestation.", href: "/products#tms" },
  { id: "cms",       icon: Layers,      name: "Content Management",      tag: "CMS",      body: "Reusable content blocks, controlled publishing, localized translations.", href: "/products#cms" },
];

export default function ProductsPanel() {
  return (
    <section id="products" className="section">
      <h2 className="h2">The Aurexa product suite</h2>
      <p className="text-slate-600 mt-2 max-w-2xl">Pre-validated, integrated modules — deployed individually or as one connected platform.</p>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map(p => (
          <Link key={p.id} href={p.href} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition">
            <div className="w-11 h-11 rounded-xl bg-brand-teal/10 text-brand-tealDark grid place-items-center">
              <p.icon size={22} />
            </div>
            <span className="mt-4 inline-block text-[10px] tracking-widest uppercase text-brand-accent font-bold">{p.tag}</span>
            <h3 className="font-semibold text-lg mt-1">{p.name}</h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">{p.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

---

## 14. `components/sections/QCMetricSpotlight.tsx`

```tsx
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Deviation Management — 10-stage workflow with auto-IDs (DEV-YYYY-SITE-SEQ)",
  "CAPA — RCA (5-Why · Fishbone · Fault Tree · Pareto) → Closure",
  "Change Management — 11+ stages, CFT review, risk assessment",
  "Document Management — 24+ sub-modules, redlines, controlled copies",
  "Training Management — 30+ sub-modules, induction, role-change training",
  "Audit Trail — 5 specialised engines, inspector-ready exports",
  "Dynamic Forms & Workflows — drag-and-drop, FanOutGate, Decision nodes",
  "RBAC — 8 roles, fine-grained permissions, multi-tenant isolation",
  "Compliance — GxP · 21 CFR Part 11 · EU Annex 11 · ISO · GDPR · HIPAA",
];

export default function QCMetricSpotlight() {
  return (
    <section className="bg-gradient-to-br from-brand-blueDark via-brand-blue to-brand-tealDark text-white">
      <div className="section grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-teal">Flagship Product</span>
          <h2 className="h2 mt-3">QC-Metric — Predictive Quality Intelligence Platform</h2>
          <p className="lede mt-4">
            Multi-tenant eQMS that connects documents, training and corrective workflows into one auditable
            quality truth layer. Built on Next.js 15, React 19, Redux Toolkit and SignalR.
          </p>
          <Link href="/qc-metric" className="mt-6 inline-flex px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow">
            Explore QC-Metric
          </Link>
        </div>
        <ul className="space-y-3">
          {FEATURES.map(f => (
            <li key={f} className="flex gap-3 items-start glass rounded-xl p-4">
              <CheckCircle2 className="text-brand-teal mt-0.5 shrink-0" size={20} />
              <span className="text-slate-100">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

---

## 15. `components/sections/About.tsx`

```tsx
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TILES = [
  { title: "Domain Expertise",        body: "Decades of life sciences, pharma and device experience embedded in every workflow.", examples: ["Audit evidence export pack", "Per-stage e-signatures"] },
  { title: "Compliance & Validation", body: "Built to match GxP, FDA 21 CFR Part 11, EU Annex 11, ISO and data privacy expectations.", examples: ["Validation-ready IQ/OQ/PQ", "GAMP 5 aligned templates"] },
  { title: "Product Innovation",      body: "Cloud-native architecture with AI-readiness to turn quality data into actionable insights.", examples: ["AI-powered similar-deviation discovery", "Predictive SLA flags"] },
];

export default function About() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <h2 className="h2">About Aurexa</h2>
      <p className="lede mt-2 text-slate-600 max-w-3xl">
        Aurexa Technologies is a domain-first technology firm that helps regulated and adjacent industries
        replace brittle manual processes with auditable, automated systems.
      </p>
      <div className="mt-8 space-y-3">
        {TILES.map((t, i) => (
          <div key={t.title} className="rounded-xl border border-slate-200 bg-white">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="font-semibold">{t.title}</span>
              <ChevronDown className={`transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-slate-600">
                <p>{t.body}</p>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
                  {t.examples.map(e => <li key={e} className="rounded-lg bg-brand-surface px-3 py-2">• {e}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 16. `components/sections/MissionVision.tsx`

```tsx
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-brand-surface">
      <div className="section grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white p-8 border border-slate-200">
          <Target className="text-brand-blue" />
          <h3 className="mt-3 text-2xl font-bold">Mission</h3>
          <p className="text-slate-600 mt-3"><strong>Today —</strong> empower regulated organizations to adopt digital workflows confidently through reliable, compliant and scalable solutions that improve quality, efficiency and cross-team collaboration.</p>
          <p className="text-slate-600 mt-3"><strong>Tomorrow —</strong> evolve QC-Metric and the Aurexa ecosystem into a predictive quality intelligence platform: automated controls, AI-driven risk indicators, and cross-system intelligence so compliance moves from checklist to continuous assurance.</p>
        </div>
        <div className="rounded-2xl bg-white p-8 border border-slate-200">
          <Eye className="text-brand-teal" />
          <h3 className="mt-3 text-2xl font-bold">Vision</h3>
          <p className="text-slate-600 mt-3">A world where organizations in highly regulated sectors operate with modern, enterprise-grade technology that accelerates quality outcomes without compromising compliance or security. <strong>Quality systems should be integrated, proactive and business-enabling.</strong></p>
        </div>
      </div>
    </section>
  );
}
```

---

## 17. `components/sections/Industries.tsx`

```tsx
"use client";
import { useState } from "react";
import { FlaskConical, Ship, Pickaxe } from "lucide-react";

const DATA = [
  { icon: FlaskConical, name: "Life Sciences", body: "SOPs → Training → Change Control → CAPA → Audit evidence. Pharma, Biotech, Medical Devices, CROs.", uses: ["Batch record review", "21 CFR Part 11 e-sign", "CAPA effectiveness"] },
  { icon: Ship,         name: "Marine",        body: "Fleet operations, maintenance records, incident management and audit evidence for classification bodies.", uses: ["Vessel SOPs", "Incident workflows", "Inspector exports"] },
  { icon: Pickaxe,      name: "Mining",        body: "Safety workflows, environmental reporting, incident capture and controlled document management.", uses: ["Permit-to-work", "Environmental reports", "Audit packs"] },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const A = DATA[active];
  return (
    <section className="section">
      <h2 className="h2">Industries we serve</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {DATA.map((d, i) => (
          <button key={d.name} onClick={() => setActive(i)} className={`px-4 py-2 rounded-full border text-sm ${active === i ? "bg-brand-blue text-white border-brand-blue" : "bg-white border-slate-200 text-slate-700"}`}>
            {d.name}
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <A.icon className="text-brand-teal" />
            <h3 className="text-2xl font-bold">{A.name}</h3>
          </div>
          <p className="text-slate-600 mt-3">{A.body}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Common use cases</p>
          <ul className="mt-3 space-y-2 text-sm">
            {A.uses.map(u => <li key={u} className="rounded-lg bg-brand-surface px-3 py-2">• {u}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

---

## 18. `components/sections/Compliance.tsx`

```tsx
const ROWS = [
  ["GxP",                    "Full"],
  ["FDA 21 CFR Part 11",     "E-signatures, audit trail, time-stamped records"],
  ["EU Annex 11",            "Computerised systems controls"],
  ["ISO 9001 / 13485",       "Document control, CAPA, change control"],
  ["GDPR",                   "Data residency, consent, erasure"],
  ["HIPAA",                  "Access controls, audit logging"],
  ["GAMP 5",                 "Validation-ready packages"],
];

export default function Compliance() {
  return (
    <section className="bg-brand-surface">
      <div className="section">
        <h2 className="h2">Compliance coverage</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">Inspector-ready evidence packs for the regulations our customers face every day.</p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-blueDark text-white">
              <tr><th className="text-left px-5 py-3">Standard</th><th className="text-left px-5 py-3">Coverage</th></tr>
            </thead>
            <tbody>
              {ROWS.map(([s, c]) => (
                <tr key={s} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium">{s}</td>
                  <td className="px-5 py-3 text-slate-600">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
```

---

## 19. `components/sections/CTA.tsx`

```tsx
import Link from "next/link";

export default function CTA() {
  return (
    <section className="section">
      <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-tealDark text-white p-10 md:p-14 text-center">
        <h2 className="h2">Ready to make compliance your velocity advantage?</h2>
        <p className="lede mt-3 text-slate-200">Book a 30–45 min walkthrough tailored to your industry and compliance model.</p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link href="/book-demo" className="px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow">Book a Demo</Link>
          <Link href="/contact" className="px-5 py-3 rounded-lg glass font-semibold">Talk to Sales</Link>
        </div>
      </div>
    </section>
  );
}
```

---

## 20. `app/qc-metric/page.tsx` (deep-dive product page)

```tsx
import QCMetricSpotlight from "@/components/sections/QCMetricSpotlight";

const MODULES = [
  { name: "Deviation Management", points: ["Auto IDs (DEV-YYYY-SITE-SEQ)", "10-stage workflow", "AI similar-deviation discovery", "SLA auto-escalation", "14+ statuses · Critical/Major/Minor"] },
  { name: "CAPA",                  points: ["RCA: 5-Why · Fishbone · Fault Tree · Pareto", "Action Planning → Implementation → Effectiveness Check → Closure", "Pre-closure checklist", "Electronic signatures"] },
  { name: "Change Management",     points: ["Auto IDs (CCN-YYYY-SITE-SEQ)", "11+ stage workflow", "CFT review with per-member impact", "16+ statuses · 4 priorities"] },
  { name: "Document Management",   points: ["24+ sub-modules", "Controlled Copy register", "Periodic review · Renewal", "Redlines & version control", "Audit-ready evidence packs"] },
  { name: "Training Management",   points: ["30+ sub-modules", "Auto induction assignment", "Role-change training analysis", "Exams, certificates, calendars"] },
  { name: "Audit Trail",           points: ["5 specialised engines", "Severity-tagged events", "Old/new value comparisons", "IP & user-agent capture"] },
  { name: "Dynamic Forms & Workflows", points: ["Drag-and-drop builder", "Visual workflow designer (React Flow)", "FanOutGate · Decision · StaticForm nodes", "OutputJson single source of truth"] },
  { name: "RBAC",                  points: ["8 roles", "Fine-grained actions", "Per-tenant isolation", "usePermissions hook"] },
];

const STACK = [
  "Next.js 16 (App Router) · React 19 · React Compiler",
  "Redux Toolkit (55+ slices) + TanStack Query v5",
  "React Hook Form + Zod",
  "Tailwind CSS + Radix UI + Recharts",
  "Real-time SignalR · Axios with token-refresh interceptors",
  "Azure App Service deployment (Docker / PM2)",
];

export default function QCMetricPage() {
  return (
    <>
      <QCMetricSpotlight />
      <section className="section">
        <h2 className="h2">Modules</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(m => (
            <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-lg">{m.name}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {m.points.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-brand-surface">
        <div className="section">
          <h2 className="h2">Engineering stack</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-3 text-slate-700">
            {STACK.map(s => <li key={s} className="rounded-xl bg-white border border-slate-200 px-4 py-3">{s}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
```

---

## 21. `app/book-demo/page.tsx`

```tsx
"use client";
import { useState } from "react";

const INDUSTRIES = ["Life Sciences", "Marine", "Mining", "Other"];

export default function BookDemoPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "", org: "", industry: "Life Sciences", date: "", note: "" });

  const update = (k: string, v: string) => setData(s => ({ ...s, [k]: v }));

  return (
    <section className="section max-w-2xl">
      <h1 className="h1">Book a demo</h1>
      <p className="lede mt-2 text-slate-600">A 30–45 min walkthrough tailored to your industry and compliance model.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8">
        {step === 1 && (
          <div className="grid gap-4">
            <Input label="Full name"     value={data.name}  onChange={v => update("name", v)} />
            <Input label="Work email"    type="email" value={data.email} onChange={v => update("email", v)} />
            <Input label="Organization"  value={data.org}   onChange={v => update("org", v)} />
            <label className="text-sm font-medium">Industry
              <select value={data.industry} onChange={e => update("industry", e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2">
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
            </label>
            <button onClick={() => setStep(2)} className="mt-3 px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold">Next</button>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4">
            <Input label="Preferred date & time" type="datetime-local" value={data.date} onChange={v => update("date", v)} />
            <label className="text-sm font-medium">Short note / current tools
              <textarea rows={4} value={data.note} onChange={e => update("note", e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
            </label>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-lg border border-slate-300">Back</button>
              <button onClick={() => setStep(3)} className="px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold">Confirm</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="text-5xl">✅</div>
            <h2 className="mt-4 text-xl font-bold">Thank you, {data.name || "there"}!</h2>
            <p className="mt-2 text-slate-600">We&apos;ve sent a calendar invite and a short prep questionnaire to <strong>{data.email}</strong>.</p>
            <p className="mt-1 text-xs text-slate-500">Reference: AUS-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="text-sm font-medium">
      {label}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
    </label>
  );
}
```

---

## 22. `app/contact/page.tsx`

```tsx
"use client";
import { useState } from "react";
import { useRegion, REGION_DATA } from "@/components/RegionContext";

export default function ContactPage() {
  const { region } = useRegion();
  const r = REGION_DATA[region];
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState({ type: "Sales", name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("AUS-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  };

  return (
    <section className="section grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="h1">Contact Aurexa</h1>
        <p className="lede mt-2 text-slate-600">Sales, Support, Careers or Partnership — pick a queue and we&apos;ll route it.</p>
        <ul className="mt-6 space-y-3 text-slate-700">
          <li><strong>Email (Sales):</strong> contact@aurexatech.com</li>
          <li><strong>Email (Support):</strong> support@aurexatech.com</li>
          <li><strong>Phone ({region}):</strong> {r.phone}</li>
          <li><strong>Office:</strong> {r.address}</li>
          <li><strong>Hours:</strong> {r.hours}</li>
          <li><strong>Compliance focus:</strong> {r.compliance}</li>
        </ul>
      </div>
      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-8 grid gap-4">
        <label className="text-sm font-medium">Query type
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2">
            <option>Sales</option><option>Support</option><option>Careers</option><option>Partnership</option>
          </select>
        </label>
        <label className="text-sm font-medium">Name
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm font-medium">Email
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm font-medium">Message
          <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
        </label>
        <button type="submit" className="px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold">Send message</button>
        {submitted && <p className="text-sm text-emerald-600">Thanks! Reference: <strong>{submitted}</strong>. SLA: Sales 1–2 business days · Support ≤ 4 hours for critical.</p>}
      </form>
    </section>
  );
}
```

---

## 23. `app/careers/page.tsx`

```tsx
const ROLES = [
  { title: "Product Analyst — QMS", responsibilities: ["Gather URS, translate into user stories", "Validate acceptance criteria", "Liaise with QA & engineering"], musts: ["GxP awareness", "Strong written English"] },
  { title: "QA Engineer — Regulated Apps", responsibilities: ["Manual + automated testing", "Release gating", "Validation artifacts"], musts: ["ISTQB or equivalent", "Cypress / Playwright"] },
  { title: "Full-Stack Engineer (React / .NET)", responsibilities: ["Build modules across QC-Metric and CMS", "Performance tuning", "Code reviews"], musts: ["React 18+", ".NET 8 or higher"] },
  { title: "DevOps / Cloud Engineer", responsibilities: ["Azure-first deployments", "CI/CD pipelines", "Compliance-aware infra"], musts: ["Azure DevOps", "Docker / Kubernetes"] },
  { title: "Implementation Consultant", responsibilities: ["Onboarding & validation packages", "Customer training", "Go-live support"], musts: ["Pharma / regulated industry experience"] },
];

export default function CareersPage() {
  return (
    <section className="section">
      <h1 className="h1">Careers at Aurexa</h1>
      <p className="lede mt-2 text-slate-600 max-w-3xl">Join a specialist team building regulated software that matters. Collaborative teams, domain learning, real ownership of quality-critical products.</p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {ROLES.map(r => (
          <details key={r.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer font-semibold text-lg">{r.title}</summary>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <div>
                <p className="font-medium">Responsibilities</p>
                <ul className="mt-1 space-y-1">{r.responsibilities.map(x => <li key={x}>• {x}</li>)}</ul>
              </div>
              <div>
                <p className="font-medium">Must-have</p>
                <ul className="mt-1 space-y-1">{r.musts.map(x => <li key={x}>• {x}</li>)}</ul>
              </div>
              <button className="mt-2 self-start px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold">Apply</button>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
```

---

## 24. `app/about/page.tsx`

```tsx
import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <h1 className="h1">About Aurexa Technologies</h1>
        <p className="lede mt-3 text-slate-600 max-w-3xl">A domain-first technology firm helping regulated and adjacent industries replace brittle manual processes with auditable, automated systems.</p>
      </section>
      <About />
      <MissionVision />
    </>
  );
}
```

---

## 25. `app/industries/page.tsx`

```tsx
import Industries from "@/components/sections/Industries";

export default function IndustriesPage() {
  return (
    <>
      <section className="section">
        <h1 className="h1">Industries</h1>
        <p className="lede mt-3 text-slate-600 max-w-3xl">Pre-validated industry packs for rapid deployment — Life Sciences, Marine, Mining and more.</p>
      </section>
      <Industries />
    </>
  );
}
```

---

## 26. `app/products/page.tsx`

```tsx
import ProductsPanel from "@/components/sections/ProductsPanel";

const DETAIL = [
  { id: "dms", name: "Document Management System (DMS)", body: "Single source of truth for controlled content: metadata indexing, traceable approval routes, version-safe revisions, role & attribute-based access, redline comparisons and auto-packaged audit evidence." },
  { id: "tms", name: "Training Management System (TMS)", body: "Competency-first training mapped to roles, auto-triggered learning when documents change, embedded assessments and timestamped evidence for inspection." },
  { id: "cms", name: "Content Management (CMS)",         body: "Reusable content blocks for SOPs and policies, controlled publish workflows, multi-format support and localized translations with traceable approvals." },
];

export default function ProductsPage() {
  return (
    <>
      <ProductsPanel />
      <section className="section space-y-10">
        {DETAIL.map(d => (
          <div key={d.id} id={d.id} className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold">{d.name}</h2>
            <p className="text-slate-600 mt-3">{d.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
```

---

## 27. `app/legal/privacy/page.tsx` & `app/legal/terms/page.tsx` (stubs)

```tsx
// app/legal/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <section className="section prose max-w-3xl">
      <h1>Privacy Policy</h1>
      <p>Aurexa Technologies processes personal data in accordance with GDPR and applicable regional regulations…</p>
    </section>
  );
}
```

```tsx
// app/legal/terms/page.tsx
export default function TermsPage() {
  return (
    <section className="section prose max-w-3xl">
      <h1>Terms of Service</h1>
      <p>These terms govern access to Aurexa Technologies websites, products and services…</p>
    </section>
  );
}
```

---

## 28. `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};

export default nextConfig;
```

---

## 29. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 30. `.env.local.example`

```env
NEXT_PUBLIC_SITE_URL=https://aurexatech.com
NEXT_PUBLIC_DEMO_FORM_ENDPOINT=/api/demo
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact
```

---

## 31. Final Folder Structure

```
aurexa-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx               (Home)
│   ├── globals.css
│   ├── about/page.tsx
│   ├── book-demo/page.tsx
│   ├── careers/page.tsx
│   ├── contact/page.tsx
│   ├── industries/page.tsx
│   ├── products/page.tsx
│   ├── qc-metric/page.tsx
│   └── legal/
│       ├── privacy/page.tsx
│       └── terms/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RegionContext.tsx
│   ├── RegionSwitcher.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── WhatWeDo.tsx
│       ├── USPCarousel.tsx
│       ├── ProductsPanel.tsx
│       ├── QCMetricSpotlight.tsx
│       ├── About.tsx
│       ├── MissionVision.tsx
│       ├── Industries.tsx
│       ├── Compliance.tsx
│       └── CTA.tsx
├── public/
│   └── (logos, images)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

---

## 32. Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

**Notes**
- Brand colours align with the Aurexa logo (thick blue + teal/sea-green) plus a purple accent.
- All copy is centralised in [AUREXA_WEBSITE_CONTENT.md](AUREXA_WEBSITE_CONTENT.md) for marketing/legal review.
- For production: replace inline form handlers with proper API routes (e.g. `app/api/demo/route.ts`) sending to your CRM (HubSpot/Salesforce) and an SMTP/transactional email provider.
- Add proper SEO `<Head>` per page, sitemap (`app/sitemap.ts`), robots and Open Graph images.
