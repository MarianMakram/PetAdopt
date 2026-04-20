import React from 'react';
import ApprovalItem from './ApprovalItem';

export default function ApprovalList({ approvals = [], onApprove, onReject }) {
  if (approvals.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center bg-surface-container-low rounded-xl">
        <p className="text-xl font-bold text-cyan-800">All caught up!</p>
        <p className="text-cyan-700/70">There are no pending pets to review.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {approvals.map(pet => (
        <ApprovalItem 
          key={pet.id} 
          pet={pet} 
          onApprove={onApprove} 
          onReject={onReject} 
        />
      ))}
    </div>
  );
}
