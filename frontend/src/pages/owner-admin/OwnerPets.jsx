import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from '../../components/owner-admin/Sidebar';
import Header from '../../components/owner-admin/Header';
import DashboardStats from '../../components/owner-admin/DashboardStats';
import PetGrid from '../../components/owner-admin/PetGrid';
import PullQuote from '../../components/owner-admin/PullQuote';
import BottomNav from '../../components/owner-admin/BottomNav';
import apiClient from '../../services/apiClient';
import BackToHomeLink from '../../components/shared/BackToHomeLink';

export default function OwnerPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Total');
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#pets-grid') {
      const element = document.getElementById('pets-grid');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const mainScroll = document.querySelector('main');
        if (mainScroll) mainScroll.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [hash, loading]);

  const activeTab = hash === '#pets-grid' ? 'My Pets' : 'Dashboard';

  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log("Fetching pets from /shelter/pets...");
        const response = await apiClient.get('/shelter/pets');
        const petList = response.data?.data || response.data || [];
        
        console.log("Raw pet list from API:", petList);

        const mappedPets = petList.map(pet => {
          // Normalize status handling (could be string or number)
          let s = pet.status;
          let statusText = "Pending";
          let isAdopted = false;
          let isPending = false;
          let isRejected = false;

          // Handle string enums or numeric enums
          if (s === 1 || s === "PendingReview") {
            statusText = "Pending";
            isPending = true;
          } else if (s === 2 || s === "Approved") {
            statusText = "Active";
          } else if (s === 3 || s === "Adopted") {
            statusText = "Adopted";
            isAdopted = true;
          } else if (s === 4 || s === "Rejected") {
            statusText = "Rejected";
            isRejected = true;
          } else {
            statusText = s?.toString() || "Unknown";
          }

          const imageUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
          const ageUnitText = pet.ageUnit === 0 || pet.ageUnit === "Months" ? (pet.age === 1 ? 'month' : 'months') : (pet.age === 1 ? 'year' : 'years');

          return {
            id: pet.id,
            name: pet.name || 'Unknown',
            breed: pet.breed || 'Unknown',
            age: `${pet.age} ${ageUnitText} old`,
            status: statusText,
            imageUrl: imageUrl,
            isAdopted,
            isRejected,
            isPending
          };
        });

        console.log("Mapped pets for UI:", mappedPets);
        setPets(mappedPets);
      } catch (err) {
        console.error("Failed to fetch pets", err);
        setError("Failed to load pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter(p => {
    if (activeFilter === 'Total') return true;
    return p.status === activeFilter;
  });

  const activePetsCount = pets.filter(p => p.status === 'Active').length;

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} />

      <main className="flex-1 min-h-screen pb-24 md:pb-12 overflow-y-auto">
        <Header />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none mb-4">My Pets</h2>
              <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
                Track the journey of your residents from arrival to finding their forever homes.
                <span className="text-secondary font-medium ml-1">{activePetsCount} pets currently active and visible to families.</span>
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/shelter/pets/new" className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-all">
                <span className="material-symbols-outlined">add</span>
                Add New
              </Link>
            </div>
          </div>

          <DashboardStats pets={pets} />

          {/* Filtering Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {['Total', 'Pending', 'Active', 'Adopted'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'bg-secondary text-on-secondary shadow-md' 
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {filter} ({filter === 'Total' ? pets.length : pets.filter(p => p.status === filter).length})
              </button>
            ))}
          </div>

          <PetGrid pets={filteredPets} loading={loading} error={error} setPets={setPets} />
          <PullQuote />
        </div>
      </main>

      <BottomNav activeTab="Home" />
      <BackToHomeLink />
    </div>
  );
}
