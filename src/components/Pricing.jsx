import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

// import packages from '../data/packages';
//
// const checkIcon = (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );
//
// const cardVariants = {
//   hidden: { opacity: 0, y: 60, scale: 0.95 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
//   })
// };
//
// const featureVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: (i) => ({
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.3, delay: 0.4 + i * 0.05 }
//   })
// };

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <SectionHeader
        title="Our Packages"
        subtitle="Flexible photo and video packages designed for weddings, corporate events, birthdays, and anniversaries."
      />

      <motion.div
        className="pricing-message"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="pricing-message-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 6L2 7" />
          </svg>
        </div>
        <h3 className="pricing-message-title">Custom Packages Tailored to Your Event</h3>
        <p className="pricing-message-text">
          Every celebration is unique, and so is our pricing. We offer customised packages based on your specific requirements — event duration, coverage style, team size, and deliverables. Reach out to us with your event details and we'll craft a personalised quote within 24 hours.
        </p>
        <motion.a
          href="#contact"
          className="pricing-message-cta"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Request a Quote</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Package cards — commented out per client request
      <div className="pkg-grid">
        {packages.map((pkg, i) => (
          <motion.div
            className={`pkg-card${pkg.featured ? ' pkg-card--featured' : ''}`}
            key={pkg.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -10,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
          >
            {pkg.featured && (
              <div className="pkg-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Most Popular</span>
              </div>
            )}

            <div className="pkg-header">
              <span className="pkg-name">{pkg.name}</span>
              <div className="pkg-price">
                <span className="pkg-price-value">{pkg.price}</span>
                <span className="pkg-price-note">starting from</span>
              </div>
            </div>

            <div className="pkg-divider" />

            <ul className="pkg-features">
              {pkg.features.map((feature, fi) => (
                <motion.li
                  key={feature}
                  custom={fi}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className="pkg-check">{checkIcon}</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              className={`pkg-cta${pkg.featured ? ' pkg-cta--filled' : ''}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Get Started</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        ))}
      </div>
      */}
    </section>
  );
}
