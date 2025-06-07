import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { missionsService } from '../../services/stageService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock,
  FiUser,
  FiTarget,
  FiEdit3,
  FiPlay,
  FiCheck,
  FiX,
  FiUpload,
  FiFlag,
  FiTool,
  FiFileText,
  FiAlertCircle
} from 'react-icons/fi';
import { 
  MdAssignment,
  MdTrendingUp,
  MdPriorityHigh
} from 'react-icons/md';
import styles from './MissionDetail.module.css';

const MissionDetail = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showActionForm, setShowActionForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [actionData, setActionData] = useState({
    action: '',
    feedback: '',
    note: '',
    livrables: '',
    pourcentage: 0
  });

  // Charger les données de la mission
  const loadMission = async () => {
    try {
      setLoading(true);
      const data = await missionsService.getMission(missionId);
      setMission(data);
      setActionData(prev => ({
        ...prev,
        pourcentage: data.pourcentage_completion || 0
      }));
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Erreur lors du chargement de la mission');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMission();
  }, [missionId]);

  // Gérer les actions sur la mission
  const handleAction = async (action) => {
    setActionData({ ...actionData, action });
    setShowActionForm(true);
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const data = {};
      
      if (actionData.feedback) data.feedback = actionData.feedback;
      if (actionData.livrables) data.livrables = actionData.livrables;
      if (actionData.note) data.note = parseInt(actionData.note);
      if (actionData.pourcentage !== undefined) data.pourcentage = actionData.pourcentage;

      await missionsService.missionAction(missionId, actionData.action, data);
      await loadMission();
      setShowActionForm(false);
      setActionData({ action: '', feedback: '', note: '', livrables: '', pourcentage: 0 });
    } catch (error) {
      console.error('Erreur lors de l\'action:', error);
      setError('Erreur lors de l\'action sur la mission');
    } finally {
      setProcessing(false);
    }
  };

  // Mettre à jour la progression
  const handleProgressUpdate = async (newProgress) => {
    try {
      await missionsService.updateMission(missionId, {
        pourcentage_completion: newProgress
      });
      await loadMission();
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError('Erreur lors de la mise à jour de la progression');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      a_faire: { label: 'À faire', class: 'todo', icon: <MdAssignment />, color: '#95a5a6' },
      en_cours: { label: 'En cours', class: 'inProgress', icon: <FiPlay />, color: '#3498db' },
      en_revision: { label: 'En révision', class: 'review', icon: <FiClock />, color: '#f39c12' },
      terminee: { label: 'Terminée', class: 'completed', icon: <FiCheck />, color: '#27ae60' },
      annulee: { label: 'Annulée', class: 'cancelled', icon: <FiX />, color: '#e74c3c' }
    };
    return statusMap[status] || { label: status, class: 'unknown', icon: <MdAssignment />, color: '#95a5a6' };
  };

  const getPriorityDisplay = (priorite) => {
    const priorityMap = {
      basse: { label: 'Basse', class: 'low', color: '#95a5a6' },
      normale: { label: 'Normale', class: 'normal', color: '#3498db' },
      haute: { label: 'Haute', class: 'high', color: '#f39c12' },
      urgente: { label: 'Urgente', class: 'urgent', color: '#e74c3c' }
    };
    return priorityMap[priorite] || priorityMap.normale;
  };

  const getAvailableActions = () => {
    if (!mission) return [];
    
    const actions = [];
    
    if (currentUser.type === 'stagiaire') {
      switch (mission.status) {
        case 'a_faire':
          actions.push({ key: 'commencer', label: 'Commencer', icon: <FiPlay /> });
          break;
        case 'en_cours':
          actions.push({ key: 'soumettre', label: 'Soumettre', icon: <FiUpload /> });
          break;
      }
    } else if (currentUser.type === 'recruteur') {
      switch (mission.status) {
        case 'en_revision':
          actions.push(
            { key: 'valider', label: 'Valider', icon: <FiCheck /> },
            { key: 'rejeter', label: 'Rejeter', icon: <FiX /> }
          );
          break;
        case 'a_faire':
        case 'en_cours':
        case 'terminee':
          actions.push({ key: 'annuler', label: 'Annuler', icon: <FiX /> });
          break;
      }
    }
    
    return actions;
  };

  // Vérifier si la mission est en retard
  const isOverdue = () => {
    if (!mission?.date_fin_prevue || mission.status === 'terminee') return false;
    return new Date() > new Date(mission.date_fin_prevue);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !mission) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2>Erreur</h2>
          <p>{error || 'Mission non trouvée'}</p>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            Retour
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusDisplay(mission.status);
  const priorityInfo = getPriorityDisplay(mission.priorite);
  const availableActions = getAvailableActions();
  const canManage = currentUser.type === 'recruteur';
  const canWork = currentUser.type === 'stagiaire';
  const overdue = isOverdue();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <FiArrowLeft />
          Retour
        </button>
        
        <div className={styles.headerActions}>
          {canManage && (
            <Link 
              to={`/missions/modifier/${missionId}`}
              className={styles.editButton}
            >
              <FiEdit3 />
              Modifier
            </Link>
          )}
          
          {availableActions.map(action => (
            <button
              key={action.key}
              onClick={() => handleAction(action.key)}
              className={`${styles.actionButton} ${styles[action.key]}`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerte retard */}
      {overdue && (
        <div className={styles.overdueAlert}>
          <FiAlertCircle />
          <span>Cette mission est en retard</span>
        </div>
      )}

      {/* Informations principales */}
      <div className={styles.missionOverview}>
        <div className={styles.missionHeader}>
          <div className={styles.badgesContainer}>
            <div className={styles.statusBadge} style={{ backgroundColor: statusInfo.color }}>
              {statusInfo.icon}
              <span>{statusInfo.label}</span>
            </div>
            
            <div className={styles.priorityBadge} style={{ backgroundColor: priorityInfo.color }}>
              <FiFlag />
              <span>{priorityInfo.label}</span>
            </div>
          </div>
          
          {mission.note_mission && (
            <div className={styles.noteBadge}>
              <MdTrendingUp />
              Note: {mission.note_mission}/20
            </div>
          )}
        </div>

        <h1 className={styles.missionTitle}>
          {mission.titre}
        </h1>
        
        <p className={styles.missionDescription}>
          {mission.description}
        </p>
      </div>

      {/* Grille d'informations */}
      <div className={styles.detailsGrid}>
        {/* Dates et planning */}
        <div className={styles.infoCard}>
          <h3><FiCalendar className={styles.cardIcon} />Planning</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Assignée le :</span>
              <span>{formatDate(mission.date_assignation)}</span>
            </div>
            {mission.date_debut_prevue && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Début prévu :</span>
                <span>{formatDate(mission.date_debut_prevue)}</span>
              </div>
            )}
            {mission.date_fin_prevue && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Fin prévue :</span>
                <span>{formatDate(mission.date_fin_prevue)}</span>
              </div>
            )}
            {mission.date_debut_reel && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Commencée le :</span>
                <span>{formatDate(mission.date_debut_reel)}</span>
              </div>
            )}
            {mission.date_fin_reel && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Terminée le :</span>
                <span>{formatDate(mission.date_fin_reel)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progression */}
        <div className={styles.infoCard}>
          <h3><MdTrendingUp className={styles.cardIcon} />Progression</h3>
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span>Avancement</span>
              <span>{mission.pourcentage_completion}%</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${mission.pourcentage_completion}%`,
                  backgroundColor: statusInfo.color
                }}
              />
            </div>
            
            {canWork && mission.status === 'en_cours' && (
              <div className={styles.progressControls}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={actionData.pourcentage}
                  onChange={(e) => setActionData({
                    ...actionData, 
                    pourcentage: parseInt(e.target.value)
                  })}
                  className={styles.progressSlider}
                />
                <button
                  onClick={() => handleProgressUpdate(actionData.pourcentage)}
                  className={styles.updateButton}
                >
                  Mettre à jour ({actionData.pourcentage}%)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Objectifs */}
        {mission.objectifs && (
          <div className={styles.infoCard}>
            <h3><FiTarget className={styles.cardIcon} />Objectifs</h3>
            <p className={styles.objectifsText}>{mission.objectifs}</p>
          </div>
        )}

        {/* Ressources */}
        {mission.ressources_necessaires && (
          <div className={styles.infoCard}>
            <h3><FiTool className={styles.cardIcon} />Ressources nécessaires</h3>
            <p className={styles.ressourcesText}>{mission.ressources_necessaires}</p>
          </div>
        )}

        {/* Livrables attendus */}
        {mission.livrables_attendus && (
          <div className={styles.infoCard}>
            <h3><FiFileText className={styles.cardIcon} />Livrables attendus</h3>
            <p className={styles.livrablesText}>{mission.livrables_attendus}</p>
          </div>
        )}

        {/* Livrables fournis */}
        {mission.livrables_fournis && (
          <div className={styles.infoCard}>
            <h3><FiUpload className={styles.cardIcon} />Livrables fournis</h3>
            <p className={styles.livrablesText}>{mission.livrables_fournis}</p>
          </div>
        )}
      </div>

      {/* Feedback et commentaires */}
      {(mission.feedback_recruteur || mission.feedback_stagiaire) && (
        <div className={styles.feedbackSection}>
          <h3>Feedback et commentaires</h3>
          
          {mission.feedback_recruteur && (
            <div className={styles.feedbackCard}>
              <h4><FiUser className={styles.feedbackIcon} />Feedback du recruteur</h4>
              <p>{mission.feedback_recruteur}</p>
            </div>
          )}
          
          {mission.feedback_stagiaire && (currentUser.type === 'recruteur' || currentUser.type === 'stagiaire') && (
            <div className={styles.feedbackCard}>
              <h4><FiUser className={styles.feedbackIcon} />Feedback du stagiaire</h4>
              <p>{mission.feedback_stagiaire}</p>
            </div>
          )}
        </div>
      )}

      {/* Outils utilisés */}
      {mission.outils_utilises && (
        <div className={styles.toolsSection}>
          <h3><FiTool className={styles.sectionIcon} />Outils utilisés</h3>
          <p>{mission.outils_utilises}</p>
        </div>
      )}

      {/* Formulaire d'action */}
      {showActionForm && (
        <div className={styles.actionFormOverlay}>
          <div className={styles.actionForm}>
            <form onSubmit={handleActionSubmit}>
              <h4>
                {actionData.action === 'commencer' && 'Commencer la mission'}
                {actionData.action === 'soumettre' && 'Soumettre la mission'}
                {actionData.action === 'valider' && 'Valider la mission'}
                {actionData.action === 'rejeter' && 'Rejeter la mission'}
                {actionData.action === 'annuler' && 'Annuler la mission'}
              </h4>

              {/* Progression pour soumettre */}
              {actionData.action === 'soumettre' && (
                <div className={styles.formGroup}>
                  <label htmlFor="pourcentage">Progression finale (%) :</label>
                  <input
                    type="range"
                    id="pourcentage"
                    min="0"
                    max="100"
                    value={actionData.pourcentage}
                    onChange={(e) => setActionData({
                      ...actionData,
                      pourcentage: parseInt(e.target.value)
                    })}
                    className={styles.rangeInput}
                  />
                  <span className={styles.progressValue}>{actionData.pourcentage}%</span>
                </div>
              )}

              {/* Livrables pour soumettre */}
              {actionData.action === 'soumettre' && (
                <div className={styles.formGroup}>
                  <label htmlFor="livrables">Livrables :</label>
                  <textarea
                    id="livrables"
                    value={actionData.livrables}
                    onChange={(e) => setActionData({
                      ...actionData,
                      livrables: e.target.value
                    })}
                    placeholder="Décrivez ce que vous avez livré..."
                    className={styles.textarea}
                    rows="4"
                  />
                </div>
              )}

              {/* Note pour valider */}
              {actionData.action === 'valider' && (
                <div className={styles.formGroup}>
                  <label htmlFor="note">Note (0-20) :</label>
                  <input
                    type="number"
                    id="note"
                    min="0"
                    max="20"
                    value={actionData.note}
                    onChange={(e) => setActionData({
                      ...actionData,
                      note: e.target.value
                    })}
                    className={styles.numberInput}
                  />
                </div>
              )}

              {/* Feedback/Commentaires */}
              <div className={styles.formGroup}>
                <label htmlFor="feedback">
                  {actionData.action === 'soumettre' ? 'Commentaires :' : 'Feedback :'}
                </label>
                <textarea
                  id="feedback"
                  value={actionData.feedback}
                  onChange={(e) => setActionData({
                    ...actionData,
                    feedback: e.target.value
                  })}
                  placeholder={
                    actionData.action === 'soumettre' 
                      ? "Vos commentaires sur la réalisation..."
                      : "Votre feedback..."
                  }
                  className={styles.textarea}
                  rows="4"
                  required={actionData.action === 'rejeter' || actionData.action === 'annuler'}
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setShowActionForm(false)}
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
                  {processing ? 'Traitement...' : 'Confirmer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionDetail;