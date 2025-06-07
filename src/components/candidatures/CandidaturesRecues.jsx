import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getCandidaturesRecues,
  traiterCandidature,
} from "../../services/candidatureService";
import { getAllOffres } from "../../services/offreService";
import CandidatureRecueCard from "./CandidatureRecueCard";
import styles from "./CandidaturesRecues.module.css";
import CandidatureDetailModal from "./CandidatureDetailModal";
import CandidaturesStats from "./CandidaturesStats";
import CandidaturesFilters from "./CandidaturesFilters";

// const CandidaturesRecues = () => {
//   const { currentUser } = useAuth();
//   const [candidatures, setCandidatures] = useState([]);
//   const [mesOffres, setMesOffres] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [selectedCandidature, setSelectedCandidature] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Filtres
//   const [filters, setFilters] = useState({
//     status_filter: "",
//     offre_id: "",
//     skip: 0,
//     limit: 50,
//   });

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const candidaturesData = await getCandidaturesRecues(filters);
//       setCandidatures(candidaturesData || []);

//       const offresData = await getAllOffres({
//         est_active: undefined,
//       });
//       setMesOffres(offresData?.offres || []);
      
//     } catch (err) {
//       setError("Erreur lors de la récupération des candidatures");
//       console.error(err);
//       setCandidatures([]);
//       setMesOffres([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filters.status_filter, filters.offre_id, filters.skip]);

//   const handleOpenModal = (candidature) => {
//     setSelectedCandidature(candidature);
//     setShowModal(true);
//   };

//   const handleTraiterCandidature = async (candidatureId, action, data) => {
//     try {
//       setError("");
//       await traiterCandidature(candidatureId, action, data);

//       const actionLabels = {
//         accepter: "acceptée",
//         refuser: "refusée",
//         en_cours: "mise en cours d'examen",
//       };
      
//       setSuccess(`Candidature ${actionLabels[action]} avec succès`);

//       // Mettre à jour la candidature dans la liste
//       setCandidatures((prev) =>
//         prev.map((candidature) =>
//           candidature.id === candidatureId
//             ? {
//                 ...candidature,
//                 status:
//                   action === "accepter"
//                     ? "acceptee"
//                     : action === "refuser"
//                     ? "refusee"
//                     : "en_cours",
//                 commentaires_recruteur: data.commentaires,
//                 note_recruteur: data.note,
//               }
//             : candidature
//         )
//       );
      
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.detail ||
//           "Erreur lors du traitement de la candidature"
//       );
//       setTimeout(() => setError(""), 5000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <p>Chargement des candidatures...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.candidaturesContainer}>
//       <div className={styles.header}>
//         <h1 className={styles.pageTitle}>Candidatures reçues</h1>
//       </div>

//       {error && <div className={styles.errorMessage}>{error}</div>}
//       {success && <div className={styles.successMessage}>{success}</div>}

//       <CandidaturesStats candidatures={candidatures} type="recruteur" />

//       <CandidaturesFilters
//         filters={filters}
//         onFiltersChange={(newFilters) =>
//           setFilters({ ...filters, ...newFilters })
//         }
//         onReset={() =>
//           setFilters({ status_filter: "", offre_id: "", skip: 0, limit: 50 })
//         }
//         offres={mesOffres}
//         type="recruteur"
//       />

//       <div className={styles.candidaturesList}>
//         {candidatures.length === 0 ? (
//           <div className={styles.noCandidatures}>
//             <h3>Aucune candidature reçue</h3>
//             <p>
//               Vous n'avez pas encore reçu de candidatures pour vos offres de
//               stage.
//             </p>
//           </div>
//         ) : (
//           candidatures.map((candidature) => (
//             <CandidatureRecueCard
//               key={candidature.id}
//               candidature={candidature}
//               onTraiter={handleTraiterCandidature}
//               onOpenModal={handleOpenModal}
//             />
//           ))
//         )}
//       </div>

