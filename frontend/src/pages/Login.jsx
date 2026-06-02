import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const inputStyle = {
  width: "100%", padding: "12px 14px 12px 42px",
  border: "1px solid #cbd5e1", backgroundColor: "#f8fafc",
  color: "#0f172a", fontSize: "0.9rem", fontFamily: "Inter, sans-serif",
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Email cyangwa ijambo ry'ibanga ntibyo.");
      login(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      {/* Left decorative panel (hidden on mobile) */}
      <div style={{ display: "flex", maxWidth: "900px", width: "100%", backgroundColor: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 4px 32px rgba(15,23,42,0.08)" }}>

        {/* Decorative side */}
        <div style={{
          width: "360px", flexShrink: 0, backgroundColor: "#0a192f",
          padding: "56px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between",
        }} className="auth-panel-side">
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.8rem", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>
                BAGI <span style={{ color: "#2563eb" }}>NEWS</span>
              </div>
            </Link>
            <div style={{ width: "40px", height: "3px", backgroundColor: "#2563eb", marginTop: "12px", marginBottom: "32px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.7rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.3, marginBottom: "16px" }}>
              Murakaza neza<br />ku rubuga rwacu
            </h2>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#cbd5e1", lineHeight: 1.7, fontSize: "0.92rem" }}>
              Injira kugira ngo ukore inkuru z'ukuri kandi uzisangire isi yose.
            </p>
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "#64748b", lineHeight: 1.6 }}>
            "Ukuri gusa kuva ku banyamakuru b'ikirenga."
          </div>
        </div>

        {/* Form panel */}
        <div style={{ flex: 1, padding: "56px 48px" }}>
          <div style={{ marginBottom: "36px" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              Injira muri Konti Yawe
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.9rem", color: "#475569" }}>
              Uruhara rw'abanyamakuru b'impamo
            </p>
          </div>

          {error && (
            <div style={{ marginBottom: "20px", padding: "12px 16px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: "1px" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.83rem", color: "#991b1b" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#475569", marginBottom: "8px" }}>
                Aderesi ya Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#475569", marginBottom: "8px" }}>
                Ijambo ry'Ibanga
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", backgroundColor: loading ? "#93c5fd" : "#2563eb", color: "#fff",
                padding: "13px", border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
                gap: "8px", marginTop: "8px", transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
              onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#2563eb"; }}
            >
              {loading ? (
                <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Biracyinjira...</>
              ) : "Injira"}
            </button>
          </form>

          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.88rem", color: "#64748b", marginTop: "28px", textAlign: "center" }}>
            Ntaruhushya ufite?{" "}
            <Link to="/register" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
              Iyandikishe hano
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @media(max-width:640px){ .auth-panel-side { display:none !important; } }
      `}</style>
    </div>
  );
}
