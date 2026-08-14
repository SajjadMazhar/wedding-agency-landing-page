import { useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';
import packages from '../data/packages';

export default function Pricing() {
  const gridRef = useRef(null);

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

    const cards = gridRef.current?.querySelectorAll('.pricing-card');
    cards?.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.15}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="pricing">
      <SectionHeader
        title="Our Packages"
        subtitle="Flexible photo and video packages designed for weddings, corporate events, birthdays, and anniversaries."
      />
      <div className="pricing-grid" ref={gridRef}>
        {packages.map((pkg) => (
          <div className={`pricing-card${pkg.featured ? ' featured' : ''}`} key={pkg.name}>
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
            <a href="#contact" className="btn-pricing">Inquire</a>
          </div>
        ))}
      </div>
    </section>
  );
}
