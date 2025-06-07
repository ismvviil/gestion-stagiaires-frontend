// import React, { useState, useEffect , useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   getMesCandidatures,
//   retirerCandidature,
// } from "../../services/candidatureService";
// import MaCandidatureCard from "./MaCandidatureCard";
// import styles from "./MesCandidatures.module.css";
// import CandidaturesStats from "./CandidaturesStats";


// const MesCandidatures = () => {
//   const { currentUser } = useAuth();
//   const [candidatures, setCandidatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [filtreStatus, setFiltreStatus] = useState("tous");

//   const statusOptions = [
//     { value: "tous", label: "Toutes" },
//     { value: "en_attente", label: "En attente" },
//     { value: "en_cours", label: "En cours d'examen" },
//     { value: "acceptee", label: "Acceptées" },
//     { value: "refusee", label: "Refusées" },
//     { value: "retiree", label: "Retirées" },
//   ];

//   const fetchCandidatures = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const data = await getMesCandidatures();
//       setCandidatures(data || []);
//     } catch (err) {
//       setError("Erreur lors de la récupération de vos candidatures");
//       console.error(err);
//       setCandidatures([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCandidatures();
//   }, []);

//   const handleRetirerCandidature = async (candidatureId) => {
//     try {
//       setError("");
//       await retirerCandidature(candidatureId);
//       setSuccess("Candidature retirée avec succès");

//       // Mettre à jour la liste des candidatures
//       setCandidatures((prev) =>
//         prev.map((candidature) =>
//           candidature.id === candidatureId
//             ? { 
//                 ...candidature, 
//                 status: "retiree",
//                 date_fin: new Date().toISOString()
//               }
//             : candidature
//         )
//       );

//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.detail || "Erreur lors du retrait de la candidature"
//       );
//       setTimeout(() => setError(""), 5000);
//     }
//   };

//   const candidaturesFiltrees = useMemo(() => {
//     return candidatures.filter(
//       (candidature) =>
//         filtreStatus === "tous" || candidature.status === filtreStatus
//     );
//   }, [candidatures, filtreStatus]);

//   const stats = useMemo(() => {
//     return {
//       total: candidatures.length,
//       en_attente: candidatures.filter((c) => c.status === "en_attente").length,
//       en_cours: candidatures.filter((c) => c.status === "en_cours").length,
//       acceptee: candidatures.filter((c) => c.status === "acceptee").length,
//       refusee: candidatures.filter((c) => c.status === "refusee").length,
//       retiree: candidatures.filter((c) => c.status === "retiree").length,
//     };
//   }, [candidatures]);

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <p>Chargement de vos candidatures...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.candidaturesContainer}>
//       <div className={styles.header}>
//         <h1 className={styles.pageTitle}>Mes candidatures</h1>
//         <Link to="/offres" className={styles.searchOffresButton}>
//           Rechercher de nouvelles offres
//         </Link>
//       </div>

//       {error && <div className={styles.errorMessage}>{error}</div>}
//       {success && <div className={styles.successMessage}>{success}</div>}

//       <CandidaturesStats candidatures={candidatures} type="stagiaire" />

//       {/* Filtres */}
//       <div className={styles.filtres}>
//         <div className={styles.filtreGroup}>
//           <label htmlFor="status" className={styles.filtreLabel}>
//             Filtrer par statut :
//           </label>
//           <select
//             id="status"
//             value={filtreStatus}
//             onChange={(e) => setFiltreStatus(e.target.value)}
//             className={styles.filtreSelect}
//             aria-label="Filtrer les candidatures par statut"
//           >
//             {statusOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className={styles.resultCount}>
//           {candidaturesFiltrees.length} candidature
//           {candidaturesFiltrees.length !== 1 ? "s" : ""} affichée
//           {candidaturesFiltrees.length !== 1 ? "s" : ""}
//         </div>
//       </div>

