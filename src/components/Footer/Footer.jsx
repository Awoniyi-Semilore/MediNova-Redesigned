import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTiktok, FaInstagram, FaGithub, 
  FaLinkedin, FaWhatsapp, FaEnvelope, FaTimes, FaExternalLinkAlt 
} from 'react-icons/fa';
import styles from '../../styles/footer.module.css';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState({ name: '', text: '' });

  const handleEmail = () => {
    window.location.href = `mailto:semiloreawoniyi@gmail.com?subject=Project Inquiry - ${msg.name}&body=${msg.text}`;
  };

  const handleWA = () => {
    window.open(`https://wa.me/2347069028055?text=Hi Semilore, I'm reaching out regarding your project. Name: ${msg.name}. Message: ${msg.text}`, '_blank');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          
          {/* ARCHITECT LOG */}
          <div className={styles.storySection}>
            <Link to="/dashboard" className={styles.brandLink}>
              <div className={styles.logoCross}>
                <svg width="14" height="14" viewBox="0 0 10 10" fill="white"><path d="M4 0h2v10H4zM0 4h10v2H0z"/></svg>
              </div>
              <span className={styles.logoText}>MEDINOVA<span style={{color:'#ef5350'}}>+</span></span>
            </Link>
            
            <div className={styles.devLog}>
                <span className={styles.logTitle}>DEVELOPMENT_MANIFESTO.TXT</span>
                <p className={styles.logText}>
                    This work was originally conceived by a <strong>Team for Futurize Innovation</strong>, where I served as the <strong>only Nigerian developer</strong> in an elite Pan-African Team. The initial prototype was engineered in just <strong>48 hours</strong>.
                    <br /><br />
                    This iteration was completely <strong>redesigned, architected, and coded by Semilore</strong> within 2 weeks—balancing academic rigors and multiple concurrent projects to achieve this clinical standard.
                </p>

                {/* NEW PROTOTYPE BUTTON */}
                <a 
                    href="https://medi-nova-taupe.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.prototypeLink}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    VIEW INITIAL 48HR PROTOTYPE
                </a>

            </div>
          </div>

          {/* CONNECT SECTION */}
          <div className={styles.ctaSection}>
            <span className={styles.ctaHeading}>SYSTEM_ACCESS</span>
            <button className={styles.mainCtaBtn} onClick={() => setIsOpen(true)}>
              Schedule a Talk / Report Bug
            </button>
            
            <p style={{fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', marginTop:'10px'}}>
              Interested in partnership? Click above to trigger a secure communication link.
            </p>

            <div className={styles.socialRow}>
              <a href="https://tiktok.com/@semiloreawo" target="_blank" className={styles.socialLink}><FaTiktok /></a>
              <a href="https://github.com/Awoniyi-Semilore" target="_blank" className={styles.socialLink}><FaGithub /></a>
              <a href="https://instagram.com/AWONIYIOLUWASEMILORE" target="_blank" className={styles.socialLink}><FaInstagram /></a>
              <a href="https://linkedin.com/in/awoniyi-semilore" target="_blank" className={styles.socialLink}><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* ECG VISUAL */}
        <div className={styles.ecgWrapper}>
          <svg width="100%" height="50" viewBox="0 0 1000 50" preserveAspectRatio="none">
            <path className={styles.ecgPath} d="M0,25 L400,25 L415,25 L425,5 L435,45 L445,5 L455,25 L1000,25" />
          </svg>
        </div>

        {/* COPYRIGHT */}
        <div className={styles.bottomBar}>
          <div>© 2026 SEMILORE • ALL RIGHTS RESERVED</div>
          <div>EST. 2024 • CLINICAL ARCHITECTURE v2.0</div>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalInner}>
              <div className={styles.modalHeader}>
                <h2>INITIATE_CONTACT</h2>
                <FaTimes onClick={() => setIsOpen(false)} style={{cursor:'pointer', opacity:0.5}} />
              </div>

              <div className={styles.inputGroup}>
                <label>IDENTIFICATION (YOUR NAME)</label>
                <input 
                  className={styles.input} 
                  type="text" 
                  onChange={e => setMsg({...msg, name: e.target.value})}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>TRANSMISSION_BODY (MESSAGE)</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Bug report, work talk, or project partnership..."
                  onChange={e => setMsg({...msg, text: e.target.value})}
                />
              </div>

              <div className={styles.submitGrid}>
                <button className={styles.emailBtn} onClick={handleEmail}>
                  <FaEnvelope /> EMAIL
                </button>
                <button className={styles.waBtn} onClick={handleWA}>
                  <FaWhatsapp /> WHATSAPP
                </button>
              </div>
              
              <p style={{fontSize:'0.6rem', color:'#444', marginTop:'20px', textAlign:'center'}}>
                *WhatsApp: Polite messages only. No calls.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}