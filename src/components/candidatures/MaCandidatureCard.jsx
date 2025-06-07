import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MaCandidatureCard.module.css";
import { downloadCV } from "../../services/candidatureService";
const MaCandidatureCard = ({ candidature, onRetirer }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  //   useEffect(() => {
  //     console.log("jbdfbjdbfdjkbjdkbj : " , candidature.offre.titre);
  //   }, []);
  console.log("🔍 Candidature Debug:", {
    id: candidature.id,
    status: candidature.status,
    commentaires_recruteur: candidature.commentaires_recruteur,
    note_recruteur: candidature.note_recruteur,
    recruteur_id: candidature.recruteur_id,
  });
  
  const handleDownloadCV = async () => {
    try {
      await downloadCV(candidature.id);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur
    }
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      en_attente: { label: "En attente", class: "pending" },
      en_cours: { label: "En cours d'examen", class: "inProgress" },
      acceptee: { label: "Acceptée", class: "accepted" },
      refusee: { label: "Refusée", class: "rejected" },
      retiree: { label: "Retirée", class: "withdrawn" },
    };
    return statusMap[status] || { label: status, class: "unknown" };
  };

  const canWithdraw = ["en_attente", "en_cours"].includes(candidature.status);
  const statusInfo = getStatusDisplay(candidature.status);

  const handleRetirer = () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir retirer cette candidature ?")
    ) {
      onRetirer(candidature.id);
    }
  };

  return (
    <div className={`${styles.candidatureCard} ${styles[statusInfo.class]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.offreInfo}>
          <h3 className={styles.offreTitle}>
            <Link
              to={`/offres/${candidature.offre_id}`}
              className={styles.titleLink}
            >
              {candidature.offre?.titre || "Offre supprimée"}
            </Link>
          </h3>
          <div className={styles.entrepriseInfo}>
            <span className={styles.entreprise}>
              {candidature.offre?.entreprise?.raison_social || "Entreprise"}
            </span>
            {candidature.offre?.localisation && (
              <>
                <span className={styles.separator}>•</span>
                <span className={styles.location}>
                  {candidature.offre.localisation}
                </span>
              </>
            )}
          </div>
        </div>

        <div className={styles.statusBadge}>
          <span className={`${styles.status} ${styles[statusInfo.class]}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.candidatureDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Postulé le :</span>
            <span className={styles.detailValue}>
              {formatDate(candidature.date_debut)}
            </span>
          </div>

          {candidature.niveau_etudes && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Niveau :</span>
              <span className={styles.detailValue}>
                {candidature.niveau_etudes}
              </span>
            </div>
          )}

          {/* {candidature.cv && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>CV :</span>
              <span className={styles.detailValue}>
                <a
                  href={`/api/v1/candidatures/${candidature.id}/download-cv`}
                  className={styles.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Télécharger
                </a>
              </span>
            </div>
          )} */}
          {candidature.cv && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>CV :</span>
              <span className={styles.detailValue}>
                <button
                  onClick={handleDownloadCV}
                  className={styles.downloadLink}
                  type="button"
                >
                  Télécharger
                </button>
              </span>
            </div>
          )}
        </div>

        {candidature.lettre_motivation && (
          <div className={styles.lettreMotivation}>
            <h4 className={styles.lettreTitle}>Lettre de motivation :</h4>
            <p className={styles.lettreContent}>
              {candidature.lettre_motivation.length > 200
                ? `${candidature.lettre_motivation.substring(0, 200)}...`
                : candidature.lettre_motivation}
            </p>
          </div>
        )}

        {candidature.competences && (
          <div className={styles.competences}>
            <h4 className={styles.competencesTitle}>Compétences :</h4>
            <div className={styles.competencesTags}>
              {candidature.competences.split(",").map((competence, index) => (
                <span key={index} className={styles.competenceTag}>
                  {competence.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {candidature.commentaires_recruteur && (
          <div className={styles.feedbackSection}>
            <h4 className={styles.feedbackTitle}>Retour du recruteur :</h4>
            <p className={styles.feedbackContent}>
              {candidature.commentaires_recruteur}
            </p>
            {candidature.note_recruteur && (
              <div className={styles.note}>
                Note : {candidature.note_recruteur}/10
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.cardActions}>
        <Link
          to={`/offres/${candidature.offre_id}`}
          className={styles.viewOffreButton}
        >
          Voir l'offre
        </Link>

        {canWithdraw && (
          <button onClick={handleRetirer} className={styles.withdrawButton}>
            Retirer ma candidature
          </button>
        )}
      </div>
    </div>
  );
};

export default MaCandidatureCard;
