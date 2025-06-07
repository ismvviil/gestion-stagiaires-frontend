// import React, { useState, useEffect } from "react";
// import {
//   FaSearch,
//   FaFilter,
//   FaCheck,
//   FaUser,
//   FaBuilding,
//   FaCalendarAlt,
//   FaArrowRight,
//   FaExclamationTriangle,
// } from "react-icons/fa";
// import axios from "../../api/axios";
// import styles from "./StageSelector.module.css";

// const StageSelector = ({ onStageSelected, onCancel }) => {
//   const [stages, setStages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStage, setSelectedStage] = useState(null);

//   useEffect(() => {
//     fetchTerminatedStages();
//   }, []);

//   const fetchTerminatedStages = async () => {
//     setLoading(true);
//     try {
//       // Récupérer seulement les stages terminés (éligibles pour évaluation)
//       const response = await axios.get("/stages/?status_filter=termine");

//       // Filtrer les stages qui n'ont pas encore d'évaluation
//       const stagesWithoutEvaluation = [];

//       for (const stage of response.data) {
//         try {
//           // Vérifier si le stage a déjà une évaluation
//           await axios.get(`/evaluations/certificats/by-evaluation/${stage.id}`);
//           // Si pas d'erreur, le stage a déjà une évaluation
//         } catch (error) {
//           if (error.response?.status === 404) {
//             // Stage sans évaluation, on l'ajoute
//             stagesWithoutEvaluation.push(stage);
//           }
//         }
//       }

//       setStages(stagesWithoutEvaluation);
//     } catch (error) {
//       console.error("Erreur lors du chargement des stages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredStages = stages.filter((stage) => {
//     if (!searchTerm) return true;

//     const searchLower = searchTerm.toLowerCase();
//     return (
//       stage.description?.toLowerCase().includes(searchLower) ||
//       stage.stagiaire?.nom?.toLowerCase().includes(searchLower) ||
//       stage.stagiaire?.prenom?.toLowerCase().includes(searchLower)
//     );
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return "Non définie";
//     return new Date(dateString).toLocaleDateString("fr-FR");
//   };

//   const handleStageSelect = (stage) => {
//     setSelectedStage(stage);
//   };

//   const handleConfirmSelection = () => {
//     if (selectedStage) {
//       onStageSelected(selectedStage.id);
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.stageSelector}>
//         <div className={styles.loading}>
//           <div className={styles.spinner}></div>
//           <p>Chargement des stages terminés...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.stageSelector}>
//       <div className={styles.header}>
//         <h2 className={styles.title}>
//           <FaCheck className={styles.icon} />
//           Sélectionner un stage à évaluer
//         </h2>
//         <p className={styles.subtitle}>
//           Choisissez un stage terminé qui n'a pas encore été évalué
//         </p>
//       </div>

//       {/* Barre de recherche */}
//       <div className={styles.searchSection}>
//         <div className={styles.searchBox}>
//           <FaSearch className={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Rechercher par nom de stagiaire ou description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={styles.searchInput}
//           />
//         </div>
//       </div>

//       {/* Liste des stages */}
//       <div className={styles.stagesSection}>
//         {filteredStages.length === 0 ? (
//           <div className={styles.emptyState}>
//             <FaExclamationTriangle className={styles.emptyIcon} />
//             <h3>Aucun stage disponible</h3>
//             <p>
//               {stages.length === 0
//                 ? "Tous les stages terminés ont déjà été évalués."
//                 : "Aucun stage ne correspond à votre recherche."}
//             </p>
//           </div>
//         ) : (
//           <div className={styles.stagesList}>
//             {filteredStages.map((stage) => (
//               <div
//                 key={stage.id}
//                 className={`${styles.stageCard} ${
//                   selectedStage?.id === stage.id ? styles.selected : ""
//                 }`}
//                 onClick={() => handleStageSelect(stage)}
//               >
//                 <div className={styles.stageHeader}>
//                   <div className={styles.stageTitle}>
//                     {stage.description || "Stage sans description"}
//                   </div>
//                   <div className={styles.selectionIndicator}>
//                     {selectedStage?.id === stage.id && (
//                       <FaCheck className={styles.checkIcon} />
//                     )}
//                   </div>
//                 </div>

