// import React, { useState } from 'react';
// import styles from './Footer.module.css';

// const Footer = () => {
//   // État pour suivre quelles sections sont ouvertes sur mobile
//   const [openSections, setOpenSections] = useState({});

//   // Fonction pour basculer l'état ouvert/fermé d'une section
//   const toggleSection = (sectionId) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [sectionId]: !prev[sectionId]
//     }));
//   };

//   // Données pour les sections de liens
//   const linkSections = [
//     {
//       id: 'navigation',
//       title: 'Navigation',
//       links: [
//         { href: '/', text: 'Accueil' },
//         { href: '/login', text: 'Connexion' },
//         { href: '/register', text: 'Inscription' }
//       ]
//     },
//     {
//       id: 'about',
//       title: 'À propos',
//       links: [
//         { href: '/contact', text: 'Contact' },
//         { href: '/cgu', text: 'CGU' },
//         { href: '/confidentialite', text: 'Confidentialité' }
//       ]
//     }
//   ];

//   return (
//     <footer className={styles.footer}>
//       <div className={styles.container}>
//         <div className={styles.content}>
//           <div className={styles.branding}>
//             <h3 className={styles.title}>Plateforme de Gestion des Stagiaires</h3>
//             <p className={styles.description}>
//               Solution complète pour la gestion des stagiaires en entreprise, du recrutement à l'évaluation.
//             </p>
//           </div>

//           <div className={styles.links}>
//             {linkSections.map(section => (
//               <div key={section.id} className={styles.linkSection}>
//                 <h4 
//                   className={`${styles.linkTitle} ${openSections[section.id] ? styles.open : ''}`}
//                   onClick={() => toggleSection(section.id)}
//                 >
//                   {section.title}
//                 </h4>
//                 <ul className={`${styles.linkList} ${openSections[section.id] ? styles.visible : ''}`}>
//                   {section.links.map(link => (
//                     <li key={link.href}>
//                       <a href={link.href} className={styles.link}>
//                         {link.text}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={styles.bottom}>
//           <p className={styles.copyright}>
//             © {new Date().getFullYear()} Plateforme de Gestion des Stagiaires. Tous droits réservés.
//           </p>
//           <p className={styles.signature}>
//             Développé par SOUIFI ISMAIL & MOUATE Alaa eddine
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaFileContract,
  FaShieldAlt,
  FaChevronDown,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaCode,
  FaGraduationCap,
  FaBriefcase
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  // État pour suivre quelles sections sont ouvertes sur mobile
  const [openSections, setOpenSections] = useState({});

  // Fonction pour basculer l'état ouvert/fermé d'une section
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Données pour les sections de liens avec icônes
  const linkSections = [
    {
      id: 'navigation',
      title: 'Navigation',
      icon: FaHome,
      links: [
        { href: '/', text: 'Accueil', icon: FaHome },
        { href: '/login', text: 'Connexion', icon: FaSignInAlt },
        { href: '/register', text: 'Inscription', icon: FaUserPlus }
      ]
    },
    {
      id: 'about',
      title: 'À propos',
      icon: FaFileContract,
      links: [
        { href: '/contact', text: 'Contact', icon: FaEnvelope },
        { href: '/cgu', text: 'CGU', icon: FaFileContract },
        { href: '/confidentialite', text: 'Confidentialité', icon: FaShieldAlt }
      ]
    },
    {
      id: 'resources',
      title: 'Ressources',
      icon: FaGraduationCap,
      links: [
        { href: '/guide', text: 'Guide d\'utilisation', icon: FaGraduationCap },
        { href: '/support', text: 'Support technique', icon: FaEnvelope },
        { href: '/demo', text: 'Demander une démo', icon: FaBriefcase }
      ]
    }
  ];

  // Réseaux sociaux
  const socialLinks = [
    { href: '#', icon: FaLinkedin, label: 'LinkedIn', color: '#0077b5' },
    { href: '#', icon: FaTwitter, label: 'Twitter', color: '#1da1f2' },
    { href: '#', icon: FaFacebook, label: 'Facebook', color: '#4267b2' },
    { href: '#', icon: FaGithub, label: 'GitHub', color: '#333' }
  ];

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const linkListVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.footer 
      className={styles.footer}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Motif de fond animé */}
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Section Branding */}
          <motion.div className={styles.branding} variants={itemVariants}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <FaBriefcase className={styles.logoIcon} />
              </div>
              <h3 className={styles.title}>
                Plateforme de Gestion des Stagiaires
              </h3>
            </div>
            <p className={styles.description}>
              Solution complète et intelligente pour la gestion des stagiaires en entreprise, 
              du recrutement à l'évaluation finale.
            </p>
            
            {/* Réseaux sociaux */}
            <div className={styles.socialLinks}>
              <span className={styles.socialTitle}>Suivez-nous :</span>
              <div className={styles.socialIcons}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={styles.socialIcon}
                    style={{ '--social-color': social.color }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sections de liens */}
          <div className={styles.links}>
            {linkSections.map((section, sectionIndex) => (
              <motion.div 
                key={section.id} 
                className={styles.linkSection}
                variants={itemVariants}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div 
                  className={`${styles.linkTitleContainer} ${openSections[section.id] ? styles.open : ''}`}
                  onClick={() => toggleSection(section.id)}
                >
                  <section.icon className={styles.sectionIcon} />
                  <h4 className={styles.linkTitle}>
                    {section.title}
                  </h4>
                  <motion.div
                    className={styles.chevron}
                    animate={{ 
                      rotate: openSections[section.id] ? 180 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {(openSections[section.id] || window.innerWidth > 768) && (
                    <motion.ul
                      className={styles.linkList}
                      variants={linkListVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: linkIndex * 0.05 }}
                        >
                          <a href={link.href} className={styles.link}>
                            <link.icon className={styles.linkIcon} />
                            <span>{link.text}</span>
                          </a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section bottom avec séparateur */}
        <motion.div 
          className={styles.separator}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        ></motion.div>

        <motion.div 
          className={styles.bottom}
          variants={itemVariants}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Plateforme de Gestion des Stagiaires. 
              Tous droits réservés.
            </p>
          </div>
          
          <div className={styles.bottomRight}>
            <motion.p 
              className={styles.signature}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={styles.madeWith}>
                Développé avec <FaHeart className={styles.heartIcon} /> par
              </span>
              <span className={styles.developers}>
                <FaCode className={styles.codeIcon} />
                SOUIFI ISMAIL & MOUATE Alaa eddine
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;