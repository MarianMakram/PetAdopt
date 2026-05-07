import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';

import { formatDistanceToNow } from 'date-fns';
import Header from '../components/owner-admin/Header';
import dog from "../assets/images/dog1.jpg";

export default function PetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [adoptMessage, setAdoptMessage] = useState("");
  const [whyThisPet, setWhyThisPet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPetDetails();
    fetchReviews();
    if (user) checkFavorite();
  }, [id, user]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/pets/${id}`);
      const data = response.data?.data || response.data;
      if (data && typeof data === 'object' && data.id) {
        setPet(data);
      } else {
        setPet(null);
      }
    } catch (err) {
      console.error("Error fetching pet details:", err);
      setPet(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/pet/${id}`);
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await apiClient.get(`/favorites`);
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) {
        setIsFavorite(data.some(f => f.petId === parseInt(id)));
      }
    } catch (err) {
      console.error("Error checking favorite:", err);
    }
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setIsSubmitting(true);
    try {
      await apiClient.post(`/adoption-requests`, {
        petId: parseInt(id),
        message: adoptMessage,
        whyThisPet: whyThisPet
      });
      setSuccess(true);
      setAdoptMessage("");
      setWhyThisPet("");
      setTimeout(() => {
        setIsAdoptModalOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      if (isFavorite) {
        await apiClient.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await apiClient.post(`/favorites`, { petId: parseInt(id) });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Favorite toggle failed", err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmittingReview(true);
    try {
      const response = await apiClient.post(`/reviews`, {
        petId: parseInt(id),
        rating: newReview.rating,
        comment: newReview.comment
      });
      const data = response.data?.data || response.data;
      setReviews([data, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      alert(err.response?.data || "Only adopters who adopted this pet can leave a review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-cyan-800">
      <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin"></div>
      <p className="font-bold animate-pulse">Fetching resident details...</p>
    </div>
  );


  if (!pet || !pet.name) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <span className="material-symbols-outlined text-6xl text-cyan-200">sentiment_dissatisfied</span>
      <div>
        <h2 className="text-2xl font-bold text-cyan-900 mb-2">Resident Not Found</h2>
        <p className="text-cyan-700/70">The pet you're looking for might have already found their forever home.</p>
      </div>
      <Link to="/pets" className="bg-cyan-800 text-white px-8 py-3 rounded-full font-bold shadow-lg">Browse Others</Link>
    </div>
  );

  const images = pet.imageUrls ? pet.imageUrls.split(',') : [{dog}];

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-cyan-100">
      <main className="pb-24 px-8 max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-cyan-900/10 border-4 border-white">
              <img src={images[0]} alt={pet.name} className="w-full h-full object-cover" />
              {user?.role === 'Adopter' && (
                <button
                  onClick={toggleFavorite}
                  className="absolute top-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9f0519] shadow-lg hover:scale-110 transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-3xl" style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
                </button>
              )}
              <div className="absolute bottom-6 left-6 flex gap-2">
                <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border backdrop-blur-md shadow-sm ${pet.status === 'Approved' ? 'bg-emerald-100/80 text-emerald-800 border-emerald-200' :
                  pet.status === 'Adopted' ? 'bg-cyan-100/80 text-cyan-800 border-cyan-200' :
                    'bg-amber-100/80 text-amber-800 border-amber-200'
                  }`}>
                  {pet.status || 'Available'}
                </span>
                <span className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-cyan-100 text-cyan-800 shadow-sm">
                  {pet.gender || 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-7xl font-headline font-black text-[#00343e] mb-2 tracking-tighter">{pet.name}</h1>
              <div className="flex items-center gap-3">
                <p className="text-2xl text-cyan-600 font-bold italic">{pet.breed || 'Mixed Breed'}</p>
                <div className="w-1.5 h-1.5 bg-cyan-200 rounded-full"></div>
                <p className="text-lg text-cyan-700/60 font-medium">{pet.location || 'Sanctuary'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-cyan-100/50 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-cyan-600 mb-2">calendar_month</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-700/40 mb-1">Age</p>
                <p className="text-lg font-bold text-cyan-900">
                  {pet.age} {pet.ageUnit === 0 || pet.ageUnit === 'Months' ? (pet.age === 1 ? 'Month' : 'Months') : (pet.age === 1 ? 'Year' : 'Years')}
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-cyan-100/50 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-cyan-600 mb-2">medical_services</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-700/40 mb-1">Health</p>
                <p className="text-lg font-bold text-cyan-900 truncate w-full px-2">{pet.healthStatus || 'Healthy'}</p>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h3 className="text-xs font-black uppercase tracking-widest text-cyan-700/40">The Story</h3>
              <p className="text-cyan-800 text-lg leading-relaxed">{pet.description}</p>
            </div>

            {user?.role === 'Admin' || user?.role === 'Shelter' ? (
              <div className="flex items-center gap-4">
                <div className="bg-cyan-800 text-white px-8 py-4 rounded-full font-bold shadow-lg">
                  Portal View: {user.role}
                </div>
                <button onClick={() => navigate(-1)} className="text-cyan-800 font-bold hover:underline">Go Back</button>
              </div>
            ) : pet.status === 'Adopted' ? (
              <div className="bg-emerald-100 text-emerald-800 px-10 py-5 rounded-full font-bold w-fit border border-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined">celebration</span>
                Found a Forever Home!
              </div>
            ) : (
              <button
                onClick={() => setIsAdoptModalOpen(true)}
                className="bg-[#00343e] text-white px-12 py-5 rounded-full font-black text-lg shadow-xl shadow-cyan-900/20 hover:bg-cyan-900 transition-all active:scale-95 w-fit group flex items-center gap-3"
              >
                Adopt {pet.name}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-32 border-t border-cyan-100 pt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-cyan-600 font-black uppercase tracking-[0.2em] text-xs">Testimonials</span>
              <h2 className="text-5xl font-headline font-black text-[#00343e] mt-2 tracking-tight">Reviews</h2>
              <p className="text-[#2c6370] font-medium mt-2">Hear from the families who found their perfect match.</p>
            </div>
            <div className="bg-white/50 backdrop-blur-md px-8 py-4 rounded-3xl border border-cyan-100 flex items-center gap-4 shadow-sm">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-sm font-black text-[#00343e]">{reviews.length} Story{reviews.length !== 1 ? 'ies' : ''}</span>
            </div>
          </div>

          {user?.role === 'Adopter' && (
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-cyan-900/5 border border-cyan-100 mb-20">
              <h3 className="text-2xl font-black mb-8 text-[#00343e]">Write your Review about {pet.name}</h3>
              <form onSubmit={submitReview} className="space-y-8">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-black uppercase tracking-widest text-[#2c6370]">Your Rating</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`transition-all hover:scale-125 ${newReview.rating >= star ? 'text-amber-400' : 'text-gray-200'}`}
                      >
                        <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: newReview.rating >= star ? "'FILL' 1" : "'FILL' 0" }}>
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  className="w-full bg-cyan-50/30 border-2 border-cyan-100 rounded-[2rem] px-8 py-6 min-h-[160px] outline-none focus:border-cyan-600 transition-all text-lg text-[#00343e] placeholder:text-[#5c8a95]/50"
                  placeholder={`Tell us about your new life with ${pet.name}...`}
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                />

                <div className="flex justify-end">
                  <button
                    disabled={submittingReview}
                    className="bg-cyan-800 text-white px-12 py-4 rounded-full font-black shadow-lg hover:bg-cyan-900 transition-all disabled:opacity-50 active:scale-95 flex items-center gap-3"
                  >
                    {submittingReview ? 'Posting...' : 'Post Story'}
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {reviews.length === 0 ? (
              <div className="col-span-full bg-white/40 border-2 border-dashed border-cyan-200 rounded-[3rem] p-24 text-center">
                <span className="material-symbols-outlined text-6xl text-cyan-200 mb-4">chat_bubble</span>
                <p className="text-xl font-bold text-cyan-800">Be the first to share a story about {pet.name}!</p>
                <p className="text-cyan-700/60 mt-2">Your experience can help others decide to adopt.</p>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="bg-white p-10 rounded-[3rem] shadow-xl shadow-cyan-900/5 border border-cyan-100 flex flex-col gap-8 group hover:border-cyan-300 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                        {(review.adopter?.first_name?.[0] || 'A').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-xl text-[#00343e]">{review.adopter?.first_name || 'Anonymous'}</p>
                        <p className="text-sm text-[#5c8a95] font-bold uppercase tracking-widest">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: review.rating >= s ? "'FILL' 1" : "'FILL' 0" }}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute -top-8 -left-4 text-6xl text-cyan-100/40 -z-10">format_quote</span>
                    <p className="text-[#2c6370] text-xl leading-relaxed italic relative z-10">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {isAdoptModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cyan-900/60 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl p-12 relative shadow-2xl">
            <button onClick={() => setIsAdoptModalOpen(false)} className="absolute top-8 right-8 text-cyan-900 hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <h2 className="text-4xl font-black mb-2 text-cyan-900 tracking-tighter">Adopt {pet.name}</h2>
            <p className="text-cyan-700 mb-10 font-medium">Start the journey of a lifetime by introducing yourself.</p>

            {success ? (
              <div className="text-center py-12 bg-emerald-50 rounded-3xl border border-emerald-100">
                <span className="material-symbols-outlined text-6xl text-emerald-500 mb-4 animate-bounce">check_circle</span>
                <p className="text-emerald-800 font-black text-2xl">Application Sent Successfully!</p>
                <p className="text-emerald-700 mt-2">The shelter will review your request shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleAdoptSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-cyan-900 uppercase tracking-[0.2em] mb-3 ml-2">Introduction</label>
                    <textarea
                      required
                      value={adoptMessage}
                      onChange={e => setAdoptMessage(e.target.value)}
                      className="w-full bg-cyan-50/50 border-2 border-cyan-100 rounded-3xl px-8 py-6 min-h-[140px] outline-none focus:border-cyan-600 transition-all text-lg"
                      placeholder="Tell the shelter about your home and lifestyle..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-cyan-900 uppercase tracking-[0.2em] mb-3 ml-2">Why {pet.name}?</label>
                    <textarea
                      required
                      value={whyThisPet}
                      onChange={e => setWhyThisPet(e.target.value)}
                      className="w-full bg-cyan-50/50 border-2 border-cyan-100 rounded-3xl px-8 py-6 min-h-[140px] outline-none focus:border-cyan-600 transition-all text-lg"
                      placeholder="What draws you to this specific resident?"
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-6 justify-end pt-4">
                  <button type="button" onClick={() => setIsAdoptModalOpen(false)} className="px-8 py-4 font-black text-cyan-800 hover:text-cyan-900 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="bg-cyan-800 text-white px-12 py-5 rounded-full font-black text-lg shadow-xl hover:bg-cyan-900 transition-all disabled:opacity-50 active:scale-95 flex items-center gap-3">
                    {isSubmitting ? 'Sending...' : 'Send Application'}
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
