import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPosts } from "../data/posts";
import { ArrowRight, Newspaper, Loader2, AlertCircle, ChevronRight } from "lucide-react";
import NewsCard from "../components/NewsCard";

const CATEGORY_COLORS = {
  Ubuzima: "#0d9488",   // Teal-Cyan
  Imikino: "#2563eb",    // Vibrant Royal Blue
  Politike: "#1e3a8a",   // Deep Navy Blue
  Ubucuruzi: "#4f46e5",  // Indigo Blue
  Ubuhanzi: "#7c3aed",   // Violet-Purple
  Science: "#0891b2",    // Bright Cyan
  "Isi yose": "#3b82f6",  // Sky Blue
};

const CATEGORY_LIST = ["Ubuzima", "Imikino", "Politike", "Ubucuruzi", "Ubuhanzi", "Science", "Isi yose"];

// ============================================================
// Breaking News Marquee
// ============================================================
function BreakingNewsBar({ posts }) {
  if (!posts?.length) return null;
  const items = [...posts, ...posts]; // duplicate for infinite scroll feel

  return (
    <div style={{ backgroundColor: "#0a192f", display: "flex", overflow: "hidden", borderBottom: "2px solid #2563eb" }}>
      {/* Label */}
      <div style={{
        backgroundColor: "#2563eb", color: "#fff", padding: "9px 20px",
        fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
        fontFamily: "Inter, sans-serif", whiteSpace: "nowrap", display: "flex", alignItems: "center",
        flexShrink: 0, zIndex: 2,
      }}>
        🔵 INKURU ZIHUTIRWA
      </div>
      {/* Scrolling text */}
      <div style={{ overflow: "hidden", flex: 1, display: "flex", alignItems: "center", position: "relative" }}>
        <div
          className="marquee-track"
          style={{ display: "flex", gap: "60px", paddingLeft: "30px" }}
        >
          {items.map((post, i) => (
            <Link key={`${post._id}-${i}`} to={`/news/${post.slug}`} style={{
              color: "#ffffff", textDecoration: "none", fontSize: "0.8rem",
              fontFamily: "'Source Serif 4', Georgia, serif", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "color 0.2s",
            }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#93c5fd")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              <span style={{ color: "#2563eb", fontSize: "1rem" }}>◆</span>
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Accordion Hero Carousel
// ============================================================
function AccordionCarousel({ posts }) {
  const [active, setActive] = useState(0);
  const panelPosts = posts.slice(0, 5);

  if (!panelPosts.length) return null;

  const formatDate = (ds) => {
    if (!ds) return "";
    return new Date(ds).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div style={{ display: "flex", height: "520px", gap: "4px", backgroundColor: "#030712" }}>
      {panelPosts.map((post, i) => {
        const isActive = i === active;
        const catColor = CATEGORY_COLORS[post.category] || "#2563eb";

        return (
          <div
            key={post._id}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            style={{
              position: "relative",
              flex: isActive ? 5 : 0.7,
              minWidth: "52px",
              cursor: "pointer",
              overflow: "hidden",
              transition: "flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Background image with cinematic zoom transition */}
            <img
              src={post.image || "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"}
              alt={post.title}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isActive ? "scale(1.03) translate(0, 0)" : "scale(1.12)",
              }}
            />

            {/* Dark overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: isActive
                ? "linear-gradient(to top, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.45) 55%, rgba(3,7,18,0.15) 100%)"
                : "rgba(3,7,18,0.72)",
              transition: "background 0.6s ease",
            }} />

            {/* Collapsed label (vertical text) */}
            {!isActive && (
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 1, transition: "opacity 0.3s ease",
              }}>
                <div style={{
                  writingMode: "vertical-rl", textOrientation: "mixed",
                  color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif",
                  userSelect: "none",
                }}>
                  {post.category}
                </div>
              </div>
            )}

            {/* Active content */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 36px 36px",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
              pointerEvents: isActive ? "auto" : "none",
            }}>
              {/* Panel indicators */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
                {panelPosts.map((_, pi) => (
                  <div key={pi} style={{
                    height: "3px", flex: 1, borderRadius: "2px",
                    backgroundColor: pi === active ? "#2563eb" : "rgba(255,255,255,0.3)",
                    transition: "background-color 0.3s",
                  }} />
                ))}
              </div>

              <div style={{
                display: "inline-block", backgroundColor: catColor, color: "#fff",
                fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "4px 10px", marginBottom: "14px",
                fontFamily: "Inter, sans-serif",
              }}>
                {post.category}
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "#fff",
                lineHeight: 1.25, marginBottom: "12px",
                display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {post.title}
              </h2>

              {post.excerpt && (
                <p style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.6,
                  marginBottom: "20px",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.excerpt}
                </p>
              )}

              <div style={{ display: "flex", alignItems: "center", justifySpaceBetween: "space-between" }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}>
                  {post.author?.name || "Bagi Reporter"} · {formatDate(post.publishedAt)}
                </div>
                <Link to={`/news/${post.slug}`} style={{
                  backgroundColor: "#2563eb", color: "#fff", padding: "9px 20px",
                  textDecoration: "none", fontWeight: 700, fontSize: "0.72rem",
                  letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif",
                  display: "flex", alignItems: "center", gap: "6px",
                  transition: "background 0.2s",
                }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                >
                  Soma <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Number indicator */}
            <div style={{
              position: "absolute", top: "16px", left: "16px",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "0.7rem", fontWeight: 900, color: isActive ? "#2563eb" : "rgba(255,255,255,0.3)",
              transition: "color 0.3s",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Sidebar
// ============================================================
function Sidebar({ posts }) {
  const trending = posts.slice(0, 6);

  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Trending */}
      <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(15,23,42,0.05)" }}>
        {/* Sidebar header */}
        <div style={{ borderBottom: "3px solid #0f172a", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Inkuru Zikunzwe
          </h3>
          <div style={{ width: "28px", height: "3px", backgroundColor: "#2563eb" }} />
        </div>
        <div style={{ padding: "8px 0" }}>
          {trending.map((post, i) => (
            <Link key={post._id} to={`/news/${post.slug}`} style={{ textDecoration: "none", display: "flex", gap: "14px", padding: "14px 20px", borderBottom: i < trending.length - 1 ? "1px solid #f8fafc" : "none", alignItems: "flex-start", transition: "background 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* Number */}
              <div style={{ position: "relative", width: "28px", flexShrink: 0, paddingTop: "2px" }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 900, color: "#f1f5f9", lineHeight: 1, position: "absolute", top: "-4px", left: "-2px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#2563eb", position: "relative", zIndex: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: CATEGORY_COLORS[post.category] || "#2563eb", marginBottom: "5px", fontFamily: "Inter, sans-serif" }}>
                  {post.category}
                </div>
                <h4 style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: "0.88rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.45,
                  margin: 0,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ backgroundColor: "#0a192f", padding: "28px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "10px", fontFamily: "Inter, sans-serif" }}>
          Newsletter
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "10px", lineHeight: 1.3 }}>
          Wakire Amakuru Buri Munsi
        </h3>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginBottom: "18px", lineHeight: 1.6 }}>
          Iyandikishe ukakira inkuru nziza nka izi buri gitondo.
        </p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input
            type="email"
            placeholder="email@example.com"
            style={{
              width: "100%", padding: "10px 12px", border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "rgba(255,255,255,0.08)", color: "#fff",
              fontSize: "0.82rem", fontFamily: "Inter, sans-serif", outline: "none",
            }}
          />
          <button type="submit" style={{
            backgroundColor: "#2563eb", color: "#fff", padding: "10px",
            border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif",
            transition: "background-color 0.2s",
          }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1d4ed8"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Ad / Promo Block */}
      <div style={{ border: "1px dashed #cbd5e1", padding: "24px", textAlign: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>
          Reklamu
        </div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.9rem", color: "#64748b", fontStyle: "italic" }}>
          Shyira reklamu yawe hano
        </div>
      </div>
    </aside>
  );
}

// ============================================================
// Category Section
// ============================================================
function CategorySection({ title, posts, color }) {
  if (!posts.length) return null;
  const [featured, ...rest] = posts;

  const formatDate = (ds) => {
    if (!ds) return "";
    return new Date(ds).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <section style={{ marginBottom: "48px" }}>
      {/* Section header */}
      <div style={{ borderTop: `3px solid ${color || "#2563eb"}`, paddingTop: "14px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
          {title}
        </h2>
        <Link to={`/category/${title}`} style={{
          fontSize: "0.68rem", fontWeight: 700, color: color || "#2563eb", textDecoration: "none",
          letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          Soma Yose <ArrowRight size={13} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>
        {/* Featured large card */}
        <Link to={`/news/${featured.slug}`} style={{ textDecoration: "none" }}>
          <article style={{
            backgroundColor: "#fff", border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
            transition: "box-shadow 0.3s, transform 0.2s", height: "100%",
          }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,23,42,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ height: "240px", overflow: "hidden", backgroundColor: "#f1f5f9" }}>
              <img
                src={featured.image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"}
                alt={featured.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "inline-block", backgroundColor: color || "#2563eb", color: "#fff", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", marginBottom: "12px", fontFamily: "Inter, sans-serif" }}>
                {featured.category}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.35, marginBottom: "10px" }}>
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {featured.excerpt}
                </p>
              )}
              <div style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "Inter, sans-serif" }}>
                {featured.author?.name || "Bagi Reporter"} · {formatDate(featured.publishedAt)}
              </div>
            </div>
          </article>
        </Link>

        {/* List of smaller articles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {rest.slice(0, 4).map((post, i) => (
            <div key={post._id}>
              <Link to={`/news/${post.slug}`} style={{ textDecoration: "none", display: "flex", gap: "12px", alignItems: "flex-start" }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div style={{ width: "80px", height: "62px", flexShrink: 0, overflow: "hidden", backgroundColor: "#f1f5f9" }}>
                  <img
                    src={post.image || "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg"}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "0.88rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.4, margin: "0 0 6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {post.title}
                  </h4>
                  <span style={{ fontSize: "0.65rem", color: "#64748b", fontFamily: "Inter, sans-serif" }}>
                    {post.author?.name || "Bagi Reporter"} · {formatDate(post.publishedAt)}
                  </span>
                </div>
              </Link>
              {i < rest.slice(0, 4).length - 1 && <div style={{ height: "1px", backgroundColor: "#e2e8f0", marginTop: "16px" }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Main Home Component
// ============================================================
const Home = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Ntitwashoboye guhuza na server. Kora refresh ugerageze kandi.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 style={{ animation: "spin 1s linear infinite", color: "#2563eb", margin: "0 auto 12px" }} size={36} />
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#475569", fontSize: "1rem" }}>Turacyakura amakuru mashya...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "500px", margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "40px", boxShadow: "0 4px 12px rgba(15,23,42,0.05)" }}>
          <AlertCircle size={40} style={{ color: "#2563eb", marginBottom: "16px" }} />
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", color: "#0f172a", marginBottom: "10px" }}>Ikibazo cyabonetse</h3>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#475569", fontSize: "0.9rem", marginBottom: "24px" }}>{error}</p>
          <button onClick={() => window.location.reload()} style={{ backgroundColor: "#2563eb", color: "#fff", padding: "10px 28px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
            Kora Refresh
          </button>
        </div>
      </div>
    );
  }

  // ---- Category page ----
  if (category) {
    const filtered = posts.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
    const catColor = CATEGORY_COLORS[category] || "#2563eb";

    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Breaking news bar */}
        <BreakingNewsBar posts={posts.slice(0, 8)} />

        {/* Header */}
        <div style={{ borderTop: `4px solid ${catColor}`, paddingTop: "20px", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 900, color: "#0f172a", marginBottom: "4px" }}>
              {category}
            </h1>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#475569", fontSize: "0.9rem" }}>
              {filtered.length} inkuru zibonetse
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <Newspaper size={48} style={{ color: "#cbd5e1", marginBottom: "16px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", color: "#475569", marginBottom: "8px" }}>Nta nkuru muri iki kiciro</h2>
            <Link to="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.06em" }}>← Subira Ahabanza</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {filtered.map((post) => <NewsCard key={post._id} post={post} />)}
          </div>
        )}
      </div>
    );
  }

  // ---- Main homepage ----
  if (posts.length === 0) {
    return (
      <div style={{ maxWidth: "700px", margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "60px 40px", boxShadow: "0 4px 12px rgba(15,23,42,0.05)" }}>
          <Newspaper size={56} style={{ color: "#cbd5e1", marginBottom: "20px" }} />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.8rem", color: "#0f172a", marginBottom: "12px" }}>Nta nkuru zirahatangazwa</h2>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: "#475569", marginBottom: "28px" }}>
            Kuri ubu nta nkuru n'imwe irashyirwa ku rubuga. Niba uri umunyamakuru, tangaza inkuru ya mbere!
          </p>
          <Link to="/write" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px 32px", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
            Tangaza Inkuru
          </Link>
        </div>
      </div>
    );
  }

  // Group posts by category
  const postsByCategory = {};
  CATEGORY_LIST.forEach((cat) => {
    postsByCategory[cat] = posts.filter((p) => p.category === cat);
  });

  return (
    <div>
      {/* Breaking news */}
      <BreakingNewsBar posts={posts.slice(0, 10)} />

      {/* Accordion Hero */}
      <AccordionCarousel posts={posts} />

      {/* Main body: 2-col layout */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "48px", alignItems: "flex-start" }} className="home-grid">
          {/* Left: Category sections */}
          <div>
            {CATEGORY_LIST.map((cat) => {
              const catPosts = postsByCategory[cat];
              if (!catPosts?.length) return null;
              return (
                <CategorySection
                  key={cat}
                  title={cat}
                  posts={catPosts}
                  color={CATEGORY_COLORS[cat]}
                />
              );
            })}

            {/* "All Posts" catch-all if no categories have posts */}
            {CATEGORY_LIST.every((cat) => !postsByCategory[cat]?.length) && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
                {posts.map((p) => <NewsCard key={p._id} post={p} />)}
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div style={{ position: "sticky", top: "120px" }}>
            <Sidebar posts={posts} />
          </div>
        </div>
      </div>

      {/* Responsive override for mobile */}
      <style>{`
        @media (max-width: 900px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .category-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Home;
