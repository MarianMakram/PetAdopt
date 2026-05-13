import React from 'react';
import cat from "../assets/images/cat.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <img 
        src={cat} 
        alt="Dogs and cats playing" 
        className="w-full h-full object-cover grayscale-[20%] brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#00343e]/80 to-transparent flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-5xl md:text-7xl font-headline font-black text-white mb-6 drop-shadow-2xl">
          Our <span className="italic text-[#89e9f6]">Sanctuary</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#d4f9ff] max-w-3xl leading-relaxed font-medium">
          We believe that every soul, no matter how small, deserves a sanctuary of its own. 
          Our mission is to bridge the gap between hearts and homes.
        </p>
      </div>
    </section>
  );
}