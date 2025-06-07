import React, { useState } from "react";
import styles from "./CandidaturesFilters.module.css";

const CandidaturesFilters = ({
  filters,
  onFiltersChange,
  onReset,
  offres = [],
  type = "recruteur",
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const statusOptions =
    type === "stagiaire"
      ? [
          { value: "", label: "Tous les statuts" },
          { value: "en_attente", label: "En attente" },
          { value: "en_cours", label: "En cours d'examen" },
          { value: "acceptee", label: "Acceptées" },
          { value: "refusee", label: "Refusées" },
          { value: "retiree", label: "Retirées" },
        ]
      : [
          { value: "", label: "Tous les statuts" },
          { value: "en_attente", label: "En attente" },
          { value: "en_cours", label: "En cours" },
          { value: "acceptee", label: "Acceptées" },
          { value: "refusee", label: "Refusées" },
        ];

  const handleFilterChange = (name, value) => {
    onFiltersChange({
      ...filters,
      [name]: value,
    });
  };
  const handleReset = () => {
    onReset();
    setShowAdvanced(false);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>Filtres</h3>
        <div className={styles.filtersActions}>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={styles.advancedToggle}
          >
            {showAdvanced ? "Masquer" : "Filtres avancés"}
          </button>
          <button onClick={handleReset} className={styles.resetButton}>
            Réinitialiser
          </button>
        </div>
      </div>

      <div className={styles.basicFilters}>
        <div className={styles.filterGroup}>
          <label htmlFor="status" className={styles.filterLabel}>
            Statut :
          </label>
          <select
            id="status"
            value={filters.status_filter || ""}
            onChange={(e) =>
              handleFilterChange("status_filter", e.target.value)
            }
            className={styles.filterSelect}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {type === "recruteur" && offres.length > 0 && (
          <div className={styles.filterGroup}>
            <label htmlFor="offre" className={styles.filterLabel}>
              Offre :
            </label>
            <select
              id="offre"
              value={filters.offre_id || ""}
              onChange={(e) => handleFilterChange("offre_id", e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Toutes mes offres</option>
              {offres.map((offre) => (
                <option key={offre.id} value={offre.id}>
                  {offre.titre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {showAdvanced && (
        <div className={styles.advancedFilters}>
          <div className={styles.filterGroup}>
            <label htmlFor="search" className={styles.filterLabel}>
              Recherche :
            </label>
            <input
              type="text"
              id="search"
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Nom, compétences, entreprise..."
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="niveau" className={styles.filterLabel}>
              Niveau d'études :
            </label>
            <select
              id="niveau"
              value={filters.niveau_etudes || ""}
              onChange={(e) =>
                handleFilterChange("niveau_etudes", e.target.value)
              }
              className={styles.filterSelect}
            >
              <option value="">Tous les niveaux</option>
              <option value="Bac+2">Bac+2</option>
              <option value="Bac+3">Bac+3</option>
              <option value="Bac+4">Bac+4</option>
              <option value="Bac+5">Bac+5</option>
              <option value="Bac+8">Bac+8+</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="dateDebut" className={styles.filterLabel}>
              Candidature depuis :
            </label>
            <input
              type="date"
              id="dateDebut"
              value={filters.date_debut || ""}
              onChange={(e) => handleFilterChange("date_debut", e.target.value)}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="dateFin" className={styles.filterLabel}>
              Candidature jusqu'à :
            </label>
            <input
              type="date"
              id="dateFin"
              value={filters.date_fin || ""}
              onChange={(e) => handleFilterChange("date_fin", e.target.value)}
              className={styles.filterInput}
            />
          </div>

          {type === "recruteur" && (
            <>
              <div className={styles.filterGroup}>
                <label htmlFor="noteMin" className={styles.filterLabel}>
                  Note minimum :
                </label>
                <input
                  type="number"
                  id="noteMin"
                  min="1"
                  max="10"
                  value={filters.note_min || ""}
                  onChange={(e) =>
                    handleFilterChange("note_min", e.target.value)
                  }
                  className={styles.filterInput}
                />
              </div>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Avec CV :</label>
                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="avecCv"
                    checked={filters.avec_cv || false}
                    onChange={(e) =>
                      handleFilterChange("avec_cv", e.target.checked)
                    }
                    className={styles.filterCheckbox}
                  />
                  <label htmlFor="avecCv">
                    Candidatures avec CV uniquement
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidaturesFilters;
