import { Boxes, ServerCog, Workflow } from "lucide-react";

const ITEMS = [
  { icon: Boxes,     title: "Industry-Focused Products",     body: "Pre-validated modules for DMS, TMS, CMS, LIMS integrations and the QC Metric quality suite (CAPA, Change Control, Deviations, Complaints, OOS/OOT, Audit workflows)." },
  { icon: ServerCog, title: "Secure Hosting & Managed Services", body: "Compliance-ready environments, high availability, automated backups and SOC-style operational controls to preserve data integrity." },
  { icon: Workflow,  title: "End-to-End IT Services",        body: "System integration, migration, validation and custom development with GxP-aware processes and traceable audit evidence." },
];

export default function WhatWeDo() {
  return (
    <section className="section">
      <h2 className="h2">What we do</h2>
      <p className="text-slate-600 mt-2 max-w-2xl">A short, scannable view of our value to regulated organisations.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 font-semibold text-lg">{title}</h3>
            <p className="text-slate-600 mt-2 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
