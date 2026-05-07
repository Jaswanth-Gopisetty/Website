"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  LayoutTemplate,
  Layers3,
  Brain,
  Plug,
  ShieldCheck,
} from "lucide-react";

const TABS = [
  {
    icon: Workflow,
    title: "Dynamic Workflow Engine",
    points: [
      "Easily configure workflows without coding",
      "Adapt processes for SOP, training, audits",
      "Low consulting dependency",
    ],
  },
  {
    icon: LayoutTemplate,
    title: "Form Builder for Customization",
    points: [
      "Drag-and-drop form designer with reusable fields",
      "Conditional logic, validations and signatures",
      "Version-controlled templates with audit trail",
    ],
  },
  {
    icon: Layers3,
    title: "Domain-Agnostic Flexibility",
    points: [
      "One platform across Pharma, Marine, Mining and more",
      "Industry packs for rapid go-live",
      "Configure terminology and approval matrices per tenant",
    ],
  },
  {
    icon: Brain,
    title: "AI-Powered Features",
    points: [
      "Similar-deviation discovery and clustering",
      "Predictive SLA and risk indicators",
      "Smart suggestions for CAPA effectiveness",
    ],
  },
  {
    icon: Plug,
    title: "Integration Ready",
    points: [
      "Native connectors for LIMS, HR and IDAM/SSO",
      "REST APIs and webhooks for any system",
      "Real-time SignalR events for downstream apps",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliance",
    points: [
      "GxP · FDA 21 CFR Part 11 · EU Annex 11",
      "ISO 9001/13485 · GDPR · HIPAA",
      "GAMP 5 aligned validation packages",
    ],
  },
];

export default function UniqueFeatures() {
  const [active, setActive] = useState(0);
  const Tab = TABS[active];
  const Icon = Tab.icon;

  return (
    <section className="section">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
          Key Platform Features
        </span>
        <h2 className="h2 mt-3">What makes QC Metric unique</h2>
        <p className="text-slate-600 mt-3">
          Discover the powerful features that set QC Metric apart as your unified quality
          management platform.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {TABS.map((t, i) => (
          <button
            key={t.title}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              active === i
                ? "bg-brand-blue text-white border-brand-blue shadow"
                : "bg-white border-slate-200 text-slate-700 hover:border-brand-blue/40"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="mt-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={Tab.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 grid md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-tealDark grid place-items-center">
                <Icon size={28} />
              </div>
              <h3 className="mt-5 text-2xl font-bold">{Tab.title}</h3>
              <Link
                href="/book-demo"
                className="mt-5 inline-flex px-4 py-2 rounded-lg bg-brand-blue text-white font-semibold text-sm"
              >
                See Example
              </Link>
            </div>
            <ul className="md:col-span-2 grid sm:grid-cols-2 gap-3 self-center">
              {Tab.points.map((p) => (
                <li
                  key={p}
                  className="rounded-xl bg-brand-surface px-4 py-3 text-slate-700 text-sm leading-relaxed"
                >
                  • {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
