import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import packages from '../data/packages';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" }
  })
};

export default function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <SectionHeader
        title="Our Packages"
        subtitle="Flexible photo and video packages designed for weddings, corporate events, birthdays, and anniversaries."
      />
      <div className="pricing-grid">
        {packages.map((pkg, i) => (
          <motion.div
            className={`pricing-card${pkg.featured ? ' featured' : ''}`}
            key={pkg.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -8,
              rotateX: 2,
              rotateY: -1,
              transition: { duration: 0.3 }
            }}
            style={{ transformPerspective: 1000 }}
          >
            <div className="pricing-header">
              <h3>{pkg.name}</h3>
              <div className="pricing-rule"></div>
              <div className="price">{pkg.price}</div>
            </div>
            <ul className="pricing-features">
              {pkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              className="btn-pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Inquire
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
