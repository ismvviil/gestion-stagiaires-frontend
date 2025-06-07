// import { useState, useEffect, useCallback, useRef } from "react";
// import { webSocketService } from "../services/websocket.service";
// import { useAuth } from "../context/AuthContext";

// export const useWebSocket = () => {
//   const { currentUser } = useAuth();
//   const [connectionState, setConnectionState] = useState("disconnected");
//   const [error, setError] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const isInitialized = useRef(false);

//   // Connexion automatique quand l'utilisateur est connecté
//   useEffect(() => {
//     if (currentUser && !isInitialized.current) {
//       const token = localStorage.getItem("token");
//       if (token) {
//         connectWebSocket(token);
//         isInitialized.current = true;
//       }
//     }

//     // Déconnexion quand l'utilisateur se déconnecte
//     if (!currentUser && isInitialized.current) {
//       webSocketService.disconnect();
//       isInitialized.current = false;
//     }

//     return () => {
//       if (isInitialized.current) {
//         webSocketService.disconnect();
//       }
//     };
//   }, [currentUser]);

//   const connectWebSocket = useCallback(async (token) => {
//     try {
//       setConnectionState("connecting");
//       setError(null);

//       await webSocketService.connect(token);

//       // Écouter les événements de connexion
//       webSocketService.on("connected", () => {
//         setConnectionState("connected");
//         setError(null);
//       });

//       webSocketService.on("disconnected", () => {
//         setConnectionState("disconnected");
//       });

//       webSocketService.on("connectionSuccess", (data) => {
//         setOnlineUsers(data.online_users || []);
//       });

//       webSocketService.on("error", (data) => {
//         setError(data.message);
//       });

//       webSocketService.on("userStatus", (data) => {
//         setOnlineUsers(prev => {
//           if (data.status === "online") {
//             return [...prev.filter(id => id !== data.user_id), data.user_id];
//           } else {
//             return prev.filter(id => id !== data.user_id);
//           }
//         });
//       });

//     } catch (error) {
//       setConnectionState("disconnected");
//       setError(error.message);
//       console.error("Erreur connexion WebSocket:", error);
//     }
//   }, []);

//   return {
//     connectionState,
//     error,
//     onlineUsers,
//     isConnected: connectionState === "connected",
//     isConnecting: connectionState === "connecting",
//     reconnect: () => {
//       const token = localStorage.getItem("token");
//       if (token) connectWebSocket(token);
//     }
//   };
// };

import { useState, useEffect, useRef, useCallback } from "react";
import { webSocketService } from "../services/websocket.service";
import { useAuth } from "../context/AuthContext";

// 🔥 SINGLETON : Une seule instance partagée
let globalConnectionState = "disconnected";
let globalError = null;
let globalOnlineUsers = [];
let globalIsInitialized = false;
let globalListenersSetup = false;

// 🔥 Callbacks partagés pour tous les composants
let stateUpdateCallbacks = [];

const notifyStateUpdate = (newState) => {
  stateUpdateCallbacks.forEach(callback => {
    try {
      callback(newState);
    } catch (error) {
      console.error('Erreur callback WebSocket:', error);
    }
  });
};

export const useWebSocket = () => {
  const { currentUser } = useAuth();
  const [connectionState, setConnectionState] = useState(globalConnectionState);
  const [error, setError] = useState(globalError);
  const [onlineUsers, setOnlineUsers] = useState(globalOnlineUsers);
  const callbackRef = useRef(null);

  // 🔥 Enregistrer le callback pour les mises à jour
  useEffect(() => {
    const updateState = (newState) => {
      setConnectionState(newState.connectionState || globalConnectionState);
      setError(newState.error || globalError);
      setOnlineUsers(newState.onlineUsers || globalOnlineUsers);
    };
    
    callbackRef.current = updateState;
    stateUpdateCallbacks.push(updateState);
    
    return () => {
      const index = stateUpdateCallbacks.indexOf(updateState);
      if (index > -1) {
        stateUpdateCallbacks.splice(index, 1);
      }
    };
  }, []);

  // 🔥 Configuration des listeners (une seule fois)
  const setupListeners = useCallback(() => {
    if (globalListenersSetup) return;
    
    webSocketService.on("connected", () => {
      globalConnectionState = "connected";
      globalError = null;
      notifyStateUpdate({ connectionState: "connected", error: null });
    });

    webSocketService.on("disconnected", () => {
      globalConnectionState = "disconnected";
      notifyStateUpdate({ connectionState: "disconnected" });
    });

    webSocketService.on("connectionSuccess", (data) => {
      globalOnlineUsers = data.online_users || [];
      notifyStateUpdate({ onlineUsers: globalOnlineUsers });
    });

    webSocketService.on("error", (data) => {
      globalError = data.message;
      notifyStateUpdate({ error: data.message });
    });

    webSocketService.on("userStatus", (data) => {
      if (data.status === "online") {
        globalOnlineUsers = [...globalOnlineUsers.filter(id => id !== data.user_id), data.user_id];
      } else {
        globalOnlineUsers = globalOnlineUsers.filter(id => id !== data.user_id);
      }
      notifyStateUpdate({ onlineUsers: globalOnlineUsers });
    });
    
    globalListenersSetup = true;
    console.log('🔧 Listeners WebSocket configurés (singleton)');
  }, []);

  const connectWebSocket = useCallback(async (token) => {
    if (globalIsInitialized) {
      console.log('🔌 WebSocket déjà initialisé, ignorer');
      return;
    }
    
    try {
      globalConnectionState = "connecting";
      notifyStateUpdate({ connectionState: "connecting" });
      
      setupListeners();
      await webSocketService.connect(token);
      globalIsInitialized = true;
      
      console.log('🔌 WebSocket connecté (singleton)');
      
    } catch (error) {
      globalConnectionState = "disconnected";
      globalError = error.message;
      notifyStateUpdate({ 
        connectionState: "disconnected", 
        error: error.message 
      });
      console.error("Erreur connexion WebSocket:", error);
    }
  }, [setupListeners]);

  // 🔥 Initialisation UNIQUE
  useEffect(() => {
    if (currentUser && !globalIsInitialized) {
      const token = localStorage.getItem("token");
      if (token) {
        console.log('🔌 Initialisation WebSocket SINGLETON pour:', currentUser.email);
        connectWebSocket(token);
      }
    }
  }, [currentUser, connectWebSocket]);

  // 🔥 Déconnexion seulement si l'utilisateur se déconnecte
  useEffect(() => {
    if (!currentUser && globalIsInitialized) {
      console.log('🔌 Déconnexion WebSocket - utilisateur déconnecté');
      webSocketService.disconnect();
      globalIsInitialized = false;
      globalListenersSetup = false;
      globalConnectionState = "disconnected";
      globalError = null;
      globalOnlineUsers = [];
      notifyStateUpdate({ 
        connectionState: "disconnected", 
        error: null, 
        onlineUsers: [] 
      });
    }
  }, [currentUser]);

  const reconnect = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('🔄 Reconnexion WebSocket singleton');
      globalIsInitialized = false; // Permettre la reconnexion
      connectWebSocket(token);
    }
  }, [connectWebSocket]);

  return {
    connectionState,
    error,
    onlineUsers,
    isConnected: connectionState === "connected",
    isConnecting: connectionState === "connecting",
    reconnect
  };
};