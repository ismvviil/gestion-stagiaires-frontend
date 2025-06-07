import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllEntreprises } from '../../services/entrepriseService';
import styles from './OffresFilters.module.css';

const OffresFilters = ({ filters, onFiltersChange, onReset }) => {
  const { currentUser } = useAuth();
  const [entreprises, setEntreprises] = useState([]);

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const data = await getAllEntreprises();
        setEntreprises(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des entreprises:', error);
      }
    };

    fetchEntreprises();
  }, []);

  const handleFilterChange = (name, value) => {
    onFiltersChange({
      ...filters,
      [name]: value
    });
  };

  const handleReset = () => {
    onReset();
  };

  // Vérifier si l'utilisateur peut voir le filtre de statut
  const canViewStatusFilter = currentUser?.type === 'recruteur' || currentUser?.type === 'responsable_rh';

  return (
    <div className={styles.filtersContainer}>
      <h3 className={styles.filtersTitle}>Filtrer les offres</h3>
      
      <div className={styles.filtersGrid}>
        <div className={styles.filterGroup}>
          <label htmlFor="titre" className={styles.filterLabel}>Titre</label>
          <input
            type="text"
            id="titre"
            value={filters.titre || ''}
            onChange={(e) => handleFilterChange('titre', e.target.value)}
            placeholder="Rechercher par titre..."
            className={styles.filterInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="secteur" className={styles.filterLabel}>Secteur</label>
          <input
            type="text"
            id="secteur"
            value={filters.secteur || ''}
            onChange={(e) => handleFilterChange('secteur', e.target.value)}
            placeholder="Ex: Informatique, Finance..."
            className={styles.filterInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="type_stage" className={styles.filterLabel}>Type de stage</label>
          <select
            id="type_stage"
            value={filters.type_stage || ''}
            onChange={(e) => handleFilterChange('type_stage', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Tous les types</option>
            <option value="Présentiel">Présentiel</option>
            <option value="Télétravail">Télétravail</option>
            <option value="Hybride">Hybride</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="localisation" className={styles.filterLabel}>Localisation</label>
          <input
            type="text"
            id="localisation"
            value={filters.localisation || ''}
            onChange={(e) => handleFilterChange('localisation', e.target.value)}
            placeholder="Ville ou région..."
            className={styles.filterInput}
          />
        </div>

        {/* Afficher le filtre entreprise seulement pour les responsables RH et stagiaires */}
        {currentUser?.type !== 'recruteur' && (
          <div className={styles.filterGroup}>
            <label htmlFor="entreprise_id" className={styles.filterLabel}>Entreprise</label>
            <select
              id="entreprise_id"
              value={filters.entreprise_id || ''}
              onChange={(e) => handleFilterChange('entreprise_id', e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Toutes les entreprises</option>
              {entreprises.map((entreprise) => (
                <option key={entreprise.id} value={entreprise.id}>
                  {entreprise.raison_social}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.filterGroup}>
          <label htmlFor="date_debut_min" className={styles.filterLabel}>Date de début (min)</label>
          <input
            type="date"
            id="date_debut_min"
            value={filters.date_debut_min || ''}
            onChange={(e) => handleFilterChange('date_debut_min', e.target.value)}
            className={styles.filterInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="date_debut_max" className={styles.filterLabel}>Date de début (max)</label>
          <input
            type="date"
            id="date_debut_max"
            value={filters.date_debut_max || ''}
            onChange={(e) => handleFilterChange('date_debut_max', e.target.value)}
            className={styles.filterInput}
          />
        </div>

        {/* Afficher le filtre de statut seulement pour les recruteurs et responsables RH */}
        {canViewStatusFilter && (
          <div className={styles.filterGroup}>
            <label htmlFor="est_active" className={styles.filterLabel}>Statut</label>
            <select
              id="est_active"
              value={filters.est_active !== undefined ? filters.est_active.toString() : 'true'}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : e.target.value === 'true';
                handleFilterChange('est_active', value);
              }}
              className={styles.filterSelect}
            >
              <option value="true">Actives seulement</option>
              <option value="false">Fermées seulement</option>
              <option value="">Toutes</option>
            </select>
          </div>
        )}
      </div>

      <div className={styles.filtersActions}>
        <button
          type="button"
          onClick={handleReset}
          className={styles.resetButton}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default OffresFilters;