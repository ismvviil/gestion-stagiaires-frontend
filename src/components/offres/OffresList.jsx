import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllOffres, publierOffre, fermerOffre, deleteOffre } from '../../services/offreService';
import OffresFilters from './OffresFilters';
import OffreCard from './OffreCard';
import styles from './OffresList.module.css';

const OffresList = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [offres, setOffres] = useState([]);
  const [totalOffres, setTotalOffres] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Filtres
  const [filters, setFilters] = useState({
    titre: '',
    secteur: '',
    type_stage: '',
    localisation: '',
    entreprise_id: '',
    date_debut_min: '',
    date_debut_max: '',
    est_active: true
  });

  const fetchOffres = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        ...filters,
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      };
      
      // Nettoyer les paramètres vides
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });
      
      const data = await getAllOffres(params);
      setOffres(data.offres || []);
      setTotalOffres(data.total || 0);
    } catch (err) {
      setError('Erreur lors de la récupération des offres');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffres();
  }, [filters, currentPage]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtres
  };

  const handleResetFilters = () => {
    setFilters({
      titre: '',
      secteur: '',
      type_stage: '',
      localisation: '',
      entreprise_id: '',
      date_debut_min: '',
      date_debut_max: '',
      est_active: true
    });
    setCurrentPage(1);
  };

  const handlePublier = async (offreId) => {
    try {
      setError('');
      await publierOffre(offreId);
      setSuccess('Offre publiée avec succès');
      fetchOffres(); // Rafraîchir la liste
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la publication de l\'offre');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleFermer = async (offreId) => {
    try {
      setError('');
      await fermerOffre(offreId);
      setSuccess('Offre fermée avec succès');
      fetchOffres(); // Rafraîchir la liste
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la fermeture de l\'offre');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleSupprimer = async (offreId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible.')) {
      try {
        setError('');
        await deleteOffre(offreId);
        setSuccess('Offre supprimée avec succès');
        fetchOffres(); // Rafraîchir la liste
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.detail || 'Erreur lors de la suppression de l\'offre');
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const totalPages = Math.ceil(totalOffres / itemsPerPage);

  return (
    <div className={styles.offresContainer}>
      <div className={styles.offresHeader}>
        <h1 className={styles.pageTitle}>Offres de stage</h1>
        
        {currentUser?.type === 'recruteur' && (
          <Link to="/offres/nouvelle" className={styles.createButton}>
            Créer une nouvelle offre
          </Link>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <div className={styles.offresContent}>
        <aside className={styles.filtersSection}>
          <OffresFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </aside>

        <main className={styles.offresSection}>
          <div className={styles.offresStats}>
            <p className={styles.statsText}>
              {totalOffres} offre{totalOffres !== 1 ? 's' : ''} trouvée{totalOffres !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <p>Chargement des offres...</p>
            </div>
          ) : offres.length === 0 ? (
            <div className={styles.noOffres}>
              <p>Aucune offre ne correspond à vos critères de recherche.</p>
              {currentUser?.type === 'recruteur' && (
                <Link to="/offres/nouvelle" className={styles.createButton}>
                  Créer la première offre
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className={styles.offresGrid}>
                {offres.map((offre) => (
                  <OffreCard
                    key={offre.id}
                    offre={offre}
                    onPublier={handlePublier}
                    onFermer={handleFermer}
                    onSupprimer={handleSupprimer}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                  >
                    Précédent
                  </button>
                  
                  <div className={styles.paginationInfo}>
                    Page {currentPage} sur {totalPages}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default OffresList;