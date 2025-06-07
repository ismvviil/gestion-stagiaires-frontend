import { useCallback, useRef } from "react";

export const useTypingIndicator = (onTypingChange) => {
  const typingTimeout = useRef(null);
  const isTyping = useRef(false);

  const handleTyping = useCallback(() => {
    // Si pas encore en train de taper, commencer
    if (!isTyping.current) {
      isTyping.current = true;
      onTypingChange(true);
    }

    // Réinitialiser le timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Arrêter de taper après 1.5 secondes
    typingTimeout.current = setTimeout(() => {
      isTyping.current = false;
      onTypingChange(false);
    }, 1500);
  }, [onTypingChange]);

  const stopTyping = useCallback(() => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    if (isTyping.current) {
      isTyping.current = false;
      onTypingChange(false);
    }
  }, [onTypingChange]);

  return {
    handleTyping,
    stopTyping
  };
};