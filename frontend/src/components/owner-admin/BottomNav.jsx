import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomNav({ activeTab = 'Dashboard' }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 py-3 bg-white/80 dark:bg-cyan-950/80 backdrop-blur-lg rounded-t-[3rem] shadow-[0_-10px_30px_rgba(0,52,62,0.06)] border-t border-cyan-100 dark:border-cyan-800">
      <Link to="/" className={`${activeTab === 'Home' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
        <span className="material-symbols-outlined">home</span>
        <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Home</span>
      </Link>
      <Link to="/admin/approvals" className={`${activeTab === 'Approvals' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
        <span className="material-symbols-outlined">verified_user</span>
        <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Approvals</span>
      </Link>
      <Link to="#" className={`${activeTab === 'Requests' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
        <span className="material-symbols-outlined">chat_bubble</span>
        <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Requests</span>
      </Link>
      <Link to="#" className={`${activeTab === 'Profile' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
        <span className="material-symbols-outlined">person_2</span>
        <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Profile</span>
      </Link>
    </nav>
  );
}
