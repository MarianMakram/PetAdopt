import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/apiClient';
import AdopterNavbar from '../components/adopter/AdopterNavbar';

const SPECIES_ICONS = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐇' };

const INFO_ITEMS = (pet) => [
    { label: 'Species', value: pet.species, icon: SPECIES_ICONS[pet.species] || '🐾' },
    { label: 'Breed', value: pet.breed || 'Mixed / Unknown', icon: '🔖' },
    {
        label: 'Age', value: pet.ageMonths < 12
            ? `${pet.ageMonths} month${pet.ageMonths !== 1 ? 's' : ''}`
            : `${Math.floor(pet.ageMonths / 12)} year${Math.floor(pet.ageMonths / 12) !== 1 ? 's' : ''}`,
        icon: '🎂'
    },
    { label: 'Gender', value: pet.gender || 'Unknown', icon: pet.gender === 'Male' ? '♂' : '♀' },
    { label: 'Location', value: pet.location || 'Not specified', icon: '📍' },
    { label: 'Status', value: pet.petStatus || 'Available', icon: '✅' },
];

const LoadingSkeleton = () => (
    <div className="pet-detail-skeleton">
        <div className="skeleton-img-lg"></div>
        <div className="pet-detail-skeleton__info">
            <div className="skeleton-line skeleton-line--xl"></div>
            <div className="skeleton-line skeleton-line--lg"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line skeleton-line--short"></div>
        </div>
    </div>
);

