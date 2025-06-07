// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './TopNavbar.module.css';

// const TopNavbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.logo}>
//           Gestion des Stagiaires
//         </Link>
        
//         <ul className={styles.navMenu}>
//           <li className={styles.navItem}>
//             <Link to="/" className={styles.navLink}>
//               Accueil
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/login" className={styles.navLink}>
//               Connexion
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>
//               Inscription
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default TopNavbar;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './TopNavbar.module.css'; // Updated CSS module file name

// const TopNavbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.logo}>
//           <img src="/img_withwritewhite.png" alt="Logo" className={styles.logoImg} />
//           <img src="/img_withwriteblack.png" alt="Logo" className={styles.logoImg} />
//         </Link>
        
//         <ul className={styles.navMenu}>
//           <li className={styles.navItem}>
//             <Link to="/" className={styles.navLink}>Accueil</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/login" className={styles.navLink}>Connexion</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>
//               Inscription
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaHome, 
//   FaSearch, 
//   FaSignInAlt, 
//   FaUserPlus, 
//   FaCertificate,
//   FaExternalLinkAlt ,
//   FaEnvelope
// } from 'react-icons/fa';
// import styles from './TopNavbar.module.css';

// const TopNavbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         <Link to="/" className={`${styles.logo} ${styles.fadeScale}`}>
//           <img 
//             src="/img_withwritewhite.png" 
//             alt="Logo White" 
//             className={`${styles.logoImg} ${styles.logoDefault}`}
//           />
//           <img 
//             src="/img_withwriteblack.png" 
//             alt="Logo Black" 
//             className={`${styles.logoImg} ${styles.logoHover}`}
//           />
//         </Link>
                         
//         <ul className={styles.navMenu}>
//           <li className={styles.navItem}>
//             <Link to="/" className={styles.navLink}>
//               <FaHome className={styles.navIcon} />
//               <span>Accueil</span>
//             </Link>
//           </li>

//             {/* 🆕 NOUVEAU LIEN CONTACT */}
//           <li className={styles.navItem}>
//             <Link to="/contact" className={styles.navLink}>
//               <FaEnvelope className={styles.navIcon} />
//               <span>Contact</span>
//             </Link>
//           </li>

//           {/* 🔧 Lien de vérification avec target="_blank" */}
//           <li className={styles.navItem}>
//             <a 
//               href="/verify" 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className={`${styles.navLink} ${styles.verifyLink}`}
//             >
//               <FaCertificate className={styles.navIcon} />
//               <span>Vérifier un certificat</span>
//               <FaExternalLinkAlt className={styles.externalIcon} />
//             </a>
//           </li>
          
//           <li className={styles.navItem}>
//             <Link to="/login" className={styles.navLink}>
//               <FaSignInAlt className={styles.navIcon} />
//               <span>Connexion</span>
//             </Link>
//           </li>
          
//           <li className={styles.navItem}>
//             <Link to="/register" className={`${styles.navLink} ${styles.registerBtn}`}>
//               <FaUserPlus className={styles.navIcon} />
//               <span>Inscription</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default TopNavbar;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaSearch,
  FaSignInAlt,
  FaUserPlus,
  FaCertificate,
  FaExternalLinkAlt,
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import styles from './TopNavbar.module.css';

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fermer le menu lors du redimensionnement vers desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fermer le menu avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={`${styles.logo} ${styles.fadeScale}`} onClick={closeMenu}>
          <img
            src="/img_withwritewhite.png"
            alt="Logo White"
            className={`${styles.logoImg} ${styles.logoDefault}`}
          />
          <img
            src="/img_withwriteblack.png"
            alt="Logo Black"
            className={`${styles.logoImg} ${styles.logoHover}`}
          />
        </Link>

        {/* Bouton hamburger pour mobile */}
        {isMobile && (
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FaTimes className={styles.hamburgerIcon} />
            ) : (
              <FaBars className={styles.hamburgerIcon} />
            )}
          </button>
        )}

        {/* Menu de navigation */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink} onClick={closeMenu}>
              <FaHome className={styles.navIcon} />
              <span>Accueil</span>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink} onClick={closeMenu}>
              <FaEnvelope className={styles.navIcon} />
              <span>Contact</span>
            </Link>
          </li>

          <li className={styles.navItem}>
            <a
              href="/verify"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.navLink} ${styles.verifyLink}`}
              onClick={closeMenu}
            >
              <FaCertificate className={styles.navIcon} />
              <span>Vérifier un certificat</span>
              <FaExternalLinkAlt className={styles.externalIcon} />
            </a>
          </li>

          <li className={styles.navItem}>
            <Link to="/login" className={styles.navLink} onClick={closeMenu}>
              <FaSignInAlt className={styles.navIcon} />
              <span>Connexion</span>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link 
              to="/register" 
              className={`${styles.navLink} ${styles.registerBtn}`}
              onClick={closeMenu}
            >
              <FaUserPlus className={styles.navIcon} />
              <span>Inscription</span>
            </Link>
          </li>
        </ul>

        {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
        {isMobile && isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu}></div>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;