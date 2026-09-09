import { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | Uday Kiran Tella',
  description: 'Discover the journey of Uday Kiran Tella, a Full Stack Developer specializing in React, Next.js, Node.js and scalable web applications.',
};

export default function About() {
  return (
    <div className="container">
      <section className={styles.about}>
        <h1>About Me</h1>
        <div className={styles.content}>
          <p>
            I’m <strong>Uday Kiran Tella</strong>, a Full Stack Developer based in Bengaluru,
            India. With hands‑on experience in React.js, Next.js, Node.js and PostgreSQL, I build
            production‑ready web applications that scale gracefully and deliver excellent user
            experiences.
          </p>
          <p>
            My professional journey includes developing e‑commerce platforms, healthcare dashboards
            and enterprise systems. I combine modern frontend engineering—responsive design,
            component reusability and performance optimisation—with clean REST API design and solid
            backend architecture.
          </p>
          <p>
            At Zihwa Insights, I’m currently working on the Stalks N Spice e‑commerce platform and
            other full‑stack projects in an Agile environment. Previously, I interned at Ve‑Lyra
            Labs where I built responsive healthcare dashboards and reusable UI components.
          </p>
          <p>
            Outside of work, I stay curious by exploring new technologies, contributing to
            open‑source, and taking part in coding challenges to keep my skills sharp.
          </p>
          <div className={styles.actions}>
            <a href="/Uday_Kiran_Tella_Resume_MSD.pdf" target="_blank" className="primaryButton">
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}