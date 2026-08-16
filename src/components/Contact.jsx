import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader';
import ContactParticles from './ContactParticles';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const btnLabel = {
    idle:    'Send Inquiry',
    sending: 'Sending…',
    success: 'Message Sent!',
    error:   'Failed — Try Again',
  }[status];

  return (
    <section id="contact" className="contact">
      <ContactParticles />
      <div className="contact-inner">
        <SectionHeader
          title="Let's Tell Your Story"
          subtitle="Ready to book Aslam Digital Studio for your next event? Share your details and we'll get back to you within 24 hours."
        />

        <div className="contact-layout">
          {/* Left: Contact info panel */}
          <motion.div
            className="contact-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="contact-panel-inner">
              <h3 className="contact-panel-title">Get In Touch</h3>
              <p className="contact-panel-desc">
                We'd love to hear about your upcoming event. Reach out through any channel below.
              </p>

              <div className="contact-channels">
                <a href="tel:+919007523569" className="contact-channel">
                  <div className="contact-channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">Phone</span>
                    <span className="contact-channel-value">+91 90075 23569</span>
                    <span className="contact-channel-value">+91 96813 85243</span>
                  </div>
                </a>

                <a href="https://wa.me/919007523569" target="_blank" rel="noopener noreferrer" className="contact-channel">
                  <div className="contact-channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                    </svg>
                  </div>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">WhatsApp</span>
                    <span className="contact-channel-value">Message us anytime</span>
                  </div>
                </a>

                <a href="https://www.instagram.com/aslam_digital_studio" target="_blank" rel="noopener noreferrer" className="contact-channel">
                  <div className="contact-channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="5"/>
                      <circle cx="17.5" cy="6.5" r="1.5"/>
                    </svg>
                  </div>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">Instagram</span>
                    <span className="contact-channel-value">@aslam_digital_studio</span>
                  </div>
                </a>
              </div>

              <div className="contact-panel-ornament">
                <svg width="100" height="30" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3">
                  <path d="M0 15h35M65 15h35" />
                  <path d="M42 15l8-6 8 6-8 6z" />
                  <circle cx="50" cy="15" r="2" fill="currentColor" opacity="0.4"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div className="form-row" variants={fieldVariants}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="john@example.com" />
              </div>
            </motion.div>
            <motion.div className="form-row" variants={fieldVariants}>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label htmlFor="event_type">Event Type</label>
                <select id="event_type" name="event_type">
                  <option value="">Select...</option>
                  <option value="Wedding Photography">Wedding Photography</option>
                  <option value="Wedding Videography">Wedding Videography</option>
                  <option value="Wedding Photo + Video">Wedding Photo + Video</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </motion.div>
            <motion.div className="form-group full" variants={fieldVariants}>
              <label htmlFor="event_date">Event Date</label>
              <input type="date" id="event_date" name="event_date" />
            </motion.div>
            <motion.div className="form-group full" variants={fieldVariants}>
              <label htmlFor="message">Tell Us About Your Event</label>
              <textarea id="message" name="message" rows="5" placeholder="Share details about your event, venue, guest count, or any special requests..."></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className={`btn-submit${status === 'success' ? ' success' : ''}${status === 'error' ? ' error' : ''}`}
              variants={fieldVariants}
              whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
              whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
              disabled={status === 'sending'}
            >
              {status === 'sending' && (
                <svg className="btn-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              )}
              {btnLabel}
              {status === 'idle' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
