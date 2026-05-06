import ProductsPanel from "@/components/sections/ProductsPanel";

const DETAIL = [
  { id: "dms", name: "Document Management System (DMS)", body: "Single source of truth for controlled content: metadata indexing, traceable approval routes, version-safe revisions, role & attribute-based access, redline comparisons and auto-packaged audit evidence." },
  { id: "tms", name: "Training Management System (TMS)", body: "Competency-first training mapped to roles, auto-triggered learning when documents change, embedded assessments and timestamped evidence for inspection." },
  { id: "cms", name: "Content Management (CMS)",         body: "Reusable content blocks for SOPs and policies, controlled publish workflows, multi-format support and localized translations with traceable approvals." },
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
