import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ activeTab = 'Dashboard' }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isAdopter = user?.role === 'Adopter';

  return (
    <aside className="h-screen w-64 border-r border-cyan-200/20 bg-cyan-50 dark:bg-cyan-950 hidden md:flex flex-col py-6 gap-2 shrink-0 sticky top-0 overflow-y-auto">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-black text-cyan-900 dark:text-cyan-50">PetAdopt</h1>
        <p className="text-[10px] uppercase tracking-widest font-bold text-cyan-600/60 mt-1">
          {isAdmin ? 'Admin Portal' : isAdopter ? 'Adopter Portal' : 'Shelter Portal'}
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {!isAdmin && !isAdopter ? (
          <>
            <Link to="/shelter/pets" className={`${activeTab === 'Dashboard' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/shelter/pets#pets-grid" className={`${activeTab === 'My Pets' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">pets</span>
              <span className="font-medium">My Pets</span>
            </Link>
            <Link to="/shelter/requests" className={`${activeTab === 'Requests' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">description</span>
              <span className="font-medium">Requests</span>
            </Link>
            <Link to="/shelter/reviews" className={`${activeTab === 'Reviews' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">reviews</span>
              <span className="font-medium">Reviews</span>
            </Link>
          </>
        ) : isAdmin ? (
          <>
            <Link to="/admin/users" className={`${activeTab === 'User Approvals' || activeTab === 'Dashboard' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">group</span>
              <span className="font-medium">User Approvals</span>
            </Link>
            <Link to="/admin/pets" className={`${activeTab === 'Pet Approvals' || activeTab === 'Approvals' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">verified_user</span>
              <span className="font-medium">Pet Approvals</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/pets" className={`${activeTab === 'Dashboard' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">search</span>
              <span className="font-medium">Browse Pets</span>
            </Link>
            <Link to="/my-requests" className={`${activeTab === 'My Requests' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">assignment</span>
              <span className="font-medium">My Requests</span>
            </Link>
            <Link to="/favorites" className={`${activeTab === 'Favorites' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">favorite</span>
              <span className="font-medium">Favorites</span>
            </Link>
            <Link to="/notifications" className={`${activeTab === 'Notifications' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
              <span className="material-symbols-outlined">notifications</span>
              <span className="font-medium">Notifications</span>
            </Link>
          </>
        )}

        <Link to="/profile" className={`${activeTab === 'Profile' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-medium">Profile</span>
        </Link>
      </nav>

      <div className="px-4 mt-auto">
        {!isAdmin && !isAdopter && (
          <Link to="/shelter/pets/new" className="w-full py-4 bg-cyan-800 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
            <span className="material-symbols-outlined">add</span>
            <span>Add New Pet</span>
          </Link>
        )}

        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-cyan-100 overflow-hidden border-2 border-cyan-200">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzJJN_uXhQWoDsvZyNEx9yFSEE9ZwaJNrxpCa1dR_28YaC5y1pG-VZ6fi8NoPdm8cu4Nw3Szqa-kNa0MknxISWYv6PUVrWK18fetYy07pxqSb26tlrHOBRm4VJaMcH8G_edy6KGwRgeE1f-vTfDO8XMx-WgkfQNOg0wgoJldIMGClNI0_eVx2vWPYmfamk3Jv9p7LyjIH_jFNuzX44GBtUMPANBw9eXtko0mALDiQbTkR67sbfn27NIAdhQ_kFbgqVJsiKbya9Atg"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-cyan-900">{user?.first_name} {user?.last_name}</p>
            <p className="text-[10px] text-cyan-600/70">{isAdmin ? 'System Administrator' : isAdopter ? 'Adopter' : 'Sanctuary Manager'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
