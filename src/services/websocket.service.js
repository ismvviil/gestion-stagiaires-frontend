// src/services/websocket.service.js

import {
  WebSocketMessageType,
  createWebSocketOutgoingMessage,
  WebSocketIncomingMessageSchema,
} from "../types/messaging.types";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // 1 seconde
    this.heartbeatInterval = null;
    this.listeners = new Map(); // Pour les événements personnalisés
    this.messageQueue = []; // Messages en attente si déconnecté

    // Configuration
    this.config = {
      heartbeatIntervalMs: 30000, // 30 secondes
      reconnectDelayMs: 1000,
      maxReconnectAttempts: 5,
    };
  }

  // ====================================
  // CONNEXION ET DÉCONNEXION
  // ====================================

  async connect(token) {
    if (this.isConnected || this.isConnecting) {
      console.warn("WebSocket déjà connecté ou en cours de connexion");
      return;
    }

    if (!token) {
      throw new Error("Token JWT requis pour la connexion WebSocket");
    }

    this.isConnecting = true;

    try {
      // Construire l'URL WebSocket avec le token
      const wsUrl = this._buildWebSocketUrl(token);

      console.log("🔌 Connexion WebSocket...");
      this.socket = new WebSocket(wsUrl);

      // Configuration des événements WebSocket
      this.socket.onopen = this._handleOpen.bind(this);
      this.socket.onmessage = this._handleMessage.bind(this);
      this.socket.onclose = this._handleClose.bind(this);
      this.socket.onerror = this._handleError.bind(this);

      // Attendre que la connexion soit établie
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Timeout de connexion WebSocket"));
        }, 10000); // 10 secondes

        this.socket.onopen = (event) => {
          clearTimeout(timeout);
          this._handleOpen(event);
          resolve();
        };

        this.socket.onerror = (error) => {
          clearTimeout(timeout);
          this._handleError(error);
          reject(error);
        };
      });
    } catch (error) {
      this.isConnecting = false;
      console.error("❌ Erreur connexion WebSocket:", error);
      throw error;
    }
  }

  disconnect() {
    console.log("🔌 Déconnexion WebSocket...");

    this.isConnected = false;
    this.isConnecting = false;

    // Arrêter le heartbeat
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    // Fermer la connexion
    if (this.socket) {
      this.socket.close(1000, "Déconnexion manuelle");
      this.socket = null;
    }

    // Nettoyer les listeners
    this.listeners.clear();
    this.messageQueue = [];
  }

  // ====================================
  // ENVOI DE MESSAGES
  // ====================================

  sendMessage(conversationId, contenu, typeMessage = "texte") {
    const message = createWebSocketOutgoingMessage("send_message", {
      conversation_id: conversationId,
      contenu: contenu,
      type_message: typeMessage,
    });

    this._sendWebSocketMessage(message);
  }

  markAsRead(conversationId) {
    const message = createWebSocketOutgoingMessage("mark_as_read", {
      conversation_id: conversationId,
    });

    this._sendWebSocketMessage(message);
  }

  sendTypingIndicator(conversationId, isTyping = true) {
    const message = createWebSocketOutgoingMessage("typing", {
      conversation_id: conversationId,
      is_typing: isTyping,
    });

    this._sendWebSocketMessage(message);
  }

  ping() {
    const message = createWebSocketOutgoingMessage("ping", {
      timestamp: new Date().toISOString(),
    });

    this._sendWebSocketMessage(message);
  }

  // ====================================
  // GESTION DES ÉVÉNEMENTS
  // ====================================

  // Écouter les événements personnalisés
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  // Supprimer un listener
  off(eventType, callback) {
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Émettre un événement vers les listeners
  _emit(eventType, data) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Erreur dans le listener ${eventType}:`, error);
        }
      });
    }
  }

  // ====================================
  // HANDLERS WEBSOCKET INTERNES
  // ====================================

  _handleOpen(event) {
    console.log("✅ WebSocket connecté");
    this.isConnected = true;
    this.isConnecting = false;
    this.reconnectAttempts = 0;

    // Démarrer le heartbeat
    this._startHeartbeat();

    // Envoyer les messages en attente
    this._flushMessageQueue();

    // Émettre l'événement de connexion
    this._emit("connected", { event });
  }

 _handleMessage(event) {
  try {
    const data = JSON.parse(event.data);
    
    // 🔥 Filter out development/HMR messages AVANT le log
    if (
      data.type === "overlay" ||
      data.type === "hash" ||
      data.type === "warnings"
    ) {
      return; // Ignore these messages silently
    }
    
    // ✅ UN SEUL log après le filtrage
    console.log("📨 Message WebSocket reçu:", data);
    
    // Traiter selon le type de message
    switch (data.type) {
      case WebSocketMessageType.CONNECTION_SUCCESS:
        this._emit(
          "connectionSuccess",
          WebSocketIncomingMessageSchema.CONNECTION_SUCCESS(data)
        );
        break;
        
      case WebSocketMessageType.NEW_MESSAGE:
        this._emit(
          "newMessage",
          WebSocketIncomingMessageSchema.NEW_MESSAGE(data)
        );
        break;
        
      case WebSocketMessageType.MESSAGES_READ:
        this._emit(
          "messagesRead",
          WebSocketIncomingMessageSchema.MESSAGES_READ(data)
        );
        break;
        
      case WebSocketMessageType.TYPING_INDICATOR:
        this._emit(
          "typingIndicator",
          WebSocketIncomingMessageSchema.TYPING_INDICATOR(data)
        );
        break;
        
      case WebSocketMessageType.USER_STATUS:
        this._emit(
          "userStatus",
          WebSocketIncomingMessageSchema.USER_STATUS(data)
        );
        break;
        
      case WebSocketMessageType.ERROR:
        this._emit("error", WebSocketIncomingMessageSchema.ERROR(data));
        break;
        
      case WebSocketMessageType.PONG:
        this._emit("pong", WebSocketIncomingMessageSchema.PONG(data));
        break;
        
      default:
        console.warn("Type de message WebSocket inconnu:", data.type);
    }
  } catch (error) {
    console.error("Erreur parsing message WebSocket:", error);
  }
}
  _handleClose(event) {
    console.log("🔌 WebSocket fermé:", event.code, event.reason);
    this.isConnected = false;
    this.isConnecting = false;

    // Arrêter le heartbeat
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    // Émettre l'événement de déconnexion
    this._emit("disconnected", { code: event.code, reason: event.reason });

    // Tentative de reconnexion automatique
    if (event.code !== 1000) {
      // Pas une fermeture normale
      this._attemptReconnect();
    }
  }

  _handleError(error) {
    console.error("❌ Erreur WebSocket:", error);
    this._emit("error", { message: "Erreur de connexion WebSocket", error });
  }

  // ====================================
  // HELPERS INTERNES
  // ====================================

  _buildWebSocketUrl(token) {
    // 🔥 Détection automatique du protocole et host
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

    // 🔥 Force l'utilisation du backend, pas du dev server React
    let host;
    if (process.env.NODE_ENV === "development") {
      // En développement, forcer le backend
      host = process.env.REACT_APP_WS_URL || "localhost:8000";
    } else if (process.env.REACT_APP_WS_URL) {
      host = process.env.REACT_APP_WS_URL;
    } else if (process.env.REACT_APP_API_URL) {
      const apiUrl = process.env.REACT_APP_API_URL.replace(
        /^https?:\/\//,
        ""
      ).replace(/\/.*$/, "");
      host = apiUrl;
    } else {
      // ❌ Éviter d'utiliser window.location.host en développement
      host = "localhost:8000"; // Fallback vers votre backend
    }

    const wsUrl = `${protocol}//${host}/ws?token=${encodeURIComponent(token)}`;
    console.log(`🔌 Connexion WebSocket vers: ${wsUrl}`); // Check this URL!
    return wsUrl;
  }

  _sendWebSocketMessage(message) {
    if (!this.isConnected) {
      console.warn("WebSocket non connecté, message mis en queue:", message);
      this.messageQueue.push(message);
      return;
    }

    try {
      this.socket.send(JSON.stringify(message));
      console.log("📤 Message WebSocket envoyé:", message);
    } catch (error) {
      console.error("Erreur envoi message WebSocket:", error);
      // Remettre en queue en cas d'erreur
      this.messageQueue.push(message);
    }
  }
  _flushMessageQueue() {
    while (this.messageQueue.length > 0 && this.isConnected) {
      const message = this.messageQueue.shift();
      this._sendWebSocketMessage(message);
    }
  }

  _startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.ping();
      }
    }, this.config.heartbeatIntervalMs);
  }

  _attemptReconnect() {
    // ❌ Ne pas reconnecter si on vient de se connecter avec succès
    if (this.isConnected) {
      return;
    }
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("❌ Nombre maximum de tentatives de reconnexion atteint");
      this._emit("reconnectFailed", { attempts: this.reconnectAttempts });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Backoff exponentiel

    console.log(
      `🔄 Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts} dans ${delay}ms`
    );

    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        this.connect(token).catch((error) => {
          console.error("Échec de la reconnexion:", error);
        });
      }
    }, delay);
  }

  // ====================================
  // GETTERS
  // ====================================

  get connectionState() {
    if (this.isConnected) return "connected";
    if (this.isConnecting) return "connecting";
    return "disconnected";
  }

  get queuedMessagesCount() {
    return this.messageQueue.length;
  }
}

// Instance singleton
export const webSocketService = new WebSocketService();

// Export de la classe pour les tests
export default WebSocketService;
