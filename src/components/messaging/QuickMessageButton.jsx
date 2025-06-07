import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiWifi, FiWifiOff } from 'react-icons/fi';
import { useConversations } from '../../hooks/useConversations';
import { useMessages } from '../../hooks/useMessages';
import { useWebSocket } from '../../hooks/useWebSocket'; // Ajouter pour diagnostiquer
import ChatBox from './ChatBox';
import styles from './QuickMessageButton.module.css';

const QuickMessageButton = ({ 
  otherUserId, 
  otherUserInfo, 
  context = '',
  buttonText = 'Envoyer un message',
  variant = 'button'
}) => {
  const [showChat, setShowChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Hooks pour la gestion des conversations et messages
  const { createConversation, markAsRead } = useConversations();
  const { isConnected, connectionState, reconnect } = useWebSocket(); // Diagnostique
  
  // 🔥 IMPORTANT : N'activer useMessages QUE quand le modal est ouvert
  const {
    messages,
    loading: messagesLoading,
    sendingMessage,
    hasMore,
    typingUsers,
    sendMessage,
    sendTypingIndicator,
    loadMoreMessages
  } = useMessages(showChat && selectedConversation ? selectedConversation.id : null);

  // 🔥 Diagnostique WebSocket au montage du composant
  useEffect(() => {
    console.log('🔌 QuickMessageButton - État WebSocket:', {
      isConnected,
      connectionState,
      showChat,
      conversationId: selectedConversation?.id
    });
  }, [isConnected, connectionState, showChat, selectedConversation]);

  const handleOpenChat = async () => {
    try {
      setLoading(true);
      
      // 🔥 Vérifier et tenter de reconnecter si nécessaire
      if (!isConnected) {
        console.log('⚠️ WebSocket déconnecté, tentative de reconnexion...');
        try {
          if (reconnect) {
            await reconnect();
          } else {
            // Fallback : reconnecter manuellement
            const token = localStorage.getItem('token');
            if (token && window.webSocketService) {
              await window.webSocketService.connect(token);
            }
          }
          // Attendre un peu pour la connexion
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          console.error('❌ Erreur reconnexion:', err);
        }
      }
      
      // Créer ou récupérer la conversation
      const conversation = await createConversation(otherUserId);
      if (conversation) {
        setSelectedConversation(conversation);
        setShowChat(true);
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
    // Petit délai avant de réinitialiser pour éviter les conflits
    setTimeout(() => {
      setSelectedConversation(null);
    }, 300);
  };

  const handleSendMessage = async (content) => {
    if (!selectedConversation || !content.trim()) return;
    
    console.log('📤 Tentative envoi message. WebSocket connecté:', isConnected);
    
    try {
      await sendMessage(content);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  return (
    <>
      {/* Bouton pour ouvrir le chat */}
      {variant === 'icon' ? (
        <button 
          onClick={handleOpenChat}
          className={styles.iconButton}
          disabled={loading}
          title={buttonText}
        >
          <FiMessageSquare />
        </button>
      ) : (
        <button 
          onClick={handleOpenChat}
          className={styles.messageButton}
          disabled={loading}
        >
          <FiMessageSquare />
          {loading ? 'Chargement...' : buttonText}
        </button>
      )}

      {/* Modal de chat */}
      {showChat && selectedConversation && (
        <div className={styles.chatOverlay} onClick={handleCloseChat}>
          <div className={styles.chatModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.chatHeader}>
              <h3>
                <FiMessageSquare />
                Conversation {context && `- ${context}`}
                {/* Indicateur de connexion WebSocket */}
                {isConnected ? (
                  <FiWifi style={{ color: 'green', marginLeft: '8px' }} title="WebSocket connecté" />
                ) : (
                  <FiWifiOff style={{ color: 'red', marginLeft: '8px' }} title="WebSocket déconnecté" />
                )}
              </h3>
              
              {/* Bouton de reconnexion si déconnecté */}
              {!isConnected && (
                <button 
                  onClick={async () => {
                    console.log('🔄 Tentative de reconnexion manuelle...');
                    try {
                      if (reconnect) {
                        await reconnect();
                      } else {
                        const token = localStorage.getItem('token');
                        if (token && window.webSocketService) {
                          await window.webSocketService.connect(token);
                        }
                      }
                    } catch (err) {
                      console.error('Erreur reconnexion manuelle:', err);
                    }
                  }}
                  className={styles.reconnectButton}
                  title="Reconnecter WebSocket"
                >
                  🔄
                </button>
              )}
              
              <button 
                onClick={handleCloseChat} 
                className={styles.closeButton}
                title="Fermer"
              >
                ×
              </button>
            </div>
            
            <div className={styles.chatContent}>
              <ChatBox
                conversation={{
                  id: selectedConversation.id,
                  autre_participant: otherUserInfo || {
                    id: otherUserId,
                    prenom: 'Utilisateur',
                    nom: '',
                    type: 'utilisateur'
                  }
                }}
                messages={messages || []}
                onSendMessage={handleSendMessage}
                onSendTyping={sendTypingIndicator}
                typingUsers={typingUsers || []}
                loading={messagesLoading}
                hasMore={hasMore}
                onLoadMore={loadMoreMessages}
                onMarkAsRead={markAsRead}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickMessageButton;