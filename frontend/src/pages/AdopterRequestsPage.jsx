import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/owner-admin/Sidebar';
import Header from '../components/owner-admin/Header';
import BottomNav from '../components/owner-admin/BottomNav';
import PullQuote from '../components/owner-admin/PullQuote';
import apiClient from '../services/apiClient';
import { useNotifications } from '../context/NotificationContext';
import * as signalR from '@microsoft/signalr';
import dog from "../assets/images/dog1.jpg";

export default function AdopterRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Total');
  const { hash } = useLocation();
  const { lastDataUpdate } = useNotifications();

  useEffect(() => {
    if (loading) return;
    setTimeout(() => {
      if (hash === '#requests-grid') {
        const element = document.getElementById('filter-chips');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  }, [hash, loading]);

  const fetchRequests = async () => {
    try {
      const response = await apiClient.get('/adoption-requests');
      setRequests(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      } else {
        console.error("Failed to fetch requests", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [lastDataUpdate]);

  const totalCount = requests.length;
  const pendingCount = requests.filter(r => { const s = (r.status || "").toString().toLowerCase(); return s === "0" || s === "pending"; }).length;
  const approvedCount = requests.filter(r => { const s = (r.status || "").toString().toLowerCase(); return s === "1" || s === "accepted"; }).length;
  const rejectedCount = requests.filter(r => { const s = (r.status || "").toString().toLowerCase(); return s === "2" || s === "rejected"; }).length;

  const filteredRequests = requests.filter(r => {
    const status = (r.status || "").toString().toLowerCase();
    if (activeFilter === 'Total') return true;
    if (activeFilter === 'Pending') return status === "0" || status === "pending";
    if (activeFilter === 'Approved') return status === "1" || status === "accepted";
    if (activeFilter === 'Rejected') return status === "2" || status === "rejected";
    return true;
  });

  return (
    <div className="flex bg-surface text-on-surface h-screen overflow-hidden">
      <Sidebar activeTab="My Requests" />

      <main className="flex-1 overflow-y-auto pb-24 md:pb-12">
        <Header />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none mb-4">Pet Application Details</h2>
              <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
                Track the status of your adoption applications seamlessly in real-time.
                <span className="text-secondary font-medium ml-1">{approvedCount} applications currently approved!</span>
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/pets" className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-all">
                <span className="material-symbols-outlined">search</span>
                Browse More
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
              <span className="text-primary-dim block mb-2 font-bold text-3xl">
                {totalCount.toString().padStart(2, '0')}
              </span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Total</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm">
              <span className="text-secondary block mb-2 font-bold text-3xl">
                {pendingCount.toString().padStart(2, '0')}
              </span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Pending</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
              <span className="text-primary block mb-2 font-bold text-3xl">
                {approvedCount.toString().padStart(2, '0')}
              </span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Approved</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
              <span className="text-tertiary block mb-2 font-bold text-3xl">
                {rejectedCount.toString().padStart(2, '0')}
              </span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Rejected</span>
            </div>
          </div>

          <div id="filter-chips" className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {['Total', 'Pending', 'Approved', 'Rejected'].map((filter) => {
              const isActive = activeFilter === filter;
              let btnClass = "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ";

              if (filter === 'Rejected') {
                btnClass += isActive
                  ? 'bg-red-100 text-red-700 shadow-md border border-red-200'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-red-50 hover:text-red-600';
              } else {
                btnClass += isActive
                  ? 'bg-secondary text-on-secondary shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high';
              }

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={btnClass}
                >
                  {filter} ({filter === 'Total' ? totalCount : filter === 'Pending' ? pendingCount : filter === 'Approved' ? approvedCount : rejectedCount})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-12 text-center text-on-surface-variant">Loading applications...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="col-span-full py-12 text-center text-on-surface-variant bg-surface-container-low rounded-xl border border-outline-variant/15">
                <span className="material-symbols-outlined text-4xl mb-3 opacity-50">search_off</span>
                <p>No applications found in this category.</p>
              </div>
            ) : (
              filteredRequests.map((req) => {
                const pet = req.pet;
                const imgUrl = pet?.imageUrls ? pet.imageUrls.split(',')[0] : dog;

                const status = (req.status || "").toString().toLowerCase();
                let badgeClass = "bg-surface-container-high text-on-surface border-outline-variant/30";
                let badgeText = "Pending";
                if (status === "1" || status === "accepted") { badgeClass = "bg-secondary text-on-secondary border-secondary"; badgeText = "Approved"; }
                else if (status === "2" || status === "rejected") { badgeClass = "bg-red-100 text-red-800 border-red-200"; badgeText = "Rejected"; }

                return (
                  <div key={req.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/15 hover:shadow-md transition-all group flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={imgUrl} alt={pet?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm ${badgeClass}`}>
                          {badgeText}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-on-surface truncate">{pet?.name || 'Unknown Pet'}</h3>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-4 flex items-center gap-1 bg-surface-container-low self-start px-2 py-1 rounded-md">
                        <span className="material-symbols-outlined text-[16px]">pets</span>
                        {pet?.breed || 'Mixed Breed'} • {pet?.age || 0} yrs
                      </p>

                      <div className="bg-surface-container-low p-3 rounded-xl mb-4 border border-outline-variant/10 text-sm">
                        <p className="font-bold text-on-surface-variant mb-1 text-[11px] uppercase tracking-widest">Your Message</p>
                        <p className="text-on-surface italic line-clamp-2">"{req.message}"</p>
                      </div>

                      {(req.status === 2 || req.status === "Rejected") && req.rejectionReason && (
                        <div className="bg-red-50 p-3 rounded-xl mb-4 border border-red-100 text-sm">
                          <p className="font-bold text-red-800 mb-1 text-[11px] uppercase tracking-widest">Feedback</p>
                          <p className="text-red-700">{req.rejectionReason}</p>
                        </div>
                      )}

                      <div className="mt-auto pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                        <span className="text-xs font-medium text-on-surface-variant">
                          Applied: {new Date(req.requestedAt).toLocaleDateString()}
                        </span>
                        <Link to={`/pets/${pet?.id}`} className="text-sm font-bold text-primary hover:text-primary-dim transition-colors flex items-center gap-1 group-hover:gap-2">
                          View Pet <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <PullQuote />
        </div>
      </main>

      <BottomNav activeTab="My Requests" />
    </div>
  );
}