//                 <div className={styles.stageContent}>
//                   <div className={styles.stageInfo}>
//                     <div className={styles.infoRow}>
//                       <FaUser className={styles.infoIcon} />
//                       <span className={styles.infoText}>
//                         {stage.stagiaire?.prenom} {stage.stagiaire?.nom}
//                       </span>
//                     </div>

//                     <div className={styles.infoRow}>
//                       <FaBuilding className={styles.infoIcon} />
//                       <span className={styles.infoText}>
//                         {stage.entreprise?.raison_social}
//                       </span>
//                     </div>

//                     <div className={styles.infoRow}>
//                       <FaCalendarAlt className={styles.infoIcon} />
//                       <span className={styles.infoText}>
//                         Du {formatDate(stage.date_debut)} au{" "}
//                         {formatDate(stage.date_fin)}
//                       </span>
//                     </div>
//                   </div>

//                   {stage.objectifs && (
//                     <div className={styles.objectives}>
//                       <strong>Objectifs :</strong>
//                       <p className={styles.objectivesText}>
//                         {stage.objectifs.length > 100
//                           ? `${stage.objectifs.substring(0, 100)}...`
//                           : stage.objectifs}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className={styles.stageMeta}>
//                   <span className={styles.statusBadge}>
//                     <FaCheck className={styles.statusIcon} />
//                     Terminé
//                   </span>
//                   <span className={styles.stageId}>Stage #{stage.id}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Actions */}
//       <div className={styles.actions}>
//         <button onClick={onCancel} className={styles.cancelButton}>
//           Annuler
//         </button>

//         <button
//           onClick={handleConfirmSelection}
//           className={styles.confirmButton}
//           disabled={!selectedStage}
//         >
//           <FaArrowRight className={styles.buttonIcon} />
//           Évaluer ce stage
//         </button>
//       </div>

//       {/* Info sélection */}
//       {selectedStage && (
//         <div className={styles.selectionSummary}>
//           <div className={styles.summaryHeader}>
//             <FaCheck className={styles.summaryIcon} />
//             <span>Stage sélectionné</span>
//           </div>
//           <div className={styles.summaryContent}>
//             <strong>{selectedStage.description}</strong>
//             <span>
//               {selectedStage.stagiaire?.prenom} {selectedStage.stagiaire?.nom}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StageSelector;
// src/components/evaluations/StageSelector.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaCheck, 
  FaUser, 
  FaBuilding, 
  FaCalendarAlt,
  FaArrowRight,
  FaExclamationTriangle
} from 'react-icons/fa';
import axios from '../../api/axios';
import styles from './StageSelector.module.css';

