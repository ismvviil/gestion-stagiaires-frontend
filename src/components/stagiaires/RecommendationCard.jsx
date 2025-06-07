import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiStar,
  HiOfficeBuilding,
  HiLocationMarker,
  HiClock,
  HiEye,
  HiCursorClick,
  HiArrowRight,
  HiCheckCircle,
  HiChevronDown,
  HiChevronUp,
  HiSparkles,
  HiInformationCircle,
} from "react-icons/hi";
import styles from "./RecommendationCard.module.css";

const RecommendationCard = ({
  recommendation,
  onApply,
  onViewDetails,
  compact = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={`${styles.recommendationCard} ${
        compact ? styles.compact : ""
      }`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.offreInfo}>
          <h4 className={styles.offreTitle}>
            <Link
              to={`/offres/${recommendation.offre_id}`}
              className={styles.titleLink}
              onClick={onViewDetails}
            >
              {recommendation.titre}
            </Link>
          </h4>
          <div className={styles.entrepriseInfo}>
            <HiOfficeBuilding className={styles.infoIcon} />
            <span className={styles.entreprise}>
              {recommendation.entreprise_nom}
            </span>
            {recommendation.localisation && (
              <>
                <span className={styles.separator}>•</span>
                <HiLocationMarker className={styles.infoIcon} />
                <span className={styles.location}>
                  {recommendation.localisation}
                </span>
              </>
            )}
          </div>
        </div>

        <div className={styles.scoreSection}>
          <div
            className={`${styles.matchScore} ${getScoreColor(
              recommendation.match_score
            )}`}
          >
            <div className={styles.scoreValue}>
              {recommendation.match_score}%
            </div>
            <div className={styles.scoreText}>
              {getScoreLabel(recommendation.match_score)}
            </div>
          </div>

          {!compact && (
            <button
              className={styles.detailsToggle}
              onClick={toggleDetails}
              title={
                showDetails ? "Masquer les détails" : "Afficher les détails"
              }
            >
              {showDetails ? <HiChevronUp /> : <HiChevronDown />}
            </button>
          )}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.basicInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Secteur</span>
              <span className={styles.infoValue}>{recommendation.secteur}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Type</span>
              <span className={styles.infoValue}>
                {recommendation.type_stage}
              </span>
            </div>
            <div className={styles.infoItem}>
              <HiClock className={styles.infoIcon} />
              <span className={styles.infoValue}>
                {formatDate(recommendation.date_debut)} -{" "}
                {formatDate(recommendation.date_fin)}
              </span>
            </div>
          </div>

          {!compact && (
            <div className={styles.description}>
              <p className={styles.descriptionText}>
                {recommendation.description}
              </p>
            </div>
          )}
        </div>

        {/* Raisons de recommandation - toujours visibles */}
        {recommendation.recommendation_reasons &&
          recommendation.recommendation_reasons.length > 0 && (
            <div className={styles.reasons}>
              <h5 className={styles.reasonsTitle}>
                <HiCheckCircle className={styles.reasonsIcon} />
                Pourquoi cette offre vous correspond
              </h5>
              <ul className={styles.reasonsList}>
                {recommendation.recommendation_reasons
                  .slice(0, compact ? 2 : 3)
                  .map((reason, index) => (
                    <li key={index} className={styles.reasonItem}>
                      <HiSparkles className={styles.reasonIcon} />
                      {reason}
                    </li>
                  ))}
              </ul>
            </div>
          )}

        {/* Détails avancés - affichage conditionnel */}
        {(showDetails || compact) && (
          <div className={styles.detailedSection}>
            {/* Scores détaillés */}
            <div className={styles.detailedScores}>
              <h5 className={styles.scoresTitle}>
                <HiInformationCircle className={styles.scoresIcon} />
                Analyse de correspondance
              </h5>

              <div className={styles.scoresGrid}>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreItemLabel}>Compétences</span>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreBarFill}
                      style={{ width: `${recommendation.competence_match}%` }}
                    />
                  </div>
                  <span className={styles.scoreItemValue}>
                    {recommendation.competence_match}%
                  </span>
                </div>

                <div className={styles.scoreItem}>
                  <span className={styles.scoreItemLabel}>Secteur</span>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreBarFill}
                      style={{ width: `${recommendation.secteur_match}%` }}
                    />
                  </div>
                  <span className={styles.scoreItemValue}>
                    {recommendation.secteur_match}%
                  </span>
                </div>

                <div className={styles.scoreItem}>
                  <span className={styles.scoreItemLabel}>Expérience</span>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreBarFill}
                      style={{ width: `${recommendation.experience_match}%` }}
                    />
                  </div>
                  <span className={styles.scoreItemValue}>
                    {recommendation.experience_match}%
                  </span>
                </div>

                <div className={styles.scoreItem}>
                  <span className={styles.scoreItemLabel}>Localisation</span>
                  <div className={styles.scoreBar}>
                    <div
                      className={styles.scoreBarFill}
                      style={{ width: `${recommendation.location_match}%` }}
                    />
                  </div>
                  <span className={styles.scoreItemValue}>
                    {recommendation.location_match}%
                  </span>
                </div>
              </div>
            </div>

            {/* Métadonnées supplémentaires */}
            {recommendation.created_at && (
              <div className={styles.metadata}>
                <span className={styles.metaLabel}>Publiée le</span>
                <span className={styles.metaValue}>
                  {formatDate(recommendation.created_at)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.cardActions}>
        <Link
          to={`/offres/${recommendation.offre_id}`}
          className={styles.viewButton}
          onClick={onViewDetails}
        >
          <HiEye />
          <span>Voir l'offre</span>
        </Link>

        <Link
          to={`/offres/${recommendation.offre_id}/postuler`}
          className={styles.applyButton}
          onClick={onApply}
        >
          <HiCursorClick />
          <span>Postuler</span>
          <HiArrowRight className={styles.buttonArrow} />
        </Link>

        {recommendation.match_score >= 80 && (
          <div className={styles.priorityBadge}>
            <HiStar className={styles.priorityIcon} />
            <span>Priorité haute</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
