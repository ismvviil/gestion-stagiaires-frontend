import { useState, useEffect, useCallback } from 'react';
import { stagesService, missionsService } from '../services/stagesService';

export const useStages = (filters = {}) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stagesService.getMyStages(filters.status || null);
      setStages(data);
    } catch (err) {
      console.error('Erreur lors du chargement des stages:', err);
      setError('Erreur lors du chargement des stages');
    } finally {
      setLoading(false);
    }
  }, [filters.status]);

  const stageAction = useCallback(async (stageId, action, data = {}) => {
    try {
      await stagesService.stageAction(stageId, action, data);
      await loadStages(); // Recharger les stages
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de l\'action sur le stage:', err);
      setError('Erreur lors de l\'action sur le stage');
      return { success: false, error: err.message };
    }
  }, [loadStages]);

  const updateStage = useCallback(async (stageId, data) => {
    try {
      await stagesService.updateStage(stageId, data);
      await loadStages(); // Recharger les stages
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError('Erreur lors de la mise à jour du stage');
      return { success: false, error: err.message };
    }
  }, [loadStages]);

  useEffect(() => {
    loadStages();
  }, [loadStages]);

  return {
    stages,
    loading,
    error,
    loadStages,
    stageAction,
    updateStage,
    setError
  };
};

export const useMissions = (stageId = null, filters = {}) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (stageId) {
        data = await missionsService.getMissionsByStage(stageId);
      } else {
        data = await missionsService.getMissions(filters);
      }
      
      setMissions(data);
    } catch (err) {
      console.error('Erreur lors du chargement des missions:', err);
      setError('Erreur lors du chargement des missions');
    } finally {
      setLoading(false);
    }
  }, [stageId, filters]);

  const missionAction = useCallback(async (missionId, action, data = {}) => {
    try {
      await missionsService.missionAction(missionId, action, data);
      await loadMissions(); // Recharger les missions
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de l\'action sur la mission:', err);
      setError('Erreur lors de l\'action sur la mission');
      return { success: false, error: err.message };
    }
  }, [loadMissions]);

  const updateMission = useCallback(async (missionId, data) => {
    try {
      await missionsService.updateMission(missionId, data);
      await loadMissions(); // Recharger les missions
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError('Erreur lors de la mise à jour de la mission');
      return { success: false, error: err.message };
    }
  }, [loadMissions]);

  const createMission = useCallback(async (data) => {
    try {
      await missionsService.createMission(data);
      await loadMissions(); // Recharger les missions
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la création:', err);
      setError('Erreur lors de la création de la mission');
      return { success: false, error: err.message };
    }
  }, [loadMissions]);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  return {
    missions,
    loading,
    error,
    loadMissions,
    missionAction,
    updateMission,
    createMission,
    setError
  };
};

// Hook pour les statistiques
export const useStageStats = (stages = []) => {
  const stats = {
    total: stages.length,
    enAttente: stages.filter(s => s.status === 'en_attente').length,
    enCours: stages.filter(s => s.status === 'en_cours').length,
    termines: stages.filter(s => s.status === 'termine').length,
    interrompus: stages.filter(s => s.status === 'interrompu').length,
    suspendus: stages.filter(s => s.status === 'suspendu').length
  };

  const progressionMoyenne = stages.length > 0 
    ? Math.round(stages.reduce((acc, stage) => {
        if (stage.status === 'termine') return acc + 100;
        if (stage.status === 'en_cours') {
          // Calculer la progression basée sur les dates
          const start = new Date(stage.date_debut);
          const end = new Date(stage.date_fin);
          const now = new Date();
          
          if (now < start) return acc + 0;
          if (now > end) return acc + 100;
          
          const total = end - start;
          const current = now - start;
          return acc + Math.round((current / total) * 100);
        }
        return acc;
      }, 0) / stages.length)
    : 0;

  return {
    ...stats,
    progressionMoyenne
  };
};

export const useMissionStats = (missions = []) => {
  const stats = {
    total: missions.length,
    aFaire: missions.filter(m => m.status === 'a_faire').length,
    enCours: missions.filter(m => m.status === 'en_cours').length,
    enRevision: missions.filter(m => m.status === 'en_revision').length,
    terminees: missions.filter(m => m.status === 'terminee').length,
    annulees: missions.filter(m => m.status === 'annulee').length
  };

  const progressionMoyenne = missions.length > 0 
    ? Math.round(missions.reduce((acc, mission) => acc + mission.pourcentage_completion, 0) / missions.length)
    : 0;

  const noteMoyenne = missions.filter(m => m.note_mission).length > 0
    ? missions.filter(m => m.note_mission).reduce((acc, mission) => acc + mission.note_mission, 0) / missions.filter(m => m.note_mission).length
    : null;

  return {
    ...stats,
    progressionMoyenne,
    noteMoyenne: noteMoyenne ? Math.round(noteMoyenne * 10) / 10 : null
  };
};