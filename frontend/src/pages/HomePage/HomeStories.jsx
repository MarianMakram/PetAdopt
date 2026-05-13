import React from 'react';

export default function HomeStories({ Walking }) {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-[#9b3e20] font-bold uppercase tracking-[0.2em] text-xs">Heartwarming Tales</span>
        <h2 className="text-4xl font-headline font-extrabold text-[#00343e] mt-4">Latest Stories from the Sanctuary</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img className="rounded-xl shadow-lg w-full h-[500px] object-cover" src={Walking} alt="Walking dogs" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#fdd34d] rounded-full flex items-center justify-center p-8 text-center -rotate-12 shadow-xl border-4 border-[#e9f9ff]">
            <p className="font-headline font-bold text-[#5c4900] text-sm">Read the "Adopted Together" Series</p>
          </div>
        </div>
        <div className="space-y-6">
          <span className="bg-[#ffc4b3] text-[#802b0d] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Story of the Month</span>
          <h3 className="text-4xl font-headline font-extrabold text-[#00343e] leading-tight">Finding Cooper: How a Senior Dog Healed a Broken Heart.</h3>
          <p className="text-[#2c6370] text-lg leading-relaxed italic">
            "I thought I was rescuing Cooper, but as the months went by, I realized he was the one who rescued me. Every gray hair on his muzzle tells a story of wisdom and quiet love..."
          </p>
          <div className="pt-4">
            <a className="inline-flex items-center gap-2 text-[#00656f] font-bold group" href="#">
              Read the full story
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}