import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-curve"></div>
      <div className="footer-inner">
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand column */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img src="/logo.png" alt="Aslam Digital Studio" className="footer-logo-img" />
              <span className="logo-script">Aslam Digital Studio</span>
              <span className="footer-logo-sub">Photography & Videography</span>
            </a>
            <p className="footer-tagline">Capturing emotions and crafting timeless memories through the art of photography and cinematic videography.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/aslam_digital_studio?igsh=bHV2Y25kZTV2OGZ6&igsi=bHV2Y25kZTV2OGZ6" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100063980112449#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@Sunny3167" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#gallery">Gallery</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          {/* Services column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <nav className="footer-nav">
              <a href="#services">Wedding Photography</a>
              <a href="#services">Wedding Videography</a>
              <a href="#services">Corporate Events</a>
              <a href="#services">Birthdays & Anniversaries</a>
            </nav>
          </div>

          {/* Contact column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Reach Us</h4>
            <div className="footer-contact-list">
              <a href="tel:+919007523569" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>+91 90075 23569</span>
              </a>
              <a href="tel:+919681385243" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span>+91 96813 85243</span>
              </a>
              <a href="https://wa.me/919007523569" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-ornament">
            <svg width="120" height="16" viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3">
              <path d="M0 8h48M72 8h48" />
              <circle cx="60" cy="8" r="4" />
              <circle cx="60" cy="8" r="1.5" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>
          <p className="footer-copy">&copy; 2026 Aslam Digital Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
