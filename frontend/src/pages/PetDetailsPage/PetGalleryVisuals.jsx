import React from 'react';

export default function PetGalleryVisuals({ pet, user, isFavorite, toggleFavorite, images }) {
  return (
    <div className="space-y-6">
      <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-cyan-900/10 border-4 border-white">
        <img src={images[0]} alt={pet.name} className="w-full h-full object-cover" />
        {user?.role === 'Adopter' && (
          <button
            onClick={toggleFavorite}
            className="absolute top-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9f0519] shadow-lg hover:scale-110 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-3xl" style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
          </button>
        )}
        <div className="absolute bottom-6 left-6 flex gap-2">
          <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border backdrop-blur-md shadow-sm ${pet.status === 'Approved' ? 'bg-emerald-100/80 text-emerald-800 border-emerald-200' :
            pet.status === 'Adopted' ? 'bg-cyan-100/80 text-cyan-800 border-cyan-200' :
              'bg-amber-100/80 text-amber-800 border-amber-200'
            }`}>
            {pet.status || 'Available'}
          </span>
          <span className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-cyan-100 text-cyan-800 shadow-sm">
            {pet.gender || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
}
