"use client";
import { useState } from "react";
import { Boxes, ServerCog, Workflow } from "lucide-react";

const ITEMS = [
  { 
    icon: Boxes, 
    title: "Industry-Focused Products", 
    body: "Aurexa Technologies develops intelligent, industry-focused digital products tailored for regulated and compliance-driven organizations. Our solutions are designed to help businesses modernize operations, strengthen quality processes, and maintain continuous regulatory readiness.",
    body2: "The company specializes in AI-powered platforms, eQMS solutions, workflow automation, and scalable digital systems that help organizations improve compliance, operational efficiency, and audit readiness across industries.",
    gradient: "bg-gradient-to-br from-brand-blue/10 to-brand-blueDark/5",
    iconBg: "bg-brand-blue/20",
    iconColor: "text-brand-blue",
    buttonColor: "text-brand-blue hover:text-brand-blueDark",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },
  { 
    icon: ServerCog, 
    title: "Secure Hosting & Managed Services", 
    body: "Aurexa Technologies provides secure, enterprise-grade hosting and managed services designed for performance, compliance, and business continuity. Our infrastructure is built to support highly regulated environments with a strong focus on security, availability, and operational resilience.",
    bullets: [
      "Secure cloud hosting environments",
      "High availability and scalable infrastructure",
      "Automated backup and disaster recovery",
      "End-to-end encryption and data protection",
      "24/7 system monitoring and proactive support",
      "Compliance-focused operational governance",
      "Access control and security management",
      "Continuous performance optimization"
    ],
    footer: "Through proactive monitoring, risk management, and compliance-aligned operational controls, we help organizations maintain reliable, secure, and audit-ready systems throughout the entire solution lifecycle.",
    gradient: "bg-gradient-to-br from-brand-teal/10 to-brand-tealDark/5",
    iconBg: "bg-brand-teal/20",
    iconColor: "text-brand-tealDark",
    buttonColor: "text-brand-tealDark hover:text-brand-teal",
    image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },
  { 
    icon: Workflow, 
    title: "End-to-end IT Services", 
    body: "Aurexa Technologies delivers comprehensive IT services that support organizations throughout their digital transformation journey. We combine technical expertise with compliance-focused execution to ensure reliable, scalable, and validated solutions for regulated industries.",
    bullets: [
      "System integration services",
      "Data migration and modernization",
      "Custom application development",
      "Platform implementation and configuration",
      "Computer system validation (CSV) support",
      "Compliance and quality-focused consulting",
      "Application maintenance and technical support",
      "Process automation and optimization"
    ],
    gradient: "bg-gradient-to-br from-brand-accent/10 to-purple-500/5",
    iconBg: "bg-brand-accent/20",
    iconColor: "text-brand-accent",
    buttonColor: "text-brand-accent hover:text-purple-700",
    image: "https://images.pexels.com/photos/3861951/pexels-photo-3861951.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },
];

export default function WhatWeDo() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="section">
      <h2 className="h2 font-bold">What we do</h2>
      <p className="text-black mt-2 max-w-2xl leading-relaxed font-bold">A short, scannable view of our value to regulated organisations.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {ITEMS.map(({ icon: Icon, title, body, body2, bullets, footer, gradient, iconBg, iconColor, image }, index) => (
          <div 
            key={title}
            className="h-96"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setFlipped(index)}
            onMouseLeave={() => setFlipped(null)}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: flipped === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 border-slate-300 overflow-hidden shadow-lg group"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Animated background image with Ken Burns effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    style={{ animation: 'kenBurns 20s ease-in-out infinite alternate' }}
                  />
                </div>
                {/* Darker overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className={`absolute inset-0 ${gradient} opacity-20 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className={`w-16 h-16 rounded-xl ${iconBg} ${iconColor} grid place-items-center shadow-lg backdrop-blur-sm bg-white/90`}>
                    <Icon size={28} />
                  </div>
                  {/* Enhanced text container with backdrop blur */}
                  <div className="mt-4 backdrop-blur-sm bg-black/30 px-6 py-3 rounded-xl border border-white/30 shadow-2xl">
                    <h3 className="font-bold text-2xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-wide">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* Back Side */}
              <div 
                className={`absolute inset-0 rounded-2xl border-2 border-slate-300 overflow-hidden shadow-lg ${gradient} p-6 flex flex-col`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${iconBg} ${iconColor} grid place-items-center shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{title}</h3>
                </div>
                <div className="overflow-y-auto flex-1 space-y-2">
                  <p className="text-slate-800 text-xs leading-relaxed font-bold">{body}</p>
                  {body2 && <p className="text-slate-800 text-xs leading-relaxed font-bold">{body2}</p>}
                  {bullets && (
                    <>
                      <p className="text-slate-900 text-xs font-semibold mt-2 font-bold">Our {title.includes('Services') ? 'managed services' : 'services'} include:</p>
                      <ul className="text-slate-800 text-xs space-y-1 leading-relaxed font-bold">
                        {bullets.map(b => <li key={b}>▸ {b}</li>)}
                      </ul>
                    </>
                  )}
                  {footer && <p className="text-slate-800 text-xs leading-relaxed mt-2 font-bold">{footer}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
