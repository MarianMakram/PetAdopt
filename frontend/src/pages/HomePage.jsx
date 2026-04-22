import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/apiClient';

const SPECIES_ICONS = {
    Dog: '🐕',
    Cat: '🐈',
    Bird: '🦜',
    Rabbit: '🐇',
};

const STATS = [
    { label: 'Pets Available', value: '500+', icon: '🐾' },
    { label: 'Happy Adoptions', value: '1,200+', icon: '❤️' },
    { label: 'Partner Shelters', value: '80+', icon: '🏠' },
    { label: 'Cities Served', value: '30+', icon: '📍' },
];

const WHY_ADOPT = [
    {
        icon: '🏡',
        title: 'Give a Forever Home',
        desc: 'Every pet deserves a loving home. Adoption saves lives and changes yours.',
    },
    {
        icon: '🩺',
        title: 'Health Guaranteed',
        desc: 'All our pets are vaccinated, microchipped, and health-checked before listing.',
    },
    {
        icon: '🤝',
        title: 'Shelter Support',
        desc: 'We work with verified shelters and responsible owners to ensure safe adoptions.',
    },
    {
        icon: '💌',
        title: 'Easy Process',
        desc: 'Browse, contact, and submit your adoption request—all in minutes.',
    },
];

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

const FeaturedPetCard = ({ pet }) => {
    const images = Array.isArray(pet.imageUrls) ? pet.imageUrls : [];
    const img = images.length > 0 ? images[0] : null;
    const ageStr = pet.ageMonths < 12
        ? `${pet.ageMonths} mo`
        : `${Math.floor(pet.ageMonths / 12)} yr`;

    return (
        <Link to={`/pets/${pet.id}`} className="featured-pet-card">
            <div className="featured-pet-card__img-wrap">
                {img
                    ? <img src={img} alt={pet.name} className="featured-pet-card__img" />
                    : <div className="featured-pet-card__img-placeholder">
                        {SPECIES_ICONS[pet.species] || '🐾'}
                    </div>
                }
                <span className="featured-pet-card__badge">{pet.species}</span>
            </div>
            <div className="featured-pet-card__body">
                <h3 className="featured-pet-card__name">{pet.name}</h3>
                <div className="featured-pet-card__meta">
                    <span>{pet.gender}</span>
                    <span>•</span>
                    <span>{ageStr}</span>
                    {pet.breed && <><span>•</span><span>{pet.breed}</span></>}
                </div>
                {pet.location && (
                    <div className="featured-pet-card__location">
                        <span>📍</span> {pet.location}
                    </div>
                )}
                <div className="featured-pet-card__cta">Meet {pet.name} →</div>
            </div>
        </Link>
    );
};

