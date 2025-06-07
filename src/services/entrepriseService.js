import axios from '../api/axios';

const ENTREPRISES_URL = '/entreprises';

export const getAllEntreprises = async () => {
  try {
    const response = await axios.get(ENTREPRISES_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des entreprises:', error);
    throw error;
  }
};

export const getEntrepriseById = async (id) => {
  try {
    const response = await axios.get(`${ENTREPRISES_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'entreprise ${id}:`, error);
    throw error;
  }
};