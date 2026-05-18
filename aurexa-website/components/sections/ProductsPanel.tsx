import Link from "next/link";
import { FileText, GraduationCap, Layers, Activity, ClipboardList } from "lucide-react";

const PRODUCTS = [
  { id: "qc-metric", icon: Activity,      name: "QCMetric (eQMS)",        tag: "Flagship", body: "Predictive quality intelligence: CAPA, Deviation, Change Control, Audit Trail, Risk management, dynamic workflows.", href: "/qc-metric" },
  { id: "cms",       icon: FileText,      name: "Content Management",     tag: "CMS",      body: "Single source of truth for controlled documents, version control, redlines, and audit-ready evidence.", href: "/products#cms" },
  { id: "tms",       icon: GraduationCap, name: "Training Management",    tag: "TMS",      body: "Competency-first training, auto-triggered learning from document revisions, timestamped attestation.", href: "/products#tms" },
  { id: "dynamic",   icon: ClipboardList, name: "Dynamic Forms & Workflows", tag: "FORMS",  body: "Drag-and-drop form builder, conditional logic, e-signatures, reusable templates and configurable workflows.", href: "/products#dynamic" },
  { id: "support",   icon: Layers,        name: "Customer Support",       tag: "SUPPORT",  body: "Integrated support ticketing, case management, and customer communication tracking.", href: "/products#support" },
];

export default function ProductsPanel() {
  return (
    <section id="products" className="section">
      <h2 className="h2">The Aurexa product suite</h2>
      <p className="text-slate-600 mt-2 max-w-2xl">Pre-validated, integrated modules — deployed individually or as one connected platform.</p>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
