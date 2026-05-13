import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeFeaturedPets({ featuredPets, favoriteIds, toggleFavorite, user, cat }) {
  return (
    <section className="bg-[#d9f6ff] py-24">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[#9b3e20] font-bold uppercase tracking-[0.2em] text-xs">Waiting for You</span>
            <h2 className="text-4xl font-headline font-extrabold text-[#00343e] mt-2">Featured Residents</h2>
          </div>
          <Link to="/pets" className="text-[#00656f] font-bold border-b-2 border-[#00656f]/20 hover:border-[#00656f] transition-all pb-1">View All Arrivals</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredPets.length > 0 ? featuredPets.map((pet, idx) => {
            const imgUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : {cat};
            return (
              <div className="group" key={pet.id}>
                <div className="relative overflow-hidden rounded-t-xl rounded-b-md">
                  <img className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110" src={imgUrl} alt={pet.name} />
                  {user?.role !== 'Admin' && user?.role !== 'Shelter' && (
                    <button onClick={() => toggleFavorite(pet.id)} className="absolute top-4 right-4 w-12 h-12 bg-[#ffffff]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9b3e20] shadow-lg hover:scale-110 active:scale-95 transition-all">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: favoriteIds.includes(pet.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                    </button>
                  )}
                </div>
                <div className="bg-[#ffffff] p-8 rounded-b-md shadow-sm mt-0.5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-[#00343e]">{pet.name}</h3>
                      <p className="text-[#2c6370] flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {pet.location || 'Sanctuary'}
                      </p>
                    </div>
                    <span className="bg-[#89e9f6] text-[#00555d] px-3 py-1 rounded-full text-xs font-bold">{pet.age} {pet.ageUnit === 0 ? 'Months' : 'Years'}</span>
                  </div>
                  <p className="text-[#2c6370] line-clamp-2 text-sm leading-relaxed mb-6">{pet.description}</p>
                  <Link to={`/pets/${pet.id}`}><button className="w-full py-4 bg-[#d9f6ff] text-[#00656f] font-bold rounded-full hover:bg-[#00656f] hover:text-[#d4f9ff] transition-all active:scale-95">Meet {pet.name}</button></Link>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-3 text-center text-[#2c6370] py-12">No featured pets available at the moment.</div>
          )}
        </div>
      </div>
    </section>
  );
}