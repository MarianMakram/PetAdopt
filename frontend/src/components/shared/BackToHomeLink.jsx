import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Small floating link shown on owner/admin pages so users can get back to
 * the public adopter-facing home page. Minimal, non-intrusive.
 */
export default function BackToHomeLink() {
    return (
        <Link
            to="/"
            style={{
                position: 'fixed',
                bottom: '1.5rem',
                right: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'linear-gradient(135deg, #FF6B6B, #ff8e53)',
                color: '#fff',
                padding: '0.6rem 1.25rem',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(255,107,107,.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                zIndex: 999,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,107,.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,107,107,.4)';
            }}
        >
            🏠 Public Site
        </Link>
    );
}
