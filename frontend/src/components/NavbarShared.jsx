import { useState } from "react";

export const navLinks = [
  { id: "browse",   label: "Browse"   },
  { id: "shelters", label: "Shelters" },
  { id: "stories",  label: "Stories"  },
];

export const browseFamily = ["browse", "pet-detail"];

export const getActiveLink = (activePage) => {
  if (browseFamily.includes(activePage)) return "browse";
  if (activePage === "shelters") return "shelters";
  if (activePage === "stories")  return "stories";
  return null;
};


export const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#5492a3">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#5492a3">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const SearchIcon = () => (
  <svg width="10" height="12" viewBox="0 0 24 24" fill="none" stroke="#003035" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);


export function BellButton() {
  return (
    <button style={{ background: "none", border: "none", cursor: "pointer" }}>
      <BellIcon />
    </button>
  );
}

export function HeartButton() {
  return (
    <button style={{ background: "none", border: "none", cursor: "pointer" }}>
      <HeartIcon />
    </button>
  );
}


export function LogoButton({ setActivePage }) {
  return (
    <button
      onClick={() => setActivePage("home")}

        className="text-2xl font-bold tracking-tighter text-cyan-900 "
    >
      PetAdopt
    </button>
  );
}


export function NavLinks({ activePage, setActivePage }) {
  const activeLink = getActiveLink(activePage);

  return (
    <>
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = activeLink === link.id;

          return (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className="relative"
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: "#006770",
                opacity: isActive ? 1 : 0.6,
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "opacity .2s, color .2s",
              }}
            >
              {link.label}

              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    top: 22,
                    width: "100%",
                    height: 2,
                    borderRadius: 4,
                    backgroundColor: "#006770",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

export const navWrapperStyle = {
  background: "rgba(236, 253, 255, 0.85)",
  backdropFilter: "blur(14px)",
};
