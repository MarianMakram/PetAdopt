import React from 'react';

export default function PetProfileHeader({ pet }) {
  return (
    <div className="mb-8">
      <h1 className="text-7xl font-headline font-black text-[#00343e] mb-2 tracking-tighter">{pet.name}</h1>
      <div className="flex items-center gap-3">
        <p className="text-2xl text-cyan-600 font-bold italic">{pet.breed || 'Mixed Breed'}</p>
        <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full"></div>
        <p className="text-lg text-cyan-700/60 font-medium">{pet.location || 'Sanctuary'}</p>
      </div>
    </div>
  );
}
