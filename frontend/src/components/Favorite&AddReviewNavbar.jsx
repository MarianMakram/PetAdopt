import { useNavigate } from "react-router-dom";
import { LogoButton, NavLinks, BellButton, HeartButton, navWrapperStyle } from "./NavbarShared";

export default function FavoriteNavbar({ activePage, setActivePage }) {
  const navigate = useNavigate();
  return (
    <nav className="w-full fixed top-0 left-0 z-50 relative">
      <div style={navWrapperStyle}>
        <header className="flex items-center justify-between px-5 py-2.5 bg-cyan-50/70 relative">

          <LogoButton setActivePage={setActivePage} />

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <NavLinks activePage={activePage} setActivePage={setActivePage} />
          </div>

          <div className="flex items-center gap-3">
            <BellButton />
            <HeartButton />

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-full"
              style={{
                color: "#006770",
                background: "transparent",
                backgroundImage:
                  "linear-gradient(rgba(236,253,255,0.85), rgba(236,253,255,0.85)), linear-gradient(90deg, #00838F 0%, #00BCD4 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "1.5px solid transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#006770">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </button>
          </div>

        </header>
      </div>
    </nav>
  );
}
