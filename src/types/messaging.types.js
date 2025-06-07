// Types pour les utilisateurs
export const UserType = {
  RECRUTEUR: "recruteur",
  RESPONSABLE_RH: "responsable_rh", 
  STAGIAIRE: "stagiaire"
};

// Types pour les messages
export const MessageType = {
  TEXTE: "texte",
  FICHIER: "fichier",
  IMAGE: "image"
};

// Types WebSocket
export const WebSocketMessageType = {
  CONNECTION_SUCCESS: "connection_success",
  NEW_MESSAGE: "new_message",
  MESSAGES_READ: "messages_read",
  TYPING_INDICATOR: "typing_indicator",
  USER_STATUS: "user_status",
  ERROR: "error",
  PONG: "pong"
};

// Structure d'un message
export const createMessage = ({
  id = null,
  contenu = "",
  date = new Date().toISOString(),
  lu = false,
  type_message = MessageType.TEXTE,
  fichier_url = null,
  emetteur_id = null,
  destinataire_id = null,
  conversation_id = null,
  emetteur_nom = "",
  emetteur_prenom = ""
}) => ({
  id,
  contenu,
  date,
  lu,
  type_message,
  fichier_url,
  emetteur_id,
  destinataire_id,
  conversation_id,
  emetteur_nom,
  emetteur_prenom
});

// Structure d'une conversation
export const createConversation = ({
  id = null,
  created_at = new Date().toISOString(),
  updated_at = new Date().toISOString(),
  est_active = true,
  participant1_id = null,
  participant2_id = null,
  dernier_message = null,
  messages_non_lus = 0,
  autre_participant = null
}) => ({
  id,
  created_at,
  updated_at,
  est_active,
  participant1_id,
  participant2_id,
  dernier_message,
  messages_non_lus,
  autre_participant
});

// Structure pour les participants
export const createParticipant = ({
  id = null,
  nom = "",
  prenom = "",
  email = "",
  type = "",
  entreprise_id = null
}) => ({
  id,
  nom,
  prenom,
  email,
  type,
  entreprise_id
});

// Messages WebSocket entrants (du client vers le serveur)
export const createWebSocketOutgoingMessage = (type, data = {}) => ({
  type,
  ...data
});

// Messages WebSocket sortants (du serveur vers le client)
export const WebSocketIncomingMessageSchema = {
  CONNECTION_SUCCESS: (data) => ({
    type: WebSocketMessageType.CONNECTION_SUCCESS,
    message: data.message,
    user_id: data.user_id,
    online_users: data.online_users
  }),
  NEW_MESSAGE: (data) => ({
    type: WebSocketMessageType.NEW_MESSAGE,
    message: createMessage(data.message)
  }),
  MESSAGES_READ: (data) => ({
    type: WebSocketMessageType.MESSAGES_READ,
    conversation_id: data.conversation_id,
    reader_id: data.reader_id
  }),
  TYPING_INDICATOR: (data) => ({
    type: WebSocketMessageType.TYPING_INDICATOR,
    conversation_id: data.conversation_id,
    user_id: data.user_id,
    user_name: data.user_name,
    is_typing: data.is_typing
  }),
  USER_STATUS: (data) => ({
    type: WebSocketMessageType.USER_STATUS,
    user_id: data.user_id,
    status: data.status, // "online" | "offline"
    timestamp: data.timestamp
  }),
  ERROR: (data) => ({
    type: WebSocketMessageType.ERROR,
    message: data.message
  }),
  PONG: (data) => ({
    type: WebSocketMessageType.PONG,
    timestamp: data.timestamp
  })
};

// Helpers utilitaires
export const formatMessageDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins}min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit',
    year: diffDays > 365 ? '2-digit' : undefined
  });
};

export const getParticipantName = (participant) => {
  if (!participant) return "Utilisateur inconnu";
  return `${participant.prenom} ${participant.nom}`;
};

export const isMyMessage = (message, currentUserId) => {
  return message.emetteur_id === currentUserId;
};