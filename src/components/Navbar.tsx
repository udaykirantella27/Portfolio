"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `${styles.navLink} ${pathname === path ? styles.active : ''}`;

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Uday Kiran Tella
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={linkClass('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={linkClass('/about')}>
              About
            </Link>
          </li>
          <li>
            <Link href="/skills" className={linkClass('/skills')}>
              Skills
            </Link>
          </li>
          <li>
            <Link href="/experience" className={linkClass('/experience')}>
              Experience
            </Link>
          </li>
          <li>
            <Link href="/projects" className={linkClass('/projects')}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/resume" className={linkClass('/resume')}>
              Resume
            </Link>
          </li>
          <li>
            <Link href="/contact" className={linkClass('/contact')}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;