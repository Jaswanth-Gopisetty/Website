import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import USPCarousel from "@/components/sections/USPCarousel";
import UniqueFeatures from "@/components/sections/UniqueFeatures";
import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";
import Industries from "@/components/sections/Industries";
import ProductsPanel from "@/components/sections/ProductsPanel";
import QCMetricSpotlight from "@/components/sections/QCMetricSpotlight";
import Compliance from "@/components/sections/Compliance";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <USPCarousel />
      <UniqueFeatures />
      <ProductsPanel />
      <QCMetricSpotlight />
      <About />
      <MissionVision />
      <Industries />
      <Compliance />
      <CTA />
    </>
  );
}
