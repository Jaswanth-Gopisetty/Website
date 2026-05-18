import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";

const FEATURES = [
  "AI-powered quality management & eQMS",
  "CAPA, Deviations, Change Control & Audit Trail",
  "Document & Training Management",
  "Dynamic Forms & Configurable Workflows",
  "Real-time KPIs and compliance dashboards",
  "GxP · FDA 21 CFR Part 11 · ISO · GDPR aligned",
];

export default function QCMetricCard() {
  return (
    <section id="qcmetric" className="section">
      <h2 className="h2">Explore Products</h2>
      <p className="text-black mt-2 max-w-2xl">Our flagship platform for regulated industries — built for compliance, designed for scale.</p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 max-w-3xl">
        <span className="inline-block text-[10px] tracking-widest uppercase text-brand-accent font-bold">Flagship Product</span>
        <h3 className="mt-2 text-2xl font-bold">QCMetric</h3>
        <p className="text-black mt-3 leading-relaxed">
          QCMetric is an advanced, AI-powered eQMS platform that seamlessly connects quality, compliance and operational workflows into a single regulated system — purpose-built for life sciences, pharma, medical devices and other highly regulated industries.
        </p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {FEATURES.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-black">
              <CheckCircle2 size={16} className="text-brand-teal mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href="https://qcmetric.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blueDark"
        >
          Visit QCMetric <ExternalLink size={16} />
        </Link>
      </div>
    </section>
  );
}
