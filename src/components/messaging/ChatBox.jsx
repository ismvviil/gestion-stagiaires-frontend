import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { getParticipantName } from "../../types/messaging.types";
import { useAuth } from "../../context/AuthContext";
import styles from "./ChatBox.module.css";

const ChatBox = ({
  conversation,
  messages,
  onSendMessage,
  onSendTyping,
  typingUsers,
  loading,
  hasMore,
  onLoadMore,
  onMarkAsRead
}) => {
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Auto-scroll vers le bas pour les nouveaux messages
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    } else {
      setShowScrollToBottom(true);
    }
  }, [messages, isAtBottom]);

  // Marquer comme lu quand la conversation est sélectionnée
  useEffect(() => {
    if (conversation && onMarkAsRead) {
      onMarkAsRead(conversation.id);
    }
  }, [conversation?.id, onMarkAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollToBottom(false);
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAtBottom(isNearBottom);
    setShowScrollToBottom(!isNearBottom && messages.length > 0);

    // Charger plus de messages si on scroll vers le haut
    if (scrollTop === 0 && hasMore && !loading) {
      onLoadMore?.();
    }
  };

  if (!conversation) {
    return (
      <div className={styles.chatBox}>
        <div className={styles.emptyChatState}>
          <div className={styles.emptyChatIcon}>💬</div>
          <h3>Sélectionnez une conversation</h3>
          <p>Choisissez une conversation pour commencer à discuter</p>
        </div>
      </div>
    );
  }

  const participant = conversation.autre_participant;

  return (
    <div className={styles.chatBox}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.participantInfo}>
          <div className={styles.participantAvatar}>
            {participant?.prenom?.[0]?.toUpperCase() || "?"}
          </div>
          <div className={styles.participantDetails}>
            <h3 className={styles.participantName}>
              {getParticipantName(participant)}
            </h3>
            {participant?.type && (
              <span className={styles.participantRole}>
                {participant.type.replace("_", " ")}
              </span>
            )}
          </div>
        </div>

        <div className={styles.chatActions}>
          <button className={styles.actionButton} title="Informations">
            ℹ️
          </button>
          <button className={styles.actionButton} title="Rechercher">
            🔍
          </button>
          <button className={styles.actionButton} title="Plus d'options">
            ⋮
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className={styles.messagesContainer}
        onScroll={handleScroll}
      >
        {/* Indicateur de chargement en haut */}
        {loading && (
          <div className={styles.loadingMore}>
            <div className={styles.loadingSpinner}></div>
            <span>Chargement des messages...</span>
          </div>
        )}

        {/* Messages */}
        <div className={styles.messagesList}>
          {messages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              currentUser={currentUser}
              isLast={index === messages.length - 1}
            />
          ))}
        </div>

        {/* Indicateur de frappe */}
        <TypingIndicator typingUsers={typingUsers} />

        {/* Référence pour le scroll automatique */}
        <div ref={messagesEndRef} />
      </div>

      {/* Bouton scroll vers le bas */}
      {showScrollToBottom && (
        <button
          className={styles.scrollToBottomButton}
          onClick={scrollToBottom}
          title="Aller en bas"
        >
          ⬇️
        </button>
      )}

      {/* Input de message */}
      <div className={styles.messageInputContainer}>
        <MessageInput
          onSendMessage={onSendMessage}
          onTypingChange={onSendTyping}
          placeholder={`Écrire à ${participant?.prenom}...`}
        />
      </div>
    </div>
  );
};

export default ChatBox;