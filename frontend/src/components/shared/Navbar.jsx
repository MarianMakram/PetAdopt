import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyan-50/70 backdrop-blur-xl border-b border-cyan-100/50 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-cyan-900">PetAdopt</Link>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-cyan-800">
          <Link to="/" className="hover:text-cyan-600 transition-colors">Home</Link>
          <Link to="/pets" className="hover:text-cyan-600 transition-colors">Browse</Link>
          
          {user?.role === 'Adopter' && (
            <>
              <Link to="/favorites" className="hover:text-cyan-600 transition-colors">Favorites</Link>
              <Link to="/my-requests" className="hover:text-cyan-600 transition-colors">My Requests</Link>
            </>
          )}

          {user?.role === 'Shelter' && (
            <>
              <Link to="/shelter/pets" className="hover:text-cyan-600 transition-colors">My Pets</Link>
              <Link to="/shelter/requests" className="hover:text-cyan-600 transition-colors">Adoption Requests</Link>
            </>
          )}

          {user?.role === 'Admin' && (
            <>
              <Link to="/admin/users" className="hover:text-cyan-600 transition-colors">User Approvals</Link>
              <Link to="/admin/pets" className="hover:text-cyan-600 transition-colors">Pet Approvals</Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/profile" className="text-sm font-bold text-cyan-900">Hi, {user.first_name || 'User'}</Link>
            <button 
              onClick={handleLogout}
              className="bg-cyan-800 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-900 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-bold text-cyan-800 hover:text-cyan-600">Login</Link>
            <Link to="/register" className="bg-cyan-800 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-900 transition-all">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
