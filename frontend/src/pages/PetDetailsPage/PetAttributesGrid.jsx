import React from 'react';

export default function PetAttributesGrid({ pet }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-10">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-cyan-100/50 flex flex-col items-center text-center">
        <span className="material-symbols-outlined text-cyan-600 mb-2">calendar_month</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-700/40 mb-1">Age</p>
        <p className="text-lg font-bold text-cyan-900">
          {pet.age} {pet.ageUnit === 0 || pet.ageUnit === 'Months' ? (pet.age === 1 ? 'Month' : 'Months') : (pet.age === 1 ? 'Year' : 'Years')}
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-cyan-100/50 flex flex-col items-center text-center">
        <span className="material-symbols-outlined text-cyan-600 mb-2">medical_services</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-700/40 mb-1">Health</p>
        <p className="text-lg font-bold text-cyan-900 truncate w-full px-2">{pet.healthStatus || 'Healthy'}</p>
      </div>
    </div>
  );
}
