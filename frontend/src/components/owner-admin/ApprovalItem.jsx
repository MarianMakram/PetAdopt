import React from 'react';
import { Link } from 'react-router-dom';

export default function ApprovalItem({ pet, onApprove, onReject }) {
  const { id, name, breed, submitter, submitterType, dateSubmitted, timeAgo, imageUrl, badgeColor } = pet;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 border border-transparent hover:border-outline-variant/20 transition-all hover:shadow-xl group">
      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
        <img
          alt={`Pet named ${name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imageUrl}
        />
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        <div>
          <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Pet Name</p>
          <p className="text-xl font-bold text-on-surface">{name}</p>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold text-${badgeColor} mt-1`}>
            <span className={`w-1.5 h-1.5 bg-${badgeColor} rounded-full animate-pulse`}></span> {breed.toUpperCase()}
          </span>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Submitted By</p>
          <p className="text-sm font-medium text-on-surface">{submitter}</p>
          <p className="text-xs text-on-surface-variant">{submitterType}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Date Submitted</p>
          <p className="text-sm font-medium text-on-surface">{dateSubmitted}</p>
          <p className="text-xs text-on-surface-variant">{timeAgo}</p>
        </div>

        <div className="flex items-center">
          <Link 
            to={`/pets/${id}`} 
            target="_blank" 
            className="text-primary font-bold text-sm underline-offset-4 hover:underline flex items-center gap-1"
          >
            Preview Post
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <button
          onClick={() => onReject && onReject(id)}
          className="flex-1 md:flex-none px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-bold hover:bg-error-container hover:text-on-error-container transition-all active:scale-95"
        >
          Reject
        </button>
        <button
          onClick={() => onApprove && onApprove(id)}
          className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Approve
        </button>
      </div>
    </div>
  );
}
