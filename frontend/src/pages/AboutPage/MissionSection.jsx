import React from 'react';
import dog from "../../assets/images/dog.jpg";

export default function MissionSection() {
  return (
    <section className="px-8 py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-[#00343e] leading-tight">
            More Than Just <span className="text-[#00656f] italic">Adoption</span>.
          </h2>
          <div className="space-y-6 text-lg text-[#2c6370] leading-relaxed">
            <p>
              PetAdopt was born from a simple observation: the world is full of beautiful souls waiting for a chance to belong. 
              We didn't just want to create a database; we wanted to build a sanctuary—a digital space where the dignity 
              of every animal is celebrated.
            </p>
            <p>
              Since 2024, we've partnered with over 500 verified shelters and individual owners to ensure that every 
              pet profile is more than just data—it's a story. Our rigorous approval process ensures that every 
              adoption is safe, ethical, and built to last.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-[#bff0ff]/50 flex-1">
              <div className="text-3xl font-black text-[#00656f] mb-1">5,000+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-[#5c8a95]">Lives Changed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-[#bff0ff]/50 flex-1">
              <div className="text-3xl font-black text-[#00656f] mb-1">1,200+</div>
              <div className="text-xs uppercase tracking-widest font-bold text-[#5c8a95]">Daily Browsers</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src={dog} 
              alt="A person hugging a dog" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-[#00656f] text-white p-10 rounded-[2rem] shadow-2xl max-w-xs">
            <span className="material-symbols-outlined text-4xl mb-4">format_quote</span>
            <p className="text-lg font-medium italic mb-4">
              "The connection we foster isn't just between pets and owners—it's between humanity and kindness."
            </p>
            <div className="font-bold text-sm tracking-widest uppercase">PetAdopt Founders</div>
          </div>
        </div>
      </div>
    </section>
  );
}