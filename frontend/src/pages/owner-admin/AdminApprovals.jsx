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
  const [filter, setFilter] = useState('PendingReview');

  useEffect(() => {
    fetchPets();
  }, [filter]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/admin/pets/status/${filter}`);
      const dataArray = response.data || [];
      const mappedData = dataArray.map(pet => ({
        id: pet.id,
        name: pet.name || 'Unknown',
        breed: pet.breed || 'Unknown',
        submitter: `Shelter ID: ${pet.ownerId}`,
        submitterType: 'Verified Shelter',
        dateSubmitted: new Date(pet.createdAt).toLocaleDateString(),
        imageUrl: pet.imageUrls ? pet.imageUrls.split(',')[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        badgeColor: pet.status === "PendingReview" ? 'primary' : pet.status === "Approved" ? 'success' : 'error',
        status: pet.status
      }));
      setApprovals(mappedData);
    } catch (err) {
      setError("Failed to load approvals.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await apiClient.patch(`/admin/pets/${id}/approve`);
      fetchPets();
    } catch (err) {
      alert("Failed to approve pet.");
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this pet listing?")) {
      try {
        await apiClient.patch(`/admin/pets/${id}/reject`);
        fetchPets();
      } catch (err) {
        alert("Failed to reject pet.");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar activeTab="Pet Approvals" />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-cyan-50/30">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-12 pb-32">
          <div className="flex justify-between items-center mb-8">
            <ApprovalHeader count={approvals.length} />
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-cyan-100">
              {['PendingReview', 'Approved', 'Rejected'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filter === t ? 'bg-cyan-600 text-white shadow-md' : 'text-cyan-600 hover:bg-cyan-50'}`}
                >
                  {t.replace('Review', '')}
                </button>
              ))}
            </div>
          </div>
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
    </div>
  );
}
