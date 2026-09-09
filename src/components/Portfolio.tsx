'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Braces, Check, ChevronLeft, ChevronRight, Cpu, Download, Globe, Layers, Mail, MapPin, Menu, MoveUpRight, Send, Smartphone, X } from 'lucide-react';
import { skillsData } from '@/data/skills';
import { certificationsData, educationData, experienceData } from '@/data/experience';
import { projectsData } from '@/data/projects';
import styles from './Portfolio.module.css';

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
    </svg>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const navigation = [{ label: 'About me', href: '#about' }, { label: 'Skills', href: '#skills' }, { label: 'Projects', href: '#work' }, { label: 'Experience', href: '#experience' }, { label: 'Contact', href: '#contact' }];
const roles = ['FULL STACK DEVELOPER', 'PRODUCT ENGINEER', 'INTERFACE BUILDER'];
const profileTitles = ['Uday Kiran Tella', 'Full Stack Developer', 'MERN Stack Developer', 'Associate Software Developer'];
const AboutToolsScene = dynamic(() => import('./AboutToolsScene'), { ssr: false });

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [role, setRole] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '', service: 'Custom Website' });
  const [status, setStatus] = useState('');
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 2700);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    const sectionIds = navigation.map(({ href }) => href.slice(1));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // When near or at the bottom of the page, lock to the last section (Contact)
      if (scrollY + windowHeight >= fullHeight - 90) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 35% down the viewport acts as the active reading line
      const triggerLine = windowHeight * 0.35;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine && rect.bottom > triggerLine) {
            current = id;
            break;
          }
        }
      }

      if (!current && scrollY > 300) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.getBoundingClientRect().top <= triggerLine) {
            current = sectionIds[i];
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const timer = window.setTimeout(() => setTypedTitle(profileTitles[0]), 0);
      return () => window.clearTimeout(timer);
    }

    let titleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer: number;

    const typeTitle = () => {
      const currentTitle = profileTitles[titleIndex];
      characterIndex += deleting ? -1 : 1;
      setTypedTitle(currentTitle.slice(0, characterIndex));

      if (!deleting && characterIndex === currentTitle.length) {
        deleting = true;
        timer = window.setTimeout(typeTitle, 1500);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % profileTitles.length;
      }

      timer = window.setTimeout(typeTitle, deleting ? 30 : 58);
    };

    timer = window.setTimeout(typeTitle, 320);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Opening your mail client...');
    const subject = encodeURIComponent(`[Freelance: ${form.service}] Project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Uday,\n\nName: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.service}\n\nProject Details:\n${form.message}`
    );
    window.setTimeout(() => {
      window.location.href = `mailto:tellaudaykirann@gmail.com?subject=${subject}&body=${body}`;
    }, 350);
  };

  const moveAboutArtwork = (event: MouseEvent<HTMLElement>) => {
    const section = aboutRef.current;
    if (!section || reduceMotion) return;
    const bounds = section.getBoundingClientRect();
    section.style.setProperty('--about-x', String((event.clientX - bounds.left) / bounds.width - .5));
    section.style.setProperty('--about-y', String((event.clientY - bounds.top) / bounds.height - .5));
  };

  const activeIndex = Math.max(0, navigation.findIndex((item) => item.href.slice(1) === activeSection));
  const currentNav = navigation[activeIndex] || navigation[0];

  return <div className={styles.site}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.floatingBrand} href="#home" aria-label="Uday Kiran Tella home">
          <span>TUK</span>
          <i>{typedTitle}<b aria-hidden="true" /></i>
        </a>
        <div className={styles.headerRight}>
          <a href="/Uday_Kiran_Tella_Resume_MSD.pdf" target="_blank" rel="noreferrer" className={styles.headerResumeBtn} aria-label="Download Resume PDF">
            <Download size={14} />
            <span>Resume</span>
            <span className={styles.pulseDot} aria-hidden="true" />
          </a>
          <button type="button" className={styles.menuToggle} onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>

    <aside className={styles.stepsWidget} aria-label="Portfolio sections stepper">
      <div className={styles.stepperHead}>
        <div className={styles.stepperBadge}>
          <span className={styles.stepperLabel}>STEP</span>
          <strong className={styles.stepperCount}>0{activeIndex + 1} {'//'} 0{navigation.length}</strong>
        </div>
        <span className={styles.stepperPercent}>{Math.round(((activeIndex + 1) / navigation.length) * 100)}%</span>
      </div>

      <div className={styles.stepperBar}>
        <div className={styles.stepperBarFill} style={{ width: `${((activeIndex + 1) / navigation.length) * 100}%` }} />
      </div>

      <div className={styles.stepperCurrent}>
        <span className={styles.stepperCurrentTag}>CURRENT SECTION</span>
        <motion.h4 key={currentNav.href} className={styles.stepperCurrentTitle} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
          {currentNav.label}
        </motion.h4>
      </div>

      <div className={styles.stepperPipeline}>
        {navigation.map((item, index) => {
          const isPast = index < activeIndex;
          const isCurrent = index === activeIndex;
          return (
            <a key={item.href} href={item.href} className={`${styles.stepNode} ${isCurrent ? styles.stepNodeCurrent : ''} ${isPast ? styles.stepNodePast : ''}`} onClick={() => setActiveSection(item.href.slice(1))} title={item.label} aria-label={`Step ${index + 1}: ${item.label}`}>
              {isPast ? <Check size={11} /> : <span>0{index + 1}</span>}
            </a>
          );
        })}
      </div>

      <div className={styles.stepperControls}>
        <button type="button" className={styles.stepBtn} onClick={() => { if (activeIndex > 0) { const target = navigation[activeIndex - 1].href; document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }); setActiveSection(target.slice(1)); } }} disabled={activeIndex === 0} aria-label="Previous section">
          <ChevronLeft size={13} />
          <span>PREV</span>
        </button>
        <button type="button" className={styles.stepBtn} onClick={() => { if (activeIndex < navigation.length - 1) { const target = navigation[activeIndex + 1].href; document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }); setActiveSection(target.slice(1)); } }} disabled={activeIndex === navigation.length - 1} aria-label="Next section">
          <span>NEXT</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </aside>
    {menuOpen && <div className={styles.mobileMenu}><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={22} /></button>{navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><i>0{index + 1}</i>{item.label}<ArrowUpRight /></a>)}</div>}

    <main id="main">
      <section id="home" className={styles.hero}><div className={styles.heroGrid} aria-hidden="true" /><div className={styles.heroContent}><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><p className={styles.eyebrow}> ABOUT ME / AVAILABLE FOR PRODUCT TEAMS</p><h1>Uday Kiran<br /><em>Tella</em></h1><div className={styles.roleLine}><Braces size={18} /><motion.span key={roles[role]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>{roles[role]}</motion.span></div><p className={styles.lead}>Full Stack Developer with hands-on experience building responsive web applications, operational dashboards, and reliable APIs using React, Next.js, Node.js, Express, MongoDB, and PostgreSQL.</p><div className={styles.heroActions}><a href="#work">View live projects <ArrowDownRight size={18} /></a><a href="/Uday_Kiran_Tella_Resume_MSD.pdf" target="_blank" rel="noreferrer">Download resume <Download size={17} /></a></div></motion.div><dl className={styles.heroStats}><div><dt>1+</dt><dd>Years building products</dd></div><div><dt>5</dt><dd>Live applications shipped</dd></div><div><dt>20%</dt><dd>API performance improvement</dd></div></dl></div><aside className={styles.codeStage} aria-label="Developer workflow illustration"><div className={styles.stageHeader}><span /><span /><span /><b>uday-kiran/portfolio</b></div><div className={styles.stageCode}><p><i>01</i> <b>const</b> developer = {`{`}</p><p><i>02</i> &nbsp;name: <em>&apos;Uday Kiran Tella&apos;</em>,</p><p><i>03</i> &nbsp;focus: <em>&apos;useful products&apos;</em>,</p><p><i>04</i> &nbsp;stack: [<em>&apos;React&apos;</em>, <em>&apos;Node&apos;</em>]</p><p><i>05</i> {`}`};</p></div><div className={styles.stageOutput}><span>DEPLOYMENT STATUS</span><b>Ready to contribute</b><i>● Open to opportunities</i></div></aside></section>

      <section id="about" ref={aboutRef} className={styles.about} onMouseMove={moveAboutArtwork} onMouseLeave={() => { aboutRef.current?.style.setProperty('--about-x', '0'); aboutRef.current?.style.setProperty('--about-y', '0'); }}><div className={styles.aboutScene} aria-hidden="true"><AboutToolsScene /></div><div className={styles.aboutDepth} aria-hidden="true"><i /><i /><i /></div><div className={styles.sectionIntro}><p>01 / ABOUT ME</p><h2>A developer who<br />keeps the product<br /><em>and the people</em><br />in view.</h2></div><div className={styles.aboutCopy}><p>I build end-to-end web experiences with a practical product mindset. That means translating requirements into clean interfaces, dependable APIs, and data flows that help teams move faster.</p><p>I am currently an Associate Software Developer at Zihwa Insights, where I work on CRM and commerce workflows. I care about readable code, fast user experiences, and shipping work that holds up in production.</p><div>{['React + Next.js interfaces', 'Node.js + Express APIs', 'MongoDB + PostgreSQL data', 'Role-based business tools'].map((item, index) => <span key={item}>0{index + 1} / {item}</span>)}</div></div></section>

      <section id="skills" className={styles.lab}><div className={styles.sectionIntro}><p>02 / CORE SKILLS</p><h2>Tools I use to<br />build <em>useful software.</em></h2><span>Front-end craft, backend reliability, and a practical delivery mindset.</span></div><div className={styles.workbench}><div className={styles.codeWindow}><div className={styles.windowBar}><span /><span /><span /><b>product.tsx</b><i>LIVE</i></div><pre><code><span>01</span> const idea = <b>&quot;useful&quot;</b>;<br /><span>02</span> const system = <i>design</i>({`{`}<br /><span>03</span>   interface: <b>&quot;clear&quot;</b>,<br /><span>04</span>   logic: <b>&quot;resilient&quot;</b>,<br /><span>05</span>   motion: <b>&quot;meaningful&quot;</b><br /><span>06</span> {`}`});<br /><span>07</span> <i>ship</i>(idea, system);</code></pre><div className={styles.terminalLine}><i>&gt; </i>building useful software<span /></div></div><div className={styles.skillOrbit}>{skillsData.map((group, index) => <article key={group.title} className={styles.skillGroup}><p>0{index + 1}</p><h3>{group.title}</h3><span>{group.description}</span><div>{group.skills.slice(0, 5).map((skill) => <b key={skill.name}>{skill.name}</b>)}</div></article>)}</div></div></section>

      <section id="work" className={styles.projects}><div className={styles.sectionIntro}><p>03 / SELECTED PROJECTS</p><h2>Production work<br />for <em>real teams.</em></h2><span>Deployed commerce, infrastructure, operations, membership, and HR products.</span></div><div className={styles.projectList}>{projectsData.map((project, index) => <article className={styles.project} key={project.id}><div className={styles.projectIndex}>0{index + 1}</div><div className={styles.projectVisual} data-project={index}><div className={styles.projectScreen}><Image src={'/projects/' + project.id + '.png'} alt={'Live preview of ' + project.title} fill sizes="(max-width: 620px) 80vw, 420px" /><div className={styles.screenChrome}><span /><span /><span /><b>{new URL(project.liveUrl).hostname}</b></div></div><p>{project.category}</p></div><div className={styles.projectCopy}><p>{project.category} / {project.techStack.slice(0, 2).join(' + ')}</p><h3>{project.title}</h3><span>{project.description}</span><ul>{project.highlights.slice(0, 2).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className={styles.projectLinks}><a href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveLabel} <MoveUpRight size={17} /></a><Link href={'/projects/' + project.id}>Case study <ArrowUpRight size={17} /></Link></div></div></article>)}</div></section>

      <section id="experience" className={styles.credentials}><div className={styles.sectionIntro}><p>04 / EXPERIENCE + EDUCATION</p><h2>Learning in public.<br />Shipping in <em>production.</em></h2></div><div className={styles.experience}>{experienceData.map((job, index) => <article key={job.company}><p>0{index + 1} / {job.period}</p><h3>{job.title}</h3><span>{job.company} / {job.location}</span><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><div>{job.achievements.map((item) => <b key={item}>{item}</b>)}</div></article>)}</div><div className={styles.education}><p>EDUCATION</p><b>{educationData.degree}</b><span>{educationData.institution} / {educationData.period} / CGPA {educationData.gpa}</span><div>{certificationsData.map((cert) => <i key={cert.name}>{cert.name}</i>)}</div></div></section>

      <section id="contact" className={styles.contact}>
        <div className={styles.contactCopy}>
          <p>05 / FREELANCING &amp; COLLABORATION</p>
          <h2>Let&apos;s build<br /><em>your vision.</em></h2>
          <span>
            Available for freelancing, custom client websites, responsive web apps, and mobile applications. Whether you need a launch-ready MVP, an e-commerce platform, or a modern business website, I deliver end-to-end production software with clean code and high reliability.
          </span>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceItem}>
              <Globe size={16} />
              <div>
                <strong>Custom Websites</strong>
                <small>Modern, fast, SEO &amp; high-converting</small>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <Smartphone size={16} />
              <div>
                <strong>Web &amp; Mobile Apps</strong>
                <small>React, Next.js, Node.js &amp; responsive</small>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <Layers size={16} />
              <div>
                <strong>Full-Stack MVPs</strong>
                <small>From concept &amp; wireframes to cloud launch</small>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <Cpu size={16} />
              <div>
                <strong>APIs &amp; Dashboards</strong>
                <small>Custom CRM, commerce &amp; admin tools</small>
              </div>
            </div>
          </div>

          <div className={styles.contactLinks}>
            <a href="mailto:tellaudaykirann@gmail.com"><Mail size={16} /> tellaudaykirann@gmail.com</a>
            <a href="https://linkedin.com/in/uday-kiran-tella" target="_blank" rel="noreferrer"><LinkedInIcon size={16} /> LinkedIn</a>
            <a href="https://github.com/udaykirantella27" target="_blank" rel="noreferrer"><GitHubIcon size={16} /> GitHub</a>
            <p><MapPin size={16} /> Bengaluru, India &bull; Available Worldwide</p>
          </div>
        </div>

        <form onSubmit={submit} className={styles.contactForm}>
          <div className={styles.servicePicker}>
            <span>Project Type / Need:</span>
            <div className={styles.serviceChips}>
              {['Custom Website', 'Web & Mobile App', 'Full-Stack MVP', 'Contract / Hiring'].map((service) => (
                <button
                  key={service}
                  type="button"
                  className={form.service === service ? styles.activeChip : styles.chip}
                  onClick={() => setForm({ ...form, service })}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <label>
            Name
            <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name or company" />
          </label>
          <label>
            Email
            <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="your.email@example.com" />
          </label>
          <label>
            How can I help?
            <textarea required rows={4} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me about your website, app, timeline, or requirements..." />
          </label>
          <button type="submit">
            Send project inquiry <Send size={17} />
          </button>
          {status && <p role="status">{status}</p>}
        </form>
      </section>
    </main>
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <span>UDAY KIRAN TELLA / 2026</span>
        <span className={styles.footerDivider}>{'//'}</span>
        <span className={styles.footerTech}>BUILT WITH NEXT.JS, REACT, THREE.JS</span>
      </div>
      <div className={styles.footerSocials}>
        <a href="https://linkedin.com/in/uday-kiran-tella" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className={styles.footerSocialLink}>
          <LinkedInIcon size={15} />
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/udaykirantella27" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className={styles.footerSocialLink}>
          <GitHubIcon size={15} />
          <span>GitHub</span>
        </a>
        <a href="mailto:tellaudaykirann@gmail.com" aria-label="Send Email" className={styles.footerSocialLink}>
          <Mail size={15} />
          <span>Email</span>
        </a>
      </div>
      <a href="#home" className={styles.footerBackToTop}>Back to start <ArrowUpRight size={14} /></a>
    </footer>
  </div>;
}
