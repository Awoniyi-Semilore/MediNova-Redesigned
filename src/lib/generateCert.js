import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { db } from './firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const handleCertificateGeneration = async (element, userData, levelInfo) => {
  if (!element) return;

  try {
    // 1. Capture the hidden HTML as an image
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // 2. Create PDF
    const pdf = new jsPDF('l', 'px', [1000, 700]);
    pdf.addImage(imgData, 'PNG', 0, 0, 1000, 700);
    pdf.save(`MediNova_Cert_${levelInfo.name.replace(/\s+/g, '_')}.pdf`);

    // 3. Update Firebase so it shows in the Dashboard
    const certRef = doc(db, "users", userData.uid);
    await updateDoc(certRef, {
      earnedCertificates: arrayUnion({
        id: `MN-${Math.floor(1000 + Math.random() * 9000)}`,
        title: levelInfo.name,
        date: new Date().toLocaleDateString(),
        track: userData.track || 'Physician'
      })
    });

    return true;
  } catch (err) {
    console.error("Cert generation failed:", err);
    return false;
  }
};