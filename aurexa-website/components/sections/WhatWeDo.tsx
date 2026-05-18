"use client";
import { useState } from "react";
import { Boxes, ServerCog, Workflow, ChevronDown, ChevronUp } from "lucide-react";

const ITEMS = [
  { 
    icon: Boxes, 
    title: "Industry-Focused Products", 
    body: "Aurexa Technologies develops intelligent, industry-focused digital products tailored for regulated and compliance-driven organizations. Our solutions are designed to help businesses modernize operations, strengthen quality processes, and maintain continuous regulatory readiness.",
    body2: "The company specializes in AI-powered platforms, eQMS solutions, workflow automation, and scalable digital systems that help organizations improve compliance, operational efficiency, and audit readiness across industries."
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
    footer: "Through proactive monitoring, risk management, and compliance-aligned operational controls, we help organizations maintain reliable, secure, and audit-ready systems throughout the entire solution lifecycle."
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
    ]
  },
];

export default function WhatWeDo() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  
  const toggleCard = (index: number) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="section">
      <h2 className="h2">What we do</h2>
      <p className="text-black mt-2 max-w-2xl leading-relaxed">A short, scannable view of our value to regulated organisations.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {ITEMS.map(({ icon: Icon, title, body, body2, bullets, footer }, index) => {
          const isExpanded = expanded[index];
          const hasMoreContent = body2 || bullets || footer;
          
          return (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue grid place-items-center">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-semibold text-lg text-slate-900">{title}</h3>
              <p className="text-black mt-2 text-sm leading-relaxed">{body}</p>
              
              {isExpanded && (
                <>
                  {body2 && <p className="text-black mt-2 text-sm leading-relaxed">{body2}</p>}
                  {bullets && (
                    <>
                      <p className="text-black mt-3 text-sm font-medium">Our {title.includes('Services') ? 'managed services' : 'services'} include:</p>
                      <ul className="mt-2 text-black text-sm space-y-1.5 leading-relaxed">
                        {bullets.map(b => <li key={b} className="leading-relaxed">• {b}</li>)}
                      </ul>
                    </>
                  )}
                  {footer && <p className="text-black mt-3 text-sm leading-relaxed">{footer}</p>}
                </>
              )}
              
              {hasMoreContent && (
                <button
                  onClick={() => toggleCard(index)}
                  className="mt-4 flex items-center gap-1.5 text-brand-blue text-sm font-medium hover:text-brand-blueDark transition-colors"
                >
                  {isExpanded ? (
                    <>
                      See less <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      See more <ChevronDown size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
