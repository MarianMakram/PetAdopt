import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="px-8 py-24 max-w-7xl mx-auto text-center">
      <div className="bg-[#00343e] rounded-[3rem] p-16 md:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-headline font-black text-white">
            Ready to change <span className="italic text-[#89e9f6]">a life</span>?
          </h2>
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
  );
}