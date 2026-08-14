import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

const sections = ['home', 'services', 'gallery', 'pricing', 'contact'];

function NavLinks({ activeSection }) {
  return (
    <>
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={activeSection === id ? 'active' : ''}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </a>
      ))}
    </>
  );
}

export default function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setPastHero(window.scrollY > heroBottom);
      }

      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar${pastHero ? ' past-hero' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-top">
        <a href="#home" className="nav-logo">
          <img src="/logo.png" alt="Aslam Digital Studio" className="nav-logo-img" />
          {pastHero && (
            <>
              <span className="logo-script">Aslam Digital Studio</span>
              <span className="logo-sub">Photography & Videography</span>
            </>
          )}
        </a>
        <div className="nav-center">
          <AnimatePresence>
            {!pastHero && (
              <motion.div
                className="nav-links-hero"
                key="links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NavLinks activeSection={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="nav-actions">
          {pastHero && (
            <>
              <div className="nav-social">
                <a href="https://www.instagram.com/aslam_digital_studio?igsh=bHV2Y25kZTV2OGZ6&igsi=bHV2Y25kZTV2OGZ6" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1.5"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100063980112449#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@Sunny3167" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                </a>
              </div>
              <div className="nav-actions-divider" />
            </>
          )}
          <a href="#contact" className="btn-nav">Book Now</a>
          <a href="#contact" className="btn-nav btn-nav-filled">Get a Quote</a>
          <button className="btn-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="nav-links">
        <NavLinks activeSection={activeSection} />
      </div>
    </motion.nav>
  );
}
