import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const services = [
  {
    label: "Wedding Photography",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=700&fit=crop",
    description: "Your wedding day deserves more than snapshots. We blend documentary storytelling with fine-art direction to create images that feel as emotional ten years from now as they do today — every glance, every tear, every stolen moment preserved in its purest form.",
    highlights: ["Candid & posed coverage", "Bridal portraits & couple sessions", "Edited high-resolution gallery", "Same-day sneak peeks"],
  },
  {
    label: "Wedding Videography",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&h=700&fit=crop",
    description: "A photograph captures a moment — a film brings it back to life. Our cinematic wedding films combine aerial drone footage, gimbal work, and intimate audio to produce highlight reels and full-length documentaries you'll watch on every anniversary.",
    highlights: ["Cinematic highlight reel", "Full ceremony & reception film", "Drone aerial footage", "Professional audio capture"],
  },
  {
    label: "Corporate Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=700&fit=crop",
    description: "From product launches and conferences to annual galas, we deliver polished photo and video coverage that elevates your brand. Fast turnaround means your marketing team has content ready while the buzz is still alive.",
    highlights: ["Event photography & videography", "Speaker & panel coverage", "Brand-ready edited assets", "24-48 hour turnaround available"],
  },
  {
    label: "Birthdays & Anniversaries",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=700&fit=crop",
    description: "Milestone celebrations happen once — let us make sure yours lives forever. Whether it's a first birthday, a sweet sixteen, or a golden anniversary, we bring the same cinematic quality to every personal celebration.",
    highlights: ["Candid & family portraits", "Party highlight video", "Decor & detail shots", "Custom photo album design"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" }
  })
};

export default function Services() {
  return (
    <section id="services" className="services">
      <SectionHeader
        title="Photography &amp; Videography<br/>For Every Occasion"
        subtitle="From intimate ceremonies to grand celebrations — we craft timeless visuals that let you relive every emotion."
      />
      <div className="services-list">
        {services.map((service, i) => (
          <motion.div
            className={`service-card ${i % 2 !== 0 ? 'reverse' : ''}`}
            key={service.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div
              className="service-image"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img src={service.image} alt={service.label} />
            </motion.div>
            <div className="service-content">
              <h3 className="service-title">{service.label}</h3>
              <div className="service-rule"></div>
              <p className="service-description">{service.description}</p>
              <ul className="service-highlights">
                {service.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                className="service-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Book This Service
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
