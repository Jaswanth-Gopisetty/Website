import ProductsPanel from "@/components/sections/ProductsPanel";

const DETAIL = [
  { id: "dms",      name: "Content Management (DMS)",                body: "Single source of truth for controlled content: metadata indexing, traceable approval routes, version-safe revisions, role & attribute-based access, redline comparisons and auto-packaged audit evidence." },
  { id: "tms",      name: "Training Management System (TMS)",         body: "Competency-first training mapped to roles, auto-triggered learning when documents change, embedded assessments and timestamped evidence for inspection." },
  { id: "cms",      name: "Quality Management System (QMS)",          body: "Deviations, CAPA (5-Why · Fishbone · Fault Tree · Pareto), Change Control, complaints, OOS/OOT and audit trail — connected through dynamic workflows for measurable quality outcomes." },
  { id: "workflow", name: "Workflow-Based Forms",                     body: "Drag-and-drop form builder with reusable fields, conditional logic, validations, e-signatures and version-controlled templates. Pair any form with a visual workflow designer using FanOutGate, Decision and StaticForm nodes." },
];

export default function ProductsPage() {
  return (
    <>
      <ProductsPanel />
      <section className="section space-y-10">
        {DETAIL.map(d => (
          <div key={d.id} id={d.id} className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold">{d.name}</h2>
            <p className="text-slate-600 mt-3">{d.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
