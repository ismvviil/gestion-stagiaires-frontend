import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { missionsService, stagesService } from "../../services/stageService";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  FiArrowLeft,
  FiSave,
  FiCalendar,
  FiTarget,
  FiFlag,
  FiFileText,
  FiTool,
} from "react-icons/fi";
import { MdAssignment } from "react-icons/md";
import styles from "./MissionForm.module.css";

const MissionForm = () => {
  const { stageId, missionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    objectifs: "",
    date_debut_prevue: "",
    date_fin_prevue: "",
    priorite: "normale",
    ressources_necessaires: "",
    livrables_attendus: "",
  });

  const isEditing = !!missionId;

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Charger le stage
        const stageData = await stagesService.getStage(stageId);
        setStage(stageData);

        // Si on édite, charger la mission
        if (isEditing) {
          const missionData = await missionsService.getMission(missionId);
          setFormData({
            titre: missionData.titre || "",
            description: missionData.description || "",
            objectifs: missionData.objectifs || "",
            date_debut_prevue: missionData.date_debut_prevue
              ? new Date(missionData.date_debut_prevue)
                  .toISOString()
                  .slice(0, 16)
              : "",
            date_fin_prevue: missionData.date_fin_prevue
              ? new Date(missionData.date_fin_prevue).toISOString().slice(0, 16)
              : "",
            priorite: missionData.priorite || "normale",
            ressources_necessaires: missionData.ressources_necessaires || "",
            livrables_attendus: missionData.livrables_attendus || "",
          });
        }
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [stageId, missionId, isEditing]);

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Valider le formulaire
  const validateForm = () => {
    const errors = [];

    if (!formData.titre.trim()) errors.push("Le titre est requis");
    if (!formData.description.trim()) errors.push("La description est requise");

    if (formData.date_debut_prevue && formData.date_fin_prevue) {
      const debut = new Date(formData.date_debut_prevue);
      const fin = new Date(formData.date_fin_prevue);
      if (fin <= debut) {
        errors.push("La date de fin doit être après la date de début");
      }
    }

    return errors;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const missionData = {
        ...formData,
        stage_id: parseInt(stageId),
      };

      if (isEditing) {
        await missionsService.updateMission(missionId, missionData);
      } else {
        await missionsService.createMission(missionData);
      }
      // Rediriger vers les détails du stage
      navigate(`/stages/${stageId}`);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      setError("Erreur lors de la sauvegarde de la mission");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/stages/${stageId}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error && !stage) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2>Erreur</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/mes-stages")}
            className={styles.backButton}
          >
            Retour aux stages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={handleCancel} className={styles.backButton}>
          <FiArrowLeft />
          Retour au stage
        </button>

        <h1 className={styles.title}>
          <MdAssignment className={styles.titleIcon} />
          {isEditing ? "Modifier la mission" : "Nouvelle mission"}
        </h1>
      </div>

      {/* Informations du stage */}
      {stage && (
        <div className={styles.stageInfo}>
          <h3>Stage: {stage.description || "Sans description"}</h3>
          <p>
            Du {new Date(stage.date_debut).toLocaleDateString("fr-FR")} au{" "}
            {new Date(stage.date_fin).toLocaleDateString("fr-FR")}
          </p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Informations de base */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <FiFileText className={styles.sectionIcon} />
              Informations de base
            </h3>
            <div className={styles.formGroup}>
              <label htmlFor="titre" className={styles.label}>
                Titre de la mission *
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: Développer l'API utilisateurs"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows="4"
                placeholder="Décrivez en détail ce que le stagiaire doit réaliser..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="objectifs" className={styles.label}>
                Objectifs d'apprentissage
              </label>
              <textarea
                id="objectifs"
                name="objectifs"
                value={formData.objectifs}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
                placeholder="Quels sont les objectifs pédagogiques de cette mission ?"
              />
            </div>
          </div>

          {/* Planning et priorité */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <FiCalendar className={styles.sectionIcon} />
              Planning et priorité
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="date_debut_prevue" className={styles.label}>
                  Date de début prévue
                </label>
                <input
                  type="datetime-local"
                  id="date_debut_prevue"
                  name="date_debut_prevue"
                  value={formData.date_debut_prevue}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date_fin_prevue" className={styles.label}>
                  Date de fin prévue
                </label>
                <input
                  type="datetime-local"
                  id="date_fin_prevue"
                  name="date_fin_prevue"
                  value={formData.date_fin_prevue}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priorite" className={styles.label}>
                <FiFlag className={styles.labelIcon} />
                Priorité
              </label>
              <select
                id="priorite"
                name="priorite"
                value={formData.priorite}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="basse">Basse</option>
                <option value="normale">Normale</option>
                <option value="haute">Haute</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>

          {/* Ressources et livrables */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <FiTool className={styles.sectionIcon} />
              Ressources et livrables
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="ressources_necessaires" className={styles.label}>
                Ressources nécessaires
              </label>
              <textarea
                id="ressources_necessaires"
                name="ressources_necessaires"
                value={formData.ressources_necessaires}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
                placeholder="Documentation, outils, accès nécessaires..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="livrables_attendus" className={styles.label}>
                <FiTarget className={styles.labelIcon} />
                Livrables attendus
              </label>
              <textarea
                id="livrables_attendus"
                name="livrables_attendus"
                value={formData.livrables_attendus}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
                placeholder="Code source, documentation, rapport, présentation..."
              />
            </div>
          </div>
        </div>

        {/* Actions du formulaire */}
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={saving}
          >
            Annuler
          </button>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={saving}
          >
            <FiSave className={styles.buttonIcon} />
            {saving
              ? "Sauvegarde..."
              : isEditing
              ? "Mettre à jour"
              : "Créer la mission"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MissionForm;
