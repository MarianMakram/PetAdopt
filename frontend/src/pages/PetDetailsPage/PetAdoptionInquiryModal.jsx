import React from 'react';

export default function PetAdoptionInquiryModal({ pet, isAdoptModalOpen, setIsAdoptModalOpen, success, handleAdoptSubmit, adoptMessage, setAdoptMessage, whyThisPet, setWhyThisPet, isSubmitting }) {
  if (!isAdoptModalOpen) return null;

  return (
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
  );
}
