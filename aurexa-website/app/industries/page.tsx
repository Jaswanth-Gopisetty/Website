"use client";
import { useState } from "react";

const INDUSTRIES = [
  {
    title: "Life Sciences",
    summary: "Supporting pharmaceutical, biotech and clinical research organisations with validated, GxP-compliant digital systems.",
    detail: "Aurexa delivers GxP-aligned platforms for drug development, clinical trials, laboratory management and quality operations. Our solutions meet FDA 21 CFR Part 11, EU Annex 11 and ICH guidelines — providing audit trails, electronic signatures and inspection-ready evidence packages to ensure regulatory confidence throughout the product lifecycle.",
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100/50",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Pharmaceuticals",
    summary: "Complete quality and compliance management for pharmaceutical manufacturing and distribution.",
    detail: "From batch record management to deviation tracking and regulatory submissions, Aurexa helps pharmaceutical organizations maintain strict GMP compliance. Our solutions support the entire product lifecycle with validated workflows, electronic signatures, and audit-ready documentation.",
    gradient: "bg-gradient-to-br from-purple-50 to-purple-100/50",
    image: "https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Biotechnology",
    summary: "Digital platforms for biotech R&D, clinical trials, and regulatory compliance.",
    detail: "Aurexa supports biotechnology organizations with systems for research data management, protocol deviations, sample tracking, and regulatory documentation. Our platforms ensure data integrity, traceability, and compliance throughout the development lifecycle.",
    gradient: "bg-gradient-to-br from-teal-50 to-teal-100/50",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Medical Devices",
    summary: "Quality management and regulatory compliance solutions for medical device manufacturers.",
    detail: "Aurexa delivers ISO 13485-aligned platforms for design controls, risk management, CAPA, complaint handling, and post-market surveillance. Our solutions help medical device companies maintain regulatory compliance across FDA, MDR, and global quality standards.",
    gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
    image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Healthcare",
    summary: "Enterprise quality and operational management systems for healthcare providers.",
    detail: "From patient safety incident reporting to quality improvement programs and accreditation readiness, Aurexa helps healthcare organizations maintain operational excellence. Our solutions support HIPAA compliance, joint commission standards, and continuous quality monitoring.",
    gradient: "bg-gradient-to-br from-rose-50 to-rose-100/50",
    image: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Manufacturing",
    summary: "Quality and operational management for regulated manufacturing environments.",
    detail: "Aurexa supports manufacturing organizations with digital systems for production quality control, equipment validation, supplier management, and continuous improvement. Our platforms enable real-time visibility, traceability, and compliance across manufacturing operations.",
    gradient: "bg-gradient-to-br from-orange-50 to-orange-100/50",
    image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Clinical Research",
    summary: "Clinical trial management and regulatory compliance platforms for research organizations.",
    detail: "Aurexa delivers systems for protocol management, investigator site oversight, adverse event reporting, and regulatory submissions. Our platforms support ICH-GCP compliance, 21 CFR Part 11, and EU CTR requirements for clinical trial sponsors and CROs.",
    gradient: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
    image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Marine",
    summary: "Digital quality and compliance management for marine operations, ship management and maritime services.",
    detail: "From vessel maintenance records to crew certification and HSE compliance, Aurexa helps marine organisations digitise and streamline critical processes. Our configurable workflows support ISM Code compliance, flag state requirements and class society audits — delivering traceability and operational control across fleets.",
    gradient: "bg-gradient-to-br from-cyan-50 to-cyan-100/50",
    image: "https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Mining",
    summary: "Operational and quality management solutions for mining, extraction and mineral processing.",
    detail: "Aurexa supports mining operations with digital systems for safety management, equipment maintenance, environmental compliance and audit readiness. Our platforms enable automated incident reporting, corrective action workflows and real-time KPI tracking, helping organisations meet ISO 45001, ISO 14001 and local regulatory requirements.",
    gradient: "bg-gradient-to-br from-amber-50 to-amber-100/50",
    image: "https://images.pexels.com/photos/1267324/pexels-photo-1267324.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    title: "Regulatory & Compliance-driven Enterprises",
    summary: "Adaptable compliance and quality platforms for any regulated or compliance-driven sector.",
    detail: "Beyond our core verticals, Aurexa's configurable architecture supports food & beverage, energy, transportation, and other regulated industries. Our domain-agnostic approach means processes, terminology and approval matrices can be tailored to match any regulatory framework — enabling rapid deployment and long-term scalability.",
    gradient: "bg-gradient-to-br from-violet-50 to-violet-100/50",
    image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
];

export default function IndustriesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section">
      <h1 className="h1">Industries</h1>
      <div className="mt-6 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
        <p className="text-xl font-semibold text-slate-900 leading-relaxed text-center">
          We support organizations across highly regulated industries including Life Sciences, Pharmaceuticals, Biotechnology, Medical Devices, Healthcare, Manufacturing, Clinical Research, Marine, Mining, and other regulatory & compliance-driven enterprises.
        </p>
      </div>
      <p className="mt-6 text-base text-slate-800 leading-relaxed">
        Aurexa delivers regulated-grade digital platforms across a range of industries, combining deep domain expertise with compliance-first technology.
      </p>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <div 
            key={ind.title} 
            className="h-80"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen(null)}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: open === i ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 rounded-xl border-2 border-slate-300 overflow-hidden shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${ind.image})` }}
                />
                <div className={`absolute inset-0 ${ind.gradient} opacity-80`} />
                <div className="relative h-full flex items-center justify-center p-6">
                  <h3 className="text-2xl font-bold text-slate-900 text-center drop-shadow-lg">{ind.title}</h3>
                </div>
              </div>
              
              {/* Back Side */}
              <div 
                className={`absolute inset-0 rounded-xl border-2 border-slate-300 overflow-hidden shadow-lg ${ind.gradient} p-6 flex flex-col`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3">{ind.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">{ind.summary}</p>
                <div className="overflow-y-auto flex-1 pr-3">
                  <p className="text-slate-800 text-sm leading-relaxed">{ind.detail}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Aurexa Technologies */}
      <div className="mt-20 rounded-xl bg-gradient-to-br from-brand-blue/5 to-brand-teal/5 border-2 border-brand-blue/20 p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-brand-blueDark">Why Choose Aurexa Technologies</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-4 text-slate-800 text-base leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Compliance-focused digital solutions</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Secure and scalable cloud architecture</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Centralized enterprise visibility and control</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Automated workflows and audit-ready processes</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Industry best practices and regulatory alignment</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Real-time reporting and operational insights</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-brand-teal mt-1 font-bold text-xl">✓</span>
            <span className="font-medium">Flexible, configurable, and future-ready platforms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
