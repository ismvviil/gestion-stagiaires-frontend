import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaCheck,
  FaClock,
  FaFileAlt,
  FaStar,
  FaFilter,
  FaSearch,
  FaPlus,
  FaDownload,
  FaCertificate,
  FaLock
} from "react-icons/fa";
import styles from "./EvaluationList.module.css";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext"; // Assure-toi d'avoir accès au contexte

// const EvaluationList = ({ onCreateNew, onViewDetails, onEdit }) => {
//   const [evaluations, setEvaluations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     statut: "",
//     search: "",
//   });
//   const { currentUser } = useAuth(); // 🔧 Récupérer l'utilisateur actuel

//   useEffect(() => {
//     fetchEvaluations();
//   }, [filters]);

//   const fetchEvaluations = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       if (filters.statut) queryParams.append("statut", filters.statut);
//       if (filters.search) queryParams.append("search", filters.search);

//       const response = await axios.get(
//         `/evaluations/?${queryParams.toString()}`
//       );
//       setEvaluations(response.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement des évaluations:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (evaluationId, action) => {
//     try {
//       const endpoint = `/evaluations/${evaluationId}/${action}`;
//       const payload = action === "valider" ? { valider: true } : {};

//       const response = await axios.post(endpoint, payload);

//       if (response.status === 200) {
//         fetchEvaluations(); // Recharger la liste
//       }
//     } catch (error) {
//       console.error(`Erreur lors de ${action}:`, error);
//     }
//   };

//   const getStatusBadge = (statut) => {
//     const statusConfig = {
//       brouillon: {
//         icon: FaEdit,
//         className: styles.statusDraft,
//         label: "Brouillon",
//       },
//       terminee: {
//         icon: FaClock,
//         className: styles.statusCompleted,
//         label: "Terminée",
//       },
//       validee: {
//         icon: FaCheck,
//         className: styles.statusValidated,
//         label: "Validée",
//       },
//     };

//     const config = statusConfig[statut] || statusConfig.brouillon;
//     const IconComponent = config.icon;

//     return (
//       <span className={`${styles.statusBadge} ${config.className}`}>
//         <IconComponent className={styles.statusIcon} />
//         {config.label}
//       </span>
//     );
//   };

//   const renderStarRating = (note) => {
//     if (!note) return <span className={styles.noRating}>Non évaluée</span>;

//     const fullStars = Math.floor(note);
//     const hasHalfStar = note % 1 >= 0.5;

//     return (
//       <div className={styles.starRating}>
//         {[...Array(10)].map((_, i) => (
//           <FaStar
//             key={i}
//             className={`${styles.star} ${
//               i < fullStars
//                 ? styles.starFilled
//                 : i === fullStars && hasHalfStar
//                 ? styles.starHalf
//                 : styles.starEmpty
//             }`}
//           />
//         ))}
//         <span className={styles.noteValue}>{note.toFixed(1)}/10</span>
//       </div>
//     );
//   };

  

//   const renderActionButtons = (evaluation) => {
//     const buttons = [];

//     // Bouton voir détails (pour tous)
//     buttons.push(
//       <button
//         key="view"
//         onClick={() => onViewDetails(evaluation)}
//         className={`${styles.actionButton} ${styles.viewButton}`}
//         title="Voir les détails"
//       >
//         <FaEye />
//       </button>
//     );

//     // 🔧 Boutons selon le statut ET le rôle de l'utilisateur
//     if (evaluation.statut === "brouillon") {
//       // Modifier : Tous les rôles autorisés
//       buttons.push(
//         <button
//           key="edit"
//           onClick={() => onEdit(evaluation)}
//           className={`${styles.actionButton} ${styles.editButton}`}
//           title="Modifier"
//         >
//           <FaEdit />
//         </button>
//       );

//       // Terminer : Tous les rôles autorisés
//       buttons.push(
//         <button
//           key="complete"
//           onClick={() => handleStatusChange(evaluation.id, "terminer")}
//           className={`${styles.actionButton} ${styles.completeButton}`}
//           title="Terminer l'évaluation"
//         >
//           <FaClock />
//         </button>
//       );
//     }

//     // 🔧 Valider : Seulement RH
//     if (evaluation.statut === "terminee" && currentUser?.type === "responsable_rh") {
//       buttons.push(
//         <button
//           key="validate"
//           onClick={() => handleStatusChange(evaluation.id, "valider")}
//           className={`${styles.actionButton} ${styles.validateButton}`}
//           title="Valider l'évaluation"
//         >
//           <FaCheck />
//         </button>
//       );
//     }

