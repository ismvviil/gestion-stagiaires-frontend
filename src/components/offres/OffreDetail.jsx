// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   getOffreById,
//   publierOffre,
//   fermerOffre,
//   deleteOffre,
// } from "../../services/offreService";
// import styles from "./OffreDetail.module.css";
// import SocialShare from "../SocialShare/SocialShare"
// const OffreDetail = () => {
//   const { offreId } = useParams();
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();

//   const [offre, setOffre] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);

//   const [showShareModal, setShowShareModal] = useState(false); // ← Nouvel état

//   useEffect(() => {
//     const fetchOffre = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const data = await getOffreById(offreId);
//         console.log("Données de loffre : ", data);
//         setOffre(data);
//       } catch (err) {
//         setError(
//           err.response?.data?.detail ||
//             "Erreur lors de la récupération de l'offre"
//         );
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (offreId) {
//       fetchOffre();
//     }
//   }, [offreId]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("fr-FR", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatRemuneration = (montant) => {
//     if (!montant) return "Non rémunéré";
//     return `${montant.toLocaleString("fr-FR")}€/mois`;
//   };

//   const calculateDuration = (dateDebut, dateFin) => {
//     const debut = new Date(dateDebut);
//     const fin = new Date(dateFin);
//     const diffTime = Math.abs(fin - debut);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     const diffWeeks = Math.floor(diffDays / 7);
//     const diffMonths = Math.floor(diffDays / 30);

//     if (diffMonths > 0) {
//       return `${diffMonths} mois`;
//     } else if (diffWeeks > 0) {
//       return `${diffWeeks} semaines`;
//     } else {
//       return `${diffDays} jours`;
//     }
//   };

//   const canModify =
//     currentUser?.type === "recruteur" && offre?.recruteur_id === currentUser.id;
//   const canApply = currentUser?.type === "stagiaire" && offre?.est_active;

//   const handlePublier = async () => {
//     try {
//       setActionLoading(true);
//       setError("");
//       await publierOffre(offreId);
//       setSuccess("Offre publiée avec succès");
//       setOffre((prev) => ({ ...prev, est_active: true }));
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.detail || "Erreur lors de la publication de l'offre"
//       );
//       setTimeout(() => setError(""), 5000);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleFermer = async () => {
//     try {
//       setActionLoading(true);
//       setError("");
//       await fermerOffre(offreId);
//       setSuccess("Offre fermée avec succès");
//       setOffre((prev) => ({ ...prev, est_active: false }));
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.detail || "Erreur lors de la fermeture de l'offre"
//       );
//       setTimeout(() => setError(""), 5000);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleSupprimer = async () => {
//     if (
//       window.confirm(
//         "Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible."
//       )
//     ) {
//       try {
//         setActionLoading(true);
//         setError("");
//         await deleteOffre(offreId);
//         setSuccess("Offre supprimée avec succès");
//         setTimeout(() => {
//           navigate("/offres");
//         }, 2000);
//       } catch (err) {
//         setError(
//           err.response?.data?.detail ||
//             "Erreur lors de la suppression de l'offre"
//         );
//         setTimeout(() => setError(""), 5000);
//       } finally {
//         setActionLoading(false);
//       }
//     }
//   };

// //   const handlePostuler = () => {
// //     // Cette fonction sera implémentée dans une phase ultérieure
// //     alert("Fonctionnalité de candidature à venir dans une prochaine phase");
// //   };

//    const handleShare = () => {
//     setShowShareModal(true);
//   };

//   const closeShareModal = () => {
//     setShowShareModal(false);
//   };

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <div className={styles.spinner}></div>
//         <p>Chargement de l'offre...</p>
//       </div>
//     );
//   }

//   if (error && !offre) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.errorMessage}>{error}</div>
//         <Link to="/offres" className={styles.backButton}>
//           Retour à la liste des offres
//         </Link>
//       </div>
//     );
//   }

//   if (!offre) {
//     return (
//       <div className={styles.notFound}>
//         <h2>Offre non trouvée</h2>
//         <p>
//           L'offre que vous recherchez n'existe pas ou n'est plus disponible.
//         </p>
//         <Link to="/offres" className={styles.backButton}>
//           Retour à la liste des offres
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.offreDetailContainer}>
//       {/* Breadcrumb */}
//       <nav className={styles.breadcrumb}>
//         <Link to="/offres" className={styles.breadcrumbLink}>
//           Offres
//         </Link>
//         <span className={styles.breadcrumbSeparator}>/</span>
//         <span className={styles.breadcrumbCurrent}>{offre.titre}</span>
//       </nav>

