import React from "react";
import { formatMessageDate, isMyMessage } from "../../types/messaging.types";
import styles from "./MessageItem.module.css";

const MessageItem = ({ message, currentUser, isLast = false }) => {
  const isMine = isMyMessage(message, currentUser?.id);
  const isTemporary = message.isTemporary;

  return (
    <div
      className={`${styles.messageItem} ${
        isMine ? styles.myMessage : styles.otherMessage
      } ${isLast ? styles.lastMessage : ""}`}
    >
      {!isMine && (
        <div className={styles.senderAvatar}>
          {message.emetteur_prenom?.[0]?.toUpperCase() || "?"}
        </div>
      )}

      <div className={styles.messageContent}>
        {!isMine && (
          <div className={styles.senderName}>
            {message.emetteur_prenom} {message.emetteur_nom}
          </div>
        )}

        <div
          className={`${styles.messageBubble} ${
            isMine ? styles.myBubble : styles.otherBubble
          } ${isTemporary ? styles.temporaryMessage : ""}`}
        >
          {message.type_message === "texte" ? (
            <p className={styles.messageText}>{message.contenu}</p>
          ) : message.type_message === "image" ? (
            <div className={styles.imageMessage}>
              <img
                src={message.fichier_url}
                alt="Image partagée"
                className={styles.messageImage}
              />
              {message.contenu && (
                <p className={styles.imageCaption}>{message.contenu}</p>
              )}
            </div>
          ) : message.type_message === "fichier" ? (
            <div className={styles.fileMessage}>
              <div className={styles.fileIcon}>📄</div>
              <div className={styles.fileInfo}>
                <a
                  href={message.fichier_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fileLink}
                >
                  {message.contenu || "Fichier partagé"}
                </a>
              </div>
            </div>
          ) : null}

          <div className={styles.messageFooter}>
            <span className={styles.messageTime}>
              {formatMessageDate(message.date)}
            </span>
            {isMine && (
              <span
                className={`${styles.messageStatus} ${
                  message.lu ? styles.read : styles.sent
                }`}
              >
                {isTemporary ? "⏳" : message.lu ? "✓✓" : "✓"}
              </span>
            )}
          </div>
        </div>
      </div>

      {isMine && (
        <div className={styles.senderAvatar}>
          {currentUser?.prenom?.[0]?.toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
};

export default MessageItem;