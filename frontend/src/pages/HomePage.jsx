import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    species: '',
    breed: '',
    age: ''
  });
  const [featuredPets, setFeaturedPets] = useState([]);

  useEffect(() => {
    fetch('/api/pets?page=1&pageSize=3')
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setFeaturedPets(data.data);
        }
      })
      .catch(err => console.error("Error fetching pets:", err));
  }, []);

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
      <nav className="fixed top-0 w-full z-50 bg-cyan-50/70 dark:bg-cyan-950/70 backdrop-blur-xl flex items-center justify-between px-8 py-4 max-w-full font-headline text-sm tracking-tight shadow-none">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-900 dark:text-cyan-50">PetAdopt</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/pets" className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200">Browse</Link>
            <Link to="/owner/pets" className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200">Shelters</Link>
            <Link to="/" className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200">Stories</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-cyan-800 dark:text-cyan-100">
            <button className="material-symbols-outlined hover:text-cyan-900 transition-colors" data-icon="notifications">notifications</button>
            <button className="material-symbols-outlined hover:text-cyan-900 transition-colors" data-icon="favorite">favorite</button>
          </div>
          <button className="bg-gradient-to-br from-[#00656f] to-[#89e9f6] text-[#d4f9ff] px-6 py-2.5 rounded-full font-bold shadow-sm hover:translate-y-[-1px] transition-all">Profile</button>
        </div>
      </nav>

      <main className="pt-24">
        <section className="px-8 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl font-headline font-extrabold tracking-tighter text-[#00343e] leading-[1.1]">
                Every Soul Deserves a <span className="text-[#00656f] italic">Sanctuary</span>.
              </h1>
              <p className="text-xl text-[#2c6370] max-w-lg leading-relaxed">
                Discover your new best friend through our high-end, editorial sanctuary. We treat every animal with the dignity of a cover story.
              </p>
              
              <div className="bg-[#adecff] p-4 rounded-xl shadow-sm border border-[#81b5c5]/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Type</label>
                    <select 
                      className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40"
                      value={searchParams.species}
                      onChange={e => setSearchParams({...searchParams, species: e.target.value})}
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
                      onChange={e => setSearchParams({...searchParams, breed: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c6370] px-1">Age</label>
                    <select 
                      className="bg-[#ffffff] border-none rounded-sm text-sm focus:ring-2 focus:ring-[#00656f]/40"
                      value={searchParams.age}
                      onChange={e => setSearchParams({...searchParams, age: e.target.value})}
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
              <img alt="Elegant Golden Retriever" className="w-full h-[600px] object-cover rounded-xl shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgZ-u68QbiDsSM_1pxRoAWKhlVJWhLX3OJkYlPyjPC7oGtWTePFDzAnnOHkLWCIHCLzdB12oDcca18QjgfL0zwPtKncJMxpcQQ_PQoev-LvkwCezsdfpVkLOiGi7_bFYlbgeI1yNMy34Cct8JCGlQadbuaMXBLawNbJo_lW-TUytHmwvp_uyxiUoH5OMt1bwzZpAfhYYryxtPUu-GDRtlDvJuG14Otjrlqnz858PevRx0YrXmUgJmR9qgLkTX1JSpm0g-h-c6WnZ8" />
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
                const imgUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHUw8mCyhci96uVgVCrX-e9o0tXywR6WPfE9o4HGtWPxB9xaCf5iuxqdEHNbxOU4ewk0Fsw1U1GW5xLJ_QrLRfOowund1a_r5evXnA0NqZ7nMpF4SoKXClwx47Wk0EBFauekxSeWxW2Xeohze4pSfVWIKeZlTII09crZvpvMrxsCkCnj6Lx0KPrY_38axaITQSprbE90LDng_e5cEcVy_jMtpCpbOI6LqPRS20RxYlrs1iouGXzlq3uH9_CcPRfTlLBk3sJfL5wQ";
                return (
                <div className={`group ${idx === 1 ? 'mt-8' : ''}`} key={pet.id}>
                  <div className="relative overflow-hidden rounded-t-xl rounded-b-md">
                    <img className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110" src={imgUrl} alt={pet.name} />
                    <button className="absolute top-4 right-4 w-12 h-12 bg-[#ffffff]/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9b3e20] shadow-lg">
                      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                    </button>
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
              )}) : (
                <div className="col-span-3 text-center text-[#2c6370] py-12">No featured pets available at the moment.</div>
              )}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto bg-[#00656f] rounded-xl relative p-12 md:p-24 overflow-hidden shadow-2xl">
            <div className="absolute -right-24 -bottom-24 w-[600px] h-[600px] bg-[#89e9f6] opacity-10 rounded-full"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
              <img className="h-full w-full object-cover mix-blend-overlay opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwvdhEYBbuK552BYCMQf4E4CnRIIHUCqa79TS-gfh7ByD_RZNJ4daGo8Coakxy0t7dOkwcydxvfIwlpXwn_KggfyvBQP_f1DyzeANDTS09STIIryqGsZS306YwJkBJoyclgJs9n4Y_cJ7JmCAtAiKoOsbvhhyFudfL8qcUd5m0iyWpnEbjFz-frglp7K-bTzkNwBkPr3oEbqLtbjvPU41uvGBdWjmtjmgQNEdFG8RIJ0XThUTgDVEypY1moSJ515Ao-DCebYToxSo" alt="Hand holding paw" />
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
              <img className="rounded-xl shadow-lg w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrx75qyqk5KOjSbsTHhCIzLLoHPkPt1ezopcLleNo1RrBbZ3o_VZhWtAV7Bfl79H2PKDVpWO_WS2LLie3_x9ThjSkd6JgZmZ-TkOtGI5a0FVcjliCa1ExYRhKi4BXFo_MoQnRBIzAL9a5ty4kgcLqZEHgYk-UoqtlJQS78qENVBZp7GL7QPrazZBmy_7bORvCURD-vm_lPqORcidNcAWmpX2ZFzP8y0Jx1TGnaF12vWajifEP_l3TaxnMzSQeGsMDfNE_gAqRuvpo" alt="Walking dogs" />
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
