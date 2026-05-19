import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-brand-surface">
      <div className="section grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blueDark/5 p-8 border border-slate-200 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/20 grid place-items-center">
            <Target className="text-brand-blue" size={24} />
          </div>
          <h3 className="mt-3 text-2xl font-bold">Mission</h3>
          <p className="text-black mt-3 leading-relaxed"><strong>Current Mission —</strong> To empower regulated organizations to adopt digital workflows confidently through reliable, compliant and scalable solutions that improve quality, efficiency and cross-team collaboration.</p>
          <p className="text-black mt-3 leading-relaxed"><strong>Future Scope —</strong> To evolve Qcmetric and the Aurexa ecosystem into a predictive quality intelligence platform: Integrating automated controls, AI-driven risk indicators, and cross-system intelligence so compliance moves from checklist to continuous assurance.</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-brand-teal/10 to-brand-tealDark/5 p-8 border border-slate-200 hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-brand-teal/20 grid place-items-center">
            <Eye className="text-brand-tealDark" size={24} />
          </div>
          <h3 className="mt-3 text-2xl font-bold">Vision</h3>
          <p className="text-black mt-3 leading-relaxed">To help organizations achieve operational excellence and regulatory confidence through innovative, intelligent, and compliant digital transformation solutions.</p>
        </div>
      </div>
    </section>
  );
}
