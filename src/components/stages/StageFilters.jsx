import React from 'react';
import styles from './StageFilters.module.css';

const StageFilters = ({ filters, onFiltersChange, currentUser }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: '',
      search: ''
    });
  };

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'en_attente', label: 'En attente' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'termine', label: 'Terminés' },
    { value: 'interrompu', label: 'Interrompus' },
    { value: 'suspendu', label: 'Suspendus' }
  ];

  const hasActiveFilters = filters.status || filters.search;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersGrid}>
        {/* Filtre par statut */}
        <div className={styles.filterGroup}>
          <label htmlFor="status-filter" className={styles.filterLabel}>
            Statut
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className={styles.filterSelect}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Recherche */}
        <div className={styles.filterGroup}>
          <label htmlFor="search-filter" className={styles.filterLabel}>
            Recherche
          </label>
          <input
            id="search-filter"
            type="text"
            placeholder="Rechercher dans les objectifs, description..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={styles.filterInput}
          />
        </div>

        {/* Bouton pour réinitialiser */}
        {hasActiveFilters && (
          <div className={styles.filterGroup}>
            <button
              onClick={clearFilters}
              className={styles.clearButton}
              type="button"
            >
              🗑️ Effacer les filtres
            </button>
          </div>
        )}
      </div>

      {/* Indicateurs de filtres actifs */}
      {hasActiveFilters && (
        <div className={styles.activeFilters}>
          <span className={styles.activeFiltersLabel}>Filtres actifs :</span>
          {filters.status && (
            <span className={styles.filterTag}>
              Statut: {statusOptions.find(opt => opt.value === filters.status)?.label}
              <button
                onClick={() => handleFilterChange('status', '')}
                className={styles.removeFilterButton}
              >
                ×
              </button>
            </span>
          )}
          {filters.search && (
            <span className={styles.filterTag}>
              Recherche: "{filters.search}"
              <button
                onClick={() => handleFilterChange('search', '')}
                className={styles.removeFilterButton}
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StageFilters;