//       {/* Liste des candidatures */}
//       <div className={styles.candidaturesList}>
//         {candidaturesFiltrees.length === 0 ? (
//           <div className={styles.noCandidatures}>
//             {filtreStatus === "tous" ? (
//               <div className={styles.emptyCandidatures}>
//                 <h3>Aucune candidature pour le moment</h3>
//                 <p>Commencez par explorer les offres de stage disponibles</p>
//                 <Link to="/offres" className={styles.exploreButton}>
//                   Explorer les offres
//                 </Link>
//               </div>
//             ) : (
//               <div className={styles.noFilterResults}>
//                 <p>
//                   Aucune candidature avec le statut "
//                   {statusOptions.find((opt) => opt.value === filtreStatus)?.label}"
//                 </p>
//                 <button
//                   onClick={() => setFiltreStatus("tous")}
//                   className={styles.resetFilterButton}
//                 >
//                   Afficher toutes les candidatures
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           candidaturesFiltrees.map((candidature) => (
//             <MaCandidatureCard
//               key={candidature.id}
//               candidature={candidature}
//               onRetirer={handleRetirerCandidature}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MesCandidatures;


// ============================================================================
// MES CANDIDATURES - VERSION PROFESSIONNELLE AVEC REACT ICONS
// ============================================================================

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  HiClipboardList,     // Pour le titre principal
  HiSearch,            // Pour rechercher offres
  HiRefresh,           // Pour actualiser
  HiFilter,            // Pour les filtres
  HiChartBar,          // Pour les statistiques
  HiExclamation,       // Pour les erreurs
  HiCheckCircle,       // Pour les succès
  HiEmojiSad,          // Pour états vides
  HiLightBulb,         // Pour les conseils
  HiArrowRight,        // Pour les boutons d'action
  HiViewGrid           // Pour voir tout
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import {
  getMesCandidatures,
  retirerCandidature,
} from "../../services/candidatureService";
import MaCandidatureCard from "./MaCandidatureCard";
import styles from "./MesCandidatures.module.css";
import CandidaturesStats from "./CandidaturesStats";

const MesCandidatures = () => {
  const { currentUser } = useAuth();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filtreStatus, setFiltreStatus] = useState("tous");

  const statusOptions = [
    { value: "tous", label: "Toutes", icon: HiViewGrid },
    { value: "en_attente", label: "En attente", icon: HiClipboardList },
    { value: "en_cours", label: "En cours d'examen", icon: HiChartBar },
    { value: "acceptee", label: "Acceptées", icon: HiCheckCircle },
    { value: "refusee", label: "Refusées", icon: HiExclamation },
    { value: "retiree", label: "Retirées", icon: HiArrowRight },
  ];

  const fetchCandidatures = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMesCandidatures();
      setCandidatures(data || []);
    } catch (err) {
      setError("Erreur lors de la récupération de vos candidatures");
      console.error(err);
      setCandidatures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const handleRetirerCandidature = async (candidatureId) => {
    try {
      setError("");
      await retirerCandidature(candidatureId);
      setSuccess("Candidature retirée avec succès");

      setCandidatures((prev) =>
        prev.map((candidature) =>
          candidature.id === candidatureId
            ? { 
                ...candidature, 
                status: "retiree",
                date_fin: new Date().toISOString()
              }
            : candidature
        )
      );

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Erreur lors du retrait de la candidature"
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  const candidaturesFiltrees = useMemo(() => {
    return candidatures.filter(
      (candidature) =>
        filtreStatus === "tous" || candidature.status === filtreStatus
    );
  }, [candidatures, filtreStatus]);

  const stats = useMemo(() => {
    return {
      total: candidatures.length,
      en_attente: candidatures.filter((c) => c.status === "en_attente").length,
      en_cours: candidatures.filter((c) => c.status === "en_cours").length,
      acceptee: candidatures.filter((c) => c.status === "acceptee").length,
      refusee: candidatures.filter((c) => c.status === "refusee").length,
      retiree: candidatures.filter((c) => c.status === "retiree").length,
    };
  }, [candidatures]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <div className={styles.loadingContent}>
          <HiRefresh className={styles.loadingIcon} />
          <p className={styles.loadingText}>Chargement de vos candidatures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.candidaturesContainer}>
      {/* Header professionnel */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <div className={styles.titleIcon}>
              <HiClipboardList />
            </div>
            <div className={styles.titleText}>
              <h1 className={styles.pageTitle}>Mes Candidatures</h1>
              <p className={styles.pageSubtitle}>
                Suivez le statut de vos candidatures de stage
              </p>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <button 
              onClick={fetchCandidatures}
              className={styles.refreshButton}
              title="Actualiser"
            >
              <HiRefresh />
              <span>Actualiser</span>
            </button>
            
            <Link to="/offres" className={styles.searchOffresButton}>
              <HiSearch />
              <span>Nouvelles Offres</span>
              <HiArrowRight className={styles.buttonArrow} />
            </Link>
          </div>
        </div>
      </div>

      {/* Messages de notification */}
      {error && (
        <div className={styles.errorMessage}>
          <HiExclamation className={styles.messageIcon} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className={styles.successMessage}>
          <HiCheckCircle className={styles.messageIcon} />
          <span>{success}</span>
        </div>
      )}

      {/* Statistiques avec le nouveau composant */}
      <div className={styles.statsSection}>
        <div className={styles.statsHeader}>
          <div className={styles.statsHeaderIcon}>
            <HiChartBar />
          </div>
          <div className={styles.statsHeaderText}>
            <h2 className={styles.statsTitle}>Vue d'ensemble</h2>
            <p className={styles.statsSubtitle}>Synthèse de vos candidatures</p>
          </div>
        </div>
        <CandidaturesStats candidatures={candidatures} type="stagiaire" />
      </div>

      {/* Section filtres améliorée */}
      <div className={styles.filtresSection}>
        <div className={styles.filtresHeader}>
          <div className={styles.filtresHeaderIcon}>
            <HiFilter />
          </div>
          <h3 className={styles.filtresTitle}>Filtrer & Rechercher</h3>
        </div>
        
        <div className={styles.filtresContent}>
          <div className={styles.filtreGroup}>
            <label htmlFor="status" className={styles.filtreLabel}>
              <HiFilter className={styles.labelIcon} />
              Filtrer par statut
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="status"
                value={filtreStatus}
                onChange={(e) => setFiltreStatus(e.target.value)}
                className={styles.filtreSelect}
                aria-label="Filtrer les candidatures par statut"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className={styles.selectIcon}>
                <HiFilter />
              </div>
            </div>
          </div>

          <div className={styles.resultCountCard}>
            <div className={styles.resultIcon}>
              <HiViewGrid />
            </div>
            <div className={styles.resultText}>
              <span className={styles.resultNumber}>
                {candidaturesFiltrees.length}
              </span>
              <span className={styles.resultLabel}>
                candidature{candidaturesFiltrees.length !== 1 ? "s" : ""} affichée{candidaturesFiltrees.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className={styles.candidaturesListSection}>
        <div className={styles.candidaturesList}>
          {candidaturesFiltrees.length === 0 ? (
            <div className={styles.emptyStateContainer}>
              {filtreStatus === "tous" ? (
                <div className={styles.emptyCandidatures}>
                  <div className={styles.emptyIcon}>
                    <HiEmojiSad />
                  </div>
                  <div className={styles.emptyContent}>
                    <h3 className={styles.emptyTitle}>
                      Aucune candidature pour le moment
                    </h3>
                    <p className={styles.emptyDescription}>
                      Commencez votre recherche en explorant les offres de stage disponibles
                    </p>
                    <div className={styles.emptyActions}>
                      <Link to="/offres" className={styles.exploreButton}>
                        <HiSearch className={styles.buttonIcon} />
                        <span>Explorer les offres</span>
                        <HiArrowRight className={styles.buttonArrow} />
                      </Link>
                    </div>
                  </div>
                  
                  <div className={styles.tipCard}>
                    <HiLightBulb className={styles.tipIcon} />
                    <div className={styles.tipContent}>
                      <h4 className={styles.tipTitle}>Conseil</h4>
                      <p className={styles.tipText}>
                        Utilisez des mots-clés précis et filtrez par localisation pour trouver les offres qui vous correspondent.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.noFilterResults}>
                  <div className={styles.emptyIcon}>
                    <HiFilter />
                  </div>
                  <div className={styles.emptyContent}>
                    <h3 className={styles.emptyTitle}>
                      Aucun résultat trouvé
                    </h3>
                    <p className={styles.emptyDescription}>
                      Aucune candidature avec le statut "
                      {statusOptions.find((opt) => opt.value === filtreStatus)?.label}"
                    </p>
                    <div className={styles.emptyActions}>
                      <button
                        onClick={() => setFiltreStatus("tous")}
                        className={styles.resetFilterButton}
                      >
                        <HiViewGrid className={styles.buttonIcon} />
                        <span>Afficher toutes les candidatures</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={styles.listHeader}>
                <h3 className={styles.listTitle}>
                  Vos candidatures
                  {filtreStatus !== "tous" && (
                    <span className={styles.listSubtitle}>
                      • {statusOptions.find(opt => opt.value === filtreStatus)?.label}
                    </span>
                  )}
                </h3>
              </div>
              
              <div className={styles.candidaturesGrid}>
                {candidaturesFiltrees.map((candidature) => (
                  <MaCandidatureCard
                    key={candidature.id}
                    candidature={candidature}
                    onRetirer={handleRetirerCandidature}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MesCandidatures;


