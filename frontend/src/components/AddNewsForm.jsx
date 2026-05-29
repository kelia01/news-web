import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPost } from "../data/posts";
import { Loader2, AlertCircle, Image as ImageIcon, Eye } from "lucide-react";

const CATEGORY_COLORS = {
  Ubuzima: "#0d9488",   // Teal-Cyan
  Imikino: "#2563eb",    // Vibrant Royal Blue
  Politike: "#1e3a8a",   // Deep Navy Blue
  Ubucuruzi: "#4f46e5",  // Indigo Blue
  Ubuhanzi: "#7c3aed",   // Violet-Purple
  Science: "#0891b2",    // Bright Cyan
  "Isi yose": "#3b82f6",  // Sky Blue
};

const inputStyle = {
  width: "100%", padding: "12px 14px",
  border: "1px solid #cbd5e1", backgroundColor: "#f8fafc",
  color: "#0f172a", fontSize: "0.9rem", fontFamily: "Inter, sans-serif",
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block", fontFamily: "Inter, sans-serif", fontWeight: 700,
  fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase",
  color: "#475569", marginBottom: "8px"
};

const AddNewsForm = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Ubuzima");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { token } = useAuth();
  const navigate = useNavigate();

  const categories = [
    "Ubuzima",
    "Imikino",
    "Politike",
    "Ubucuruzi",
    "Ubuhanzi",
    "Science",
    "Isi yose",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const postData = {
      title,
      excerpt,
      content,
      category,
      image: image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    };

    try {
      const data = await createPost(postData, token);
      
      if (data.error || !data.post) {
        throw new Error(data.message || "Ntibishoboye kubikwa.");
      }

      navigate(`/news/${data.post.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const catColor = CATEGORY_COLORS[category] || "#2563eb";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#fff", padding: "48px 40px", border: "1px solid #e2e8f0",
        boxShadow: "0 4px 24px rgba(15,23,42,0.06)", display: "flex", flexDirection: "column", gap: "28px"
      }}>
        <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "18px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Tangaza Amakuru Mashya
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.88rem", color: "#64748b", marginTop: "4px", margin: "4px 0 0" }}>
            Fenya ibiranga inkuru hasi kugira ngo isohoke ku urubuga.
          </p>
        </div>

        {error && (
          <div style={{ padding: "12px 16px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: "1px" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.83rem", color: "#991b1b" }}>{error}</span>
          </div>
        )}

        {/* Title */}
        <div>
          <label style={labelStyle}>Umutwe w'inkuru (Headline)</label>
          <input
            type="text"
            placeholder="Andika umutwe w'inkuru..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }}
            required
          />
        </div>

        {/* Category & Image URL Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div>
            <label style={labelStyle}>Ikiciro (Category)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer", height: "46px" }}
              onFocus={(e) => { e.target.style.borderColor = "#2563eb"; }}
              onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; }}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Ifoto (Image URL - Optional)</label>
            <div style={{ position: "relative" }}>
              <ImageIcon size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ ...inputStyle, paddingLeft: "42px" }}
                onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>Incamake (Excerpt / Summary)</label>
          <textarea
            placeholder="Andika incamake y'iyi nkuru kugira ngo igaragare ku urutonde..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            style={{ ...inputStyle, resize: "vertical", height: "80px", fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6 }}
            onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Full Content */}
        <div>
          <label style={labelStyle}>Ibirimo byose (Full Article Content)</label>
          <textarea
            placeholder="Andika inkuru yose hano..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ ...inputStyle, resize: "vertical", height: "300px", fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.7, fontSize: "0.98rem" }}
            onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            alignSelf: "flex-start", backgroundColor: loading ? "#93c5fd" : "#2563eb", color: "#fff",
            padding: "14px 36px", border: "none", cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
          onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#2563eb"; }}
        >
          {loading ? (
            <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Biracyatunganywa...</>
          ) : "Tangaza Inkuru"}
        </button>
      </form>

      {/* Live Preview section */}
      <div style={{
        backgroundColor: "#f8fafc", border: "1px dashed #cbd5e1", padding: "32px",
        display: "flex", flexDirection: "column", gap: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
          <Eye size={16} style={{ color: "#64748b" }} />
          <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", margin: 0 }}>
            Izabikwa gutya (Card Live Preview)
          </h3>
        </div>

        <div style={{
          backgroundColor: "#fff", border: "1px solid #e2e8f0", display: "flex",
          flexDirection: "column", overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s"
        }}>
          {/* Image */}
          <div style={{ height: "200px", backgroundColor: "#f1f5f9", overflow: "hidden", position: "relative" }}>
            <img
              src={image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              backgroundColor: catColor, color: "#fff",
              fontFamily: "Inter, sans-serif", fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px"
            }}>
              {category}
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <h4 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem",
              fontWeight: 800, color: "#0f172a", lineHeight: 1.3, margin: 0
            }}>
              {title || "Umutwe w'inkuru urabanza hano..."}
            </h4>
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.88rem",
              color: "#475569", lineHeight: 1.6, margin: 0
            }}>
              {excerpt || "Incamake y'inkuru izaboneka hano umaze kuyandika..."}
            </p>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600 }}>
              <span>BAGI REPORTER</span>
              <span>•</span>
              <span>UBU</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
};

export default AddNewsForm;