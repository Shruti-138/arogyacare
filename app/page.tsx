import { Suspense } from "react";
import Hero from "./components/Hero";
import Specialties from "./components/Specialties";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen bg-[#eaf7f5]" />}>
        <Hero />
        <Specialties />
      </Suspense>
    </main>
  );
}
