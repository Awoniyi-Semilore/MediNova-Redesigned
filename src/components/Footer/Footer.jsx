// src/components/Footer/Footer.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FaHeart, FaGithub, FaLinkedin, FaExternalLinkAlt 
} from 'react-icons/fa';
import styles from '../../styles/footer.module.css';

export default function Footer() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const themeClass = isDark ? styles.dark : styles.light;

  return (
    <footer className={`${styles.footer} ${themeClass}`}>
      <div className={styles.container}>

        {/* Main Footer Grid */}
        <div className={styles.mainGrid}>

          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/dashboard" className={styles.brandLink}>
              <div className={styles.logoCross}>
                <svg width="14" height="14" viewBox="0 0 10 10" fill="white">
                  <path d="M4 0h2v10H4zM0 4h10v2H0z"/>
                </svg>
              </div>
              <span className={styles.logoText}>MEDINOVA<span className={styles.logoPlus}>+</span></span>
            </Link>
            <p className={styles.brandTagline}>
              Clinical simulation training for the next generation of African healthcare professionals.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkHeading}>Platform</h4>
            <ul className={styles.linkList}>
              <li><Link to="/dashboard" className={styles.footerLink}>Dashboard</Link></li>
              <li><Link to="/profile" className={styles.footerLink}>My Profile</Link></li>
              <li><a 
                href="https://medinova-africa.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footerLink}
              >
                MediNova Homepage <FaExternalLinkAlt size={10} style={{marginLeft: 4, opacity: 0.5}}/>
              </a></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.linkHeading}>Company</h4>
            <ul className={styles.linkList}>
              <li><a 
                href="https://medinova-africa.vercel.app/about" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footerLink}
              >
                About Us <FaExternalLinkAlt size={10} style={{marginLeft: 4, opacity: 0.5}}/>
              </a></li>
              <li><a 
                href="https://medinova-africa.vercel.app/contact" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footerLink}
              >
                Contact <FaExternalLinkAlt size={10} style={{marginLeft: 4, opacity: 0.5}}/>
              </a></li>
              <li><a 
                href="https://medinova-africa.vercel.app/partnership" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footerLink}
              >
                Partnership <FaExternalLinkAlt size={10} style={{marginLeft: 4, opacity: 0.5}}/>
              </a></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.linkHeading}>Connect</h4>
            <div className={styles.socialRow}>
              <a href="https://github.com/Awoniyi-Semilore" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/awoniyi-semilore" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.footerDivider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            © 2026 MediNova. All rights reserved.
          </div>
          <div className={styles.bottomRight}>
            <span className={styles.madeWith}>
              Made with <FaHeart size={10} className={styles.heartIcon} /> for African healthcare
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}