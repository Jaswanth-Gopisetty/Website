"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Region = "USA" | "Europe" | "Middle East" | "India";

interface Ctx { region: Region; setRegion: (r: Region) => void; }
const RegionCtx = createContext<Ctx>({ region: "USA", setRegion: () => {} });

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("USA");
  return <RegionCtx.Provider value={{ region, setRegion }}>{children}</RegionCtx.Provider>;
}
export const useRegion = () => useContext(RegionCtx);

export const REGION_DATA: Record<Region, { phone: string; address: string; hours: string; compliance: string; }> = {
  "USA":         { phone: "+1 (555) 010-2025", address: "Austin, TX, USA",          hours: "Mon–Fri 9:00–18:00 CT",  compliance: "FDA 21 CFR Part 11 · HIPAA" },
  "Europe":      { phone: "+44 20 4525 1010",  address: "London, United Kingdom",   hours: "Mon–Fri 9:00–18:00 GMT", compliance: "EU Annex 11 · GDPR" },
  "Middle East": { phone: "+971 4 555 1010",   address: "Dubai, UAE",               hours: "Sun–Thu 9:00–18:00 GST", compliance: "GxP · ISO 27001" },
  "India":       { phone: "+91 40 4555 1010",  address: "Hyderabad, India",         hours: "Mon–Sat 9:30–18:30 IST", compliance: "CDSCO · GxP · ISO" },
};
