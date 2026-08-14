import { useState } from 'react';
import SectionHeader from './SectionHeader';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      e.target.reset();
    }, 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <SectionHeader
          title="Let's Tell Your Story"
          subtitle="Ready to book Aslam Digital Studio for your next event? Share your details and we'll get back to you within 24 hours."
        />

        <div className="contact-info">
          <a href="tel:+1234567890" className="contact-info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span>+1 (234) 567-890</span>
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="contact-info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="event-type">Event Type</label>
              <select id="event-type" name="event-type">
                <option value="">Select...</option>
                <option value="wedding-photo">Wedding Photography</option>
                <option value="wedding-video">Wedding Videography</option>
                <option value="wedding-both">Wedding Photo + Video</option>
                <option value="anniversary">Anniversary</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group full">
            <label htmlFor="event-date">Event Date</label>
            <input type="date" id="event-date" name="event-date" />
          </div>
          <div className="form-group full">
            <label htmlFor="message">Tell Us About Your Event</label>
            <textarea id="message" name="message" rows="5"></textarea>
          </div>
          <button type="submit" className={`btn-submit${submitted ? ' success' : ''}`}>
            {submitted ? 'Thank you!' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
}
