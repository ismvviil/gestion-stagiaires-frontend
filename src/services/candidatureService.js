import axios from '../api/axios';

const CANDIDATURES_URL = '/candidatures';

export const createCandidature = async (candidatureData) => {
  try {
    const response = await axios.post(CANDIDATURES_URL, candidatureData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la candidature:', error);
    throw error;
  }
};

export const uploadCV = async (candidatureId, cvFile) => {
  try {
    const formData = new FormData();
    formData.append('cv_file', cvFile);
    
    const response = await axios.post(`${CANDIDATURES_URL}/${candidatureId}/upload-cv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'upload du CV:', error);
    throw error;
  }
};

export const getMesCandidatures = async (skip = 0, limit = 100) => {
  try {
    const response = await axios.get(`${CANDIDATURES_URL}/mes-candidatures`, {
      params: { skip, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures:', error);
    throw error;
  }
};

export const retirerCandidature = async (candidatureId) => {
  try {
    const response = await axios.delete(`${CANDIDATURES_URL}/${candidatureId}/retirer`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du retrait de la candidature:', error);
    throw error;
  }
};

// export const downloadCV = (candidatureId) => {
//   // Cette fonction retourne l'URL pour télécharger le CV
//   return `${axios.defaults.baseURL}/candidatures/${candidatureId}/download-cv`;
// };

export const downloadCV = async (candidatureId) => {
  try {
    const response = await axios.get(`${CANDIDATURES_URL}/${candidatureId}/download-cv`, {
      responseType: 'blob', // Important pour les fichiers binaires
    });
    
    // Créer un blob et déclencher le téléchargement
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv_candidature_${candidatureId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erreur lors du téléchargement du CV:', error);
    throw error;
  }
};

export const getCandidaturesRecues = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const response = await axios.get(`${CANDIDATURES_URL}/recues`, { params });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures reçues:', error);
    throw error;
  }
};

export const traiterCandidature = async (candidatureId, action, data = {}) => {
  try {
    const response = await axios.put(`${CANDIDATURES_URL}/${candidatureId}/traiter`, {
      action,
      ...data
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du traitement de la candidature:', error);
    throw error;
  }
};

export const downloadCandidatureCV = async(candidatureId) => {
//   return `${axios.defaults.baseURL}/candidatures/${candidatureId}/download-cv`;
 try {
    const response = await axios.get(`${CANDIDATURES_URL}/${candidatureId}/download-cv`, {
      responseType: 'blob', // Important pour les fichiers binaires
    });
    
    // Créer un blob et déclencher le téléchargement
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv_candidature_${candidatureId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erreur lors du téléchargement du CV:', error);
    throw error;
  }
};


