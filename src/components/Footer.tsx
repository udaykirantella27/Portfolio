import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2026 Uday Kiran Tella. All rights reserved.</p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/udaykirantella27" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
