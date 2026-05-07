import Link from "next/link";
import Image from "next/image";
import { Linkedin, Youtube, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-blueDark text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3 bg-white rounded-lg px-3 py-2 w-fit">
            <Image
              src="/aurexa-logo.png"
              alt="Aurexa Technologies"
              width={140}
              height={40}
              className="h-8 sm:h-9 w-auto max-w-[140px]"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className="text-sm">Where innovation meets compliance, and technology drives growth.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/qc-metric">QC Metric (eQMS)</Link></li>
            <li><Link href="/products#dms">Document Management</Link></li>
            <li><Link href="/products#tms">Training Management</Link></li>
            <li><Link href="/products#cms">Content Management</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow us</h4>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
            <a href="#" aria-label="X"><Twitter size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          </div>
          <p className="mt-3 text-xs">Updates · Regulatory guidance · Case studies.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 text-xs flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Aurexa Technologies. All rights reserved.</span>
          <span>QC Metric™ is a trademark of Aurexa Technologies.</span>
        </div>
      </div>
    </footer>
  );
}