//     // 🔧 Certificat : RH et Recruteurs
//     if (evaluation.statut === "validee" && 
//         currentUser?.type && 
//         ["responsable_rh", "recruteur"].includes(currentUser.type)) {
//       buttons.push(
//         <button
//           key="certificate"
//           onClick={() => generateCertificate(evaluation.id)}
//           className={`${styles.actionButton} ${styles.certificateButton}`}
//           title="Générer le certificat"
//         >
//           <FaCertificate />
//         </button>
//       );
//     }

//     return buttons;
//   };

  
//   const generateCertificate = async (evaluationId) => {
//     try {
//       const response = await axios.post(
//         `/evaluations/certificats/generer`,
//         null,
//         { params: { evaluation_id: evaluationId } }
//       );

//       if (response.status === 200) {
//         const result = response.data;

//         // 🔧 Gestion des différents cas de réponse
//         if (result.deja_existant) {
//           alert(
//             `ℹ️ ${result.message}\n` +
//               `Code unique: ${result.code_unique}\n` +
//               `Le certificat existe déjà et peut être téléchargé.`
//           );
//         } else {
//           alert(
//             `✅ ${result.message}\n` +
//               `Code unique: ${result.code_unique}\n` +
//               `Le certificat est maintenant disponible.`
//           );
//         }

//         fetchEvaluations(); // Recharger la liste
//       }
//     } catch (error) {
//       console.error("Erreur lors de la génération du certificat:", error);

//       // 🔧 Gestion détaillée des erreurs
//       if (error.response) {
//         const status = error.response.status;
//         const detail = error.response.data?.detail || "Erreur inconnue";

//         switch (status) {
//           case 403:
//             alert(`🚫 Accès refusé: ${detail}`);
//             break;
//           case 400:
//             alert(`⚠️ Erreur: ${detail}`);
//             break;
//           case 404:
//             alert(`❌ Non trouvé: ${detail}`);
//             break;
//           case 500:
//             alert(`💥 Erreur serveur: ${detail}`);
//             break;
//           default:
//             alert(`❌ Erreur (${status}): ${detail}`);
//         }
//       } else {
//         alert("❌ Erreur de connexion. Veuillez réessayer.");
//       }
//     }
//   };
//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <div className={styles.spinner}></div>
//         <p>Chargement des évaluations...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.evaluationList}>
//       {/* Header avec filtres */}
//       <div className={styles.header}>
//         <div className={styles.headerLeft}>
//           <h2 className={styles.title}>
//             <FaFileAlt className={styles.titleIcon} />
//             Évaluations de stage
//           </h2>
//           <span className={styles.count}>
//             {evaluations.length} évaluation{evaluations.length > 1 ? "s" : ""}
//           </span>
//         </div>

//         <div className={styles.headerRight}>
//           <button onClick={onCreateNew} className={styles.createButton}>
//             <FaPlus className={styles.buttonIcon} />
//             Nouvelle évaluation
//           </button>
//         </div>
//       </div>

//       {/* Filtres */}
//       <div className={styles.filters}>
//         <div className={styles.searchBox}>
//           <FaSearch className={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Rechercher par nom de stagiaire..."
//             value={filters.search}
//             onChange={(e) =>
//               setFilters((prev) => ({ ...prev, search: e.target.value }))
//             }
//             className={styles.searchInput}
//           />
//         </div>

//         <select
//           value={filters.statut}
//           onChange={(e) =>
//             setFilters((prev) => ({ ...prev, statut: e.target.value }))
//           }
//           className={styles.statusFilter}
//         >
//           <option value="">Tous les statuts</option>
//           <option value="brouillon">Brouillon</option>
//           <option value="terminee">Terminée</option>
//           <option value="validee">Validée</option>
//         </select>
//       </div>

