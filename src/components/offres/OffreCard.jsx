import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./OffreCard.module.css";

const OffreCard = ({ offre, onPublier, onFermer, onSupprimer }) => {
  const { currentUser } = useAuth();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  const formatRemuneration = (montant) => {
    if (!montant) return "Non rémunéré";
    return `${montant}€/mois`;
  };

  const canModify =
    currentUser?.type === "recruteur" && offre.recruteur_id === currentUser.id;

  return (
    <div
      className={`${styles.offreCard} ${
        !offre.est_active ? styles.inactive : ""
      }`}
    >
      <div className={styles.offreHeader}>
        <h3 className={styles.offreTitle}>
          <Link to={`/offres/${offre.id}`} className={styles.titleLink}>
            {offre.titre}
          </Link>
        </h3>
        <div className={styles.offreStatus}>
          <span
            className={`${styles.statusBadge} ${
              offre.est_active ? styles.active : styles.inactive
            }`}
          >
            {offre.est_active ? "Active" : "Fermée"}
          </span>
        </div>
      </div>

      <div className={styles.offreInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Entreprise:</span>
          <span className={styles.infoValue}>
            {offre.entreprise?.raison_social || "N/A"}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Secteur:</span>
          <span className={styles.infoValue}>{offre.secteur}</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Type:</span>
          <span className={styles.infoValue}>{offre.type_stage}</span>
        </div>

        {offre.localisation && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Localisation:</span>
            <span className={styles.infoValue}>{offre.localisation}</span>
          </div>
        )}

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Rémunération:</span>
          <span className={styles.infoValue}>
            {formatRemuneration(offre.remuneration)}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Période:</span>
          <span className={styles.infoValue}>
            {formatDate(offre.date_debut)} - {formatDate(offre.date_fin)}
          </span>
        </div>
      </div>

      <div className={styles.offreDescription}>
        <p className={styles.description}>
          {offre.description.length > 150
            ? `${offre.description.substring(0, 150)}...`
            : offre.description}
        </p>
      </div>

      {offre.competences_requises && (
        <div className={styles.competences}>
          <span className={styles.competencesLabel}>Compétences:</span>
          <span className={styles.competencesText}>
            {offre.competences_requises.length > 100
              ? `${offre.competences_requises.substring(0, 100)}...`
              : offre.competences_requises}
          </span>
        </div>
      )}

      <div className={styles.offreActions}>
        <Link to={`/offres/${offre.id}`} className={styles.viewButton}>
          Voir détails
        </Link>

        {canModify && (
          <>
            <Link
              to={`/offres/modifier/${offre.id}`}
              className={styles.editButton}
            >
              Modifier
            </Link>

            {offre.est_active ? (
              <button
                onClick={() => onFermer(offre.id)}
                className={styles.closeButton}
              >
                Fermer
              </button>
            ) : (
              <button
                onClick={() => onPublier(offre.id)}
                className={styles.publishButton}
              >
                Publier
              </button>
            )}

            <button
              onClick={() => onSupprimer(offre.id)}
              className={styles.deleteButton}
            >
              Supprimer
            </button>
          </>
        )}

        {currentUser?.type === "stagiaire" && offre.est_active && (
          <Link
            to={`/offres/${offre.id}/postuler`}
            className={styles.applyButton}
          >
            Postuler
          </Link>
        )}
      </div>
    </div>
  );
};

export default OffreCard;
