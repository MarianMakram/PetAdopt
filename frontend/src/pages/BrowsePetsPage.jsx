import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiClient } from '../services/apiClient';
import AdopterNavbar from '../components/adopter/AdopterNavbar';

const SPECIES_OPTIONS = [
    { label: 'All Species', value: '' },
    { label: '🐕 Dogs', value: 'Dog' },
    { label: '🐈 Cats', value: 'Cat' },
    { label: '🦜 Birds', value: 'Bird' },
    { label: '🐇 Rabbits', value: 'Rabbit' },
];

const GENDER_OPTIONS = [
    { label: 'Any Gender', value: '' },
    { label: '♂ Male', value: 'Male' },
    { label: '♀ Female', value: 'Female' },
];

const AGE_OPTIONS = [
    { label: 'Any Age', value: '' },
    { label: 'Baby (< 6 months)', value: '0-6' },
    { label: 'Young (6–18 months)', value: '6-18' },
    { label: 'Adult (18mo–5yr)', value: '18-60' },
    { label: 'Senior (5yr+)', value: '60-999' },
];

const SPECIES_ICONS = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐇' };

const PetCardSkeleton = () => (
    <div className="pet-card-skeleton">
        <div className="skeleton-img"></div>
        <div className="skeleton-body">
            <div className="skeleton-line skeleton-line--title"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-line--short"></div>
        </div>
    </div>
);

const PetCard = ({ pet }) => {
    const images = Array.isArray(pet.imageUrls) ? pet.imageUrls : [];
    const img = images.length > 0 ? images[0] : null;
    const ageDisplay = pet.ageMonths < 12
        ? `${pet.ageMonths} month${pet.ageMonths !== 1 ? 's' : ''}`
        : `${Math.floor(pet.ageMonths / 12)} year${Math.floor(pet.ageMonths / 12) !== 1 ? 's' : ''}`;

    return (
        <Link to={`/pets/${pet.id}`} className="browse-pet-card">
            <div className="browse-pet-card__img-wrap">
                {img
                    ? <img src={img} alt={pet.name} className="browse-pet-card__img" loading="lazy" />
                    : (
                        <div className="browse-pet-card__img-placeholder">
                            <span className="browse-pet-card__species-icon">{SPECIES_ICONS[pet.species] || '🐾'}</span>
                        </div>
                    )
                }
                <span className="browse-pet-card__species-badge">{pet.species}</span>
                {pet.gender && (
                    <span className={`browse-pet-card__gender-badge browse-pet-card__gender-badge--${pet.gender?.toLowerCase()}`}>
                        {pet.gender === 'Male' ? '♂' : '♀'}
                    </span>
                )}
            </div>
            <div className="browse-pet-card__body">
                <h3 className="browse-pet-card__name">{pet.name}</h3>
                {pet.breed && <p className="browse-pet-card__breed">{pet.breed}</p>}
                <div className="browse-pet-card__meta">
                    <span className="browse-pet-card__age">{ageDisplay}</span>
                    {pet.location && (
                        <span className="browse-pet-card__location">📍 {pet.location}</span>
                    )}
                </div>
                {pet.description && (
                    <p className="browse-pet-card__desc">
                        {pet.description.length > 80
                            ? pet.description.substring(0, 80) + '...'
                            : pet.description}
                    </p>
                )}
                <div className="browse-pet-card__footer">
                    <span className="browse-pet-card__cta">View Details →</span>
                </div>
            </div>
        </Link>
    );
};

