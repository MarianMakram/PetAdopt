import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useAuth } from "../context/AuthContext";

const API_BASE = ""; 

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const PawIcon = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
    <path d="M4.5 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.91 2.39C13.88 12.53 12.96 12 12 12s-1.88.53-2.59 1.39C8.67 14.24 8 15 8 16c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1-.67-1.76-1.41-2.61z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

// ── Field Row ──────────────────────────────────────────────────────────────
const ProfileField = ({ label, value }) => (
  <div className="space-y-2 flex flex-col items-center text-center">
    <label className="block text-[12px] font-bold text-[#6f7979] uppercase tracking-widest">
      {label}
    </label>
    <div className="text-[18px] font-medium text-[#191c1d] py-2 border-b border-[#eceeef] w-full text-center">
      {value}
    </div>
  </div>
);

// ── Nav Item ───────────────────────────────────────────────────────────────
const NavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex flex-col items-center justify-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 active:scale-90 cursor-pointer ${
      active
        ? "bg-[#E0F7FA] text-[#006064]"
        : "text-[#9ca3af]"
    }`}
  >
    {icon}
    <span className="text-xs font-medium font-['Plus_Jakarta_Sans']">{label}</span>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/auth/me');
        const userData = response.data.data || response.data; // Handle wrapped or unwrapped
        setUser(userData);
        
        const data = response.data?.data || response.data;
        if (Array.isArray(data)) {
          // This logic depends on specific component context, keeping for compatibility
        }
        
        // Role-based redirection
        if (userData.role === 'Admin') {
          navigate('/admin/users');
        } else if (userData.role === 'Shelter') {
          navigate('/shelter/pets');
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }
  const initials =
  `${user?.first_name?.charAt(0) || ""}${user?.last_name?.charAt(0) || ""}`.toUpperCase();

  return (
    <div
      className="relative min-h-screen w-screen bg-[#E0F7FA] font-['Plus_Jakarta_Sans',sans-serif] text-[#191c1d] antialiased"
    >
      {/* ── Top App Bar ── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#E0F7FA]/80 border-b border-teal-100 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
      <p
        onClick={() => navigate("/")}
        className="text-2xl font-black text-[#006064] font-['Plus_Jakarta_Sans'] m-0 cursor-pointer hover:opacity-80 transition"
      >
        PetAdopt
      </p>

          <button
            onClick={handleLogout}
            type="button"
            className="flex items-center gap-2 text-[#006064] font-bold text-[14px] bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="pt-32 pb-40 px-4 w-full flex justify-center">
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center">

          {/* Avatar */}
          <div className="relative mb-12">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#006064] flex items-center justify-center text-white"
              style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
            >
              <span className="text-[48px] font-extrabold tracking-tight leading-none">
                {initials}
              </span>
            </div>
            {/* Verified badge */}
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#9f4122] rounded-full border-4 border-[#E0F7FA] flex items-center justify-center text-white">
              <VerifiedIcon />
            </div>
          </div>

          {/* Card */}
          <div
            className="w-full bg-white rounded-3xl p-8 md:p-12 space-y-12"
            style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.04)" }}
          >
            {/* Card Header */}
            <div className="text-center">
              <h1 className="text-[32px] font-bold text-[#00464a] m-0 mb-2">
                Personal Information
              </h1>
              <p className="text-[16px] text-[#3f4949] font-medium m-0">
                Manage your account details and preferences
              </p>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <ProfileField label="First Name"     value={user.first_name} />
              <ProfileField label="Last Name"      value={user.last_name}  />
              <ProfileField label="Email Address"  value={user.email}      />
              <ProfileField label="Phone Number"   value={user.phone}      />
              <ProfileField label="City"           value={user.city}       />
              <ProfileField label="Country"        value={user.country}    />
            </div>

            {/* Footer Row */}
            <div className="pt-8 border-t border-[#f2f4f5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0e7ea] flex items-center justify-center text-[#364a4d]">
                  <ShieldIcon />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#00464a] m-0 uppercase tracking-widest">
                    Data Security
                  </p>
                  <p className="text-[11px] text-[#6f7979] m-0">
                    Your data is encrypted and secure.
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-medium text-[#9f4122] m-0">
                Verified Member
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Bottom Nav (Mobile) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 border-t border-[#f1f5f9] backdrop-blur-lg rounded-t-2xl px-4 py-3 flex justify-around items-center"
        style={{ boxShadow: "0 -10px 20px rgba(0,0,0,0.04)" }}
      >
        <NavItem
          icon={<PawIcon />}
          label="Explore"
          active={activeNav === "explore"}
        />
        <NavItem
          icon={<HeartIcon />}
          label="Favorites"
          active={activeNav === "favorites"}
        />
        <NavItem
          icon={<ChatIcon />}
          label="Messages"
          active={activeNav === "messages"}
        />
        <NavItem
          icon={<PersonIcon />}
          label="Profile"
          active={activeNav === "profile"}
        />
      </nav>
    </div>
  );
}