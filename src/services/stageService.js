import axios from "../api/axios";

// Services pour les stages
export const stagesService = {
  // Récupérer tous les stages de l'utilisateur
  getMyStages: async (statusFilter = null) => {
    const params = statusFilter ? { status_filter: statusFilter } : {};
    const response = await axios.get("/stages/", { params });
    return response.data;
  },

  // Récupérer un stage spécifique
  getStage: async (stageId) => {
    const response = await axios.get(`/stages/${stageId}`);
    return response.data;
  },

  // Mettre à jour un stage
  updateStage: async (stageId, data) => {
    const response = await axios.put(`/stages/${stageId}`, data);
    return response.data;
  },

  // Effectuer une action sur un stage (commencer, terminer, etc.)
  stageAction: async (stageId, action, data = {}) => {
    const response = await axios.put(`/stages/${stageId}/action`, {
      action,
      ...data,
    });
    return response.data;
  },

  // Récupérer les infos de candidature liée au stage
  getStageCandidature: async (stageId) => {
    const response = await axios.get(`/stages/${stageId}/candidature`);
    return response.data;
  },

  // Supprimer un stage (cas exceptionnel)
  deleteStage: async (stageId) => {
    const response = await axios.delete(`/stages/${stageId}`);
    return response.data;
  },
};

// Services pour les missions
export const missionsService = {
  // Créer une nouvelle mission
  createMission: async (missionData) => {
    const response = await axios.post("/missions/", missionData);
    return response.data;
  },

  // Récupérer toutes les missions
  getMissions: async (filters = {}) => {
    const response = await axios.get("/missions/", { params: filters });
    return response.data;
  },

  // Récupérer une mission spécifique
  getMission: async (missionId) => {
    const response = await axios.get(`/missions/${missionId}`);
    return response.data;
  },

  // Mettre à jour une mission
  updateMission: async (missionId, data) => {
    const response = await axios.put(`/missions/${missionId}`, data);
    return response.data;
  },

  // Effectuer une action sur une mission
  missionAction: async (missionId, action, data = {}) => {
    const response = await axios.put(`/missions/${missionId}/action`, {
      action,
      ...data,
    });
    return response.data;
  },

  // Récupérer les missions d'un stage spécifique
  getMissionsByStage: async (stageId) => {
    const response = await axios.get(`/missions/stage/${stageId}/missions`);
    return response.data;
  },

  // Supprimer une mission
  deleteMission: async (missionId) => {
    const response = await axios.delete(`/missions/${missionId}`);
    return response.data;
  },
};
