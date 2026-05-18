"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TILES = [
  { title: "Deep domain knowledge",        body: "Our team bring decades of frontline experience across life sciences, pharmaceuticals, medical devices, and other highly regulated sectors, ensuring every solution is rooted in real-world operational context.", examples: ["Canned audit evidence export", "Training auto-trigger from document revision"] },
  { title: "Compliance-first engineering", body: "Every Aurexa platform is purpose-built to align with GxP, 21 CFR Part 11, ISO standards, and global data-privacy mandates — compliance is engineered in, never bolted on.", examples: ["Validation-ready IQ/OQ/PQ templates", "GAMP 5 aligned documentation"] },
  { title: "Innovation at scale",      body: "Cloud-native foundations, advanced analytics, and AI-ready architectures transform quality and operational data into decision-grade insights that drive measurable business value. We take the opportunity to analyse and develop innovative solutions for regulated industries.", examples: ["AI-driven risk indicators", "Predictive quality intelligence"] },
];

export default function About() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <h2 className="h2">About Aurexa Technologies</h2>
      <div className="mt-6 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
        <p className="text-xl font-semibold text-slate-900 leading-relaxed">
          Aurexa is a domain-first technology organization built to help regulated industries move beyond brittle, manual operations. We deliver auditable, automated, and intelligent systems that unite deep regulatory know-how with modern cloud engineering. Our platforms withstand inspection, accelerate compliance, and scale confidently with business growth.
        </p>
      </div>
      <div className="mt-8 space-y-3">
        {TILES.map((t, i) => (
          <div key={t.title} className="rounded-xl border border-slate-200 bg-white">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="font-semibold">{t.title}</span>
              <ChevronDown className={`transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-slate-700">
                <p className="leading-relaxed">{t.body}</p>
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
