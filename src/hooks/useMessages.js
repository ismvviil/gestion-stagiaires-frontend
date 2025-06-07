import { useState, useEffect, useCallback, useRef } from "react";
import { messageService } from "../services/api.service";
import { webSocketService } from "../services/websocket.service";
import { useAuth } from "../context/AuthContext";

export const useMessages = (conversationId) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [typingUsers, setTypingUsers] = useState([]);
  
  const skip = useRef(0);
  const limit = useRef(50);
  const typingTimeouts = useRef(new Map());

  // Charger les messages quand la conversation change
  useEffect(() => {
    if (conversationId) {
      skip.current = 0;
      setMessages([]);
      setHasMore(true);
      loadMessages(true);
    }
  }, [conversationId]);

  // Écouter les nouveaux messages via WebSocket
  useEffect(() => {
    const handleNewMessage = (data) => {
      const message = data.message;
      
      if (message.conversation_id === conversationId) {
        setMessages(prev => {
          // Éviter les doublons
          const exists = prev.find(msg => msg.id === message.id);
          if (exists) return prev;
          
          return [message, ...prev].sort((a, b) => new Date(a.date) - new Date(b.date));
        });
      }
    };

    const handleTypingIndicator = (data) => {
      if (data.conversation_id === conversationId && data.user_id !== currentUser?.id) {
        setTypingUsers(prev => {
          // Nettoyer le timeout précédent
          if (typingTimeouts.current.has(data.user_id)) {
            clearTimeout(typingTimeouts.current.get(data.user_id));
          }

          if (data.is_typing) {
            // Ajouter l'utilisateur qui tape
            const newTypingUsers = prev.filter(user => user.user_id !== data.user_id);
            newTypingUsers.push({
              user_id: data.user_id,
              user_name: data.user_name
            });

            // Supprimer automatiquement après 3 secondes
            const timeout = setTimeout(() => {
              setTypingUsers(current => 
                current.filter(user => user.user_id !== data.user_id)
              );
              typingTimeouts.current.delete(data.user_id);
            }, 3000);

            typingTimeouts.current.set(data.user_id, timeout);
            return newTypingUsers;
          } else {
            // Supprimer l'utilisateur qui ne tape plus
            return prev.filter(user => user.user_id !== data.user_id);
          }
        });
      }
    };

    webSocketService.on("newMessage", handleNewMessage);
    webSocketService.on("typingIndicator", handleTypingIndicator);

    return () => {
      webSocketService.off("newMessage", handleNewMessage);
      webSocketService.off("typingIndicator", handleTypingIndicator);
      
      // Nettoyer les timeouts
      typingTimeouts.current.forEach(timeout => clearTimeout(timeout));
      typingTimeouts.current.clear();
    };
  }, [conversationId, currentUser]);

  const loadMessages = useCallback(async (reset = false) => {
    if (!conversationId || loading) return;

    try {
      setLoading(true);
      setError(null);

      const currentSkip = reset ? 0 : skip.current;
      const data = await messageService.getConversationMessages(
        conversationId, 
        currentSkip, 
        limit.current
      );

      if (reset) {
        setMessages(data.messages.reverse()); // Ordre chronologique pour l'affichage
        skip.current = data.messages.length;
      } else {
        setMessages(prev => [...data.messages.reverse(), ...prev]);
        skip.current += data.messages.length;
      }

      setHasMore(data.hasMore);

    } catch (err) {
      setError(err.message);
      console.error("Erreur chargement messages:", err);
    } finally {
      setLoading(false);
    }
  }, [conversationId, loading]);

  const sendMessage = useCallback(async (contenu, typeMessage = "texte") => {
      console.log('🚀 Envoi message:', contenu); // Debug pour voir si appelé 2 fois

    if (!conversationId || !contenu.trim() || sendingMessage) return;

    try {
      setSendingMessage(true);
      setError(null);

      // Envoyer via WebSocket (temps réel)
      webSocketService.sendMessage(conversationId, contenu.trim(), typeMessage);

      // Message temporaire optimiste
    //   const tempMessage = {
    //     id: `temp-${Date.now()}`,
    //     contenu: contenu.trim(),
    //     date: new Date().toISOString(),
    //     emetteur_id: currentUser.id,
    //     conversation_id: conversationId,
    //     emetteur_nom: currentUser.nom,
    //     emetteur_prenom: currentUser.prenom,
    //     lu: false,
    //     type_message: typeMessage,
    //     isTemporary: true
    //   };

    //   setMessages(prev => [...prev, tempMessage]);

    } catch (err) {
      setError(err.message);
      console.error("Erreur envoi message:", err);
    } finally {
      setSendingMessage(false);
    }
  }, [conversationId, currentUser, sendingMessage]);

// const sendMessage = useCallback(async (contenu, typeMessage = "texte") => {
//   console.log('🚀 Envoi message:', contenu);
  
//   if (!conversationId || !contenu.trim() || sendingMessage) return;
  
//   // ✅ Créer un ID unique pour tracer ce message
//   const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
//   try {
//     setSendingMessage(true);
//     setError(null);
    
//     // ✅ Message temporaire optimiste (affichage immédiat)
//     const tempMessage = {
//       id: tempId,
//       contenu: contenu.trim(),
//       date: new Date().toISOString(),
//       emetteur_id: currentUser.id,
//       conversation_id: conversationId,
//       emetteur_nom: currentUser.nom,
//       emetteur_prenom: currentUser.prenom,
//       lu: false,
//       type_message: typeMessage,
//       isTemporary: true,
//       status: 'sending' // ✅ Statut pour l'UI
//     };
    
//     // ✅ Ajouter immédiatement à l'interface
//     setMessages(prev => [...prev, tempMessage]);
    
//     // ✅ Envoyer via WebSocket avec l'ID temporaire
//     webSocketService.sendMessage(conversationId, contenu.trim(), typeMessage, tempId);
    
//   } catch (err) {
//     setError(err.message);
//     console.error("Erreur envoi message:", err);
    
//     // ✅ Retirer le message temporaire en cas d'erreur
//     setMessages(prev => prev.filter(msg => msg.id !== tempId));
//   } finally {
//     setSendingMessage(false);
//   }
// }, [conversationId, currentUser, sendingMessage]);

  const sendTypingIndicator = useCallback((isTyping = true) => {
    if (conversationId) {
      webSocketService.sendTypingIndicator(conversationId, isTyping);
    }
  }, [conversationId]);

  const loadMoreMessages = useCallback(() => {
    if (hasMore && !loading) {
      loadMessages(false);
    }
  }, [hasMore, loading, loadMessages]);

  return {
    messages,
    loading,
    sendingMessage,
    error,
    hasMore,
    typingUsers,
    sendMessage,
    sendTypingIndicator,
    loadMoreMessages,
    refresh: () => loadMessages(true)
  };
};
