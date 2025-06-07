import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaSave,
  FaPlus,
} from "react-icons/fa";
import styles from "./EvaluationForm.module.css";
import axios from "../../api/axios";
const EvaluationForm = ({ stageId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    stage_id: stageId,
    commentaire_general: "",
    points_forts: "",
    points_amelioration: "",
    recommandations: "",
    recommande_embauche: null,
    details: [],
  });

  const [criteres, setCriteres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCriteres();
  }, []);

  

  const fetchCriteres = async () => {
    try {
      const response = await axios.get("/evaluations/criteres");
      const data = response.data;

      setCriteres(data); // Initialiser les détails avec tous les critères

      setFormData((prev) => ({
        ...prev,
        details: data.map((critere) => ({
          critere_id: critere.id,
          note: 5,
          commentaire: "",
        })),
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des critères:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Supprimer l'erreur si elle existe
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleDetailChange = (critereId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.map((detail) =>
        detail.critere_id === critereId ? { ...detail, [field]: value } : detail
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.commentaire_general?.trim()) {
      newErrors.commentaire_general = "Le commentaire général est requis";
    }

    if (!formData.points_forts?.trim()) {
      newErrors.points_forts = "Les points forts sont requis";
    }

    if (formData.recommande_embauche === null) {
      newErrors.recommande_embauche =
        "Veuillez indiquer si vous recommandez l'embauche";
    }

    // Vérifier que toutes les notes sont valides
    const invalidDetails = formData.details.filter(
      (detail) => !detail.note || detail.note < 1 || detail.note > 10
    );

    if (invalidDetails.length > 0) {
      newErrors.details = "Toutes les notes doivent être entre 1 et 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = (critereId, currentNote) => {
    return (
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((note) => (
          <FaStar
            key={note}
            className={`${styles.star} ${
              note <= currentNote ? styles.starFilled : styles.starEmpty
            }`}
            onClick={() => handleDetailChange(critereId, "note", note)}
          />
        ))}
        <span className={styles.noteValue}>{currentNote}/10</span>
      </div>
    );
  };

  return (
    <div className={styles.evaluationForm}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaUser className={styles.icon} />
          Nouvelle Évaluation
        </h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Informations générales */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Évaluation Générale</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Commentaire général *</label>
            <textarea
              className={`${styles.textarea} ${
                errors.commentaire_general ? styles.error : ""
              }`}
              value={formData.commentaire_general}
              onChange={(e) =>
                handleInputChange("commentaire_general", e.target.value)
              }
              placeholder="Évaluation générale du stagiaire..."
              rows={4}
            />
            {errors.commentaire_general && (
              <span className={styles.errorMessage}>
                {errors.commentaire_general}
              </span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Points forts *</label>
              <textarea
                className={`${styles.textarea} ${
                  errors.points_forts ? styles.error : ""
                }`}
                value={formData.points_forts}
                onChange={(e) =>
                  handleInputChange("points_forts", e.target.value)
                }
                placeholder="Les points forts du stagiaire..."
                rows={3}
              />
              {errors.points_forts && (
                <span className={styles.errorMessage}>
                  {errors.points_forts}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Points d'amélioration</label>
              <textarea
                className={styles.textarea}
                value={formData.points_amelioration}
                onChange={(e) =>
                  handleInputChange("points_amelioration", e.target.value)
                }
                placeholder="Les axes d'amélioration..."
                rows={3}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Recommandations</label>
            <textarea
              className={styles.textarea}
              value={formData.recommandations}
              onChange={(e) =>
                handleInputChange("recommandations", e.target.value)
              }
              placeholder="Vos recommandations pour le stagiaire..."
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Recommandez-vous l'embauche ? *
            </label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="recommande_embauche"
                  value="true"
                  checked={formData.recommande_embauche === true}
                  onChange={() =>
                    handleInputChange("recommande_embauche", true)
                  }
                  className={styles.radio}
                />
                Oui, je recommande
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="recommande_embauche"
                  value="false"
                  checked={formData.recommande_embauche === false}
                  onChange={() =>
                    handleInputChange("recommande_embauche", false)
                  }
                  className={styles.radio}
                />
                Non, je ne recommande pas
              </label>
            </div>
            {errors.recommande_embauche && (
              <span className={styles.errorMessage}>
                {errors.recommande_embauche}
              </span>
            )}
          </div>
        </section>

        {/* Évaluation par critères */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Évaluation Détaillée</h3>
          {errors.details && (
            <div className={styles.errorMessage}>{errors.details}</div>
          )}

          <div className={styles.criteresGrid}>
            {criteres.map((critere) => {
              const detail = formData.details.find(
                (d) => d.critere_id === critere.id
              );
              return (
                <div key={critere.id} className={styles.critereCard}>
                  <div className={styles.critereHeader}>
                    <h4 className={styles.critereNom}>{critere.nom}</h4>
                    <span className={styles.criterePoids}>
                      Poids: {critere.poids}
                    </span>
                  </div>

                  {critere.description && (
                    <p className={styles.critereDescription}>
                      {critere.description}
                    </p>
                  )}

                  <div className={styles.critereEvaluation}>
                    <label className={styles.label}>Note :</label>
                    {renderStarRating(critere.id, detail?.note || 5)}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Commentaire :</label>
                    <textarea
                      className={styles.textarea}
                      value={detail?.commentaire || ""}
                      onChange={(e) =>
                        handleDetailChange(
                          critere.id,
                          "commentaire",
                          e.target.value
                        )
                      }
                      placeholder={`Commentaire sur ${critere.nom.toLowerCase()}...`}
                      rows={2}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            <FaSave className={styles.buttonIcon} />
            {loading ? "Enregistrement..." : "Enregistrer l'évaluation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluationForm;
