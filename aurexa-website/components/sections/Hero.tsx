"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Mail, Phone, Calendar, Pause, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegion, REGION_DATA } from "@/components/RegionContext";

const SLIDES = [
  {
    headline: "Where Innovation Meets Compliance, and Technology Drives Growth.",
    description: "Aurexa Technologies delivers enterprise digital platforms and managed services designed to simplify compliance, strengthen operational control, and improve quality outcomes across regulated industries.",
    bg: "from-brand-blue/40 via-brand-teal/20 to-brand-blueDark/60",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop", // Technology/Innovation
  },
  {
    headline: "Fully Auditable Processes & Real-Time Visibility",
    description: "Our solutions help organizations establish fully auditable processes, streamline complex workflows, and gain real-time visibility into critical business operations. By combining compliance-focused architecture with scalable cloud technologies, we enable businesses to manage quality, documentation, training, approvals, and regulatory requirements through a secure and centralized ecosystem.",
    bg: "from-brand-teal/40 via-brand-blue/20 to-brand-tealDark/60",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop", // Business/Workflow
  },
  {
    headline: "Empowering Regulated Industries",
    description: "At Aurexa Technologies, we empower regulated industries with intelligent digital platforms and managed services that drive compliance, operational excellence, and business transformation. Our enterprise-grade solutions are designed to simplify complex regulatory processes, enhance quality management, and provide organizations with complete visibility and control across critical operations.",
    bg: "from-brand-accent/40 via-brand-blue/20 to-brand-blueDark/60",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop", // Corporate/Buildings
  },
  {
    headline: "Scalable, Secure & Compliance-Driven Platforms",
    description: "We specialize in delivering scalable, secure, and compliance-driven platforms that help businesses automate workflows, maintain data integrity, and achieve continuous regulatory readiness. From quality management and document control to training, approvals, audits, and compliance tracking, our solutions create a centralized digital ecosystem that supports efficiency, transparency, and accountability.",
    bg: "from-brand-tealDark/40 via-brand-blue/20 to-brand-blueDark/60",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop", // Security/Tech
  },
  {
    headline: "Innovation & Industry Best Practices",
    description: "With a strong focus on innovation and industry best practices, Aurexa Technologies enables organizations to modernize legacy processes, reduce operational risk, and accelerate decision-making through real-time insights and intelligent automation.",
    bg: "from-brand-blue/40 via-brand-accent/20 to-brand-tealDark/60",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop", // Analytics/Data
  },
];

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { region } = useRegion();
  const r = REGION_DATA[region];

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, [isPaused]);

  const prev = () => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide(s => (s + 1) % SLIDES.length);
  const togglePause = () => setIsPaused(p => !p);
  const current = SLIDES[slide] ?? SLIDES[0];

  return (
    <section className="gradient-hero text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.imageUrl})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${current.bg}`} />
        </motion.div>
      </AnimatePresence>

      <div className="section relative z-10 flex items-center min-h-[600px]">
        {/* Rotating Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-brand-blueDark/60 p-8 rounded-2xl border border-white/20 shadow-2xl max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal font-bold drop-shadow-lg">
              <Sparkles size={14} /> Aurexa Technologies
            </span>
            <h1 className="h1 mt-4 text-white drop-shadow-lg">
              {current.headline}
            </h1>
            <p className="lede mt-6 text-white leading-relaxed drop-shadow-md">
              {current.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow hover:brightness-110 transition-all hover:scale-105">
                <Calendar size={16} /> Book a Demo
              </Link>
              <Link href="/products" className="px-5 py-3 rounded-lg glass font-semibold text-white hover:brightness-110 transition-all hover:scale-105 border border-white/30">
                Explore Products
              </Link>
            </div>

            {/* Contact snippet */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white drop-shadow-md">
              <a href="mailto:contact@aurexatech.com" className="inline-flex items-center gap-1.5 hover:text-brand-teal transition-colors font-medium">
                <Mail size={14} /> contact@aurexatech.com
              </a>
              <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-teal transition-colors font-medium">
                <Phone size={14} /> {r.phone}
              </a>
              <a href="tel:+917700006639" className="inline-flex items-center gap-1.5 hover:text-brand-teal transition-colors font-medium">
                <Phone size={14} /> +91 77000 06639
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Banner Controls — Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-3">
        {/* Slide controls */}
        <div className="flex items-center gap-2 bg-brand-blueDark/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <button onClick={prev} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Previous slide">
            <ChevronLeft size={16} />
          </button>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-brand-teal w-6" : "bg-white/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <button onClick={next} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Next slide">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Counter and Play/Pause */}
        <div className="flex items-center gap-2">
          {/* Slide counter */}
          <div className="bg-brand-blueDark/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-xl font-bold text-brand-teal">{slide + 1}</span>
            <span className="text-white/60 text-sm"> / {SLIDES.length}</span>
          </div>

          {/* Pause/Play button */}
          <button 
            onClick={togglePause}
            className="p-2 rounded-full bg-brand-blueDark/70 backdrop-blur-md hover:bg-brand-teal/80 transition border border-white/20"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
}
