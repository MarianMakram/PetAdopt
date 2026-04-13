import { useState } from "react";

export default function Navbar({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "browse",   label: "Browse"   },
    { id: "shelters", label: "Shelters" },
    { id: "stories",  label: "Stories"  },
  ];

  const browseFamily = ["browse", "pet-detail"];

  const getActiveLink = () => {
    if (browseFamily.includes(activePage)) return "browse";
    if (activePage === "shelters") return "shelters";
    if (activePage === "stories")  return "stories";
    return null;
  };

  const activeLink = getActiveLink();

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50">
        <div
          className="flex items-center h-[65px] px-8 gap-6"
          style={{
            background: "rgba(236, 253, 255, 0.85)",
            backdropFilter: "blur(14px)",
          }}
        >
          <button
            onClick={() => setActivePage("home")}
            className="text-[16px] font-bold shrink-0"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#00535a",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            PetAdopt
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeLink === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className="relative "
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: "#006770",
                    opacity: isActive ? 1 : 0.6,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity .2s",
                  }}
                >
                  {link.label}

                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        top:22,
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

          <div className="flex-1" />

          <div className="flex items-center gap-3">

            <button
              className="flex items-center justify-center w-7 h-7"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <svg
                width="22" height="22" viewBox="0 0 24 24"
                fill="#00838f">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            <button
              className="flex items-center justify-center w-7 h-7 mr-4"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#00838f">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button
              onClick={() => setActivePage("auth")}
              className="text-[13px] font-semibold text-white px-5 py-1.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, #00838F 0%, #00BCD4 100%)",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                border: "none",
                cursor: "pointer",
                transition: "opacity .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Profile
            </button>
          </div>

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

      </nav>

    </>
  );
}