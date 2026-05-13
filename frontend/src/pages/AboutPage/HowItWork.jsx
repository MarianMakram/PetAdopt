import React from 'react';

const steps = [
  { 
    step: "01", 
    title: "Discovery", 
    desc: "Browse our curated residents and find the soul that speaks to you.",
    icon: "search_insights"
  },
  { 
    step: "02", 
    title: "Connection", 
    desc: "Submit a request and connect with the current shelter or owner.",
    icon: "handshake"
  },
  { 
    step: "03", 
    title: "Sanctuary", 
    desc: "Finalize the paperwork and bring your new friend to their forever home.",
    icon: "home_app_fill"
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24 px-8 border-y border-[#bff0ff]/30">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-headline font-black text-[#00343e] mb-4">The Sanctuary Path</h2>
        <p className="text-[#2c6370] max-w-xl mx-auto text-lg">
          Our streamlined process ensures that finding your new family member is as joyful as the adoption itself.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {steps.map((item, i) => (
          <div key={i} className="text-left space-y-4 p-8 rounded-[2rem] hover:bg-[#f4fbfc] transition-colors group">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-4xl text-[#00656f] group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-4xl font-black text-[#89e9f6]/30">{item.step}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#00343e]">{item.title}</h3>
            <p className="text-[#2c6370] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}