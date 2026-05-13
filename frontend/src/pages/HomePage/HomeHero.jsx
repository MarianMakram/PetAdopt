import React from 'react';

export default function HomeHero({ user, navigate, searchParams, setSearchParams, handleSearch, dog }) {
  return (
    <section className="px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tighter text-[#00343e] leading-[1.1]">
            Every Soul Deserves a <span className="text-[#00656f] italic">Sanctuary</span>.
          </h1>
          <p className="text-xl text-[#2c6370] max-w-lg leading-relaxed">
            Discover your new best friend through our high-end, editorial sanctuary. We treat every animal with the dignity of a cover story.
          </p>

          {user && (
            <div className="flex flex-wrap gap-3 pt-2">
              {user.role === 'Admin' ? (
                <>
                  <button onClick={() => navigate('/admin/pets')} className="px-6 py-3 bg-[#00656f] text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">Pet Approvals</button>
                  <button onClick={() => navigate('/admin/users')} className="px-6 py-3 bg-[#ffc4b3] text-[#9b3e20] rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">User Approvals</button>
                </>
              ) : user.role === 'Shelter' ? (
                <>
                  <button onClick={() => navigate('/shelter/pets')} className="px-6 py-3 bg-[#00656f] text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">Dashboard</button>
                  <button onClick={() => navigate('/shelter/pets#pets-grid')} className="px-6 py-3 bg-[#89e9f6] text-[#00555d] rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">My Pets</button>
                  <button onClick={() => navigate('/shelter/requests')} className="px-6 py-3 bg-[#ffc4b3] text-[#9b3e20] rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">Requests</button>
                </>
              ) : user.role === 'Adopter' ? (
                <>
                  <button onClick={() => navigate('/my-requests')} className="px-6 py-3 bg-[#ffc4b3] text-[#9b3e20] rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">My Applications</button>
                  <button onClick={() => navigate('/favorites')} className="px-6 py-3 bg-[#89e9f6] text-[#00555d] rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all">Favorites</button>
                </>
              ) : null}
            </div>
          )}

          <div className="bg-[#adecff] p-4 rounded-xl shadow-sm border border-[#81b5c5]/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Type</label>
                <select className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40" value={searchParams.species} onChange={e => setSearchParams({ ...searchParams, species: e.target.value })}>
                  <option>All Animals</option>
                  <option value="0">Dogs</option>
                  <option value="1">Cats</option>
                  <option value="2">Birds</option>
                  <option value="3">Rabbits</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Breed</label>
                <input className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/40" placeholder="e.g. Golden" type="text" value={searchParams.breed} onChange={e => setSearchParams({ ...searchParams, breed: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Age</label>
                <select className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40" value={searchParams.age} onChange={e => setSearchParams({ ...searchParams, age: e.target.value })}>
                  <option>Any Age</option>
                  <option value="Young (0-2 yr)">Young (0-2 yr)</option>
                  <option value="Adult (2-5 yr)">Adult (2-5 yr)</option>
                  <option value="Mature (5-10 yr)">Mature (5-10 yr)</option>
                  <option value="Senior (10+ yr)">Senior (10+ yr)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={handleSearch} className="w-full h-[42px] bg-[#00656f] text-[#d4f9ff] rounded-sm flex items-center justify-center gap-2 font-bold hover:bg-[#005861] transition-colors">
                  <span className="material-symbols-outlined text-lg" data-icon="search">search</span>
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#ffc4b3]/30 rounded-full blur-3xl -z-10"></div>
          <img alt="Elegant Golden Retriever" className="w-full h-[600px] object-cover rounded-xl shadow-2xl" src={dog} />
          <div className="absolute -bottom-6 -right-6 bg-[#ffffff] p-6 rounded-lg shadow-xl max-w-xs border border-[#81b5c5]/10">
            <p className="text-[#9b3e20] font-headline font-bold text-lg leading-tight mb-2">"Adopting Luna was the best decision of our lives."</p>
            <p className="text-[#2c6370] text-sm">— The Thompson Family</p>
          </div>
        </div>
      </div>
    </section>
  );
}