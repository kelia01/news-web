import { useEffect, useState } from "react";
import { ArrowLeft, User, Calendar, Tag, Loader2, AlertCircle, Share2 } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORY_COLORS = {
  Ubuzima: "#0d9488",   // Teal-Cyan
  Imikino: "#2563eb",    // Vibrant Royal Blue
  Politike: "#1e3a8a",   // Deep Navy Blue
  Ubucuruzi: "#4f46e5",  // Indigo Blue
  Ubuhanzi: "#7c3aed",   // Violet-Purple
  Science: "#0891b2",    // Bright Cyan
  "Isi yose": "#3b82f6",  // Sky Blue
};

// Get current user from token stored in localStorage
const getCurrentUser = () => {
  console.log("localStorage keys:", Object.keys(localStorage));
console.log("token:", localStorage.getItem("token"));
console.log("currentUser:", currentUser);
console.log("post.author._id:", post.author?._id);
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload; // has .id and .role
  } catch {
    return null;
  }
};

export const SingleNews = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/posts/${slug}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("Iyi nkuru ntabwo yabonetse.");
          throw new Error("Guhura na server byashinzwe.");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message || "Habonetse ikibazo mu gushaka iyi nkuru.");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPostDetails();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  const catColor = CATEGORY_COLORS[post?.category] || "#2563eb";

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 style={{ animation: "spin 1s linear infinite", color: "#2563eb", margin: "0 auto 12px", display: "block" }} size={36} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#64748b" }}>Turacyakura ibirimo by'inkuru...</p>
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc", padding: "40px 24px" }}>
        <div style={{ maxWidth: "480px", width: "100%", backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "48px 40px", textAlign: "center", boxShadow: "0 4px 20px rgba(15,23,42,0.06)" }}>
          <AlertCircle size={44} style={{ color: "#2563eb", marginBottom: "16px" }} />
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", color: "#0f172a", marginBottom: "10px" }}>Inkuru Ntabwo Yabonetse</h3>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#64748b", fontSize: "0.9rem", marginBottom: "28px" }}>
            {error || "Habonetse ikibazo kitazwi."}
          </p>
          <Link to="/" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "11px 28px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", display: "inline-flex", alignItems: "center", gap: "8px", transition: "background-color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            <ArrowLeft size={14} /> Subira Ahabanza
          </Link>
        </div>
      </div>
    );
  }
  const currentUser = getCurrentUser();

const canDelete = post && currentUser && (
  currentUser.id === post.author?._id ||
  currentUser.role === "admin"
);

const handleDelete = async () => {
  if (!window.confirm("Uzi neza ko ushaka gusiba iyi nkuru?")) return;

  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/posts/${post.slug}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    navigate("/"); // make sure `useNavigate` is imported
  } else {
    alert("Gusiba byanze. Ongera ugerageze.");
  }
};

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Category color bar */}
      <div style={{ height: "4px", backgroundColor: catColor }} />

      <article style={{ maxWidth: "840px", margin: "0 auto", padding: "40px 24px 80px" }}>

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

        {/* Category + date breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
          <div style={{
            backgroundColor: catColor, color: "#fff",
            fontFamily: "Inter, sans-serif", fontSize: "0.62rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 12px",
          }}>
            {post.category}
          </div>
          <div style={{ width: "1px", height: "14px", backgroundColor: "#cbd5e1" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "#64748b" }}>
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900,
          color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.01em",
          marginBottom: "20px",
        }}>
          {post.title}
        </h1>

        {/* Deck / excerpt */}
        {post.excerpt && (
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "1.15rem", fontStyle: "italic", color: "#334155",
            lineHeight: 1.7, borderLeft: `3px solid ${catColor}`,
            paddingLeft: "20px", marginBottom: "28px",
          }}>
            {post.excerpt}
          </p>
        )}

        {/* Byline + share */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
          borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0",
          padding: "16px 0", marginBottom: "36px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Author avatar */}
            <div style={{
              width: "42px", height: "42px", borderRadius: "50%",
              backgroundColor: catColor, display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <User size={18} style={{ color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                {post.author?.name || "Bagi Reporter"}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#64748b", display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                <Calendar size={11} /> {formatDate(post.publishedAt)}
              </div>
            </div>
          </div>

          <button
            onClick={() => { if (navigator.share) navigator.share({ title: post.title, url: window.location.href }); }}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#475569", backgroundColor: "transparent",
              border: "1px solid #cbd5e1", padding: "8px 14px", cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.color = "#2563eb"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.color = "#475569"; }}
          >
            <Share2 size={13} /> Sangira
          </button>
          {canDelete && (
  <button
    onClick={handleDelete}
    style={{
      display: "flex", alignItems: "center", gap: "6px",
      fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      color: "#fff", backgroundColor: "#dc2626",
      border: "none", padding: "8px 14px", cursor: "pointer",
      transition: "background-color 0.2s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
  >
    🗑 Siba
  </button>
)}
        </div>

        {/* Hero image */}
        <div style={{ marginBottom: "40px", backgroundColor: "#f1f5f9", overflow: "hidden" }}>
          <img
            src={post.image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"}
            alt={post.title}
            style={{ width: "100%", height: "420px", objectFit: "cover", display: "block" }}
          />
          <div style={{ padding: "10px 14px", backgroundColor: "#f1f5f9", borderTop: "1px solid #e2e8f0" }}>
            <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.75rem", fontStyle: "italic", color: "#64748b" }}>
              {post.category} — Bagi News
            </span>
          </div>
        </div>

        {/* Article body */}
        <div style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: "1.05rem", lineHeight: 1.85, color: "#1e293b",
          whiteSpace: "pre-line",
        }}>
          {/* Drop cap effect on first paragraph */}
          {(post.content || '').split('\n').filter(Boolean).map((para, i) => (
            <p key={i} style={{
              marginBottom: "1.6em",
              ...(i === 0 ? {
                // drop cap via firstLetter trick
              } : {}),
            }}>
              {i === 0 ? (
                <>
                  <span style={{
                    float: "left", fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "4.2rem", lineHeight: "0.8", fontWeight: 900,
                    color: catColor, marginRight: "8px", marginTop: "6px",
                    paddingRight: "4px",
                  }}>
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </>
              ) : para}
            </p>
          ))}
        </div>

        {/* Article tags / category footer */}
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
          <Tag size={14} style={{ color: "#64748b" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.06em" }}>IKICIRO:</span>
          <Link to={`/category/${post.category}`} style={{
            backgroundColor: catColor, color: "#fff", padding: "4px 12px",
            fontFamily: "Inter, sans-serif", fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
          }}>
            {post.category}
          </Link>
        </div>
      </article>

      {/* Newsletter bottom */}
      <div style={{ backgroundColor: "#0a192f", padding: "56px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "12px" }}>
            Wakunze iyi nkuru?
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.7rem", fontWeight: 800, color: "#ffffff", marginBottom: "14px", lineHeight: 1.3 }}>
            Iyandikishe kugira ngo Udacikanwa n'Izindi
          </h3>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#cbd5e1", marginBottom: "28px", lineHeight: 1.7 }}>
            Ukiru gusa, buri munsi, butaratira.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: "0", maxWidth: "420px", margin: "0 auto" }}>
            <input type="email" placeholder="email@example.com" style={{ flex: 1, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "0.85rem", outline: "none", fontFamily: "Inter, sans-serif" }} />
            <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px 20px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap", transition: "background-color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
