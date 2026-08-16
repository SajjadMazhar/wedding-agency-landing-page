import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeader from './SectionHeader';

const services = [
  {
    label: "Wedding Photography",
    image: "/gallery/amish-thakkar-BEdxXAiRfRM-unsplash.jpg",
    description: "We blend documentary storytelling with fine-art direction to create images that feel as emotional ten years from now as they do today.",
    highlights: ["Candid & Posed", "Bridal Portraits", "HD Gallery", "Same-day Peeks"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M7 6V4a1 1 0 011-1h8a1 1 0 011 1v2" />
        <circle cx="17" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Wedding Videography",
    image: "/gallery/hero/alok-verma-80l2FftMuBI-unsplash.jpg",
    description: "Our cinematic wedding films combine aerial drone footage, gimbal work, and intimate audio to produce films you'll watch on every anniversary.",
    highlights: ["Cinematic Reel", "Full Ceremony", "Drone Footage", "Pro Audio"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="4" width="16" height="16" rx="2" />
        <path d="M22 7l-4 3v4l4 3V7z" />
        <circle cx="10" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: "Corporate Events",
    image: "/gallery/stem-list-EVgsAbL51Rk-unsplash.jpg",
    description: "From product launches to annual galas, we deliver polished coverage that elevates your brand with fast turnaround while the buzz is alive.",
    highlights: ["Event Coverage", "Speaker Shots", "Brand Assets", "Fast Delivery"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
        <path d="M3 21h18" />
        <path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1" />
      </svg>
    ),
  },
  {
    label: "Birthdays & Anniversaries",
    image: "/gallery/morgan-lane-18N4okmWccM-unsplash.jpg",
    description: "Whether it's a first birthday or a golden anniversary, we bring the same cinematic quality to every personal celebration.",
    highlights: ["Family Portraits", "Highlight Video", "Detail Shots", "Photo Albums"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" />
        <path d="M12 6v6l4 2" />
        <path d="M8 21.2a10 10 0 008 0" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`svc-card ${isEven ? '' : 'svc-card--flip'}`}
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="svc-card__image-wrap">
        <motion.div className="svc-card__image-inner" style={{ y: imgY, scale: imgScale }}>
          <img src={service.image} alt={service.label} loading="lazy" />
        </motion.div>
        <div className="svc-card__image-overlay" />
        <span className="svc-card__number">0{index + 1}</span>
      </div>

      <motion.div
        className="svc-card__content"
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <div className="svc-card__icon">{service.icon}</div>
        <h3 className="svc-card__title">{service.label}</h3>
        <div className="svc-card__divider" />
        <p className="svc-card__desc">{service.description}</p>

        <div className="svc-card__highlights">
          {service.highlights.map((item, i) => (
            <motion.span
              className="svc-card__tag"
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="svc-card__cta"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Book Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="services">
      <SectionHeader
        title="Photography &amp; Videography<br/>For Every Occasion"
        subtitle="From intimate ceremonies to grand celebrations — we craft timeless visuals that let you relive every emotion."
      />
      <div className="svc-grid">
        {services.map((service, i) => (
          <ServiceCard key={service.label} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
