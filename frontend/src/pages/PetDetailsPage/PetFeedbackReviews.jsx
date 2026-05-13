import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function PetFeedbackReviews({ pet, user, reviews, newReview, setNewReview, submitReview, submittingReview }) {
  return (
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
  );
}
