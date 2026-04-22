import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PetDetailsPage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [adoptMessage, setAdoptMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // New states for favorites & reviews
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // Fetch Pet Details
    fetch(`/api/pets/${id}`)
      .then(res => res.json())
      .then(data => {
        setPet(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pet details:", err);
        setLoading(false);
      });

    // Fetch Reviews
    fetch(`/api/reviews/pet/${id}`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setReviews(data);
      })
      .catch(err => console.error("Error fetching reviews:", err));

    // Check if favorited (mocking user 2)
    fetch(`/api/favorites`)
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setIsFavorite(data.some(f => f.petId === parseInt(id)));
        }
      })
      .catch(err => console.error("Error checking favorite:", err));
  }, [id]);

  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch(`/api/adoption-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        petId: parseInt(id),
        message: adoptMessage,
        whyThisPet: "I love this pet"
      })
    })
    .then(res => {
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsAdoptModalOpen(false);
          setSuccess(false);
        }, 2000);
      }
    })
    .finally(() => setIsSubmitting(false));
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      fetch(`/api/favorites/${id}`, { method: 'DELETE' })
        .then(() => setIsFavorite(false));
    } else {
      fetch(`/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petId: parseInt(id) })
      }).then(() => setIsFavorite(true));
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    fetch(`/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ petId: parseInt(id), rating: newReview.rating, comment: newReview.comment })
    })
    .then(res => res.json())
    .then(data => {
      setReviews([data, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    })
    .finally(() => setSubmittingReview(false));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#e9f9ff]">Loading...</div>;
  if (!pet) return <div className="min-h-screen flex items-center justify-center bg-[#e9f9ff]">Pet not found</div>;

  const images = pet.imageUrls ? pet.imageUrls.split(',') : ["https://lh3.googleusercontent.com/aida-public/AB6AXuAFHUw8mCyhci96uVgVCrX-e9o0tXywR6WPfE9o4HGtWPxB9xaCf5iuxqdEHNbxOU4ewk0Fsw1U1GW5xLJ_QrLRfOowund1a_r5evXnA0NqZ7nMpF4SoKXClwx47Wk0EBFauekxSeWxW2Xeohze4pSfVWIKeZlTII09crZvpvMrxsCkCnj6Lx0KPrY_38axaITQSprbE90LDng_e5cEcVy_jMtpCpbOI6LqPRS20RxYlrs1iouGXzlq3uH9_CcPRfTlLBk3sJfL5wQ"];

  return (
    <div className="w-full bg-[#e9f9ff] text-[#00343e] min-h-screen font-body selection:bg-[#89e9f6] selection:text-[#00555d] scroll-smooth">
      <nav className="fixed top-0 w-full z-50 bg-cyan-50/70 backdrop-blur-xl flex items-center justify-between px-8 py-4 max-w-full font-headline text-sm tracking-tight shadow-none border-b border-[#bff0ff]/50">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-900">PetAdopt</Link>
          <div className="hidden md:flex gap-6">
            <Link to="/pets" className="text-cyan-700/70 hover:text-cyan-900 font-medium">Browse</Link>
            <Link to="/favorites" className="text-cyan-700/70 hover:text-cyan-900 font-medium">Favorites</Link>
            <Link to="/requests" className="text-cyan-700/70 hover:text-cyan-900 font-medium">My Requests</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-sm group">
              <img src={images[0]} alt={pet.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white/80 backdrop-blur-md text-[#00343e] px-4 py-2 rounded-full font-bold text-sm shadow-sm">{pet.age} {pet.ageUnit === 0 ? 'Months' : 'Years'}</span>
              </div>
              <button 
                onClick={toggleFavorite}
                className="absolute top-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#9f0519] shadow-lg hover:bg-white transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-3xl" style={isFavorite ? {fontVariationSettings: "'FILL' 1"} : {}}>favorite</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1, 4).map((img, i) => (
                <div key={i} className="h-40 rounded-xl overflow-hidden shadow-sm">
                  <img src={img} alt={`${pet.name} ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-headline font-extrabold text-[#00343e] tracking-tight mb-2">{pet.name}</h1>
            <p className="text-2xl text-[#00656f] font-medium mb-8">{pet.breed || 'Mixed Breed'} • {pet.gender === 0 ? 'Male' : 'Female'}</p>
            
            <div className="prose prose-lg text-[#2c6370] mb-10 leading-relaxed">
              <p>{pet.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#81b5c5]/20 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-[#70a5b4] font-bold mb-1">Location</p>
                <p className="font-bold text-[#00343e]">{pet.location || 'Sanctuary'}</p>
              </div>
              <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#81b5c5]/20 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-[#70a5b4] font-bold mb-1">Health Status</p>
                <p className="font-bold text-[#00343e]">Vaccinated & Microchipped</p>
              </div>
            </div>

            <div className="bg-[#d9f6ff] p-8 rounded-3xl border border-[#89e9f6]/40 flex items-center justify-between">
              <div>
                <p className="text-[#00555d] font-bold text-xl mb-1">Ready to bring {pet.name} home?</p>
                <p className="text-[#00656f] text-sm">Our adoption process is quick and easy.</p>
              </div>
              <button 
                onClick={() => setIsAdoptModalOpen(true)}
                className="bg-[#00343e] text-[#e9f9ff] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              >
                Adopt Me
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 border-t border-[#bff0ff] pt-16 max-w-4xl">
          <h2 className="text-4xl font-headline font-extrabold text-[#00343e] mb-10">Adopter Reviews</h2>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#bff0ff]/50 mb-12">
            <h3 className="text-xl font-bold mb-4 text-[#00555d]">Leave a Review</h3>
            <form onSubmit={submitReview} className="space-y-4">
              <div className="flex gap-4 items-center">
                <label className="text-sm font-bold text-[#2c6370]">Rating:</label>
                <select 
                  className="bg-[#f4fbfc] border-none rounded-md px-4 py-2"
                  value={newReview.rating}
                  onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value="4">⭐⭐⭐⭐ (4/5)</option>
                  <option value="3">⭐⭐⭐ (3/5)</option>
                  <option value="2">⭐⭐ (2/5)</option>
                  <option value="1">⭐ (1/5)</option>
                </select>
              </div>
              <textarea 
                className="w-full bg-[#f4fbfc] border-none rounded-xl px-4 py-3 min-h-[100px] focus:ring-2 focus:ring-[#00656f]/40"
                placeholder={`Share your experience with ${pet.name}...`}
                value={newReview.comment}
                onChange={e => setNewReview({...newReview, comment: e.target.value})}
                required
              />
              <button 
                disabled={submittingReview}
                className="bg-[#00656f] text-[#d4f9ff] px-6 py-2 rounded-full font-bold hover:bg-[#005861] transition-colors disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {reviews.length > 0 ? reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#81b5c5]/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#89e9f6] rounded-full flex items-center justify-center text-[#004147] font-bold">
                    {review.adopter ? review.adopter.firstName[0] : 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-[#00343e]">{review.adopter ? `${review.adopter.firstName} ${review.adopter.lastName}` : 'Anonymous User'}</p>
                    <p className="text-xs text-[#70a5b4]">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-auto text-yellow-400">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                  </div>
                </div>
                <p className="text-[#2c6370]">{review.comment}</p>
              </div>
            )) : (
              <p className="text-[#2c6370] italic">No reviews yet. Be the first to leave one!</p>
            )}
          </div>
        </div>
      </main>

      {/* Adoption Modal */}
      {isAdoptModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#001115]/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <div className="p-8">
              <h2 className="text-3xl font-headline font-bold text-[#00343e] mb-2">Adopt {pet.name}</h2>
              <p className="text-[#2c6370] mb-8">Tell us why you'd be a great match.</p>
              
              {success ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
                  <span className="material-symbols-outlined text-5xl mb-2 text-green-600">check_circle</span>
                  <p className="font-bold text-lg">Application Submitted!</p>
                  <p className="text-sm mt-1">The shelter will review your request shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleAdoptSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-[#00343e] mb-2">Your Message</label>
                    <textarea 
                      required
                      value={adoptMessage}
                      onChange={e => setAdoptMessage(e.target.value)}
                      className="w-full bg-[#f4fbfc] border-none rounded-xl px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-[#00656f]/40"
                      placeholder="Hi, I've always wanted a dog like..."
                    ></textarea>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button type="button" onClick={() => setIsAdoptModalOpen(false)} className="px-6 py-3 font-bold text-[#2c6370]">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="bg-[#00656f] text-[#d4f9ff] px-8 py-3 rounded-full font-bold shadow-md disabled:opacity-50">
                      {isSubmitting ? 'Sending...' : 'Send Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
