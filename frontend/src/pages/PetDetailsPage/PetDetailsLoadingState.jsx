import React from 'react';

export default function PetDetailsLoadingState() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-cyan-800">
      <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin"></div>
      <p className="font-bold animate-pulse">Fetching resident details...</p>
    </div>
  );
}
