import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Sidebar from '../../components/owner-admin/Sidebar';
import Header from '../../components/owner-admin/Header';
import DashboardStats from '../../components/owner-admin/DashboardStats';
import PetGrid from '../../components/owner-admin/PetGrid';
import PullQuote from '../../components/owner-admin/PullQuote';
import BottomNav from '../../components/owner-admin/BottomNav';
import apiClient from '../../services/apiClient';
import { useNotifications } from '../../context/NotificationContext';
import dog from  "../../assets/images/dog1.jpg";


export default function OwnerPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Total');
  const { hash } = useLocation();
  const { lastDataUpdate } = useNotifications();

  useEffect(() => {
    if (loading) return;

    setTimeout(() => {
      if (hash === '#pets-grid') {
        const element = document.getElementById('filter-chips');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
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
            statusText = "Approved";
          } else if (s === 3 || s === "Adopted") {
            statusText = "Adopted";
            isAdopted = true;
          } else if (s === 4 || s === "Rejected") {
            statusText = "Rejected";
            isRejected = true;
          } else {
            statusText = s?.toString() || "Unknown";
          }

          const imageUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : {dog};
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
  }, [lastDataUpdate]);

  const filteredPets = pets.filter(p => {
    if (activeFilter === 'Total') return true;
    return p.status === activeFilter;
  });

  const activePetsCount = pets.filter(p => p.status === 'Approved').length;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} />

      <main className="flex-1 overflow-y-auto pb-24 md:pb-12">
        <Header />

        <div className={`${activeTab === 'Dashboard' ? 'w-full' : 'max-w-7xl mx-auto'} px-6 md:px-12 py-12`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none mb-4">My Pets</h2>
              <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
                Track the journey of your residents from arrival to finding their forever homes.
                <span className="text-secondary font-medium ml-1">{activePetsCount} pets currently approved and visible to families.</span>
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

          <div id="filter-chips" className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {['Total', 'Pending', 'Approved', 'Adopted', 'Rejected'].map((filter) => {
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
                  {filter} ({filter === 'Total' ? pets.length : pets.filter(p => p.status === filter).length})
                </button>
              );
            })}
          </div>

          <PetGrid pets={filteredPets} loading={loading} error={error} setPets={setPets} />
          <PullQuote />
        </div>
      </main>

      <BottomNav activeTab="Home" />
    </div>
  );
}
