import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/owner-admin/Sidebar';
import Header from '../../components/owner-admin/Header';
import ApprovalHeader from '../../components/owner-admin/ApprovalHeader';
import ApprovalList from '../../components/owner-admin/ApprovalList';
import BottomNav from '../../components/owner-admin/BottomNav';
import { apiClient } from '../../services/apiClient';
import BackToHomeLink from '../../components/shared/BackToHomeLink';

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingPets = async () => {
      try {
        const data = await apiClient.get('/api/AdminUsers/pending-pets');

        // Map backend model to the format expected by the UI
        const mappedData = data.map(pet => ({
          id: pet.id,
          name: pet.name || 'Unknown',
          breed: pet.breed || 'Unknown',
          submitter: `Owner ID: ${pet.ownerId}`, // Simplification for now
          submitterType: 'Registered User',
          dateSubmitted: 'Just now', // Ideally from a created_at field
          timeAgo: 'Recently',
          imageUrl: pet.imageUrls ? pet.imageUrls.split(',')[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
          badgeColor: 'primary'
        }));

        setApprovals(mappedData);
      } catch (err) {
        console.error("Failed to fetch pending pets", err);
        setError("Failed to load pending approvals.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPets();
  }, []);

  const handleApprove = async (id) => {
    try {
      await apiClient.post(`/api/AdminUsers/approve-pet/${id}`, {});
      setApprovals(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to approve pet", err);
      alert("Failed to approve pet.");
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this pet listing?")) {
      try {
        await apiClient.post(`/api/AdminUsers/reject-pet/${id}`, { reason: 'Rejected by admin' });
        setApprovals(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error("Failed to reject pet", err);
        alert("Failed to reject pet.");
      }
    }
  };

  return (
    <>
      {/* SideNavBar Component */}
      <Sidebar activeTab="Approvals" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TopNavBar Component */}
        <header className="fixed top-0 w-full z-40 md:relative bg-cyan-50/70 dark:bg-cyan-950/70 backdrop-blur-xl flex items-center justify-between px-8 py-4 max-w-full">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-tighter text-cyan-900 dark:text-cyan-50 md:hidden">PetAdopt</span>
            <nav className="hidden md:flex gap-6 font-plus-jakarta text-sm tracking-tight">
              <Link className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors" to="/pets">Browse</Link>
              <Link className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors" to="/shelters">Shelters</Link>
              <Link className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors" to="/stories">Stories</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-surface-container-high rounded-full px-4 py-1.5 items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface" placeholder="Search approvals..." type="text" />
            </div>
            <button className="p-2 text-cyan-700/70 hover:text-cyan-900 transition-all active:scale-90">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-cyan-700/70 hover:text-cyan-900 transition-all active:scale-90">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <div className="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>
            <span className="font-plus-jakarta text-sm font-bold text-cyan-900 cursor-pointer">Profile</span>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-12 pb-32">
          <ApprovalHeader count={approvals.length} />

          {loading ? (
            <div className="p-8 text-center text-cyan-800">Loading pending approvals...</div>
          ) : error ? (
            <div className="p-8 text-center text-error">{error}</div>
          ) : (
            <ApprovalList
              approvals={approvals}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {/* Emotional Pull Quote Footer */}
          <div className="max-w-4xl mx-auto text-center mt-24 mb-12">
            <p className="text-2xl md:text-3xl font-headline italic text-secondary leading-relaxed">
              "Every approved listing is a bridge built between a lonely heart and a forever home."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-outline-variant/50"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">The PetAdopt Mission</span>
              <div className="h-[1px] w-12 bg-outline-variant/50"></div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="Approvals" />
      <BackToHomeLink />
    </>
  );
}