//       {/* Liste des évaluations */}
//       {evaluations.length === 0 ? (
//         <div className={styles.emptyState}>
//           <FaFileAlt className={styles.emptyIcon} />
//           <h3>Aucune évaluation trouvée</h3>
//           <p>Commencez par créer votre première évaluation.</p>
//           <button onClick={onCreateNew} className={styles.createButton}>
//             <FaPlus className={styles.buttonIcon} />
//             Créer une évaluation
//           </button>
//         </div>
//       ) : (
//         <div className={styles.evaluationGrid}>
//           {evaluations.map((evaluation) => (
//             <div key={evaluation.id} className={styles.evaluationCard}>
//               <div className={styles.cardHeader}>
//                 <div className={styles.cardTitle}>
//                   <h3 className={styles.stageName}>
//                     {/* {evaluation.stage?.titre || "Stage sans titre"} */}
//                     {/* 🔥 TITRE : Offre > Description > Fallback */}
//                     {evaluation.stage?.candidature?.offre?.titre ||
//                       evaluation.stage?.description ||
//                       `Stage #${evaluation.stage_id}`}
//                   </h3>
//                   {getStatusBadge(evaluation.statut)}
//                 </div>
//                 <div className={styles.cardDate}>
//                   {new Date(evaluation.date_evaluation).toLocaleDateString(
//                     "fr-FR"
//                   )}
//                 </div>
//               </div>

//               <div className={styles.cardContent}>
//                 <div className={styles.evaluationInfo}>
//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Stagiaire:</span>
//                     <span className={styles.value}>
//                       {evaluation.stage?.stagiaire?.prenom}{" "}
//                       {evaluation.stage?.stagiaire?.nom}
//                     </span>
//                   </div>

//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Évaluateur:</span>
//                     <span className={styles.value}>
//                       {evaluation.evaluateur?.prenom}{" "}
//                       {evaluation.evaluateur?.nom}
//                     </span>
//                   </div>

//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Note globale:</span>
//                     <div className={styles.value}>
//                       {renderStarRating(evaluation.note_globale)}
//                     </div>
//                   </div>

//                   {evaluation.recommande_embauche !== null && (
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Recommandation:</span>
//                       <span
//                         className={`${styles.recommendation} ${
//                           evaluation.recommande_embauche
//                             ? styles.positive
//                             : styles.negative
//                         }`}
//                       >
//                         {evaluation.recommande_embauche
//                           ? "Recommandé"
//                           : "Non recommandé"}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {evaluation.commentaire_general && (
//                   <div className={styles.preview}>
//                     <p className={styles.previewText}>
//                       {evaluation.commentaire_general.substring(0, 120)}
//                       {evaluation.commentaire_general.length > 120 ? "..." : ""}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className={styles.cardActions}>
//                 {renderActionButtons(evaluation)}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EvaluationList;


