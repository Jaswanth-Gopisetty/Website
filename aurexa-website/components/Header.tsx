"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/industries", label: "Industries" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Aurexa Technologies — Home">
            <Image
              src="/aurexa-logo.png"
              alt="Aurexa Technologies"
              width={220}
              height={64}
              priority
              className="h-14 sm:h-16 w-auto max-w-[220px]"
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-lg font-medium text-black">
            {NAV.map(n => <Link key={n.href} href={n.href} className="hover:text-brand-blue">{n.label}</Link>)}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/book-demo" className="px-6 py-3 rounded-lg bg-brand-blue text-white text-lg font-semibold hover:bg-brand-blueDark">Book a Demo</Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200 px-6 py-4 space-y-3">
            {NAV.map(n => <Link key={n.href} href={n.href} className="block text-lg">{n.label}</Link>)}
            <Link href="/book-demo" className="block w-full text-center py-2.5 rounded-lg bg-brand-blue text-white text-lg">Book a Demo</Link>
          </div>
        )}
      </header>
      <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-brand-blue/30 via-brand-teal/25 to-brand-blue/30 backdrop-blur-md border-b border-brand-blue/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 text-center">
          <h2 className="text-sm md:text-base font-semibold text-brand-blueDark">
            We take the opportunity to analyse and develop innovative solutions for regulated industries
          </h2>
        </div>
      </div>
    </>
  );
}
