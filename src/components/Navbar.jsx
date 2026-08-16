import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

const sections = ['home', 'services', 'gallery', 'pricing', 'contact'];

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
      <div className="nav-inner">
        {/* Logo */}
        <a href="#home" className="nav-logo">
          <img src="/logo.png" alt="Aslam Digital Studio" className="nav-logo-img" />
          <AnimatePresence>
            {pastHero && (
              <motion.div
                className="nav-logo-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="logo-script">Aslam Digital Studio</span>
              </motion.div>
            )}
          </AnimatePresence>
        </a>

        {/* Center links */}
        <div className="nav-links">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${activeSection === id ? ' active' : ''}`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          <a href="#contact" className="nav-cta">
            <span>Book Now</span>
          </a>
          <button className="nav-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
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
    </motion.nav>
  );
}
