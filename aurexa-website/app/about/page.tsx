import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <h1 className="h1">About Aurexa Technologies</h1>
        <p className="lede mt-3 text-black max-w-3xl">Aurexa is a domain-first technology organization built to help regulated industries move beyond brittle, manual operations into a future of auditable, automated, and intelligent systems. We unite deep regulatory know-how with modern cloud engineering to deliver platforms that withstand inspection, accelerate compliance, and scale confidently with business growth.</p>
      </section>
      <About />
      <MissionVision />
    </>
  );
}
