'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/lib/email';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Anti-spam field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    // Honeypot check
    if (formData.honeypot) {
      setSubmitMessage('Spam detected. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Sending message...');

    const result = await sendContactEmail({
      name: formData.name,
      email: formData.email,
      service: 'Direct Portfolio Message',
      message: formData.message,
    });

    if (result.success) {
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } else {
      setSubmitMessage(result.error || 'Failed to send message. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <section className={styles.contact}>
        <h1>Get In Touch</h1>
        <p className={styles.intro}>
          I&apos;m always interested in new opportunities and collaborations.
          Feel free to reach out if you&apos;d like to work together or just say hello!
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
              aria-describedby="name-error"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
              aria-describedby="email-error"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              rows={6}
              required
              aria-describedby="message-error"
            />
          </div>

          {/* Honeypot field - hidden from users */}
          <div className={styles.honeypot}>
            <label htmlFor="honeypot" className={styles.honeypotLabel}>
              Leave this field empty
            </label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className={styles.honeypotInput}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitMessage && (
            <p className={styles.message} role="status" aria-live="polite">
              {submitMessage}
            </p>
          )}
        </form>

        <div className={styles.contactInfo}>
          <h2>Other Ways to Connect</h2>
          <div className={styles.info}>
              <strong>Email:</strong>{' '}
              <a href="mailto:tellaudaykirann@gmail.com">tellaudaykirann@gmail.com</a>
            <p>
              <strong>Location:</strong> Bengaluru, India
            </p>
            <p>
              <strong>LinkedIn:</strong>{' '}
              <a href="https://linkedin.com/in/uday-kiran-tella" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/uday-kiran-tella
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{' '}
              <a href="https://github.com/udaykirantella27" target="_blank" rel="noopener noreferrer">
                github.com/udaykirantella27
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
