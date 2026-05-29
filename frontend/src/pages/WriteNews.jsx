import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddNewsForm from "../components/AddNewsForm";
import { ArrowLeft, Loader2, Feather } from "lucide-react";

export default function WriteNews() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 style={{ animation: "spin 1s linear infinite", color: "#2563eb", margin: "0 auto 12px", display: "block" }} size={36} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#64748b" }}>Turacyakura ibirimo...</p>
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Visual top line */}
      <div style={{ height: "4px", backgroundColor: "#2563eb" }} />

      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Back navigation */}
        <Link to="/" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b",
          textDecoration: "none", marginBottom: "32px",
          transition: "color 0.2s",
        }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          <ArrowLeft size={13} /> Subira Ahabanza
        </Link>

        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "40px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%",
            backgroundColor: "#0a192f", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Feather size={22} style={{ color: "#f1f5f9" }} />
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2rem", fontWeight: 900, color: "#0f172a",
              lineHeight: 1.2, margin: 0,
            }}>
              Urubuga rw'Umunyamakuru
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.95rem", color: "#64748b", marginTop: "6px", margin: "6px 0 0" }}>
              Uhawe ikaze, <strong style={{ color: "#2563eb" }}>{user.name || "Munyabigwi"}</strong>. Andika inkuru y'impamo uyisangize isi yose.
            </p>
          </div>
        </div>

        <AddNewsForm />
      </div>
    </div>
  );
}
