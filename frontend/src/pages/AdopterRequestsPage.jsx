import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';

export default function AdopterRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    apiClient.get('/adoption-requests')
      .then(response => {
        setRequests(response.data);
      })
      .catch(err => console.error("Error fetching requests:", err));
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 0: return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">Pending</span>;
      case 1: return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wider">Accepted</span>;
      case 2: return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider">Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d]">
      <main className="pt-10 pb-24 px-8 max-w-4xl mx-auto">
        <header className="mb-12 border-b border-[#bff0ff] pb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-[#00343e] mb-4">
            Adoption <span className="text-[#00656f] italic">Requests</span>
          </h1>
          <p className="text-lg text-[#2c6370]">Track the status of your adoption applications.</p>
        </header>

        <div className="flex flex-col gap-6">
          {requests.length > 0 ? requests.map((req) => {
            const pet = req.pet;
            const imgUrl = pet.imageUrls ? pet.imageUrls.split(',')[0] : "https://lh3.googleusercontent.com/aida-public/AB6AXuAFHUw8mCyhci96uVgVCrX-e9o0tXywR6WPfE9o4HGtWPxB9xaCf5iuxqdEHNbxOU4ewk0Fsw1U1GW5xLJ_QrLRfOowund1a_r5evXnA0NqZ7nMpF4SoKXClwx47Wk0EBFauekxSeWxW2Xeohze4pSfVWIKeZlTII09crZvpvMrxsCkCnj6Lx0KPrY_38axaITQSprbE90LDng_e5cEcVy_jMtpCpbOI6LqPRS20RxYlrs1iouGXzlq3uH9_CcPRfTlLBk3sJfL5wQ";
            
            return (
            <div key={req.id} className="bg-white rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm border border-[#bff0ff]/50 hover:shadow-md transition-shadow">
              <img src={imgUrl} alt={pet.name} className="w-32 h-32 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold font-headline">{pet.name}</h3>
                  {getStatusBadge(req.status)}
                </div>
                <p className="text-sm text-[#2c6370] mb-4">Applied on: {new Date(req.requestedAt).toLocaleDateString()}</p>
                <div className="bg-[#f4fbfc] p-4 rounded-lg">
                  <p className="text-sm font-semibold text-[#00656f] mb-1">Your Message:</p>
                  <p className="text-sm text-[#00343e] italic">"{req.message}"</p>
                </div>
                {req.status === 2 && req.rejectionReason && (
                   <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-100 text-sm">
                      <p className="font-semibold text-red-800">Feedback from Shelter:</p>
                      <p className="text-red-700 mt-1">{req.rejectionReason}</p>
                   </div>
                )}
                {req.status === 1 && (
                   <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100 text-sm flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-green-800">Congratulations!</p>
                        <p className="text-green-700 mt-1">The shelter has accepted your application.</p>
                      </div>
                      <Link to={`/pets/${pet.id}`} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-xs hover:bg-green-700">Write a Review</Link>
                   </div>
                )}
              </div>
            </div>
          )}) : (
            <div className="text-center text-[#2c6370] py-16 bg-white rounded-xl border border-[#bff0ff]/50">
              <span className="material-symbols-outlined text-4xl mb-4 text-[#70a5b4]">pets</span>
              <p className="text-lg">You haven't submitted any adoption requests yet.</p>
              <Link to="/pets" className="text-[#00656f] font-bold mt-4 inline-block hover:underline">Find your new best friend</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
