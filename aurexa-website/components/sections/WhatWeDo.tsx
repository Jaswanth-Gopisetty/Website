import { Boxes, ServerCog, Workflow } from "lucide-react";

const ITEMS = [
  { icon: Boxes,     title: "Industry-Focused Products",     body: "Aurexa Technologies develops industry-focused digital products designed for regulated and compliance-driven sectors. The company specializes in AI-powered platforms, eQMS solutions, workflow automation, and scalable digital systems that help organizations improve compliance, operational efficiency, and audit readiness across industries." },
  { icon: ServerCog, title: "Secure Hosting & Managed Services", body: "Aurexa delivers secure, enterprise hosting within compliance-ready environments engineered for high availability, resilience, and seamless scalability. Automated backups, disaster recovery, and end-to-end encryption safeguard data integrity, while SOC-aligned operational controls enforce strict governance and access discipline. Backed by 24/7 monitoring and proactive threat management, our managed services ensure audit-ready performance, business continuity, and unwavering trust across the solution lifecycle." },
  { icon: Workflow,  title: "End-to-end IT Services",        body: "Aurexa delivers end-to-end IT services spanning system integration, data migration, validation, and custom development, all executed through GxP-aware processes tailored for regulated industries. Every engagement is supported by traceable, audit-ready evidence and rigorous quality controls, ensuring compliance, transparency, and confidence across the full solution lifecycle." },
];

export default function WhatWeDo() {
  return (
    <section className="section">
      <h2 className="h2">What we do</h2>
      <p className="text-black mt-2 max-w-2xl">A short, scannable view of our value to regulated organisations.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 font-semibold text-lg">{title}</h3>
            <p className="text-black mt-2 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
