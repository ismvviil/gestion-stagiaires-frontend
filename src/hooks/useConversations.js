// import { useState, useEffect, useCallback } from "react";
// import { conversationService } from "../services/api.service";
// import { webSocketService } from "../services/websocket.service";
// import { useAuth } from "../context/AuthContext";

// export const useConversations = () => {
//   const { currentUser } = useAuth();
//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Charger les conversations au démarrage
//   useEffect(() => {
//     if (currentUser) {
//       loadConversations();
//     }
//   }, [currentUser]);

//   // Écouter les nouveaux messages via WebSocket
//   useEffect(() => {
//     const handleNewMessage = (data) => {
//       const message = data.message;
      
//       setConversations(prev => {
//         return prev.map(conv => {
//           if (conv.id === message.conversation_id) {
//             return {
//               ...conv,
//               dernier_message: message,
//               messages_non_lus: message.emetteur_id !== currentUser?.id 
//                 ? conv.messages_non_lus + 1 
//                 : conv.messages_non_lus,
//               updated_at: message.date
//             };
//           }
//           return conv;
//         }).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//       });

//       // Mettre à jour le compteur global si ce n'est pas mon message
//       if (message.emetteur_id !== currentUser?.id) {
//         setUnreadCount(prev => prev + 1);
//       }
//     };

//     const handleMessagesRead = (data) => {
//       if (data.reader_id !== currentUser?.id) {
//         // Quelqu'un d'autre a lu mes messages
//         setConversations(prev => 
//           prev.map(conv => 
//             conv.id === data.conversation_id 
//               ? { ...conv, messages_non_lus: 0 }
//               : conv
//           )
//         );
//       }
//     };

//     webSocketService.on("newMessage", handleNewMessage);
//     webSocketService.on("messagesRead", handleMessagesRead);

//     return () => {
//       webSocketService.off("newMessage", handleNewMessage);
//       webSocketService.off("messagesRead", handleMessagesRead);
//     };
//   }, [currentUser]);

//   const loadConversations = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const data = await conversationService.getMyConversations();
//       setConversations(data);
      
//       // Calculer le nombre total de messages non lus
//       const totalUnread = data.reduce((sum, conv) => sum + conv.messages_non_lus, 0);
//       setUnreadCount(totalUnread);
      
//     } catch (err) {
//       setError(err.message);
//       console.error("Erreur chargement conversations:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createConversation = useCallback(async (participantId) => {
//     try {
//       const newConv = await conversationService.createOrGetConversation(participantId);
      
//       // Ajouter ou mettre à jour dans la liste
//       setConversations(prev => {
//         const exists = prev.find(conv => conv.id === newConv.id);
//         if (exists) {
//           return prev; // Conversation existe déjà
//         }
//         return [newConv, ...prev];
//       });
      
//       return newConv;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   }, []);

//   const markAsRead = useCallback(async (conversationId) => {
//     try {
//       await conversationService.markConversationAsRead(conversationId);
      
//       // Mettre à jour localement
//       setConversations(prev => {
//         const updated = prev.map(conv => {
//           if (conv.id === conversationId) {
//             setUnreadCount(prevCount => prevCount - conv.messages_non_lus);
//             return { ...conv, messages_non_lus: 0 };
//           }
//           return conv;
//         });
//         return updated;
//       });

//       // Notifier via WebSocket
//       webSocketService.markAsRead(conversationId);
      
//     } catch (err) {
//       console.error("Erreur marquage comme lu:", err);
//     }
//   }, []);

//   return {
//     conversations,
//     loading,
//     error,
//     unreadCount,
//     loadConversations,
//     createConversation,
//     markAsRead,
//     refresh: loadConversations
//   };
// };
import { useState, useEffect, useCallback } from "react";
import { conversationService } from "../services/api.service";
import { webSocketService } from "../services/websocket.service";
import { useAuth } from "../context/AuthContext";

