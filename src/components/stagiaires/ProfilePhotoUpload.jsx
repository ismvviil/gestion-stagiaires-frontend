// src/components/stagiaires/ProfilePhotoUpload.jsx
import React, { useState, useRef } from "react";
import {
  HiPhotograph,
  HiUpload,
  HiTrash,
  HiExclamation,
  HiCheckCircle,
} from "react-icons/hi";
import {
  getPhotoUrl,
  deleteProfilePhoto,
} from "../../services/stagiaireService";
import styles from "./ProfilePhotoUpload.module.css";

const ProfilePhotoUpload = ({ currentPhoto, onPhotoUpload, userName }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const validateFile = (file) => {
    // Vérifier le type
    if (!file.type.startsWith("image/")) {
      throw new Error("Le fichier doit être une image");
    }

    // Vérifier la taille (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("L'image ne doit pas dépasser 5MB");
    }

    // Vérifier les extensions autorisées
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error("Format non supporté. Utilisez JPG, PNG, GIF ou WebP");
    }

    return true;
  };

  const handleFileSelect = async (file) => {
    try {
      setError("");
      validateFile(file);

      setUploading(true);
      await onPhotoUpload(file);
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

  const handleDeletePhoto = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre photo de profil ?"
      )
    ) {
      try {
        await deleteProfilePhoto();
        onPhotoUpload(null); // Notify parent component
      } catch (err) {
        setError("Erreur lors de la suppression");
      }
    }
  };

  const getInitials = () => {
    if (!userName) return "U";
    const names = userName.split(" ");
    return names
      .map((name) => name.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className={styles.photoUploadContainer}>
      <div className={styles.photoWrapper}>
        <div
          className={`${styles.photoArea} ${dragOver ? styles.dragOver : ""} ${
            uploading ? styles.uploading : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {currentPhoto ? (
            <img
              src={getPhotoUrl(currentPhoto)}
              alt="Photo de profil"
              className={styles.profileImage}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
          ) : null}

          <div
            className={`${styles.initialsPlaceholder} ${
              currentPhoto ? styles.hidden : ""
            }`}
            style={{ display: currentPhoto ? "none" : "flex" }}
          >
            {getInitials()}
          </div>

          <div className={styles.uploadOverlay}>
            {uploading ? (
              <div className={styles.uploadingIndicator}>
                <div className={styles.spinner}></div>
                <span>Upload...</span>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <HiUpload className={styles.uploadIcon} />
                <span>Changer la photo</span>
              </div>
            )}
          </div>
        </div>

        {currentPhoto && (
          <button
            onClick={handleDeletePhoto}
            className={styles.deleteButton}
            title="Supprimer la photo"
          >
            <HiTrash />
          </button>
        )}
      </div>

      <div className={styles.uploadInfo}>
        <p className={styles.uploadText}>Cliquez ou glissez une image</p>
        <p className={styles.uploadSubtext}>JPG, PNG, GIF, WebP • Max 5MB</p>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <HiExclamation />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className={styles.hiddenInput}
      />
    </div>
  );
};

export default ProfilePhotoUpload;
