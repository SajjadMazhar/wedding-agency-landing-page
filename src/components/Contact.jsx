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
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

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

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href="tel:+919007523569" className="contact-info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span>+91 90075 23569 / +91 96813 85243</span>
          </a>
          <a href="https://wa.me/919007523569" target="_blank" rel="noopener noreferrer" className="contact-info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </motion.div>

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
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
          </motion.div>
          <motion.div className="form-row" variants={fieldVariants}>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
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
            <textarea id="message" name="message" rows="5"></textarea>
          </motion.div>
          <motion.button
            type="submit"
            className={`btn-submit${status === 'success' ? ' success' : ''}${status === 'error' ? ' error' : ''}`}
            variants={fieldVariants}
            whileHover={{ scale: status === 'sending' ? 1 : 1.04 }}
            whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
            disabled={status === 'sending'}
          >
            {status === 'sending' && (
              <svg className="btn-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            )}
            {btnLabel}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
