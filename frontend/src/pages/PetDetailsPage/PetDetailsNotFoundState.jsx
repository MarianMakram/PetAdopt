import React from 'react';
import { Link } from 'react-router-dom';

export default function PetDetailsNotFoundState() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <span className="material-symbols-outlined text-6xl text-cyan-200">sentiment_dissatisfied</span>
      <div>
        <h2 className="text-2xl font-bold text-cyan-900 mb-2">Resident Not Found</h2>
        <p className="text-cyan-700/70">The pet you're looking for might have already found their forever home.</p>
      </div>
      <Link to="/pets" className="bg-cyan-800 text-white px-8 py-3 rounded-full font-bold shadow-lg">Browse Others</Link>
    </div>
  );
}
