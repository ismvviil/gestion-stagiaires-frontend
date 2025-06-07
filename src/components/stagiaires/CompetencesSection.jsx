// src/components/stagiaires/CompetencesSection.jsx
import React, { useState, useEffect } from "react";
import {
  HiStar,
  HiLightningBolt,
  HiUser,
  HiRefresh,
  HiEye,
  HiChartBar,
  HiCollection,
  HiSparkles,
} from "react-icons/hi";
import {
  getCompetences,
  formatCompetences,
} from "../../services/stagiaireService";
import styles from "./CompetencesSection.module.css";

const CompetencesSection = ({ profile, editMode }) => {
  const [competencesData, setCompetencesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadCompetences();
  }, [profile?.competences_extraites, profile?.competences_manuelles]);

  const loadCompetences = async () => {
    try {
      setLoading(true);
      const data = await getCompetences();
      setCompetencesData(data);
    } catch (err) {
      console.error("Erreur chargement compétences:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.competencesSection}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitleGroup}>
            <HiStar className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Mes Compétences</h2>
          </div>
        </div>
        <div className={styles.loadingContainer}>
          <HiRefresh className={styles.spinningIcon} />
          <span>Chargement des compétences...</span>
        </div>
      </div>
    );
  }

  const competencesManuelles = formatCompetences(
    profile?.competences_manuelles
  );
  const competencesExtraites = formatCompetences(
    profile?.competences_extraites
  );
  const toutesCompetences = competencesData?.toutes_competences || [];

  const getFilteredCompetences = () => {
    switch (activeTab) {
      case "manual":
        return competencesManuelles;
      case "extracted":
        return competencesExtraites;
      default:
        return toutesCompetences;
    }
  };

  const tabs = [
    {
      key: "all",
      label: "Toutes",
      icon: HiCollection,
      count: toutesCompetences.length,
      color: "primary",
    },
    {
      key: "manual",
      label: "Saisies",
      icon: HiUser,
      count: competencesManuelles.length,
      color: "success",
    },
    {
      key: "extracted",
      label: "Extraites (IA)",
      icon: HiLightningBolt,
      count: competencesExtraites.length,
      color: "warning",
    },
  ];

  return (
    <div className={styles.competencesSection}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <HiStar className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Mes Compétences</h2>
        </div>
        <div className={styles.cardActions}>
          <button
            onClick={loadCompetences}
            className={styles.refreshButton}
            disabled={loading}
            title="Actualiser"
          >
            <HiRefresh className={loading ? styles.spinningIcon : ""} />
          </button>
        </div>
      </div>

      <div className={styles.cardContent}>
        {/* Statistiques */}
        <div className={styles.statsOverview}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <HiChartBar />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>
                {toutesCompetences.length}
              </span>
              <span className={styles.statLabel}>Total</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <HiUser />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>
                {competencesManuelles.length}
              </span>
              <span className={styles.statLabel}>Saisies</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <HiLightningBolt />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>
                {competencesExtraites.length}
              </span>
              <span className={styles.statLabel}>IA</span>
            </div>
          </div>
        </div>

        {/* Tabs de filtrage */}
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${styles.tab} ${
                  activeTab === tab.key ? styles.active : ""
                } ${styles[tab.color]}`}
              >
                <IconComponent className={styles.tabIcon} />
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabCount}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Liste des compétences */}
        <div className={styles.competencesContainer}>
          {getFilteredCompetences().length > 0 ? (
            <div className={styles.competencesList}>
              {getFilteredCompetences().map((competence, index) => (
                <div
                  key={index}
                  className={`${styles.competenceTag} ${
                    styles[
                      competencesManuelles.includes(competence) &&
                      competencesExtraites.includes(competence)
                        ? "both"
                        : competencesManuelles.includes(competence)
                        ? "manual"
                        : "extracted"
                    ]
                  }`}
                >
                  {competencesManuelles.includes(competence) &&
                    competencesExtraites.includes(competence) && (
                      <HiSparkles className={styles.competenceIcon} />
                    )}
                  {competencesManuelles.includes(competence) &&
                    !competencesExtraites.includes(competence) && (
                      <HiUser className={styles.competenceIcon} />
                    )}
                  {!competencesManuelles.includes(competence) &&
                    competencesExtraites.includes(competence) && (
                      <HiLightningBolt className={styles.competenceIcon} />
                    )}
                  <span className={styles.competenceText}>{competence}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <HiStar />
              </div>
              <div className={styles.emptyContent}>
                <h3 className={styles.emptyTitle}>
                  {activeTab === "manual" && "Aucune compétence saisie"}
                  {activeTab === "extracted" && "Aucune compétence extraite"}
                  {activeTab === "all" && "Aucune compétence renseignée"}
                </h3>
                <p className={styles.emptyDescription}>
                  {activeTab === "manual" &&
                    'Ajoutez vos compétences dans la section "Informations personnelles"'}
                  {activeTab === "extracted" &&
                    "Uploadez votre CV pour une analyse automatique"}
                  {activeTab === "all" &&
                    "Commencez par saisir vos compétences ou uploader votre CV"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Légende */}
        {toutesCompetences.length > 0 && (
          <div className={styles.legend}>
            <h4 className={styles.legendTitle}>Légende :</h4>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <HiUser className={`${styles.legendIcon} ${styles.manual}`} />
                <span>Saisies manuellement</span>
              </div>
              <div className={styles.legendItem}>
                <HiLightningBolt
                  className={`${styles.legendIcon} ${styles.extracted}`}
                />
                <span>Extraites par IA</span>
              </div>
              <div className={styles.legendItem}>
                <HiSparkles className={`${styles.legendIcon} ${styles.both}`} />
                <span>Confirmées (manuel + IA)</span>
              </div>
            </div>
          </div>
        )}

        {/* Conseil */}
        {!editMode && toutesCompetences.length < 5 && (
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>
              <HiEye />
            </div>
            <div className={styles.tipContent}>
              <h4 className={styles.tipTitle}>Conseil</h4>
              <p className={styles.tipText}>
                Plus vous renseignez de compétences, meilleures seront vos
                recommandations d'offres !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetencesSection;
