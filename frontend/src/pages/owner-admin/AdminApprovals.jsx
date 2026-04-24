import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner-admin/Sidebar';
import Header from '../../components/owner-admin/Header';
import ApprovalHeader from '../../components/owner-admin/ApprovalHeader';
import ApprovalList from '../../components/owner-admin/ApprovalList';
import BottomNav from '../../components/owner-admin/BottomNav';
import apiClient from '../../services/apiClient';

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingPets();
  }, []);

  const fetchPendingPets = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/admin/pets/pending');
      const mappedData = data.map(pet => ({
        id: pet.id,
        name: pet.name || 'Unknown',
        breed: pet.breed || 'Unknown',
        submitter: `Shelter ID: ${pet.ownerId}`,
        submitterType: 'Verified Shelter',
        dateSubmitted: 'Recently',
        imageUrl: pet.imageUrls ? pet.imageUrls.split(',')[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        badgeColor: 'primary'
      }));
      setApprovals(mappedData);
    } catch (err) {
      setError("Failed to load pending approvals.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await apiClient.patch(`/admin/pets/${id}/approve`);
      setApprovals(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to approve pet.");
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this pet listing?")) {
      try {
        await apiClient.patch(`/admin/pets/${id}/reject`);
        setApprovals(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to reject pet.");
      }
    }
  };

  return (
    <>
      <Sidebar activeTab="Approvals" />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-cyan-50/30">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-12 pb-32">
          <ApprovalHeader count={approvals.length} />
          {loading ? (
            <div className="p-8 text-center text-cyan-800 font-bold">Loading pending approvals...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500 font-bold">{error}</div>
          ) : (
            <ApprovalList
              approvals={approvals}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
        </div>
      </main>
      <BottomNav activeTab="Approvals" />
    </>
  );
}
