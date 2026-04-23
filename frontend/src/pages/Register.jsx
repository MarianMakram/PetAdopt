import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DOG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrBgva3qz5JP6OvDs5-xnorvTdlZtHezyO3tS4E99_jOIqztOQeXOjnuVs5Z1ukbLD_Pbtcdqd6B5Ayk5m5vr3r7n2A5KtuNZy0eyhu1Hw2394Avd1IYWfo5EAappZlVoC45t7PcNfGQ_nHuawGTJrD8CYSEVdlGuYtYo9vGwCtqm4cff1E3tu-kTc4hy27ICVKkq0Vu7qXfoVMKxKlDFmZhGfhW3WusR4TcuIcZIZh_9sj_ZxkaMTBfLNMp-ZIH4CmQJzClEqWQ";
const AVA = "https://lh3.googleusercontent.com/aida-public/AB6AXuBTiaJGy13lMMVJaoDrDbspWrjIrXbpfvwufVAG8H5HIpw4XbATaosT_Umdkhdi_pVXoojgvOWPVQzqsXNXb6IaU3QSTVG9W5Dnkghsp1ta89op4VVlRqYg5Bmc0oprELM7ShQkPsIt2urxKw6KW23Y9ERAOAPA37BqKm9yeIFYx1uHrEHzOR9zOJmEqnwOve7s2VkoiKYk1_u7V714CZ20RR3qdTtWa00BLFopb2wnbgkTC2MamcYyed8IBoAjBCN9RzhPyX6yzbQ";

const API_BASE = "/api"; 

