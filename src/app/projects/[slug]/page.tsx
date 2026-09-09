import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { projectsData } from '@/data/projects';
import styles from './project.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Uday Kiran Tella',
    };
  }

  return {
    title: `${project.title} — Case Study | Uday Kiran Tella`,
    description: project.standfirst || project.description,
    openGraph: {
      title: `${project.title} — Case Study | Uday Kiran Tella`,
      description: project.standfirst || project.description,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = projectsData.findIndex((p) => p.id === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject =
    currentIndex > 0
      ? projectsData[currentIndex - 1]
      : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : projectsData[0];

  return (
    <div className={styles.container}>
      {/* Magazine Sticky Top Navigation */}
      <nav className={styles.topNav} aria-label="Case study navigation">
        <Link href="/#work" className={styles.backLink}>
          <ArrowLeft size={15} />
          <span>PORTFOLIO / WORK</span>
        </Link>

        <div className={styles.issueBeacon}>
          <span className={styles.beaconDot} aria-hidden="true" />
          <span>
            {project.issueNumber} {'//'} PRODUCTION CASE STUDY
          </span>
        </div>

        <div className={styles.navActions}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveButton}
            >
              <span>{project.liveLabel || 'Live Site'}</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </nav>

      {/* Main Magazine Article Canvas */}
      <article className={styles.article}>
        {/* Masthead Header */}
        <header className={styles.masthead}>
          <div className={styles.metaEyebrow}>
            <span>{project.issueNumber}</span>
            <span className={styles.metaSep}>•</span>
            <span className={styles.categoryTag}>{project.category}</span>
            <span className={styles.metaSep}>•</span>
            <span>{project.date}</span>
            <span className={styles.metaSep}>•</span>
            <span>{project.readTime}</span>
          </div>

          <h1 className={styles.title}>
            {project.title}
            {project.subtitle && (
              <>
                <br />
                <em>{project.subtitle}</em>
              </>
            )}
          </h1>

          <p className={styles.standfirst}>{project.standfirst}</p>

          <dl className={styles.quickMetaGrid}>
            <div className={styles.quickMetaItem}>
              <dt>Client / Entity</dt>
              <dd>{project.client}</dd>
            </div>
            <div className={styles.quickMetaItem}>
              <dt>My Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div className={styles.quickMetaItem}>
              <dt>Timeline</dt>
              <dd>{project.timeline}</dd>
            </div>
            <div className={styles.quickMetaItem}>
              <dt>Core Stack</dt>
              <dd>{project.techStack.slice(0, 4).join(', ')}</dd>
            </div>
          </dl>
        </header>

        {/* Hero Showcase / Figure 01 */}
        <section className={styles.showcaseFrame} aria-label="Project Preview Interface">
          <div className={styles.browserMock}>
            <div className={styles.browserChrome}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
              <span className={styles.urlBar}>
                {new URL(project.liveUrl).hostname}
              </span>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={project.heroImage}
                alt={`Live preview screenshot of ${project.title}`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className={styles.heroImg}
              />
            </div>
          </div>
          <p className={styles.figureCaption}>{project.heroCaption}</p>
        </section>

        {/* Highlight Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <section className={styles.metricsStrip} aria-label="Key Performance Indicators">
            {project.metrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricDetail}>{metric.detail}</div>
              </div>
            ))}
          </section>
        )}

        {/* 2-Column Editorial Magazine Grid */}
        <div className={styles.magazineGrid}>
          {/* Main Story Narrative Column */}
          <div className={styles.storyColumn}>
            {/* Chapter 01: The Assignment */}
            <section className={styles.chapter}>
              <p className={styles.chapterEyebrow}>01 / The Assignment & Context</p>
              <h2 className={styles.chapterTitle}>
                Redefining the digital standard for {project.title}
              </h2>
              <div className={`${styles.prose} ${styles.proseLead}`}>
                {project.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Editorial Pull Quote */}
            {project.pullQuote && (
              <blockquote className={styles.pullQuote}>
                <p className={styles.quoteText}>&ldquo;{project.pullQuote.quote}&rdquo;</p>
                <cite className={styles.quoteCite}>
                  <strong>{project.pullQuote.author}</strong> — {project.pullQuote.role}
                </cite>
              </blockquote>
            )}

            {/* Chapter 02: The Challenge */}
            <section className={styles.chapter}>
              <p className={styles.chapterEyebrow}>02 / Technical Hurdles & Friction</p>
              <h2 className={styles.chapterTitle}>{project.challenge.title}</h2>
              <div className={styles.prose}>
                <p>{project.challenge.description}</p>
              </div>
              <ul className={styles.challengeList}>
                {project.challenge.bulletPoints.map((point, index) => (
                  <li key={index} className={styles.challengeItem}>
                    <span className={styles.challengeGlyph}>[!]</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Chapter 03: Architecture Blueprint */}
            <section className={styles.chapter}>
              <p className={styles.chapterEyebrow}>03 / Architecture & Technical Decisions</p>
              <h2 className={styles.chapterTitle}>{project.architecture.title}</h2>
              <div className={styles.prose}>
                <p>{project.architecture.summary}</p>
              </div>

              <div className={styles.archTable}>
                {project.architecture.stackBreakdown.map((layer, index) => (
                  <div key={index} className={styles.archRow}>
                    <span className={styles.archLayer}>{layer.layer}</span>
                    <span className={styles.archTech}>{layer.technology}</span>
                    <span className={styles.archRationale}>{layer.rationale}</span>
                  </div>
                ))}
              </div>

              <div className={styles.decisionBox}>
                <strong>Key Architectural Decision</strong>
                <p>{project.architecture.keyDecision}</p>
              </div>
            </section>

            {/* Chapter 04: Technical Deep Dive */}
            <section className={styles.chapter}>
              <p className={styles.chapterEyebrow}>04 / Engineering Deep Dive</p>
              <h2 className={styles.chapterTitle}>{project.deepDive.title}</h2>
              <div className={styles.deepDiveCard}>
                <div className={styles.deepDiveHeader}>
                  <span className={styles.deepDiveBadge}>SOLUTION BREAKDOWN</span>
                  <span className={styles.deepDiveTitle}>Under The Hood</span>
                </div>
                <div className={styles.deepDiveBody}>
                  <div className={styles.deepDiveRow}>
                    <strong>The Problem</strong>
                    <p>{project.deepDive.problem}</p>
                  </div>
                  <div className={styles.deepDiveRow}>
                    <strong>The Engineering Execution</strong>
                    <p>{project.deepDive.solution}</p>
                  </div>
                  <div className={styles.deepDiveRow}>
                    <strong>Architectural Takeaway</strong>
                    <p>{project.deepDive.keyTakeaway}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Chapter 05: Core Engineered Features */}
            <section className={styles.chapter}>
              <p className={styles.chapterEyebrow}>05 / Core Engineered Capabilities</p>
              <h2 className={styles.chapterTitle}>Built for Scale & Precision</h2>
              <div className={styles.featureGrid}>
                {project.features.map((feature, index) => (
                  <article key={index} className={styles.featureCard}>
                    <div className={styles.featureIndex}>FEATURE 0{index + 1}</div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Chapter 06: Outcomes & Retrospective */}
            <section className={styles.chapter}>
              <p className={styles.chapterEyebrow}>06 / Measurable Impact & Lessons</p>
              <h2 className={styles.chapterTitle}>Production Outcomes</h2>
              <ul className={styles.outcomeList}>
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className={styles.outcomeItem}>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '36px' }}>
                <p className={styles.chapterEyebrow}>ENGINEERING RETROSPECTIVE</p>
                <ul className={styles.takeawayList}>
                  {project.takeaways.map((takeaway, index) => (
                    <li key={index} className={styles.takeawayItem}>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Column */}
          <aside className={styles.sidebarColumn}>
            {/* Executive Brief Card */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>Executive Brief</h3>
              <div className={styles.sidebarList}>
                <div className={styles.sidebarRow}>
                  <span className={styles.sidebarLabel}>Status</span>
                  <span className={styles.sidebarValue} style={{ color: 'var(--mint)' }}>
                    ● Production Shipped
                  </span>
                </div>
                <div className={styles.sidebarRow}>
                  <span className={styles.sidebarLabel}>Client / Partner</span>
                  <span className={styles.sidebarValue}>{project.client}</span>
                </div>
                <div className={styles.sidebarRow}>
                  <span className={styles.sidebarLabel}>Category</span>
                  <span className={styles.sidebarValue}>{project.category}</span>
                </div>
                <div className={styles.sidebarRow}>
                  <span className={styles.sidebarLabel}>Role</span>
                  <span className={styles.sidebarValue}>{project.role}</span>
                </div>
                <div className={styles.sidebarRow}>
                  <span className={styles.sidebarLabel}>Timeline</span>
                  <span className={styles.sidebarValue}>{project.timeline}</span>
                </div>
              </div>
            </div>

            {/* Full Tech Stack Matrix */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>Technologies Deployed</h3>
              <div className={styles.techChips}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techChip}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Deliverables / Highlights */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarHeading}>Key Deliverables</h3>
              <div className={styles.sidebarList}>
                {project.highlights.map((highlight, index) => (
                  <div key={index} className={styles.sidebarRow}>
                    <span className={styles.sidebarLabel}>0{index + 1}</span>
                    <span className={styles.sidebarValue}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Callout */}
            <div className={styles.ctaCard}>
              <h4>Have a project in mind?</h4>
              <p>
                I build high-performance custom websites, web applications, and full-stack MVPs
                engineered to scale from day one.
              </p>
              <Link href="/#contact" className={styles.ctaButton}>
                <span>Let&apos;s Build Together</span>
                <Sparkles size={14} />
              </Link>
            </div>
          </aside>
        </div>

        {/* Magazine Issue Navigator (Footer) */}
        <footer className={styles.issueNavigator}>
          <p className={styles.navigatorHeading}>— Read Next Case Study —</p>
          <div className={styles.navLinksGrid}>
            <Link href={`/projects/${prevProject.id}`} className={styles.navStoryCard}>
              <span className={styles.navStoryTag}>
                <ChevronLeft size={13} />
                <span>PREVIOUS ISSUE / {prevProject.issueNumber}</span>
              </span>
              <h4 className={styles.navStoryTitle}>{prevProject.title}</h4>
              <p className={styles.navStoryDesc}>{prevProject.description}</p>
            </Link>

            <Link href={`/projects/${nextProject.id}`} className={styles.navStoryCard}>
              <span className={styles.navStoryTag} style={{ justifyContent: 'flex-end' }}>
                <span>NEXT ISSUE / {nextProject.issueNumber}</span>
                <ChevronRight size={13} />
              </span>
              <h4 className={styles.navStoryTitle} style={{ textAlign: 'right' }}>
                {nextProject.title}
              </h4>
              <p className={styles.navStoryDesc} style={{ textAlign: 'right' }}>
                {nextProject.description}
              </p>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}