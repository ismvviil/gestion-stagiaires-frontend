import axios from '../api/axios';

const OFFRES_URL = '/offres';

export const getAllOffres = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const response = await axios.get(OFFRES_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error);
    throw error;
  }
};


export const getOffreById = async (id) => {
  try {
    const response = await axios.get(`${OFFRES_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'offre ${id}:`, error);
    throw error;
  }
};

export const createOffre = async (offreData) => {
  try {
    const response = await axios.post(OFFRES_URL, offreData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'offre:', error);
    throw error;
  }
};

export const updateOffre = async (id, offreData) => {
  try {
    const response = await axios.put(`${OFFRES_URL}/${id}`, offreData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'offre ${id}:`, error);
    throw error;
  }
};

export const deleteOffre = async (id) => {
  try {
    const response = await axios.delete(`${OFFRES_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'offre ${id}:`, error);
    throw error;
  }
};

export const publierOffre = async (id) => {
  try {
    const response = await axios.put(`${OFFRES_URL}/${id}/publier`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la publication de l'offre ${id}:`, error);
    throw error;
  }
};

export const fermerOffre = async (id) => {
  try {
    const response = await axios.put(`${OFFRES_URL}/${id}/fermer`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la fermeture de l'offre ${id}:`, error);
    throw error;
  }
};