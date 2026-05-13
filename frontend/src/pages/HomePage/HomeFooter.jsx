import React from 'react';

export default function HomeFooter() {
  return (
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
  );
}