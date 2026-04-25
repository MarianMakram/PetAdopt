import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=2000&q=80" 
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

        {/* Mission Section */}
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
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80" 
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

        {/* How It Works */}
        <section className="bg-white py-24 px-8 border-y border-[#bff0ff]/30">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-headline font-black text-[#00343e] mb-4">The Sanctuary Path</h2>
            <p className="text-[#2c6370] max-w-xl mx-auto text-lg">Our streamlined process ensures that finding your new family member is as joyful as the adoption itself.</p>
          </div>
          
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            {[
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
            ].map((item, i) => (
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

        {/* CTA Section */}
        <section className="px-8 py-24 max-w-7xl mx-auto text-center">
          <div className="bg-[#00343e] rounded-[3rem] p-16 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-white">Ready to change <span className="italic text-[#89e9f6]">a life</span>?</h2>
              <p className="text-[#d4f9ff] text-xl max-w-2xl mx-auto">
                Join our community of adopters, shelters, and pet lovers today. 
                Whether you're looking to adopt or looking to provide a home, you belong here.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                <Link to="/pets" className="bg-[#89e9f6] text-[#00343e] px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-xl">
                  Start Browsing
                </Link>
                <Link to="/register" className="text-white border-2 border-[#89e9f6]/30 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                  Join the Community
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
