// import React, { useState, useEffect } from "react";
// import {
//   FaUser,
//   FaBuilding,
//   FaCalendarAlt,
//   FaStar,
//   FaEdit,
//   FaCheck,
//   FaClock,
//   FaDownload,
//   FaCertificate,
//   FaQrcode,
//   FaEye,
//   FaThumbsUp,
//   FaThumbsDown,
//   FaFileAlt,
//   FaPrint,
// } from "react-icons/fa";
// import styles from "./EvaluationDetails.module.css";
// import axios from "../../api/axios";
// const EvaluationDetails = ({ evaluationId, onEdit, onClose }) => {
//   const [evaluation, setEvaluation] = useState(null);
//   const [certificat, setCertificat] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showQRCode, setShowQRCode] = useState(false);

//   useEffect(() => {
//     if (evaluationId) {
//       fetchEvaluationDetails();
//     }
//   }, [evaluationId]);

  

//   const fetchEvaluationDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/evaluations/${evaluationId}`);
//       const data = response.data;
//       setEvaluation(data); // Chercher le certificat si l'évaluation est validée

//       if (data.statut === "validee") {
//         fetchCertificat(data.id);
//       }
//     } catch (error) {
//       console.error("Erreur lors du chargement de l'évaluation:", error);
//     } finally {
//       setLoading(false);
//     }
//   };



//   const fetchCertificat = async (evalId) => {
//     try {
//       const response = await axios.get(
//         `/evaluations/certificats/by-evaluation/${evalId}`
//       );
//       setCertificat(response.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement du certificat:", error);
//     }
//   };

 

//   const handleStatusChange = async (action) => {
//     try {
//       const payload = action === "valider" ? { valider: true } : {};
//       await axios.post(`/evaluations/${evaluationId}/${action}`, payload);
//       fetchEvaluationDetails(); // Recharger les données
//     } catch (error) {
//       console.error(`Erreur lors de ${action}:`, error);
//     }
//   };

 

//   const generateCertificate = async () => {
//     try {
//       const response = await axios.post(
//         `/evaluations/certificats/generer`,
//         null,
//         {
//           params: {
//             evaluation_id: evaluationId,
//           },
//         }
//       );

//       const result = response.data;
//       alert(`Certificat généré avec succès! Code: ${result.code_unique}`);
//       fetchEvaluationDetails();
//     } catch (error) {
//       console.error("Erreur lors de la génération du certificat:", error);
//     }
//   };

  

//   const downloadPDF = async () => {
//     if (!certificat) return;

