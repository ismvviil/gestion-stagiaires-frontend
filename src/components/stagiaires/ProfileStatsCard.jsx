// src/components/stagiaires/ProfileStatsCard.jsx
import React from "react";
import {
  HiClipboardList,
  HiAcademicCap,
  HiStar,
  HiCheckCircle,
  HiTrendingUp,
  HiEye,
  HiChartBar,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import styles from "./ProfileStatsCard.module.css";

const ProfileStatsCard = ({ stats }) => {
  const statsItems = [
    {
      key: "candidatures_soumises",
      label: "Candidatures",
      value: stats?.candidatures_soumises || 0,
      icon: HiClipboardList,
      color: "primary",
      link: "/mes-candidatures",
    },
    {
      key: "stages_effectues",
      label: "Stages",
      value: stats?.stages_effectues || 0,
      icon: HiAcademicCap,
      color: "success",
      link: "/mes-stages",
    },
    {
      key: "competences_declarees",
      label: "Compétences",
      value: stats?.competences_declarees || 0,
      icon: HiStar,
      color: "warning",
      link: null,
    },
    {
      key: "profil_complete",
      label: "Profil",
      value: stats?.profil_complete ? "Complet" : "À compléter",
      icon: stats?.profil_complete ? HiCheckCircle : HiEye,
      color: stats?.profil_complete ? "success" : "info",
      link: null,
    },
  ];

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <div className={styles.statsHeaderIcon}>
          <HiChartBar />
        </div>
        <div className={styles.statsHeaderText}>
          <h3 className={styles.statsTitle}>Votre activité</h3>
          <p className={styles.statsSubtitle}>Résumé de votre parcours</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statsItems.map((stat) => {
          const IconComponent = stat.icon;
          const StatCard = (
            <div
              key={stat.key}
              className={`${styles.statCard} ${styles[stat.color]} ${
                stat.link ? styles.clickable : ""
              }`}
            >
              <div className={styles.statIcon}>
                <IconComponent />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {typeof stat.value === "number" && stat.value > 0 ? (
                    <>
                      <span className={styles.statNumber}>{stat.value}</span>
                      <HiTrendingUp className={styles.trendIcon} />
                    </>
                  ) : (
                    <span className={styles.statText}>{stat.value}</span>
                  )}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
              {stat.link && (
                <div className={styles.statAction}>
                  <HiEye />
                </div>
              )}
            </div>
          );

          return stat.link ? (
            <Link key={stat.key} to={stat.link} className={styles.statLink}>
              {StatCard}
            </Link>
          ) : (
            StatCard
          );
        })}
      </div>

      {/* Messages d'encouragement */}
      <div className={styles.encouragementSection}>
        {stats?.profil_complete ? (
          <div className={styles.encouragementCard}>
            <div className={styles.encouragementIcon}>
              <HiCheckCircle />
            </div>
            <div className={styles.encouragementContent}>
              <h4 className={styles.encouragementTitle}>Excellent travail !</h4>
              <p className={styles.encouragementText}>
                Votre profil est complet. Explorez maintenant les
                recommandations personnalisées.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.encouragementCard}>
            <div className={styles.encouragementIcon}>
              <HiTrendingUp />
            </div>
            <div className={styles.encouragementContent}>
              <h4 className={styles.encouragementTitle}>
                Continuez sur cette lancée
              </h4>
              <p className={styles.encouragementText}>
                Complétez votre profil pour obtenir de meilleures
                recommandations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileStatsCard;
