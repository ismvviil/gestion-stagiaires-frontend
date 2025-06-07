// Service pour intégrer la messagerie dans les stages/missions
import axios from '../api/axios';

export const stageMessagingService = {
  // Créer ou récupérer une conversation entre recruteur et stagiaire pour un stage
  getStageConversation: async (stageId) => {
    try {
      // D'abord récupérer les infos du stage
      const stageResponse = await axios.get(`/stages/${stageId}`);
      const stage = stageResponse.data;
      
      // Ensuite récupérer ou créer la conversation
      const conversationResponse = await axios.post('/conversations/', {
        participant2_id: stage.stagiaire_id // Si on est le recruteur
        // Ton backend va automatiquement gérer si la conversation existe déjà
      });
      
      return {
        conversation: conversationResponse.data,
        stage: stage
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation du stage:', error);
      throw error;
    }
  },

  // Créer ou récupérer une conversation pour une mission spécifique
  getMissionConversation: async (missionId) => {
    try {
      // Récupérer les infos de la mission
      const missionResponse = await axios.get(`/missions/${missionId}`);
      const mission = missionResponse.data;
      
      // Récupérer les infos du stage lié
      const stageResponse = await axios.get(`/stages/${mission.stage_id}`);
      const stage = stageResponse.data;
      
      // Créer ou récupérer la conversation
      const conversationResponse = await axios.post('/conversations/', {
        participant2_id: stage.stagiaire_id // Si on est le recruteur
      });
      
      return {
        conversation: conversationResponse.data,
        mission: mission,
        stage: stage
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation de la mission:', error);
      throw error;
    }
  },

  // Envoyer un message avec contexte de stage
  sendStageMessage: async (conversationId, content, stageId) => {
    try {
      const response = await axios.post(`/conversations/${conversationId}/messages`, {
        contenu: content,
        context_type: 'stage',
        context_id: stageId
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message de stage:', error);
      throw error;
    }
  },

  // Envoyer un message avec contexte de mission
  sendMissionMessage: async (conversationId, content, missionId) => {
    try {
      const response = await axios.post(`/conversations/${conversationId}/messages`, {
        contenu: content,
        context_type: 'mission',
        context_id: missionId
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message de mission:', error);
      throw error;
    }
  },

  // Récupérer les conversations liées à un stage
  getStageConversations: async (stageId) => {
    try {
      const response = await axios.get(`/conversations/`, {
        params: {
          context_type: 'stage',
          context_id: stageId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations du stage:', error);
      throw error;
    }
  }
};