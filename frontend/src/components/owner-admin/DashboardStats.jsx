import React from 'react';

export default function DashboardStats({ pets = [] }) {
  const totalListed = pets.length;
  const adopted = pets.filter(p => p.isAdopted).length;
  const pending = pets.filter(p => p.isPending).length;
  const active = pets.filter(p => p.status === 'Active' || p.status === 'Draft').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
        <span className="text-primary-dim block mb-2 font-bold text-3xl">
          {totalListed.toString().padStart(2, '0')}
        </span>
        <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Total Listed</span>
      </div>
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm">
        <span className="text-secondary block mb-2 font-bold text-3xl">
          {adopted.toString().padStart(2, '0')}
        </span>
        <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Adopted</span>
      </div>
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
        <span className="text-primary block mb-2 font-bold text-3xl">
          {pending.toString().padStart(2, '0')}
        </span>
        <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Pending</span>
      </div>
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
        <span className="text-tertiary block mb-2 font-bold text-3xl">
          {active.toString().padStart(2, '0')}
        </span>
        <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Active</span>
      </div>
    </div>
  );
}
