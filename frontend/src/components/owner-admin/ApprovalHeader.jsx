import React from 'react';

export default function ApprovalHeader({ count = 0 }) {
  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2 block">Pending Reviews</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background">Approval Queue</h2>
          <p className="text-on-surface-variant mt-3 max-w-xl text-lg">Every listing verified is a life potentially changed. Review submissions for accuracy and empathy.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-surface-container-low px-6 py-4 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-primary-container rounded-full text-on-primary-container">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <div>
              <p className="text-2xl font-black">{count}</p>
              <p className="text-xs font-bold uppercase text-on-surface-variant tracking-tighter">Waiting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
