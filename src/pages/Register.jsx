// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Register.module.css';

// const Register = () => {
//   return (
//     <div className={styles.registerContainer}>
//       <h2 className={styles.title}>Inscription</h2>
      
//       <div className={styles.registerOptions}>
//         <div className={styles.registerOption}>
//           <div className={styles.optionIcon}>👔</div>
//           <h3 className={styles.optionTitle}>Recruteur</h3>
//           <p className={styles.optionDescription}>
//             Inscrivez-vous en tant que recruteur pour publier des offres de stage et gérer les candidatures.
//           </p>
//           <Link to="/register/recruteur" className={styles.registerBtn}>
//             S'inscrire en tant que recruteur
//           </Link>
//         </div>
        
//         <div className={styles.registerOption}>
//           <div className={styles.optionIcon}>📊</div>
//           <h3 className={styles.optionTitle}>Responsable RH</h3>
//           <p className={styles.optionDescription}>
//             Inscrivez-vous en tant que responsable RH pour gérer les stagiaires et générer des certificats.
//           </p>
//           <Link to="/register/responsable-rh" className={styles.registerBtn}>
//             S'inscrire en tant que responsable RH
//           </Link>
//         </div>
        
//         <div className={styles.registerOption}>
//           <div className={styles.optionIcon}>🎓</div>
//           <h3 className={styles.optionTitle}>Stagiaire</h3>
//           <p className={styles.optionDescription}>
//             Inscrivez-vous en tant que stagiaire pour postuler à des offres de stage et suivre vos missions.
//           </p>
//           <Link to="/register/stagiaire" className={styles.registerBtn}>
//             S'inscrire en tant que stagiaire
//           </Link>
//         </div>
//       </div>
      
//       <p className={styles.loginRedirect}>
//         Vous avez déjà un compte ?{' '}
//         <Link to="/login" className={styles.loginLink}>Se connecter</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, 
  FaUsers, 
  FaGraduationCap, 
  FaArrowRight, 
  FaCheck,
  FaBuilding,
  FaUserTie,
  FaChartLine,
  FaAward,
  FaHandshake,
  FaCertificate,
  FaLaptop,
  FaUserCheck,
  FaSearch,
  FaTasks,
  FaNetworkWired
} from 'react-icons/fa';
import styles from './Register.module.css';

const Register = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const registerOptions = [
    {
      id: 'recruteur',
      icon: FaBriefcase,
      title: 'Recruteur',
      subtitle: 'Entreprise & Recrutement',
      description: 'Publiez des offres de stage, gérez les candidatures et trouvez les meilleurs talents pour votre entreprise.',
      features: ['Publication d\'offres de stage', 'Gestion des candidatures', 'Analyse des profils'],
      route: '/register/recruteur',
      secondaryIcons: [FaBuilding, FaHandshake, FaSearch],
      bgClass: styles.recruiteurBg,
      iconClass: styles.recruiteurIcon
    },
    {
      id: 'responsable-rh',
      icon: FaUsers,
      title: 'Responsable RH',
      subtitle: 'Gestion & Administration',
      description: 'Gérez les stagiaires, générez des certificats et supervisez les programmes de stage.',
      features: ['Gestion des stagiaires', 'Génération de certificats', 'Suivi des performances'],
      route: '/register/responsable-rh',
      secondaryIcons: [FaUserTie, FaCertificate, FaChartLine],
      bgClass: styles.rhBg,
      iconClass: styles.rhIcon
    },
    {
      id: 'stagiaire',
      icon: FaGraduationCap,
      title: 'Stagiaire',
      subtitle: 'Étudiant & Professionnel',
      description: 'Postulez à des offres de stage, suivez vos missions et développez votre carrière.',
      features: ['Recherche de stages', 'Suivi des missions', 'Développement de compétences'],
      route: '/register/stagiaire',
      secondaryIcons: [FaLaptop, FaTasks, FaNetworkWired],
      bgClass: styles.stagiaireBg,
      iconClass: styles.stagiaireIcon
    }
  ];

  return (
    <div className={styles.registerContainer}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.floatingElement} ${styles.element1}`}></div>
        <div className={`${styles.floatingElement} ${styles.element2}`}></div>
        <div className={`${styles.floatingElement} ${styles.element3}`}></div>
        <div className={`${styles.floatingElement} ${styles.element4}`}></div>
      </div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className={styles.header} variants={cardVariants}>
          <motion.div
            className={styles.headerIcon}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <FaUserCheck />
          </motion.div>
          
          <h1 className={styles.title}>Créez votre compte</h1>
          <p className={styles.subtitle}>
            Choisissez votre profil pour accéder à notre plateforme complète de gestion des stages
          </p>
        </motion.div>

        {/* Registration Cards */}
        <motion.div className={styles.cardsGrid} variants={containerVariants}>
          {registerOptions.map((option, index) => {
            const IconComponent = option.icon;
            
            return (
              <motion.div
                key={option.id}
                className={`${styles.card} ${option.bgClass}`}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background Pattern */}
                <div className={styles.cardPattern}></div>

                {/* Main Icon */}
                <motion.div
                  className={styles.mainIconContainer}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={`${styles.mainIcon} ${option.iconClass}`}>
                    <IconComponent />
                  </div>
                </motion.div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{option.title}</h3>
                  <p className={`${styles.cardSubtitle} ${option.iconClass}`}>
                    {option.subtitle}
                  </p>
                  <p className={styles.cardDescription}>
                    {option.description}
                  </p>
                </div>

                {/* Features List */}
                <div className={styles.featuresList}>
                  {option.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className={styles.feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + featureIndex * 0.1 }}
                    >
                      <div className={`${styles.featureIcon} ${option.iconClass}`}>
                        <FaCheck />
                      </div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Secondary Icons */}
                <div className={styles.secondaryIcons}>
                  {option.secondaryIcons.map((SecondaryIcon, iconIndex) => (
                    <motion.div
                      key={iconIndex}
                      className={`${styles.secondaryIcon} ${option.iconClass}`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 15,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <SecondaryIcon />
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={option.route}
                    className={`${styles.registerBtn} ${option.iconClass}`}
                  >
                    <span>Choisir ce profil</span>
                    <motion.div
                      className={styles.btnIcon}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight />
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Hover Glow Effect */}
                <AnimatePresence>
                  {hoveredCard === option.id && (
                    <motion.div
                      className={`${styles.hoverGlow} ${option.iconClass}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Login Redirect */}
        <motion.div className={styles.loginRedirect} variants={cardVariants}>
          <div className={styles.loginContainer}>
            <p>Vous avez déjà un compte ?</p>
            <Link to="/login" className={styles.loginLink}>
              <span>Se connecter</span>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <FaArrowRight />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;