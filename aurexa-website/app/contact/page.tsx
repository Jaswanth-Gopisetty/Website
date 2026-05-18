"use client";
import { useState } from "react";
import { useRegion, REGION_DATA } from "@/components/RegionContext";

export default function ContactPage() {
  const { region } = useRegion();
  const r = REGION_DATA[region];
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ type: "Sales", name: "", email: "", message: "" });
  const [attachment, setAttachment] = useState<File | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(data.reference);
        setForm({ type: "Sales", name: "", email: "", message: "" });
        setAttachment(null);
      } else {
        setError("Failed to send message. Please try again or email us directly.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Contact Aurexa</h1>
        <div className="mt-4 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
          <p className="text-xl font-semibold text-slate-900 leading-relaxed">
            Sales, Support, Careers or Partnership - pick a queue and we&apos;ll route it.
          </p>
        </div>
        <ul className="mt-6 space-y-3 text-black leading-relaxed">
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
        <label className="text-sm font-medium">
          Attachment <span className="text-slate-400 font-normal">(optional)</span>
          <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" onChange={e => setAttachment(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-blueDark cursor-pointer" />
        </label>
        <button 
          type="submit" 
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blueDark disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? "Sending..." : "Send message"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {submitted && <p className="text-sm text-emerald-600">Thanks! Reference: <strong>{submitted}</strong>. SLA: Sales 1–2 business days · Support ≤ 4 hours for critical.</p>}
      </form>
    </section>
  );
}
