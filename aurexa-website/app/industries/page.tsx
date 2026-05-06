import Industries from "@/components/sections/Industries";

export default function IndustriesPage() {
  return (
    <>
      <section className="section">
        <h1 className="h1">Industries</h1>
        <p className="lede mt-3 text-slate-600 max-w-3xl">Pre-validated industry packs for rapid deployment — Life Sciences, Marine, Mining and more.</p>
      </section>
      <Industries />
    </>
  );
}
