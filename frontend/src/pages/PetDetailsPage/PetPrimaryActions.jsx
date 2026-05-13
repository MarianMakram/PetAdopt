import React from 'react';

export default function PetPrimaryActions({ pet, user, navigate, setIsAdoptModalOpen }) {
  return (
    <>
      {user?.role === 'Admin' || user?.role === 'Shelter' ? (
        <div className="flex items-center gap-4">
          <div className="bg-cyan-800 text-white px-8 py-4 rounded-full font-bold shadow-lg">
            Portal View: {user.role}
          </div>
          <button onClick={() => navigate(-1)} className="text-cyan-800 font-bold hover:underline">Go Back</button>
        </div>
      ) : pet.status === 'Adopted' ? (
        <div className="bg-emerald-100 text-emerald-800 px-10 py-5 rounded-full font-bold w-fit border border-emerald-200 flex items-center gap-2">
          <span className="material-symbols-outlined">celebration</span>
          Found a Forever Home!
        </div>
      ) : (
        <button
          onClick={() => setIsAdoptModalOpen(true)}
          className="bg-[#00343e] text-white px-12 py-5 rounded-full font-black text-lg shadow-xl shadow-cyan-900/20 hover:bg-cyan-900 transition-all active:scale-95 w-fit group flex items-center gap-3"
        >
          Adopt {pet.name}
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      )}
    </>
  );
}
