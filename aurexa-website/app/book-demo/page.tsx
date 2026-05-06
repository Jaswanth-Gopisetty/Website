"use client";
import { useState } from "react";

const INDUSTRIES = ["Life Sciences", "Marine", "Mining", "Other"];

export default function BookDemoPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "", org: "", industry: "Life Sciences", date: "", note: "" });

  const update = (k: string, v: string) => setData(s => ({ ...s, [k]: v }));

  return (
    <section className="section max-w-2xl">
      <h1 className="h1">Book a demo</h1>
      <p className="lede mt-2 text-slate-600">A 30–45 min walkthrough tailored to your industry and compliance model.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8">
        {step === 1 && (
          <div className="grid gap-4">
            <Input label="Full name"     value={data.name}  onChange={v => update("name", v)} />
            <Input label="Work email"    type="email" value={data.email} onChange={v => update("email", v)} />
            <Input label="Organization"  value={data.org}   onChange={v => update("org", v)} />
            <label className="text-sm font-medium">Industry
              <select value={data.industry} onChange={e => update("industry", e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2">
                {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
              </select>
            </label>
            <button onClick={() => setStep(2)} className="mt-3 px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold">Next</button>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4">
            <Input label="Preferred date & time" type="datetime-local" value={data.date} onChange={v => update("date", v)} />
            <label className="text-sm font-medium">Short note / current tools
              <textarea rows={4} value={data.note} onChange={e => update("note", e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
            </label>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-lg border border-slate-300">Back</button>
              <button onClick={() => setStep(3)} className="px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold">Confirm</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="text-5xl">✅</div>
            <h2 className="mt-4 text-xl font-bold">Thank you, {data.name || "there"}!</h2>
            <p className="mt-2 text-slate-600">We&apos;ve sent a calendar invite and a short prep questionnaire to <strong>{data.email}</strong>.</p>
            <p className="mt-1 text-xs text-slate-500">Reference: AUS-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="text-sm font-medium">
      {label}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
    </label>
  );
}
