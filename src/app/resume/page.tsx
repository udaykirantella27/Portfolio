import { Metadata } from 'next';
import Link from 'next/link';
import { experienceData, educationData, certificationsData } from '@/data/experience';
import styles from './resume.module.css';

export const metadata: Metadata = {
  title: 'Resume | Uday Kiran Tella',
  description: 'Download a detailed resume showcasing experience, education, and certifications of full stack JavaScript developer Uday Kiran Tella.',
};

export default function Resume() {
  return (
    <div className="container">
      <section className={styles.resume}>
        <h1>My Resume</h1>

        <div className={styles.download}>
          <Link href="/resume.pdf" target="_blank" className={styles.downloadButton}>
            Download PDF Resume
          </Link>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Professional Experience</h2>
            {experienceData.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className={styles.experience}>
                <h3>{exp.title}</h3>
                <p className={styles.company}>{exp.company}</p>
                <p className={styles.period}>{exp.period}</p>
                <div className={styles.details}>
                  <h4>Responsibilities:</h4>
                  <ul>
                    {exp.responsibilities.map((resp) => (
                      <li key={resp}>{resp}</li>
                    ))}
                  </ul>
                  <h4>Achievements:</h4>
                  <ul>
                    {exp.achievements.map((ach) => (
                      <li key={ach}>{ach}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2>Education</h2>
            <div className={styles.education}>
              <h3>{educationData.degree}</h3>
              <p className={styles.institution}>{educationData.institution}</p>
              <p className={styles.period}>{educationData.period}</p>
              <p className={styles.gpa}>GPA: {educationData.gpa}</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Certifications</h2>
            <ul className={styles.certifications}>
              {certificationsData.map((cert) => (
                <li key={cert.name} className={styles.certification}>
                  {cert.name}
                  {cert.issuer && <span className={styles.issuer}> - {cert.issuer}</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}