// import axiosInstance from "../api/axios";

// class AdminService {
//   // Statistiques globales
//   async getStatistiquesGlobales() {
//     try {
//       const response = await axiosInstance.get('/admin/stats/globales');
//       return response.data;
//     } catch (error) {
//       console.error('Erreur récupération statistiques globales:', error);
//       throw error;
//     }
//   }

//   // Évolution temporelle
//   async getEvolutionTemporelle(mois = 12) {
//     try {
//       const response = await axiosInstance.get(`/admin/stats/evolution?mois=${mois}`);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur récupération évolution temporelle:', error);
//       throw error;
//     }
//   }

//   // Statistiques entreprises
//   async getStatsEntreprises(limit = 20) {
//     try {
//       const response = await axiosInstance.get(`/admin/stats/entreprises?limit=${limit}`);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur récupération stats entreprises:', error);
//       throw error;
//     }
//   }

//   // Statistiques par secteurs
//   async getStatsSecteurs() {
//     try {
//       const response = await axiosInstance.get('/admin/stats/secteurs');
//       return response.data;
//     } catch (error) {
//       console.error('Erreur récupération stats secteurs:', error);
//       throw error;
//     }
//   }

//   // Gestion des utilisateurs
//   async getUtilisateurs(filters = {}) {
//     try {
//       const params = new URLSearchParams();
      
//       if (filters.type) params.append('type_filtre', filters.type);
//       if (filters.actif !== undefined) params.append('actif_filtre', filters.actif);
//       if (filters.skip) params.append('skip', filters.skip);
//       if (filters.limit) params.append('limit', filters.limit);

//       const response = await axiosInstance.get(`/admin/utilisateurs?${params}`);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur récupération utilisateurs:', error);
//       throw error;
//     }
//   }

//   // Basculer le statut d'un utilisateur
//   async toggleUserStatus(userId) {
//     try {
//       const response = await axiosInstance.patch(`/admin/utilisateurs/${userId}/toggle-status`);
//       return response.data;
//     } catch (error) {
//       console.error('Erreur toggle statut utilisateur:', error);
//       throw error;
//     }
//   }
// }

// export default new AdminService();


import axios from '../api/axios';

class AdminService {
  async getStatistiquesGlobales() {
    try {
      console.log('📡 Appel API: /admin/stats/globales');
      const response = await axios.get('/admin/stats/globales');
      console.log('✅ Statistiques globales reçues:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération statistiques globales:', error);
      throw this.handleError(error);
    }
  }

  async getEvolutionTemporelle(mois = 12) {
    try {
      console.log(`📡 Appel API: /admin/stats/evolution?mois=${mois}`);
      const response = await axios.get(`/admin/stats/evolution?mois=${mois}`);
      console.log('✅ Évolution temporelle reçue:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération évolution temporelle:', error);
      throw this.handleError(error);
    }
  }

  async getStatsEntreprises(limit = 20) {
    try {
      console.log(`📡 Appel API: /admin/stats/entreprises?limit=${limit}`);
      const response = await axios.get(`/admin/stats/entreprises?limit=${limit}`);
      console.log('✅ Stats entreprises reçues:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération stats entreprises:', error);
      throw this.handleError(error);
    }
  }

  async getStatsSecteurs() {
    try {
      console.log('📡 Appel API: /admin/stats/secteurs');
      const response = await axios.get('/admin/stats/secteurs');
      console.log('✅ Stats secteurs reçues:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur récupération stats secteurs:', error);
      throw this.handleError(error);
    }
  }

//   async getUtilisateurs(filters = {}) {
//     try {
//       const params = new URLSearchParams();
      
//       if (filters.type) params.append('type_filtre', filters.type);
//       if (filters.actif !== undefined) params.append('actif_filtre', filters.actif);
//       if (filters.skip) params.append('skip', filters.skip);
//       if (filters.limit) params.append('limit', filters.limit);

//       console.log(`📡 Appel API: /admin/utilisateurs?${params}`);
//       const response = await axios.get(`/admin/utilisateurs?${params}`);
//       console.log('✅ Utilisateurs reçus:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('❌ Erreur récupération utilisateurs:', error);
//       throw this.handleError(error);
//     }
//   }
  async getUtilisateurs(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type_filtre', filters.type);
    // Vérifier que la valeur existe et est valide
    if (filters.actif !== undefined && filters.actif !== null && filters.actif !== '') {
      params.append('actif_filtre', filters.actif);
    }
    if (filters.skip) params.append('skip', filters.skip);
    if (filters.limit) params.append('limit', filters.limit);
    
    console.log(`📡 Appel API: /admin/utilisateurs?${params}`);
    const response = await axios.get(`/admin/utilisateurs?${params}`);
    console.log('✅ Utilisateurs reçus:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erreur récupération utilisateurs:', error);
    throw this.handleError(error);
  }
}

  async toggleUserStatus(userId) {
    try {
      console.log(`📡 Appel API: PATCH /admin/utilisateurs/${userId}/toggle-status`);
      const response = await axios.patch(`/admin/utilisateurs/${userId}/toggle-status`);
      console.log('✅ Statut utilisateur modifié:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur toggle statut utilisateur:', error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Erreur de réponse du serveur
      const status = error.response.status;
      const message = error.response.data?.detail || error.response.data?.message || 'Erreur serveur';
      
      switch (status) {
        case 401:
          return new Error('Non autorisé - Veuillez vous reconnecter');
        case 403:
          return new Error('Accès interdit - Droits admin requis');
        case 404:
          return new Error('Ressource non trouvée');
        case 500:
          return new Error('Erreur serveur interne');
        default:
          return new Error(message);
      }
    } else if (error.request) {
      // Erreur de réseau
      return new Error('Erreur de connexion au serveur');
    } else {
      // Erreur de configuration
      return new Error(error.message || 'Erreur inconnue');
    }
  }
}

export default new AdminService();