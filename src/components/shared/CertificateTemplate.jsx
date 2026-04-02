import React, { forwardRef } from 'react';
import styles from '../../styles/certificate.module.css';

// Using forwardRef so the Generator can "see" this hidden element
const CertificateTemplate = forwardRef(({ data }, ref) => {
  const { userName, levelName, date, certId, track } = data;

  return (
    <div className={styles.certCanvas} ref={ref}>
      <div className={styles.outerFrame}>
        <div className={styles.innerFrame}>
          
          {/* Decorative Corner Elements */}
          <div className={`${styles.corner} ${styles.tl}`}>+</div>
          <div className={`${styles.corner} ${styles.tr}`}>+</div>
          <div className={`${styles.corner} ${styles.bl}`}>+</div>
          <div className={`${styles.corner} ${styles.br}`}>+</div>

          <div className={styles.header}>
            <div className={styles.hospitalLogo}>
               <svg width="30" height="30" viewBox="0 0 24 24" fill="#c62828">
                 <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
               </svg>
            </div>
            <h1 className={styles.hospitalName}>MEDINOVA TEACHING HOSPITAL</h1>
            <p className={styles.registryType}>OFFICIAL BOARD OF CLINICAL ACCREDITATION</p>
          </div>

          <div className={styles.body}>
            <span className={styles.preText}>THIS CERTIFIES THAT PERSONNEL</span>
            <h2 className={styles.studentName}>{userName || "UNIDENTIFIED STAFF"}</h2>
            <div className={styles.divider}></div>
            <p className={styles.achievementText}>
              Has demonstrated clinical competence and successfully completed all 
              required simulations, residency modules, and board examinations for:
            </p>
            <h3 className={styles.levelTitle}>LEVEL COMPLETED: {levelName}</h3>
            <p className={styles.trackInfo}>Clinical Track: {track || "General Medicine"}</p>
          </div>

          <div className={styles.footer}>
            <div className={styles.sigGroup}>
              <div className={styles.signature}>Semilore</div>
              <div className={styles.sigLine}></div>
              <span>CHIEF SYSTEMS ARCHITECT</span>
            </div>

            <div className={styles.metaGroup}>
              <p>CERTIFICATE ID: {certId || "MN-REF-AUTO"}</p>
              <p>ISSUE DATE: {date}</p>
              <div className={styles.verificationQr}>
                {/* Visual placeholder for a QR code */}
                <div className={styles.qrBox}></div>
                <span>VERIFY AUTHENTICITY</span>
              </div>
            </div>

            <div className={styles.sigGroup}>
              <div className={styles.signature} style={{fontFamily: 'serif', fontSize: '1rem'}}>MediNova Board</div>
              <div className={styles.sigLine}></div>
              <span>REGISTRY REGISTRAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;