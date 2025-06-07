// Créez ce composant : components/SocialShare/SocialShare.jsx
import React, { useState } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaWhatsapp, 
  FaCopy, 
  FaEnvelope,
  FaShare,
  FaTimes
} from 'react-icons/fa';
import styles from './SocialShare.module.css';

const SocialShare = ({ offre, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  // Construire l'URL de l'offre
  const currentUrl = window.location.href;
  
  // Texte de partage personnalisé
  const shareText = `Découvrez cette opportunité de stage : ${offre.titre} chez ${offre.entreprise?.raison_social || 'une entreprise'} - ${offre.localisation || 'France'}`;
  
  // URLs de partage pour chaque réseau social
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
    email: `mailto:?subject=${encodeURIComponent('Opportunité de stage intéressante')}&body=${encodeURIComponent(shareText + '\n\nLien : ' + currentUrl)}`
  };

  const handleShare = (platform) => {
    const url = shareUrls[platform];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Partage natif pour les appareils mobiles
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: offre.titre,
          text: shareText,
          url: currentUrl
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <FaShare className={styles.titleIcon} />
            Partager cette offre
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.offrePreview}>
            <h4 className={styles.offreTitle}>{offre.titre}</h4>
            <p className={styles.offreCompany}>
              {offre.entreprise?.raison_social} • {offre.localisation}
            </p>
          </div>

          <div className={styles.shareOptions}>
            <h4 className={styles.sectionTitle}>Partager sur :</h4>
            
            <div className={styles.socialButtons}>
              <button
                className={`${styles.socialButton} ${styles.facebook}`}
                onClick={() => handleShare('facebook')}
                title="Partager sur Facebook"
              >
                <FaFacebook className={styles.socialIcon} />
                <span>Facebook</span>
              </button>

              <button
                className={`${styles.socialButton} ${styles.twitter}`}
                onClick={() => handleShare('twitter')}
                title="Partager sur Twitter"
              >
                <FaTwitter className={styles.socialIcon} />
                <span>Twitter</span>
              </button>

              <button
                className={`${styles.socialButton} ${styles.linkedin}`}
                onClick={() => handleShare('linkedin')}
                title="Partager sur LinkedIn"
              >
                <FaLinkedin className={styles.socialIcon} />
                <span>LinkedIn</span>
              </button>

              <button
                className={`${styles.socialButton} ${styles.whatsapp}`}
                onClick={() => handleShare('whatsapp')}
                title="Partager sur WhatsApp"
              >
                <FaWhatsapp className={styles.socialIcon} />
                <span>WhatsApp</span>
              </button>

              <button
                className={`${styles.socialButton} ${styles.email}`}
                onClick={() => handleShare('email')}
                title="Partager par email"
              >
                <FaEnvelope className={styles.socialIcon} />
                <span>Email</span>
              </button>

              {/* Partage natif pour mobile */}
              {navigator.share && (
                <button
                  className={`${styles.socialButton} ${styles.native}`}
                  onClick={handleNativeShare}
                  title="Partager via l'appareil"
                >
                  <FaShare className={styles.socialIcon} />
                  <span>Plus d'options</span>
                </button>
              )}
            </div>

            <div className={styles.copySection}>
              <h4 className={styles.sectionTitle}>Ou copier le lien :</h4>
              <div className={styles.copyContainer}>
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  className={styles.urlInput}
                />
                <button
                  className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                  onClick={copyToClipboard}
                  title="Copier le lien"
                >
                  <FaCopy className={styles.copyIcon} />
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;