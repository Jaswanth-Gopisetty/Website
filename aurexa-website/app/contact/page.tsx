"use client";
import { useState } from "react";
import { useRegion, REGION_DATA } from "@/components/RegionContext";

export default function ContactPage() {
  const { region } = useRegion();
  const r = REGION_DATA[region];
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [form, setForm] = useState({ type: "Sales", name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted("AUS-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  };

  return (
    <section className="section grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="h1">Contact Aurexa</h1>
        <p className="lede mt-2 text-black">Sales, Support, Careers or Partnership — pick a queue and we&apos;ll route it.</p>
        <ul className="mt-6 space-y-3 text-black">
          <li><strong>Email (Sales):</strong> contact@aurexatech.com</li>
          <li><strong>Email (Support):</strong> support@aurexatech.com</li>
          <li><strong>Phone ({region}):</strong> {r.phone}</li>
          <li><strong>Office:</strong> {r.address}</li>
          <li><strong>Hours:</strong> {r.hours}</li>
          <li><strong>Compliance focus:</strong> {r.compliance}</li>
        </ul>
      </div>
      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-8 grid gap-4">
        <label className="text-sm font-medium">Query type
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2">
            <option>Sales</option><option>Support</option><option>Careers</option><option>Partnership</option>
          </select>
        </label>
        <label className="text-sm font-medium">Name
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm font-medium">Email
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm font-medium">Message
          <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2" />
        </label>
        <button type="submit" className="px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold">Send message</button>
        {submitted && <p className="text-sm text-emerald-600">Thanks! Reference: <strong>{submitted}</strong>. SLA: Sales 1–2 business days · Support ≤ 4 hours for critical.</p>}
      </form>
    </section>
  );
}
