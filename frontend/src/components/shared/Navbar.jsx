import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyan-50/70 backdrop-blur-xl border-b border-cyan-100/50 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-900">PetAdopt</Link>
        
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-cyan-800/70">
          <Link to="/" className="hover:text-cyan-900 transition-colors">Home</Link>
          <Link to="/pets" className="hover:text-cyan-900 transition-colors">Browse</Link>
          <Link to="/about" className="hover:text-cyan-900 transition-colors">About</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-cyan-800/60">
          <Link to="/notifications" className="relative material-symbols-outlined hover:text-cyan-900 transition-colors">
            notifications
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-cyan-50">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
          <Link to="/favorites" className="material-symbols-outlined hover:text-cyan-900 transition-colors">favorite</Link>
        </div>
        
        {user ? (
          <div className="flex items-center gap-3">
            <Link 
              to={user.role === 'Admin' ? '/admin/users' : user.role === 'Shelter' ? '/shelter/pets' : '/profile'} 
              className="bg-[#00656f] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#00525a] transition-all"
            >
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="text-[#00656f] font-bold text-sm hover:text-[#004d54] transition-colors px-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-[#00656f] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#00525a] transition-all">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
