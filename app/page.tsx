import { Suspense } from "react";
import ComingSoon from "./components/ComingSoon";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Hospitals from "./components/Hospitals";
import HowItWorks from "./components/HowItWorks";
import Network from "./components/Network";
import Specialties from "./components/Specialties";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen bg-[#eaf7f5]" />}>
        <Hero />
        <Network />
        <HowItWorks />
        <Features />
        <ComingSoon />
        <Specialties />
        <Hospitals />
      </Suspense>
    </main>
  );
}
