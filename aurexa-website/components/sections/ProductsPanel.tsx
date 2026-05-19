import Link from "next/link";
import { FileText, GraduationCap, Layers, Activity, ClipboardList } from "lucide-react";

const PRODUCTS = [
  { id: "qc-metric", icon: Activity,      name: "QCMetric (eQMS)",        tag: "Flagship", body: "Predictive quality intelligence: CAPA, Deviation, Change Control, Audit Trail, Risk management, dynamic workflows.", href: "/qc-metric", gradient: "bg-gradient-to-br from-brand-blue/10 to-brand-blueDark/5", iconBg: "bg-brand-blue/20", iconColor: "text-brand-blue" },
  { id: "cms",       icon: FileText,      name: "Content Management",     tag: "CMS",      body: "Single source of truth for controlled documents, version control, redlines, and audit-ready evidence.", href: "/products#cms", gradient: "bg-gradient-to-br from-brand-teal/10 to-brand-tealDark/5", iconBg: "bg-brand-teal/20", iconColor: "text-brand-tealDark" },
  { id: "tms",       icon: GraduationCap, name: "Training Management",    tag: "TMS",      body: "Competency-first training, auto-triggered learning from document revisions, timestamped attestation.", href: "/products#tms", gradient: "bg-gradient-to-br from-brand-accent/10 to-purple-500/5", iconBg: "bg-brand-accent/20", iconColor: "text-brand-accent" },
  { id: "dynamic",   icon: ClipboardList, name: "Dynamic Forms & Workflows", tag: "FORMS",  body: "Drag-and-drop form builder, conditional logic, e-signatures, reusable templates and configurable workflows.", href: "/products#dynamic", gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/50", iconBg: "bg-emerald-100", iconColor: "text-emerald-700" },
  { id: "support",   icon: Layers,        name: "Customer Support",       tag: "SUPPORT",  body: "Integrated support ticketing, case management, and customer communication tracking.", href: "/products#support", gradient: "bg-gradient-to-br from-orange-50 to-orange-100/50", iconBg: "bg-orange-100", iconColor: "text-orange-700" },
];

export default function ProductsPanel() {
  return (
    <section id="products" className="section">
      <h2 className="h2">The Aurexa product suite</h2>
      <p className="text-slate-600 mt-2 max-w-2xl">Pre-validated, integrated modules — deployed individually or as one connected platform.</p>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map(p => (
          <Link key={p.id} href={p.href} className={`rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all ${p.gradient}`}>
            <div className={`w-11 h-11 rounded-xl ${p.iconBg} ${p.iconColor} grid place-items-center`}>
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
