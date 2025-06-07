import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaClipboardList,
  FaPeopleArrows,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaGraduationCap,
  FaBuilding,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaPlay,
  FaSearch,
  FaHandshake,
  FaCertificate,
  FaUserGraduate,
  FaUniversity,
  FaChalkboardTeacher,
  FaLanguage,
} from "react-icons/fa";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const testimonials = [
    {
      name: "Karim Alami",
      role: "Directeur RH - OCP Group",
      content:
        "Cette plateforme a révolutionné notre gestion des stagiaires. L'intégration de l'IA nous permet de trouver les meilleurs talents rapidement.",
      rating: 5,
      avatar: "KA",
    },
    {
      name: "Leila Benbrahim",
      role: "Responsable Formation - Maroc Telecom",
      content:
        "Solution parfaite pour nos besoins en gestion de stages. L'interface intuitive est un vrai plus pour nos équipes.",
      rating: 5,
      avatar: "LB",
    },
    {
      name: "Youssef El Mansouri",
      role: "CEO - Startup Gate",
      content:
        "En tant que startup, cette plateforme nous offre des outils professionnels à un prix très accessible. Nous recrutons désormais en 2 jours !",
      rating: 4,
      avatar: "YM",
    },
  ];

  const stats = [
    { icon: FaUsers, number: "500+", label: "Entreprises partenaires" },
    { icon: FaGraduationCap, number: "2000+", label: "Stagiaires placés" },
    { icon: FaBuilding, number: "95%", label: "Taux de satisfaction" },
    { icon: FaCheckCircle, number: "1M+", label: "Candidatures traitées" },
  ];

  const features = [
    {
      icon: FaClipboardList,
      title: "Gestion des offres",
      description:
        "Publiez vos offres de stage avec notre éditeur avancé et intuitif",
      color: "#3b82f6",
    },
    {
      icon: FaPeopleArrows,
      title: "Suivi des candidatures",
      description:
        "Tableau de bord complet pour suivre chaque candidature en temps réel",
      color: "#10b981",
    },
    {
      icon: FaChartLine,
      title: "Évaluation intelligente",
      description:
        "Grilles d'évaluation personnalisables adaptées à vos besoins",
      color: "#f59e0b",
    },
    {
      icon: FaRobot,
      title: "IA de recrutement",
      description:
        "Algorithmes intelligents pour matcher les meilleurs profils",
      color: "#8b5cf6",
    },
    {
      icon: FaSearch,
      title: "Recherche avancée",
      description: "Trouvez rapidement les compétences et profils recherchés",
      color: "#ec4899",
    },
    {
      icon: FaHandshake,
      title: "Partenariats",
      description: "Connectez-vous avec les écoles et universités partenaires",
      color: "#14b8a6",
    },
    {
      icon: FaLanguage,
      title: "Interface moderne",
      description: "Interface intuitive et responsive pour tous vos appareils",
      color: "#f97316",
    },
    {
      icon: FaCertificate,
      title: "Attestations",
      description:
        "Générez automatiquement les attestations et certificats de stage",
      color: "#6366f1",
    },
  ];

  return (
    <div className={styles.landingContainer}>
      {/* Hero Section avec parallax */}
      <motion.div
        className={styles.heroSection}
        style={{ y }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.heroPattern}></div>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroText}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className={styles.title} variants={itemVariants}>
              Plateforme complète pour la gestion des
              <span className={styles.highlight}> stagiaires</span>
            </motion.h1>

            <motion.p className={styles.description} variants={itemVariants}>
              La solution intelligente dédiée aux entreprises pour recruter,
              gérer et évaluer les stagiaires avec des outils modernes et
              performants.
            </motion.p>

            <motion.div className={styles.buttonGroup} variants={itemVariants}>
              <motion.a
                href="/register"
                className={styles.primaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Commencer gratuitement</span>
                <FaArrowRight className={styles.btnIcon} />
              </motion.a>

              <motion.a
                href="#features"
                className={styles.secondaryBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className={styles.btnIcon} />
                <span>Découvrir les fonctionnalités</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.dashboardPreview}>
              <div className={styles.previewHeader}>
                <div className={styles.previewDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.previewTitle}>Tableau de bord RH</span>
              </div>
              <div className={styles.previewContent}>
                <div className={styles.previewChart}></div>
                <div className={styles.previewStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>47</span>
                    <span className={styles.statLabel}>Candidatures</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>12</span>
                    <span className={styles.statLabel}>En cours</span>
                  </div>
                </div>
                <div className={styles.previewFeature}>
                  <FaChartLine /> Système complet de gestion
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section
        className={styles.statsSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <stat.icon className={styles.statIcon} />
              <motion.span
                className={styles.statNumber}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                {stat.number}
              </motion.span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section - 4 cards per row */}
      <motion.section
        id="features"
        className={styles.featuresSection}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <motion.h2 className={styles.sectionTitle}>
            Fonctionnalités avancées
          </motion.h2>
          <motion.p className={styles.sectionSubtitle}>
            Découvrez notre solution complète pour optimiser votre gestion des
            stagiaires
          </motion.p>
        </motion.div>

        <motion.div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              variants={cardVariants}
              whileHover="hover"
              style={{ "--feature-color": feature.color }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={styles.featureIcon}>
                <feature.icon />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <motion.div
                className={styles.featureArrow}
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                <FaArrowRight />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section
        className={styles.howItWorksSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Comment ça marche</h2>
          <p className={styles.sectionSubtitle}>
            Simple et efficace en 4 étapes
          </p>
        </div>
        <div className={styles.stepsContainer}>
          {[
            {
              step: "1",
              title: "Inscription rapide",
              description: "Créez votre compte entreprise en quelques minutes",
            },
            {
              step: "2",
              title: "Publiez vos offres",
              description:
                "Rédigez vos offres de stage avec notre éditeur intuitif",
            },
            {
              step: "3",
              title: "Recevez des candidatures",
              description: "Notre IA analyse et classe les profils pour vous",
            },
            {
              step: "4",
              title: "Gérez vos stagiaires",
              description: "Suivi complet du stage jusqu'à l'évaluation finale",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={styles.stepCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.stepNumber}>{item.step}</div>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDescription}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className={styles.testimonialsSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Témoignages clients</h2>
          <p className={styles.sectionSubtitle}>
            Ils nous font confiance au quotidien
          </p>
        </div>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialCard}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <motion.p
              className={styles.testimonialText}
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {testimonials[activeTestimonial].content}
            </motion.p>

            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                {testimonials[activeTestimonial].avatar}
              </div>
              <div className={styles.authorInfo}>
                <h4>{testimonials[activeTestimonial].name}</h4>
                <p>{testimonials[activeTestimonial].role}</p>
                <div className={styles.rating}>
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <FaStar key={i} />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === activeTestimonial ? styles.active : ""
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Afficher le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Academic Supervision Section */}
      <motion.section
        className={styles.academicSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.academicContainer}>
          <motion.div
            className={styles.academicCard}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.academicHeader}>
              <motion.div
                className={styles.academicIcon}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaGraduationCap />
              </motion.div>
              <h3 className={styles.academicTitle}>Projet de Fin d'Études</h3>
            </div>

            <div className={styles.academicContent}>
              <div className={styles.academicInfo}>
                <div className={styles.studentsSection}>
                  <div className={styles.sectionIcon}>
                    <FaUserGraduate />
                  </div>
                  <div className={styles.sectionContent}>
                    <h4>Réalisé par</h4>
                    <div className={styles.studentNames}>
                      <span className={styles.studentName}>
                        MOUATE Alaa eddine
                      </span>
                      <span className={styles.separator}>&</span>
                      <span className={styles.studentName}>SOUIFI ISMAIL</span>
                    </div>
                  </div>
                </div>

                <div className={styles.supervisorSection}>
                  <div className={styles.sectionIcon}>
                    <FaChalkboardTeacher />
                  </div>
                  <div className={styles.sectionContent}>
                    <h4>Sous l'encadrement de</h4>
                    <span className={styles.supervisorName}>
                      Pr. ARHID KHADIJA
                    </span>
                  </div>
                </div>

                <div className={styles.institutionSection}>
                  <div className={styles.sectionIcon}>
                    <FaUniversity />
                  </div>
                  <div className={styles.sectionContent}>
                    <h4>Institution</h4>
                    <span className={styles.institutionName}>EST Safi</span>
                    <span className={styles.academicYear}>
                      Année universitaire 2024-2025
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.academicFooter}>
              <motion.div
                className={styles.academicBadge}
                whileHover={{ scale: 1.05 }}
              >
                <FaGraduationCap className={styles.badgeIcon} />
                <span>Projet de Fin d'Études</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.ctaPattern}></div>
        <div className={styles.ctaContent}>
          <h2>Prêt à transformer votre gestion des stagiaires ?</h2>
          <p>
            Rejoignez les entreprises qui innovent avec notre solution moderne
          </p>
          <motion.div className={styles.ctaButtons}>
            <motion.a
              href="/register"
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Essai gratuit 30 jours
            </motion.a>
            <motion.a
              href="/demo"
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demander une démo
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
