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
    title: "Pharmaceuticals",
    summary: "Complete quality and compliance management for pharmaceutical manufacturing and distribution.",
    detail: "From batch record management to deviation tracking and regulatory submissions, Aurexa helps pharmaceutical organizations maintain strict GMP compliance. Our solutions support the entire product lifecycle with validated workflows, electronic signatures, and audit-ready documentation.",
  },
  {
    title: "Biotechnology",
    summary: "Digital platforms for biotech R&D, clinical trials, and regulatory compliance.",
    detail: "Aurexa supports biotechnology organizations with systems for research data management, protocol deviations, sample tracking, and regulatory documentation. Our platforms ensure data integrity, traceability, and compliance throughout the development lifecycle.",
  },
  {
    title: "Medical Devices",
    summary: "Quality management and regulatory compliance solutions for medical device manufacturers.",
    detail: "Aurexa delivers ISO 13485-aligned platforms for design controls, risk management, CAPA, complaint handling, and post-market surveillance. Our solutions help medical device companies maintain regulatory compliance across FDA, MDR, and global quality standards.",
  },
  {
    title: "Healthcare",
    summary: "Enterprise quality and operational management systems for healthcare providers.",
    detail: "From patient safety incident reporting to quality improvement programs and accreditation readiness, Aurexa helps healthcare organizations maintain operational excellence. Our solutions support HIPAA compliance, joint commission standards, and continuous quality monitoring.",
  },
  {
    title: "Manufacturing",
    summary: "Quality and operational management for regulated manufacturing environments.",
    detail: "Aurexa supports manufacturing organizations with digital systems for production quality control, equipment validation, supplier management, and continuous improvement. Our platforms enable real-time visibility, traceability, and compliance across manufacturing operations.",
  },
  {
    title: "Clinical Research",
    summary: "Clinical trial management and regulatory compliance platforms for research organizations.",
    detail: "Aurexa delivers systems for protocol management, investigator site oversight, adverse event reporting, and regulatory submissions. Our platforms support ICH-GCP compliance, 21 CFR Part 11, and EU CTR requirements for clinical trial sponsors and CROs.",
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
    title: "Regulatory & Compliance-driven Enterprises",
    summary: "Adaptable compliance and quality platforms for any regulated or compliance-driven sector.",
    detail: "Beyond our core verticals, Aurexa's configurable architecture supports food & beverage, energy, transportation, and other regulated industries. Our domain-agnostic approach means processes, terminology and approval matrices can be tailored to match any regulatory framework — enabling rapid deployment and long-term scalability.",
  },
];

export default function IndustriesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section">
      <h1 className="h1">Industries</h1>
      <div className="mt-6 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
        <p className="text-xl font-semibold text-slate-900 leading-relaxed">
          We support organizations across highly regulated industries including Life Sciences, Pharmaceuticals, Biotechnology, Medical Devices, Healthcare, Manufacturing, Clinical Research, Marine, Mining, and other regulatory & compliance-driven enterprises.
        </p>
      </div>
      <p className="mt-6 text-base text-slate-800 leading-relaxed">
        Aurexa delivers regulated-grade digital platforms across a range of industries, combining deep domain expertise with compliance-first technology.
      </p>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <div 
            key={ind.title} 
            className="rounded-xl border-2 border-slate-300 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{ind.title}</h3>
                  <p className="text-slate-700 mt-3 text-base leading-relaxed">{ind.summary}</p>
                </div>
                <ChevronDown 
                  size={22} 
                  className={`text-brand-blue shrink-0 transition-transform mt-1 ${open === i ? "rotate-180" : ""}`} 
                />
              </div>
            </button>
            
            {open === i && (
              <div className="px-6 pb-6 border-t border-slate-200">
                <p className="mt-4 text-base text-slate-800 leading-relaxed">{ind.detail}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Why Choose Aurexa Technologies */}
      <div className="mt-20 rounded-xl bg-gradient-to-br from-brand-blue/5 to-brand-teal/5 border-2 border-brand-blue/20 p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-brand-blueDark">Why Choose Aurexa Technologies</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-4 text-slate-800 text-base leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Compliance-focused digital solutions</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Secure and scalable cloud architecture</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Centralized enterprise visibility and control</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Automated workflows and audit-ready processes</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Industry best practices and regulatory alignment</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Real-time reporting and operational insights</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Flexible, configurable, and future-ready platforms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
