import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiPlay,
  FiCheck,
  FiPause,
  FiMoreHorizontal,
  FiEdit3,
  FiEye,
  FiUpload,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import {
  MdAssignment,
  MdPriorityHigh,
  MdTrendingUp,
  MdFlag,
} from "react-icons/md";
import styles from "./MissionCard.module.css";
import QuickMessageButton from "../messaging/QuickMessageButton";

const MissionCard = ({ mission, currentUser, onAction, onRefresh }) => {
  const [showActions, setShowActions] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);
  const [actionData, setActionData] = useState({
    action: "",
    feedback: "",
    note: "",
    livrables: "",
    pourcentage: mission.pourcentage_completion || 0,
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
      a_faire: {
        label: "À faire",
        class: "todo",
        icon: <MdAssignment />,
        color: "#95a5a6",
      },
      en_cours: {
        label: "En cours",
        class: "inProgress",
        icon: <FiPlay />,
        color: "#3498db",
      },
      en_revision: {
        label: "En révision",
        class: "review",
        icon: <FiClock />,
        color: "#f39c12",
      },
      terminee: {
        label: "Terminée",
        class: "completed",
        icon: <FiCheck />,
        color: "#27ae60",
      },
      annulee: {
        label: "Annulée",
        class: "cancelled",
        icon: <FiX />,
        color: "#e74c3c",
      },
    };
    return (
      statusMap[status] || {
        label: status,
        class: "unknown",
        icon: <MdAssignment />,
        color: "#95a5a6",
      }
    );
  };

  const getPriorityDisplay = (priorite) => {
    const priorityMap = {
      basse: { label: "Basse", class: "low", color: "#95a5a6" },
      normale: { label: "Normale", class: "normal", color: "#3498db" },
      haute: { label: "Haute", class: "high", color: "#f39c12" },
      urgente: { label: "Urgente", class: "urgent", color: "#e74c3c" },
    };
    return priorityMap[priorite] || priorityMap.normale;
  };

  const getAvailableActions = () => {
    const actions = [];

    if (currentUser.type === "stagiaire") {
      switch (mission.status) {
        case "a_faire":
          actions.push({
            key: "commencer",
            label: "Commencer",
            icon: <FiPlay />,
          });
          break;
        case "en_cours":
          actions.push({
            key: "soumettre",
            label: "Soumettre",
            icon: <FiUpload />,
          });
          break;
      }
    } else if (currentUser.type === "recruteur") {
      switch (mission.status) {
        case "en_revision":
          actions.push(
            { key: "valider", label: "Valider", icon: <FiCheck /> },
            { key: "rejeter", label: "Rejeter", icon: <FiX /> }
          );
          break;
        case "a_faire":
        case "en_cours":
        case "terminee":
          actions.push({ key: "annuler", label: "Annuler", icon: <FiX /> });
          break;
      }
    }

    return actions;
  };

  const handleActionClick = (action) => {
    setActionData({
      ...actionData,
      action,
      pourcentage: action === "soumettre" ? 100 : actionData.pourcentage,
    });
    setShowActionForm(true);
    setShowActions(false);
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const data = {};
      if (actionData.feedback) data.feedback = actionData.feedback;
      if (actionData.livrables) data.livrables = actionData.livrables;
      if (actionData.note) data.note = parseInt(actionData.note);
      if (actionData.pourcentage !== undefined)
        data.pourcentage = actionData.pourcentage;
      await onAction(mission.id, actionData.action, data);
      setShowActionForm(false);
      setActionData({
        action: "",
        feedback: "",
        note: "",
        livrables: "",
        pourcentage: 0,
      });
      onRefresh();
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelAction = () => {
    setShowActionForm(false);
    setActionData({
      action: "",
      feedback: "",
      note: "",
      livrables: "",
      pourcentage: mission.pourcentage_completion || 0,
    });
  };
  // Calculer si la mission est en retard
  const isOverdue = () => {
    if (!mission.date_fin_prevue || mission.status === "terminee") return false;
    return new Date() > new Date(mission.date_fin_prevue);
  };

  const statusInfo = getStatusDisplay(mission.status);
  const priorityInfo = getPriorityDisplay(mission.priorite);
  const availableActions = getAvailableActions();
  const canManage = currentUser.type === "recruteur";
  const canWork = currentUser.type === "stagiaire";
  const overdue = isOverdue();

  return (
    <div
      className={`${styles.missionCard} ${styles[statusInfo.class]} ${
        overdue ? styles.overdue : ""
      }`}
    >
      {/* Header de la carte */}
      <div className={styles.cardHeader}>
        <div className={styles.statusAndPriority}>
          <div
            className={styles.statusBadge}
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
          </div>
          <div
            className={styles.priorityBadge}
            style={{ backgroundColor: priorityInfo.color }}
          >
            <MdFlag />
            <span>{priorityInfo.label}</span>
          </div>
        </div>

        {availableActions.length > 0 && (
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

      {/* Alerte retard */}
      {overdue && (
        <div className={styles.overdueAlert}>
          <FiAlertCircle />
          <span>Mission en retard</span>
        </div>
      )}

      {/* Contenu principal */}
      <div className={styles.cardContent}>
        <h3 className={styles.missionTitle}>{mission.titre}</h3>

        <p className={styles.missionDescription}>{mission.description}</p>

        {/* Dates */}
        <div className={styles.datesInfo}>
          <div className={styles.dateItem}>
            <FiCalendar className={styles.inlineIcon} />
            <span>Assignée le {formatDate(mission.date_assignation)}</span>
          </div>

          {mission.date_fin_prevue && (
            <div className={styles.dateItem}>
              <FiClock className={styles.inlineIcon} />
              <span>Échéance: {formatDate(mission.date_fin_prevue)}</span>
            </div>
          )}
        </div>

        {/* Barre de progression */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>Progression</span>
            <span>{mission.pourcentage_completion}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${mission.pourcentage_completion}%`,
                backgroundColor: statusInfo.color,
              }}
            />
          </div>
        </div>

        {/* Note si mission terminée */}
        {mission.status === "terminee" && mission.note_mission && (
          <div className={styles.missionNote}>
            <MdTrendingUp className={styles.inlineIcon} />
            <span>Note: {mission.note_mission}/20</span>
          </div>
        )}

        {/* Feedback */}
        {mission.feedback_recruteur && (
          <div className={styles.feedback}>
            <h4>Feedback recruteur:</h4>
            <p>{mission.feedback_recruteur}</p>
          </div>
        )}

        {mission.feedback_stagiaire && currentUser.type === "recruteur" && (
          <div className={styles.feedback}>
            <h4>Feedback stagiaire:</h4>
            <p>{mission.feedback_stagiaire}</p>
          </div>
        )}

        {/* Actions principales */}
        <div className={styles.cardActions}>
          <Link to={`/missions/${mission.id}`} className={styles.viewButton}>
            <FiEye />
            Voir détails
          </Link>

          {canManage && (
            <Link
              to={`/missions/modifier/${mission.id}`}
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
                {actionData.action === "commencer" && "Commencer la mission"}
                {actionData.action === "soumettre" && "Soumettre la mission"}
                {actionData.action === "valider" && "Valider la mission"}
                {actionData.action === "rejeter" && "Rejeter la mission"}
                {actionData.action === "annuler" && "Annuler la mission"}
              </h4>

              {/* Progression pour soumettre */}
              {actionData.action === "soumettre" && (
                <div className={styles.formGroup}>
                  <label htmlFor="pourcentage">Progression (%) :</label>
                  <input
                    type="range"
                    id="pourcentage"
                    min="0"
                    max="100"
                    value={actionData.pourcentage}
                    onChange={(e) =>
                      setActionData({
                        ...actionData,
                        pourcentage: parseInt(e.target.value),
                      })
                    }
                    className={styles.rangeInput}
                  />
                  <span className={styles.progressValue}>
                    {actionData.pourcentage}%
                  </span>
                </div>
              )}

              {/* Livrables pour soumettre */}
              {actionData.action === "soumettre" && (
                <div className={styles.formGroup}>
                  <label htmlFor="livrables">Livrables :</label>
                  <textarea
                    id="livrables"
                    value={actionData.livrables}
                    onChange={(e) =>
                      setActionData({
                        ...actionData,
                        livrables: e.target.value,
                      })
                    }
                    placeholder="Décrivez ce que vous avez livré..."
                    className={styles.textarea}
                    rows="3"
                  />
                </div>
              )}

              {/* Note pour valider */}
              {actionData.action === "valider" && (
                <div className={styles.formGroup}>
                  <label htmlFor="note">Note (0-20) :</label>
                  <input
                    type="number"
                    id="note"
                    min="0"
                    max="20"
                    value={actionData.note}
                    onChange={(e) =>
                      setActionData({
                        ...actionData,
                        note: e.target.value,
                      })
                    }
                    className={styles.numberInput}
                  />
                </div>
              )}

              {/* Feedback/Commentaires */}
              <div className={styles.formGroup}>
                <label htmlFor="feedback">
                  {actionData.action === "soumettre"
                    ? "Commentaires :"
                    : "Feedback :"}
                </label>
                <textarea
                  id="feedback"
                  value={actionData.feedback}
                  onChange={(e) =>
                    setActionData({
                      ...actionData,
                      feedback: e.target.value,
                    })
                  }
                  placeholder={
                    actionData.action === "soumettre"
                      ? "Vos commentaires sur la réalisation..."
                      : "Votre feedback..."
                  }
                  className={styles.textarea}
                  rows="3"
                  required={
                    actionData.action === "rejeter" ||
                    actionData.action === "annuler"
                  }
                />
              </div>

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

export default MissionCard;
