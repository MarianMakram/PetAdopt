import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
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
      const response = await apiClient.get(`/pets/${id}`);
      setPet(response.data);
    } catch (err) {
      console.error("Error fetching pet details:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await apiClient.get(`/reviews/pet/${id}`);
      if(Array.isArray(response.data)) setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await apiClient.get(`/favorites`);
      const data = response.data;
      if(Array.isArray(data)) {
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
      setReviews([response.data, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      alert(err.response?.data || "Only adopters who adopted this pet can leave a review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#e9f9ff]">Loading...</div>;
  if (!pet) return <div className="min-h-screen flex items-center justify-center bg-[#e9f9ff]">Pet not found</div>;

  const images = pet.imageUrls ? pet.imageUrls.split(',') : [{dog}];

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-sm">
              <img src={images[0]} alt={pet.name} className="w-full h-full object-cover" />
              {user?.role !== 'Admin' && user?.role !== 'Shelter' && (
                <button 
                  onClick={toggleFavorite}
                  className="absolute top-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9f0519] shadow-lg hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl" style={isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-headline font-extrabold text-[#00343e] mb-2">{pet.name}</h1>
            <p className="text-2xl text-[#00656f] font-medium mb-8">{pet.breed || 'Mixed Breed'}</p>
            
            <div className="flex flex-col gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-[#bff0ff]/50">
              <div className="flex items-center gap-3 text-[#2c6370]">
                <span className="material-symbols-outlined text-[#00656f]">calendar_month</span>
                <span className="text-lg font-medium">
                  {pet.age} {pet.ageUnit === 0 || pet.ageUnit === 'Months' ? (pet.age === 1 ? 'Month' : 'Months') : (pet.age === 1 ? 'Year' : 'Years')} old
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#2c6370]">
                <span className="material-symbols-outlined text-[#00656f]">medical_services</span>
                <span className="text-lg font-medium">{pet.healthStatus || 'Health status not provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-[#2c6370]">
                <span className="material-symbols-outlined text-[#00656f]">location_on</span>
                <span className="text-lg font-medium">{pet.location || 'Location not specified'}</span>
              </div>
            </div>

            <p className="text-[#2c6370] text-lg leading-relaxed mb-10">{pet.description}</p>

            {user?.role === 'Admin' || user?.role === 'Shelter' ? (
              <div className="bg-[#bff0ff]/30 text-[#00656f] px-10 py-5 rounded-full font-bold w-fit border border-[#00656f]/20">
                Viewing as {user.role}
              </div>
            ) : (
              <button 
                onClick={() => setIsAdoptModalOpen(true)}
                className="bg-[#00343e] text-[#e9f9ff] px-10 py-5 rounded-full font-bold shadow-lg w-fit hover:bg-[#005a6b] transition-colors"
              >
                Adopt {pet.name}
              </button>
            )}
          </div>
        </div>

        <div className="mt-24 border-t border-[#bff0ff] pt-16 max-w-4xl">
          <h2 className="text-4xl font-headline font-extrabold text-[#00343e] mb-10">Adopter Reviews</h2>
          {user?.role === 'Adopter' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#bff0ff]/50 mb-12">
              <h3 className="text-xl font-bold mb-4 text-[#00555d]">Leave a Review</h3>
              <form onSubmit={submitReview} className="space-y-4">
                <textarea 
                  className="w-full bg-[#f4fbfc] border-none rounded-xl px-4 py-3 min-h-[100px]"
                  placeholder={`Share your experience...`}
                  value={newReview.comment}
                  onChange={e => setNewReview({...newReview, comment: e.target.value})}
                  required
                />
                <button 
                  disabled={submittingReview}
                  className="bg-[#00656f] text-[#d4f9ff] px-8 py-3 rounded-full font-bold"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#81b5c5]/10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-[#89e9f6] rounded-full flex items-center justify-center font-bold">U</div>
                  <div>
                    <p className="font-bold">{review.adopter?.firstName || 'Anonymous'}</p>
                    <p className="text-xs text-[#70a5b4]">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-[#2c6370]">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isAdoptModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative">
            <h2 className="text-3xl font-bold mb-4">Adopt {pet.name}</h2>
            {success ? (
              <div className="text-center py-8">
                <p className="text-green-600 font-bold text-xl">Application Sent!</p>
              </div>
            ) : (
              <form onSubmit={handleAdoptSubmit}>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-[#00656f] uppercase tracking-wider mb-2">Introduction</label>
                    <textarea 
                      required
                      value={adoptMessage}
                      onChange={e => setAdoptMessage(e.target.value)}
                      className="w-full bg-[#f4fbfc] border-none rounded-xl px-4 py-3 min-h-[100px]"
                      placeholder="Tell the shelter about yourself..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#00656f] uppercase tracking-wider mb-2">Why this pet?</label>
                    <textarea 
                      required
                      value={whyThisPet}
                      onChange={e => setWhyThisPet(e.target.value)}
                      className="w-full bg-[#f4fbfc] border-none rounded-xl px-4 py-3 min-h-[100px]"
                      placeholder="What makes you a great match for this pet?"
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <button type="button" onClick={() => setIsAdoptModalOpen(false)} className="px-6 py-3 font-bold">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="bg-[#00656f] text-white px-8 py-3 rounded-full font-bold">
                    {isSubmitting ? 'Sending...' : 'Apply'}
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
