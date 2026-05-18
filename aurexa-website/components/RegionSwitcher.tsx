"use client";
import { useRegion, Region } from "./RegionContext";
import { Globe } from "lucide-react";

const REGIONS: Region[] = ["USA", "Europe", "Middle East", "India"];

export default function RegionSwitcher() {
  const { region, setRegion } = useRegion();
  return (
    <label className="inline-flex items-center gap-2 text-sm text-black">
      <Globe size={16} aria-hidden="true" />
      <select
        className="bg-transparent border border-slate-300 rounded-md px-2 py-1 focus:outline-none"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
        aria-label="Select region"
      >
        {REGIONS.map(r => <option key={r}>{r}</option>)}
      </select>
    </label>
  );
}
