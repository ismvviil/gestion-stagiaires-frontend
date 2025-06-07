import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { missionsService, stagesService } from "../../services/stageService";
import MissionCard from "../../components/missions/MissionCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { FiArrowLeft, FiPlus, FiFilter, FiSearch } from "react-icons/fi";
import { MdAssignment } from "react-icons/md";
import styles from "./MissionsList.module.css";

const MissionsList = () => {
  const { stageId } = useParams();
  const { currentUser } = useAuth();

  const [stage, setStage] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priorite: "",
    search: "",
  });

  // Charger les données
  const loadData = async () => {
    try {
      setLoading(true);

      // Charger le stage
      const stageData = await stagesService.getStage(stageId);
      setStage(stageData);

      // Charger les missions du stage
      const missionsData = await missionsService.getMissionsByStage(stageId);
      setMissions(missionsData);

      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      setError("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [stageId]);

  // Gérer les actions sur les missions
  const handleMissionAction = async (missionId, action, data = {}) => {
    try {
      await missionsService.missionAction(missionId, action, data);
      await loadData(); // Recharger les missions
    } catch (err) {
      console.error("Erreur lors de l'action:", err);
      setError("Erreur lors de l'action sur la mission");
    }
  };

  // Filtrer les missions
  const filteredMissions = missions.filter((mission) => {
    // Filtre par statut
    if (filters.status && mission.status !== filters.status) {
      return false;
    }

    // Filtre par priorité
    if (filters.priorite && mission.priorite !== filters.priorite) {
      return false;
    }

    // Filtre de recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        mission.titre.toLowerCase().includes(searchLower) ||
        mission.description.toLowerCase().includes(searchLower) ||
        mission.objectifs?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Statistiques des missions
  const getStatistics = () => {
    const total = filteredMissions.length;
    const aFaire = filteredMissions.filter(
      (m) => m.status === "a_faire"
    ).length;
    const enCours = filteredMissions.filter(
      (m) => m.status === "en_cours"
    ).length;
    const enRevision = filteredMissions.filter(
      (m) => m.status === "en_revision"
    ).length;
    const terminees = filteredMissions.filter(
      (m) => m.status === "terminee"
    ).length;
    const annulees = filteredMissions.filter(
      (m) => m.status === "annulee"
    ).length;

    return { total, aFaire, enCours, enRevision, terminees, annulees };
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      priorite: "",
      search: "",
    });
  };

  const canManage =
    currentUser.type === "recruteur" && stage?.recruteur_id === currentUser.id;
  const stats = getStatistics();

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !stage) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2>Erreur</h2>
          <p>{error || "Stage non trouvé"}</p>
          <Link to="/mes-stages" className={styles.backButton}>
            Retour aux stages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to={`/stages/${stageId}`} className={styles.backButton}>
            <FiArrowLeft />
            Retour au stage
          </Link>

          <div className={styles.breadcrumb}>
            <h1 className={styles.title}>
              <MdAssignment className={styles.titleIcon} />
              Missions du stage
            </h1>
            <p className={styles.stageInfo}>
              {stage.description || "Stage sans description"}
            </p>
          </div>
        </div>

        {canManage && stage.status === "en_cours" && (
          <Link
            to={`/missions/nouvelle/${stageId}`}
            className={styles.addButton}
          >
            <FiPlus />
            Nouvelle mission
          </Link>
        )}
      </div>

      {/* Statistiques */}
      <div className={styles.statsContainer}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNumber} ${styles.todo}`}>
              {stats.aFaire}
            </span>
            <span className={styles.statLabel}>À faire</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNumber} ${styles.inProgress}`}>
              {stats.enCours}
            </span>
            <span className={styles.statLabel}>En cours</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNumber} ${styles.review}`}>
              {stats.enRevision}
            </span>
            <span className={styles.statLabel}>En révision</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNumber} ${styles.completed}`}>
              {stats.terminees}
            </span>
            <span className={styles.statLabel}>Terminées</span>
          </div>
          {stats.annulees > 0 && (
            <div className={styles.statCard}>
              <span className={`${styles.statNumber} ${styles.cancelled}`}>
                {stats.annulees}
              </span>
              <span className={styles.statLabel}>Annulées</span>
            </div>
          )}
        </div>
      </div>

      {/* Filtres */}
      <div className={styles.filtersContainer}>
        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FiFilter className={styles.filterIcon} />
              Statut
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Tous les statuts</option>
              <option value="a_faire">À faire</option>
              <option value="en_cours">En cours</option>
              <option value="en_revision">En révision</option>
              <option value="terminee">Terminées</option>
              <option value="annulee">Annulées</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FiFilter className={styles.filterIcon} />
              Priorité
            </label>
            <select
              value={filters.priorite}
              onChange={(e) => handleFilterChange("priorite", e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Toutes les priorités</option>
              <option value="basse">Basse</option>
              <option value="normale">Normale</option>
              <option value="haute">Haute</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FiSearch className={styles.filterIcon} />
              Recherche
            </label>
            <input
              type="text"
              placeholder="Rechercher par titre, description..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className={styles.filterInput}
            />
          </div>

          {(filters.status || filters.priorite || filters.search) && (
            <div className={styles.filterGroup}>
              <button onClick={clearFilters} className={styles.clearButton}>
                Effacer les filtres
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={loadData} className={styles.retryButton}>
            Réessayer
          </button>
        </div>
      )}

      {/* Liste des missions */}
      <div className={styles.missionsContainer}>
        {filteredMissions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <MdAssignment />
            </div>
            <h3>
              {missions.length === 0
                ? "Aucune mission assignée"
                : "Aucune mission ne correspond aux filtres"}
            </h3>
            <p>
              {missions.length === 0
                ? canManage
                  ? "Commencez par créer la première mission pour ce stage."
                  : "Aucune mission n'a encore été assignée pour ce stage."
                : "Essayez de modifier vos critères de recherche."}
            </p>

            {canManage &&
              missions.length === 0 &&
              stage.status === "en_cours" && (
                <Link
                  to={`/missions/nouvelle/${stageId}`}
                  className={styles.createFirstButton}
                >
                  <FiPlus />
                  Créer la première mission
                </Link>
              )}
          </div>
        ) : (
          <div className={styles.missionsGrid}>
            {filteredMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                currentUser={currentUser}
                onAction={handleMissionAction}
                onRefresh={loadData}
              />
            ))}
          </div>
        )}
      </div>

      {/* Informations sur le tri */}
      {filteredMissions.length > 0 && (
        <div className={styles.resultsInfo}>
          <p>
            Affichage de {filteredMissions.length} mission
            {filteredMissions.length > 1 ? "s" : ""}
            {missions.length !== filteredMissions.length &&
              ` sur ${missions.length} au total`}
          </p>
        </div>
      )}
    </div>
  );
};

export default MissionsList;
