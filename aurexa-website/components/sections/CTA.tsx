import Link from "next/link";

export default function CTA() {
  return (
    <section className="section">
      <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-tealDark text-white p-10 md:p-14 text-center">
        <h2 className="h2">Ready to make compliance your velocity advantage?</h2>
        <p className="lede mt-3 text-slate-200">Book a 30–45 min walkthrough tailored to your industry and compliance model.</p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link href="/book-demo" className="px-5 py-3 rounded-lg bg-brand-teal text-brand-blueDark font-semibold shadow-glow">Book a Demo</Link>
          <Link href="/contact" className="px-5 py-3 rounded-lg glass font-semibold">Talk to Sales</Link>
        </div>
      </div>
    </section>
  );
}
