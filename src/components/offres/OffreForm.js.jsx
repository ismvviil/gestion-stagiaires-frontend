import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  createOffre,
  getOffreById,
  updateOffre,
} from "../../services/offreService";
import { getAllEntreprises } from "../../services/entrepriseService";
import styles from "./OffreForm.module.css";

const OffreForm = () => {
  const { offreId } = useParams();
  const navigate = useNavigate();
  const { currentUser} = useAuth(); // ajoute loading
  const isEditMode = !!offreId;

  
  console.log("cuuurent" , currentUser.entreprise_id)

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    type_stage: "Présentiel",
    remuneration: "",
    localisation: "",
    secteur: "",
    date_debut: "",
    date_fin: "",
    competences_requises: "",
    est_active: true,
    entreprise_id: currentUser?.entreprise_id || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [entreprises, setEntreprises] = useState([]);

   console.log(error.response?.data); 
  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const data = await getAllEntreprises();
        setEntreprises(data);
      } catch (err) {
        setError("Erreur lors de la récupération des entreprises");
        console.error(err);
      }
    };

    const fetchOffre = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const offre = await getOffreById(offreId);

          // Formater les dates pour le format de l'input date HTML
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split("T")[0];
          };

          setFormData({
            ...offre,
            date_debut: formatDate(offre.date_debut),
            date_fin: formatDate(offre.date_fin),
            remuneration: offre.remuneration || "",
          });
        } catch (err) {
          setError("Erreur lors de la récupération de l'offre");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEntreprises();
    fetchOffre();
  }, [offreId, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const validateDates = () => {
    const dateDebut = new Date(formData.date_debut);
    const dateFin = new Date(formData.date_fin);

    if (dateFin < dateDebut) {
      setError("La date de fin doit être postérieure à la date de début");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateDates()) {
      return;
    }

    try {
      setLoading(true);

      // Préparer les données à envoyer
      const offreData = {
        ...formData,
        remuneration: formData.remuneration
          ? parseInt(formData.remuneration, 10)
          : null,
        entreprise_id: parseInt(formData.entreprise_id, 10),
      };

      if (isEditMode) {
        await updateOffre(offreId, offreData);
        setSuccess("Offre mise à jour avec succès");
      } else {
        await createOffre(offreData);
        setSuccess("Offre créée avec succès");
        // Réinitialiser le formulaire après la création
        setFormData({
          titre: "",
          description: "",
          type_stage: "Présentiel",
          remuneration: "",
          localisation: "",
          secteur: "",
          date_debut: "",
          date_fin: "",
          competences_requises: "",
          est_active: true,
          entreprise_id: currentUser?.entreprise_id || "",
        });
      }

      // Rediriger vers la liste des offres après un court délai
      setTimeout(() => {
        navigate("/offres");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Une erreur s'est produite");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className={styles.loading}>Chargement...</div>;
  }
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {isEditMode
          ? "Modifier l'offre de stage"
          : "Créer une nouvelle offre de stage"}
      </h2>

      {error && <div className={styles.errorMessage}>{JSON.stringify(error)}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="titre" className={styles.label}>
            Titre *
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Ex: Stage développement web"
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
            required
            className={styles.textarea}
            rows="5"
            placeholder="Décrivez les missions et objectifs du stage"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="type_stage" className={styles.label}>
              Type de stage *
            </label>
            <select
              id="type_stage"
              name="type_stage"
              value={formData.type_stage}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="Présentiel">Présentiel</option>
              <option value="Télétravail">Télétravail</option>
              <option value="Hybride">Hybride</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="secteur" className={styles.label}>
              Secteur *
            </label>
            <input
              type="text"
              id="secteur"
              name="secteur"
              value={formData.secteur}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Ex: Informatique, Finance, Marketing..."
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="date_debut" className={styles.label}>
              Date de début *
            </label>
            <input
              type="date"
              id="date_debut"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date_fin" className={styles.label}>
              Date de fin *
            </label>
            <input
              type="date"
              id="date_fin"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="localisation" className={styles.label}>
              Localisation
            </label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: Paris, Lyon, Marseille..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="remuneration" className={styles.label}>
              Rémunération (€/mois)
            </label>
            <input
              type="number"
              id="remuneration"
              name="remuneration"
              value={formData.remuneration}
              onChange={handleChange}
              min="0"
              className={styles.input}
              placeholder="Ex: 800"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="competences_requises" className={styles.label}>
            Compétences requises
          </label>
          <textarea
            id="competences_requises"
            name="competences_requises"
            value={formData.competences_requises}
            onChange={handleChange}
            className={styles.textarea}
            rows="3"
            placeholder="Ex: React, Node.js, SQL..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="entreprise_id" className={styles.label}>
            Entreprise *
          </label>
          <select
            id="entreprise_id"
            name="entreprise_id"
            value={formData.entreprise_id}
            onChange={handleChange}
            required
            className={styles.select}
            disabled={currentUser?.type === "recruteur"} // Désactivé si l'utilisateur est un recruteur
          >
            <option value="">Sélectionner une entreprise</option>
            {entreprises.map((entreprise) => (
              <option key={entreprise.id} value={entreprise.id}>
                {entreprise.raison_social}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="est_active"
              name="est_active"
              checked={formData.est_active}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <label htmlFor="est_active" className={styles.checkboxLabel}>
              Publier immédiatement
            </label>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button
            type="button"
            onClick={() => navigate("/offres")}
            className={styles.cancelButton}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Traitement..." : isEditMode ? "Mettre à jour" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OffreForm;
