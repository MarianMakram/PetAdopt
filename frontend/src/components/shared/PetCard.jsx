import React from 'react';
import { Link } from 'react-router-dom';

export default function PetCard({ pet, onDelete }) {
  const { id, name, breed, age, status, imageUrl, isAdopted, isRejected, isPending } = pet;

  let statusBg = "bg-primary/90 text-on-primary";
  let statusText = status;

  if (isAdopted) {
    statusBg = "bg-secondary/90 text-white";
  } else if (isRejected) {
    statusBg = "bg-error/90 text-on-error";
  } else if (isPending) {
    statusBg = "bg-tertiary-fixed/90 text-on-tertiary-fixed";
  }

  return (
    <div className={`group relative bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${isAdopted ? 'opacity-80' : ''}`}>
      <div className={`relative h-64 w-full overflow-hidden rounded-xl mb-6 ${isAdopted ? 'grayscale group-hover:grayscale-0 transition-all duration-500' : ''}`}>
        <img
          alt={`${breed} named ${name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={imageUrl}
        />
        <div className="absolute top-4 left-4">
          <span className={`${statusBg} backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>
            {statusText}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-2xl font-bold text-on-surface">{name}</h3>
          <p className="text-on-surface-variant text-sm">{breed} • {age}</p>
        </div>
        <div className="flex gap-2">
          {isAdopted ? (
            <Link to={`/pets/${id}`} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </Link>
          ) : isRejected ? (
            <>
              <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" title="Check Feedback">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
              <Link to={`/owner/pets/edit/${id}`} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/owner/pets/edit/${id}`} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </Link>
              <button
                onClick={() => onDelete && onDelete(id)}
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}