import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";
import QCMetricCard from "@/components/sections/QCMetricCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <QCMetricCard />
      <About />
      <MissionVision />
    </>
  );
}