export default function BrowsePetsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters state - initialize from URL params
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        species: searchParams.get('species') || '',
        gender: searchParams.get('gender') || '',
        age: searchParams.get('age') || '',
        location: searchParams.get('location') || '',
        breed: searchParams.get('breed') || '',
    });

    const [pets, setPets] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const PAGE_SIZE = 12;

    const buildQueryString = useCallback((f, p) => {
        const params = new URLSearchParams();
        if (f.search) params.set('search', f.search);
        if (f.species) params.set('species', f.species);
        if (f.gender) params.set('gender', f.gender);
        if (f.location) params.set('location', f.location);
        if (f.breed) params.set('breed', f.breed);
        if (f.age) {
            const [min, max] = f.age.split('-');
            if (min) params.set('minAge', min);
            if (max) params.set('maxAge', max);
        }
        params.set('page', p);
        params.set('pageSize', PAGE_SIZE);
        return params.toString();
    }, []);

    const fetchPets = useCallback(async (f, p) => {
        setLoading(true);
        setError(null);
        try {
            const qs = buildQueryString(f, p);
            const data = await apiClient.get(`/api/pet?${qs}`);
            setPets(data.data || []);
            setTotal(data.total || 0);
        } catch (err) {
            setError('Failed to load pets. Please check that the backend is running.');
            setPets([]);
        } finally {
            setLoading(false);
        }
    }, [buildQueryString]);

    useEffect(() => {
        fetchPets(filters, page);
        // Update URL params
        const urlParams = new URLSearchParams();
        if (filters.search) urlParams.set('search', filters.search);
        if (filters.species) urlParams.set('species', filters.species);
        if (filters.gender) urlParams.set('gender', filters.gender);
        if (filters.age) urlParams.set('age', filters.age);
        if (filters.location) urlParams.set('location', filters.location);
        if (filters.breed) urlParams.set('breed', filters.breed);
        setSearchParams(urlParams, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, page]);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchPets(filters, 1);
    };

    const clearFilters = () => {
        setFilters({ search: '', species: '', gender: '', age: '', location: '', breed: '' });
        setPage(1);
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);
    const hasActiveFilters = Object.values(filters).some((v) => v !== '');

    return (
        <div className="browse-page">
            <AdopterNavbar />

            {/* Page Header */}
            <div className="browse-header">
                <div className="browse-header__inner">
                    <h1 className="browse-header__title">
                        {filters.species
                            ? `${SPECIES_ICONS[filters.species] || ''} ${filters.species}s for Adoption`
                            : '🐾 Browse All Pets'}
                    </h1>
                    <p className="browse-header__subtitle">
                        {loading ? 'Searching...' : `${total} pet${total !== 1 ? 's' : ''} available for adoption`}
                    </p>
                </div>
            </div>

            <div className="browse-layout">
                {/* ===== FILTER SIDEBAR ===== */}
                <aside className={`browse-sidebar ${sidebarOpen ? 'browse-sidebar--open' : ''}`}>
                    <div className="browse-sidebar__header">
                        <h2 className="browse-sidebar__title">Filters</h2>
                        {hasActiveFilters && (
                            <button className="browse-sidebar__clear" onClick={clearFilters}>
                                Clear all
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <div className="filter-group">
                        <label className="filter-group__label">Search</label>
                        <form onSubmit={handleSearchSubmit} className="filter-search-form">
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                placeholder="Name, breed, or keyword..."
                                className="filter-input"
                            />
                            <button type="submit" className="filter-search-btn">🔍</button>
                        </form>
                    </div>

                    {/* Species */}
                    <div className="filter-group">
                        <label className="filter-group__label">Species</label>
                        <div className="filter-chips">
                            {SPECIES_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`filter-chip ${filters.species === opt.value ? 'filter-chip--active' : ''}`}
                                    onClick={() => handleFilterChange('species', opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="filter-group">
                        <label className="filter-group__label">Gender</label>
                        <div className="filter-chips">
                            {GENDER_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`filter-chip ${filters.gender === opt.value ? 'filter-chip--active' : ''}`}
                                    onClick={() => handleFilterChange('gender', opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Age */}
                    <div className="filter-group">
                        <label className="filter-group__label">Age</label>
                        <select
                            value={filters.age}
                            onChange={(e) => handleFilterChange('age', e.target.value)}
                            className="filter-select"
                        >
                            {AGE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Breed */}
                    <div className="filter-group">
                        <label className="filter-group__label">Breed</label>
                        <input
                            type="text"
                            value={filters.breed}
                            onChange={(e) => handleFilterChange('breed', e.target.value)}
                            placeholder="e.g. Labrador, Persian..."
                            className="filter-input"
                        />
                    </div>

                    {/* Location */}
                    <div className="filter-group">
                        <label className="filter-group__label">Location</label>
                        <input
                            type="text"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            placeholder="City or region..."
                            className="filter-input"
                        />
                    </div>
                </aside>

                {/* ===== MAIN CONTENT ===== */}
                <main className="browse-main">
                    {/* Mobile Filter Toggle */}
                    <div className="browse-mobile-controls">
                        <button
                            className="browse-filter-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            🔧 {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
                        </button>
                        {hasActiveFilters && (
                            <button className="browse-clear-btn" onClick={clearFilters}>✕ Clear filters</button>
                        )}
                        <span className="browse-result-count">{total} pets found</span>
                    </div>

                    {/* Active Filter Tags */}
                    {hasActiveFilters && (
                        <div className="active-filters">
                            {Object.entries(filters).map(([key, val]) =>
                                val ? (
                                    <span key={key} className="active-filter-tag">
                                        {key}: {val}
                                        <button onClick={() => handleFilterChange(key, '')}>✕</button>
                                    </span>
                                ) : null
                            )}
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="browse-error">
                            <div className="browse-error__icon">⚠️</div>
                            <p>{error}</p>
                            <button className="btn-primary" onClick={() => fetchPets(filters, page)}>
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Loading Skeletons */}
                    {loading && (
                        <div className="browse-grid">
                            {[...Array(PAGE_SIZE)].map((_, i) => <PetCardSkeleton key={i} />)}
                        </div>
                    )}

                    {/* Pet Grid */}
                    {!loading && !error && pets.length > 0 && (
                        <div className="browse-grid">
                            {pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && pets.length === 0 && (
                        <div className="browse-empty">
                            <div className="browse-empty__icon">🐾</div>
                            <h3>No pets found</h3>
                            <p>Try adjusting your filters or search terms.</p>
                            <button className="btn-primary" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="browse-pagination">
                            <button
                                className="pagination-btn"
                                disabled={page <= 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                ← Prev
                            </button>
                            <div className="pagination-pages">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`pagination-page ${page === i + 1 ? 'pagination-page--active' : ''}`}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="pagination-btn"
                                disabled={page >= totalPages}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
