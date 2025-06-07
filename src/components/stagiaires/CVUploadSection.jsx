// src/components/stagiaires/CVUploadSection.jsx
import React, { useState, useRef } from "react";
import {
  HiDocumentText,
  HiUpload,
  HiDownload,
  HiEye,
  HiRefresh,
  HiExclamation,
  HiCheckCircle,
  HiLightningBolt,
  HiChartBar,
  HiStar,
  HiCog,
} from "react-icons/hi";
import { getCVUrl } from "../../services/stagiaireService";
import styles from "./CVUploadSection.module.css";

const CVUploadSection = ({ profile, onCVUpload, onAnalyze }) => {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const validateFile = (file) => {
    // Vérifier le type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Seuls les fichiers PDF, DOC et DOCX sont acceptés");
    }

    // Vérifier la taille (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Le fichier ne doit pas dépasser 10MB");
    }

    return true;
  };

  const handleFileSelect = async (file, analyze = true) => {
    try {
      setError("");
      validateFile(file);

      setUploading(true);
      await onCVUpload(file, analyze);
    } catch (err) {
      setError(err.message || "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAnalyzeExisting = async () => {
    try {
      setAnalyzing(true);
      setError("");
      await onAnalyze();
    } catch (err) {
      setError("Erreur lors de l'analyse");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownloadCV = () => {
    if (profile?.cv_filename) {
      const url = getCVUrl(profile.cv_filename);
      window.open(url, "_blank");
    }
  };

  return (
    <div className={styles.cvSection}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <HiDocumentText className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Mon CV</h2>
        </div>
        <div className={styles.cardActions}>
          {profile?.cv_filename && (
            <>
              <button
                onClick={handleAnalyzeExisting}
                className={styles.analyzeButton}
                disabled={analyzing}
                title="Analyser le CV"
              >
                {analyzing ? (
                  <>
                    <HiRefresh className={styles.spinningIcon} />
                    Analyse...
                  </>
                ) : (
                  <>
                    <HiLightningBolt />
                    Analyser
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadCV}
                className={styles.downloadButton}
                title="Télécharger le CV"
              >
                <HiDownload />
                Télécharger
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.cardContent}>
        {profile?.cv_filename ? (
          <div className={styles.cvInfo}>
            <div className={styles.cvCard}>
              <div className={styles.cvIconContainer}>
                <HiDocumentText className={styles.cvIcon} />
              </div>
              <div className={styles.cvDetails}>
                <h3 className={styles.cvName}>Mon CV</h3>
                <p className={styles.cvFilename}>{profile.cv_filename}</p>
                <div className={styles.cvMeta}>
                  <span className={styles.cvDate}>Uploadé récemment</span>
                  {profile?.competences_extraites && (
                    <span className={styles.cvAnalyzed}>
                      <HiCheckCircle className={styles.analyzedIcon} />
                      Analysé par IA
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.cvActions}>
                <button
                  onClick={handleDownloadCV}
                  className={styles.viewButton}
                  title="Voir le CV"
                >
                  <HiEye />
                </button>
              </div>
            </div>

            {/* Résultats de l'analyse */}
            {profile?.competences_extraites && (
              <div className={styles.analysisResults}>
                <div className={styles.analysisHeader}>
                  <HiChartBar className={styles.analysisIcon} />
                  <h4 className={styles.analysisTitle}>Analyse automatique</h4>
                </div>
                <div className={styles.analysisContent}>
                  <div className={styles.competencesPreview}>
                    <span className={styles.competencesLabel}>
                      Compétences détectées :
                    </span>
                    <span className={styles.competencesText}>
                      {profile.competences_extraites.length > 100
                        ? `${profile.competences_extraites.substring(
                            0,
                            100
                          )}...`
                        : profile.competences_extraites}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.uploadArea}>
            <div
              className={`${styles.dropZone} ${
                dragOver ? styles.dragOver : ""
              } ${uploading ? styles.uploading : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <div className={styles.uploadingIndicator}>
                  <div className={styles.spinner}></div>
                  <p className={styles.uploadingText}>
                    Upload et analyse en cours...
                  </p>
                  <p className={styles.uploadingSubtext}>Veuillez patienter</p>
                </div>
              ) : (
                <div className={styles.uploadPrompt}>
                  <HiUpload className={styles.uploadIcon} />
                  <h3 className={styles.uploadTitle}>Uploadez votre CV</h3>
                  <p className={styles.uploadText}>
                    Glissez-déposez votre CV ici ou cliquez pour sélectionner
                  </p>
                  <div className={styles.formatInfo}>
                    <span className={styles.formats}>
                      PDF, DOC, DOCX • Max 10MB
                    </span>
                  </div>
                  <div className={styles.aiFeature}>
                    <HiLightningBolt className={styles.aiIcon} />
                    <span className={styles.aiText}>
                      Analyse automatique des compétences par IA
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            <HiExclamation />
            <span>{error}</span>
          </div>
        )}

        {/* Zone de upload alternative */}
        <div className={styles.uploadActions}>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={styles.uploadButton}
            disabled={uploading}
          >
            <HiUpload />
            {profile?.cv_filename ? "Remplacer le CV" : "Choisir un fichier"}
          </button>

          <div className={styles.uploadOptions}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                defaultChecked={true}
                className={styles.checkbox}
              />
              <span>Analyser automatiquement avec l'IA</span>
            </label>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
          className={styles.hiddenInput}
        />
      </div>
    </div>
  );
};

export default CVUploadSection;
