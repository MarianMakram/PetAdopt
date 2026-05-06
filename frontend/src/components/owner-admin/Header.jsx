import React from 'react';
import user from "../../assets/images/user1.png";

export default function Header() {
  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl sticky top-0 z-40">
      <h1 className="text-2xl font-bold tracking-tighter text-cyan-900">PetAdopt</h1>
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">notifications</span>
        <img
          alt="User profile"
          className="w-8 h-8 rounded-full border-2 border-primary-container"
          src={user}
        />
      </div>
    </header>
  );
}