export default function PetDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [adoptModalOpen, setAdoptModalOpen] = useState(false);
    const [adoptMessage, setAdoptMessage] = useState('');
    const [adoptSubmitted, setAdoptSubmitted] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiClient.get(`/api/pet/${id}`);
                setPet(data);
            } catch {
                setError('Pet not found or unavailable.');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) {
        return (
            <div className="pet-detail-page">
                <AdopterNavbar />
                <div className="pet-detail-container"><LoadingSkeleton /></div>
            </div>
        );
    }

    if (error || !pet) {
        return (
            <div className="pet-detail-page">
                <AdopterNavbar />
                <div className="pet-detail-container">
                    <div className="pet-detail-error">
                        <div className="pet-detail-error__icon">😿</div>
                        <h2>Oops! Pet Not Found</h2>
                        <p>{error || 'This pet may have already been adopted.'}</p>
                        <Link to="/pets" className="btn-primary">← Browse Other Pets</Link>
                    </div>
                </div>
            </div>
        );
    }

    const images = Array.isArray(pet.imageUrls) ? pet.imageUrls : [];

    const handleAdoptSubmit = async (e) => {
        e.preventDefault();
        // Would call adoption request API here
        setAdoptSubmitted(true);
        setTimeout(() => {
            setAdoptModalOpen(false);
            setAdoptSubmitted(false);
            setAdoptMessage('');
        }, 3000);
    };

    return (
        <div className="pet-detail-page">
            <AdopterNavbar />

            <div className="pet-detail-container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/" className="breadcrumb__link">Home</Link>
                    <span className="breadcrumb__sep">›</span>
                    <Link to="/pets" className="breadcrumb__link">Browse Pets</Link>
                    <span className="breadcrumb__sep">›</span>
                    <span className="breadcrumb__current">{pet.name}</span>
                </nav>

                <div className="pet-detail-layout">
                    {/* ===== IMAGE GALLERY ===== */}
                    <div className="pet-detail-gallery">
                        <div className="pet-detail-gallery__main">
                            {images.length > 0 ? (
                                <img
                                    src={images[activeImg]}
                                    alt={pet.name}
                                    className="pet-detail-gallery__main-img"
                                />
                            ) : (
                                <div className="pet-detail-gallery__placeholder">
                                    <span>{SPECIES_ICONS[pet.species] || '🐾'}</span>
                                </div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="pet-detail-gallery__thumbs">
                                {images.map((url, idx) => (
                                    <button
                                        key={idx}
                                        className={`pet-detail-gallery__thumb ${activeImg === idx ? 'active' : ''}`}
                                        onClick={() => setActiveImg(idx)}
                                    >
                                        <img src={url} alt={`${pet.name} ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ===== PET INFO ===== */}
                    <div className="pet-detail-info">
                        {/* Header */}
                        <div className="pet-detail-info__header">
                            <div className="pet-detail-info__title-row">
                                <h1 className="pet-detail-info__name">{pet.name}</h1>
                                <span className="pet-detail-info__species-badge">
                                    {SPECIES_ICONS[pet.species]} {pet.species}
                                </span>
                            </div>
                            {pet.breed && (
                                <p className="pet-detail-info__breed">{pet.breed}</p>
                            )}
                            {pet.location && (
                                <p className="pet-detail-info__location">📍 {pet.location}</p>
                            )}
                        </div>

                        {/* Info Grid */}
                        <div className="pet-detail-info__grid">
                            {INFO_ITEMS(pet).map((item) => (
                                <div className="pet-detail-info__item" key={item.label}>
                                    <span className="pet-detail-info__item-icon">{item.icon}</span>
                                    <div>
                                        <div className="pet-detail-info__item-label">{item.label}</div>
                                        <div className="pet-detail-info__item-value">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        {pet.description && (
                            <div className="pet-detail-description">
                                <h2 className="pet-detail-description__title">About {pet.name}</h2>
                                <p className="pet-detail-description__text">{pet.description}</p>
                            </div>
                        )}

                        {/* Adoption CTA */}
                        <div className="pet-detail-cta">
                            <button
                                className="btn-primary btn-primary--large pet-detail-adopt-btn"
                                onClick={() => setAdoptModalOpen(true)}
                            >
                                ❤️ Adopt {pet.name}
                            </button>
                            <button className="btn-outline btn-outline--large">
                                🤍 Save to Favorites
                            </button>
                        </div>

                        {/* Shelter note */}
                        <div className="pet-detail-notice">
                            <span>🏡</span>
                            <p>Adoption requests are reviewed within 24–48 hours. You'll be notified once the shelter responds.</p>
                        </div>
                    </div>
                </div>

                {/* Back link */}
                <div className="pet-detail-back">
                    <button className="btn-outline" onClick={() => navigate(-1)}>
                        ← Back to Browse
                    </button>
                    <Link to="/pets" className="btn-outline">Browse More Pets</Link>
                </div>
            </div>

            {/* ===== ADOPTION MODAL ===== */}
            {adoptModalOpen && (
                <div className="adopt-modal-overlay" onClick={() => !adoptSubmitted && setAdoptModalOpen(false)}>
                    <div className="adopt-modal" onClick={(e) => e.stopPropagation()}>
                        {adoptSubmitted ? (
                            <div className="adopt-modal__success">
                                <div className="adopt-modal__success-icon">🎉</div>
                                <h2>Request Submitted!</h2>
                                <p>Your adoption request for <strong>{pet.name}</strong> has been sent. We'll notify you when the shelter responds!</p>
                            </div>
                        ) : (
                            <>
                                <div className="adopt-modal__header">
                                    <h2>Adopt {pet.name} 🐾</h2>
                                    <button
                                        className="adopt-modal__close"
                                        onClick={() => setAdoptModalOpen(false)}
                                    >✕</button>
                                </div>
                                <p className="adopt-modal__subtitle">
                                    Tell the shelter a little about yourself and why you'd be a great match!
                                </p>
                                <form onSubmit={handleAdoptSubmit}>
                                    <div className="adopt-modal__field">
                                        <label>Your Message</label>
                                        <textarea
                                            value={adoptMessage}
                                            onChange={(e) => setAdoptMessage(e.target.value)}
                                            placeholder={`Why would you be a great home for ${pet.name}?`}
                                            rows={5}
                                            required
                                            className="adopt-modal__textarea"
                                        />
                                    </div>
                                    <div className="adopt-modal__actions">
                                        <button type="button" className="btn-outline" onClick={() => setAdoptModalOpen(false)}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn-primary">
                                            Send Request ❤️
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