//     try {
//       const response = await axios.get(
//         `/evaluations/certificats/${certificat.id}/pdf`,
//         {
//           responseType: "blob", // très important pour recevoir un fichier binaire
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `certificat_${certificat.code_unique}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Erreur lors du téléchargement:", error);
//     }
//   };

  
//   const showQRCodeModal = async () => {
//     if (!certificat) return;

//     try {
//       const response = await axios.get(
//         `/evaluations/certificats/${certificat.id}/qr-code`
//       );
//       setShowQRCode(response.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement du QR code:", error);
//     }
//   };

//   const renderStarRating = (note) => {
//     if (!note) return <span className={styles.noRating}>Non noté</span>;

//     return (
//       <div className={styles.starRating}>
//         {[...Array(10)].map((_, i) => (
//           <FaStar
//             key={i}
//             className={`${styles.star} ${
//               i < note ? styles.starFilled : styles.starEmpty
//             }`}
//           />
//         ))}
//         <span className={styles.noteValue}>{note}/10</span>
//       </div>
//     );
//   };

//   const getStatusConfig = (statut) => {
//     const configs = {
//       brouillon: {
//         icon: FaEdit,
//         className: styles.statusDraft,
//         label: "Brouillon",
//         color: "#f39c12",
//       },
//       terminee: {
//         icon: FaClock,
//         className: styles.statusCompleted,
//         label: "Terminée",
//         color: "#3498db",
//       },
//       validee: {
//         icon: FaCheck,
//         className: styles.statusValidated,
//         label: "Validée",
//         color: "#27ae60",
//       },
//     };
//     return configs[statut] || configs.brouillon;
//   };

//   const renderActionButtons = () => {
//     if (!evaluation) return null;

//     const buttons = [];

//     // Bouton modifier (si brouillon)
//     if (evaluation.statut === "brouillon") {
//       buttons.push(
//         <button
//           key="edit"
//           onClick={() => onEdit(evaluation)}
//           className={`${styles.actionButton} ${styles.editButton}`}
//         >
//           <FaEdit className={styles.buttonIcon} />
//           Modifier
//         </button>
//       );
//       buttons.push(
//         <button
//           key="complete"
//           onClick={() => handleStatusChange("terminer")}
//           className={`${styles.actionButton} ${styles.completeButton}`}
//         >
//           <FaClock className={styles.buttonIcon} />
//           Terminer
//         </button>
//       );
//     }

//     // Bouton valider (si terminée)
//     if (evaluation.statut === "terminee") {
//       buttons.push(
//         <button
//           key="validate"
//           onClick={() => handleStatusChange("valider")}
//           className={`${styles.actionButton} ${styles.validateButton}`}
//         >
//           <FaCheck className={styles.buttonIcon} />
//           Valider
//         </button>
//       );
//     }

//     // Boutons certificat (si validée)
//     if (evaluation.statut === "validee") {
//       if (!certificat) {
//         buttons.push(
//           <button
//             key="generate"
//             onClick={generateCertificate}
//             className={`${styles.actionButton} ${styles.certificateButton}`}
//           >
//             <FaCertificate className={styles.buttonIcon} />
//             Générer le certificat
//           </button>
//         );
//       } else {
//         buttons.push(
//           <button
//             key="download"
//             onClick={downloadPDF}
//             className={`${styles.actionButton} ${styles.downloadButton}`}
//           >
//             <FaDownload className={styles.buttonIcon} />
//             Télécharger PDF
//           </button>
//         );

//         buttons.push(
//           <button
//             key="qrcode"
//             onClick={showQRCodeModal}
//             className={`${styles.actionButton} ${styles.qrButton}`}
//           >
//             <FaQrcode className={styles.buttonIcon} />
//             QR Code
//           </button>
//         );
//       }
//     }

//     return buttons;
//   };

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <div className={styles.spinner}></div>
//         <p>Chargement des détails...</p>
//       </div>
//     );
//   }

//   if (!evaluation) {
//     return (
//       <div className={styles.error}>
//         <p>Évaluation non trouvée</p>
//       </div>
//     );
//   }

//   const statusConfig = getStatusConfig(evaluation.statut);
//   const IconComponent = statusConfig.icon;

//   return (
//     <div className={styles.evaluationDetails}>
//       {/* Header */}
//       <div className={styles.header}>
//         <div className={styles.headerLeft}>
//           <h2 className={styles.title}>
//             <FaFileAlt className={styles.titleIcon} />
//             Détails de l'évaluation
//           </h2>
//           <div className={styles.statusBadge}>
//             <IconComponent className={styles.statusIcon} />
//             {statusConfig.label}
//           </div>
//         </div>
//         <div className={styles.headerRight}>
//           <button onClick={onClose} className={styles.closeButton}>
//             ×
//           </button>
//         </div>
//       </div>

//       {/* Informations générales */}
//       <div className={styles.generalInfo}>
//         <div className={styles.infoCard}>
//           <h3 className={styles.cardTitle}>
//             <FaUser className={styles.cardIcon} />
//             Informations du stage
//           </h3>
//           <div className={styles.infoGrid}>
//             <div className={styles.infoItem}>
//               <span className={styles.label}>Stagiaire:</span>
//               <span className={styles.value}>
//                 {evaluation.stage?.stagiaire?.prenom}{" "}
//                 {evaluation.stage?.stagiaire?.nom}
//               </span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.label}>Entreprise:</span>
//               <span className={styles.value}>
//                 {evaluation.stage?.entreprise?.raison_social}
//               </span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.label}>Titre du stage:</span>
//               <span className={styles.value}>
//                 {evaluation.stage?.titre || "Non spécifié"}
//               </span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.label}>Évaluateur:</span>
//               <span className={styles.value}>
//                 {evaluation.evaluateur?.prenom} {evaluation.evaluateur?.nom}
//               </span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.label}>Date d'évaluation:</span>
//               <span className={styles.value}>
//                 {new Date(evaluation.date_evaluation).toLocaleDateString(
//                   "fr-FR"
//                 )}
//               </span>
//             </div>
//             {evaluation.date_validation && (
//               <div className={styles.infoItem}>
//                 <span className={styles.label}>Date de validation:</span>
//                 <span className={styles.value}>
//                   {new Date(evaluation.date_validation).toLocaleDateString(
//                     "fr-FR"
//                   )}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Note globale */}
//         <div className={styles.scoreCard}>
//           <h3 className={styles.cardTitle}>
//             <FaStar className={styles.cardIcon} />
//             Note globale
//           </h3>
//           <div className={styles.globalScore}>
//             <div className={styles.scoreDisplay}>
//               {evaluation.note_globale ? (
//                 <>
//                   <span className={styles.scoreNumber}>
//                     {evaluation.note_globale.toFixed(1)}
//                   </span>
//                   <span className={styles.scoreMax}>/10</span>
//                 </>
//               ) : (
//                 <span className={styles.noScore}>Non calculée</span>
//               )}
//             </div>
//             {evaluation.note_globale &&
//               renderStarRating(Math.round(evaluation.note_globale))}
//           </div>
//         </div>
//       </div>

//       {/* Évaluation détaillée par critères */}
//       <div className={styles.criteriaSection}>
//         <h3 className={styles.sectionTitle}>Évaluation par critères</h3>
//         <div className={styles.criteriaGrid}>
//           {evaluation.details?.map((detail) => (
//             <div key={detail.id} className={styles.criteriaCard}>
//               <div className={styles.criteriaHeader}>
//                 <h4 className={styles.criteriaName}>{detail.critere?.nom}</h4>
//                 <div className={styles.criteriaNote}>
//                   {renderStarRating(detail.note)}
//                 </div>
//               </div>
//               {detail.critere?.description && (
//                 <p className={styles.criteriaDescription}>
//                   {detail.critere.description}
//                 </p>
//               )}
//               {detail.commentaire && (
//                 <div className={styles.criteriaComment}>
//                   <strong>Commentaire:</strong>
//                   <p>{detail.commentaire}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Commentaires et recommandations */}
//       <div className={styles.commentsSection}>
//         <div className={styles.commentCard}>
//           <h3 className={styles.cardTitle}>Commentaire général</h3>
//           <p className={styles.commentText}>
//             {evaluation.commentaire_general || "Aucun commentaire général"}
//           </p>
//         </div>

//         <div className={styles.recommendationsGrid}>
//           <div className={styles.recommendationCard}>
//             <h4 className={styles.recommendationTitle}>
//               <FaThumbsUp className={styles.recommendationIcon} />
//               Points forts
//             </h4>
//             <p className={styles.recommendationText}>
//               {evaluation.points_forts || "Non spécifiés"}
//             </p>
//           </div>

//           <div className={styles.recommendationCard}>
//             <h4 className={styles.recommendationTitle}>
//               <FaThumbsDown className={styles.recommendationIcon} />
//               Points d'amélioration
//             </h4>
//             <p className={styles.recommendationText}>
//               {evaluation.points_amelioration || "Non spécifiés"}
//             </p>
//           </div>

//           <div className={styles.recommendationCard}>
//             <h4 className={styles.recommendationTitle}>
//               <FaFileAlt className={styles.recommendationIcon} />
//               Recommandations
//             </h4>
//             <p className={styles.recommendationText}>
//               {evaluation.recommandations || "Aucune recommandation"}
//             </p>
//           </div>
//         </div>

//         {evaluation.recommande_embauche !== null && (
//           <div className={styles.hiringRecommendation}>
//             <h4 className={styles.hiringTitle}>Recommandation d'embauche</h4>
//             <div
//               className={`${styles.hiringBadge} ${
//                 evaluation.recommande_embauche
//                   ? styles.positive
//                   : styles.negative
//               }`}
//             >
//               {evaluation.recommande_embauche ? (
//                 <>
//                   <FaThumbsUp className={styles.hiringIcon} />
//                   Recommandé pour l'embauche
//                 </>
//               ) : (
//                 <>
//                   <FaThumbsDown className={styles.hiringIcon} />
//                   Non recommandé pour l'embauche
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Certificat si disponible */}
//       {certificat && (
//         <div className={styles.certificateSection}>
//           <h3 className={styles.sectionTitle}>
//             <FaCertificate className={styles.sectionIcon} />
//             Certificat de stage
//           </h3>
//           <div className={styles.certificateCard}>
//             <div className={styles.certificateInfo}>
//               <div className={styles.certificateDetail}>
//                 <span className={styles.label}>Code unique:</span>
//                 <span className={styles.value}>{certificat.code_unique}</span>
//               </div>
//               <div className={styles.certificateDetail}>
//                 <span className={styles.label}>Date de génération:</span>
//                 <span className={styles.value}>
//                   {new Date(certificat.date_generation).toLocaleDateString(
//                     "fr-FR"
//                   )}
//                 </span>
//               </div>
//               <div className={styles.certificateDetail}>
//                 <span className={styles.label}>Mention:</span>
//                 <span className={styles.value}>{certificat.mention}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Actions */}
//       <div className={styles.actions}>{renderActionButtons()}</div>

