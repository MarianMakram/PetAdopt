import React from 'react';

export default function PullQuote() {
  return (
    <section className="mt-24 p-12 bg-primary-container/20 rounded-xl flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        <p className="text-display-md font-headline text-secondary leading-tight italic mb-6">
          "Every pet in your care is a life waiting to unfold into a beautiful story. Your management makes their journey possible."
        </p>
        <p className="text-on-surface-variant leading-relaxed">
          The PetAdopt platform ensures your listings reach the most compassionate families. Your data is encrypted and your pet's safety is our primary mission.
        </p>
      </div>
      <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-2xl">
        <img 
          alt="Human hand holding dog paw" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmNDbr7kagk_VAE6u8_81yjP252N_y8SYyGyTmwphSnmIizldAZff1zT1VKldQMrdOu1-mIQau1m5ka6KrCI8b6Q9Dm1-tD3tiDJ65xWXGEUCiLvM5OysCXNHGSlaH9D521gwTukws9WItRG_m1hCOSQVWnOfzYRay_wwm5oH-4TqeHuCy9w196HecGaZPLpWPNrjN3AMlAARNcE5vVXrWHbO6sNI0oOmpdNDHwJgnYZ9EjwHtKN_CSDCrf28kdl9K0s2086cvJoA"
        />
      </div>
    </section>
  );
}
