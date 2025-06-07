import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createCandidature, uploadCV } from "../../services/candidatureService";
import { getOffreById } from "../../services/offreService";
import styles from "./CandidatureForm.module.css";
import LoadingSpinner from "../common/LoadingSpinner";

const CandidatureForm = () => {
  const { offreId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    lettre_motivation: "",
    competences: "",
    niveau_etudes: "",
    commentaires_candidat: "",
    offre_id: parseInt(offreId),
  });

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const data = await getOffreById(offreId);
        setOffre(data);
      } catch (err) {
        setError("Erreur lors de la récupération de l'offre");
        console.error(err);
      }
    };

    if (offreId) {
      fetchOffre();
    }
  }, [offreId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Vérifier le type de fichier
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Format de fichier non supporté. Utilisez PDF, DOC ou DOCX.");
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Le fichier est trop volumineux. Taille maximale : 5MB.");
        return;
      }

      setCvFile(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Étape 1: Créer la candidature
      const candidature = await createCandidature(formData);

      // Étape 2: Upload du CV si présent
      if (cvFile) {
        setUploadProgress(50);
        await uploadCV(candidature.id, cvFile);
        setUploadProgress(100);
      }

      setSuccess("Candidature soumise avec succès !");

      // Rediriger vers les candidatures du stagiaire après un délai
      setTimeout(() => {
        navigate("/mes-candidatures");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Une erreur est survenue lors de la soumission"
      );
      console.error(err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (!offre) {
    return <div className={styles.loading}>Chargement de l'offre...</div>;
    // return <LoadingSpinner />
  }

  return (
    <div className={styles.candidatureContainer}>
      <div className={styles.offreInfo}>
        <h2 className={styles.offreTitle}>Postuler à : {offre.titre}</h2>
        <div className={styles.offreDetails}>
          <span className={styles.company}>
            {offre.entreprise?.raison_social}
          </span>
          <span className={styles.location}>{offre.localisation}</span>
          <span className={styles.type}>{offre.type_stage}</span>
        </div>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.candidatureForm}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Informations personnelles</h3>
          <div className={styles.formGroup}>
            <label htmlFor="niveau_etudes" className={styles.label}>
              Niveau d'études *
            </label>
            <select
              id="niveau_etudes"
              name="niveau_etudes"
              value={formData.niveau_etudes}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Sélectionner votre niveau</option>
              <option value="Bac+2">Bac+2 (DTS, BTS, DUT, DEUST)</option>
              <option value="Bac+3">Bac+3 (Licence, Bachelor)</option>
              <option value="Bac+4">Bac+4 (Master 1, Maîtrise)</option>
              <option value="Bac+5">Bac+5 (Master 2, Ingénieur)</option>
              <option value="Bac+8">Bac+8+ (Doctorat)</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="competences" className={styles.label}>
              Compétences principales *
            </label>
            <textarea
              id="competences"
              name="competences"
              value={formData.competences}
              onChange={handleChange}
              required
              className={styles.textarea}
              rows="3"
              placeholder="Ex: React, Node.js, Python, SQL, Git..."
            />
          </div>
        </div>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Lettre de motivation</h3>

          <div className={styles.formGroup}>
            <label htmlFor="lettre_motivation" className={styles.label}>
              Votre lettre de motivation *
            </label>
            <textarea
              id="lettre_motivation"
              name="lettre_motivation"
              value={formData.lettre_motivation}
              onChange={handleChange}
              required
              className={styles.textarea}
              rows="8"
              placeholder="Expliquez pourquoi vous souhaitez rejoindre cette entreprise pour ce stage..."
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="commentaires_candidat" className={styles.label}>
              Commentaires additionnels
            </label>
            <textarea
              id="commentaires_candidat"
              name="commentaires_candidat"
              value={formData.commentaires_candidat}
              onChange={handleChange}
              className={styles.textarea}
              rows="3"
              placeholder="Informations supplémentaires, disponibilités, questions..."
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Documents</h3>

          {/* <div className={styles.formGroup}>
            <label htmlFor="cv_file" className={styles.label}>
              CV (PDF, DOC, DOCX - Max 5MB)
            </label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                id="cv_file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <div className={styles.fileInputDisplay}>
                {cvFile ? (
                  <div className={styles.selectedFile}>
                    <span className={styles.fileName}>{cvFile.name}</span>
                    <span className={styles.fileSize}>
                      ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ) : (
                  <span className={styles.filePlaceholder}>
                    Cliquez pour sélectionner votre CV
                  </span>
                )}
              </div>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div> */}
          <div className={styles.formGroup}>
            <label htmlFor="cv_file" className={styles.label}>
              CV (PDF, DOC, DOCX - Max 5MB)
            </label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                id="cv_file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className={styles.fileInput}
                aria-describedby="file-help"
              />
              <label htmlFor="cv_file" className={styles.fileInputDisplay}>
                {cvFile ? (
                  <div className={styles.selectedFile}>
                    <span className={styles.fileName}>{cvFile.name}</span>
                    <span className={styles.fileSize}>
                      ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ) : (
                  <span className={styles.filePlaceholder}>
                    📎 Cliquez pour sélectionner votre CV
                  </span>
                )}
              </label>
            </div>

            {error && (
              <div className={styles.errorMessage} role="alert">
                ❌ {error}
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div
                className={styles.progressBar}
                role="progressbar"
                aria-valuenow={uploadProgress}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={() => navigate(`/offres/${offreId}`)}
            className={styles.cancelButton}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Soumission en cours..." : "Soumettre ma candidature"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CandidatureForm;
