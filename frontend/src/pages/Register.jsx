import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../services/apiClient";
import DOG from "../assets/images/dogs.png";
import AVA from "../assets/images/ava.png";


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
  const { user, isLoading } = useAuth();
  const [role, setRole] = useState("adopter");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      const roleStr = String(user.role).toLowerCase();
      if (roleStr === 'admin') navigate('/admin/users');
      else if (roleStr === 'shelter') navigate('/shelter/pets');
      else navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (user && !isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e9f9ff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '4px solid #00656f', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#00343e', fontWeight: 600, fontFamily: "'Be Vietnam Pro'" }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showSnack = (message, type = "success") => {
    setSnack({ message, type });
    setTimeout(() => setSnack(null), 5000);
  };

  const handleSubmit = async () => {
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

    const nameParts = form.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const locParts = form.location.split(",").map((s) => s.trim());
    const city = locParts[0] || "";
    const country = locParts[1] || "";

    const payload = {
      email: form.email,
      password: form.password,
      firstName,
      lastName,
      phone: form.phone,
      city,
      country,
    };

    const endpoint = role === "shelter" ? "/auth/register/shelter" : "/auth/register";

    try {
      setLoading(true);
      await apiClient.post(endpoint, payload);

      showSnack(
        role === "shelter"
          ? "Account created! 🎉 Your shelter account is pending Admin approval — this usually takes 24–48 hours."
          : "Account created successfully! 🐾 Welcome to PetAdopt — you can now log in.",
        "success"
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      showSnack(err.response?.data || "Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
      setForm(prev => ({ ...prev, password: "" }));
    }
  };

  return (
    <div className="register-page">
      <style>{`
        .register-page {
          min-height: calc(100vh - 80px);
          width: 100%;
          background: linear-gradient(135deg, #d9f6ff 0%, #e9f9ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Be Vietnam Pro', sans-serif;
          padding: 40px 20px;
          box-sizing: border-box;
        }
        .register-card {
          width: 100%;
          max-width: 1200px;
          min-height: 700px;
          display: flex;
          background: #fff;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 52, 62, 0.08);
        }
        .register-left {
          flex: 1;
          position: relative;
          background: linear-gradient(to bottom right, #00656f, #005861);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #d4f9ff;
        }
        .register-left-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
          mix-blend-mode: overlay;
        }
        .register-right {
          flex: 1.2;
          padding: 50px 60px;
          background: #fff;
          overflow-y: auto;
          max-height: 800px;
        }
        .register-header h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #00343e;
          margin: 0 0 8px 0;
        }
        .register-header p {
          font-size: 14px;
          color: #2c6370;
          margin: 0;
        }
        .role-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 24px 0;
        }
        .role-card {
          padding: 16px;
          border-radius: 16px;
          border: 2px solid transparent;
          background: #f4fbfc;
          cursor: pointer;
          transition: all 0.2s;
        }
        .role-card.active {
          border-color: #00656f;
          background: #e9f9ff;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #2c6370;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .input-wrapper {
          position: relative;
        }
        .register-input {
          width: 100%;
          padding: 12px 16px;
          background: #f4fbfc;
          border: 1px solid #e1f0f4;
          border-radius: 12px;
          font-size: 14px;
          color: #00343e;
          outline: none;
          transition: all 0.2s;
        }
        .register-input:focus {
          border-color: #00656f;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(0, 101, 111, 0.05);
        }
        .register-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 100px;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(to right, #00656f, #005861);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .register-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 101, 111, 0.3);
        }
        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .quote-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        @media (max-width: 1000px) {
          .register-card {
            flex-direction: column;
            max-width: 600px;
            min-height: auto;
          }
          .register-left {
            display: none;
          }
          .register-right {
            padding: 40px;
            max-height: none;
          }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Snackbar snack={snack} onClose={() => setSnack(null)} />

      <div className="register-card">
        <div className="register-left">
          <img src={DOG} className="register-left-img" alt="Registration" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 28, fontWeight: 900, margin: 0 }}>PetAdopt</p>
            <p style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Create a legacy of kindness today.</p>
          </div>
          <div className="quote-card">
            <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
              "Adopting wasn't just about saving a life; it was about completing our home. The process was seamless and heartfelt."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
              <img src={AVA} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.25)" }} alt="Sarah" />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>Sarah Jenkins</p>
                <p style={{ fontSize: 11, opacity: 0.6, margin: 0 }}>Adopter since 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="register-header">
            <h2>Begin your journey</h2>
            <p onClick={() => navigate("/login")} style={{ cursor: "pointer", display: "inline-block" }}>
              Already have an account? <span style={{ color: "#00656f", fontWeight: 700 }}>Sign in</span>
            </p>
          </div>

          <div className="role-selector">
            <div 
              className={`role-card ${role === "adopter" ? "active" : ""}`}
              onClick={() => setRole("adopter")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Icon name="favorite" size={20} fill={role === "adopter" ? 1 : 0} className={role === "adopter" ? "text-[#00656f]" : "text-[#2c6370]"} />
                {role === "adopter" && <Icon name="check_circle" size={18} className="text-[#00656f]" />}
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#00343e", marginBottom: 4 }}>I am an Adopter</p>
              <p style={{ fontSize: 11, color: "#2c6370", lineHeight: 1.4 }}>Looking for a new companion.</p>
            </div>
            <div 
              className={`role-card ${role === "shelter" ? "active" : ""}`}
              onClick={() => setRole("shelter")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Icon name="home_health" size={20} fill={role === "shelter" ? 1 : 0} className={role === "shelter" ? "text-[#00656f]" : "text-[#2c6370]"} />
                {role === "shelter" && <Icon name="check_circle" size={18} className="text-[#00656f]" />}
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#00343e", marginBottom: 4 }}>Shelter / Owner</p>
              <p style={{ fontSize: 11, color: "#2c6370", lineHeight: 1.4 }}>Manage pets and requests.</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input name="name" type="text" placeholder="Johnathan Doe" value={form.name} onChange={set} className="register-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input name="email" type="email" placeholder="john@example.com" value={form.email} onChange={set} className="register-input" />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set} className="register-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input name="location" type="text" placeholder="City, Country" value={form.location} onChange={set} className="register-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Create Password</label>
            <div className="input-wrapper">
              <input name="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set} className="register-input" />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#2c6370", opacity: 0.6 }}>
                <Icon name={showPw ? "visibility_off" : "visibility"} size={18} />
              </button>
            </div>
            <p style={{ fontSize: 10, color: "#2c6370", marginTop: 6, textTransform: "uppercase", letterSpacing: "1px" }}>Min 8 characters with at least one number.</p>
          </div>

          <div style={{ display: "flex", gap: 12, cursor: "pointer", marginTop: 24 }} onClick={() => setAgreed(!agreed)}>
            <div style={{ 
              width: 20, height: 20, minWidth: 20, borderRadius: 6, border: "2px solid",
              borderColor: agreed ? "#00656f" : "#cbd5e1",
              backgroundColor: agreed ? "#00656f" : "transparent",
              display: "flex", alignItems: "center", justifyCenter: "center",
              transition: "all 0.2s"
            }}>
              {agreed && <Icon name="check" size={14} style={{ color: "#fff" }} />}
            </div>
            <p style={{ fontSize: 12, color: "#2c6370", lineHeight: 1.5 }}>
              I agree to the <span style={{ color: "#00656f", fontWeight: 700 }}>Terms of Service</span> and <span style={{ color: "#00656f", fontWeight: 700 }}>Privacy Policy</span>.
            </p>
          </div>

          <button className="register-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                Creating Account…
              </>
            ) : (
              <>Create Account <Icon name="arrow_forward" size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
