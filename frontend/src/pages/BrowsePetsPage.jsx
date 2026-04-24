import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiClient from '../services/apiClient';

export default function BrowsePetsPage() {
  const [searchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    species: searchParams.get('species') || 'All Species',
    ageRange: 'Any Age'
  });

  useEffect(() => {
    fetchPets();
  }, [filters]);

  const fetchPets = async () => {
    const params = {};
    if (filters.search) params.breed = filters.search; // Assuming search maps to breed for now or update backend
    if (filters.species && filters.species !== 'All Species') params.species = filters.species;
    
    if (filters.ageRange !== 'Any Age') {
      if (filters.ageRange === '0 - 1 Years') params.ageMax = 1;
      else if (filters.ageRange === '1 - 5 Years') { params.ageMin = 1; params.ageMax = 5; }
      else if (filters.ageRange === '5+ Years') params.ageMin = 6;
    }

    try {
      const data = await apiClient.get('/pets', { params });
      setPets(data.data || data); // Handle both wrapped and unwrapped responses
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <nav className="fixed top-0 w-full z-50 bg-cyan-50/70 backdrop-blur-xl flex items-center justify-between px-8 py-4 max-w-full font-headline text-sm tracking-tight shadow-none border-b border-[#bff0ff]/50">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-900">PetAdopt</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/pets" className="text-cyan-900 font-bold border-b-2 border-cyan-800 pb-1">Browse</Link>
            <Link to="/favorites" className="text-cyan-700/70 hover:text-cyan-900">Favorites</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Link to="/login" className="bg-[#00656f] text-white px-6 py-2 rounded-full font-bold">Profile</Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-[#00343e] mb-4">
            Meet the <span className="text-[#00656f] italic">Residents</span>
          </h1>
          <p className="text-xl text-[#2c6370] max-w-2xl">
            Browse our curated selection of beautiful souls waiting for a sanctuary of their own.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 mb-12 bg-white p-6 rounded-xl shadow-sm border border-[#bff0ff]/50">
          <div className="flex-1">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2c6370] mb-2">Search</label>
            <input 
              type="text" 
              placeholder="Search by breed..." 
              className="w-full bg-[#f4fbfc] border-none rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#00656f]/40" 
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2c6370] mb-2">Species</label>
            <select 
              className="w-full bg-[#f4fbfc] border-none rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#00656f]/40"
              value={filters.species}
              onChange={e => setFilters({...filters, species: e.target.value})}
            >
              <option>All Species</option>
              <option value="0">Dogs</option>
              <option value="1">Cats</option>
              <option value="2">Birds</option>
              <option value="3">Rabbits</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#2c6370] mb-2">Age Range</label>
            <select 
              className="w-full bg-[#f4fbfc] border-none rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#00656f]/40"
              value={filters.ageRange}
              onChange={e => setFilters({...filters, ageRange: e.target.value})}
            >
              <option>Any Age</option>
              <option value="0 - 1 Years">0 - 1 Years</option>
              <option value="1 - 5 Years">1 - 5 Years</option>
              <option value="5+ Years">5+ Years</option>
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
          )}) : (
            <div className="col-span-3 text-center text-[#2c6370] py-12 italic">No pets found matching your criteria.</div>
          )}
        </div>
      </main>
    </div>
  );
}
