"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Mail, Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegion, REGION_DATA } from "@/components/RegionContext";

const SLIDES = [
  {
    label: "QCMetric eQMS Platform",
    headline: "AI-powered quality management for regulated industries",
    points: ["CAPA · Change Control · Deviations", "Dynamic Workflows & Forms", "Real-time KPIs & Audit Trail"],
    bg: "from-brand-teal/30 via-brand-blue/20 to-transparent",
    icon: "⚙️",
  },
  {
    label: "Compliance-First Engineering",
    headline: "Built for GxP, 21 CFR Part 11, ISO & GDPR",
    points: ["Audit-ready evidence packs", "Electronic signatures", "Inspection-grade documentation"],
    bg: "from-brand-accent/20 via-brand-tealDark/20 to-transparent",
    icon: "🛡️",
  },
  {
    label: "Global Regulated Industries",
    headline: "Trusted across Life Sciences, Marine, Mining & more",
    points: ["Life Sciences & Pharma", "Marine & Maritime", "Mining & Extraction"],
    bg: "from-brand-blue/30 via-brand-teal/10 to-transparent",
    icon: "🌐",
  },
];

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const { region } = useRegion();
  const r = REGION_DATA[region];

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide(s => (s + 1) % SLIDES.length);
  const current = SLIDES[slide];

  return (
    <section className="gradient-hero text-white">
      <div className="section relative grid lg:grid-cols-2 gap-10 items-center">

        {/* Left — copy */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal">
            <Sparkles size={14} /> Aurexa Technologies
          </span>
          <h1 className="h1 mt-4">
            Where <span className="text-brand-teal">Innovation</span> Meets <span className="text-brand-accent">Compliance</span>, and Technology Drives Growth.
          </h1>
          <p className="lede mt-6">
            Aurexa Technologies delivers enterprise digital platforms and managed services designed to simplify compliance, strengthen operational control, and improve quality outcomes across regulated industries.
          </p>
          <p className="mt-4 text-white/80 text-sm leading-relaxed">
            Our solutions help organizations establish fully auditable processes, streamline complex workflows, and gain real-time visibility into critical business operations.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow hover:brightness-110">
              <Calendar size={16} /> Book a Demo
            </Link>
            <Link href="#qcmetric" className="px-5 py-3 rounded-lg glass font-semibold hover:brightness-110">
              Explore Products
            </Link>
          </div>

          {/* Contact snippet */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
            <a href="mailto:contact@aurexatech.com" className="inline-flex items-center gap-1.5 hover:text-brand-teal transition-colors">
              <Mail size={14} /> contact@aurexatech.com
            </a>
            <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-teal transition-colors">
              <Phone size={14} /> {r.phone}
            </a>
          </div>
        </motion.div>

        {/* Right — scrolling banner */}
        <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className={`absolute inset-0 bg-gradient-to-br ${current.bg} backdrop-blur-sm p-8 flex flex-col justify-between`}
            >
              <div>
                <span className="text-4xl">{current.icon}</span>
                <p className="mt-3 text-xs uppercase tracking-widest text-brand-teal">{current.label}</p>
                <h3 className="mt-2 text-xl font-bold leading-snug">{current.headline}</h3>
              </div>
              <ul className="space-y-2">
                {current.points.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 size={15} className="text-brand-teal shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Slide controls */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
            <button onClick={prev} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Previous slide">
              <ChevronLeft size={16} />
            </button>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-brand-teal w-5" : "bg-white/40"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
            <button onClick={next} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Next slide">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Slide counter */}
          <div className="absolute top-4 right-4 text-xs text-white/50">{slide + 1} / {SLIDES.length}</div>
        </div>

      </div>
    </section>
  );
}
