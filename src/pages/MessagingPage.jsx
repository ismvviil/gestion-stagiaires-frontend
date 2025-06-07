import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useWebSocket } from "../hooks/useWebSocket";
import { useConversations } from "../hooks/useConversations";
import { useMessages } from "../hooks/useMessages";
import ConversationList from "../components/messaging/ConversationList";
import ChatBox from "../components/messaging/ChatBox";
import ConnectionStatus from "../components/messaging/ConnectionStatus";
import NewConversationModal from "../components/messaging/NewConversationModal";
import styles from "./MessagingPage.module.css";

const MessagingPage = () => {
  const { currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewConversationModal, setShowNewConversationModal] = useState(false);

  // Hooks de messagerie
  const { isConnected, connectionState, error: wsError, onlineUsers } = useWebSocket();
   const {
    conversations = [], // 🔥 Valeur par défaut
    loading: conversationsLoading,
    error: conversationsError,
    unreadCount,
    createConversation,
    markAsRead,
    refresh: refreshConversations
  } = useConversations();


  const {
    messages = [], // 🔥 Valeur par défaut
    loading: messagesLoading,
    sendingMessage,
    error: messagesError,
    hasMore,
    typingUsers = [], // 🔥 Valeur par défaut
    sendMessage,
    sendTypingIndicator,
    loadMoreMessages
  } = useMessages(selectedConversation?.id);

   // 🔥 Protection contre les erreurs de rendu
//   if (!currentUser) {
//     return (
//       <div className={styles.messagingPage}>
//         <div className={styles.errorState}>
//           <h2>Accès non autorisé</h2>
//           <p>Vous devez être connecté pour accéder à la messagerie.</p>
//         </div>
//       </div>
//     );
//   }

   // Sélectionner une conversation
  const handleSelectConversation = useCallback((conversation) => {
    if (!conversation) return; // 🔥 Protection
    
    setSelectedConversation(conversation);
    
    // Marquer comme lu si il y a des messages non lus
    if (conversation.messages_non_lus > 0) {
      markAsRead(conversation.id);
    }
  }, [markAsRead]);

  // Envoyer un message
  const handleSendMessage = useCallback(async (contenu) => {
    if (!selectedConversation || !contenu?.trim()) return; // 🔥 Protection
    
    try {
      await sendMessage(contenu);
    } catch (error) {
      console.error("Erreur envoi message:", error);
    }
  }, [selectedConversation, sendMessage]);

//   // Créer une nouvelle conversation
//   const handleCreateConversation = useCallback(async (participantId) => {
//     try {
//       const newConversation = await createConversation(participantId);
//       setSelectedConversation(newConversation);
//       setShowNewConversationModal(false);
//     } catch (error) {
//       console.error("Erreur création conversation:", error);
//       // Vous pouvez ajouter une notification d'erreur ici
//     }
//   }, [createConversation]);
// Créer une nouvelle conversation
  const handleCreateConversation = useCallback(async (participantId) => {
    if (!participantId) return; // 🔥 Protection
    
    try {
      const newConversation = await createConversation(participantId);
      if (newConversation) {
        setSelectedConversation(newConversation);
        setShowNewConversationModal(false);
      }
    } catch (error) {
      console.error("Erreur création conversation:", error);
    }
  }, [createConversation]);

  // Raccourcis clavier
  useEffect(() => {
    const handleKeydown = (e) => {
      // Escape pour fermer la modal
      if (e.key === "Escape" && showNewConversationModal) {
        setShowNewConversationModal(false);
      }
      
      // Ctrl/Cmd + N pour nouvelle conversation
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        setShowNewConversationModal(true);
      }

      // Naviguer entre les conversations avec les flèches
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        if (conversations.length > 0 && !showNewConversationModal) {
          e.preventDefault();
          const currentIndex = conversations.findIndex(
            conv => conv.id === selectedConversation?.id
          );
          
          let newIndex;
          if (e.key === "ArrowUp") {
            newIndex = currentIndex > 0 ? currentIndex - 1 : conversations.length - 1;
          } else {
            newIndex = currentIndex < conversations.length - 1 ? currentIndex + 1 : 0;
          }
          
          setSelectedConversation(conversations[newIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [conversations, selectedConversation, showNewConversationModal]);

  // Auto-sélectionner la première conversation si aucune n'est sélectionnée
//   useEffect(() => {
//     if (!selectedConversation && conversations.length > 0) {
//       setSelectedConversation(conversations[0]);
//     }
//   }, [conversations, selectedConversation]);
// Auto-sélectionner la première conversation si aucune n'est sélectionnée
  useEffect(() => {
    if (!selectedConversation && Array.isArray(conversations) && conversations.length > 0) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation]);

  if (!currentUser) {
    return (
      <div className={styles.messagingPage}>
        <div className={styles.errorState}>
          <h2>Accès non autorisé</h2>
          <p>Vous devez être connecté pour accéder à la messagerie.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messagingPage}>
      {/* Status de connexion */}
      <ConnectionStatus 
        connectionState={connectionState}
        error={wsError}
        onRetry={() => window.location.reload()}
      />

      {/* Layout principal */}
      <div className={styles.messagingLayout}>
        {/* Sidebar - Liste des conversations */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarTitle}>
              <h2>Messages</h2>
              {unreadCount > 0 && (
                <div className={styles.globalUnreadBadge}>
                  {unreadCount}
                </div>
              )}
            </div>
            
            <div className={styles.sidebarActions}>
              <button
                className={styles.newConversationButton}
                onClick={() => setShowNewConversationModal(true)}
                title="Nouvelle conversation (Ctrl+N)"
              >
                ✉️
              </button>
              <button
                className={styles.refreshButton}
                onClick={refreshConversations}
                title="Actualiser"
              >
                🔄
              </button>
            </div>
          </div>

          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            loading={conversationsLoading}
            onlineUsers={onlineUsers}
          />

          {/* Erreurs conversations */}
          {conversationsError && (
            <div className={styles.errorBanner}>
              <span>❌ {conversationsError}</span>
              <button
                className={styles.retryButton}
                onClick={refreshConversations}
              >
                Réessayer
              </button>
            </div>
          )}
        </div>

        {/* Zone de chat principale */}
        <div className={styles.mainContent}>
          <ChatBox
            conversation={selectedConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onSendTyping={sendTypingIndicator}
            typingUsers={typingUsers}
            loading={messagesLoading}
            hasMore={hasMore}
            onLoadMore={loadMoreMessages}
            onMarkAsRead={markAsRead}
          />

          {/* Erreurs messages */}
          {messagesError && (
            <div className={styles.messageErrorBanner}>
              <span>❌ Erreur: {messagesError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal nouvelle conversation */}
      {showNewConversationModal && (
        <NewConversationModal
          onCreateConversation={handleCreateConversation}
          onClose={() => setShowNewConversationModal(false)}
          currentUser={currentUser}
        />
      )}

      {/* Indicateur d'envoi global */}
      {sendingMessage && (
        <div className={styles.sendingIndicator}>
          <div className={styles.sendingSpinner}></div>
          <span>Envoi en cours...</span>
        </div>
      )}
    </div>
  );
};

export default MessagingPage;