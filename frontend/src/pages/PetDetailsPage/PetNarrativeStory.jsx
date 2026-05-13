import React from 'react';

export default function PetNarrativeStory({ pet }) {
  return (
    <div className="space-y-4 mb-12">
      <h3 className="text-xs font-black uppercase tracking-widest text-cyan-700/40">The Story</h3>
      <p className="text-cyan-800 text-lg leading-relaxed">{pet.description}</p>
    </div>
  );
}
