"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="gradient-hero text-white">
      <div className="section relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal">
            <Sparkles size={14} /> Aurexa Technologies
          </span>
          <h1 className="h1 mt-4 max-w-4xl">
            Where <span className="text-brand-teal">Innovation</span> Meets <span className="text-brand-accent">Compliance</span>, and Technology Drives Growth.
          </h1>
          <p className="lede mt-6 max-w-3xl">
            Shaping the future of regulated industries with compliant, intelligent and scalable digital solutions
            for Life Sciences and adjacent sectors.
          </p>
          <p className="mt-4 max-w-3xl text-slate-300/90">
            We deliver enterprise-grade platforms and managed services that make compliance auditable, processes
            measurable, and quality decisions timely. Our products — including <strong>QC Metric</strong> — connect
            documents, training and corrective workflows so quality becomes proactive instead of reactive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-demo" className="px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow hover:brightness-110">Book a Demo</Link>
            <Link href="#products" className="px-5 py-3 rounded-lg glass font-semibold">Explore Products</Link>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck size={16} className="text-brand-teal" />
            Validated to global standards: GxP · FDA 21 CFR Part 11 · ISO · GDPR · HIPAA.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
