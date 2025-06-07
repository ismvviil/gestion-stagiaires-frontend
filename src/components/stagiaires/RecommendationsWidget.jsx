import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiStar,
  HiTrendingUp,
  HiLightBulb,
  HiEye,
  HiCursorClick,
  HiArrowRight,
  HiSparkles,
  HiChartBar,
  HiRefresh,
  HiExclamation,
  HiCheckCircle,
  HiInformationCircle,
} from "react-icons/hi";
import {
  getPersonalizedRecommendations,
  analyzeRecommendationPotential,
} from "../../services/stagiaireService";
import styles from "./RecommendationsWidget.module.css";

const RecommendationsWidget = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [profileAnalysis, setProfileAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRecommendationsData();
  }, []);

  const loadRecommendationsData = async () => {
    try {
      setLoading(true);
      setError("");

      // Charger les top recommandations (limitées pour le widget)
      const recommendationsData = await getPersonalizedRecommendations({
        limit: 3,
        min_score: 40.0,
        include_similar_profiles: false,
      });
      setRecommendations(recommendationsData.recommendations || []);

      // Charger l'analyse du profil
      const analysisData = await analyzeRecommendationPotential();
      setProfileAnalysis(analysisData);
    } catch (err) {
      setError("Erreur lors du chargement");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return styles.scoreExcellent;
    if (score >= 60) return styles.scoreGood;
    if (score >= 40) return styles.scoreFair;
    return styles.scorePoor;
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Bon";
    if (score >= 40) return "Moyen";
    return "Faible";
  };

  if (loading) {
    return (
      <div className={styles.widgetContainer}>
        <div className={styles.widgetHeader}>
          <div className={styles.headerIcon}>
            <HiStar />
          </div>
          <h3 className={styles.widgetTitle}>Recommandations</h3>
        </div>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.widgetContainer}>
      {/* Header du widget */}
      <div className={styles.widgetHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <HiStar />
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.widgetTitle}>Recommandations pour vous</h3>
            <p className={styles.widgetSubtitle}>
              Offres sélectionnées selon votre profil
            </p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={loadRecommendationsData}
            className={styles.refreshButton}
            title="Actualiser"
          >
            <HiRefresh />
          </button>
        </div>
      </div>

      {/* Score de complétude du profil */}
      {profileAnalysis && (
        <div className={styles.profileScoreSection}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreIcon}>
              <HiChartBar />
            </div>
            <div className={styles.scoreContent}>
              <div className={styles.scoreValue}>
                {profileAnalysis.profile_analysis.profile_completeness}%
              </div>
              <div className={styles.scoreLabel}>Profil complété</div>
            </div>
            <div className={styles.scoreStatus}>
              {profileAnalysis.profile_analysis.profile_completeness >= 80 ? (
                <HiCheckCircle className={styles.statusGood} />
              ) : (
                <HiExclamation className={styles.statusWarning} />
              )}
            </div>
          </div>

          {profileAnalysis.profile_analysis.profile_completeness < 80 && (
            <div className={styles.improvementHint}>
              <HiLightBulb className={styles.hintIcon} />
              <span className={styles.hintText}>
                Complétez votre profil pour de meilleures recommandations
              </span>
            </div>
          )}
        </div>
      )}

      {/* Messages d'erreur */}
      {error && (
        <div className={styles.errorMessage}>
          <HiExclamation className={styles.errorIcon} />
          <span>{error}</span>
        </div>
      )}

      {/* Liste des recommandations */}
      <div className={styles.recommendationsContent}>
        {recommendations.length === 0 ? (
          <div className={styles.noRecommendations}>
            <div className={styles.emptyState}>
              <HiInformationCircle className={styles.emptyIcon} />
              <div className={styles.emptyText}>
                <h4 className={styles.emptyTitle}>Aucune recommandation</h4>
                <p className={styles.emptyDescription}>
                  Complétez votre profil pour obtenir des suggestions
                  personnalisées
                </p>
              </div>
            </div>
            <div className={styles.emptyActions}>
              <Link to="/profile" className={styles.completeProfileButton}>
                <HiCursorClick />
                <span>Compléter mon profil</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.recommendationsList}>
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.offre_id}
                  className={styles.recommendationItem}
                >
                  <div className={styles.itemHeader}>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemTitle}>
                        <Link
                          to={`/offres/${recommendation.offre_id}`}
                          className={styles.titleLink}
                        >
                          {recommendation.titre}
                        </Link>
                      </h4>
                      <p className={styles.itemCompany}>
                        {recommendation.entreprise_nom}
                      </p>
                    </div>
                    <div className={styles.itemScore}>
                      <div
                        className={`${styles.scoreChip} ${getScoreColor(
                          recommendation.match_score
                        )}`}
                      >
                        {recommendation.match_score}%
                      </div>
                    </div>
                  </div>

                  <div className={styles.itemContent}>
                    <div className={styles.itemDetails}>
                      <span className={styles.itemSector}>
                        {recommendation.secteur}
                      </span>
                      <span className={styles.itemSeparator}>•</span>
                      <span className={styles.itemType}>
                        {recommendation.type_stage}
                      </span>
                    </div>

                    {recommendation.recommendation_reasons &&
                      recommendation.recommendation_reasons.length > 0 && (
                        <div className={styles.itemReasons}>
                          <HiSparkles className={styles.reasonsIcon} />
                          <span className={styles.reasonsText}>
                            {recommendation.recommendation_reasons[0]}
                          </span>
                        </div>
                      )}
                  </div>

                  <div className={styles.itemActions}>
                    <Link
                      to={`/offres/${recommendation.offre_id}`}
                      className={styles.viewButton}
                    >
                      <HiEye />
                      <span>Voir</span>
                    </Link>
                    <Link
                      to={`/offres/${recommendation.offre_id}/postuler`}
                      className={styles.applyButton}
                    >
                      <HiCursorClick />
                      <span>Postuler</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions du widget */}
            <div className={styles.widgetFooter}>
              <Link to="/recommendations" className={styles.viewAllButton}>
                <span>Voir toutes les recommandations</span>
                <HiArrowRight className={styles.buttonArrow} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsWidget;
