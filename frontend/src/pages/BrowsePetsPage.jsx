import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function BrowsePetsPage() {
  const [searchParams] = useSearchParams();
  const [pets, setPets] = useState([]);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    species: searchParams.get('species') || 'All Species',
    ageRange: 'Any Age'
  });

  useEffect(() => {
    // Determine API query params
    const query = new URLSearchParams();
    if (filters.search) query.append('search', filters.search);
    if (filters.species && filters.species !== 'All Species') query.append('species', filters.species);
    
    if (filters.ageRange !== 'Any Age') {
      if (filters.ageRange === '0 - 1 Years') query.append('ageMax', '1');
      else if (filters.ageRange === '1 - 5 Years') { query.append('ageMin', '1'); query.append('ageMax', '5'); }
      else if (filters.ageRange === '5+ Years') query.append('ageMin', '6');
    }

    fetch(`http://localhost:5251/api/pets?${query.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setPets(data.data);
        }
      })
      .catch(err => console.error("Error fetching pets:", err));
  }, [filters]);

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <nav className="fixed top-0 w-full z-50 bg-cyan-50/70 dark:bg-cyan-950/70 backdrop-blur-xl flex items-center justify-between px-8 py-4 max-w-full font-headline text-sm tracking-tight shadow-none border-b border-[#bff0ff]/50">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-900 dark:text-cyan-50">PetAdopt</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/pets" className="text-cyan-900 dark:text-cyan-50 font-bold border-b-2 border-cyan-800 dark:border-cyan-200 pb-1 transition-colors">Browse</Link>
            <Link to="/owner/pets" className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200">Shelters</Link>
            <Link to="/" className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200">Stories</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-cyan-800 dark:text-cyan-100">
            <button className="material-symbols-outlined hover:text-cyan-900 transition-colors">notifications</button>
            <button className="material-symbols-outlined hover:text-cyan-900 transition-colors">favorite</button>
          </div>
          <button className="bg-gradient-to-br from-[#00656f] to-[#89e9f6] text-[#d4f9ff] px-6 py-2.5 rounded-full font-bold shadow-sm hover:translate-y-[-1px] transition-all">Profile</button>
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
              placeholder="Search by name or breed..." 
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
              <option>0 - 1 Years</option>
              <option>1 - 5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>
          <div className="flex items-end">
             <button className="w-full h-[44px] bg-[#00656f] text-[#d4f9ff] px-8 rounded-md flex items-center justify-center gap-2 font-bold hover:bg-[#005861] transition-colors">
              <span className="material-symbols-outlined text-lg">tune</span> Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pets.length > 0 ? pets.map((pet) => {
            const imgUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHUw8mCyhci96uVgVCrX-e9o0tXywR6WPfE9o4HGtWPxB9xaCf5iuxqdEHNbxOU4ewk0Fsw1U1GW5xLJ_QrLRfOowund1a_r5evXnA0NqZ7nMpF4SoKXClwx47Wk0EBFauekxSeWxW2Xeohze4pSfVWIKeZlTII09crZvpvMrxsCkCnj6Lx0KPrY_38axaITQSprbE90LDng_e5cEcVy_jMtpCpbOI6LqPRS20RxYlrs1iouGXzlq3uH9_CcPRfTlLBk3sJfL5wQ";
            return (
            <Link to={`/pets/${pet.id}`} key={pet.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-t-xl rounded-b-md">
                <img className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" src={imgUrl} alt={pet.name} />
                <button className="absolute top-4 right-4 w-12 h-12 bg-[#ffffff]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#00343e] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="bg-[#ffffff] p-8 rounded-b-md shadow-sm mt-0.5 border border-[#81b5c5]/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-[#00343e]">{pet.name}</h3>
                    <p className="text-[#2c6370] flex items-center gap-1 mt-1 text-sm">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {pet.location || 'Sanctuary'}
                    </p>
                  </div>
                  <span className="bg-[#89e9f6]/30 text-[#00555d] px-3 py-1 rounded-full text-xs font-bold">{pet.age} {pet.ageUnit === 0 ? 'Months' : 'Years'}</span>
                </div>
                <p className="text-[#2c6370] line-clamp-2 text-sm leading-relaxed mb-6">{pet.description}</p>
                <button className="w-full py-4 bg-[#d9f6ff] text-[#00656f] font-bold rounded-full group-hover:bg-[#00656f] group-hover:text-[#d4f9ff] transition-all active:scale-95">View Profile</button>
              </div>
            </Link>
          )}) : (
            <div className="col-span-3 text-center text-[#2c6370] py-12">No pets found matching your criteria.</div>
          )}
        </div>
      </main>
    </div>
  );
}
