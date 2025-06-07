import { useState, useEffect, useCallback } from 'react';
import AdminService from '../services/adminService';

export const useAdminStats = () => {
  const [statsGlobales, setStatsGlobales] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [statsEntreprises, setStatsEntreprises] = useState([]);
  const [statsSecteurs, setStatsSecteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Chargement des statistiques admin...');

      const [globales, evol, entreprises, secteurs] = await Promise.all([
        AdminService.getStatistiquesGlobales(),
        AdminService.getEvolutionTemporelle(12),
        AdminService.getStatsEntreprises(15),
        AdminService.getStatsSecteurs()
      ]);

      console.log('📊 Statistiques chargées:', {
        globales,
        evolution: evol,
        entreprises,
        secteurs
      });

      setStatsGlobales(globales);
      setEvolution(evol);
      setStatsEntreprises(entreprises);
      setStatsSecteurs(secteurs);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Erreur lors du chargement des statistiques';
      setError(errorMessage);
      console.error('❌ Erreur chargement stats admin:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllStats();
  }, [loadAllStats]);

  return {
    statsGlobales,
    evolution,
    statsEntreprises,
    statsSecteurs,
    loading,
    error,
    refetch: loadAllStats
  };
};