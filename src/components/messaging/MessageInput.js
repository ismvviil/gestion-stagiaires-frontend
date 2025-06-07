import React, { useState, useRef } from "react";
import { useTypingIndicator } from "../../hooks/useTypingIndicator";
import styles from "./MessageInput2.module.css";

const MessageInput = ({ 
  onSendMessage, 
  onTypingChange, 
  disabled = false,
  placeholder = "Tapez votre message..." 
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  const { handleTyping, stopTyping } = useTypingIndicator(onTypingChange);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled || isSubmitting) return;

    const messageToSend = message.trim();
    setMessage("");
    setIsSubmitting(true);
    stopTyping();

    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error("Erreur envoi message:", error);
      // Restaurer le message en cas d'erreur
      setMessage(messageToSend);
    } finally {
      setIsSubmitting(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    if (e.target.value.trim()) {
      handleTyping();
    } else {
      stopTyping();
    }
  };

  const handleBlur = () => {
    stopTyping();
  };

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className={styles.messageInputForm}>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled || isSubmitting}
          className={`${styles.messageTextarea} ${
            disabled ? styles.disabled : ""
          }`}
          rows={1}
        />
        
        <button
          type="button"
          className={styles.attachButton}
          disabled={disabled}
          title="Joindre un fichier"
        >
          📎
        </button>

        <button
          type="submit"
          disabled={!message.trim() || disabled || isSubmitting}
          className={`${styles.sendButton} ${
            message.trim() && !disabled && !isSubmitting
              ? styles.sendButtonActive
              : ""
          }`}
          title="Envoyer le message"
        >
          {isSubmitting ? "⏳" : "➤"}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;