export const useConversations = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]); // 🔥 Tableau vide par défaut
  const [loading, setLoading] = useState(false); // 🔥 Changé à false initialement
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Charger les conversations au démarrage
  useEffect(() => {
    if (currentUser) {
      loadConversations();
    } else {
      // 🔥 Reset si pas d'utilisateur
      setConversations([]);
      setUnreadCount(0);
      setLoading(false);
    }
  }, [currentUser]);

  // Écouter les nouveaux messages via WebSocket
  useEffect(() => {
    if (!currentUser) return; // 🔥 Pas d'écoute si pas d'utilisateur

    const handleNewMessage = (data) => {
      const message = data.message;
      
      setConversations(prev => {
        return prev.map(conv => {
          if (conv.id === message.conversation_id) {
            return {
              ...conv,
              dernier_message: message,
              messages_non_lus: message.emetteur_id !== currentUser?.id 
                ? conv.messages_non_lus + 1 
                : conv.messages_non_lus,
              updated_at: message.date
            };
          }
          return conv;
        }).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      });

      // Mettre à jour le compteur global si ce n'est pas mon message
      if (message.emetteur_id !== currentUser?.id) {
        setUnreadCount(prev => prev + 1);
      }
    };

    const handleMessagesRead = (data) => {
      if (data.reader_id !== currentUser?.id) {
        // Quelqu'un d'autre a lu mes messages
        setConversations(prev => 
          prev.map(conv => 
            conv.id === data.conversation_id 
              ? { ...conv, messages_non_lus: 0 }
              : conv
          )
        );
      }
    };

    webSocketService.on("newMessage", handleNewMessage);
    webSocketService.on("messagesRead", handleMessagesRead);

    return () => {
      webSocketService.off("newMessage", handleNewMessage);
      webSocketService.off("messagesRead", handleMessagesRead);
    };
  }, [currentUser]);

  const loadConversations = useCallback(async () => {
    if (!currentUser) return; // 🔥 Protection

    try {
      setLoading(true);
      setError(null);
      
      const data = await conversationService.getMyConversations();
      setConversations(Array.isArray(data) ? data : []); // 🔥 Assurer que c'est un tableau
      
      // Calculer le nombre total de messages non lus
      const totalUnread = data.reduce((sum, conv) => sum + (conv.messages_non_lus || 0), 0);
      setUnreadCount(totalUnread);
      
    } catch (err) {
      setError(err.message);
      setConversations([]); // 🔥 Tableau vide en cas d'erreur
      console.error("Erreur chargement conversations:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const createConversation = useCallback(async (participantId) => {
    if (!currentUser) return null; // 🔥 Protection

    try {
      const newConv = await conversationService.createOrGetConversation(participantId);
      
      // Ajouter ou mettre à jour dans la liste
      setConversations(prev => {
        const exists = prev.find(conv => conv.id === newConv.id);
        if (exists) {
          return prev; // Conversation existe déjà
        }
        return [newConv, ...prev];
      });
      
      return newConv;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [currentUser]);

  const markAsRead = useCallback(async (conversationId) => {
    if (!currentUser) return; // 🔥 Protection

    try {
      await conversationService.markConversationAsRead(conversationId);
      
      // Mettre à jour localement
      setConversations(prev => {
        const updated = prev.map(conv => {
          if (conv.id === conversationId) {
            setUnreadCount(prevCount => Math.max(0, prevCount - (conv.messages_non_lus || 0)));
            return { ...conv, messages_non_lus: 0 };
          }
          return conv;
        });
        return updated;
      });

      // Notifier via WebSocket
      webSocketService.markAsRead(conversationId);
      
    } catch (err) {
      console.error("Erreur marquage comme lu:", err);
    }
  }, [currentUser]);

  return {
    conversations: Array.isArray(conversations) ? conversations : [], // 🔥 Protection finale
    loading,
    error,
    unreadCount,
    loadConversations,
    createConversation,
    markAsRead,
    refresh: loadConversations
  };
};