import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "/api"; 

// ── Icons ──────────────────────────────────────────────────────────────────
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const PawIcon = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
    <path d="M4.5 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.91 2.39C13.88 12.53 12.96 12 12 12s-1.88.53-2.59 1.39C8.67 14.24 8 15 8 16c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1-.67-1.76-1.41-2.61z" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

// ── Constants ──────────────────────────────────────────────────────────────
const ROLES = [
  { key: "adopter",       icon: <HeartIcon />, label: "ADOPTER" },
  { key: "shelter_owner", icon: <PawIcon />,   label: "SHELTER" },
  { key: "admin",         icon: <ShieldIcon />, label: "ADMIN"  },
];

const ROLE_MAP = {
  adopter:       2,
  shelter_owner: 1,
  admin:         0,
};

const INPUT_CLS =
  "w-full box-border pr-4 py-4 bg-[#adecff] border-none rounded-xl text-[14px] text-[#00343e] outline-none transition-all duration-200 font-inherit focus:shadow-[0_0_0_2px_#00656f66]";

// ── Snackbar ───────────────────────────────────────────────────────────────
function Snackbar({ snack, onClose }) {
  if (!snack) return null;
  const isSuccess = snack.type === "success";
  const bg = isSuccess ? "#00656f" : "#9b3e20";

  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: "translateX(-50%)", zIndex: 9999,
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "14px 20px", borderRadius: 16,
      backgroundColor: bg, color: "#fff",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      minWidth: 300, maxWidth: 480,
      fontFamily: "'Be Vietnam Pro', sans-serif",
      animation: "slideUp 0.3s ease",
    }}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <span style={{ fontSize: 20, marginTop: 1, flexShrink: 0 }}>{isSuccess ? "✅" : "❌"}</span>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{snack.message}</p>
      <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: 0.7, padding: 0, paddingLeft: 8, fontSize: 18 }}>✕</button>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
const IconWrap = ({ children }) => (
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2c6370] opacity-50">{children}</span>
);
const FieldLabel = ({ children }) => (
  <label className="block text-[13px] font-bold text-[#2c6370] mb-2 ml-1">{children}</label>
);

