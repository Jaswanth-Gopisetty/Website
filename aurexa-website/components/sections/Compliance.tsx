const ROWS = [
  ["GxP",                    "Full"],
  ["FDA 21 CFR Part 11",     "E-signatures, audit trail, time-stamped records"],
  ["EU Annex 11",            "Computerised systems controls"],
  ["ISO 9001 / 13485",       "Document control, CAPA, change control"],
  ["GDPR",                   "Data residency, consent, erasure"],
  ["HIPAA",                  "Access controls, audit logging"],
  ["GAMP 5",                 "Validation-ready packages"],
];

export default function Compliance() {
  return (
    <section className="bg-brand-surface">
      <div className="section">
        <h2 className="h2">Compliance coverage</h2>
        <p className="text-black mt-2 max-w-2xl">Inspector-ready evidence packs for the regulations our customers face every day.</p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-blueDark text-white">
              <tr><th className="text-left px-5 py-3">Standard</th><th className="text-left px-5 py-3">Coverage</th></tr>
            </thead>
            <tbody>
              {ROWS.map(([s, c]) => (
                <tr key={s} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium">{s}</td>
                  <td className="px-5 py-3 text-black">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
