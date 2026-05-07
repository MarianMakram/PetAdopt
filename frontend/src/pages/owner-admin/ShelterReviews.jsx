import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner-admin/Sidebar';
import Header from '../../components/owner-admin/Header';
import BottomNav from '../../components/owner-admin/BottomNav';
import apiClient from '../../services/apiClient';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

export default function ShelterReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lastDataUpdate } = useNotifications();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get('/reviews/shelter');
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch shelter reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [lastDataUpdate]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#e9f9ff] text-[#00343e] font-body">
      <Sidebar activeTab="Reviews" />

      <main className="flex-1 overflow-y-auto pb-24 md:pb-12 relative">
        <Header />

        <div className="pt-24 pb-32 px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-headline font-black text-[#00343e] mb-3">
              Reviews
            </h1>
            <p className="text-[#2c6370] text-lg max-w-2xl leading-relaxed">
              These heart-warming reviews are from families who adopted your residents.
              They are the reason we do what we do.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-600 rounded-full animate-spin"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white/50 border border-dashed border-cyan-200 rounded-[3rem] p-24 text-center">
              <span className="material-symbols-outlined text-7xl text-cyan-200 mb-6">
                sentiment_satisfied
              </span>
              <h3 className="text-2xl font-bold text-[#00343e] mb-2">No reviews yet</h3>
              <p className="text-[#2c6370]">Reviews will appear here once your pets are adopted!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-cyan-900/5 border border-cyan-100/20 flex flex-col gap-6 group hover:border-cyan-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#89e9f6] to-[#00bcd4] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner">
                        {(review.adopter?.first_name?.[0] || 'A').toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#00343e] text-lg">{review.adopter?.first_name || 'Anonymous'}</p>
                          <span className="px-2 py-0.5 bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-100">Verified Adopter</span>
                        </div>
                        <p className="text-xs text-[#5c8a95] font-medium">
                          {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: review.rating >= s ? "'FILL' 1" : "'FILL' 0" }}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-cyan-50/50 rounded-2xl p-4 border border-cyan-100/30 flex items-center gap-4">
                    <img
                      src={review.pet?.imageUrls?.split(',')[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80"}
                      alt={review.pet?.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-cyan-600">Review for</p>
                      <p className="font-bold text-[#00343e]">{review.pet?.name || 'Unknown Pet'}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute -top-4 -left-2 text-4xl text-cyan-100/50 -z-10">format_quote</span>
                    <p className="text-[#2c6370] leading-relaxed italic text-lg">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav activeTab="Reviews" />
    </div>
  );
}