const StageSelector = ({ onStageSelected, onCancel }) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    fetchTerminatedStages();
  }, []);

  const fetchTerminatedStages = async () => {
    setLoading(true);
    try {
      // Récupérer seulement les stages terminés (éligibles pour évaluation)
      const response = await axios.get('/stages/?status_filter=termine');
      
      // Récupérer toutes les évaluations existantes
      const evaluationsResponse = await axios.get('/evaluations/');
      const existingEvaluations = evaluationsResponse.data;
      
      // Filtrer les stages qui n'ont pas encore d'évaluation
      const stagesWithoutEvaluation = response.data.filter(stage => {
        // Vérifier si ce stage a déjà une évaluation
        const hasEvaluation = existingEvaluations.some(evaluation => 
          evaluation.stage_id === stage.id
        );
        return !hasEvaluation;
      });
      
      setStages(stagesWithoutEvaluation);
    } catch (error) {
      console.error('Erreur lors du chargement des stages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStages = stages.filter(stage => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      stage.description?.toLowerCase().includes(searchLower) ||
      stage.stagiaire?.nom?.toLowerCase().includes(searchLower) ||
      stage.stagiaire?.prenom?.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
  };

  const handleConfirmSelection = () => {
    if (selectedStage) {
      onStageSelected(selectedStage.id);
    }
  };

  if (loading) {
    return (
      <div className={styles.stageSelector}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Chargement des stages terminés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stageSelector}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaCheck className={styles.icon} />
          Sélectionner un stage à évaluer
        </h2>
        <p className={styles.subtitle}>
          Choisissez un stage terminé qui n'a pas encore été évalué
        </p>
      </div>

      {/* Barre de recherche */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher par nom de stagiaire ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Liste des stages */}
      <div className={styles.stagesSection}>
        {filteredStages.length === 0 ? (
          <div className={styles.emptyState}>
            <FaExclamationTriangle className={styles.emptyIcon} />
            <h3>Aucun stage disponible</h3>
            <p>
              {stages.length === 0 
                ? "Tous les stages terminés ont déjà été évalués."
                : "Aucun stage ne correspond à votre recherche."
              }
            </p>
          </div>
        ) : (
          <div className={styles.stagesList}>
            {filteredStages.map(stage => (
              <div
                key={stage.id}
                className={`${styles.stageCard} ${
                  selectedStage?.id === stage.id ? styles.selected : ''
                }`}
                onClick={() => handleStageSelect(stage)}
              >
                <div className={styles.stageHeader}>
                  <div className={styles.stageTitle}>
                    {stage.description || 'Stage sans description'}
                  </div>
                  <div className={styles.selectionIndicator}>
                    {selectedStage?.id === stage.id && (
                      <FaCheck className={styles.checkIcon} />
                    )}
                  </div>
                </div>

                <div className={styles.stageContent}>
                  <div className={styles.stageInfo}>
                    <div className={styles.infoRow}>
                      <FaUser className={styles.infoIcon} />
                      <span className={styles.infoText}>
                        {stage.stagiaire?.prenom} {stage.stagiaire?.nom}
                      </span>
                    </div>

                    <div className={styles.infoRow}>
                      <FaBuilding className={styles.infoIcon} />
                      <span className={styles.infoText}>
                        {stage.entreprise?.raison_social}
                      </span>
                    </div>

                    <div className={styles.infoRow}>
                      <FaCalendarAlt className={styles.infoIcon} />
                      <span className={styles.infoText}>
                        Du {formatDate(stage.date_debut)} au {formatDate(stage.date_fin)}
                      </span>
                    </div>
                  </div>

                  {stage.objectifs && (
                    <div className={styles.objectives}>
                      <strong>Objectifs :</strong>
                      <p className={styles.objectivesText}>
                        {stage.objectifs.length > 100 
                          ? `${stage.objectifs.substring(0, 100)}...`
                          : stage.objectifs
                        }
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.stageMeta}>
                  <span className={styles.statusBadge}>
                    <FaCheck className={styles.statusIcon} />
                    Terminé
                  </span>
                  <span className={styles.stageId}>
                    Stage #{stage.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Annuler
        </button>
        
        <button
          onClick={handleConfirmSelection}
          className={styles.confirmButton}
          disabled={!selectedStage}
        >
          <FaArrowRight className={styles.buttonIcon} />
          Évaluer ce stage
        </button>
      </div>

      {/* Info sélection */}
      {selectedStage && (
        <div className={styles.selectionSummary}>
          <div className={styles.summaryHeader}>
            <FaCheck className={styles.summaryIcon} />
            <span>Stage sélectionné</span>
          </div>
          <div className={styles.summaryContent}>
            <strong>{selectedStage.description}</strong>
            <span>
              {selectedStage.stagiaire?.prenom} {selectedStage.stagiaire?.nom}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageSelector;
