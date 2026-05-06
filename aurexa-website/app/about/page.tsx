import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <h1 className="h1">About Aurexa Technologies</h1>
        <p className="lede mt-3 text-slate-600 max-w-3xl">A domain-first technology firm helping regulated and adjacent industries replace brittle manual processes with auditable, automated systems.</p>
      </section>
      <About />
      <MissionVision />
    </>
  );
}
