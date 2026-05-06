import QCMetricSpotlight from "@/components/sections/QCMetricSpotlight";

const MODULES = [
  { name: "Deviation Management", points: ["Auto IDs (DEV-YYYY-SITE-SEQ)", "10-stage workflow", "AI similar-deviation discovery", "SLA auto-escalation", "14+ statuses · Critical/Major/Minor"] },
  { name: "CAPA",                  points: ["RCA: 5-Why · Fishbone · Fault Tree · Pareto", "Action Planning → Implementation → Effectiveness Check → Closure", "Pre-closure checklist", "Electronic signatures"] },
  { name: "Change Management",     points: ["Auto IDs (CCN-YYYY-SITE-SEQ)", "11+ stage workflow", "CFT review with per-member impact", "16+ statuses · 4 priorities"] },
  { name: "Document Management",   points: ["24+ sub-modules", "Controlled Copy register", "Periodic review · Renewal", "Redlines & version control", "Audit-ready evidence packs"] },
  { name: "Training Management",   points: ["30+ sub-modules", "Auto induction assignment", "Role-change training analysis", "Exams, certificates, calendars"] },
  { name: "Audit Trail",           points: ["5 specialised engines", "Severity-tagged events", "Old/new value comparisons", "IP & user-agent capture"] },
  { name: "Dynamic Forms & Workflows", points: ["Drag-and-drop builder", "Visual workflow designer (React Flow)", "FanOutGate · Decision · StaticForm nodes", "OutputJson single source of truth"] },
  { name: "RBAC",                  points: ["8 roles", "Fine-grained actions", "Per-tenant isolation", "usePermissions hook"] },
];

const STACK = [
  "Next.js 16 (App Router) · React 19 · React Compiler",
  "Redux Toolkit (55+ slices) + TanStack Query v5",
  "React Hook Form + Zod",
  "Tailwind CSS + Radix UI + Recharts",
  "Real-time SignalR · Axios with token-refresh interceptors",
  "Azure App Service deployment (Docker / PM2)",
];

export default function QCMetricPage() {
  return (
    <>
      <QCMetricSpotlight />
      <section className="section">
        <h2 className="h2">Modules</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(m => (
            <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-lg">{m.name}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                {m.points.map(p => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-brand-surface">
        <div className="section">
          <h2 className="h2">Engineering stack</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-3 text-slate-700">
            {STACK.map(s => <li key={s} className="rounded-xl bg-white border border-slate-200 px-4 py-3">{s}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
