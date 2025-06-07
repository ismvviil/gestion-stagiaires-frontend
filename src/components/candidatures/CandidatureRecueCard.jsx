import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CandidatureRecueCard.module.css";
import { downloadCandidatureCV } from "../../services/candidatureService";

// const CandidatureRecueCard = ({ candidature, onTraiter }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [showTraitementForm, setShowTraitementForm] = useState(false);
//   const [traitementData, setTraitementData] = useState({
//     action: "",
//     commentaires: "",
//     note: "",
//   });

//   const handleDownloadCV = async () => {
//     try {
//       await downloadCandidatureCV(candidature.id);
//     } catch (error) {
//       console.error("Erreur lors du téléchargement:", error);
//       // Vous pouvez afficher un message d'erreur à l'utilisateur
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("fr-FR", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getStatusDisplay = (status) => {
//     const statusMap = {
//       en_attente: { label: "En attente", class: "pending" },
//       en_cours: { label: "En cours", class: "inProgress" },
//       acceptee: { label: "Acceptée", class: "accepted" },
//       refusee: { label: "Refusée", class: "rejected" },
//       retiree: { label: "Retirée", class: "withdrawn" },
//     };
//     return statusMap[status] || { label: status, class: "unknown" };
//   };

//   const canProcess = ["en_attente", "en_cours"].includes(candidature.status);
//   const statusInfo = getStatusDisplay(candidature.status);

//   const handleTraiterAction = (action) => {
//     setTraitementData({ ...traitementData, action });
//     setShowTraitementForm(true);
//   };

//   const handleTraitementSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);

//     try {
//       const data = {
//         commentaires: traitementData.commentaires,
//         ...(traitementData.note && { note: parseInt(traitementData.note) }),
//       };

//       await onTraiter(candidature.id, traitementData.action, data);
//       setShowTraitementForm(false);
//       setTraitementData({ action: "", commentaires: "", note: "" });
//     } catch (error) {
//       console.error("Erreur lors du traitement:", error);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleCancelTraitement = () => {
//     setShowTraitementForm(false);
//     setTraitementData({ action: "", commentaires: "", note: "" });
//   };

//   return (
//     <div className={`${styles.candidatureCard} ${styles[statusInfo.class]}`}>
//       <div className={styles.cardHeader}>
//         <div className={styles.candidatInfo}>
//           <h3 className={styles.candidatName}>
//             {candidature.stagiaire?.prenom} {candidature.stagiaire?.nom}
//           </h3>
//           <div className={styles.candidatureMetadata}>
//             <span className={styles.niveau}>{candidature.niveau_etudes}</span>
//             <span className={styles.separator}>•</span>
//             <span className={styles.datePostulation}>
//               Postulé le {formatDate(candidature.date_debut)}
//             </span>
//           </div>
//         </div>
//         <div className={styles.statusAndActions}>
//           <span className={`${styles.status} ${styles[statusInfo.class]}`}>
//             {statusInfo.label}
//           </span>
//           {candidature.note_recruteur && (
//             <div className={styles.note}>
//               Note: {candidature.note_recruteur}/10
//             </div>
//           )}
//         </div>
//       </div>

//       <div className={styles.offreInfo}>
//         <Link
//           to={`/offres/${candidature.offre_id}`}
//           className={styles.offreLink}
//         >
//           {candidature.offre?.titre}
//         </Link>
//       </div>

//       <div className={styles.cardContent}>
//         {candidature.competences && (
//           <div className={styles.competences}>
//             <strong>Compétences :</strong>
//             <div className={styles.competencesTags}>
//               {candidature.competences
//                 .split(",")
//                 .slice(0, 4)
//                 .map((competence, index) => (
//                   <span key={index} className={styles.competenceTag}>
//                     {competence.trim()}
//                   </span>
//                 ))}
//               {candidature.competences.split(",").length > 4 && (
//                 <span className={styles.moreCompetences}>
//                   +{candidature.competences.split(",").length - 4}
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         <div className={styles.cardActions}>
//           <div className={styles.primaryActions}>
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className={styles.detailsButton}
//             >
//               {showDetails ? "Masquer" : "Voir détails"}
//             </button>

          
//             {candidature.cv && (
//               <div className={styles.detailItem}>
//                 <span className={styles.detailLabel}>CV :</span>
//                 <span className={styles.detailValue}>
//                   <button
//                     onClick={handleDownloadCV}
//                     className={styles.downloadLink}
//                     type="button"
//                   >
//                     Télécharger CV
//                   </button>
//                 </span>
//               </div>
//             )}
//           </div>
//           {canProcess && (
//             <div className={styles.processActions}>
//               <button
//                 onClick={() => handleTraiterAction("en_cours")}
//                 className={styles.inProgressButton}
//                 disabled={processing || candidature.status === "en_cours"}
//               >
//                 Mettre en cours
//               </button>
//               <button
//                 onClick={() => handleTraiterAction("accepter")}
//                 className={styles.acceptButton}
//                 disabled={processing}
//               >
//                 Accepter
//               </button>
//               <button
//                 onClick={() => handleTraiterAction("refuser")}
//                 className={styles.rejectButton}
//                 disabled={processing}
//               >
//                 Refuser
//               </button>
//             </div>
//           )}
//         </div>
//         {showDetails && (
//           <div className={styles.detailsSection}>
//             {candidature.lettre_motivation && (
//               <div className={styles.lettreMotivation}>
//                 <h4>Lettre de motivation :</h4>
//                 <p>{candidature.lettre_motivation}</p>
//               </div>
//             )}

//             {candidature.commentaires_candidat && (
//               <div className={styles.commentairesCandidant}>
//                 <h4>Commentaires du candidat :</h4>
//                 <p>{candidature.commentaires_candidat}</p>
//               </div>
//             )}

//             {candidature.commentaires_recruteur && (
//               <div className={styles.feedbackRecruteur}>
//                 <h4>Vos commentaires :</h4>
//                 <p>{candidature.commentaires_recruteur}</p>
//               </div>
//             )}
//           </div>
//         )}
//         {showTraitementForm && (
//           <div className={styles.traitementForm}>
//             <form onSubmit={handleTraitementSubmit}>
//               <h4>
//                 {traitementData.action === "accepter" &&
//                   "Accepter la candidature"}
//                 {traitementData.action === "refuser" &&
//                   "Refuser la candidature"}
//                 {traitementData.action === "en_cours" &&
//                   "Mettre en cours d'examen"}
//               </h4>

//               <div className={styles.formGroup}>
//                 <label htmlFor="commentaires">Commentaires :</label>
//                 <textarea
//                   id="commentaires"
//                   value={traitementData.commentaires}
//                   onChange={(e) =>
//                     setTraitementData({
//                       ...traitementData,
//                       commentaires: e.target.value,
//                     })
//                   }
//                   placeholder="Votre message au candidat..."
//                   className={styles.textarea}
//                   rows="3"
//                 />
//               </div>

//               {traitementData.action !== "en_cours" && (
//                 <div className={styles.formGroup}>
//                   <label htmlFor="note">Note (1-10) :</label>
//                   <input
//                     type="number"
//                     id="note"
//                     min="1"
//                     max="10"
//                     value={traitementData.note}
//                     onChange={(e) =>
//                       setTraitementData({
//                         ...traitementData,
//                         note: e.target.value,
//                       })
//                     }
//                     className={styles.noteInput}
//                   />
//                 </div>
//               )}

//               <div className={styles.formActions}>
//                 <button
//                   type="button"
//                   onClick={handleCancelTraitement}
//                   className={styles.cancelButton}
//                   disabled={processing}
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className={styles.submitButton}
//                   disabled={processing}
//                 >
//                   {processing ? "Traitement..." : "Confirmer"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const CandidatureRecueCard = ({ candidature, onTraiter, onOpenModal }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showTraitementForm, setShowTraitementForm] = useState(false);
  const [traitementData, setTraitementData] = useState({
    action: "",
    commentaires: "",
    note: "",
  });

  const handleDownloadCV = async () => {
    try {
      await downloadCandidatureCV(candidature.id);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      en_attente: { label: "En attente", class: "pending" },
      en_cours: { label: "En cours", class: "inProgress" },
      acceptee: { label: "Acceptée", class: "accepted" },
      refusee: { label: "Refusée", class: "rejected" },
      retiree: { label: "Retirée", class: "withdrawn" },
    };
    return statusMap[status] || { label: status, class: "unknown" };
  };

  const canProcess = ["en_attente", "en_cours"].includes(candidature.status);
  const statusInfo = getStatusDisplay(candidature.status);

  const handleTraiterAction = (action) => {
    setTraitementData({ ...traitementData, action });
    setShowTraitementForm(true);
  };

  const handleTraitementSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const data = {
        commentaires: traitementData.commentaires,
        ...(traitementData.note && { note: parseInt(traitementData.note) }),
      };

      await onTraiter(candidature.id, traitementData.action, data);
      setShowTraitementForm(false);
      setTraitementData({ action: "", commentaires: "", note: "" });
    } catch (error) {
      console.error("Erreur lors du traitement:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelTraitement = () => {
    setShowTraitementForm(false);
    setTraitementData({ action: "", commentaires: "", note: "" });
  };

  // Nouvelle fonction pour ouvrir le modal
  const handleOpenDetailModal = () => {
    if (onOpenModal) {
      onOpenModal(candidature);
    }
  };

  return (
    <div className={`${styles.candidatureCard} ${styles[statusInfo.class]}`}>
      <div className={styles.cardHeader}>
        <div className={styles.candidatInfo}>
          <h3 className={styles.candidatName}>
            {candidature.stagiaire?.prenom} {candidature.stagiaire?.nom}
          </h3>
          <div className={styles.candidatureMetadata}>
            <span className={styles.niveau}>{candidature.niveau_etudes}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.datePostulation}>
              Postulé le {formatDate(candidature.date_debut)}
            </span>
          </div>
        </div>
        <div className={styles.statusAndActions}>
          <span className={`${styles.status} ${styles[statusInfo.class]}`}>
            {statusInfo.label}
          </span>
          {candidature.note_recruteur && (
            <div className={styles.note}>
              Note: {candidature.note_recruteur}/10
            </div>
          )}
        </div>
      </div>

      <div className={styles.offreInfo}>
        <Link
          to={`/offres/${candidature.offre_id}`}
          className={styles.offreLink}
        >
          {candidature.offre?.titre}
        </Link>
      </div>

      <div className={styles.cardContent}>
        {candidature.competences && (
          <div className={styles.competences}>
            <strong>Compétences :</strong>
            <div className={styles.competencesTags}>
              {candidature.competences
                .split(",")
                .slice(0, 4)
                .map((competence, index) => (
                  <span key={index} className={styles.competenceTag}>
                    {competence.trim()}
                  </span>
                ))}
              {candidature.competences.split(",").length > 4 && (
                <span className={styles.moreCompetences}>
                  +{candidature.competences.split(",").length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        <div className={styles.cardActions}>
          <div className={styles.primaryActions}>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={styles.detailsButton}
            >
              {showDetails ? "Masquer" : "Voir détails"}
            </button>

            {/* NOUVEAU BOUTON POUR OUVRIR LE MODAL */}
            <button
              onClick={handleOpenDetailModal}
              className={styles.openModalButton}
              type="button"
            >
              📋 Voir en détail
            </button>

            {candidature.cv && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>CV :</span>
                <span className={styles.detailValue}>
                  <button
                    onClick={handleDownloadCV}
                    className={styles.downloadLink}
                    type="button"
                  >
                    📄 Télécharger CV
                  </button>
                </span>
              </div>
            )}
          </div>
          
          {canProcess && (
            <div className={styles.processActions}>
              <button
                onClick={() => handleTraiterAction("en_cours")}
                className={styles.inProgressButton}
                disabled={processing || candidature.status === "en_cours"}
              >
                Mettre en cours
              </button>
              <button
                onClick={() => handleTraiterAction("accepter")}
                className={styles.acceptButton}
                disabled={processing}
              >
                Accepter
              </button>
              <button
                onClick={() => handleTraiterAction("refuser")}
                className={styles.rejectButton}
                disabled={processing}
              >
                Refuser
              </button>
            </div>
          )}
        </div>

        {showDetails && (
          <div className={styles.detailsSection}>
            {candidature.lettre_motivation && (
              <div className={styles.lettreMotivation}>
                <h4>Lettre de motivation :</h4>
                <p>{candidature.lettre_motivation}</p>
              </div>
            )}

            {candidature.commentaires_candidat && (
              <div className={styles.commentairesCandidant}>
                <h4>Commentaires du candidat :</h4>
                <p>{candidature.commentaires_candidat}</p>
              </div>
            )}

            {candidature.commentaires_recruteur && (
              <div className={styles.feedbackRecruteur}>
                <h4>Vos commentaires :</h4>
                <p>{candidature.commentaires_recruteur}</p>
              </div>
            )}
          </div>
        )}

        {showTraitementForm && (
          <div className={styles.traitementForm}>
            <form onSubmit={handleTraitementSubmit}>
              <h4>
                {traitementData.action === "accepter" &&
                  "Accepter la candidature"}
                {traitementData.action === "refuser" &&
                  "Refuser la candidature"}
                {traitementData.action === "en_cours" &&
                  "Mettre en cours d'examen"}
              </h4>

              <div className={styles.formGroup}>
                <label htmlFor="commentaires">Commentaires :</label>
                <textarea
                  id="commentaires"
                  value={traitementData.commentaires}
                  onChange={(e) =>
                    setTraitementData({
                      ...traitementData,
                      commentaires: e.target.value,
                    })
                  }
                  placeholder="Votre message au candidat..."
                  className={styles.textarea}
                  rows="3"
                />
              </div>

              {traitementData.action !== "en_cours" && (
                <div className={styles.formGroup}>
                  <label htmlFor="note">Note (1-10) :</label>
                  <input
                    type="number"
                    id="note"
                    min="1"
                    max="10"
                    value={traitementData.note}
                    onChange={(e) =>
                      setTraitementData({
                        ...traitementData,
                        note: e.target.value,
                      })
                    }
                    className={styles.noteInput}
                  />
                </div>
              )}

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleCancelTraitement}
                  className={styles.cancelButton}
                  disabled={processing}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={processing}
                >
                  {processing ? "Traitement..." : "Confirmer"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatureRecueCard;