//       {/* Messages */}
//       {error && <div className={styles.errorMessage}>{error}</div>}
//       {success && <div className={styles.successMessage}>{success}</div>}

//       {/* En-tête de l'offre */}
//       <header className={styles.offreHeader}>
//         <div className={styles.headerContent}>
//           <div className={styles.titleSection}>
//             <h1 className={styles.offreTitle}>{offre.titre}</h1>
//             <div className={styles.offreMetadata}>
//               <span className={styles.company}>
//                 {offre.entreprise?.raison_social || "Entreprise"}
//               </span>
//               <span className={styles.separator}>•</span>
//               <span className={styles.location}>
//                 {offre.localisation || "Localisation non précisée"}
//               </span>
//               <span className={styles.separator}>•</span>
//               <span
//                 className={`${styles.status} ${
//                   offre.est_active ? styles.active : styles.inactive
//                 }`}
//               >
//                 {offre.est_active ? "Active" : "Fermée"}
//               </span>
//             </div>
//           </div>

//           <div className={styles.actionButtons}>
//             {/* {canApply && (
//               <button 
//                 onClick={handlePostuler}
//                 className={styles.applyButton}
//                 disabled={actionLoading}
//               >
//                 Postuler à cette offre
//               </button>
//             )} */}
//             {canApply && (
//               <Link
//                 to={`/offres/${offre.id}/postuler`}
//                 className={styles.applyButton}
//               >
//                 Postuler à cette offre
//               </Link>
//             )}

//             {canModify && (
//               <div className={styles.manageButtons}>
//                 <Link
//                   to={`/offres/modifier/${offre.id}`}
//                   className={styles.editButton}
//                 >
//                   Modifier
//                 </Link>

//                 {offre.est_active ? (
//                   <button
//                     onClick={handleFermer}
//                     className={styles.closeButton}
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? "Fermeture..." : "Fermer l'offre"}
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handlePublier}
//                     className={styles.publishButton}
//                     disabled={actionLoading}
//                   >
//                     {actionLoading ? "Publication..." : "Publier l'offre"}
//                   </button>
//                 )}

//                 <button
//                   onClick={handleSupprimer}
//                   className={styles.deleteButton}
//                   disabled={actionLoading}
//                 >
//                   {actionLoading ? "Suppression..." : "Supprimer"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Contenu principal */}
//       <div className={styles.offreContent}>
//         <div className={styles.mainContent}>
//           {/* Informations clés */}
//           <section className={styles.keyInfo}>
//             <h2 className={styles.sectionTitle}>Informations clés</h2>
//             <div className={styles.infoGrid}>
//               <div className={styles.infoCard}>
//                 <div className={styles.infoIcon}>💼</div>
//                 <div className={styles.infoContent}>
//                   <span className={styles.infoLabel}>Type de stage</span>
//                   <span className={styles.infoValue}>{offre.type_stage}</span>
//                 </div>
//               </div>

//               <div className={styles.infoCard}>
//                 <div className={styles.infoIcon}>🏢</div>
//                 <div className={styles.infoContent}>
//                   <span className={styles.infoLabel}>Secteur</span>
//                   <span className={styles.infoValue}>{offre.secteur}</span>
//                 </div>
//               </div>

