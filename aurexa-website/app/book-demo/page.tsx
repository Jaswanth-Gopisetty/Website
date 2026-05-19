"use client";
import { useState, useMemo, useEffect } from "react";
import { useRegion, REGION_DATA, Region } from "@/components/RegionContext";
import { Calendar, CheckCircle2, ChevronRight, ChevronLeft, User, Mail, Building2, Layers, Loader2 } from "lucide-react";

const INDUSTRIES = [
  "Life Sciences",
  "Pharmaceuticals",
  "Biotechnology",
  "Medical Devices",
  "Healthcare",
  "Manufacturing",
  "Clinical Research",
  "Marine",
  "Mining",
  "Regulatory & Compliance-driven Enterprises",
  "Other"
] as const;

const REGION_WINDOWS: Record<Region, string[]> = {
  "USA":         ["Mon–Fri  09:00 – 10:00 CT", "Mon–Fri  14:00 – 15:00 CT", "Mon–Fri  16:00 – 17:00 CT"],
  "Europe":      ["Mon–Fri  09:00 – 10:00 GMT", "Mon–Fri  13:00 – 14:00 GMT", "Mon–Fri  15:00 – 16:00 GMT"],
  "Middle East": ["Sun–Thu  10:00 – 11:00 GST", "Sun–Thu  13:00 – 14:00 GST", "Sun–Thu  15:00 – 16:00 GST"],
  "India":       ["Mon–Sat  10:00 – 11:00 IST", "Mon–Sat  14:00 – 15:00 IST", "Mon–Sat  16:00 – 17:00 IST"],
};

type FormData = {
  name: string; email: string; org: string; industry: string;
  customIndustry: string; date: string; window: string; note: string;
};

const EMPTY: FormData = { name: "", email: "", org: "", industry: "", customIndustry: "", date: "", window: "", note: "" };

export default function BookDemoPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [availability, setAvailability] = useState<Record<string, { available: number; total: number }>>({});
  const [dynamicWindows, setDynamicWindows] = useState<string[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const { region } = useRegion();
  const windows = REGION_WINDOWS[region];
  const ref = useMemo(() => "AUS-" + Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  const set = (k: keyof FormData, v: string) => setData(s => ({ ...s, [k]: v }));

  const step1Valid = data.name.trim() && data.email.trim() && data.org.trim() && data.industry && (data.industry !== "Other" || data.customIndustry.trim());
  const step2Valid = data.date && data.window;

  // Fetch availability when date changes
  useEffect(() => {
    if (data.date && region) {
      setCheckingAvailability(true);
      setAvailability({});
      setDynamicWindows([]);
      
      // Reset selected window if date changes
      setData(prev => ({ ...prev, window: "" }));

      fetch("/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: data.date, region }),
      })
        .then(res => res.json())
        .then(result => {
          if (result.success && result.availability) {
            setAvailability(result.availability);
            if (result.windows) {
              setDynamicWindows(result.windows);
            }
          }
        })
        .catch(err => console.error("Failed to check availability:", err))
        .finally(() => setCheckingAvailability(false));
    }
  }, [data.date, region]);

  const handleBooking = async () => {
    setLoading(true);
    setError("");
    setWarning("");
    
    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          org: data.org,
          industry: data.industry,
          customIndustry: data.customIndustry,
          date: data.date,
          window: data.window,
          note: data.note,
          region,
          reference: ref,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to complete booking");
      }

      // Store warning if email wasn't sent
      if (result.warning) {
        setWarning(result.warning);
      }

      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-teal font-semibold">
          <Calendar size={14} /> Book a Demo
        </span>
        <h1 className="text-3xl font-bold text-black mt-2">See QCMetric in Action</h1>
        <div className="mt-6 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
          <p className="text-xl font-semibold text-slate-900 leading-relaxed">
            Book a short 30–45 minute walkthrough tailored to your industry and compliance needs. We&apos;ll prepare a sandbox demo aligned to your samples and compliance model.
          </p>
        </div>
      </div>

      {/* Step indicator */}
      {step < 4 && (
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step > n ? "bg-brand-teal text-brand-blueDark" : step === n ? "bg-brand-blue text-white" : "bg-slate-200 text-slate-500"
              }`}>
                {step > n ? <CheckCircle2 size={16} /> : n}
              </div>
              <span className={`text-sm hidden sm:inline ${step === n ? "font-semibold text-black" : "text-slate-400"}`}>
                {n === 1 ? "Your details" : n === 2 ? "Date & time" : "Confirm"}
              </span>
              {n < 3 && <div className="w-8 h-px bg-slate-300 mx-1" />}
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-8">

        {/* Step 1 — Contact details + Industry */}
        {step === 1 && (
          <div className="grid gap-5">
            <h2 className="text-lg font-bold text-black">Contact details &amp; Industry</h2>
            <Field icon={<User size={16} />} label="Full name" required>
              <input value={data.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith"
                className="field-input" required />
            </Field>
            <Field icon={<Mail size={16} />} label="Work email" required>
              <input type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="jane@company.com"
                className="field-input" required />
            </Field>
            <Field icon={<Building2 size={16} />} label="Organization" required>
              <input value={data.org} onChange={e => set("org", e.target.value)} placeholder="Acme Pharma Ltd"
                className="field-input" required />
            </Field>
            <Field icon={<Layers size={16} />} label="Industry" required>
              <select
                value={data.industry}
                onChange={e => {
                  const val = e.target.value;
                  set("industry", val);
                  if (val !== "Other") set("customIndustry", "");
                }}
                title="Select your industry"
                className="field-input"
                required
              >
                <option value="">Select an industry</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              {data.industry === "Other" && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={data.customIndustry}
                    onChange={e => set("customIndustry", e.target.value)}
                    placeholder="Enter your industry name"
                    className="field-input"
                    required
                  />
                </div>
              )}
            </Field>
            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold disabled:opacity-40 hover:bg-brand-blueDark transition"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2 — Date/time + note */}
        {step === 2 && (
          <div className="grid gap-5">
            <h2 className="text-lg font-bold text-black">Preferred date &amp; time</h2>
            <p className="text-sm text-slate-500">
              {data.date 
                ? `Showing real-time seat availability for ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} in the ${region} region. Each session has 100 seats.`
                : `Select a date to view available time slots for the ${region} region. Change region using the selector in the header.`
              }
            </p>

            <Field label="Preferred date" required>
              <input type="date" value={data.date} min={new Date().toISOString().split("T")[0]}
                title="Preferred date" placeholder="Select a date"
                onChange={e => set("date", e.target.value)} className="field-input" required />
            </Field>

            <div>
              <label className="text-sm font-medium text-black">Available time windows <span className="text-red-500">*</span></label>
              
              {!data.date && (
                <p className="mt-2 text-sm text-slate-500 italic">Please select a date first to see available time slots</p>
              )}
              
              {data.date && checkingAvailability && (
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Checking availability...</span>
                </div>
              )}
              
              {data.date && !checkingAvailability && dynamicWindows.length > 0 && (
                <>
                  <div className="mt-2 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-blue-900">Total Capacity:</span>
                      <span className="text-blue-700">
                        {dynamicWindows.reduce((sum, w) => sum + (availability[w]?.available || 0), 0)} seats available across {dynamicWindows.length} sessions
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {dynamicWindows.map(w => {
                      const slotInfo = availability[w];
                      const isAvailable = slotInfo && slotInfo.available > 0;
                      const isSelected = data.window === w;
                      const availableSeats = slotInfo?.available || 0;
                      const totalSeats = slotInfo?.total || 100;
                      const percentAvailable = (availableSeats / totalSeats) * 100;
                      
                      // Determine badge color based on availability
                      let badgeClass = "bg-emerald-100 text-emerald-700";
                      let statusText = `${availableSeats} seats left`;
                      
                      if (availableSeats === 0) {
                        badgeClass = "bg-red-100 text-red-700";
                        statusText = "Fully Booked";
                      } else if (percentAvailable <= 20) {
                        badgeClass = "bg-orange-100 text-orange-700";
                        statusText = `Only ${availableSeats} left!`;
                      } else if (percentAvailable <= 50) {
                        badgeClass = "bg-yellow-100 text-yellow-700";
                        statusText = `${availableSeats} seats left`;
                      }
                      
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => isAvailable && set("window", w)}
                          disabled={!isAvailable}
                          className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected
                              ? "bg-brand-blue text-white border-brand-blue"
                              : isAvailable
                              ? "border-slate-300 text-black hover:border-brand-blue hover:bg-slate-50"
                              : "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-left flex-1">{w}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ml-3 whitespace-nowrap ${isSelected ? "bg-white/20 text-white" : badgeClass}`}>
                              {statusText}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-black">Short note / current tools <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea rows={3} value={data.note} onChange={e => set("note", e.target.value)}
                placeholder="e.g. Currently using paper SOPs, looking to validate our eQMS…"
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 px-5 py-3 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50 transition">
                <ChevronLeft size={15} /> Back
              </button>
              <button
                onClick={handleBooking}
                disabled={!step2Valid || loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold disabled:opacity-40 hover:bg-brand-blueDark transition"
              >
                {loading ? "Booking..." : "Confirm booking"} {!loading && <ChevronRight size={16} />}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-black">You&apos;re booked, {data.name.split(" ")[0] || "there"}!</h2>
            
            {warning ? (
              <div className="mt-4 mx-auto max-w-md">
                <p className="text-black mb-2">
                  Your booking has been confirmed with reference <strong>{ref}</strong>.
                </p>
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  <p className="font-medium">Note: {warning}</p>
                  <p className="mt-1">Please save your booking reference and contact us at <a href="mailto:demos@aurexatech.com" className="underline">demos@aurexatech.com</a> if you don&apos;t hear from us within 1 business day.</p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-black">
                A calendar invite and demo prep questionnaire have been sent to <strong>{data.email}</strong>.
              </p>
            )}

            <div className="mt-6 rounded-xl border border-slate-200 bg-brand-surface p-5 text-left space-y-2 text-sm text-black">
              <Row label="Organization"  value={data.org} />
              <Row label="Industry"      value={data.industry === "Other" ? data.customIndustry : data.industry} />
              <Row label="Date"          value={data.date} />
              <Row label="Time window"   value={data.window} />
              <Row label="Region"        value={region} />
              {data.note && <Row label="Note" value={data.note} />}
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Reference: <strong className="text-black">{ref}</strong> · Our team will confirm within 1 business day.
            </p>
          </div>
        )}
      </div>

      {/* Contact fallback */}
      <p className="mt-5 text-sm text-center text-slate-500">
        Prefer to reach out directly?{" "}
        <a href="mailto:contact@aurexatech.com" className="text-brand-blue hover:underline">contact@aurexatech.com</a>
      </p>
    </section>
  );
}

function Field({ icon, label, required, children }: { icon?: React.ReactNode; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-black mb-1">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-medium w-28 shrink-0">{label}:</span>
      <span className="text-slate-700">{value}</span>
    </div>
  );
}
