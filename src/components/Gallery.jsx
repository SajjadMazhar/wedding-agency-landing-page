import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import galleryImages from '../data/galleryImages';

const VISIBLE_LIMIT = 10;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" }
  })
};

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleImages = galleryImages.slice(0, VISIBLE_LIMIT);
  const hasMore = galleryImages.length > VISIBLE_LIMIT;

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
      <SectionHeader
        title="Our Work"
        subtitle="A collection of weddings, celebrations, and events we've had the privilege to capture on camera."
      />
      <div className="gallery-grid">
        {visibleImages.map((img, i) => (
          <motion.div
            className={`gallery-item${img.size === 'tall' ? ' tall' : ''}${img.size === 'wide' ? ' wide' : ''}`}
            key={img.id}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.03, zIndex: 2 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </motion.div>
        ))}
      </div>

      {hasMore && (
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
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="gallery-modal"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="gallery-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            >
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <h3 className="modal-title">All Photos</h3>
              <div className="modal-grid">
                {galleryImages.map((img, i) => (
                  <motion.div
                    className="modal-grid-item"
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => { setModalOpen(false); openLightbox(i); }}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
