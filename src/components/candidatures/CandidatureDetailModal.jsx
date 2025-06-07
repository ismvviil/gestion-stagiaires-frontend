import React, { useState , useEffect } from "react";
import { traiterCandidature } from "../../services/candidatureService";
import styles from "./CandidatureDetailModal.module.css";
import { downloadCV } from "../../services/candidatureService";

// const CandidatureDetailModal = ({ candidature, isOpen, onClose, onUpdate }) => {
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [traitementData, setTraitementData] = useState({
//     action: "",
//     commentaires: "",
//     note: "",
//   });

//   const [showTraitementForm, setShowTraitementForm] = useState(false);

//   if (!isOpen || !candidature) return null;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("fr-FR", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleDownloadCV = async () => {
//     try {
//       await downloadCV(candidature.id);
//     } catch (error) {
//       console.error("Erreur lors du téléchargement:", error);
//       // Vous pouvez afficher un message d'erreur à l'utilisateur
//     }
//   };

//   const getStatusDisplay = (status) => {
//     const statusMap = {
//       en_attente: { label: "En attente", class: "pending", color: "#f59e0b" },
//       en_cours: {
//         label: "En cours d'examen",
//         class: "inProgress",
//         color: "#3b82f6",
//       },
//       acceptee: { label: "Acceptée", class: "accepted", color: "#10b981" },
//       refusee: { label: "Refusée", class: "rejected", color: "#ef4444" },
//       retiree: { label: "Retirée", class: "withdrawn", color: "#6b7280" },
//     };
//     return (
//       statusMap[status] || { label: status, class: "unknown", color: "#6b7280" }
//     );
//   };

//   const canProcess = ["en_attente", "en_cours"].includes(candidature.status);
//   const statusInfo = getStatusDisplay(candidature.status);

//   const handleTraiterAction = (action) => {
//     setTraitementData({ action, commentaires: "", note: "" });
//     setShowTraitementForm(true);
//     setError("");
//   };

//   const handleTraitementSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError("");

//     try {
//       const data = {
//         commentaires: traitementData.commentaires,
//         ...(traitementData.note && { note: parseInt(traitementData.note) }),
//       };

//       const updatedCandidature = await traiterCandidature(
//         candidature.id,
//         traitementData.action,
//         data
//       );
//       onUpdate(updatedCandidature);
//       setShowTraitementForm(false);
//       setTraitementData({ action: "", commentaires: "", note: "" });
//     } catch (err) {
//       setError(err.response?.data?.detail || "Erreur lors du traitement");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowTraitementForm(false);
//     setTraitementData({ action: "", commentaires: "", note: "" });
//     setError("");
//     onClose();
//   };

//   return (
//     <div className={styles.modalOverlay} onClick={handleCloseModal}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <div className={styles.modalHeader}>
//           <h2 className={styles.modalTitle}>
//             Candidature de {candidature.stagiaire?.prenom}{" "}
//             {candidature.stagiaire?.nom}
//           </h2>
//           <button onClick={handleCloseModal} className={styles.closeButton}>
//             ✕
//           </button>
//         </div>

//         <div className={styles.modalBody}>
//           {/* Informations générales */}
//           <div className={styles.section}>
//             <div className={styles.sectionHeader}>
//               <h3>Informations générales</h3>
//               <span
//                 className={`${styles.statusBadge} ${styles[statusInfo.class]}`}
//                 style={{ backgroundColor: statusInfo.color }}
//               >
//                 {statusInfo.label}
//               </span>
//             </div>

//             <div className={styles.infoGrid}>
//               <div className={styles.infoItem}>
//                 <span className={styles.infoLabel}>Offre :</span>
//                 <span className={styles.infoValue}>
//                   {candidature.offre?.titre}
//                 </span>
//               </div>
//               <div className={styles.infoItem}>
//                 <span className={styles.infoLabel}>Niveau d'études :</span>
//                 <span className={styles.infoValue}>
//                   {candidature.niveau_etudes}
//                 </span>
//               </div>
//               <div className={styles.infoItem}>
//                 <span className={styles.infoLabel}>Date de candidature :</span>
//                 <span className={styles.infoValue}>
//                   {formatDate(candidature.date_debut)}
//                 </span>
//               </div>
//               {candidature.note_recruteur && (
//                 <div className={styles.infoItem}>
//                   <span className={styles.infoLabel}>Note attribuée :</span>
//                   <span className={styles.infoValue}>
//                     <span className={styles.noteValue}>
//                       {candidature.note_recruteur}/10
//                     </span>
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Compétences */}
//           {candidature.competences && (
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Compétences</h3>
//               <div className={styles.competencesTags}>
//                 {candidature.competences.split(",").map((competence, index) => (
//                   <span key={index} className={styles.competenceTag}>
//                     {competence.trim()}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Lettre de motivation */}
//           {candidature.lettre_motivation && (
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Lettre de motivation</h3>
//               <div className={styles.textContent}>
//                 {candidature.lettre_motivation
//                   .split("\n")
//                   .map((paragraph, index) => (
//                     <p key={index}>{paragraph}</p>
//                   ))}
//               </div>
//             </div>
//           )}

//           {/* Commentaires du candidat */}
//           {candidature.commentaires_candidat && (
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Commentaires du candidat</h3>
//               <div className={styles.textContent}>
//                 <p>{candidature.commentaires_candidat}</p>
//               </div>
//             </div>
//           )}

//           {/* Commentaires du recruteur */}
//           {candidature.commentaires_recruteur && (
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Vos commentaires</h3>
//               <div className={styles.textContent}>
//                 <p>{candidature.commentaires_recruteur}</p>
//               </div>
//             </div>
//           )}

//           {/* CV */}
//           {/* {candidature.cv && (
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>CV</h3>
//               <div className={styles.cvSection}>
//                 <a
//                   href={`/api/v1/candidatures/${candidature.id}/download-cv`}
//                   className={styles.downloadCvButton}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   📄 Télécharger le CV
//                 </a>
//               </div>
//             </div>
//           )} */}
//           {candidature.cv && (
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>CV</h3>
//               <div className={styles.cvSection}>
//                 <button
//                   onClick={handleDownloadCV}
//                   className={styles.downloadCvButton}
//                   type="button"
//                 >
//                   📄 Télécharger le CV
//                 </button>
//               </div>
//             </div>
//           )}

//           {error && <div className={styles.errorMessage}>{error}</div>}

//           {/* Formulaire de traitement */}
//           {!showTraitementForm && canProcess && (
//             <div className={styles.actionButtons}>
//               <button
//                 onClick={() => handleTraiterAction("en_cours")}
//                 className={`${styles.actionButton} ${styles.inProgressButton}`}
//                 disabled={candidature.status === "en_cours"}
//               >
//                 Mettre en cours
//               </button>
//               <button
//                 onClick={() => handleTraiterAction("accepter")}
//                 className={`${styles.actionButton} ${styles.acceptButton}`}
//               >
//                 Accepter
//               </button>
//               <button
//                 onClick={() => handleTraiterAction("refuser")}
//                 className={`${styles.actionButton} ${styles.rejectButton}`}
//               >
//                 Refuser
//               </button>
//             </div>
//           )}
//           {showTraitementForm && (
//             <div className={styles.traitementForm}>
//               <h3>
//                 {traitementData.action === "accepter" &&
//                   "Accepter la candidature"}
//                 {traitementData.action === "refuser" &&
//                   "Refuser la candidature"}
//                 {traitementData.action === "en_cours" &&
//                   "Mettre en cours d'examen"}
//               </h3>

//               <form onSubmit={handleTraitementSubmit}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="commentaires">
//                     Message au candidat{" "}
//                     {traitementData.action !== "en_cours" ? "*" : ""}:
//                   </label>
//                   <textarea
//                     id="commentaires"
//                     value={traitementData.commentaires}
//                     onChange={(e) =>
//                       setTraitementData({
//                         ...traitementData,
//                         commentaires: e.target.value,
//                       })
//                     }
//                     required={traitementData.action !== "en_cours"}
//                     className={styles.textarea}
//                     rows="4"
//                     placeholder={
//                       traitementData.action === "accepter"
//                         ? "Félicitations ! Nous sommes ravis de vous accueillir..."
//                         : traitementData.action === "refuser"
//                         ? "Merci pour votre candidature. Malheureusement..."
//                         : "Votre candidature est en cours d'examen..."
//                     }
//                   />
//                 </div>

//                 {traitementData.action !== "en_cours" && (
//                   <div className={styles.formGroup}>
//                     <label htmlFor="note">Note d'évaluation (1-10) :</label>
//                     <input
//                       type="number"
//                       id="note"
//                       min="1"
//                       max="10"
//                       value={traitementData.note}
//                       onChange={(e) =>
//                         setTraitementData({
//                           ...traitementData,
//                           note: e.target.value,
//                         })
//                       }
//                       className={styles.noteInput}
//                     />
//                   </div>
//                 )}

//                 <div className={styles.formActions}>
//                   <button
//                     type="button"
//                     onClick={() => setShowTraitementForm(false)}
//                     className={styles.cancelButton}
//                     disabled={processing}
//                   >
//                     Annuler
//                   </button>
//                   <button
//                     type="submit"
//                     className={`${styles.submitButton} ${
//                       traitementData.action === "accepter"
//                         ? styles.accept
//                         : traitementData.action === "refuser"
//                         ? styles.reject
//                         : styles.inProgress
//                     }`}
//                     disabled={processing}
//                   >
//                     {processing ? "Traitement..." : "Confirmer"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
const CandidatureDetailModal = ({ candidature, isOpen, onClose, onUpdate }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [traitementData, setTraitementData] = useState({
    action: "",
    commentaires: "",
    note: "",
  });

  const [showTraitementForm, setShowTraitementForm] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setShowTraitementForm(false);
      setTraitementData({ action: "", commentaires: "", note: "" });
      setError("");
    }
  }, [isOpen]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadCV = async () => {
    try {
      await downloadCV(candidature.id);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      setError("Erreur lors du téléchargement du CV");
      setTimeout(() => setError(""), 3000);
    }
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      en_attente: { label: "En attente", class: "pending", color: "#f59e0b" },
      en_cours: {
        label: "En cours d'examen",
        class: "inProgress",
        color: "#3b82f6",
      },
      acceptee: { label: "Acceptée", class: "accepted", color: "#10b981" },
      refusee: { label: "Refusée", class: "rejected", color: "#ef4444" },
      retiree: { label: "Retirée", class: "withdrawn", color: "#6b7280" },
    };
    return (
      statusMap[status] || { label: status, class: "unknown", color: "#6b7280" }
    );
  };

  const handleTraiterAction = (action) => {
    setTraitementData({ action, commentaires: "", note: "" });
    setShowTraitementForm(true);
    setError("");
  };

  const handleTraitementSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const data = {
        commentaires: traitementData.commentaires,
        ...(traitementData.note && { note: parseInt(traitementData.note) }),
      };

      const updatedCandidature = await traiterCandidature(
        candidature.id,
        traitementData.action,
        data
      );
      
      // Créer un objet candidature mis à jour avec les nouvelles données
      const candidatureUpdated = {
        ...candidature,
        status:
          traitementData.action === "accepter"
            ? "acceptee"
            : traitementData.action === "refuser"
            ? "refusee"
            : "en_cours",
        commentaires_recruteur: data.commentaires,
        note_recruteur: data.note,
        ...updatedCandidature
      };

      onUpdate(candidatureUpdated);
      setShowTraitementForm(false);
      setTraitementData({ action: "", commentaires: "", note: "" });
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur lors du traitement");
    } finally {
      setProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowTraitementForm(false);
    setTraitementData({ action: "", commentaires: "", note: "" });
    setError("");
    onClose();
  };

  // Ne pas rendre le modal si pas ouvert ou pas de candidature
  if (!isOpen || !candidature) {
    return null;
  }

  const canProcess = ["en_attente", "en_cours"].includes(candidature.status);
  const statusInfo = getStatusDisplay(candidature.status);

  return (
    <div className={styles.modalOverlay} onClick={handleCloseModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Candidature de {candidature.stagiaire?.prenom || candidature.prenom || "N/A"}{" "}
            {candidature.stagiaire?.nom || candidature.nom || "N/A"}
          </h2>
          <button onClick={handleCloseModal} className={styles.closeButton}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Informations générales */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Informations générales</h3>
              <span
                className={`${styles.statusBadge} ${styles[statusInfo.class]}`}
                style={{ backgroundColor: statusInfo.color }}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Offre :</span>
                <span className={styles.infoValue}>
                  {candidature.offre?.titre || "Non spécifiée"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Niveau d'études :</span>
                <span className={styles.infoValue}>
                  {candidature.niveau_etudes || "Non spécifié"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Date de candidature :</span>
                <span className={styles.infoValue}>
                  {candidature.date_debut ? formatDate(candidature.date_debut) : "Non spécifiée"}
                </span>
              </div>
              {candidature.note_recruteur && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Note attribuée :</span>
                  <span className={styles.infoValue}>
                    <span className={styles.noteValue}>
                      {candidature.note_recruteur}/10
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Compétences */}
          {candidature.competences && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Compétences</h3>
              <div className={styles.competencesTags}>
                {candidature.competences.split(",").map((competence, index) => (
                  <span key={index} className={styles.competenceTag}>
                    {competence.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lettre de motivation */}
          {candidature.lettre_motivation && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Lettre de motivation</h3>
              <div className={styles.textContent}>
                {candidature.lettre_motivation
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </div>
          )}

          {/* Commentaires du candidat */}
          {candidature.commentaires_candidat && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Commentaires du candidat</h3>
              <div className={styles.textContent}>
                <p>{candidature.commentaires_candidat}</p>
              </div>
            </div>
          )}

          {/* Commentaires du recruteur */}
          {candidature.commentaires_recruteur && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Vos commentaires</h3>
              <div className={styles.textContent}>
                <p>{candidature.commentaires_recruteur}</p>
              </div>
            </div>
          )}

          {/* CV */}
          {candidature.cv && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>CV</h3>
              <div className={styles.cvSection}>
                <button
                  onClick={handleDownloadCV}
                  className={styles.downloadCvButton}
                  type="button"
                >
                  📄 Télécharger le CV
                </button>
              </div>
            </div>
          )}

          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Formulaire de traitement */}
          {!showTraitementForm && canProcess && (
            <div className={styles.actionButtons}>
              <button
                onClick={() => handleTraiterAction("en_cours")}
                className={`${styles.actionButton} ${styles.inProgressButton}`}
                disabled={candidature.status === "en_cours"}
              >
                Mettre en cours
              </button>
              <button
                onClick={() => handleTraiterAction("accepter")}
                className={`${styles.actionButton} ${styles.acceptButton}`}
              >
                Accepter
              </button>
              <button
                onClick={() => handleTraiterAction("refuser")}
                className={`${styles.actionButton} ${styles.rejectButton}`}
              >
                Refuser
              </button>
            </div>
          )}

          {showTraitementForm && (
            <div className={styles.traitementForm}>
              <h3>
                {traitementData.action === "accepter" &&
                  "Accepter la candidature"}
                {traitementData.action === "refuser" &&
                  "Refuser la candidature"}
                {traitementData.action === "en_cours" &&
                  "Mettre en cours d'examen"}
              </h3>

              <form onSubmit={handleTraitementSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="commentaires">
                    Message au candidat{" "}
                    {traitementData.action !== "en_cours" ? "*" : ""}:
                  </label>
                  <textarea
                    id="commentaires"
                    value={traitementData.commentaires}
                    onChange={(e) =>
                      setTraitementData({
                        ...traitementData,
                        commentaires: e.target.value,
                      })
                    }
                    required={traitementData.action !== "en_cours"}
                    className={styles.textarea}
                    rows="4"
                    placeholder={
                      traitementData.action === "accepter"
                        ? "Félicitations ! Nous sommes ravis de vous accueillir..."
                        : traitementData.action === "refuser"
                        ? "Merci pour votre candidature. Malheureusement..."
                        : "Votre candidature est en cours d'examen..."
                    }
                  />
                </div>

                {traitementData.action !== "en_cours" && (
                  <div className={styles.formGroup}>
                    <label htmlFor="note">Note d'évaluation (1-10) :</label>
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
                    onClick={() => setShowTraitementForm(false)}
                    className={styles.cancelButton}
                    disabled={processing}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`${styles.submitButton} ${
                      traitementData.action === "accepter"
                        ? styles.accept
                        : traitementData.action === "refuser"
                        ? styles.reject
                        : styles.inProgress
                    }`}
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
    </div>
  );
};
export default CandidatureDetailModal;
