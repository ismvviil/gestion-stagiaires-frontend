// src/services/api.service.js

import axios from "../api/axios";
import { createConversation, createMessage } from "../types/messaging.types";

// ====================================
// SERVICE CONVERSATIONS
// ====================================

export const conversationService = {
  // Récupérer toutes mes conversations
  async getMyConversations() {
    try {
      const response = await axios.get("/conversations");
      
      // Transformer les données pour correspondre à nos types
      return response.data.map(conv => createConversation({
        id: conv.id,
        created_at: conv.created_at,
        updated_at: conv.updated_at,
        est_active: conv.est_active,
        participant1_id: conv.participant1_id,
        participant2_id: conv.participant2_id,
        dernier_message: conv.dernier_message ? createMessage(conv.dernier_message) : null,
        messages_non_lus: conv.messages_non_lus || 0,
        autre_participant: conv.autre_participant
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des conversations:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors de la récupération des conversations"
      );
    }
  },

  // Créer ou récupérer une conversation avec un utilisateur
  async createOrGetConversation(participantId) {
    try {
      const response = await axios.post("/conversations", {
        participant_id: participantId
      });
      
      return createConversation(response.data);
    } catch (error) {
      console.error("Erreur lors de la création de la conversation:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors de la création de la conversation"
      );
    }
  },

  // Récupérer une conversation spécifique
  async getConversation(conversationId) {
    try {
      const response = await axios.get(`/conversations/${conversationId}`);
      return createConversation(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la conversation:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Conversation non trouvée"
      );
    }
  },

  // Marquer une conversation comme lue
  async markConversationAsRead(conversationId) {
    try {
      await axios.put(`/conversations/${conversationId}/mark-as-read`);
      return true;
    } catch (error) {
      console.error("Erreur lors du marquage comme lu:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors du marquage comme lu"
      );
    }
  }
};

// ====================================
// SERVICE MESSAGES  
// ====================================

export const messageService = {
  // Récupérer les messages d'une conversation avec pagination
  async getConversationMessages(conversationId, skip = 0, limit = 50) {
    try {
      const response = await axios.get(
        `/messages/conversation/${conversationId}?skip=${skip}&limit=${limit}`
      );
      
      const data = response.data;
      return {
        conversation_id: data.conversation_id,
        messages: data.messages.map(msg => createMessage(msg)),
        total: data.total,
        hasMore: skip + data.messages.length < data.total
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors de la récupération des messages"
      );
    }
  },

  // Envoyer un message (via API REST - backup du WebSocket)
  async sendMessage(conversationId, contenu, typeMessage = "texte") {
    try {
      const response = await axios.post("/messages", {
        conversation_id: conversationId,
        contenu: contenu,
        type_message: typeMessage
      });
      
      return createMessage(response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors de l'envoi du message"
      );
    }
  },

  // Marquer un message comme lu
  async markMessageAsRead(messageId) {
    try {
      const response = await axios.put(`/messages/${messageId}/read`);
      return createMessage(response.data);
    } catch (error) {
      console.error("Erreur lors du marquage du message:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors du marquage du message"
      );
    }
  },

  // Récupérer le nombre de messages non lus
  async getUnreadCount() {
    try {
      const response = await axios.get("/messages/unread-count");
      return response.data.unread_count;
    } catch (error) {
      console.error("Erreur lors de la récupération du compteur:", error);
      return 0; // Retourner 0 en cas d'erreur plutôt que de planter
    }
  }
};

// ====================================
// SERVICE UTILISATEURS (pour la recherche)
// ====================================

export const userService = {
  // Rechercher des utilisateurs pour démarrer une conversation
  async searchUsers(query, userType = null) {
    try {
      let url = `/users/search?q=${encodeURIComponent(query)}`;
      if (userType) {
        url += `&type=${userType}`;
      }
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche d'utilisateurs:", error);
      throw new Error(
        error.response?.data?.detail || 
        "Erreur lors de la recherche d'utilisateurs"
      );
    }
  },

  // Récupérer les utilisateurs de mon entreprise (pour les RH/Recruteurs)
  async getCompanyUsers() {
    try {
      const response = await axios.get("/users/company");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }
};

// ====================================
// HELPERS POUR LA GESTION D'ERREURS
// ====================================

export const handleApiError = (error, defaultMessage = "Une erreur est survenue") => {
  console.error("Erreur API:", error);
  
  if (error.response) {
    // Erreur de réponse du serveur
    const detail = error.response.data?.detail;
    if (typeof detail === "string") {
      return detail;
    } else if (Array.isArray(detail)) {
      return detail.map(err => err.msg || err.message).join(", ");
    }
    return `Erreur ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    // Erreur réseau
    return "Erreur de connexion. Vérifiez votre connexion internet.";
  } else {
    // Autre erreur
    return error.message || defaultMessage;
  }
};

// ====================================
// CONFIGURATION DES INTERCEPTEURS AXIOS
// ====================================

// Intercepteur pour ajouter automatiquement le token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer l'expiration du token
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers la connexion
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);