//               <div className={styles.infoCard}>
//                 <div className={styles.infoIcon}>💰</div>
//                 <div className={styles.infoContent}>
//                   <span className={styles.infoLabel}>Rémunération</span>
//                   <span className={styles.infoValue}>
//                     {formatRemuneration(offre.remuneration)}
//                   </span>
//                 </div>
//               </div>

//               <div className={styles.infoCard}>
//                 <div className={styles.infoIcon}>📅</div>
//                 <div className={styles.infoContent}>
//                   <span className={styles.infoLabel}>Durée</span>
//                   <span className={styles.infoValue}>
//                     {calculateDuration(offre.date_debut, offre.date_fin)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Description */}
//           <section className={styles.description}>
//             <h2 className={styles.sectionTitle}>Description du stage</h2>
//             <div className={styles.descriptionContent}>
//               {offre.description.split("\n").map((paragraph, index) => (
//                 <p key={index} className={styles.paragraph}>
//                   {paragraph}
//                 </p>
//               ))}
//             </div>
//           </section>

//           {/* Compétences requises */}
//           {offre.competences_requises && (
//             <section className={styles.competences}>
//               <h2 className={styles.sectionTitle}>Compétences requises</h2>
//               <div className={styles.competencesContent}>
//                 {offre.competences_requises
//                   .split(",")
//                   .map((competence, index) => (
//                     <span key={index} className={styles.competenceTag}>
//                       {competence.trim()}
//                     </span>
//                   ))}
//               </div>
//             </section>
//           )}
//         </div>

//         {/* Sidebar avec informations supplémentaires */}
//         <aside className={styles.sidebar}>
//           {/* Dates */}
//           <div className={styles.sidebarCard}>
//             <h3 className={styles.sidebarTitle}>Période du stage</h3>
//             <div className={styles.dateInfo}>
//               <div className={styles.dateItem}>
//                 <span className={styles.dateLabel}>Début</span>
//                 <span className={styles.dateValue}>
//                   {formatDate(offre.date_debut)}
//                 </span>
//               </div>
//               <div className={styles.dateItem}>
//                 <span className={styles.dateLabel}>Fin</span>
//                 <span className={styles.dateValue}>
//                   {formatDate(offre.date_fin)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Informations sur l'entreprise */}
//           {offre.entreprise && (
//             <div className={styles.sidebarCard}>
//               <h3 className={styles.sidebarTitle}>À propos de l'entreprise</h3>
//               <div className={styles.companyInfo}>
//                 <h4 className={styles.companyName}>
//                   {offre.entreprise.raison_social}
//                 </h4>
//                 <p className={styles.companySector}>
//                   Secteur : {offre.entreprise.secteur_activite}
//                 </p>
//                 {offre.entreprise.description && (
//                   <p className={styles.companyDescription}>
//                     {offre.entreprise.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Localisation */}
//           {offre.localisation && (
//             <div className={styles.sidebarCard}>
//               <h3 className={styles.sidebarTitle}>Localisation</h3>
//               <div className={styles.locationInfo}>
//                 <div className={styles.locationIcon}>📍</div>
//                 <span className={styles.locationText}>
//                   {offre.localisation}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Informations de publication */}
//           <div className={styles.sidebarCard}>
//             <h3 className={styles.sidebarTitle}>Informations</h3>
//             <div className={styles.publicationInfo}>
//               <div className={styles.infoItem}>
//                 <span className={styles.infoLabel}>Publié le</span>
//                 <span className={styles.infoValue}>
//                   {new Date(offre.created_at).toLocaleDateString("fr-FR")}
//                 </span>
//               </div>
//               {offre.updated_at && offre.updated_at !== offre.created_at && (
//                 <div className={styles.infoItem}>
//                   <span className={styles.infoLabel}>Mis à jour le</span>
//                   <span className={styles.infoValue}>
//                     {new Date(offre.updated_at).toLocaleDateString("fr-FR")}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Actions rapides pour les stagiaires */}
//           {canApply && (
//             <div className={styles.sidebarCard}>
//               <h3 className={styles.sidebarTitle}>Actions</h3>
//               <div className={styles.quickActions}>
//                 {/* <button
//                   onClick={handlePostuler}
//                   className={styles.primaryAction}
//                   disabled={actionLoading}
//                 >
//                   Postuler maintenant
//                 </button> */}
//                 {canApply && (
//               <Link
//                 to={`/offres/${offre.id}/postuler`}
//                 className={styles.primaryAction}
//               >
//                 Postuler à cette offre
//               </Link>
//             )}
//                 <button className={styles.secondaryAction}>
//                   Sauvegarder l'offre
//                 </button>
//                 {/* <button className={styles.secondaryAction}>Partager</button> */}
//                 <button 
//                 className={styles.secondaryAction}
//                 onClick={handleShare}
//               >
//                 Partager
//               </button>
//               </div>
//             </div>
//           )}
//         </aside>
//       </div>

