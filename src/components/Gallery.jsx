import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader';
import galleryImages from '../data/galleryImages';

const VISIBLE_LIMIT = 10;

export default function Gallery() {
  const gridRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleImages = galleryImages.slice(0, VISIBLE_LIMIT);
  const hasMore = galleryImages.length > VISIBLE_LIMIT;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const items = gridRef.current?.querySelectorAll('.gallery-item');
    items?.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

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
      <div className="gallery-grid" ref={gridRef}>
        {visibleImages.map((img, i) => (
          <div
            className={`gallery-item${img.size === 'tall' ? ' tall' : ''}${img.size === 'wide' ? ' wide' : ''}`}
            key={img.id}
            onClick={() => openLightbox(i)}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="gallery-more">
          <button className="btn-show-more" onClick={() => setModalOpen(true)}>
            View All Photos ({galleryImages.length})
          </button>
        </div>
      )}

      {/* Modal - All Photos */}
      {modalOpen && (
        <div className="gallery-modal" onClick={() => setModalOpen(false)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <h3 className="modal-title">All Photos</h3>
            <div className="modal-grid">
              {galleryImages.map((img, i) => (
                <div className="modal-grid-item" key={img.id} onClick={() => { setModalOpen(false); openLightbox(i); }}>
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox - Full size */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
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
          <div className="lightbox-image" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} />
          </div>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <div className="lightbox-counter">{lightboxIndex + 1} / {galleryImages.length}</div>
        </div>
      )}
    </section>
  );
}
