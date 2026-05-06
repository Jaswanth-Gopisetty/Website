import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-brand-surface">
      <div className="section grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-white p-8 border border-slate-200">
          <Target className="text-brand-blue" />
          <h3 className="mt-3 text-2xl font-bold">Mission</h3>
          <p className="text-slate-600 mt-3"><strong>Today —</strong> empower regulated organizations to adopt digital workflows confidently through reliable, compliant and scalable solutions that improve quality, efficiency and cross-team collaboration.</p>
          <p className="text-slate-600 mt-3"><strong>Tomorrow —</strong> evolve QC-Metric and the Aurexa ecosystem into a predictive quality intelligence platform: automated controls, AI-driven risk indicators, and cross-system intelligence so compliance moves from checklist to continuous assurance.</p>
        </div>
        <div className="rounded-2xl bg-white p-8 border border-slate-200">
          <Eye className="text-brand-teal" />
          <h3 className="mt-3 text-2xl font-bold">Vision</h3>
          <p className="text-slate-600 mt-3">A world where organizations in highly regulated sectors operate with modern, enterprise-grade technology that accelerates quality outcomes without compromising compliance or security. <strong>Quality systems should be integrated, proactive and business-enabling.</strong></p>
        </div>
      </div>
    </section>
  );
}