export default function HomePage() {
    const [featuredPets, setFeaturedPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await apiClient.get('/api/pet?page=1&pageSize=6');
                setFeaturedPets(data.data || []);
            } catch {
                setFeaturedPets([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const handleHeroSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchInput.trim()) params.set('search', searchInput.trim());
        if (selectedSpecies) params.set('species', selectedSpecies);
        window.location.href = `/pets?${params.toString()}`;
    };

    return (
        <div className="home-page">

            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero__overlay"></div>
                <div className="hero__content">
                    <div className="hero__badge">🐾 Find Your Perfect Companion</div>
                    <h1 className="hero__title">
                        Every Pet Deserves a<br />
                        <span className="hero__title-highlight">Loving Home</span>
                    </h1>
                    <p className="hero__subtitle">
                        Thousands of adorable pets are waiting to meet you. Browse our verified shelter network
                        and start your adoption journey today.
                    </p>

                    {/* Hero Search */}
                    <form className="hero__search" onSubmit={handleHeroSearch}>
                        <div className="hero__search-row">
                            <select
                                className="hero__select"
                                value={selectedSpecies}
                                onChange={(e) => setSelectedSpecies(e.target.value)}
                            >
                                <option value="">All Species</option>
                                <option value="Dog">🐕 Dogs</option>
                                <option value="Cat">🐈 Cats</option>
                                <option value="Bird">🦜 Birds</option>
                                <option value="Rabbit">🐇 Rabbits</option>
                            </select>
                            <input
                                type="text"
                                className="hero__search-input"
                                placeholder="Search by name, breed, or location..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="hero__search-btn">
                                Find Pets 🔍
                            </button>
                        </div>
                    </form>

                    <div className="hero__tags">
                        {['Dogs', 'Cats', 'Rabbits', 'Birds'].map((s) => (
                            <a key={s} href={`/pets?species=${s.replace(/s$/, '')}`} className="hero__tag">
                                {SPECIES_ICONS[s.replace(/s$/, '')] || '🐾'} {s}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Decorative bubbles */}
                <div className="hero__bubble hero__bubble--1">🐕</div>
                <div className="hero__bubble hero__bubble--2">🐈</div>
                <div className="hero__bubble hero__bubble--3">🦜</div>
                <div className="hero__bubble hero__bubble--4">🐇</div>
            </section>

            {/* ===== STATS ===== */}
            <section className="stats-bar">
                {STATS.map((s) => (
                    <div className="stats-bar__item" key={s.label}>
                        <div className="stats-bar__icon">{s.icon}</div>
                        <div className="stats-bar__value">{s.value}</div>
                        <div className="stats-bar__label">{s.label}</div>
                    </div>
                ))}
            </section>

            {/* ===== FEATURED PETS ===== */}
            <section className="featured-section">
                <div className="featured-section__header">
                    <h2 className="featured-section__title">🌟 Featured Pets</h2>
                    <p className="featured-section__subtitle">
                        Meet some of the wonderful animals looking for their forever homes right now.
                    </p>
                </div>

                {loading ? (
                    <div className="featured-grid">
                        {[...Array(6)].map((_, i) => <PetCardSkeleton key={i} />)}
                    </div>
                ) : featuredPets.length > 0 ? (
                    <div className="featured-grid">
                        {featuredPets.map((pet) => <FeaturedPetCard key={pet.id} pet={pet} />)}
                    </div>
                ) : (
                    <div className="featured-empty">
                        <div className="featured-empty__icon">🐾</div>
                        <p>No pets available yet. Check back soon!</p>
                    </div>
                )}

                <div className="featured-section__cta">
                    <Link to="/pets" className="btn-primary btn-primary--large">
                        Browse All Pets →
                    </Link>
                </div>
            </section>

            {/* ===== WHY ADOPT ===== */}
            <section className="why-adopt">
                <div className="why-adopt__header">
                    <h2 className="why-adopt__title">Why Adopt From PetAdopt?</h2>
                    <p className="why-adopt__subtitle">We make the adoption process safe, simple, and joyful.</p>
                </div>
                <div className="why-adopt__grid">
                    {WHY_ADOPT.map((item) => (
                        <div className="why-adopt__card" key={item.title}>
                            <div className="why-adopt__icon">{item.icon}</div>
                            <h3 className="why-adopt__card-title">{item.title}</h3>
                            <p className="why-adopt__card-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SPECIES BROWSE ===== */}
            <section className="species-browse">
                <div className="species-browse__header">
                    <h2 className="species-browse__title">Browse by Species</h2>
                </div>
                <div className="species-browse__grid">
                    {[
                        { label: 'Dogs', icon: '🐕', value: 'Dog', color: '#FF6B6B' },
                        { label: 'Cats', icon: '🐈', value: 'Cat', color: '#4ECDC4' },
                        { label: 'Birds', icon: '🦜', value: 'Bird', color: '#45B7D1' },
                        { label: 'Rabbits', icon: '🐇', value: 'Rabbit', color: '#96CEB4' },
                    ].map((sp) => (
                        <Link
                            key={sp.value}
                            to={`/pets?species=${sp.value}`}
                            className="species-card"
                            style={{ '--species-color': sp.color }}
                        >
                            <div className="species-card__icon">{sp.icon}</div>
                            <div className="species-card__label">Adopt a {sp.label.slice(0, -1)}</div>
                            <div className="species-card__arrow">→</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="cta-banner">
                <div className="cta-banner__content">
                    <h2 className="cta-banner__title">Ready to Find Your New Best Friend?</h2>
                    <p className="cta-banner__subtitle">
                        Join thousands of happy adopters. Start browsing today — your perfect pet is out there!
                    </p>
                    <div className="cta-banner__actions">
                        <Link to="/pets" className="btn-primary btn-primary--large">
                            🐾 Browse Pets
                        </Link>
                        <Link to="/owner/pets" className="btn-outline btn-outline--large">
                            List Your Pet
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="home-footer">
                <div className="home-footer__inner">
                    <div className="home-footer__brand">
                        <span className="home-footer__logo">🐾 PetAdopt</span>
                        <p className="home-footer__tagline">Connecting pets with loving families.</p>
                    </div>
                    <div className="home-footer__links">
                        <h4>Explore</h4>
                        <Link to="/">Home</Link>
                        <Link to="/pets">Browse Pets</Link>
                        <Link to="/favorites">Favorites</Link>
                    </div>
                    <div className="home-footer__links">
                        <h4>For Owners</h4>
                        <Link to="/owner/pets">My Pets</Link>
                        <Link to="/owner/pets/new">List a Pet</Link>
                        <Link to="/owner/requests">Requests</Link>
                    </div>
                    <div className="home-footer__links">
                        <h4>Admin</h4>
                        <Link to="/admin/approvals">Approvals</Link>
                        <Link to="/admin/users/pending">User Approvals</Link>
                    </div>
                </div>
                <div className="home-footer__bottom">
                    <p>© 2026 PetAdopt — All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
