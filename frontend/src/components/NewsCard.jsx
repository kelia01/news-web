import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";

const CATEGORY_COLORS = {
  Ubuzima: "#0d9488",   // Teal-Cyan
  Imikino: "#2563eb",    // Vibrant Royal Blue
  Politike: "#1e3a8a",   // Deep Navy Blue
  Ubucuruzi: "#4f46e5",  // Indigo Blue
  Ubuhanzi: "#7c3aed",   // Violet-Purple
  Science: "#0891b2",    // Bright Cyan
  "Isi yose": "#3b82f6",  // Sky Blue
};

function NewsCard({ post, variant = "default" }) {
  const catColor = CATEGORY_COLORS[post.category] || "#2563eb";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Horizontal list variant (for sidebar/list rows)
  if (variant === "horizontal") {
    return (
      <Link to={`/news/${post.slug}`} style={{ textDecoration: "none", display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <div style={{ width: "90px", height: "70px", flexShrink: 0, overflow: "hidden", backgroundColor: "#f1f5f9" }}>
          <img
            src={post.image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            loading="lazy"
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: catColor, marginBottom: "5px", fontFamily: "Inter, sans-serif" }}>
            {post.category}
          </div>
          <h4 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: "0.88rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.4,
            margin: 0, marginBottom: "6px",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.title}
          </h4>
          <span style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "Inter, sans-serif" }}>
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  // Default card variant
  return (
    <Link to={`/news/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
        transition: "box-shadow 0.3s ease, transform 0.2s ease",
        height: "100%", display: "flex", flexDirection: "column",
      }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,23,42,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div style={{ height: "200px", overflow: "hidden", flexShrink: 0, backgroundColor: "#f1f5f9" }}>
          <img
            src={post.image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"}
            alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            display: "inline-block", backgroundColor: catColor, color: "#fff",
            fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "3px 8px", marginBottom: "12px",
            alignSelf: "flex-start", fontFamily: "Inter, sans-serif",
          }}>
            {post.category}
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.45,
            margin: 0, marginBottom: "8px", flex: 1,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {post.title}
          </h3>

          {post.excerpt && (
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "0.82rem", color: "#475569", lineHeight: 1.6, marginBottom: "14px",
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {post.excerpt}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.68rem", color: "#475569", fontFamily: "Inter, sans-serif" }}>
              <User size={11} style={{ color: catColor }} />
              <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {post.author?.name || "Bagi Reporter"}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.68rem", color: "#475569", fontFamily: "Inter, sans-serif" }}>
              <Calendar size={11} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default NewsCard;
