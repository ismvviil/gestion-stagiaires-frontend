import React from "react";
import { Link } from "react-router-dom";
import {
  HiStar,
  HiSearch,
  HiUser,
  HiClipboardList,
  HiTrendingUp,
  HiLightBulb,
  HiChartBar,
  HiEye,
  HiCursorClick,
  HiArrowRight,
  HiSparkles,
} from "react-icons/hi";
import styles from "./QuickActionsPanel.module.css";

const QuickActionsPanel = ({ className = "" }) => {
  const quickActions = [
    {
      title: "Recommandations",
      description: "Offres personnalisées pour vous",
      icon: HiStar,
      path: "/recommendations",
      color: "primary",
      isNew: true,
    },
    {
      title: "Mon Profil",
      description: "Gérer mes informations et CV",
      icon: HiUser,
      path: "/profile",
      color: "success",
      isNew: true,
    },
    {
      title: "Explorer Offres",
      description: "Découvrir les opportunités",
      icon: HiSearch,
      path: "/offres",
      color: "info",
    },
    {
      title: "Mes Candidatures",
      description: "Suivre mes candidatures",
      icon: HiClipboardList,
      path: "/mes-candidatures",
      color: "warning",
    },
    {
      title: "Insights Marché",
      description: "Tendances et conseils carrière",
      icon: HiTrendingUp,
      path: "/recommendations?tab=insights",
      color: "purple",
      isNew: true,
    },
    {
      title: "Mes Stages",
      description: "Suivre ma progression",
      icon: HiChartBar,
      path: "/mes-stages",
      color: "teal",
    },
  ];

  return (
    <div className={`${styles.quickActionsPanel} ${className}`}>
      <div className={styles.panelHeader}>
        <div className={styles.headerIcon}>
          <HiLightBulb />
        </div>
        <div className={styles.headerText}>
          <h3 className={styles.panelTitle}>Actions rapides</h3>
          <p className={styles.panelSubtitle}>
            Accès direct à vos fonctionnalités principales
          </p>
        </div>
      </div>

      <div className={styles.actionsGrid}>
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;

          return (
            <Link
              key={index}
              to={action.path}
              className={`${styles.actionCard} ${styles[action.color]}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <IconComponent />
                </div>
                {action.isNew && (
                  <div className={styles.newBadge}>
                    <HiSparkles />
                    <span>Nouveau</span>
                  </div>
                )}
              </div>

              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{action.title}</h4>
                <p className={styles.cardDescription}>{action.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.cardAction}>
                  <span>Accéder</span>
                  <HiArrowRight className={styles.actionArrow} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.panelFooter}>
        <div className={styles.footerStats}>
          <div className={styles.statItem}>
            <HiSparkles className={styles.statIcon} />
            <span className={styles.statText}>
              3 nouvelles fonctionnalités disponibles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
