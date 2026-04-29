import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/owner-admin/Sidebar';
import apiClient from '../../services/apiClient';

export default function RequestsDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Pending"); // "Pending", "Accepted", "Rejected"

  const fetchRequests = async () => {
    try {
      const data = await apiClient.get('/shelter/requests');
      setRequests(data.data || data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await apiClient.patch(`/shelter/requests/${id}/accept`);
      fetchRequests();
    } catch (err) {
      console.error("Error accepting:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await apiClient.patch(`/shelter/requests/${id}/reject`, {
        reason: "Not a good fit at this time."
      });
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting:", err);
    }
  };

  const filteredRequests = requests.filter(r => {
    if (filter === "Pending") return r.status === 0 || r.status === "Pending";
    if (filter === "Accepted") return r.status === 1 || r.status === "Accepted";
    if (filter === "Rejected") return r.status === 2 || r.status === "Rejected";
    return false;
  });

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen flex overflow-hidden font-body">
      <Sidebar activeTab="Requests" />

      <main className="flex-1 overflow-y-auto relative h-screen bg-[#e9f9ff]">
        <header className="fixed top-0 right-0 left-0 md:left-64 z-50 bg-cyan-50/70 dark:bg-cyan-950/70 backdrop-blur-xl flex items-center justify-between px-8 py-4 max-w-full">
          <h1 className="text-2xl font-bold tracking-tighter text-cyan-900 dark:text-cyan-50 font-headline">PetAdopt</h1>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 font-headline text-sm tracking-tight">
              <Link className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200" to="/pets">Browse</Link>
              <Link className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200" to="/shelter/pets">My Pets</Link>
              <Link className="text-cyan-700/70 dark:text-cyan-300/70 hover:text-cyan-900 dark:hover:text-cyan-50 transition-colors scale-95 active:scale-90 duration-200" to="/">Home</Link>
            </div>
            <div className="flex items-center gap-4 text-cyan-800 dark:text-cyan-100">
              <span className="material-symbols-outlined cursor-pointer hover:scale-110 duration-200">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:scale-110 duration-200">favorite</span>
              <div className="flex items-center gap-2 pl-4 border-l border-cyan-200/50">
                <img className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIfohqwvv6uC5tx-WYqqegSGX8ywuxbJ054PEKUchyK_uQtFD2zUXcFUpqPz8Jll2om-1zE7QKWwibM1ckfPfO8KxMX4VNBfjBOu-OqqjYetNZXS0fru53QGO2xmzivAVwT9gD1bdggjPq_brK-S6gIsXgWH8D1vFFvPLC3ZwZCJbNQv4m6v3AAMKCQ4xDN7zVwOXRmGLi5LEtab2PbGVVycEgbCK7GPFYxLJCzsFXg9evLB7-JKm8CmEvKhcM-_WXMPAayy9Dlq4" alt="Profile" />
                <span className="text-sm font-bold">Profile</span>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-24 pb-32 px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-black text-[#00343e] tracking-tight mb-2 font-headline">Adoption Requests</h2>
              <p className="text-[#2c6370] max-w-2xl text-lg leading-relaxed">
                Review and manage incoming interest for your residents.
              </p>
            </div>
            <div className="flex bg-white/50 backdrop-blur-md rounded-full p-1 border border-cyan-200/30">
              {['Pending', 'Accepted', 'Rejected'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${filter === t ? 'bg-cyan-600 text-white shadow-md' : 'text-cyan-600 hover:bg-cyan-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {loading ? <p className="text-[#2c6370]">Loading requests...</p> : filteredRequests.length === 0 ? <p className="text-[#2c6370]">No requests found in this category.</p> : filteredRequests.map((req, i) => {
              const petName = req.pet?.name || 'Unknown Pet';
              const breed = req.pet?.breed || 'Unknown';
              const age = req.pet?.age ? `${req.pet.age} ${req.pet.ageUnit === 0 ? 'Months' : 'Years'}` : '';
              const adopterName = req.adopter?.name || `User ID: ${req.adopterId}`;
              const date = new Date(req.requestedAt).toLocaleDateString();
              const time = new Date(req.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              const isPending = req.status === 0 || req.status === "Pending";
              const isAccepted = req.status === 1 || req.status === "Accepted";
              
              const statusStr = isPending ? 'Pending Review' : isAccepted ? 'Accepted' : 'Rejected';
              const imgUrl = req.pet?.imageUrls ? req.pet.imageUrls.split(',')[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuBahk49U5cTrFQLAZlaKJz07niP63W0Az4g4aSygWFt9IomZ63gBQR3-qtnEHh9epvwUmpJdCG2jI-xtSRXOcmLenY17D1JMo3mWSTWkQ5gypTwccqYnL6cg3EKa4HZL9jfdYqdcFtMIlBmKQkHbiiz4zlbtwLyJxT2oki_Ga6S-j01ky6DSa-xAiJh_eCHSdNFwUueLmrAuuHlZP69q-PnNQxHmpOM4JDPI2w5XILA2QawjB4TWAQZl9fEqj-fUoz7zrTZId1MlSI";

              return (
                <div key={req.id} className="bg-[#ffffff] p-6 rounded-xl border border-[#81b5c5]/10 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="relative shrink-0">
                      <img className="w-24 h-24 rounded-lg object-cover" src={imgUrl} alt={petName} />
                      {i === 0 && isPending && <div className="absolute -top-2 -right-2 bg-[#9b3e20] text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">New</div>}
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-[#2c6370] font-bold uppercase tracking-widest mb-1">Pet Name</p>
                        <p className="text-xl font-bold text-[#00343e] font-headline">{petName}</p>
                        <p className="text-sm text-[#2c6370]">{breed} • {age}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#2c6370] font-bold uppercase tracking-widest mb-1">Adopter</p>
                        <p className="text-lg font-medium text-[#00343e]">{adopterName}</p>
                        <button className="text-[#00656f] text-xs font-bold hover:underline flex items-center gap-1 mt-1">
                          View Adopter Profile
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </button>
                      </div>
                      <div>
                        <p className="text-xs text-[#2c6370] font-bold uppercase tracking-widest mb-1">Date Submitted</p>
                        <p className="text-lg font-medium text-[#00343e]">{date}</p>
                        <p className="text-xs text-[#2c6370]">{time}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isPending ? (
                          <>
                            <button onClick={() => handleAccept(req.id)} className="flex items-center justify-center gap-1 bg-[#00656f] text-white py-2 px-5 rounded-full text-sm font-bold hover:bg-[#00555d] shadow-sm active:scale-95 transition-all">
                              <span className="material-symbols-outlined text-[18px]">check</span>
                              Approve
                            </button>
                            <button onClick={() => handleReject(req.id)} className="flex items-center justify-center gap-1 border border-gray-200 text-gray-600 bg-gray-50 py-2 px-5 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all">
                              <span className="material-symbols-outlined text-[18px]">close</span>
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${isAccepted ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                            {isAccepted ? 'Approved' : 'Rejected'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <section className="mt-24 bg-[#d9f6ff] rounded-xl p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#00656f]/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 md:w-1/2">
              <p className="text-3xl font-bold text-[#9b3e20] mb-6 font-headline leading-tight italic">
                "Choosing the right home is the most important part of our mission. Thank you for your careful consideration."
              </p>
              <p className="text-[#2c6370]">
                Our Matching Algorithm currently suggests <span className="text-[#00656f] font-bold">Eleanor Vance</span> as a 98% match for <span className="text-[#00656f] font-bold">Barnaby</span> based on their lifestyle preferences and past experience.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <img className="rounded-xl shadow-2xl relative z-10 transform md:rotate-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXRXZKHvBl95z20DMEN_rk1mZ1D8jrIARlXuSVchilviTrMUQyurAwMJ1UcqiYk-D-aRhqw8hS4C66gtz8cSrPsB-3jmr8gNc66AZo_1CrPHuP4UqLTD1wQ8Vnndx4eMAUEH69C2d85Z4zLGn5nOBi5kOFl9nG-I_4Gr6qwXXM8sUSbelJOTmrv21OXjGXbRkWxSotd0BQf8iZrDj8-lVvuQwbwq4HAYYQvT-ao8MMYu3IjYLID-ggnc0WcCzlyhI2j0S8cTB4P2c" alt="Paw" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
