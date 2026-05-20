"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";

const FEATURES = [
  "AI-powered quality management & eQMS",
  "CAPA, Deviations, Change Control & Audit Trail",
  "Document & Training Management",
  "Dynamic Forms & Configurable Workflows",
  "Real-time KPIs and compliance dashboards",
  "GxP · FDA 21 CFR Part 11 · ISO · GDPR aligned",
];

export default function QCMetricCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="qcmetric" className="section">
      <h2 className="h2">Explore Products</h2>
      <p className="text-black mt-2 max-w-2xl leading-relaxed">Our flagship platform for regulated industries — built for compliance, designed for scale.</p>
      <div className="mt-8 max-w-md">
        <div 
          className="h-96 cursor-pointer"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
        >
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front Face */}
            <div
              className="absolute inset-0 rounded-xl border-2 border-slate-300 bg-gradient-to-br from-brand-blue/10 to-brand-accent/10 overflow-hidden shadow-md"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 rounded-xl bg-white p-4 shadow-lg mb-4 flex items-center justify-center">
                  <img 
                    src="/qcmetric-logo-new.png" 
                    alt="QCMetric Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="inline-block text-[10px] tracking-widest uppercase text-brand-accent font-bold mb-2">Flagship Product</span>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">QCMetric</h3>
                <p className="text-black text-sm leading-relaxed font-semibold max-w-sm">
                  QCMetric is an advanced, AI-powered eQMS platform that seamlessly connects quality, compliance and operational workflows into a single regulated system.
                </p>
              </div>
            </div>

            {/* Back Face */}
            <div
              className="absolute inset-0 rounded-xl border-2 border-brand-blue bg-gradient-to-br from-brand-blue/15 to-brand-accent/15 p-6 overflow-y-auto shadow-lg"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-28 h-28 rounded-lg bg-white p-2 shadow-md flex items-center justify-center shrink-0">
                  <img 
                    src="/qcmetric-logo-new.png" 
                    alt="QCMetric Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="inline-block text-[9px] tracking-widest uppercase text-brand-accent font-bold">Flagship Product</span>
                  <h3 className="text-xl font-bold text-slate-900">QCMetric</h3>
                </div>
              </div>
              
              <ul className="grid gap-2 mb-4">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-black leading-relaxed font-semibold">
                    <CheckCircle2 size={14} className="text-brand-teal mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <Link
                href="https://qcmetric.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blueDark transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Visit QCMetric <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
