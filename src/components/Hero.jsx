import { useEffect, useRef, useState } from 'react';

const collageImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=1200&fit=crop",
    alt: "Bride and groom walking together",
    className: "collage-main",
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=800&fit=crop",
    alt: "Wedding rings close-up",
    className: "collage-top-left",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&h=500&fit=crop",
    alt: "Couple at sunset",
    className: "collage-top-right",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop",
    alt: "Bride portrait with bouquet",
    className: "collage-bottom-left",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&h=500&fit=crop",
    alt: "Wedding ceremony",
    className: "collage-bottom-right",
  },
];

const taglines = [
  "We Capture Emotions & Memories",
  "Where Moments Become Timeless",
  "Your Story, Beautifully Told",
  "Frames That Feel Forever",
  "Every Emotion, Perfectly Preserved",
  "We Turn Moments Into Art",
  "Love, Light & Legacy",
  "Stories Written in Light",
];

export default function Hero() {
  const heroRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setFading(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const images = hero.querySelectorAll('.collage-img');
      images.forEach((img, i) => {
        const speed = 0.02 + i * 0.015;
        img.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-collage">
        {collageImages.map((img, i) => (
          <div
            className={`collage-img ${img.className}`}
            key={i}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      <div className="hero-overlay">
        <div className="hero-frame">
        <div className="hero-frame-content">
          <div className="botanical">
            <svg width="140" height="45" viewBox="0 0 140 45" fill="none" stroke="#CFAF6F" strokeWidth="0.7">
              <path d="M70 40 C63 34, 50 28, 38 31 C26 34, 20 27, 12 22"/>
              <path d="M70 40 C77 34, 90 28, 102 31 C114 34, 120 27, 128 22"/>
              <path d="M70 40 C67 32, 58 22, 52 15"/>
              <path d="M70 40 C73 32, 82 22, 88 15"/>
              <path d="M70 40 C70 34, 70 26, 70 18"/>
              <circle cx="38" cy="31" r="1.5" fill="#CFAF6F" stroke="none"/>
              <circle cx="102" cy="31" r="1.5" fill="#CFAF6F" stroke="none"/>
              <circle cx="52" cy="15" r="1.2" fill="#CFAF6F" stroke="none"/>
              <circle cx="88" cy="15" r="1.2" fill="#CFAF6F" stroke="none"/>
              <circle cx="70" cy="18" r="1" fill="#CFAF6F" stroke="none"/>
            </svg>
          </div>

          <h1 className="hero-studio-name">Aslam Digital Studio</h1>
          <p className="hero-tagline-static">Photography & Videography</p>

          <div className="hero-divider"></div>

          <div className={`hero-tagline ${fading ? 'fading' : ''}`}>
            <p className="hero-rotating-text">{taglines[currentIndex]}</p>
          </div>

          <div className="botanical botanical-bottom">
            <svg width="140" height="45" viewBox="0 0 140 45" fill="none" stroke="#CFAF6F" strokeWidth="0.7">
              <path d="M70 5 C63 11, 50 17, 38 14 C26 11, 20 18, 12 23"/>
              <path d="M70 5 C77 11, 90 17, 102 14 C114 11, 120 18, 128 23"/>
              <path d="M70 5 C67 13, 58 23, 52 30"/>
              <path d="M70 5 C73 13, 82 23, 88 30"/>
              <path d="M70 5 C70 11, 70 19, 70 27"/>
              <circle cx="38" cy="14" r="1.5" fill="#CFAF6F" stroke="none"/>
              <circle cx="102" cy="14" r="1.5" fill="#CFAF6F" stroke="none"/>
              <circle cx="52" cy="30" r="1.2" fill="#CFAF6F" stroke="none"/>
              <circle cx="88" cy="30" r="1.2" fill="#CFAF6F" stroke="none"/>
            </svg>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
