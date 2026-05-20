"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TILES = [
  { title: "Deep domain knowledge",        body: "At Aurexa Technologies our team brings decades of hands-on expertise across life sciences, pharmaceuticals, medical devices, and other highly regulated industries. This deep domain knowledge enables us to design solutions grounded in real-world operational challenges, regulatory expectations, and industry best practices. By combining practical industry experience with technology-driven innovation, we help organizations streamline compliance, improve quality processes, and achieve operational excellence with confidence.", examples: [], gradient: "from-brand-blue/10 to-brand-blueDark/5" },
  { title: "Compliance-first engineering", body: "At Aurexa Technologies compliance-first engineering is embedded into the foundation of every platform we build. Our solutions are purpose-designed to align with GxP requirements, 21 CFR Part 11, ISO standards, and global data privacy regulations, ensuring regulatory readiness from day one. Rather than treating compliance as an afterthought, we engineer it directly into system architecture, workflows, security controls, audit trails, and validation frameworks to deliver reliable, inspection-ready digital solutions for highly regulated industries.", examples: [], gradient: "from-brand-teal/10 to-brand-tealDark/5" },
  { title: "Innovation at scale",      body: "At Aurexa Technologies innovation at scale is driven through cloud-native technologies, advanced analytics, and AI-ready architectures that convert quality and operational data into actionable, decision-grade insights. We continuously analyze evolving industry challenges to develop innovative, scalable solutions tailored for regulated environments. By combining modern digital capabilities with deep regulatory understanding, we enable organizations to improve efficiency, accelerate decision-making, and deliver measurable business value across enterprise operations.", examples: [], gradient: "from-brand-accent/10 to-brand-blue/5" },
];

export default function About() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <h2 className="h2">About Aurexa Technologies</h2>
      <div className="mt-6 p-8 bg-gradient-to-r from-brand-blue/30 via-brand-teal/25 to-brand-accent/20 border-l-[6px] border-brand-blue rounded-xl shadow-xl">
        <p className="text-xl font-bold text-slate-900 leading-relaxed">
          Aurexa is a domain-first technology organization built to help regulated industries move beyond brittle, manual operations. We deliver auditable, automated, and intelligent systems that unite deep regulatory know-how with modern cloud engineering. Our platforms withstand inspection, accelerate compliance, and scale confidently with business growth.
        </p>
      </div>
      <div className="mt-8 space-y-3">
        {TILES.map((t, i) => (
          <div key={t.title} className={`rounded-xl border-2 ${i === 0 ? 'border-brand-blue' : i === 1 ? 'border-brand-teal' : 'border-brand-accent'} bg-gradient-to-br ${t.gradient} shadow-md hover:shadow-xl transition-all`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/20 transition-colors rounded-t-xl">
              <span className="font-bold text-lg">{t.title}</span>
              <ChevronDown className={`transition ${open === i ? "rotate-180" : ""} ${i === 0 ? 'text-brand-blue' : i === 1 ? 'text-brand-teal' : 'text-brand-accent'}`} size={24} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-slate-800 border-t border-slate-200">
                <p className="leading-relaxed font-semibold mt-4">{t.body}</p>
                {t.examples.length > 0 && (
                  <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
                    {t.examples.map(e => <li key={e} className="rounded-lg bg-brand-surface px-3 py-2">• {e}</li>)}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
