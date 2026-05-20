"use client";
import { useState } from "react";
import { Target, Eye, ChevronDown, ChevronUp } from "lucide-react";

const CARDS = [
  {
    id: 'mission',
    title: 'Mission',
    icon: Target,
    gradient: 'from-brand-blue/10 to-brand-blueDark/5',
    iconBg: 'bg-brand-blue/20',
    iconColor: 'text-brand-blue',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    currentText: 'To empower regulated organizations to adopt digital workflows confidently through reliable, compliant and scalable solutions that improve quality, efficiency and cross-team collaboration.',
    futureText: 'To evolve Qcmetric and the Aurexa ecosystem into a predictive quality intelligence platform: Integrating automated controls, AI-driven risk indicators, and cross-system intelligence so compliance moves from checklist to continuous assurance.',
    hasExpand: true
  },
  {
    id: 'vision',
    title: 'Vision',
    icon: Eye,
    gradient: 'from-brand-teal/10 to-brand-tealDark/5',
    iconBg: 'bg-brand-teal/20',
    iconColor: 'text-brand-tealDark',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
    currentText: 'To help organizations achieve operational excellence and regulatory confidence through innovative, intelligent, and compliant digital transformation solutions.',
    hasExpand: false
  }
];

export default function MissionVision() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [expandedMission, setExpandedMission] = useState(false);

  return (
    <section className="bg-brand-surface">
      <div className="section grid md:grid-cols-2 gap-8">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="h-96 cursor-pointer"
              style={{ perspective: '1000px' }}
              onMouseEnter={() => setFlipped(card.id)}
              onMouseLeave={() => setFlipped(null)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped === card.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Face */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-3xl font-bold text-white drop-shadow-lg">{card.title}</h3>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} p-8 border border-slate-200 overflow-y-auto`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${card.iconBg} grid place-items-center`}>
                    <Icon className={card.iconColor} size={24} />
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{card.title}</h3>
                  {card.hasExpand ? (
                    <>
                      <p className="text-black mt-3 leading-relaxed">
                        <strong>Current Mission —</strong> {card.currentText}
                      </p>
                      {expandedMission && (
                        <p className="text-black mt-3 leading-relaxed">
                          <strong>Future Scope —</strong> {card.futureText}
                        </p>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedMission(!expandedMission);
                        }}
                        className="mt-4 text-brand-blue hover:text-brand-blueDark font-medium text-sm flex items-center gap-1 transition-colors"
                      >
                        {expandedMission ? (
                          <>See less <ChevronUp size={16} /></>
                        ) : (
                          <>See more <ChevronDown size={16} /></>
                        )}
                      </button>
                    </>
                  ) : (
                    <p className="text-black mt-3 leading-relaxed">{card.currentText}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
