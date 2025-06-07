import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiTarget,
  FiPlay,
  FiCheck,
  FiPause,
  FiSquare,
  FiMoreHorizontal,
  FiEdit3,
  FiEye,
} from "react-icons/fi";
import { FaStar } from 'react-icons/fa';

import { MdWork, MdAssignment, MdTrendingUp } from "react-icons/md";
import styles from "./StageCard.module.css";
import QuickMessageButton from "../messaging/QuickMessageButton";

const StageCard = ({ stage, currentUser, onAction, onRefresh }) => {
  const [showActions, setShowActions] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);
  const [actionData, setActionData] = useState({
    action: "",
    commentaires: "",
    note_finale: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      en_attente: {
        label: "En attente",
        class: "pending",
        icon: <FiClock />,
        color: "#f39c12",
      },
      en_cours: {
        label: "En cours",
        class: "inProgress",
        icon: <FiPlay />,
        color: "#3498db",
      },
      termine: {
        label: "Terminé",
        class: "completed",
        icon: <FiCheck />,
        color: "#27ae60",
      },
      interrompu: {
        label: "Interrompu",
        class: "interrupted",
        icon: <FiSquare />,
        color: "#e74c3c",
      },
      suspendu: {
        label: "Suspendu",
        class: "suspended",
        icon: <FiPause />,
        color: "#95a5a6",
      },
    };

    return (
      statusMap[status] || {
        label: status,
        class: "unknown",
        icon: <FiClock />,
        color: "#95a5a6",
      }
    );
  };

  const getAvailableActions = () => {
    const actions = [];

    if (currentUser.type === "recruteur") {
      switch (stage.status) {
        case "en_attente":
          actions.push({
            key: "commencer",
            label: "Commencer le stage",
            icon: <FiPlay />,
          });
          break;
        case "en_cours":
          actions.push(
            { key: "terminer", label: "Terminer le stage", icon: <FiCheck /> },
            { key: "suspendre", label: "Suspendre", icon: <FiPause /> },
            { key: "interrompre", label: "Interrompre", icon: <FiSquare /> }
          );
          break;
        case "suspendu":
          actions.push(
            { key: "commencer", label: "Reprendre", icon: <FiPlay /> },
            { key: "interrompre", label: "Interrompre", icon: <FiSquare /> }
          );
          break;
      }
    }

    return actions;
  };

  const handleActionClick = (action) => {
    setActionData({ ...actionData, action });
    setShowActionForm(true);
    setShowActions(false);
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const data = {
        commentaires: actionData.commentaires,
      };

      if (actionData.action === "terminer" && actionData.note_finale) {
        data.note_finale = parseInt(actionData.note_finale);
      }

      await onAction(stage.id, actionData.action, data);
      setShowActionForm(false);
      setActionData({ action: "", commentaires: "", note_finale: "" });
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelAction = () => {
    setShowActionForm(false);
    setActionData({ action: "", commentaires: "", note_finale: "" });
  };

  const statusInfo = getStatusDisplay(stage.status);
  const availableActions = getAvailableActions();
  const canManage = currentUser.type === "recruteur";

  // Calculer la progression (basé sur les dates)
  const getProgressPercentage = () => {
    if (!stage.date_debut || !stage.date_fin) return 0;

    const start = new Date(stage.date_debut);
    const end = new Date(stage.date_fin);
    const now = new Date();

    if (now < start) return 0;
    if (now > end) return 100;

    const total = end - start;
    const current = now - start;
    return Math.round((current / total) * 100);
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className={`${styles.stageCard} ${styles[statusInfo.class]}`}>
      {/* Header de la carte */}
      <div className={styles.cardHeader}>
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: statusInfo.color }}
        >
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>

        {canManage && availableActions.length > 0 && (
          <div className={styles.actionsDropdown}>
            <button
              onClick={() => setShowActions(!showActions)}
              className={styles.actionsButton}
            >
              <FiMoreHorizontal />
            </button>

            {showActions && (
              <div className={styles.actionsMenu}>
                {availableActions.map((action) => (
                  <button
                    key={action.key}
                    onClick={() => handleActionClick(action.key)}
                    className={styles.actionMenuItem}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className={styles.cardContent}>
        {/* Description */}
        <div className={styles.stageInfo}>
          <h3 className={styles.stageTitle}>
            {stage.description || "Stage sans description"}
          </h3>

          {stage.objectifs && (
            <div className={styles.objectifs}>
              <FiTarget className={styles.inlineIcon} />
              <span>{stage.objectifs}</span>
            </div>
          )}
        </div>

        {/* Dates */}
        <div className={styles.datesInfo}>
          <div className={styles.dateItem}>
            <FiCalendar className={styles.inlineIcon} />
            <span>
              Du {formatDate(stage.date_debut)} au {formatDate(stage.date_fin)}
            </span>
          </div>

          {stage.date_debut_reel && (
            <div className={styles.dateItem}>
              <FiPlay className={styles.inlineIcon} />
              <span>Commencé le {formatDate(stage.date_debut_reel)}</span>
            </div>
          )}
        </div>

        {/* Barre de progression pour les stages en cours */}
        {stage.status === "en_cours" && (
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span>Progression</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Note finale si terminé */}
        {stage.status === "termine" && stage.note_finale && (
          <div className={styles.finalNote}>
            <MdTrendingUp className={styles.inlineIcon} />
            <span>Note finale: {stage.note_finale}/20</span>
          </div>
        )}

        {/* Actions principales */}
        <div className={styles.cardActions}>
          <Link to={`/stages/${stage.id}`} className={styles.viewButton}>
            <FiEye />
            Voir détails
          </Link>

          <Link
            to={`/stages/${stage.id}/missions`}
            className={styles.missionsButton}
          >
            <MdAssignment />
            Missions
          </Link>


          {/* NOUVEAU : Bouton messagerie */}
          {/* <QuickMessageButton
            otherUserId={
              currentUser.type === "recruteur"
                ? stage.stagiaire_id
                : stage.recruteur_id
            }
            otherUserInfo={{
              id:
                currentUser.type === "recruteur"
                  ? stage.stagiaire_id
                  : stage.recruteur_id,
              prenom:
                currentUser.type === "recruteur" ? "Stagiaire" : "Recruteur",
              nom: "",
            }}
            context={`Stage: ${stage.description?.substring(0, 30)}...`}
            buttonText="Messages"
            variant="button"
          /> */}
          {/* 🔥 NOUVEAU : Bouton évaluation pour stages terminés */}
  {stage.status === 'termine' && 
   (currentUser.type === 'recruteur' || currentUser.type === 'responsable_rh') && (
    <Link
      to={`/evaluations?stageId=${stage.id}`}
      className={styles.editButton}
    >
      <FaStar />
      Évaluer
    </Link>
  )}

          {canManage && (
            <Link
              to={`/stages/${stage.id}?edit=true`}
              className={styles.editButton}
            >
              <FiEdit3 />
              Modifier
            </Link>
          )}
        </div>
      </div>

      {/* Formulaire d'action */}
      {showActionForm && (
        <div className={styles.actionFormOverlay}>
          <div className={styles.actionForm}>
            <form onSubmit={handleActionSubmit}>
              <h4>
                {actionData.action === "commencer" && "Commencer le stage"}
                {actionData.action === "terminer" && "Terminer le stage"}
                {actionData.action === "suspendre" && "Suspendre le stage"}
                {actionData.action === "interrompre" && "Interrompre le stage"}
              </h4>

              <div className={styles.formGroup}>
                <label htmlFor="commentaires">Commentaires :</label>
                <textarea
                  id="commentaires"
                  value={actionData.commentaires}
                  onChange={(e) =>
                    setActionData({
                      ...actionData,
                      commentaires: e.target.value,
                    })
                  }
                  placeholder="Vos commentaires..."
                  className={styles.textarea}
                  rows="3"
                />
              </div>

              {actionData.action === "terminer" && (
                <div className={styles.formGroup}>
                  <label htmlFor="note_finale">Note finale (0-20) :</label>
                  <input
                    type="number"
                    id="note_finale"
                    min="0"
                    max="20"
                    value={actionData.note_finale}
                    onChange={(e) =>
                      setActionData({
                        ...actionData,
                        note_finale: e.target.value,
                      })
                    }
                    className={styles.numberInput}
                  />
                </div>
              )}

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleCancelAction}
                  className={styles.cancelButton}
                  disabled={processing}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={processing}
                >
                  {processing ? "Traitement..." : "Confirmer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageCard;
