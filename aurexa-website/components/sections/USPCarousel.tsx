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
            <p className="text-black mt-2 leading-relaxed">Eight differentiators that make compliance a velocity advantage.</p>
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
                <ul className="mt-5 space-y-2 text-white leading-relaxed">
                  {card.points.map(p => <li key={p} className="leading-relaxed">• {p}</li>)}
                </ul>
                <button className="mt-6 px-4 py-2 rounded-lg bg-brand-teal text-brand-blueDark font-semibold">See Example</button>
              </div>
              <div className="rounded-xl glass grid place-items-center text-white text-sm">
                [ Workflow micro-animation ]
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
