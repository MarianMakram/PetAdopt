import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import Sidebar from '../components/owner-admin/Sidebar';
import Header from '../components/owner-admin/Header';
import BottomNav from '../components/owner-admin/BottomNav';
import { useNotifications } from '../context/NotificationContext';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const { lastDataUpdate } = useNotifications();

  useEffect(() => {
    apiClient.get('/favorites')
      .then(response => {
        setFavorites(response.data || []);
      })
      .catch(err => console.error("Error fetching favorites:", err));
  }, [lastDataUpdate]);

  const removeFavorite = async (petId) => {
    try {
      await apiClient.delete(`/favorites/${petId}`);
      setFavorites(favorites.filter(f => f.petId !== petId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="flex bg-[#e9f9ff] text-[#00343e] h-screen overflow-hidden font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <Sidebar activeTab="Favorites" />

      <main className="flex-1 overflow-y-auto pb-24 md:pb-12 relative">
        <Header />

        <div className="pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.length > 0 ? favorites.map((fav) => {
              const pet = fav.pet;
              const imgUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHUw8mCyhci96uVgVCrX-e9o0tXywR6WPfE9o4HGtWPxB9xaCf5iuxqdEHNbxOU4ewk0Fsw1U1GW5xLJ_QrLRfOowund1a_r5evXnA0NqZ7nMpF4SoKXClwx47Wk0EBFauekxSeWxW2Xeohze4pSfVWIKeZlTII09crZvpvMrxsCkCnj6Lx0KPrY_38axaITQSprbE90LDng_e5cEcVy_jMtpCpbOI6LqPRS20RxYlrs1iouGXzlq3uH9_CcPRfTlLBk3sJfL5wQ";
              return (
                <div key={fav.id} className="group relative">
                  <Link to={`/pets/${pet.id}`} className="block relative overflow-hidden rounded-t-xl rounded-b-md">
                    <img className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" src={imgUrl} alt={pet.name} />
                  </Link>
                  <button
                    onClick={() => removeFavorite(pet.id)}
                    className="absolute top-4 right-4 w-12 h-12 bg-[#ffffff]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9f0519] shadow-lg hover:bg-red-50 transition-colors z-10"
                  >
                    <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </button>
                  <div className="bg-[#ffffff] p-8 rounded-b-md shadow-sm mt-0.5 border border-[#81b5c5]/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-headline font-bold text-[#00343e]">{pet.name}</h3>
                        <p className="text-[#2c6370] flex items-center gap-1 mt-1 text-sm">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          {pet.location || 'Sanctuary'}
                        </p>
                      </div>
                    </div>
                    <Link to={`/pets/${pet.id}`} className="block w-full py-4 text-center bg-[#d9f6ff] text-[#00656f] font-bold rounded-full hover:bg-[#00656f] hover:text-[#d4f9ff] transition-all active:scale-95">View Profile</Link>
                  </div>
                </div>
              )
            }) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-[#2c6370] py-16 bg-white rounded-xl border border-[#bff0ff]/50 flex flex-col items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-5xl mb-4 text-[#70a5b4]">heart_broken</span>
                <p className="text-xl font-medium mb-2">No favorites yet.</p>
                <p className="text-[#2c6370]/80 mb-6 max-w-md text-center">You haven't saved any residents to your favorites. Start browsing to find your perfect companion.</p>
                <Link to="/pets" className="bg-[#00656f] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#00555d] transition-colors inline-block active:scale-95">Browse Pets</Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav activeTab="Favorites" />
    </div>
  );
}
