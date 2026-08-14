import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="ornament">
        <svg width="70" height="28" viewBox="0 0 70 28" fill="none" stroke="#D4A843" strokeWidth="0.8">
          {/* Mandala arc motif */}
          <path d="M35 24 C28 18, 18 15, 8 17" strokeLinecap="round"/>
          <path d="M35 24 C42 18, 52 15, 62 17" strokeLinecap="round"/>
          <path d="M35 24 C32 18, 28 12, 25 6" strokeLinecap="round"/>
          <path d="M35 24 C38 18, 42 12, 45 6" strokeLinecap="round"/>
          <path d="M35 24 L35 8" strokeLinecap="round"/>
          {/* Paisley dots */}
          <circle cx="8" cy="17" r="2" fill="#D4A843" stroke="none"/>
          <circle cx="62" cy="17" r="2" fill="#D4A843" stroke="none"/>
          <circle cx="25" cy="6" r="1.5" fill="#D4A843" stroke="none"/>
          <circle cx="45" cy="6" r="1.5" fill="#D4A843" stroke="none"/>
          <circle cx="35" cy="8" r="1.2" fill="#D4A843" stroke="none"/>
        </svg>
      </div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="section-rule"></div>
      <p className="section-subtitle">{subtitle}</p>
    </motion.div>
  );
}
