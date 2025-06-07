// src/pages/CertificateVerification.jsx
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  FaCertificate,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaStar,
  FaQrcode,
  FaSearch,
  FaShieldAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import styles from "./CertificateVerification.module.css";
import axios from "../api/axios";
const CertificateVerification = () => {
  const { codeUnique } = useParams();
  const [searchParams] = useSearchParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCode, setSearchCode] = useState(codeUnique || "");
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    if (codeUnique) {
      verifyCertificate(codeUnique);
    }
  }, [codeUnique]);

  //   const verifyCertificate = async (code) => {
  //     if (!code.trim()) {
  //       setError('Veuillez saisir un code de certificat');
  //       return;
  //     }

  //     setLoading(true);
  //     setError(null);
  //     setCertificate(null);
  //     setVerificationResult(null);

  //     try {
  //       const response = await fetch(`/api/evaluations/certificats/verify/${code}`);
  //       const data = await response.json();

  //       if (response.ok && data.valide) {
  //         setCertificate(data.certificat);
  //         setVerificationResult({
  //           valide: true,
  //           message: data.message,
  //           verificationNumero: data.verification_numero
  //         });
  //       } else {
  //         setError(data.message || 'Certificat non trouvé ou invalide');
  //         setVerificationResult({
  //           valide: false,
  //           message: data.message || 'Certificat non trouvé ou invalide'
  //         });
  //       }
  //     } catch (err) {
  //       setError('Erreur lors de la vérification. Veuillez réessayer.');
  //       setVerificationResult({
  //         valide: false,
  //         message: 'Erreur de connexion'
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const verifyCertificate = async (code) => {
    if (!code.trim()) {
      setError("Veuillez saisir un code de certificat");
      return;
    }

    setLoading(true);
    setError(null);
    setCertificate(null);
    setVerificationResult(null);

    try {
      const response = await axios.get(
        `/evaluations/certificats/verify/${code}`
      );
      const data = response.data;

      if (data.valide) {
        setCertificate(data.certificat);
        setVerificationResult({
          valide: true,
          message: data.message,
          verificationNumero: data.verification_numero,
        });
      } else {
        setError(data.message || "Certificat non trouvé ou invalide");
        setVerificationResult({
          valide: false,
          message: data.message || "Certificat non trouvé ou invalide",
        });
      }
    } catch (err) {
      setError("Erreur lors de la vérification. Veuillez réessayer.");
      setVerificationResult({
        valide: false,
        message: "Erreur de connexion",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCode.trim()) {
      window.history.pushState(null, "", `/verify/${searchCode}`);
      verifyCertificate(searchCode);
    }
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

  const getMentionBadge = (mention) => {
    const mentionConfig = {
      Excellent: { className: styles.mentionExcellent },
      "Très Bien": { className: styles.mentionTresBien },
      Bien: { className: styles.mentionBien },
      "Assez Bien": { className: styles.mentionAssezBien },
      Passable: { className: styles.mentionPassable },
      Insuffisant: { className: styles.mentionInsuffisant },
    };

    const config = mentionConfig[mention] || mentionConfig["Passable"];

    return (
      <span className={`${styles.mentionBadge} ${config.className}`}>
        {mention}
      </span>
    );
  };

  return (
    <div className={styles.verificationPage}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <FaShieldAlt className={styles.logoIcon} />
            <div className={styles.logoText}>
              <h1 className={styles.logoTitle}>Vérification de Certificat</h1>
              <p className={styles.logoSubtitle}>
                Authentification sécurisée des certificats de stage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <h2 className={styles.searchTitle}>
            <FaQrcode className={styles.searchIcon} />
            Vérifier un certificat
          </h2>
          <p className={styles.searchDescription}>
            Saisissez le code unique du certificat ou scannez le QR code pour
            vérifier son authenticité
          </p>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputGroup}>
              <FaSearch className={styles.inputIcon} />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                placeholder="CERT-2025-XXXXXXXX"
                className={styles.searchInput}
                pattern="CERT-\d{4}-[A-Z0-9]{8}"
                title="Format: CERT-YYYY-XXXXXXXX"
              />
              <button
                type="submit"
                className={styles.searchButton}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  <>
                    <FaSearch />
                    Vérifier
                  </>
                )}
              </button>
            </div>
          </form>

          <div className={styles.searchHints}>
            <p className={styles.hint}>
              <strong>Format attendu:</strong> CERT-2025-ABCD1234
            </p>
            <p className={styles.hint}>
              <strong>QR Code:</strong> Scannez le QR code présent sur le
              certificat PDF
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className={styles.resultsSection}>
        {/* Error State */}
        {error && (
          <div className={styles.errorResult}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <FaTimesCircle className={styles.errorIcon} />
                <h3 className={styles.resultTitle}>Certificat non valide</h3>
              </div>
              <div className={styles.resultContent}>
                <p className={styles.errorMessage}>{error}</p>
                <div className={styles.errorActions}>
                  <p className={styles.errorHint}>
                    Vérifiez que le code saisi correspond exactement à celui du
                    certificat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {certificate && verificationResult?.valide && (
          <div className={styles.successResult}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <FaCheckCircle className={styles.successIcon} />
                <h3 className={styles.resultTitle}>Certificat authentique</h3>
                <div className={styles.verificationBadge}>
                  <FaShieldAlt className={styles.badgeIcon} />
                  Vérifié #{verificationResult.verificationNumero}
                </div>
              </div>

              <div className={styles.certificateDisplay}>
                {/* Certificate Header */}
                <div className={styles.certificateHeader}>
                  <FaCertificate className={styles.certificateIcon} />
                  <div className={styles.certificateTitle}>
                    <h2>Certificat de Stage</h2>
                    <p className={styles.certificateCode}>
                      Code: {certificate.code_unique}
                    </p>
                  </div>
                  {getMentionBadge(certificate.mention)}
                </div>

                {/* Certificate Content */}
                <div className={styles.certificateContent}>
                  {/* Stagiaire Info */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>
                      <FaUser className={styles.sectionIcon} />
                      Stagiaire
                    </h4>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Nom complet:</span>
                        <span className={styles.value}>
                          {certificate.prenom_stagiaire}{" "}
                          {certificate.nom_stagiaire}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Entreprise Info */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>
                      <FaBuilding className={styles.sectionIcon} />
                      Entreprise d'accueil
                    </h4>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Nom:</span>
                        <span className={styles.value}>
                          {certificate.nom_entreprise}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Secteur:</span>
                        <span className={styles.value}>
                          {certificate.secteur_entreprise}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stage Info */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>
                      <FaCalendarAlt className={styles.sectionIcon} />
                      Informations du stage
                    </h4>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Titre:</span>
                        <span className={styles.value}>
                          {certificate.titre_stage}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Période:</span>
                        <span className={styles.value}>
                          Du{" "}
                          {new Date(
                            certificate.date_debut_stage
                          ).toLocaleDateString("fr-FR")}
                          au{" "}
                          {new Date(
                            certificate.date_fin_stage
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Durée:</span>
                        <span className={styles.value}>
                          {certificate.duree_stage_jours} jours
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Evaluation Info */}
                  <div className={styles.infoSection}>
                    <h4 className={styles.sectionTitle}>
                      <FaStar className={styles.sectionIcon} />
                      Évaluation
                    </h4>
                    <div className={styles.evaluationDisplay}>
                      <div className={styles.scoreContainer}>
                        <div className={styles.scoreNumber}>
                          {certificate.note_finale.toFixed(1)}
                        </div>
                        <div className={styles.scoreDetails}>
                          <span className={styles.scoreMax}>/10</span>
                          {renderStarRating(
                            Math.round(certificate.note_finale)
                          )}
                        </div>
                      </div>
                      <div className={styles.mentionContainer}>
                        <span className={styles.mentionLabel}>
                          Mention obtenue:
                        </span>
                        {getMentionBadge(certificate.mention)}
                      </div>
                    </div>
                  </div>

                  {/* Certificate Metadata */}
                  <div className={styles.metadataSection}>
                    <div className={styles.metadataGrid}>
                      <div className={styles.metadataItem}>
                        <span className={styles.label}>
                          Date de génération:
                        </span>
                        <span className={styles.value}>
                          {new Date(
                            certificate.date_generation
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <div className={styles.metadataItem}>
                        <span className={styles.label}>Statut:</span>
                        <span
                          className={`${styles.status} ${styles.statusValid}`}
                        >
                          <FaCheckCircle className={styles.statusIcon} />
                          Valide et authentique
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Footer */}
                <div className={styles.securityFooter}>
                  <div className={styles.securityInfo}>
                    <FaShieldAlt className={styles.securityIcon} />
                    <div className={styles.securityText}>
                      <p className={styles.securityTitle}>
                        Certificat sécurisé
                      </p>
                      <p className={styles.securityDescription}>
                        Ce certificat a été généré électroniquement et vérifié
                        automatiquement. L'authenticité est garantie par le
                        système de codes uniques.
                      </p>
                    </div>
                  </div>
                  <div className={styles.verificationStats}>
                    <span className={styles.verificationCount}>
                      Vérifié {verificationResult.verificationNumero} fois
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Warning for invalid certificates */}
        {verificationResult && !verificationResult.valide && !loading && (
          <div className={styles.warningResult}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <FaExclamationTriangle className={styles.warningIcon} />
                <h3 className={styles.resultTitle}>Attention</h3>
              </div>
              <div className={styles.resultContent}>
                <p className={styles.warningMessage}>
                  Ce code ne correspond à aucun certificat valide dans notre
                  système.
                </p>
                <div className={styles.warningActions}>
                  <ul className={styles.warningList}>
                    <li>Vérifiez que le code est saisi correctement</li>
                    <li>
                      Assurez-vous que le certificat provient d'une source
                      officielle
                    </li>
                    <li>Contactez l'émetteur du certificat en cas de doute</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <h3 className={styles.infoTitle}>Comment vérifier un certificat ?</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <FaQrcode className={styles.infoIcon} />
              <h4>Scanner le QR Code</h4>
              <p>
                Utilisez votre smartphone pour scanner le QR code présent sur le
                certificat PDF
              </p>
            </div>
            <div className={styles.infoCard}>
              <FaSearch className={styles.infoIcon} />
              <h4>Saisir le code</h4>
              <p>
                Tapez manuellement le code unique au format CERT-YYYY-XXXXXXXX
              </p>
            </div>
            <div className={styles.infoCard}>
              <FaShieldAlt className={styles.infoIcon} />
              <h4>Vérification instantanée</h4>
              <p>
                Obtenez immédiatement la confirmation de l'authenticité du
                certificat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;
