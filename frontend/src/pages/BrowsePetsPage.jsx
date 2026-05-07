import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import Header from '../components/owner-admin/Header';
import { useNotifications } from '../context/NotificationContext';

export default function BrowsePetsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { lastDataUpdate } = useNotifications();

  const [filters, setFilters] = useState({
    search: searchParams.get('breed') || searchParams.get('search') || '',
    species: searchParams.get('species') || 'All Species',
    location: searchParams.get('location') || '',
    ageRange: searchParams.get('ageMin') === '1' && searchParams.get('ageMax') === '5' ? 'Adult'
      : searchParams.get('ageMax') === '1' ? 'Puppy/Kitten'
        : searchParams.get('ageMin') === '6' ? 'Senior'
          : 'Any Age'
  });

  useEffect(() => {
    fetchPets();
    if (user?.role === 'Adopter') {
      fetchFavorites();
    }
  }, [filters, user, lastDataUpdate]);

  const fetchFavorites = async () => {
    try {
      const data = await apiClient.get('/favorites');
      setFavoriteIds(data.data.map(f => f.petId));
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const toggleFavorite = async (e, petId) => {
    e.preventDefault(); // Prevent Link navigation
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'Adopter') return;

    const isFav = favoriteIds.includes(petId);
    try {
      if (isFav) {
        await apiClient.delete(`/favorites/${petId}`);
        setFavoriteIds(favoriteIds.filter(id => id !== petId));
      } else {
        await apiClient.post('/favorites', { petId });
        setFavoriteIds([...favoriteIds, petId]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const fetchPets = async () => {
    const params = {};
    if (filters.search) params.breed = filters.search;
    if (filters.location) params.location = filters.location;
    if (filters.species && filters.species !== 'All Species') params.species = filters.species;

    if (filters.ageRange !== 'Any Age') {
      if (filters.ageRange === 'Puppy/Kitten') params.ageMax = 1;
      else if (filters.ageRange === 'Adult') { params.ageMin = 1; params.ageMax = 5; }
      else if (filters.ageRange === 'Senior') params.ageMin = 6;
    }

    try {
      const data = await apiClient.get('/pets', { params });
      setPets(data.data || data); // Handle both wrapped and unwrapped responses
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d] flex flex-col">
      <Header />
      <main className="flex-1 pb-24 px-8 max-w-7xl mx-auto w-full pt-12">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-[#00343e] mb-4">
            Meet the <span className="text-[#00656f] italic">Residents</span>
          </h1>
          <p className="text-xl text-[#2c6370] max-w-2xl">
            Browse our curated selection of beautiful souls waiting for a sanctuary of their own.
          </p>
        </header>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-16 bg-white p-2 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#eefcff] flex-wrap">
          <div className="flex-1 min-w-[200px] flex items-center px-6 py-2">
            <div className="w-full">
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#5c8a95] mb-1">Breed</label>
              <input
                type="text"
                placeholder="Search by breed..."
                className="w-full bg-transparent border-none p-0 text-sm font-bold text-[#00343e] focus:ring-0 placeholder:text-[#5c8a95]/40"
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-100"></div>
          <div className="flex-1 min-w-[200px] flex items-center px-6 py-2">
            <div className="w-full">
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#5c8a95] mb-1">Location</label>
              <input
                type="text"
                placeholder="City or region..."
                className="w-full bg-transparent border-none p-0 text-sm font-bold text-[#00343e] focus:ring-0 placeholder:text-[#5c8a95]/40"
                value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-100"></div>
          <div className="w-full md:w-48 px-6 py-2">
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#5c8a95] mb-1">Species</label>
            <select
              className="w-full bg-transparent border-none p-0 text-sm font-bold text-[#00343e] focus:ring-0 appearance-none cursor-pointer"
              value={filters.species}
              onChange={e => setFilters({ ...filters, species: e.target.value })}
            >
              <option>All Species</option>
              <option value="0">Dogs</option>
              <option value="1">Cats</option>
              <option value="2">Birds</option>
              <option value="3">Rabbits</option>
            </select>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-100"></div>
          <div className="w-full md:w-48 px-6 py-2">
            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[#5c8a95] mb-1">Age Range</label>
            <select
              className="w-full bg-transparent border-none p-0 text-sm font-bold text-[#00343e] focus:ring-0 appearance-none cursor-pointer"
              value={filters.ageRange}
              onChange={e => setFilters({ ...filters, ageRange: e.target.value })}
            >
              <option>Any Age</option>
              <option value="Puppy/Kitten">Puppy/Kitten</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pets.length > 0 ? pets.map((pet) => {
            const imgUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80";
            return (
              <Link to={`/pets/${pet.id}`} key={pet.id} className="group">
                <div className="relative overflow-hidden rounded-t-xl rounded-b-md h-80">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={imgUrl} alt={pet.name} />
                  {user?.role !== 'Admin' && user?.role !== 'Shelter' && (
                    <button
                      onClick={(e) => toggleFavorite(e, pet.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-[#ffffff]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9b3e20] shadow-lg hover:scale-110 active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: favoriteIds.includes(pet.id) ? "'FILL' 1" : "'FILL' 0" }}>
                        favorite
                      </span>
                    </button>
                  )}
                </div>
                <div className="bg-[#ffffff] p-8 rounded-b-md shadow-sm mt-0.5 border border-[#81b5c5]/5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-[#00343e]">{pet.name}</h3>
                      <p className="text-[#2c6370] text-sm mt-1">{pet.breed || 'Mixed Breed'}</p>
                    </div>
                    <span className="bg-[#89e9f6]/30 text-[#00555d] px-3 py-1 rounded-full text-xs font-bold">{pet.age} {pet.ageUnit === 0 ? 'Mo' : 'Yr'}</span>
                  </div>
                  <p className="text-[#2c6370] line-clamp-2 text-sm leading-relaxed mb-6">{pet.description}</p>
                  <button className="w-full py-4 bg-[#d9f6ff] text-[#00656f] font-bold rounded-full group-hover:bg-[#00656f] group-hover:text-[#d4f9ff] transition-all">View Profile</button>
                </div>
              </Link>
            )
          }) : (
            <div className="col-span-3 text-center text-[#2c6370] py-12 italic">No pets found matching your criteria.</div>
          )}
        </div>
      </main>
    </div>
  );
}
