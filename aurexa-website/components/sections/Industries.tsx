"use client";
import { useState } from "react";
import { FlaskConical, Ship, Pickaxe } from "lucide-react";

const DATA = [
  { id: "life-sciences", icon: FlaskConical, name: "Life Sciences", body: "SOPs → Training → Change Control → CAPA → Audit evidence. Pharma, Biotech, Medical Devices, CROs.", uses: ["Batch record review", "21 CFR Part 11 e-sign", "CAPA effectiveness"] },
  { id: "marine",        icon: Ship,         name: "Marine",        body: "Fleet operations, maintenance records, incident management and audit evidence for classification bodies.", uses: ["Vessel SOPs", "Incident workflows", "Inspector exports"] },
  { id: "mining",        icon: Pickaxe,      name: "Mining",        body: "Safety workflows, environmental reporting, incident capture and controlled document management.", uses: ["Permit-to-work", "Environmental reports", "Audit packs"] },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const A = DATA[active];
  return (
    <section className="section">
      <h2 className="h2">Industries we serve</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {DATA.map((d, i) => (
          <button key={d.name} onClick={() => setActive(i)} className={`px-4 py-2 rounded-full border text-sm ${active === i ? "bg-brand-blue text-white border-brand-blue" : "bg-white border-slate-200 text-slate-700"}`}>
            {d.name}
          </button>
        ))}
      </div>
      <div id={A.id} className="mt-8 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <A.icon className="text-brand-teal" />
            <h3 className="text-2xl font-bold">{A.name}</h3>
          </div>
          <p className="text-slate-600 mt-3">{A.body}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Common use cases</p>
          <ul className="mt-3 space-y-2 text-sm">
            {A.uses.map(u => <li key={u} className="rounded-lg bg-brand-surface px-3 py-2">• {u}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