// ── Main Component ─────────────────────────────────────────────────────────
export default function LoginForm() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("adopter");
  const [form, setForm]             = useState({ email: "", password: "", stay: false });
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [snack, setSnack]           = useState(null);

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));

  const showSnack = (message, type = "success") => {
    setSnack({ message, type });
    setTimeout(() => setSnack(null), 5000);
  };

  const handleSubmit = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      showSnack("Please enter your email and password.", "error");
      return;
    }

    const payload = {
      email:    form.email,
      password: form.password,
      role:     ROLE_MAP[activeRole],  
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const token = await res.text();
        if (form.stay) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        showSnack("Welcome back! 🐾 You're now logged in.", "success");
        navigate("/");
      } else {
        const text = await res.text();
        showSnack(text || "Invalid email or password.", "error");
      }
    } catch {
      showSnack("Could not connect to the server. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#d9f6ff] to-[#e9f9ff] flex items-center justify-center p-6 font-['Be_Vietnam_Pro',sans-serif]">

      <Snackbar snack={snack} onClose={() => setSnack(null)} />

      {/* Blobs */}
      <div className="absolute -top-[10%] -right-[10%] w-[40rem] h-[40rem] bg-[#89e9f6]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[5%] -left-[5%] w-[30rem] h-[30rem] bg-[#ffc4b3]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Card */}
      <div className="w-full h-screen grid grid-cols-2 rounded-none shadow-none bg-white">

        {/* LEFT */}
        <div className="relative bg-gradient-to-br from-[#00656f] to-[#005861] flex flex-col justify-between p-12 text-[#d4f9ff]">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIG163-enqIkreC06CdNSBaUC9WmjDHc4LnCSkFPB8zmIDwEotU0r9JvgAtgffIbF_auFnmVBHuPGjTmvr6r6EnUTY8yUuAU41rUL8SSa8gRgP6c-PfD--UQYfecucxmJvIqjDiKUNBlQa7T6CbiwZ6jKkHZCLNWuwoupBk6tAuAVYThO9LTUgBv6HdyQC91aZ1m2baKFv7L3MsZs8yQMT8I1rCAOWLO3HfhG4jyuI2kqukm-dygFley_oLIrXPVilLuOc0_JcUno" alt="Dog" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] font-black tracking-tight m-0">PetAdopt</p>
            <p className="text-[13px] opacity-80 mt-1.5 font-medium">Helping every animal find their way back home.</p>
          </div>
          <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/15">
            <p className="text-[15px] font-['Plus_Jakarta_Sans',sans-serif] font-semibold italic leading-relaxed m-0">
              "Finding Max was the best thing that ever happened to our family. The process was seamless and heartfelt."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzFBP5HTgRYWhmsAYzfUNLOMNU1LVwIkyXTWoeyT39RBrvtNGwgr03V_ufw5l3gZor-tcZDsrLKE2WHpavX-qI_8DMS46rfiSRDGdvZ4ARFyM-6URTSEOzeJ74STe6WEEvERH_RyeHFyn-zD13MUCImrk-41idZy-_iKpAMkAAWJy9G-j8hO8RQud4rjvmJp9M0Lee3bIa6LXWLkSpvzlKUmVGWqvlCo-yxSA4T3oX76CcBgTM_IwVBxR_WsEzICafDmJ4gk0zWAM" alt="Sarah" className="w-10 h-10 rounded-full object-cover border-2 border-white/25" />
              <div>
                <p className="text-[13px] font-bold m-0">Sarah Jenkins</p>
                <p className="text-[11px] opacity-60 m-0">Golden Retriever Adopter</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="px-14 py-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[36px] font-extrabold tracking-tight text-[#00343e] m-0 mb-2">Welcome Back</h2>
            <p className="text-[14px] text-[#2c6370] font-medium m-0">Log in to your sanctuary dashboard.</p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {ROLES.map(({ key, icon, label }) => (
              <button key={key} type="button" onClick={() => setActiveRole(key)}
                className={`flex flex-col items-center py-3 px-2 rounded-full border transition-all duration-200 gap-1 cursor-pointer ${
                  activeRole === key
                    ? "border-[#00656f] bg-[#89e9f6] text-[#00656f]"
                    : "border-[#81b5c5]/30 bg-[#d9f6ff] text-[#2c6370]"
                }`}>
                {icon}
                <span className="text-[9px] font-bold tracking-widest">{label}</span>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <FieldLabel>Email Address</FieldLabel>
              <div className="relative">
                <IconWrap><MailIcon /></IconWrap>
                <input type="email" name="email" placeholder="hello@example.com"
                  value={form.email} onChange={handleChange} required
                  className={`${INPUT_CLS} pl-12`} />
              </div>
            </div>
            <div>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <IconWrap><LockIcon /></IconWrap>
                <input type={showPass ? "text" : "password"} name="password" placeholder="••••••••"
                  value={form.password} onChange={handleChange} required
                  className={`${INPUT_CLS} pl-12 pr-12`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#2c6370] opacity-50 p-0">
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between py-1 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="stay" checked={form.stay} onChange={handleChange}
                className="w-4 h-4 accent-[#00656f] rounded" />
              <span className="text-[13px] font-medium text-[#2c6370]">Stay signed in</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2 flex flex-col gap-4 mt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full border-none rounded-full py-4 text-[16px] font-bold cursor-pointer transition-all duration-200 font-inherit flex items-center justify-center gap-2"
              style={{
                background: loading ? "#81b5c5" : "linear-gradient(to right, #00656f, #005861)",
                color: "#fff",
                boxShadow: "0 8px 20px #00656f33",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Logging In…
                </>
              ) : "Log In to Sanctuary"}
            </button>
          </div>

          <p className="mt-10 text-center text-[13px] text-[#2c6370] font-medium">
            New to PetAdopt?{" "}
            <button 
              onClick={() => navigate("/register")}
              className="bg-transparent border-none cursor-pointer text-[#9b3e20] font-bold text-[13px] font-inherit hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
