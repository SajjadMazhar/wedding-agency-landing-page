import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <AnimatePresence>
          {pastHero && (
            <motion.div
              className="nav-logo"
              style={{ opacity: 1, transform: 'none', pointerEvents: 'auto' }}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="logo-script">Aslam Digital Studio</span>
              <span className="logo-sub">Photography & Videography</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="nav-social"
          animate={
            isMobile
              ? { x: 0, position: 'relative', left: 0 }
              : pastHero
                ? { x: 'calc(50vw - 70px)', position: 'absolute', left: 0 }
                : { x: 0, position: 'relative', left: 0 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
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
        </motion.div>
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
          <a href="#contact" className="btn-nav">Book Now</a>
          <a href="#contact" className="btn-nav btn-nav-filled">Get a Quote</a>
        </div>
      </div>
      <div className="nav-links">
        <NavLinks activeSection={activeSection} />
      </div>
    </motion.nav>
  );
}
