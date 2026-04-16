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

export default function Header({ headerLeft, headerRight }) {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 bg-cyan-50/70">
      <div className="flex items-center gap-5">{headerLeft}</div>
      <div className="flex items-center gap-3">{headerRight}</div>
    </header>
  );
}
