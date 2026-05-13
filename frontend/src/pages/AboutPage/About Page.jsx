import React from 'react';
import HeroSection from './AboutHero';
import MissionSection from './MissionSection';
import HowItWorks from './HowItWork';
import CTASection from './CTASection';

export default function AboutPage() {
  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <main className="pb-24">
        <HeroSection />
        <MissionSection />
        <HowItWorks />
        <CTASection />
      </main>
    </div>
  );
}