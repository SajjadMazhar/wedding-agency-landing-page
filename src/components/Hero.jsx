import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import slides from '../data/heroSlides';

const HeroParticles = lazy(() => import('./HeroParticles'));

const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const kenBurnsConfigs = [
  { origin: 'center center', scale: 1.08, x: 0, y: 0 },
  { origin: 'top left', scale: 1.12, x: 10, y: 8 },
  { origin: 'bottom right', scale: 1.08, x: -8, y: -6 },
  { origin: 'top right', scale: 1.09, x: -10, y: 5 },
  { origin: 'bottom left', scale: 1.07, x: 8, y: -5 },
  { origin: 'center top', scale: 1.06, x: 0, y: 8 },
  { origin: 'center bottom', scale: 1.07, x: 0, y: -8 },
  { origin: 'left center', scale: 1.1, x: 12, y: 0 },
  { origin: 'right center', scale: 1.08, x: -12, y: 0 },
  { origin: 'center center', scale: 1.06, x: 0, y: 0 },
];

const wordRevealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
};

const wordRevealChild = {
  hidden: { opacity: 0, y: 50, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const heroRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[currentIndex];
  const kb = kenBurnsConfigs[currentIndex % kenBurnsConfigs.length];

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Full-screen dual background */}
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            className="hero-bg-slide"
            key={`bg-${currentIndex}`}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.img
              src={current.images[0].src}
              alt={current.images[0].alt}
              initial={{ scale: 1, x: 0, y: 0 }}
              animate={{ scale: kb.scale, x: kb.x, y: kb.y }}
              transition={{ duration: 5, ease: 'linear' }}
              style={{ transformOrigin: kb.origin }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlay */}
      <div className="hero-gradient" />

      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Content — bottom-anchored editorial */}
      <motion.div className="hero-content" style={{ y: contentY }}>
        <motion.div
          className="hero-ornament"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg width="120" height="16" viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth="0.6">
            <path d="M0 8h42M78 8h42" strokeLinecap="round" opacity="0.5" />
            <path d="M50 8l6-5 6 5-6 5z" opacity="0.6" />
            <circle cx="60" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.h1
          className="hero-studio-name"
          variants={wordRevealContainer}
          initial="hidden"
          animate="visible"
          aria-label="Aslam Digital Studio"
        >
          {"Aslam Digital Studio".split(" ").map((word, i) => (
            <motion.span key={i} variants={wordRevealChild} style={{ display: 'inline-block', marginRight: '0.25em' }}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          Photography & Videography
        </motion.p>

        <motion.div
          className="hero-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />

        <div className="hero-tagline">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              className="hero-rotating-text"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              {current.tagline}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="hero-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        style={{ opacity: scrollOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <motion.div
          className="hero-scroll-line"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
