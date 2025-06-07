// src/components/certificates/CertificateManager.jsx
import React, { useState, useEffect } from "react";
import {
  FaCertificate,
  FaDownload,
  FaQrcode,
  FaEye,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaStar,
  FaUser,
  FaBuilding,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import styles from "./CertificateManager.module.css";

import axios from "../../api/axios";

const CertificateManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    mention: "",
    annee: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, [filters]);

  //   const fetchCertificates = async () => {
  //     setLoading(true);
  //     try {
  //       const queryParams = new URLSearchParams();
  //       if (filters.search) queryParams.append('search', filters.search);
  //       if (filters.mention) queryParams.append('mention', filters.mention);
  //       if (filters.annee) queryParams.append('annee', filters.annee);

  //       const response = await fetch(`/api/evaluations/certificats/?${queryParams}`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });
  //       const data = await response.json();
  //       setCertificates(data);
  //     } catch (error) {
  //       console.error('Erreur lors du chargement des certificats:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.mention) params.mention = filters.mention;
      if (filters.annee) params.annee = filters.annee;

      const response = await axios.get("/evaluations/certificats/", { params });
      setCertificates(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des certificats:", error);
    } finally {
      setLoading(false);
    }
  };
  // const downloadPDF = async (certificateId, codeUnique) => {
  //     try {
  //       const response = await fetch(`/api/evaluations/certificats/${certificateId}/pdf`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });

  //       if (response.ok) {
  //         const blob = await response.blob();
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = `certificat_${codeUnique}.pdf`;
  //         document.body.appendChild(a);
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //         document.body.removeChild(a);
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors du téléchargement:', error);
  //     }
  //   };

  const downloadPDF = async (certificateId, codeUnique) => {
    try {
      const response = await axios.get(
        `/evaluations/certificats/${certificateId}/pdf`,
        {
          responseType: "blob", // Important pour recevoir un Blob (fichier)
        }
      );

      // Créer un URL temporaire pour le blob reçu
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificat_${codeUnique}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  //   const showQRCodeModal = async (certificateId) => {
  //     try {
  //       const response = await fetch(`/api/evaluations/certificats/${certificateId}/qr-code`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       });

  //       if (response.ok) {
  //         const qrData = await response.json();
  //         setShowQRCode(qrData);
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors du chargement du QR code:', error);
  //     }
  //   };
  const showQRCodeModal = async (certificateId) => {
    try {
      const response = await axios.get(
        `/evaluations/certificats/${certificateId}/qr-code`
      );
      setShowQRCode(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement du QR code:", error);
    }
  };
  const getMentionBadge = (mention) => {
    const mentionConfig = {
      Excellent: { className: styles.mentionExcellent, color: "#27ae60" },
      "Très Bien": { className: styles.mentionTresBien, color: "#2980b9" },
      Bien: { className: styles.mentionBien, color: "#3498db" },
      "Assez Bien": { className: styles.mentionAssezBien, color: "#f39c12" },
      Passable: { className: styles.mentionPassable, color: "#e67e22" },
      Insuffisant: { className: styles.mentionInsuffisant, color: "#e74c3c" },
    };

    const config = mentionConfig[mention] || mentionConfig["Passable"];

    return (
      <span className={`${styles.mentionBadge} ${config.className}`}>
        {mention}
      </span>
    );
  };

  const renderStarRating = (note) => {
    return (
      <div className={styles.starRating}>
        {[...Array(10)].map((_, i) => (
          <FaStar
            key={i}
            className={`${styles.star} ${
              i < note ? styles.starFilled : styles.starEmpty
            }`}
          />
        ))}
        <span className={styles.noteValue}>{note}/10</span>
      </div>
    );
  };

  const openVerificationPage = (codeUnique) => {
    const verificationUrl = `${window.location.origin}/verify/${codeUnique}`;
    window.open(verificationUrl, "_blank");
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement des certificats...</p>
      </div>
    );
  }

  return (
    <div className={styles.certificateManager}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>
            <FaCertificate className={styles.titleIcon} />
            Certificats de stage
          </h2>
          <span className={styles.count}>
            {certificates.length} certificat{certificates.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Filtres */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher par nom de stagiaire ou code..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className={styles.searchInput}
          />
        </div>

        <select
          value={filters.mention}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, mention: e.target.value }))
          }
          className={styles.mentionFilter}
        >
          <option value="">Toutes les mentions</option>
          <option value="Excellent">Excellent</option>
          <option value="Très Bien">Très Bien</option>
          <option value="Bien">Bien</option>
          <option value="Assez Bien">Assez Bien</option>
          <option value="Passable">Passable</option>
          <option value="Insuffisant">Insuffisant</option>
        </select>

        <select
          value={filters.annee}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, annee: e.target.value }))
          }
          className={styles.yearFilter}
        >
          <option value="">Toutes les années</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* Liste des certificats */}
      {certificates.length === 0 ? (
        <div className={styles.emptyState}>
          <FaCertificate className={styles.emptyIcon} />
          <h3>Aucun certificat trouvé</h3>
          <p>
            Les certificats apparaîtront ici une fois les évaluations validées.
          </p>
        </div>
      ) : (
        <div className={styles.certificateGrid}>
          {certificates.map((certificate) => (
            <div key={certificate.id} className={styles.certificateCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <h3 className={styles.stageName}>
                    {certificate.titre_stage}
                  </h3>
                  {getMentionBadge(certificate.mention)}
                </div>
                <div className={styles.codeUnique}>
                  {certificate.code_unique}
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.stagiaireInfo}>
                  <div className={styles.infoRow}>
                    <FaUser className={styles.infoIcon} />
                    <span className={styles.infoText}>
                      {certificate.prenom_stagiaire} {certificate.nom_stagiaire}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <FaBuilding className={styles.infoIcon} />
                    <span className={styles.infoText}>
                      {certificate.nom_entreprise}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <FaCalendarAlt className={styles.infoIcon} />
                    <span className={styles.infoText}>
                      Du{" "}
                      {new Date(
                        certificate.date_debut_stage
                      ).toLocaleDateString("fr-FR")}
                      au{" "}
                      {new Date(certificate.date_fin_stage).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Durée:</span>
                    <span className={styles.infoText}>
                      {certificate.duree_stage_jours} jours
                    </span>
                  </div>
                </div>

                <div className={styles.scoreSection}>
                  <div className={styles.scoreDisplay}>
                    <span className={styles.scoreNumber}>
                      {certificate.note_finale.toFixed(1)}
                    </span>
                    <span className={styles.scoreMax}>/10</span>
                  </div>
                  {renderStarRating(Math.round(certificate.note_finale))}
                </div>

                <div className={styles.certificateDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Généré le:</span>
                    <span className={styles.value}>
                      {new Date(certificate.date_generation).toLocaleDateString(
                        "fr-FR"
                      )}
                    </span>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.label}>Par:</span>
                    <span className={styles.value}>
                      {certificate.prenom_evaluateur}{" "}
                      {certificate.nom_evaluateur}
                    </span>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.label}>Vérifications:</span>
                    <span className={styles.value}>
                      {certificate.nombre_verifications} fois
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button
                  onClick={() =>
                    downloadPDF(certificate.id, certificate.code_unique)
                  }
                  className={`${styles.actionButton} ${styles.downloadButton}`}
                  title="Télécharger le PDF"
                >
                  <FaDownload />
                </button>

                <button
                  onClick={() => showQRCodeModal(certificate.id)}
                  className={`${styles.actionButton} ${styles.qrButton}`}
                  title="Afficher le QR Code"
                >
                  <FaQrcode />
                </button>

                <button
                  onClick={() => openVerificationPage(certificate.code_unique)}
                  className={`${styles.actionButton} ${styles.verifyButton}`}
                  title="Ouvrir la page de vérification"
                >
                  <FaExternalLinkAlt />
                </button>

                <button
                  onClick={() => setSelectedCertificate(certificate)}
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  title="Voir les détails"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal QR Code */}
      {showQRCode && (
        <div className={styles.modal} onClick={() => setShowQRCode(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>QR Code de vérification</h3>
              <button
                onClick={() => setShowQRCode(false)}
                className={styles.modalClose}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.qrCodeContainer}>
                <img
                  src={`data:image/png;base64,${showQRCode.qr_code_data}`}
                  alt="QR Code du certificat"
                  className={styles.qrCodeImage}
                />
              </div>
              <div className={styles.qrCodeInfo}>
                <p>
                  <strong>Code:</strong> {showQRCode.code_unique}
                </p>
                <p>
                  <strong>URL de vérification:</strong>
                </p>
                <code className={styles.verificationUrl}>
                  {window.location.origin}
                  {showQRCode.verification_url}
                </code>
                <button
                  onClick={() => openVerificationPage(showQRCode.code_unique)}
                  className={styles.openVerificationButton}
                >
                  <FaExternalLinkAlt className={styles.buttonIcon} />
                  Ouvrir la page de vérification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails certificat */}
      {selectedCertificate && (
        <div
          className={styles.modal}
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Détails du certificat</h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className={styles.modalClose}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.certificateDetailsModal}>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailGroup}>
                    <h4>Informations du stage</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Titre:</span>
                      <span className={styles.value}>
                        {selectedCertificate.titre_stage}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Période:</span>
                      <span className={styles.value}>
                        Du{" "}
                        {new Date(
                          selectedCertificate.date_debut_stage
                        ).toLocaleDateString("fr-FR")}
                        au{" "}
                        {new Date(
                          selectedCertificate.date_fin_stage
                        ).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Durée:</span>
                      <span className={styles.value}>
                        {selectedCertificate.duree_stage_jours} jours
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailGroup}>
                    <h4>Stagiaire</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Nom:</span>
                      <span className={styles.value}>
                        {selectedCertificate.prenom_stagiaire}{" "}
                        {selectedCertificate.nom_stagiaire}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailGroup}>
                    <h4>Entreprise</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Nom:</span>
                      <span className={styles.value}>
                        {selectedCertificate.nom_entreprise}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Secteur:</span>
                      <span className={styles.value}>
                        {selectedCertificate.secteur_entreprise}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailGroup}>
                    <h4>Évaluation</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Note finale:</span>
                      <span className={styles.value}>
                        {selectedCertificate.note_finale.toFixed(1)}/10
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Mention:</span>
                      <span className={styles.value}>
                        {getMentionBadge(selectedCertificate.mention)}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Évaluateur:</span>
                      <span className={styles.value}>
                        {selectedCertificate.prenom_evaluateur}{" "}
                        {selectedCertificate.nom_evaluateur}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailGroup}>
                    <h4>Certificat</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Code unique:</span>
                      <span className={styles.value}>
                        {selectedCertificate.code_unique}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Date de génération:</span>
                      <span className={styles.value}>
                        {new Date(
                          selectedCertificate.date_generation
                        ).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>
                        Nombre de vérifications:
                      </span>
                      <span className={styles.value}>
                        {selectedCertificate.nombre_verifications}
                      </span>
                    </div>
                    {selectedCertificate.date_dernier_telechargement && (
                      <div className={styles.detailItem}>
                        <span className={styles.label}>
                          Dernier téléchargement:
                        </span>
                        <span className={styles.value}>
                          {new Date(
                            selectedCertificate.date_dernier_telechargement
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button
                    onClick={() =>
                      downloadPDF(
                        selectedCertificate.id,
                        selectedCertificate.code_unique
                      )
                    }
                    className={`${styles.actionButton} ${styles.downloadButton}`}
                  >
                    <FaDownload className={styles.buttonIcon} />
                    Télécharger PDF
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCertificate(null);
                      showQRCodeModal(selectedCertificate.id);
                    }}
                    className={`${styles.actionButton} ${styles.qrButton}`}
                  >
                    <FaQrcode className={styles.buttonIcon} />
                    QR Code
                  </button>

                  <button
                    onClick={() =>
                      openVerificationPage(selectedCertificate.code_unique)
                    }
                    className={`${styles.actionButton} ${styles.verifyButton}`}
                  >
                    <FaExternalLinkAlt className={styles.buttonIcon} />
                    Vérifier en ligne
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateManager;
