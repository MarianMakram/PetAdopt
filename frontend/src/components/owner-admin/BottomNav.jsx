import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BottomNav({ activeTab = 'Dashboard' }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isAdopter = user?.role === 'Adopter';
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 py-3 bg-white/80 dark:bg-cyan-950/80 backdrop-blur-lg rounded-t-[3rem] shadow-[0_-10px_30px_rgba(0,52,62,0.06)] border-t border-cyan-100 dark:border-cyan-800">
      {!isAdmin && !isAdopter && (
        <>
          <Link to="/shelter/pets" className={`${activeTab === 'Dashboard' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Home</span>
          </Link>
          <Link to="/shelter/pets#pets-grid" className={`${activeTab === 'My Pets' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">pets</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Pets</span>
          </Link>
          <Link to="/shelter/requests" className={`${activeTab === 'Requests' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">description</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Requests</span>
          </Link>
        </>
      )}
      {isAdmin && (
        <>
          <Link to="/admin/users" className={`${activeTab === 'User Approvals' || activeTab === 'Dashboard' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">group</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Users</span>
          </Link>
          <Link to="/admin/pets" className={`${activeTab === 'Pet Approvals' || activeTab === 'Approvals' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Pets</span>
          </Link>
        </>
      )}
      {isAdopter && (
        <>
          <Link to="/pets" className={`${activeTab === 'Dashboard' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">search</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Browse</span>
          </Link>
          <Link to="/my-requests" className={`${activeTab === 'My Requests' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Requests</span>
          </Link>
          <Link to="/favorites" className={`${activeTab === 'Favorites' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Favorites</span>
          </Link>
        </>
      )}
      <Link to="/profile" className={`${activeTab === 'Profile' ? 'text-cyan-900 dark:text-white bg-cyan-100 dark:bg-cyan-800 rounded-2xl scale-110' : 'text-cyan-600/60 dark:text-cyan-400/60 active:bg-cyan-50 dark:active:bg-cyan-900'} flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-out`}>
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] uppercase tracking-widest font-bold mt-1">Profile</span>
      </Link>
    </nav>
  );
}
