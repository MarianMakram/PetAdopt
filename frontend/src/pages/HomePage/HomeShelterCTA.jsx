import React from 'react';

export default function HomeShelterCTA({ Hand }) {
  return (
    <section className="py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-[#00656f] rounded-xl relative p-12 md:p-24 overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -bottom-24 w-[600px] h-[600px] bg-[#89e9f6] opacity-10 rounded-full"></div>
        <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
          <img className="h-full w-full object-cover mix-blend-overlay opacity-50" src={Hand} alt="Hand holding paw" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-headline font-extrabold text-[#d4f9ff] leading-tight mb-8">
            Are you a Shelter or individual looking to <span className="text-[#89e9f6] italic">rehome</span>?
          </h2>
          <p className="text-[#89e9f6] text-lg leading-relaxed mb-12 opacity-90">
            Join our network of verified sanctuaries. We provide the platform, the audience, and the tools to find every animal their perfect forever home. Professional listing services at no cost to shelters.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#d4f9ff] text-[#00656f] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all">Register Your Shelter</button>
            <button className="border-2 border-[#d4f9ff] text-[#d4f9ff] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#d4f9ff] hover:text-[#00656f] transition-all">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}