//       {/* Modal QR Code */}
//       {showQRCode && (
//         <div className={styles.modal} onClick={() => setShowQRCode(false)}>
//           <div
//             className={styles.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className={styles.modalHeader}>
//               <h3>QR Code de vérification</h3>
//               <button
//                 onClick={() => setShowQRCode(false)}
//                 className={styles.modalClose}
//               >
//                 ×
//               </button>
//             </div>
//             <div className={styles.modalBody}>
//               <div className={styles.qrCodeContainer}>
//                 <img
//                   src={`data:image/png;base64,${showQRCode.qr_code_data}`}
//                   alt="QR Code du certificat"
//                   className={styles.qrCodeImage}
//                 />
//               </div>
//               <div className={styles.qrCodeInfo}>
//                 <p>
//                   <strong>Code:</strong> {showQRCode.code_unique}
//                 </p>
//                 <p>
//                   <strong>URL de vérification:</strong>
//                 </p>
//                 <code className={styles.verificationUrl}>
//                   {window.location.origin}
//                   {showQRCode.verification_url}
//                 </code>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationDetails;

import React, { useState, useEffect } from 'react';
import axios from "../../api/axios";
import { 
  FaFileAlt, 
  FaUser, 
  FaStar, 
  FaEdit, 
  FaClock, 
  FaCheck, 
  FaCertificate,
  FaDownload,
  FaQrcode,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import styles from './EvaluationDetails.module.css';

const EvaluationDetails = ({ evaluationId, onEdit, onClose }) => {
  const [evaluation, setEvaluation] = useState(null);
  const [certificat, setCertificat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    if (evaluationId) {
      fetchEvaluationDetails();
    }
  }, [evaluationId]);

  const fetchEvaluationDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/evaluations/${evaluationId}`);
      const data = response.data;
      
      // 🔍 Debug pour voir la structure des données
      console.log("📊 Données évaluation reçues:", data);
      
      setEvaluation(data);

      // Chercher le certificat si l'évaluation est validée
      if (data.statut === "validee") {
        fetchCertificat(data.id);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'évaluation:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificat = async (evalId) => {
    try {
      const response = await axios.get(
        `/evaluations/certificats/by-evaluation/${evalId}`
      );
      setCertificat(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement du certificat:", error);
    }
  };

  const handleStatusChange = async (action) => {
    try {
      const payload = action === "valider" ? { valider: true } : {};
      await axios.post(`/evaluations/${evaluationId}/${action}`, payload);
      fetchEvaluationDetails(); // Recharger les données
    } catch (error) {
      console.error(`Erreur lors de ${action}:`, error);
    }
  };

  const generateCertificate = async () => {
    try {
      const response = await axios.post(
        `/evaluations/certificats/generer`,
        null,
        {
          params: {
            evaluation_id: evaluationId,
          },
        }
      );

      const result = response.data;
      alert(`Certificat généré avec succès! Code: ${result.code_unique}`);
      fetchEvaluationDetails();
    } catch (error) {
      console.error("Erreur lors de la génération du certificat:", error);
    }
  };

  const downloadPDF = async () => {
    if (!certificat) return;

    try {
      const response = await axios.get(
        `/evaluations/certificats/${certificat.id}/pdf`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificat_${certificat.code_unique}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  const showQRCodeModal = async () => {
    if (!certificat) return;

    try {
      const response = await axios.get(
        `/evaluations/certificats/${certificat.id}/qr-code`
      );
      setShowQRCode(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement du QR code:", error);
    }
  };

  const renderStarRating = (note) => {
    if (!note && note !== 0) return <span className={styles.noRating}>Non noté</span>;

    return (
      <div className={styles.starRating}>
        {[...Array(10)].map((_, i) => (
          <FaStar
            key={i}
            className={`${styles.star} ${
              i < note ? styles.starFilled : styles.starEmpty
            }`}
          />
        ))}
        <span className={styles.noteValue}>{note}/10</span>
      </div>
    );
  };

  const getStatusConfig = (statut) => {
    const configs = {
      brouillon: {
        icon: FaEdit,
        className: styles.statusDraft,
        label: "Brouillon",
        color: "#f39c12",
      },
      terminee: {
        icon: FaClock,
        className: styles.statusCompleted,
        label: "Terminée",
        color: "#3498db",
      },
      validee: {
        icon: FaCheck,
        className: styles.statusValidated,
        label: "Validée",
        color: "#27ae60",
      },
    };
    return configs[statut] || configs.brouillon;
  };

  const renderActionButtons = () => {
    if (!evaluation) return null;

    const buttons = [];

    // Bouton modifier (si brouillon)
    if (evaluation.statut === "brouillon") {
      buttons.push(
        <button
          key="edit"
          onClick={() => onEdit(evaluation)}
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          <FaEdit className={styles.buttonIcon} />
          Modifier
        </button>
      );
      buttons.push(
        <button
          key="complete"
          onClick={() => handleStatusChange("terminer")}
          className={`${styles.actionButton} ${styles.completeButton}`}
        >
          <FaClock className={styles.buttonIcon} />
          Terminer
        </button>
      );
    }

    // Bouton valider (si terminée)
    if (evaluation.statut === "terminee") {
      buttons.push(
        <button
          key="validate"
          onClick={() => handleStatusChange("valider")}
          className={`${styles.actionButton} ${styles.validateButton}`}
        >
          <FaCheck className={styles.buttonIcon} />
          Valider
        </button>
      );
    }

    // Boutons certificat (si validée)
    if (evaluation.statut === "validee") {
      if (!certificat) {
        buttons.push(
          <button
            key="generate"
            onClick={generateCertificate}
            className={`${styles.actionButton} ${styles.certificateButton}`}
          >
            <FaCertificate className={styles.buttonIcon} />
            Générer le certificat
          </button>
        );
      } else {
        buttons.push(
          <button
            key="download"
            onClick={downloadPDF}
            className={`${styles.actionButton} ${styles.downloadButton}`}
          >
            <FaDownload className={styles.buttonIcon} />
            Télécharger PDF
          </button>
        );

        buttons.push(
          <button
            key="qrcode"
            onClick={showQRCodeModal}
            className={`${styles.actionButton} ${styles.qrButton}`}
          >
            <FaQrcode className={styles.buttonIcon} />
            QR Code
          </button>
        );
      }
    }

    return buttons;
  };

  // 🎯 Fonction pour extraire les informations en gérant les différentes structures
  const getStageInfo = () => {
    if (!evaluation) return {};

    // Différentes façons d'accéder aux données selon la structure retournée
    return {
      stagiaireNom: evaluation.stage?.stagiaire?.nom || 
                    evaluation.stagiaire?.nom || 
                    "Non spécifié",
      stagiairePrenom: evaluation.stage?.stagiaire?.prenom || 
                       evaluation.stagiaire?.prenom || 
                       "Non spécifié",
      entrepriseNom: evaluation.stage?.entreprise?.raison_social || 
                     evaluation.stage?.entreprise?.nom || 
                     evaluation.entreprise?.raison_social || 
                     evaluation.entreprise?.nom || 
                     "Non spécifiée",
      stageTitle: evaluation.stage?.candidature?.offre?.titre || 
                  evaluation.stage?.titre || 
                  evaluation.stage?.description || 
                  evaluation.candidature?.offre?.titre ||
                  evaluation.offre?.titre ||
                  "Non spécifié",
      evaluateurNom: evaluation.evaluateur?.nom || "Non spécifié",
      evaluateurPrenom: evaluation.evaluateur?.prenom || "Non spécifié"
    };
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement des détails...</p>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className={styles.error}>
        <p>Évaluation non trouvée</p>
      </div>
    );
  }

  const statusConfig = getStatusConfig(evaluation.statut);
  const IconComponent = statusConfig.icon;
  const stageInfo = getStageInfo();

  return (
    <div className={styles.evaluationDetails}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>
            <FaFileAlt className={styles.titleIcon} />
            Détails de l'évaluation
          </h2>
          <div className={styles.statusBadge}>
            <IconComponent className={styles.statusIcon} />
            {statusConfig.label}
          </div>
        </div>
        <div className={styles.headerRight}>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
      </div>

      {/* Informations générales */}
      <div className={styles.generalInfo}>
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>
            <FaUser className={styles.cardIcon} />
            Informations du stage
          </h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Stagiaire:</span>
              <span className={styles.value}>
                {stageInfo.stagiairePrenom} {stageInfo.stagiaireNom}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Entreprise:</span>
              <span className={styles.value}>
                {stageInfo.entrepriseNom}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Titre du stage:</span>
              <span className={styles.value}>
                {stageInfo.stageTitle}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Évaluateur:</span>
              <span className={styles.value}>
                {stageInfo.evaluateurPrenom} {stageInfo.evaluateurNom}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Date d'évaluation:</span>
              <span className={styles.value}>
                {new Date(evaluation.date_evaluation).toLocaleDateString(
                  "fr-FR"
                )}
              </span>
            </div>
            {evaluation.date_validation && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Date de validation:</span>
                <span className={styles.value}>
                  {new Date(evaluation.date_validation).toLocaleDateString(
                    "fr-FR"
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Note globale */}
        <div className={styles.scoreCard}>
          <h3 className={styles.cardTitle}>
            <FaStar className={styles.cardIcon} />
            Note globale
          </h3>
          <div className={styles.globalScore}>
            <div className={styles.scoreDisplay}>
              {evaluation.note_globale !== null && evaluation.note_globale !== undefined ? (
                <>
                  <span className={styles.scoreNumber}>
                    {evaluation.note_globale.toFixed(1)}
                  </span>
                  <span className={styles.scoreMax}>/10</span>
                </>
              ) : (
                <span className={styles.noScore}>Non calculée</span>
              )}
            </div>
            {evaluation.note_globale &&
              renderStarRating(Math.round(evaluation.note_globale))}
          </div>
        </div>
      </div>

      {/* Évaluation détaillée par critères */}
      <div className={styles.criteriaSection}>
        <h3 className={styles.sectionTitle}>Évaluation par critères</h3>
        <div className={styles.criteriaGrid}>
          {evaluation.details?.map((detail) => (
            <div key={detail.id} className={styles.criteriaCard}>
              <div className={styles.criteriaHeader}>
                <h4 className={styles.criteriaName}>
                  {detail.critere?.nom || "Critère"}
                </h4>
                <div className={styles.criteriaNote}>
                  {renderStarRating(detail.note)}
                </div>
              </div>
              {detail.critere?.description && (
                <p className={styles.criteriaDescription}>
                  {detail.critere.description}
                </p>
              )}
              {detail.commentaire && (
                <div className={styles.criteriaComment}>
                  <strong>Commentaire:</strong>
                  <p>{detail.commentaire}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Commentaires et recommandations */}
      <div className={styles.commentsSection}>
        <div className={styles.commentCard}>
          <h3 className={styles.cardTitle}>Commentaire général</h3>
          <p className={styles.commentText}>
            {evaluation.commentaire_general || "Aucun commentaire général"}
          </p>
        </div>

        <div className={styles.recommendationsGrid}>
          <div className={styles.recommendationCard}>
            <h4 className={styles.recommendationTitle}>
              <FaThumbsUp className={styles.recommendationIcon} />
              Points forts
            </h4>
            <p className={styles.recommendationText}>
              {evaluation.points_forts || "Non spécifiés"}
            </p>
          </div>

          <div className={styles.recommendationCard}>
            <h4 className={styles.recommendationTitle}>
              <FaThumbsDown className={styles.recommendationIcon} />
              Points d'amélioration
            </h4>
            <p className={styles.recommendationText}>
              {evaluation.points_amelioration || "Non spécifiés"}
            </p>
          </div>

          <div className={styles.recommendationCard}>
            <h4 className={styles.recommendationTitle}>
              <FaFileAlt className={styles.recommendationIcon} />
              Recommandations
            </h4>
            <p className={styles.recommendationText}>
              {evaluation.recommandations || "Aucune recommandation"}
            </p>
          </div>
        </div>

        {evaluation.recommande_embauche !== null && (
          <div className={styles.hiringRecommendation}>
            <h4 className={styles.hiringTitle}>Recommandation d'embauche</h4>
            <div
              className={`${styles.hiringBadge} ${
                evaluation.recommande_embauche
                  ? styles.positive
                  : styles.negative
              }`}
            >
              {evaluation.recommande_embauche ? (
                <>
                  <FaThumbsUp className={styles.hiringIcon} />
                  Recommandé pour l'embauche
                </>
              ) : (
                <>
                  <FaThumbsDown className={styles.hiringIcon} />
                  Non recommandé pour l'embauche
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Certificat si disponible */}
      {certificat && (
        <div className={styles.certificateSection}>
          <h3 className={styles.sectionTitle}>
            <FaCertificate className={styles.sectionIcon} />
            Certificat de stage
          </h3>
          <div className={styles.certificateCard}>
            <div className={styles.certificateInfo}>
              <div className={styles.certificateDetail}>
                <span className={styles.label}>Code unique:</span>
                <span className={styles.value}>{certificat.code_unique}</span>
              </div>
              <div className={styles.certificateDetail}>
                <span className={styles.label}>Date de génération:</span>
                <span className={styles.value}>
                  {new Date(certificat.date_generation).toLocaleDateString(
                    "fr-FR"
                  )}
                </span>
              </div>
              <div className={styles.certificateDetail}>
                <span className={styles.label}>Mention:</span>
                <span className={styles.value}>{certificat.mention}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>{renderActionButtons()}</div>

      {/* Modal QR Code */}
      {showQRCode && (
        <div className={styles.modal} onClick={() => setShowQRCode(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>QR Code de vérification</h3>
              <button
                onClick={() => setShowQRCode(false)}
                className={styles.modalClose}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.qrCodeContainer}>
                <img
                  src={`data:image/png;base64,${showQRCode.qr_code_data}`}
                  alt="QR Code du certificat"
                  className={styles.qrCodeImage}
                />
              </div>
              <div className={styles.qrCodeInfo}>
                <p>
                  <strong>Code:</strong> {showQRCode.code_unique}
                </p>
                <p>
                  <strong>URL de vérification:</strong>
                </p>
                <code className={styles.verificationUrl}>
                  {window.location.origin}
                  {showQRCode.verification_url}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationDetails;