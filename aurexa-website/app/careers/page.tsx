const ROLES = [
  { title: "Product Analyst — QMS", responsibilities: ["Gather URS, translate into user stories", "Validate acceptance criteria", "Liaise with QA & engineering"], musts: ["Understanding of GxP processes or strong curiosity and ability to learn quickly"] },
  { title: "QA Engineer — Regulated Apps", responsibilities: ["Automation and manual testing", "Release gating", "Validation artifacts"], musts: ["ISTQB / practical experience with regulated validation desirable"] },
];

export default function CareersPage() {
  return (
    <section className="section">
      <h1 className="h1">Careers at Aurexa</h1>
      <div className="mt-6 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
        <p className="text-xl font-semibold text-slate-900 leading-relaxed">
          Join a specialist team building regulated software that matters. Expect collaborative teams, domain learning opportunities and real ownership over quality-critical products.
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {ROLES.map(r => (
          <details key={r.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer font-semibold text-lg text-black">{r.title}</summary>
            <div className="mt-4 grid gap-3 text-sm text-black">
              <div>
                <p className="font-medium text-black">Responsibilities</p>
                <ul className="mt-1 space-y-1">{r.responsibilities.map(x => <li key={x}>• {x}</li>)}</ul>
              </div>
              <div>
                <p className="font-medium text-black">Must-have</p>
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
