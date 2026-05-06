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
