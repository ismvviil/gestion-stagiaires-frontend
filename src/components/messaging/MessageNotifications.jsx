import React from 'react';
import { FiMessageSquare, FiBell } from 'react-icons/fi';
import { useConversations } from '../../hooks/useConversations';
import styles from './MessageNotifications.module.css';

const MessageNotifications = ({ stageId = null, missionId = null }) => {
  // Utiliser ton hook existant qui gère déjà les notifications
  const { conversations, unreadCount } = useConversations();

  // Ne pas afficher si pas de messages non lus
  if (unreadCount === 0) return null;

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notificationBadge}>
        <FiBell className={styles.bellIcon} />
        <span className={styles.badgeCount}>{unreadCount}</span>
      </div>
      
      <div className={styles.notificationTooltip}>
        <h4>Nouveaux messages</h4>
        {conversations
          .filter(conv => conv.messages_non_lus > 0)
          .slice(0, 3) // Montrer max 3 conversations
          .map(conv => (
            <div key={conv.id} className={styles.notificationItem}>
              <FiMessageSquare />
              <span>
                {conv.messages_non_lus} nouveau{conv.messages_non_lus > 1 ? 'x' : ''} message{conv.messages_non_lus > 1 ? 's' : ''}
                {conv.autre_participant && (
                  <span className={styles.fromUser}>
                    {' '}de {conv.autre_participant.prenom}
                  </span>
                )}
              </span>
            </div>
          ))
        }
        {conversations.filter(conv => conv.messages_non_lus > 0).length > 3 && (
          <div className={styles.moreNotifications}>
            +{conversations.filter(conv => conv.messages_non_lus > 0).length - 3} autres conversations
          </div>
        )}
      </div>
    </div>
  );
};


export default MessageNotifications;