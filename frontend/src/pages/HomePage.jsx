import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import dog from "../assets/images/dog.png";
import cat from "../assets/images/cat.png";
import Hand from "../assets/images/unnamed (4).png";
import Walking from "../assets/images/Walking .png";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    species: '',
    breed: '',
    age: ''
  });
  const [featuredPets, setFeaturedPets] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    apiClient.get('/pets')
      .then(response => {
        const data = response.data?.data || response.data;
        if (Array.isArray(data)) {
          setFeaturedPets(data);
        }
      })
      .catch(err => console.error("Error fetching pets:", err));

    if (user?.role === 'Adopter') {
      apiClient.get('/favorites')
        .then(response => {
          setFavoriteIds(response.data.map(f => f.petId));
        })
        .catch(err => console.error("Error fetching favorites:", err));
    }
  }, [user]);

  const toggleFavorite = async (petId) => {
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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchParams.species && searchParams.species !== 'All Animals') params.append('species', searchParams.species);
    if (searchParams.breed) params.append('breed', searchParams.breed);
    if (searchParams.age && searchParams.age !== 'Any Age') {
      if (searchParams.age === 'Puppy/Kitten') params.append('ageMax', '1');
      else if (searchParams.age === 'Adult') { params.append('ageMin', '1'); params.append('ageMax', '5'); }
      else if (searchParams.age === 'Senior') params.append('ageMin', '6');
    }
    navigate(`/pets?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <main className="">
        <section className="px-8 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tighter text-[#00343e] leading-[1.1]">
                Every Soul Deserves a <span className="text-[#00656f] italic">Sanctuary</span>.
              </h1>
              <p className="text-xl text-[#2c6370] max-w-lg leading-relaxed">
                Discover your new best friend through our high-end, editorial sanctuary. We treat every animal with the dignity of a cover story.
              </p>

              {/* Role-Based Portal Access */}
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
                    <select
                      className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40"
                      value={searchParams.species}
                      onChange={e => setSearchParams({ ...searchParams, species: e.target.value })}
                    >
                      <option>All Animals</option>
                      <option value="0">Dogs</option>
                      <option value="1">Cats</option>
                      <option value="2">Birds</option>
                      <option value="3">Rabbits</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Breed</label>
                    <input
                      className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/40"
                      placeholder="e.g. Golden" type="text"
                      value={searchParams.breed}
                      onChange={e => setSearchParams({ ...searchParams, breed: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Age</label>
                    <select
                      className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40"
                      value={searchParams.age}
                      onChange={e => setSearchParams({ ...searchParams, age: e.target.value })}
                    >
                      <option>Any Age</option>
                      <option>Puppy/Kitten</option>
                      <option>Adult</option>
                      <option>Senior</option>
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
                        <button
                          onClick={() => toggleFavorite(pet.id)}
                          className="absolute top-4 right-4 w-12 h-12 bg-[#ffffff]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9b3e20] shadow-lg hover:scale-110 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: favoriteIds.includes(pet.id) ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
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
                )
              }) : (
                <div className="col-span-3 text-center text-[#2c6370] py-12">No featured pets available at the moment.</div>
              )}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto bg-[#00656f] rounded-xl relative p-12 md:p-24 overflow-hidden shadow-2xl">
            <div className="absolute -right-24 -bottom-24 w-[600px] h-[600px] bg-[#89e9f6] opacity-10 rounded-full"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
              <img className="h-full w-full object-cover mix-blend-overlay opacity-50" src={Hand} alt="Hand holding paw" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-5xl font-headline font-extrabold text-[#d4f9ff] leading-tight mb-8">
                Are you a Shelter or individual looking to <span className="text-[#89e9f6] italic">rehome</span>?
              </h2>
              <p className="text-[#89e9f6] text-lg leading-relaxed mb-12 opacity-90">
                Join our network of verified sanctuaries. We provide the platform, the audience, and the tools to find every animal their perfect forever home. Professional listing services at no cost to shelters.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#d4f9ff] text-[#00656f] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all">Register Your Shelter</button>
                <button className="border-2 border-[#d4f9ff] text-[#d4f9ff] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#d4f9ff] hover:text-[#00656f] transition-all">Learn More</button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#9b3e20] font-bold uppercase tracking-[0.2em] text-xs">Heartwarming Tales</span>
            <h2 className="text-4xl font-headline font-extrabold text-[#00343e] mt-4">Latest Stories from the Sanctuary</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img className="rounded-xl shadow-lg w-full h-[500px] object-cover" src={Walking} alt="Walking dogs" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#fdd34d] rounded-full flex items-center justify-center p-8 text-center -rotate-12 shadow-xl border-4 border-[#e9f9ff]">
                <p className="font-headline font-bold text-[#5c4900] text-sm">Read the "Adopted Together" Series</p>
              </div>
            </div>
            <div className="space-y-6">
              <span className="bg-[#ffc4b3] text-[#802b0d] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Story of the Month</span>
              <h3 className="text-4xl font-headline font-extrabold text-[#00343e] leading-tight">Finding Cooper: How a Senior Dog Healed a Broken Heart.</h3>
              <p className="text-[#2c6370] text-lg leading-relaxed italic">
                "I thought I was rescuing Cooper, but as the months went by, I realized he was the one who rescued me. Every gray hair on his muzzle tells a story of wisdom and quiet love..."
              </p>
              <div className="pt-4">
                <a className="inline-flex items-center gap-2 text-[#00656f] font-bold group" href="#">
                  Read the full story
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#00343e] text-[#e9f9ff] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-headline font-black tracking-tighter mb-6 block">PetAdopt</span>
            <p className="text-[#8de1f8]/70 max-w-sm leading-relaxed text-sm">
              Dedicated to transforming the pet adoption experience into a high-end, emotional, and dignifying journey for every living soul.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-6 text-[#e9f9ff]">Ecosystem</h4>
            <ul className="space-y-4 text-[#8de1f8]/60 text-sm">
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Find a Pet</a></li>
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Shelter Directory</a></li>
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Volunteer Portal</a></li>
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Pet Care Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold mb-6 text-[#e9f9ff]">Company</h4>
            <ul className="space-y-4 text-[#8de1f8]/60 text-sm">
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Our Mission</a></li>
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Success Stories</a></li>
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-[#89e9f6] transition-colors" href="#">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#e9f9ff]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#8de1f8]/40 text-xs">© 2024 PetAdopt Sanctuary Platform. All animal rights reserved.</p>
          <div className="flex gap-8 text-[#8de1f8]/40 text-xs">
            <a className="hover:text-[#e9f9ff] transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-[#e9f9ff] transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
