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
          <span className="text-xs uppercase tracking-widest text-brand-teal">At the heart of our platform portfolio</span>
          <h2 className="h2 mt-3">QCMetric — Predictive Quality Intelligence Platform</h2>
          <p className="lede mt-4 leading-relaxed">
            An advanced eQMS platform that seamlessly connects Content management, training management, CAPA, deviations, change control, OOS, OOT, audit management, Vendor management, Customer Support, Risk management, Complaints management, Dynamic forms and Dynamic workflows into a single Quality Management System. Proactively identify risks, automate compliance activities, and track performance through live KPIs and dashboards.
          </p>
          <Link href="/qc-metric" className="mt-6 inline-flex px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow">
            Explore QCMetric
          </Link>
        </div>
        <ul className="space-y-3">
          {FEATURES.map(f => (
            <li key={f} className="flex gap-3 items-start glass rounded-xl p-4">
              <CheckCircle2 className="text-brand-teal mt-0.5 shrink-0" size={20} />
              <span className="text-slate-100 leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
