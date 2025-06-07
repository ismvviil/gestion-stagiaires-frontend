import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { stagesService } from '../../services/stageService';
import StageCard from '../../components/stages/StageCard';
import StageFilters from '../../components/stages/StageFilters';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import styles from './StagesList.module.css';

const StagesList = () => {
  const { currentUser } = useAuth();
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

   // Charger les stages
  const loadStages = async () => {
    try {
      setLoading(true);
      const data = await stagesService.getMyStages(filters.status || null);
      setStages(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des stages:', err);
      setError('Erreur lors du chargement des stages');
    } finally {
      setLoading(false);
    }
  };

  // Charger les stages au montage et quand les filtres changent
  useEffect(() => {
    loadStages();
  }, [filters.status]);

  // Gérer les actions sur les stages
  const handleStageAction = async (stageId, action, data = {}) => {
    try {
      await stagesService.stageAction(stageId, action, data);
      // Recharger les stages après l'action
      await loadStages();
    } catch (err) {
      console.error('Erreur lors de l\'action sur le stage:', err);
      setError('Erreur lors de l\'action sur le stage');
    }
  };

  // Filtrer les stages côté client (pour la recherche)
  const filteredStages = stages.filter(stage => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        stage.description?.toLowerCase().includes(searchLower) ||
        stage.objectifs?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // Titre selon le type d'utilisateur
  const getPageTitle = () => {
    switch (currentUser.type) {
      case 'stagiaire':
        return 'Mes Stages';
      case 'recruteur':
        return 'Stages que j\'encadre';
      case 'responsable_rh':
        return 'Tous les Stages';
      default:
        return 'Stages';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{getPageTitle()}</h1>
        <div className={styles.headerStats}>
          <span className={styles.totalCount}>
            {filteredStages.length} stage{filteredStages.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filtres */}
      <StageFilters 
        filters={filters} 
        onFiltersChange={setFilters}
        currentUser={currentUser}
      />

      {/* Message d'erreur */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={loadStages} className={styles.retryButton}>
            Réessayer
          </button>
        </div>
      )}

      {/* Liste des stages */}
      <div className={styles.stagesGrid}>
        {filteredStages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎯</div>
            <h3>Aucun stage trouvé</h3>
            <p>
              {currentUser.type === 'stagiaire' 
                ? 'Vous n\'avez pas encore de stage. Postulez à des offres pour commencer !'
                : 'Aucun stage ne correspond à vos critères.'
              }
            </p>
          </div>
          ) : (
          filteredStages.map(stage => (
            <StageCard
              key={stage.id}
              stage={stage}
              currentUser={currentUser}
              onAction={handleStageAction}
              onRefresh={loadStages}
            />
          ))
        )}
      </div>
       {/* Statistiques en bas */}
      {filteredStages.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {filteredStages.filter(s => s.status === 'en_cours').length}
              </span>
              <span className={styles.statLabel}>En cours</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {filteredStages.filter(s => s.status === 'termine').length}
              </span>
              <span className={styles.statLabel}>Terminés</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {filteredStages.filter(s => s.status === 'en_attente').length}
              </span>
              <span className={styles.statLabel}>En attente</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StagesList;