const EvaluationList = ({ onCreateNew, onViewDetails, onEdit }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    statut: "",
    search: "",
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchEvaluations();
  }, [filters]);

  const fetchEvaluations = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.statut) queryParams.append("statut", filters.statut);
      if (filters.search) queryParams.append("search", filters.search);

      const response = await axios.get(
        `/evaluations/?${queryParams.toString()}`
      );
      setEvaluations(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des évaluations:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔧 Vérifier si l'utilisateur peut créer/modifier des évaluations
  const canCreateEvaluations = () => {
    return currentUser?.type && ["responsable_rh", "recruteur"].includes(currentUser.type);
  };

  // 🔧 Vérifier si l'utilisateur peut modifier une évaluation
  const canEditEvaluation = (evaluation) => {
    if (currentUser?.type === "stagiaire") return false;
    return evaluation.statut === "brouillon";
  };

  // 🔧 Vérifier si l'utilisateur peut changer le statut
  const canChangeStatus = (evaluation, action) => {
    if (currentUser?.type === "stagiaire") return false;
    
    if (action === "terminer") {
      return evaluation.statut === "brouillon";
    }
    if (action === "valider") {
      return evaluation.statut === "terminee" && currentUser?.type === "responsable_rh";
    }
    return false;
  };

  const handleStatusChange = async (evaluationId, action) => {
    // 🔧 Protection supplémentaire
    if (currentUser?.type === "stagiaire") {
      alert("Les stagiaires ne peuvent pas modifier le statut des évaluations");
      return;
    }

    try {
      const endpoint = `/evaluations/${evaluationId}/${action}`;
      const payload = action === "valider" ? { valider: true } : {};

      const response = await axios.post(endpoint, payload);

      if (response.status === 200) {
        fetchEvaluations();
      }
    } catch (error) {
      console.error(`Erreur lors de ${action}:`, error);
    }
  };

  const getStatusBadge = (statut) => {
    const statusConfig = {
      brouillon: {
        icon: FaEdit,
        className: styles.statusDraft,
        label: "Brouillon",
      },
      terminee: {
        icon: FaClock,
        className: styles.statusCompleted,
        label: "Terminée",
      },
      validee: {
        icon: FaCheck,
        className: styles.statusValidated,
        label: "Validée",
      },
    };

    const config = statusConfig[statut] || statusConfig.brouillon;
    const IconComponent = config.icon;

    return (
      <span className={`${styles.statusBadge} ${config.className}`}>
        <IconComponent className={styles.statusIcon} />
        {config.label}
      </span>
    );
  };

  const renderStarRating = (note) => {
    if (!note) return <span className={styles.noRating}>Non évaluée</span>;

    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 >= 0.5;

    return (
      <div className={styles.starRating}>
        {[...Array(10)].map((_, i) => (
          <FaStar
            key={i}
            className={`${styles.star} ${
              i < fullStars
                ? styles.starFilled
                : i === fullStars && hasHalfStar
                ? styles.starHalf
                : styles.starEmpty
            }`}
          />
        ))}
        <span className={styles.noteValue}>{note.toFixed(1)}/10</span>
      </div>
    );
  };

  const renderActionButtons = (evaluation) => {
    const buttons = [];

    // Bouton voir détails (pour tous)
    buttons.push(
      <button
        key="view"
        onClick={() => onViewDetails(evaluation)}
        className={`${styles.actionButton} ${styles.viewButton}`}
        title="Voir les détails"
      >
        <FaEye />
      </button>
    );

    // 🔧 Boutons de modification seulement pour RH et Recruteurs
    if (canEditEvaluation(evaluation)) {
      buttons.push(
        <button
          key="edit"
          onClick={() => onEdit(evaluation)}
          className={`${styles.actionButton} ${styles.editButton}`}
          title="Modifier"
        >
          <FaEdit />
        </button>
      );
    }

    // 🔧 Bouton terminer seulement pour RH et Recruteurs
    if (canChangeStatus(evaluation, "terminer")) {
      buttons.push(
        <button
          key="complete"
          onClick={() => handleStatusChange(evaluation.id, "terminer")}
          className={`${styles.actionButton} ${styles.completeButton}`}
          title="Terminer l'évaluation"
        >
          <FaClock />
        </button>
      );
    }

    // 🔧 Bouton valider seulement pour RH
    if (canChangeStatus(evaluation, "valider")) {
      buttons.push(
        <button
          key="validate"
          onClick={() => handleStatusChange(evaluation.id, "valider")}
          className={`${styles.actionButton} ${styles.validateButton}`}
          title="Valider l'évaluation"
        >
          <FaCheck />
        </button>
      );
    }

    // 🔧 Bouton certificat pour RH et Recruteurs
    if (evaluation.statut === "validee" && 
        currentUser?.type && 
        ["responsable_rh", "recruteur"].includes(currentUser.type)) {
      buttons.push(
        <button
          key="certificate"
          onClick={() => generateCertificate(evaluation.id)}
          className={`${styles.actionButton} ${styles.certificateButton}`}
          title="Générer le certificat"
        >
          <FaCertificate />
        </button>
      );
    }

    return buttons;
  };

  const generateCertificate = async (evaluationId) => {
    try {
      const response = await axios.post(
        `/evaluations/certificats/generer`,
        null,
        { params: { evaluation_id: evaluationId } }
      );

      if (response.status === 200) {
        const result = response.data;

        if (result.deja_existant) {
          alert(
            `ℹ️ ${result.message}\n` +
              `Code unique: ${result.code_unique}\n` +
              `Le certificat existe déjà et peut être téléchargé.`
          );
        } else {
          alert(
            `✅ ${result.message}\n` +
              `Code unique: ${result.code_unique}\n` +
              `Le certificat est maintenant disponible.`
          );
        }

        fetchEvaluations();
      }
    } catch (error) {
      console.error("Erreur lors de la génération du certificat:", error);

      if (error.response) {
        const status = error.response.status;
        const detail = error.response.data?.detail || "Erreur inconnue";

        switch (status) {
          case 403:
            alert(`🚫 Accès refusé: ${detail}`);
            break;
          case 400:
            alert(`⚠️ Erreur: ${detail}`);
            break;
          case 404:
            alert(`❌ Non trouvé: ${detail}`);
            break;
          case 500:
            alert(`💥 Erreur serveur: ${detail}`);
            break;
          default:
            alert(`❌ Erreur (${status}): ${detail}`);
        }
      } else {
        alert("❌ Erreur de connexion. Veuillez réessayer.");
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement des évaluations...</p>
      </div>
    );
  }

  return (
    <div className={styles.evaluationList}>
      {/* Header avec filtres */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>
            <FaFileAlt className={styles.titleIcon} />
            {currentUser?.type === "stagiaire" ? "Mes évaluations de stage" : "Évaluations de stage"}
          </h2>
          <span className={styles.count}>
            {evaluations.length} évaluation{evaluations.length > 1 ? "s" : ""}
          </span>
          {/* 🔧 Indicateur pour les stagiaires */}
          {currentUser?.type === "stagiaire" && (
            <span className={styles.readOnlyIndicator}>
              <FaLock className={styles.lockIcon} />
              Lecture seule
            </span>
          )}
        </div>

        <div className={styles.headerRight}>
          {/* 🔧 Bouton conditionnel - seulement pour RH et Recruteurs */}
          {canCreateEvaluations() && (
            <button onClick={onCreateNew} className={styles.createButton}>
              <FaPlus className={styles.buttonIcon} />
              Nouvelle évaluation
            </button>
          )}
        </div>
      </div>

      {/* Filtres */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={
              currentUser?.type === "stagiaire" 
                ? "Rechercher dans mes évaluations..." 
                : "Rechercher par nom de stagiaire..."
            }
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className={styles.searchInput}
          />
        </div>

        <select
          value={filters.statut}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, statut: e.target.value }))
          }
          className={styles.statusFilter}
        >
          <option value="">Tous les statuts</option>
          <option value="brouillon">Brouillon</option>
          <option value="terminee">Terminée</option>
          <option value="validee">Validée</option>
        </select>
      </div>

      {/* Liste des évaluations */}
      {evaluations.length === 0 ? (
        <div className={styles.emptyState}>
          <FaFileAlt className={styles.emptyIcon} />
          <h3>Aucune évaluation trouvée</h3>
          <p>
            {currentUser?.type === "stagiaire" 
              ? "Vous n'avez pas encore d'évaluation de stage." 
              : "Commencez par créer votre première évaluation."
            }
          </p>
          {/* 🔧 Bouton conditionnel - seulement pour RH et Recruteurs */}
          {canCreateEvaluations() && (
            <button onClick={onCreateNew} className={styles.createButton}>
              <FaPlus className={styles.buttonIcon} />
              Créer une évaluation
            </button>
          )}
        </div>
      ) : (
        <div className={styles.evaluationGrid}>
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className={styles.evaluationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <h3 className={styles.stageName}>
                    {evaluation.stage?.candidature?.offre?.titre ||
                      evaluation.stage?.description ||
                      `Stage #${evaluation.stage_id}`}
                  </h3>
                  {getStatusBadge(evaluation.statut)}
                </div>
                <div className={styles.cardDate}>
                  {new Date(evaluation.date_evaluation).toLocaleDateString(
                    "fr-FR"
                  )}
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.evaluationInfo}>
                  <div className={styles.infoRow}>
                    <span className={styles.label}>Stagiaire:</span>
                    <span className={styles.value}>
                      {evaluation.stage?.stagiaire?.prenom}{" "}
                      {evaluation.stage?.stagiaire?.nom}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.label}>Évaluateur:</span>
                    <span className={styles.value}>
                      {evaluation.evaluateur?.prenom}{" "}
                      {evaluation.evaluateur?.nom}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.label}>Note globale:</span>
                    <div className={styles.value}>
                      {renderStarRating(evaluation.note_globale)}
                    </div>
                  </div>

                  {evaluation.recommande_embauche !== null && (
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Recommandation:</span>
                      <span
                        className={`${styles.recommendation} ${
                          evaluation.recommande_embauche
                            ? styles.positive
                            : styles.negative
                        }`}
                      >
                        {evaluation.recommande_embauche
                          ? "Recommandé"
                          : "Non recommandé"}
                      </span>
                    </div>
                  )}
                </div>

                {evaluation.commentaire_general && (
                  <div className={styles.preview}>
                    <p className={styles.previewText}>
                      {evaluation.commentaire_general.substring(0, 120)}
                      {evaluation.commentaire_general.length > 120 ? "..." : ""}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.cardActions}>
                {renderActionButtons(evaluation)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EvaluationList;