import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiAcademicCap,
//   HiPhotograph,
//   HiUpload,
  HiSave,
  HiRefresh,
  HiCheckCircle,
  HiExclamation,
  HiEye,
  HiPencil,
//   HiCog,
  HiChartBar,
//   HiClipboard,
  HiStar,
  HiLightBulb,
} from "react-icons/hi";

import {
  getStagiaireProfile,
  updateStagiaireProfile,
  uploadProfilePhoto,
  uploadCV,
  analyzeCV,
  getStagiaireStats,
  getCompetences,
} from "../services/stagiaireService";

import ProfilePhotoUpload from "../components/stagiaires/ProfilePhotoUpload";
import CVUploadSection from "../components/stagiaires/CVUploadSection";
import CompetencesSection from "../components/stagiaires/CompetencesSection";
import ProfileStatsCard from "../components/stagiaires/ProfileStatsCard";
import styles from "./StagiaireProfile.module.css";

const StagiaireProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stats, setStats] = useState(null);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    date_naissance: "",
    adresse: "",
    ville: "",
    code_postal: "",
    niveau_etudes: "",
    specialite: "",
    competences_manuelles: "",
  });

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const profileData = await getStagiaireProfile();
      setProfile(profileData);

      // Pré-remplir le formulaire
      setFormData({
        nom: profileData.nom || "",
        prenom: profileData.prenom || "",
        email: profileData.email || "",
        telephone: profileData.telephone || "",
        date_naissance: profileData.date_naissance || "",
        adresse: profileData.adresse || "",
        ville: profileData.ville || "",
        code_postal: profileData.code_postal || "",
        niveau_etudes: profileData.niveau_etudes || "",
        specialite: profileData.specialite || "",
        competences_manuelles: profileData.competences_manuelles || "",
      });
    } catch (err) {
      setError("Erreur lors du chargement du profil");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await getStagiaireStats();
      setStats(statsData);
    } catch (err) {
      console.error("Erreur chargement stats:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError("");

      const updatedProfile = await updateStagiaireProfile(formData);
      setProfile(updatedProfile);
      setEditMode(false);
      setSuccess("Profil mis à jour avec succès");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (file) => {
    try {
      const response = await uploadProfilePhoto(file);
      setProfile((prev) => ({
        ...prev,
        photo: response.photo_filename,
      }));
      setSuccess("Photo mise à jour avec succès");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erreur lors de l'upload de la photo");
      console.error(err);
    }
  };

  const handleCVUpload = async (file, analyze = true) => {
    try {
      const response = await uploadCV(file, analyze);
      setProfile((prev) => ({
        ...prev,
        cv_filename: response.cv_filename,
        competences_extraites:
          response.competences_found?.join(", ") || prev.competences_extraites,
      }));

      if (response.analysis_success) {
        setSuccess(
          `CV uploadé et analysé ! ${
            response.competences_extracted || 0
          } compétences trouvées`
        );
      } else {
        setSuccess("CV uploadé avec succès");
      }

      setTimeout(() => setSuccess(""), 5000);
      loadStats(); // Recharger les stats
    } catch (err) {
      setError("Erreur lors de l'upload du CV");
      console.error(err);
    }
  };

  const calculateCompleteness = () => {
    const fields = [
      "nom",
      "prenom",
      "email",
      "telephone",
      "ville",
      "niveau_etudes",
      "specialite",
      "competences_manuelles",
    ];
    const completed = fields.filter((field) => profile?.[field]).length;
    const cvBonus = profile?.cv_filename ? 1 : 0;
    const photoBonus = profile?.photo ? 1 : 0;

    return Math.round(
      ((completed + cvBonus + photoBonus) / (fields.length + 2)) * 100
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <HiRefresh className={styles.spinningIcon} />
        </div>
        <p className={styles.loadingText}>Chargement de votre profil...</p>
      </div>
    );
  }

  const completeness = calculateCompleteness();

  return (
    <div className={styles.profileContainer}>
      {/* Header avec photo et info de base */}
      <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.profilePhotoSection}>
            <ProfilePhotoUpload
              currentPhoto={profile?.photo}
              onPhotoUpload={handlePhotoUpload}
              userName={`${profile?.prenom} ${profile?.nom}`}
            />
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.nameSection}>
              <h1 className={styles.profileName}>
                {profile?.prenom} {profile?.nom}
              </h1>
              <p className={styles.profileTitle}>
                {profile?.specialite || "Stagiaire"}
                {profile?.niveau_etudes && ` • ${profile.niveau_etudes}`}
              </p>
            </div>

            <div className={styles.profileMeta}>
              <div className={styles.metaItem}>
                <HiMail className={styles.metaIcon} />
                <span>{profile?.email}</span>
              </div>
              {profile?.telephone && (
                <div className={styles.metaItem}>
                  <HiPhone className={styles.metaIcon} />
                  <span>{profile.telephone}</span>
                </div>
              )}
              {profile?.ville && (
                <div className={styles.metaItem}>
                  <HiLocationMarker className={styles.metaIcon} />
                  <span>{profile.ville}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.profileActions}>
            <div className={styles.completenessCard}>
              <div className={styles.completenessHeader}>
                <HiChartBar className={styles.completenessIcon} />
                <span className={styles.completenessLabel}>
                  Profil complété
                </span>
              </div>
              <div className={styles.completenessBar}>
                <div
                  className={styles.completenessProgress}
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <span className={styles.completenessPercentage}>
                {completeness}%
              </span>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`${styles.editButton} ${
                editMode ? styles.active : ""
              }`}
            >
              {editMode ? (
                <>
                  <HiEye /> Voir le profil
                </>
              ) : (
                <>
                  <HiPencil /> Modifier le profil
                </>
              )}
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className={styles.errorMessage}>
            <HiExclamation />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            <HiCheckCircle />
            <span>{success}</span>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className={styles.profileContent}>
        {/* Statistiques */}
        {stats && (
          <div className={styles.statsSection}>
            <ProfileStatsCard stats={stats} />
          </div>
        )}

        <div className={styles.contentGrid}>
          {/* Section informations personnelles */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <HiUser className={styles.cardIcon} />
                <h2 className={styles.cardTitle}>Informations personnelles</h2>
              </div>
              {editMode && (
                <div className={styles.cardActions}>
                  <button
                    onClick={() => setEditMode(false)}
                    className={styles.cancelButton}
                    disabled={saving}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className={styles.saveButton}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <HiRefresh className={styles.spinningIcon} />
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <HiSave />
                        Sauvegarder
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className={styles.cardContent}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiUser className={styles.labelIcon} />
                    Prénom
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Votre prénom"
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.prenom || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiUser className={styles.labelIcon} />
                    Nom
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Votre nom"
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.nom || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiMail className={styles.labelIcon} />
                    Email
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="votre@email.com"
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.email || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiPhone className={styles.labelIcon} />
                    Téléphone
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="06 12 34 56 78"
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.telephone || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiLocationMarker className={styles.labelIcon} />
                    Ville
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Votre ville"
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.ville || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiLocationMarker className={styles.labelIcon} />
                    Adresse
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Votre adresse"
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.adresse || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiAcademicCap className={styles.labelIcon} />
                    Niveau d'études
                  </label>
                  {editMode ? (
                    <select
                      name="niveau_etudes"
                      value={formData.niveau_etudes}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Bac">Bac</option>
                      <option value="Bac+1">Bac+1</option>
                      <option value="Bac+2">Bac+2</option>
                      <option value="Bac+3">Bac+3</option>
                      <option value="Bac+4">Bac+4</option>
                      <option value="Bac+5">Bac+5</option>
                      <option value="Doctorat">Doctorat</option>
                    </select>
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.niveau_etudes || "Non renseigné"}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiLightBulb className={styles.labelIcon} />
                    Spécialité
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Ex: Informatique, Marketing..."
                    />
                  ) : (
                    <div className={styles.formValue}>
                      {profile?.specialite || "Non renseigné"}
                    </div>
                  )}
                </div>
              </div>

              {editMode && (
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <HiStar className={styles.labelIcon} />
                    Compétences manuelles
                  </label>
                  <textarea
                    name="competences_manuelles"
                    value={formData.competences_manuelles}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    placeholder="Listez vos compétences, séparées par des virgules..."
                    rows="3"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section CV */}
          <div className={styles.contentCard}>
            <CVUploadSection
              profile={profile}
              onCVUpload={handleCVUpload}
              onAnalyze={analyzeCV}
            />
          </div>

          {/* Section Compétences */}
          <div className={styles.contentCard}>
            <CompetencesSection profile={profile} editMode={editMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagiaireProfile;
