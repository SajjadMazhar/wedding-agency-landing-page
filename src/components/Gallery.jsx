import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import GalleryParticles from './GalleryParticles';
import galleryImages from '../data/galleryImages';

function MarqueeRow({ images, direction = 'left', speed = 30 }) {
  const doubled = useMemo(() => [...images, ...images], [images]);
  const duration = images.length * speed;

  return (
    <div className="marquee-row">
      <motion.div
        className="marquee-track"
        animate={{ x: direction === 'left' ? [0, -50 + '%'] : [-50 + '%', 0] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((img, i) => (
          <div className="marquee-item" key={`${img.src}-${i}`}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const row1 = useMemo(() => galleryImages.filter((_, i) => i % 2 === 0), []);
  const row2 = useMemo(() => galleryImages.filter((_, i) => i % 2 === 1), []);

  const featured = useMemo(() => {
    const tall = galleryImages.filter(img => img.size === 'tall');
    return tall.length > 3 ? tall.slice(0, 5) : galleryImages.slice(0, 5);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featured.length]);

  useEffect(() => {
    if (modalOpen || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen, lightboxIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  return (
    <section id="gallery" className="gallery">
      <GalleryParticles />
      <SectionHeader
        title="Our Work"
        subtitle="A collection of weddings, celebrations, and events we've had the privilege to capture on camera."
      />

      {/* Marquee strips */}
      <div className="gallery-marquee">
        <MarqueeRow images={row1} direction="left" speed={3} />
        <MarqueeRow images={row2} direction="right" speed={3.5} />
      </div>

      {/* Featured showcase */}
      <div className="gallery-showcase">
        <div className="showcase-main">
          <AnimatePresence mode="wait">
            <motion.div
              className="showcase-main-image"
              key={featuredIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              onClick={() => openLightbox(galleryImages.indexOf(featured[featuredIndex]))}
            >
              <img src={featured[featuredIndex].fullSrc || featured[featuredIndex].src} alt={featured[featuredIndex].alt} />
              <div className="showcase-main-overlay">
                <span className="showcase-main-caption">{featured[featuredIndex].alt}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="showcase-indicators">
            {featured.map((_, i) => (
              <button
                key={i}
                className={`showcase-dot${i === featuredIndex ? ' active' : ''}`}
                onClick={() => setFeaturedIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="showcase-side">
          {galleryImages.slice(10, 14).map((img, i) => (
            <motion.div
              className="showcase-side-item"
              key={img.src}
              whileHover={{ scale: 1.04 }}
              onClick={() => openLightbox(galleryImages.indexOf(img))}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="showcase-side-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View all button */}
      <div className="gallery-more">
        <motion.button
          className="btn-show-more"
          onClick={() => setModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View All Photos ({galleryImages.length})
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="gallery-modal"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="gallery-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="modal-header">
                <motion.div
                  className="modal-header-inner"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="modal-ornament">
                    <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
                      <path d="M0 10h45M75 10h45" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
                      <path d="M52 10l8-8 8 8-8 8z" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                      <circle cx="60" cy="10" r="2" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </div>
                  <h3 className="modal-title">Our Complete Collection</h3>
                  <p className="modal-subtitle">{galleryImages.length} moments captured with love</p>
                </motion.div>
                <motion.button
                  className="modal-close"
                  onClick={() => setModalOpen(false)}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </motion.button>
              </div>

              <div className="modal-grid">
                {galleryImages.map((img, i) => (
                  <motion.div
                    className={`modal-grid-item${img.size === 'tall' ? ' modal-tall' : ''}${img.size === 'wide' ? ' modal-wide' : ''}`}
                    key={`modal-${i}`}
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.03, zIndex: 5 }}
                    onClick={() => { setModalOpen(false); openLightbox(i); }}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <motion.div
                      className="modal-item-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="modal-item-alt">{img.alt}</span>
                      <span className="modal-item-view">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.35-4.35"/>
                          <path d="M11 8v6M8 11h6"/>
                        </svg>
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox"
            onClick={() => setLightboxIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length); }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <motion.div
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={galleryImages[lightboxIndex].fullSrc || galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} />
            </motion.div>
            <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            <div className="lightbox-counter">{lightboxIndex + 1} / {galleryImages.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
