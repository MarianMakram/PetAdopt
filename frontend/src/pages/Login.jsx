import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import dog from"../assets/images/dog-login.png"
import Sarah from"../assets/images/Sarah .png"
// ── Icons ──────────────────────────────────────────────────────────────────
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M4.5 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.91 2.39C13.88 12.53 12.96 12 12 12s-1.88.53-2.59 1.39C8.67 14.24 8 15 8 16c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1-.67-1.76-1.41-2.61z" />
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
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);

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
      `}</style>
      <span style={{ fontSize: 20, marginTop: 1, flexShrink: 0 }}>{isSuccess ? "✅" : "❌"}</span>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{snack.message}</p>
      <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#fff", opacity: 0.7, padding: 0, paddingLeft: 8, fontSize: 18 }}>✕</button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function LoginForm() {
  const navigate = useNavigate();
  const { login, user, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(null);

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
          <p style={{ color: '#00343e', fontWeight: 600 }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleChange = ({ target: { name, value } }) =>
    setForm((p) => ({ ...p, [name]: value }));

  const showSnack = (message, type = "success") => {
    setSnack({ message, type });
    setTimeout(() => setSnack(null), 5000);
  };

  const handleSubmit = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      showSnack("Please enter your email and password.", "error");
      return;
    }

    try {
      setLoading(true);
      const userData = await login(form.email, form.password);
      showSnack(`Welcome back! 🐾 Logged in as ${userData.role}.`, "success");

      if (userData.role === 'Admin') navigate('/admin/users');
      else if (userData.role === 'Shelter') navigate('/shelter/pets');
      else navigate('/');
    } catch (err) {
      showSnack(err.response?.data?.message || err.response?.data || "Invalid credentials or account pending approval.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #d9f6ff 0%, #e9f9ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Be Vietnam Pro', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .login-card {
          width: 100%;
          max-width: 1000px;
          height: 600px;
          display: flex;
          background: #fff;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 101, 111, 0.1);
        }
        .login-left {
          flex: 1;
          position: relative;
          background: linear-gradient(to bottom right, #00656f, #005861);
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #d4f9ff;
        }
        .login-left-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
          mix-blend-mode: overlay;
        }
        .login-right {
          flex: 1;
          padding: 60px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .login-header h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #00343e;
          margin: 0 0 8px 0;
        }
        .login-header p {
          font-size: 14px;
          color: #2c6370;
          margin: 0;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #2c6370;
          margin-bottom: 8px;
        }
        .input-wrapper {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #2c6370;
          opacity: 0.5;
          display: flex;
          align-items: center;
        }
        .login-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: #adecff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          color: #00343e;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .login-input:focus {
          box-shadow: 0 0 0 2px rgba(0, 101, 111, 0.2);
        }
        .pass-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #2c6370;
          opacity: 0.5;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .login-btn {
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
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 101, 111, 0.3);
        }
        .login-btn:active {
          transform: translateY(0);
        }
        .login-btn:disabled {
          background: #81b5c5;
          cursor: not-allowed;
          transform: none;
        }
        .register-hint {
          margin-top: 30px;
          text-align: center;
          font-size: 13px;
          color: #2c6370;
        }
        .register-link {
          background: none;
          border: none;
          color: #9b3e20;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          margin-left: 4px;
        }
        .register-link:hover {
          text-decoration: underline;
        }
        .quote-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 16px;
          border: 1px border rgba(255, 255, 255, 0.15);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Snackbar snack={snack} onClose={() => setSnack(null)} />

      <div className="login-card">
        <div className="login-left">
          <img src={dog} className="login-left-img" alt="Dog" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 28, fontWeight: 900, margin: 0 }}>PetAdopt</p>
            <p style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Helping every animal find their way back home.</p>
          </div>
          <div className="quote-card">
            <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
              "Finding Max was the best thing that ever happened to our family. The process was seamless and heartfelt."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
              <img src={Sarah} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.25)" }} alt="Sarah" />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>Sarah Jenkins</p>
                <p style={{ fontSize: 11, opacity: 0.6, margin: 0 }}>Golden Retriever Adopter</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Log in to your sanctuary dashboard.</p>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon"><MailIcon /></span>
                <input type="email" name="email" className="login-input" placeholder="hello@example.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon"><LockIcon /></span>
                <input type={showPass ? "text" : "password"} name="password" className="login-input" style={{ paddingRight: 48 }} placeholder="••••••••" value={form.password} onChange={handleChange} required />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button className="login-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Logging In…
                </>
              ) : "Log In to Sanctuary"}
            </button>

            <p className="register-hint">
              New to PetAdopt?
              <button className="register-link" onClick={() => navigate("/register")}>Create an account</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
