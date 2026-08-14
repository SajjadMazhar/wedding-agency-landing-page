import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import slides from '../data/heroSlides';

const HeroParticles = lazy(() => import('./HeroParticles'));

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.1,
    y: 60,
  },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -60,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

function MandalaOrnament({ flip }) {
  return (
    <svg width="160" height="50" viewBox="0 0 160 50" fill="none" stroke="#D4A843" strokeWidth="0.8"
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <path d="M80 42 C70 35, 55 30, 40 33 C30 35, 25 30, 18 25" strokeLinecap="round"/>
      <path d="M80 42 C90 35, 105 30, 120 33 C130 35, 135 30, 142 25" strokeLinecap="round"/>
      <path d="M80 42 C75 34, 68 24, 62 16" strokeLinecap="round"/>
      <path d="M80 42 C85 34, 92 24, 98 16" strokeLinecap="round"/>
      <path d="M80 42 C80 35, 80 27, 80 18" strokeLinecap="round"/>
      <path d="M40 33 C37 28, 40 23, 45 25 C42 27, 40 30, 40 33" fill="#D4A843" fillOpacity="0.3" stroke="none"/>
      <path d="M120 33 C123 28, 120 23, 115 25 C118 27, 120 30, 120 33" fill="#D4A843" fillOpacity="0.3" stroke="none"/>
      <circle cx="18" cy="25" r="2.5" fill="#D4A843" stroke="none"/>
      <circle cx="142" cy="25" r="2.5" fill="#D4A843" stroke="none"/>
      <circle cx="62" cy="16" r="2" fill="#D4A843" stroke="none"/>
      <circle cx="98" cy="16" r="2" fill="#D4A843" stroke="none"/>
      <circle cx="80" cy="18" r="1.8" fill="#D4A843" stroke="none"/>
      <circle cx="50" cy="30" r="1" fill="#D4A843" stroke="none" opacity="0.6"/>
      <circle cx="110" cy="30" r="1" fill="#D4A843" stroke="none" opacity="0.6"/>
      <circle cx="70" cy="24" r="0.8" fill="#D4A843" stroke="none" opacity="0.5"/>
      <circle cx="90" cy="24" r="0.8" fill="#D4A843" stroke="none" opacity="0.5"/>
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[currentIndex];

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Two-image collage with transitions */}
      <div className="hero-collage-duo">
        <AnimatePresence mode="popLayout">
          <motion.div
            className="collage-duo-left"
            key={`left-${currentIndex}`}

            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <img src={current.images[0].src} alt={current.images[0].alt} />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          <motion.div
            className="collage-duo-right"
            key={`right-${currentIndex}`}

            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ delay: 0.15 }}
          >
            <img src={current.images[1].src} alt={current.images[1].alt} />
          </motion.div>
        </AnimatePresence>
      </div>

      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      <motion.div className="hero-overlay" style={{ y: overlayY, scale: overlayScale }}>
        <motion.div
          className="hero-frame"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        >
          <div className="hero-frame-content">
            <motion.div
              className="botanical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <MandalaOrnament />
            </motion.div>

            <motion.h1
              className="hero-studio-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 80 }}
            >
              Aslam Digital Studio
            </motion.h1>

            <motion.p
              className="hero-tagline-static"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Photography & Videography
            </motion.p>

            <motion.div
              className="hero-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
            />

            <div className="hero-tagline">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  className="hero-rotating-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                >
                  {current.tagline}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              className="botanical botanical-bottom"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <MandalaOrnament flip />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
