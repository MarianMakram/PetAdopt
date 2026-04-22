import React from 'react';

export default function Header() {
  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl sticky top-0 z-40">
      <h1 className="text-2xl font-bold tracking-tighter text-cyan-900">PetAdopt</h1>
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">notifications</span>
        <img 
          alt="User profile" 
          className="w-8 h-8 rounded-full border-2 border-primary-container" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAzqCyywrVBbQmKIRGt893HaQKNC0J33gvJhHptW8POml_cbHBauLCz5LfTXQe06f_lJVdr0tDXPbAwc96ZHsjTIcOe2AV-k6EgJW-p0DwYyalA-p8gGIbCefTcKPywwuRsaZ9NV0_5LL9BAHRS7jQCzuid4hrF7EqyEvMXtCf7a0gZC1opTMA7CXCCZh6KgojNINn5xcev7uw5-_X5eBl74b9_FUr_5oW5Tv7o40o0dN8qvekGmE0OBIbt5L2J3OlKJL1PalM5fU"
        />
      </div>
    </header>
  );
}