//       <CandidatureDetailModal
//         candidature={selectedCandidature}
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           setSelectedCandidature(null);
//         }}
//         onUpdate={(updatedCandidature) => {
//           setCandidatures((prev) =>
//             prev.map((c) =>
//               c.id === updatedCandidature.id ? updatedCandidature : c
//             )
//           );
//           setShowModal(false);
//           setSelectedCandidature(null);
//           setSuccess("Candidature traitée avec succès");
//           setTimeout(() => setSuccess(""), 3000);
//         }}
//       />
//     </div>
//   );
// };

const CandidaturesRecues = () => {
  const { currentUser } = useAuth();
  const [candidatures, setCandidatures] = useState([]);
  const [mesOffres, setMesOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filtres
  const [filters, setFilters] = useState({
    status_filter: "",
    offre_id: "",
    skip: 0,
    limit: 50,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const candidaturesData = await getCandidaturesRecues(filters);
      setCandidatures(candidaturesData || []);

      const offresData = await getAllOffres({
        est_active: undefined,
      });
      setMesOffres(offresData?.offres || []);
      
    } catch (err) {
      setError("Erreur lors de la récupération des candidatures");
      console.error(err);
      setCandidatures([]);
      setMesOffres([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.status_filter, filters.offre_id, filters.skip]);

  const handleOpenModal = (candidature) => {
    console.log("Opening modal for candidature:", candidature); // Debug
    setSelectedCandidature(candidature);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal"); // Debug
    setShowModal(false);
    setSelectedCandidature(null);
  };

  const handleTraiterCandidature = async (candidatureId, action, data) => {
    try {
      setError("");
      await traiterCandidature(candidatureId, action, data);

      const actionLabels = {
        accepter: "acceptée",
        refuser: "refusée",
        en_cours: "mise en cours d'examen",
      };
      
      setSuccess(`Candidature ${actionLabels[action]} avec succès`);

      // Mettre à jour la candidature dans la liste
      setCandidatures((prev) =>
        prev.map((candidature) =>
          candidature.id === candidatureId
            ? {
                ...candidature,
                status:
                  action === "accepter"
                    ? "acceptee"
                    : action === "refuser"
                    ? "refusee"
                    : "en_cours",
                commentaires_recruteur: data.commentaires,
                note_recruteur: data.note,
              }
            : candidature
        )
      );
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Erreur lors du traitement de la candidature"
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleUpdateCandidature = (updatedCandidature) => {
    setCandidatures((prev) =>
      prev.map((c) =>
        c.id === updatedCandidature.id ? updatedCandidature : c
      )
    );
    handleCloseModal();
    setSuccess("Candidature traitée avec succès");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Chargement des candidatures...</p>
      </div>
    );
  }

  return (
    <div className={styles.candidaturesContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Candidatures reçues</h1>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <CandidaturesStats candidatures={candidatures} type="recruteur" />

      <CandidaturesFilters
        filters={filters}
        onFiltersChange={(newFilters) =>
          setFilters({ ...filters, ...newFilters })
        }
        onReset={() =>
          setFilters({ status_filter: "", offre_id: "", skip: 0, limit: 50 })
        }
        offres={mesOffres}
        type="recruteur"
      />

      <div className={styles.candidaturesList}>
        {candidatures.length === 0 ? (
          <div className={styles.noCandidatures}>
            <h3>Aucune candidature reçue</h3>
            <p>
              Vous n'avez pas encore reçu de candidatures pour vos offres de
              stage.
            </p>
          </div>
        ) : (
          candidatures.map((candidature) => (
            <CandidatureRecueCard
              key={candidature.id}
              candidature={candidature}
              onTraiter={handleTraiterCandidature}
              onOpenModal={handleOpenModal}
            />
          ))
        )}
      </div>

      {/* Modal - Déplacé en dehors de la liste pour éviter les problèmes de z-index */}
      {showModal && selectedCandidature && (
        <CandidatureDetailModal
          candidature={selectedCandidature}
          isOpen={showModal}
          onClose={handleCloseModal}
          onUpdate={handleUpdateCandidature}
        />
      )}
    </div>
  );
};
export default CandidaturesRecues;