const Icon = ({ name, size = 20, fill = 0, className = "" }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}` }}
  >
    {name}
  </span>
);

// ── Snackbar ───────────────────────────────────────────────────────────────
function Snackbar({ snack, onClose }) {
  if (!snack) return null;

  const isSuccess = snack.type === "success";
  const bg = isSuccess ? "#00656f" : "#9b3e20";
  const icon = isSuccess ? "check_circle" : "error";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 20px",
        borderRadius: 16,
        backgroundColor: bg,
        color: "#fff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        minWidth: 300,
        maxWidth: 480,
        animation: "slideUp 0.3s ease",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <Icon name={icon} size={22} fill={1} style={{ marginTop: 1, flexShrink: 0 }} />
      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{snack.message}</p>
      <button
        onClick={onClose}
        style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: 0.7, padding: 0, paddingLeft: 8 }}
      >
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function PetAdoptRegister() {
  const navigate = useNavigate();
  const [role, setRole] = useState("adopter");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", password: "" });

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showSnack = (message, type = "success") => {
    setSnack({ message, type });
    setTimeout(() => setSnack(null), 5000);
  };

  const handleSubmit = async () => {
    // ── Client-side validation ──
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      showSnack("Please fill in all required fields.", "error");
      return;
    }
    if (form.password.length < 8 || !/\d/.test(form.password)) {
      showSnack("Password must be at least 8 characters with at least one number.", "error");
      return;
    }
    if (!agreed) {
      showSnack("You must agree to the Terms of Service to continue.", "error");
      return;
    }

    // ── Parse name into first/last ──
    const nameParts = form.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // ── Parse location into city/country ──
    const locParts = form.location.split(",").map((s) => s.trim());
    const city = locParts[0] || "";
    const country = locParts[1] || "";

    // ── Map role to backend enum ──
    const roleMap = { adopter: 2, shelter: 1 };

    const payload = {
      email: form.email,
      password: form.password,
      firstName,
      lastName,
      phone: form.phone,
      city,
      country,
      role: roleMap[role],
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showSnack(
          role === "shelter"
            ? "Account created! 🎉 Your shelter account is pending Admin approval — this usually takes 24–48 hours."
            : "Account created successfully! 🐾 Welcome to PetAdopt — you can now log in.",
          "success"
        );
        setForm({ name: "", email: "", phone: "", location: "", password: "" });
        setAgreed(false);
        navigate("/login");
      } else {
        const text = await res.text();
        showSnack(text || "Registration failed. Please try again.", "error");
      }
    } catch {
      showSnack("Could not connect to the server. Please check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Be+Vietnam+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-style: normal; display: inline-block; line-height: 1; white-space: nowrap; -webkit-font-smoothing: antialiased; vertical-align: middle; }
      `}</style>

      <Snackbar snack={snack} onClose={() => setSnack(null)} />

      <div className="min-h-screen w-full flex" style={{ fontFamily: "'Be Vietnam Pro', sans-serif", backgroundColor: "#e9f9ff" }}>

        {/* ── LEFT ── */}
        <div className="hidden md:flex w-[750px] relative items-center justify-start overflow-hidden py-8 px-20" style={{ backgroundColor: "#00656f" }}>
          <img src={DOG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#00656f 0%,transparent 60%,#005861 100%)", opacity: 0.8 }} />
          <div className="relative z-10 max-w-sm">
            <p className="text-3xl font-black text-white mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-1px" }}>PetAdopt</p>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Create a legacy of kindness.</h1>
            <p className="text-sm font-medium leading-relaxed" style={{ color: "#89e9f6" }}>Whether you are finding a best friend or managing a sanctuary, your journey starts here.</p>
            <div className="mt-10 p-7 rounded-2xl border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
              <Icon name="format_quote" size={34} className="text-[#fdd34d] mb-2" />
              <p className="text-sm text-white italic leading-relaxed mb-4">"Adopting wasn't just about saving a life; it was about completing our home. The process was seamless and heartfelt."</p>
              <div className="flex items-center gap-3">
                <img src={AVA} alt="Sarah" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-white">Sarah Jenkins</p>
                  <p className="text-xs" style={{ color: "#89e9f6" }}>Adopter since 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex-1 flex flex-col justify-start items-center px-8 overflow-y-auto py-8 px-20" style={{ backgroundColor: "#e9f9ff" }}>
          <div className="w-[650px]">
            <h2 className="text-2xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#00343e" }}>Begin your journey</h2>
            <p 
              onClick={() => navigate("/login")}
              className="text-xs mb-5" style={{ color: "#2c6370" }}>
              Already have an account?{" "}
              <a href="#" className="font-semibold" style={{ color: "#00656f", textDecoration: "none" }}>Sign in</a>
            </p>

            {/* Roles */}
            <p className="text-xs font-bold mb-3" style={{ color: "#00343e" }}>What is your role?</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div onClick={() => setRole("adopter")} className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${role === "adopter" ? "border-[#00656f] bg-[#89e9f6]/10" : "border-transparent bg-white"}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-xl bg-[#89e9f6]"><Icon name="favorite" size={20} fill={1} className="text-[#00656f]" /></div>
                  {role === "adopter" && <Icon name="check_circle" size={18} className="text-[#00656f]" />}
                </div>
                <p className="text-sm font-bold text-[#00343e] mb-1">I am an Adopter</p>
                <p className="text-xs text-[#2c6370] leading-relaxed">I'm looking for a new companion to join my family.</p>
              </div>
              <div onClick={() => setRole("shelter")} className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${role === "shelter" ? "border-[#00656f] bg-[#89e9f6]/10" : "border-transparent bg-white"}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 rounded-xl bg-[#ffc4b3]"><Icon name="home_health" size={20} fill={1} className="text-[#9b3e20]" /></div>
                  {role === "shelter" && <Icon name="check_circle" size={18} className="text-[#00656f]" />}
                </div>
                <p className="text-sm font-bold text-[#00343e] mb-1">Shelter / Owner</p>
                <p className="text-xs text-[#2c6370] leading-relaxed">I want to list pets and manage adoption requests.</p>
              </div>
            </div>
            <div className="flex gap-2 p-3 rounded-xl mb-5" style={{ backgroundColor: "#d9f6ff" }}>
              <Icon name="info" size={16} className="text-[#005861] mt-0.5 shrink-0" />
              <p className="text-xs leading-relaxed" style={{ color: "#2c6370" }}>
                <b style={{ color: "#00343e" }}>Note for Shelters:</b> Accounts require manual Admin approval. Verification takes 24-48 hours.
              </p>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold text-[#00343e] mb-1.5">Full Name</label>
                <input name="name" type="text" placeholder="Johnathan Doe" value={form.name} onChange={set}
                  className="w-full h-11 px-5 bg-[#adecff] rounded-lg text-sm text-[#00343e] border-none outline-none focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00343e] mb-1.5">Email Address</label>
                <input name="email" type="email" placeholder="john@example.com" value={form.email} onChange={set}
                  className="w-full h-11 px-5 bg-[#adecff] rounded-lg text-sm text-[#00343e] border-none outline-none focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-bold text-[#00343e] mb-1.5">Phone Number</label>
                <input name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set}
                  className="w-full h-11 px-5 bg-[#adecff] rounded-lg text-sm text-[#00343e] border-none outline-none focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00343e] mb-1.5">Location</label>
                <div className="relative">
                  <input name="location" type="text" placeholder="City, Country" value={form.location} onChange={set}
                    className="w-full h-11 pl-9 pr-4 bg-[#adecff] rounded-lg text-sm text-[#00343e] border-none outline-none focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/50" />
                  <Icon name="location_on" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2c6370]/60" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#00343e] mb-1.5">Create Password</label>
              <div className="relative">
                <input name="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set}
                  className="w-full h-11 px-5 pr-11 bg-[#adecff] rounded-lg text-sm text-[#00343e] border-none outline-none focus:ring-2 focus:ring-[#00656f]/40 placeholder:text-[#2c6370]/50" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer">
                  <Icon name={showPw ? "visibility_off" : "visibility"} size={18} className="text-[#2c6370]/60" />
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-widest mt-1.5" style={{ color: "#2c6370" }}>Min 8 characters with at least one number.</p>
            </div>

            {/* Checkbox */}
            <div className="flex gap-2.5 cursor-pointer mb-4" onClick={() => setAgreed(!agreed)}>
              <div className={`w-5 h-5 min-w-[20px] rounded-md mt-0.5 border-2 flex items-center justify-center transition-all ${agreed ? "border-[#00656f] bg-[#00656f]" : "border-[#4a7e8d] bg-transparent"}`}>
                {agreed && <Icon name="check" size={12} className="text-white" />}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#2c6370" }}>
                I agree to the{" "}
                <a href="#" onClick={e => e.stopPropagation()} className="font-bold" style={{ color: "#00656f", textDecoration: "none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" onClick={e => e.stopPropagation()} className="font-bold" style={{ color: "#00656f", textDecoration: "none" }}>Privacy Policy</a>
                , and consent to receiving updates about my adoption requests.
              </p>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.97]"
              style={{
                background: loading ? "#81b5c5" : "linear-gradient(to right,#00656f,#89e9f6)",
                color: "#d4f9ff",
                boxShadow: "0 8px 24px rgba(0,101,111,0.3)",
                fontFamily: "'Be Vietnam Pro', sans-serif",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #d4f9ff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Creating Account…
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </>
              ) : (
                <>Create Account <Icon name="arrow_forward" size={18} className="text-[#d4f9ff]" /></>
              )}
            </button>

            <div className="text-center mt-5 pt-4 border-t border-[#81b5c5]/30">
              <p className="text-xs" style={{ color: "#2c6370" }}>Need help? Contact our support team at</p>
              <a href="mailto:hello@petadopt.com" className="font-bold text-xs" style={{ color: "#00656f", textDecoration: "none" }}>hello@petadopt.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
