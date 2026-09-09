import { Metadata } from 'next';
import { experienceData } from '@/data/experience';
import styles from './experience.module.css';

export const metadata: Metadata = {
  title: 'Experience | Uday Kiran Tella',
  description: 'Professional experience timeline including software developer and internship roles.',
};

export default function Experience() {
  return (
    <div className="container">
      <section className={styles.experience}>
        <h1>Experience</h1>
        <div className={styles.timeline}>
          {experienceData.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className={styles.entry}>
              <h2>{exp.title}</h2>
              <p className={styles.company}>
                {exp.company} &ndash; <span className={styles.period}>{exp.period}</span>
              </p>
              <ul className={styles.responsibilities}>
                {exp.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}