import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdopterNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/pets?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/pets');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="adopter-navbar">
            <div className="adopter-navbar__inner">
                {/* Logo */}
                <Link to="/" className="adopter-navbar__logo">
                    <span className="adopter-navbar__logo-icon">🐾</span>
                    <span className="adopter-navbar__logo-text">PetAdopt</span>
                </Link>

                {/* Search bar */}
                <form className="adopter-navbar__search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search pets by name, breed..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="adopter-navbar__search-input"
                    />
                    <button type="submit" className="adopter-navbar__search-btn" aria-label="Search">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>
                </form>

                {/* Desktop Nav Links */}
                <div className="adopter-navbar__links">
                    <Link to="/" className={`adopter-navbar__link ${isActive('/') ? 'adopter-navbar__link--active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/pets" className={`adopter-navbar__link ${isActive('/pets') ? 'adopter-navbar__link--active' : ''}`}>
                        Browse Pets
                    </Link>
                    <Link to="/favorites" className={`adopter-navbar__link ${isActive('/favorites') ? 'adopter-navbar__link--active' : ''}`}>
                        Favorites
                    </Link>
                    <Link to="/requests" className={`adopter-navbar__link ${isActive('/requests') ? 'adopter-navbar__link--active' : ''}`}>
                        My Requests
                    </Link>
                </div>

                {/* Auth / Dashboard Links */}
                <div className="adopter-navbar__actions">
                    <Link to="/owner/pets" className="adopter-navbar__btn adopter-navbar__btn--outline">
                        Dashboard
                    </Link>
                    <Link to="/admin/approvals" className="adopter-navbar__btn adopter-navbar__btn--solid">
                        Login
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className="adopter-navbar__hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="adopter-navbar__mobile">
                    <form className="adopter-navbar__search adopter-navbar__search--mobile" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search pets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="adopter-navbar__search-input"
                        />
                        <button type="submit" className="adopter-navbar__search-btn">🔍</button>
                    </form>
                    <Link to="/" className="adopter-navbar__mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/pets" className="adopter-navbar__mobile-link" onClick={() => setMenuOpen(false)}>Browse Pets</Link>
                    <Link to="/favorites" className="adopter-navbar__mobile-link" onClick={() => setMenuOpen(false)}>Favorites</Link>
                    <Link to="/requests" className="adopter-navbar__mobile-link" onClick={() => setMenuOpen(false)}>My Requests</Link>
                    <Link to="/owner/pets" className="adopter-navbar__mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                </div>
            )}
        </nav>
    );
}
