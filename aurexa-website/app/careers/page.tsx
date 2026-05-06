const ROLES = [
  { title: "Product Analyst — QMS", responsibilities: ["Gather URS, translate into user stories", "Validate acceptance criteria", "Liaise with QA & engineering"], musts: ["GxP awareness", "Strong written English"] },
  { title: "QA Engineer — Regulated Apps", responsibilities: ["Manual + automated testing", "Release gating", "Validation artifacts"], musts: ["ISTQB or equivalent", "Cypress / Playwright"] },
  { title: "Full-Stack Engineer (React / .NET)", responsibilities: ["Build modules across QC-Metric and CMS", "Performance tuning", "Code reviews"], musts: ["React 18+", ".NET 8 or higher"] },
  { title: "DevOps / Cloud Engineer", responsibilities: ["Azure-first deployments", "CI/CD pipelines", "Compliance-aware infra"], musts: ["Azure DevOps", "Docker / Kubernetes"] },
  { title: "Implementation Consultant", responsibilities: ["Onboarding & validation packages", "Customer training", "Go-live support"], musts: ["Pharma / regulated industry experience"] },
];

export default function CareersPage() {
  return (
    <section className="section">
      <h1 className="h1">Careers at Aurexa</h1>
      <p className="lede mt-2 text-slate-600 max-w-3xl">Join a specialist team building regulated software that matters. Collaborative teams, domain learning, real ownership of quality-critical products.</p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {ROLES.map(r => (
          <details key={r.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer font-semibold text-lg">{r.title}</summary>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <div>
                <p className="font-medium">Responsibilities</p>
                <ul className="mt-1 space-y-1">{r.responsibilities.map(x => <li key={x}>• {x}</li>)}</ul>
              </div>
              <div>
                <p className="font-medium">Must-have</p>
                <ul className="mt-1 space-y-1">{r.musts.map(x => <li key={x}>• {x}</li>)}</ul>
              </div>
              <button className="mt-2 self-start px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold">Apply</button>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