//       {/* Navigation en bas */}
//       <div className={styles.bottomNavigation}>
//         <Link to="/offres" className={styles.backToList}>
//           ← Retour à la liste des offres
//         </Link>

//         {canModify && (
//           <div className={styles.bottomActions}>
//             <Link
//               to={`/offres/modifier/${offre.id}`}
//               className={styles.editButton}
//             >
//               Modifier cette offre
//             </Link>
//           </div>
//         )}
//       </div>

      
//     {/* NOUVEAU: Modal de partage */}
//       <SocialShare 
//         offre={offre}
//         isOpen={showShareModal}
//         onClose={closeShareModal}
//       />
//     </div>
//   );
// };

// export default OffreDetail;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getOffreById,
  publierOffre,
  fermerOffre,
  deleteOffre,
} from "../../services/offreService";
import {
  FaBriefcase,
  FaBuilding,
  FaEuroSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaShareAlt,
  FaBookmark,
  FaRegBookmark,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaClock,
  FaUsers,
  FaIndustry,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaTimes,
  FaSpinner
} from "react-icons/fa";
import styles from "./OffreDetail.module.css";
import SocialShare from "../SocialShare/SocialShare";

const OffreDetail = () => {
  const { offreId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getOffreById(offreId);
        console.log("Données de loffre : ", data);
        setOffre(data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Erreur lors de la récupération de l'offre"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (offreId) {
      fetchOffre();
    }
  }, [offreId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRemuneration = (montant) => {
    if (!montant) return "Non rémunéré";
    return `${montant.toLocaleString("fr-FR")}€/mois`;
  };

  const calculateDuration = (dateDebut, dateFin) => {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = Math.abs(fin - debut);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths > 0) {
      return `${diffMonths} mois`;
    } else if (diffWeeks > 0) {
      return `${diffWeeks} semaines`;
    } else {
      return `${diffDays} jours`;
    }
  };

  const canModify =
    currentUser?.type === "recruteur" && offre?.recruteur_id === currentUser.id;
  const canApply = currentUser?.type === "stagiaire" && offre?.est_active;

  const handlePublier = async () => {
    try {
      setActionLoading(true);
      setError("");
      await publierOffre(offreId);
      setSuccess("Offre publiée avec succès");
      setOffre((prev) => ({ ...prev, est_active: true }));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Erreur lors de la publication de l'offre"
      );
      setTimeout(() => setError(""), 5000);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFermer = async () => {
    try {
      setActionLoading(true);
      setError("");
      await fermerOffre(offreId);
      setSuccess("Offre fermée avec succès");
      setOffre((prev) => ({ ...prev, est_active: false }));
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Erreur lors de la fermeture de l'offre"
      );
      setTimeout(() => setError(""), 5000);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSupprimer = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible."
      )
    ) {
      try {
        setActionLoading(true);
        setError("");
        await deleteOffre(offreId);
        setSuccess("Offre supprimée avec succès");
        setTimeout(() => {
          navigate("/offres");
        }, 2000);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Erreur lors de la suppression de l'offre"
        );
        setTimeout(() => setError(""), 5000);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <FaSpinner className={styles.spinner} />
        <p>Chargement de l'offre...</p>
      </div>
    );
  }

  if (error && !offre) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>{error}</div>
        <Link to="/offres" className={styles.backButton}>
          <FaArrowLeft /> Retour à la liste des offres
        </Link>
      </div>
    );
  }

  if (!offre) {
    return (
      <div className={styles.notFound}>
        <h2>Offre non trouvée</h2>
        <p>
          L'offre que vous recherchez n'existe pas ou n'est plus disponible.
        </p>
        <Link to="/offres" className={styles.backButton}>
          <FaArrowLeft /> Retour à la liste des offres
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.offreDetailContainer}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/offres" className={styles.breadcrumbLink}>
          Offres
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{offre.titre}</span>
      </nav>

      {/* Messages */}
      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      {/* En-tête de l'offre */}
      <header className={styles.offreHeader}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.offreTitle}>{offre.titre}</h1>
            <div className={styles.offreMetadata}>
              <span className={styles.company}>
                <FaBuilding className={styles.metaIcon} />
                {offre.entreprise?.raison_social || "Entreprise"}
              </span>
              <span className={styles.separator}>•</span>
              <span className={styles.location}>
                <FaMapMarkerAlt className={styles.metaIcon} />
                {offre.localisation || "Localisation non précisée"}
              </span>
              <span className={styles.separator}>•</span>
              <span
                className={`${styles.status} ${
                  offre.est_active ? styles.active : styles.inactive
                }`}
              >
                {offre.est_active ? (
                  <>
                    <FaCheck className={styles.statusIcon} /> Active
                  </>
                ) : (
                  <>
                    <FaTimes className={styles.statusIcon} /> Fermée
                  </>
                )}
              </span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            {canApply && (
              <Link
                to={`/offres/${offre.id}/postuler`}
                className={styles.applyButton}
              >
                <FaExternalLinkAlt /> Postuler à cette offre
              </Link>
            )}

            {canModify && (
              <div className={styles.manageButtons}>
                <Link
                  to={`/offres/modifier/${offre.id}`}
                  className={styles.editButton}
                >
                  <FaEdit /> Modifier
                </Link>

                {offre.est_active ? (
                  <button
                    onClick={handleFermer}
                    className={styles.closeButton}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <FaSpinner className={styles.spinnerIcon} /> Fermeture...
                      </>
                    ) : (
                      <>
                        <FaEyeSlash /> Fermer l'offre
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handlePublier}
                    className={styles.publishButton}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <FaSpinner className={styles.spinnerIcon} /> Publication...
                      </>
                    ) : (
                      <>
                        <FaEye /> Publier l'offre
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleSupprimer}
                  className={styles.deleteButton}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className={styles.spinnerIcon} /> Suppression...
                    </>
                  ) : (
                    <>
                      <FaTrashAlt /> Supprimer
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className={styles.offreContent}>
        <div className={styles.mainContent}>
          {/* Informations clés */}
          <section className={styles.keyInfo}>
            <h2 className={styles.sectionTitle}>Informations clés</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaBriefcase />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Type de stage</span>
                  <span className={styles.infoValue}>{offre.type_stage}</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaIndustry />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Secteur</span>
                  <span className={styles.infoValue}>{offre.secteur}</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaEuroSign />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Rémunération</span>
                  <span className={styles.infoValue}>
                    {formatRemuneration(offre.remuneration)}
                  </span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <FaClock />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Durée</span>
                  <span className={styles.infoValue}>
                    {calculateDuration(offre.date_debut, offre.date_fin)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className={styles.description}>
            <h2 className={styles.sectionTitle}>Description du stage</h2>
            <div className={styles.descriptionContent}>
              {offre.description.split("\n").map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Compétences requises */}
          {offre.competences_requises && (
            <section className={styles.competences}>
              <h2 className={styles.sectionTitle}>Compétences requises</h2>
              <div className={styles.competencesContent}>
                {offre.competences_requises
                  .split(",")
                  .map((competence, index) => (
                    <span key={index} className={styles.competenceTag}>
                      {competence.trim()}
                    </span>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar avec informations supplémentaires */}
        <aside className={styles.sidebar}>
          {/* Dates */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>
              <FaCalendarAlt className={styles.sidebarTitleIcon} />
              Période du stage
            </h3>
            <div className={styles.dateInfo}>
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Début</span>
                <span className={styles.dateValue}>
                  {formatDate(offre.date_debut)}
                </span>
              </div>
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Fin</span>
                <span className={styles.dateValue}>
                  {formatDate(offre.date_fin)}
                </span>
              </div>
            </div>
          </div>

          {/* Informations sur l'entreprise */}
          {offre.entreprise && (
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FaBuilding className={styles.sidebarTitleIcon} />
                À propos de l'entreprise
              </h3>
              <div className={styles.companyInfo}>
                <h4 className={styles.companyName}>
                  {offre.entreprise.raison_social}
                </h4>
                <p className={styles.companySector}>
                  <FaIndustry className={styles.companyIcon} />
                  Secteur : {offre.entreprise.secteur_activite}
                </p>
                {offre.entreprise.description && (
                  <p className={styles.companyDescription}>
                    {offre.entreprise.description}
                  </p>
                )}
                {offre.entreprise.site_web && (
                  <p className={styles.companyWebsite}>
                    <FaGlobe className={styles.companyIcon} />
                    <a href={offre.entreprise.site_web} target="_blank" rel="noopener noreferrer">
                      Site web
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Localisation */}
          {offre.localisation && (
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FaMapMarkerAlt className={styles.sidebarTitleIcon} />
                Localisation
              </h3>
              <div className={styles.locationInfo}>
                <div className={styles.locationIcon}>
                  <FaMapMarkerAlt />
                </div>
                <span className={styles.locationText}>
                  {offre.localisation}
                </span>
              </div>
            </div>
          )}

          {/* Informations de publication */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>
              <FaClock className={styles.sidebarTitleIcon} />
              Informations
            </h3>
            <div className={styles.publicationInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Publié le</span>
                <span className={styles.infoValue}>
                  {new Date(offre.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
              {offre.updated_at && offre.updated_at !== offre.created_at && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Mis à jour le</span>
                  <span className={styles.infoValue}>
                    {new Date(offre.updated_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions rapides pour les stagiaires */}
          {canApply && (
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>
                <FaUsers className={styles.sidebarTitleIcon} />
                Actions
              </h3>
              <div className={styles.quickActions}>
                <Link
                  to={`/offres/${offre.id}/postuler`}
                  className={styles.primaryAction}
                >
                  <FaExternalLinkAlt /> Postuler à cette offre
                </Link>
                <button className={styles.secondaryAction}>
                  <FaRegBookmark /> Sauvegarder l'offre
                </button>
                <button 
                  className={styles.secondaryAction}
                  onClick={handleShare}
                >
                  <FaShareAlt /> Partager
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Navigation en bas */}
      <div className={styles.bottomNavigation}>
        <Link to="/offres" className={styles.backToList}>
          <FaArrowLeft /> Retour à la liste des offres
        </Link>

        {canModify && (
          <div className={styles.bottomActions}>
            <Link
              to={`/offres/modifier/${offre.id}`}
              className={styles.editButton}
            >
              <FaEdit /> Modifier cette offre
            </Link>
          </div>
        )}
      </div>

      {/* Modal de partage */}
      <SocialShare 
        offre={offre}
        isOpen={showShareModal}
        onClose={closeShareModal}
      />
    </div>
  );
};

export default OffreDetail;