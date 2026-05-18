"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const INDUSTRIES = [
  {
    title: "Life Sciences",
    summary: "Supporting pharmaceutical, biotech and clinical research organisations with validated, GxP-compliant digital systems.",
    detail: "Aurexa delivers GxP-aligned platforms for drug development, clinical trials, laboratory management and quality operations. Our solutions meet FDA 21 CFR Part 11, EU Annex 11 and ICH guidelines — providing audit trails, electronic signatures and inspection-ready evidence packages to ensure regulatory confidence throughout the product lifecycle.",
  },
  {
    title: "Marine",
    summary: "Digital quality and compliance management for marine operations, ship management and maritime services.",
    detail: "From vessel maintenance records to crew certification and HSE compliance, Aurexa helps marine organisations digitise and streamline critical processes. Our configurable workflows support ISM Code compliance, flag state requirements and class society audits — delivering traceability and operational control across fleets.",
  },
  {
    title: "Mining",
    summary: "Operational and quality management solutions for mining, extraction and mineral processing.",
    detail: "Aurexa supports mining operations with digital systems for safety management, equipment maintenance, environmental compliance and audit readiness. Our platforms enable automated incident reporting, corrective action workflows and real-time KPI tracking, helping organisations meet ISO 45001, ISO 14001 and local regulatory requirements.",
  },
  {
    title: "Others",
    summary: "Adaptable compliance and quality platforms for any regulated or compliance-driven sector.",
    detail: "Beyond our core verticals, Aurexa's configurable architecture supports medical devices, food & beverage, energy, and other regulated industries. Our domain-agnostic approach means processes, terminology and approval matrices can be tailored to match any regulatory framework — enabling rapid deployment and long-term scalability.",
  },
];

export default function IndustriesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section">
      <h1 className="h1">Industries</h1>
      <p className="lede mt-3 text-black max-w-3xl">
        Aurexa delivers regulated-grade digital platforms across a range of industries, combining deep domain expertise with compliance-first technology.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <div key={ind.title} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold">{ind.title}</h2>
              <p className="text-black mt-2 text-sm leading-relaxed">{ind.summary}</p>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
              >
                {open === i ? "Show less" : "See more"}
                <ChevronDown size={16} className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
            </div>
            {open === i && (
              <div className="px-6 pb-6 text-sm text-black leading-relaxed border-t border-slate-100 pt-4">
                {ind.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
