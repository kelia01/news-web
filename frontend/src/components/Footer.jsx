import { Link } from "react-router-dom";

const footerLinks = {
  company: [
    { name: "Ahabanza", href: "/" },
    { name: "Tumenye", href: "#" },
    { name: "Tuvugishe", href: "#" },
    { name: "Akazi", href: "#" },
    { name: "Amakuru", href: "#" },
  ],
  news: [
    { name: "Ubuzima", href: "/category/Ubuzima" },
    { name: "Imikino", href: "/category/Imikino" },
    { name: "Politike", href: "/category/Politike" },
    { name: "Ubucuruzi", href: "/category/Ubucuruzi" },
    { name: "Ubuhanzi", href: "/category/Ubuhanzi" },
    { name: "Science", href: "/category/Science" },
    { name: "Isi yose", href: "/category/Isi yose" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: "f" },
    { name: "Instagram", href: "#", icon: "ig" },
    { name: "Twitter / X", href: "#", icon: "x" },
    { name: "YouTube", href: "#", icon: "yt" },
  ],
};

function Footer() {
  return (
    <footer>
      {/* Newsletter */}
      <div style={{
        backgroundColor: '#0a192f',
        backgroundImage: 'url("https://images.pexels.com/photos/3894378/pexels-photo-3894378.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 25, 47, 0.9)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            Akira Amakuru Mashya<br />Buri Munsi
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '32px', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1rem', lineHeight: 1.7 }}>
            Iyandikishe wakire amakuru y'ingenzi, inkuru zibibera hirya no hino ndetse no ku isi hose.
          </p>
          <form style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto' }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email@example.com"
              style={{
                flex: 1, padding: '14px 18px', border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff',
                fontSize: '0.9rem', outline: 'none', backdropFilter: 'blur(4px)',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button type="submit" style={{
              backgroundColor: '#2563eb', color: '#fff', padding: '14px 24px',
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links section */}
      <div style={{ backgroundColor: '#030712', color: '#94a3b8' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {/* Brand column */}
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '12px', lineHeight: 1 }}>
                BAGI <span style={{ color: '#2563eb' }}>NEWS</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '220px', fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Amakuru y'impamo ava ku banyamakuru b'ikirenga.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {footerLinks.social.map((s) => (
                  <a key={s.name} href={s.href} style={{
                    width: '32px', height: '32px', borderRadius: '2px',
                    border: '1px solid #1e293b', color: '#cbd5e1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', fontSize: '0.65rem', fontWeight: 700,
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.color = '#2563eb'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.color = '#cbd5e1'; }}
                  >
                    {s.icon.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Company links */}
            <div>
              <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginBottom: '20px' }}>
                Sosiyete
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} style={{
                      color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem',
                      fontFamily: "'Source Serif 4', Georgia, serif", transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* News categories */}
            <div>
              <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#64748b', fontFamily: 'Inter, sans-serif', fontWeight: 700, marginBottom: '20px' }}>
                Amakuru
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {footerLinks.news.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} style={{
                      color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem',
                      fontFamily: "'Source Serif 4', Georgia, serif", transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1e293b', padding: '20px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'Inter, sans-serif', margin: 0 }}>
              © {new Date().getFullYear()} Bagi News. Uburenganzira bwose bwarinzwe.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Amategeko', 'Ubutumire', 'Ibanga'].map((t) => (
                <a key={t} href="#" style={{ fontSize: '0.72rem', color: '#64748b', textDecoration: 'none', letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;