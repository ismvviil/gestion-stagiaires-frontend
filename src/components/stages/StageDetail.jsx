import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { stagesService, missionsService } from '../../services/stageService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import MissionCard from '../../components/missions/MissionCard';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiUser, 
  FiTarget, 
  FiEdit3,
  FiPlus,
  FiCheck,
  FiClock,
  FiPlay,
  FiSquare,
  FiPause,
  FiMessageSquare
} from 'react-icons/fi';
import { 
  MdWork, 
  MdAssignment,
  MdTrendingUp,
  MdBusiness 
} from 'react-icons/md';
import styles from './StageDetail.module.css';

// Ajouter ces imports en haut
import { useConversations } from '../../hooks/useConversations';
import { useMessages } from '../../hooks/useMessages';
import ChatBox from '../../components/messaging/ChatBox';
import MessageNotifications from '../../components/messaging/MessageNotifications';





const StageDetail = () => {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  
  const [stage, setStage] = useState(null);
  const [missions, setMissions] = useState([]);
  const [candidatureInfo, setCandidatureInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
  
  const [editForm, setEditForm] = useState({
    objectifs: '',
    description: '',
    commentaires_entreprise: ''
  });



  // Dans le composant, ajouter ces states
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loadingConversation, setLoadingConversation] = useState(false);

  
    // Utiliser tes hooks
const { createConversation, markAsRead } = useConversations();
const {
  messages,
  loading: messagesLoading,
  sendingMessage,
  hasMore,
  typingUsers,
  sendMessage,
  sendTypingIndicator,
  loadMoreMessages
} = useMessages(selectedConversation?.id);

  // Fonction pour ouvrir la messagerie
const handleOpenMessaging = async () => {
  if (!stage) return;
  
  try {
    setLoadingConversation(true);
    
    const otherUserId = currentUser.type === 'recruteur' 
      ? stage.stagiaire_id 
      : stage.recruteur_id;
    
    const conversation = await createConversation(otherUserId);
    setSelectedConversation(conversation);
    setShowMessaging(true);
  } catch (error) {
    console.error('Erreur lors de l\'ouverture de la messagerie:', error);
    setError('Erreur lors de l\'ouverture de la messagerie');
  } finally {
    setLoadingConversation(false);
  }
};

  // Charger les données du stage
  const loadStageData = async () => {
    try {
      setLoading(true);
      
      // Charger le stage
      const stageData = await stagesService.getStage(stageId);
      setStage(stageData);
      
      // Initialiser le formulaire d'édition
      setEditForm({
        objectifs: stageData.objectifs || '',
        description: stageData.description || '',
        commentaires_entreprise: stageData.commentaires_entreprise || ''
      });
      
      // Charger les missions du stage
      const missionsData = await missionsService.getMissionsByStage(stageId);
      setMissions(missionsData);
      
      // Charger les infos de candidature (si accessible)
      try {
        const candidatureData = await stagesService.getStageCandidature(stageId);
        setCandidatureInfo(candidatureData);
      } catch (err) {
        // Pas d'accès aux infos de candidature, c'est ok
        console.log('Pas d\'accès aux infos de candidature');
      }
      
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStageData();
  }, [stageId]);

  // Sauvegarder les modifications
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await stagesService.updateStage(stageId, editForm);
      await loadStageData(); // Recharger les données
      setIsEditing(false);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError('Erreur lors de la sauvegarde');
    }
  };

  // Gérer les actions sur le stage
  const handleStageAction = async (action, data = {}) => {
    try {
      await stagesService.stageAction(stageId, action, data);
      await loadStageData(); // Recharger les données
    } catch (err) {
      console.error('Erreur lors de l\'action:', err);
      setError('Erreur lors de l\'action sur le stage');
    }
  };

  // Gérer les actions sur les missions
  const handleMissionAction = async (missionId, action, data = {}) => {
    try {
      await missionsService.missionAction(missionId, action, data);
      await loadStageData(); // Recharger les missions
    } catch (err) {
      console.error('Erreur lors de l\'action sur la mission:', err);
      setError('Erreur lors de l\'action sur la mission');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      en_attente: { label: 'En attente', class: 'pending', icon: <FiClock />, color: '#f39c12' },
      en_cours: { label: 'En cours', class: 'inProgress', icon: <FiPlay />, color: '#3498db' },
      termine: { label: 'Terminé', class: 'completed', icon: <FiCheck />, color: '#27ae60' },
      interrompu: { label: 'Interrompu', class: 'interrupted', icon: <FiSquare  />, color: '#e74c3c' },
      suspendu: { label: 'Suspendu', class: 'suspended', icon: <FiPause />, color: '#95a5a6' }
    };
    return statusMap[status] || { label: status, class: 'unknown', icon: <FiClock />, color: '#95a5a6' };
  };

  const canManage = currentUser.type === 'recruteur';
  const canEdit = canManage && stage?.recruteur_id === currentUser.id;

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !stage) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2>Erreur</h2>
          <p>{error || 'Stage non trouvé'}</p>
          <button onClick={() => navigate('/mes-stages')} className={styles.backButton}>
            Retour aux stages
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusDisplay(stage.status);

  // Statistiques des missions
  const missionStats = {
    total: missions.length,
    enCours: missions.filter(m => m.status === 'en_cours').length,
    terminees: missions.filter(m => m.status === 'terminee').length,
    aFaire: missions.filter(m => m.status === 'a_faire').length
  };

  return (
    <div className={styles.container}>
      {/*  
      */}
      <MessageNotifications stageId={stageId} />
      {/* Header */}
      <div className={styles.header}>
        <button onClick={() => navigate('/mes-stages')} className={styles.backButton}>
          <FiArrowLeft />
          Retour aux stages
        </button>
        
        <div className={styles.headerActions}>
          <button 
  onClick={handleOpenMessaging}
  className={styles.messageButton}
  disabled={loadingConversation}
>
  <FiMessageSquare />
  {currentUser.type === 'recruteur' ? 'Contacter le stagiaire' : 'Contacter le recruteur'}
</button>
          {canEdit && !isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              <FiEdit3 />
              Modifier
            </button>
          )}
          
          {canEdit && stage.status === 'en_cours' && (
            <Link 
              to={`/missions/nouvelle/${stageId}`}
              className={styles.addMissionButton}
            >
              <FiPlus />
              Nouvelle mission
            </Link>
          )}
        </div>
      </div>

      {/* Informations principales du stage */}
      <div className={styles.stageOverview}>
        <div className={styles.stageHeader}>
          <div className={styles.statusBadge} style={{ backgroundColor: statusInfo.color }}>
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
          </div>
          
          {stage.note_finale && (
            <div className={styles.finalNote}>
              <MdTrendingUp />
              Note finale: {stage.note_finale}/20
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveEdit} className={styles.editForm}>
            <div className={styles.formGroup}>
              <label>Description du stage :</label>
              <input
                type="text"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Objectifs :</label>
              <textarea
                value={editForm.objectifs}
                onChange={(e) => setEditForm({...editForm, objectifs: e.target.value})}
                className={styles.textarea}
                rows="4"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Commentaires entreprise :</label>
              <textarea
                value={editForm.commentaires_entreprise}
                onChange={(e) => setEditForm({...editForm, commentaires_entreprise: e.target.value})}
                className={styles.textarea}
                rows="3"
              />
            </div>
            
            <div className={styles.formActions}>
              <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                Annuler
              </button>
              <button type="submit" className={styles.saveButton}>
                Sauvegarder
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.stageInfo}>
            <h1 className={styles.stageTitle}>
              {stage.description || 'Stage sans description'}
            </h1>
            
            {stage.objectifs && (
              <div className={styles.objectifs}>
                <FiTarget className={styles.icon} />
                <div>
                  <h3>Objectifs</h3>
                  <p>{stage.objectifs}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Informations détaillées */}
      <div className={styles.detailsGrid}>
        {/* Dates et durée */}
        <div className={styles.infoCard}>
          <h3><FiCalendar className={styles.cardIcon} />Dates et durée</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Période prévue :</span>
              <span>{formatDate(stage.date_debut)} - {formatDate(stage.date_fin)}</span>
            </div>
            {stage.date_debut_reel && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Commencé le :</span>
                <span>{formatDate(stage.date_debut_reel)}</span>
              </div>
            )}
            {stage.date_fin_reel && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Terminé le :</span>
                <span>{formatDate(stage.date_fin_reel)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Informations de l'offre liée */}
        {candidatureInfo?.offre && (
          <div className={styles.infoCard}>
            <h3><MdBusiness className={styles.cardIcon} />Offre liée</h3>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Titre :</span>
                <span>{candidatureInfo.offre.titre}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Secteur :</span>
                <span>{candidatureInfo.offre.secteur}</span>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques des missions */}
        <div className={styles.infoCard}>
          <h3><MdAssignment className={styles.cardIcon} />Missions</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{missionStats.total}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{missionStats.aFaire}</span>
              <span className={styles.statLabel}>À faire</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{missionStats.enCours}</span>
              <span className={styles.statLabel}>En cours</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{missionStats.terminees}</span>
              <span className={styles.statLabel}>Terminées</span>
            </div>
          </div>
        </div>
      </div>

      {/* Commentaires */}
      {(stage.commentaires_entreprise || stage.commentaires_stagiaire) && (
        <div className={styles.commentsSection}>
          <h3>Commentaires</h3>
          {stage.commentaires_entreprise && (
            <div className={styles.comment}>
              <h4>Entreprise :</h4>
              <p>{stage.commentaires_entreprise}</p>
            </div>
          )}
          {stage.commentaires_stagiaire && (
            <div className={styles.comment}>
              <h4>Stagiaire :</h4>
              <p>{stage.commentaires_stagiaire}</p>
            </div>
          )}
        </div>
      )}

      {/* Liste des missions */}
      <div className={styles.missionsSection}>
        <div className={styles.sectionHeader}>
          <h3>Missions du stage</h3>
          {canEdit && stage.status === 'en_cours' && (
            <Link 
              to={`/missions/nouvelle/${stageId}`}
              className={styles.addMissionButton}
            >
              <FiPlus />
              Ajouter une mission
            </Link>
          )}
        </div>

        {missions.length === 0 ? (
          <div className={styles.emptyMissions}>
            <MdAssignment className={styles.emptyIcon} />
            <h4>Aucune mission assignée</h4>
            <p>
              {canEdit 
                ? 'Commencez par créer la première mission pour ce stage.'
                : 'Aucune mission n\'a encore été assignée pour ce stage.'
              }
            </p>
          </div>
        ) : (
          <div className={styles.missionsGrid}>
            {missions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                currentUser={currentUser}
                onAction={handleMissionAction}
                onRefresh={loadStageData}
              />
            ))}
          </div>
        )}
      </div>

      {/* // Modal à la fin du JSX */}
{showMessaging && selectedConversation && (
  <div className={styles.messagingOverlay}>
    <div className={styles.messagingModal}>
      <div className={styles.messagingHeader}>
        <h3>
          <FiMessageSquare />
          Conversation - Stage: {stage.description?.substring(0, 30)}...
        </h3>
        <button 
          onClick={() => setShowMessaging(false)}
          className={styles.closeButton}
        >
          ×
        </button>
      </div>
      
      <div className={styles.messagingContent}>
        <ChatBox
          conversation={selectedConversation}
          messages={messages}
          onSendMessage={sendMessage}
          onSendTyping={sendTypingIndicator}
          typingUsers={typingUsers}
          loading={messagesLoading}
          hasMore={hasMore}
          onLoadMore={loadMoreMessages}
          onMarkAsRead={markAsRead}
        />
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default StageDetail;