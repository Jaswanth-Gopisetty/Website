"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, ChevronDown } from "lucide-react";

const FEATURES = [
  "AI-powered quality management & eQMS",
  "CAPA, Deviations, Change Control & Audit Trail",
  "Document & Training Management",
  "Dynamic Forms & Configurable Workflows",
  "Real-time KPIs and compliance dashboards",
  "GxP · FDA 21 CFR Part 11 · ISO · GDPR aligned",
];

export default function ProductsPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="section">
      <h1 className="h1">Products</h1>
      <p className="lede mt-3 text-black max-w-3xl leading-relaxed">
        Our flagship platform for regulated industries — built for compliance, designed for scale.
      </p>
      <div className="mt-10 max-w-md">
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-5 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="inline-block text-[9px] tracking-widest uppercase text-brand-accent font-bold">Flagship Product</span>
                <h2 className="mt-2 text-xl font-bold text-slate-900">QCMetric</h2>
                <p className="text-black mt-2 text-sm leading-relaxed">
                  QCMetric is an advanced, AI-powered eQMS platform that seamlessly connects quality, compliance and operational workflows into a single regulated system.
                </p>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-brand-blue shrink-0 transition-transform mt-1 ${isExpanded ? "rotate-180" : ""}`} 
              />
            </div>
          </button>

          {isExpanded && (
            <div className="px-5 pb-5 border-t border-slate-100">
              <ul className="mt-4 grid gap-2">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-black leading-relaxed">
                    <CheckCircle2 size={14} className="text-brand-teal mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="https://qcmetric.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blueDark transition-colors"
              >
                Visit QCMetric <ExternalLink size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
