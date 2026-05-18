"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import RegionSwitcher from "./RegionSwitcher";

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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Aurexa Technologies — Home">
          <Image
            src="/aurexa-logo.png"
            alt="Aurexa Technologies"
            width={140}
            height={40}
            priority
            className="h-8 sm:h-9 w-auto max-w-[140px]"
            style={{ objectFit: 'contain' }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-black">
          {NAV.map(n => <Link key={n.href} href={n.href} className="hover:text-brand-blue">{n.label}</Link>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <RegionSwitcher />
          <Link href="/book-demo" className="px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blueDark">Book a Demo</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 px-6 py-4 space-y-3">
          {NAV.map(n => <Link key={n.href} href={n.href} className="block">{n.label}</Link>)}
          <RegionSwitcher />
          <Link href="/book-demo" className="block w-full text-center py-2 rounded-lg bg-brand-blue text-white">Book a Demo</Link>
        </div>
      )}
    </header>
  );
}
