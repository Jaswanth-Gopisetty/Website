import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-blueDark text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="mb-3">
            <Image
              src="/aurexa-logo.png"
              alt="Aurexa Technologies"
              width={220}
              height={64}
              className="h-14 sm:h-16 w-auto max-w-[220px]"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className="text-sm">Where innovation meets compliance, and technology drives growth.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/industries">Industries</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/book-demo">Book a Demo</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow us</h4>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/company/aurexa-technologies-pvt-ltd/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="https://www.facebook.com/profile.php?id=61584510448468" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/aurexatechnologies/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
          <p className="mt-3 text-xs text-white/70">Follow Aurexa for product updates, regulatory guidance and case studies.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 text-xs flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Aurexa Technologies. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
