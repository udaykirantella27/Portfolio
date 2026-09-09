import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { projectsData } from '@/data/projects';
import styles from './projects.module.css';

export const metadata: Metadata = {
  title: 'Case Studies Archive | Uday Kiran Tella',
  description:
    'Comprehensive editorial case studies covering e-commerce platforms, infrastructure portals, operations dashboards, and enterprise HR systems built by Uday Kiran Tella.',
};

export default function Projects() {
  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.topNav}>
        <Link href="/#work" className={styles.backLink}>
          <ArrowLeft size={15} />
          <span>PORTFOLIO / WORK</span>
        </Link>
        <span className={styles.navTag}>UDAY KIRAN TELLA // CASE ARCHIVE</span>
      </nav>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>EDITORIAL CASE ARCHIVE // 2024–2025</p>
          <h1 className={styles.title}>
            Production Systems &amp; <em>Case Studies.</em>
          </h1>
          <p className={styles.intro}>
            In-depth architectural post-mortems and technical breakdowns across high-velocity
            e-commerce, civil infrastructure, seller operations, executive platforms, and internal
            enterprise tools.
          </p>
        </header>

        <section className={styles.archiveGrid} aria-label="Project Case Studies">
          {projectsData.map((project, index) => (
            <article key={project.id} className={styles.archiveCard}>
              <div className={styles.issueIndex}>0{index + 1}</div>

              <div className={styles.cardPreview}>
                <Image
                  src={project.heroImage}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(max-width: 960px) 100vw, 360px"
                  className={styles.previewImg}
                />
              </div>

              <div className={styles.cardContent}>
                <div>
                  <div className={styles.cardCategory}>
                    {project.issueNumber} {'//'} {project.category}
                  </div>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  <p className={styles.cardDesc}>{project.standfirst || project.description}</p>
                </div>

                <div>
                  <div className={styles.cardTech}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <Link href={`/projects/${project.id}`} className={styles.caseStudyBtn}>
                      <span>Read Full Case Study</span>
                      <ArrowUpRight size={15} />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.liveBtn}
                      >
                        <span>{project.liveLabel}</span>
                        <MoveUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}