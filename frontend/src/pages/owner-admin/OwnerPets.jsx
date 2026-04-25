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
      // Scroll to top for Dashboard
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Also scroll the main container if it has its own overflow
        const mainScroll = document.querySelector('main');
        if (mainScroll) mainScroll.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [hash, loading]);

  const activeTab = hash === '#pets-grid' ? 'My Pets' : 'Dashboard';

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await apiClient.get('/shelter/pets');
        const petList = data.data || data;
        const mappedPets = petList
          .filter(pet => pet.status >= 1 && pet.status <= 4)
          .map(pet => {
            let statusText = "Pending";
            let isAdopted = false;
            let isPending = false;
            let isRejected = false;

            switch (pet.status) {
              case 1:
                statusText = "Pending";
                isPending = true;
                break;
              case 2:
                statusText = "Approved";
                break;
              case 3:
                statusText = "Adopted";
                isAdopted = true;
                break;
              case 4:
                statusText = "Rejected";
                isRejected = true;
                break;
              default:
                statusText = "Unknown";
            }

            const imageUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
            const ageUnitText = pet.ageUnit === 0 ? (pet.age === 1 ? 'month' : 'months') : (pet.age === 1 ? 'year' : 'years');

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

  const activePetsCount = pets.filter(p => p.status === 'Approved' || p.status === 'Draft').length;

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
                <span className="text-secondary font-medium ml-1">{activePetsCount} pets currently looking for families.</span>
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-surface-container-high px-6 py-3 rounded-full flex items-center gap-2 text-on-surface-variant font-medium hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
                Filter
              </button>
              <Link to="/shelter/pets/new" className="md:hidden bg-primary text-on-primary px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center justify-center">
                Add New
              </Link>
            </div>
          </div>

          <DashboardStats pets={pets} />
          <PetGrid pets={pets} loading={loading} error={error} setPets={setPets} />
          <PullQuote />
        </div>
      </main>

      <BottomNav activeTab="Home" />
      <BackToHomeLink />
    </div>
  );
}
