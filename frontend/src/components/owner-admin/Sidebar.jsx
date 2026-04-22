import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ activeTab = 'Dashboard' }) {
  return (
    <aside className="h-screen w-64 border-r border-cyan-200/20 bg-cyan-50 dark:bg-cyan-950 hidden md:flex flex-col py-6 gap-2 shrink-0 sticky top-0 overflow-y-auto">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-black text-cyan-900 dark:text-cyan-50">PetAdopt</h1>
        <p className="text-[10px] uppercase tracking-widest font-bold text-cyan-600/60 mt-1">Shelter Portal</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        <Link to="/owner/pets" className={`${activeTab === 'Dashboard' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link to="/owner/pets#pets-grid" className={`${activeTab === 'My Pets' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
          <span className="material-symbols-outlined">pets</span>
          <span className="font-medium">My Pets</span>
        </Link>
        <Link to="/owner/requests" className={`${activeTab === 'Requests' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
          <span className="material-symbols-outlined">description</span>
          <span className="font-medium">Requests</span>
        </Link>
        <Link to="/admin/approvals" className={`${activeTab === 'Approvals' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
          <span className="material-symbols-outlined">verified_user</span>
          <span className="font-medium">Approvals</span>
        </Link>
        <Link to="#" className={`${activeTab === 'Settings' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-md' : 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100/50 dark:hover:bg-cyan-800/50'} rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1`}>
          <span className="material-symbols-outlined">settings</span>
          <span className="font-medium">Settings</span>
        </Link>
      </nav>
      
      <div className="px-4 mt-auto">
        <Link to="/owner/pets/add" className="w-full py-4 bg-primary text-on-primary rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
          <span className="material-symbols-outlined">add</span>
          <span>Add New Pet</span>
        </Link>
        
        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container">
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzJJN_uXhQWoDsvZyNEx9yFSEE9ZwaJNrxpCa1dR_28YaC5y1pG-VZ6fi8NoPdm8cu4Nw3Szqa-kNa0MknxISWYv6PUVrWK18fetYy07pxqSb26tlrHOBRm4VJaMcH8G_edy6KGwRgeE1f-vTfDO8XMx-WgkfQNOg0wgoJldIMGClNI0_eVx2vWPYmfamk3Jv9p7LyjIH_jFNuzX44GBtUMPANBw9eXtko0mALDiQbTkR67sbfn27NIAdhQ_kFbgqVJsiKbya9Atg"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-cyan-900">Admin User</p>
            <p className="text-[10px] text-on-surface-variant">Manage your sanctuary</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
