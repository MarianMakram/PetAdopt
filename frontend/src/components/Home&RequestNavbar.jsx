import { useState } from "react";
import { LogoButton, NavLinks, BellButton, HeartButton, navWrapperStyle } from "./NavbarShared";

export default function HomeNavbar({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div style={navWrapperStyle}>
        <header className="flex items-center justify-between px-5 py-2.5 bg-cyan-50/70">

          <div className="flex items-center gap-5">
            <LogoButton setActivePage={setActivePage} />
            <div className="hidden md:flex items-center gap-6">
              <NavLinks activePage={activePage} setActivePage={setActivePage} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BellButton />
            <HeartButton />

            <button
              onClick={() => setActivePage("auth")}
              className="text-[13px] font-semibold text-white px-5 py-1.5 rounded-full mr-4"
              style={{
                background: "linear-gradient(90deg, #00838F 0%, #00BCD4 100%)",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Profile
            </button>

            <button
              className="md:hidden flex flex-col gap-[5px] p-1 ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span className="w-[18px] h-0.5 rounded bg-cyan-700" />
              <span className="w-[18px] h-0.5 rounded bg-cyan-700" />
              <span className="w-[18px] h-0.5 rounded bg-cyan-700" />
            </button>
          </div>

        </header>
      </div>
    </nav>
  );
}
