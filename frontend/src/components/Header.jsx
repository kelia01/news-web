import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogOut, PenTool, User as UserIcon, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const categories = [
  { name: "Ubuzima", path: "/category/Ubuzima" },
  { name: "Imikino", path: "/category/Imikino" },
  { name: "Politike", path: "/category/Politike" },
  { name: "Ubucuruzi", path: "/category/Ubucuruzi" },
  { name: "Ubuhanzi", path: "/category/Ubuhanzi" },
  { name: "Science", path: "/category/Science" },
  { name: "Isi yose", path: "/category/Isi yose" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top bar: date + auth links */}
      <div style={{ backgroundColor: '#0a192f', color: '#f1f5f9' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94a3b8' }}>
            {dateStr}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.7rem' }}>
            {user ? (
              <>
                <Link to="/write" style={{ color: '#93c5fd', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#60a5fa')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#93c5fd')}
                >
                  <PenTool size={11} /> Tangaza Inkuru
                </Link>
                <span style={{ color: '#334155' }}>|</span>
                <span style={{ color: '#cbd5e1' }}>{user.name}</span>
                <button onClick={logout} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#f87171')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#fca5a5')}
                >
                  <LogOut size={11} /> Sohoka
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: '#ffffff', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#93c5fd')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Injira
                </Link>
                <span style={{ color: '#334155' }}>|</span>
                <Link to="/register" style={{ color: '#93c5fd', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#60a5fa')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#93c5fd')}
                >
                  Iyandikishe
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Logo + Search Row */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#0f172a', padding: '4px' }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.02em' }}>
            BAGI <span style={{ color: '#2563eb' }}>NEWS</span>
          </div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#64748b', textTransform: 'uppercase', marginTop: '2px' }}>
            Ukuri gusa · Amakuru y'Impamo
          </div>
        </Link>

        {/* Search + Write CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: '6px' }}
          >
            <Search size={18} />
          </button>
          {user ? (
            <Link to="/write" style={{
              backgroundColor: '#2563eb', color: '#fff', padding: '7px 16px',
              fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'background-color 0.2s',
            }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              <PenTool size={13} /> Tangaza
            </Link>
          ) : (
            <Link to="/register" style={{
              backgroundColor: '#2563eb', color: '#fff', padding: '7px 16px',
              fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'background-color 0.2s',
            }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              Subscribe
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Shakisha inkuru..."
              autoFocus
              style={{
                width: '100%', padding: '10px 16px',
                border: '1px solid #cbd5e1', backgroundColor: '#f8fafc',
                fontSize: '0.9rem', color: '#0f172a', outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>
        </div>
      )}

      {/* Desktop Category Nav */}
      <nav style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #2563eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', margin: 0, padding: 0, listStyle: 'none' }}>
            <li>
              <NavLink
                to="/"
                end
                style={({ isActive }) => ({
                  display: 'block', padding: '11px 18px',
                  fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                  color: isActive ? '#2563eb' : '#475569',
                  borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                  marginBottom: '-2px', transition: 'color 0.2s',
                })}
              >
                Ahabanza
              </NavLink>
            </li>
            {categories.map((cat) => (
              <li key={cat.name}>
                <NavLink
                  to={cat.path}
                  style={({ isActive }) => ({
                    display: 'block', padding: '11px 18px',
                    fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                    textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                    color: isActive ? '#2563eb' : '#475569',
                    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                    marginBottom: '-2px', transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '8px 0' }}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', padding: '10px 24px', fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>
            Ahabanza
          </NavLink>
          {categories.map((cat) => (
            <NavLink key={cat.name} to={cat.path} onClick={() => setIsMenuOpen(false)}
              style={{ display: 'block', padding: '10px 24px', fontSize: '0.85rem', color: '#475569', textDecoration: 'none', borderTop: '1px solid #f8fafc' }}>
              {cat.name}
            </NavLink>
          ))}
          {user ? (
            <div style={{ padding: '12px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/write" onClick={() => setIsMenuOpen(false)} style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center' }}>
                Tangaza Inkuru
              </Link>
              <button onClick={() => { logout(); setIsMenuOpen(false); }} style={{ border: '1px solid #cbd5e1', background: 'none', padding: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#64748b' }}>
                Sohoka
              </button>
            </div>
          ) : (
            <div style={{ padding: '12px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ border: '1px solid #2563eb', color: '#2563eb', padding: '8px 16px', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center' }}>
                Injira
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center' }}>
                Iyandikishe
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          nav { display: none; }
        }
      `}</style>
    </header>
  );
}

export default Header;