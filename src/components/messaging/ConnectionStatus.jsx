import React from "react";
import styles from "./ConnectionStatus.module.css";

const ConnectionStatus = ({ connectionState, error, onRetry }) => {
  if (connectionState === "connected") {
    return null; // Pas d'affichage si tout va bien
  }

  const getStatusConfig = () => {
    switch (connectionState) {
      case "connecting":
        return {
          icon: "🔄",
          message: "Connexion en cours...",
          className: styles.connecting,
          showRetry: false
        };
      case "disconnected":
        return {
          icon: "⚠️",
          message: error || "Connexion interrompue",
          className: styles.disconnected,
          showRetry: true
        };
      default:
        return {
          icon: "❌",
          message: "Erreur de connexion",
          className: styles.error,
          showRetry: true
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div >
      {/* <div className={styles.statusContent}>
        <span className={styles.statusIcon}>{config.icon}</span>
        <span className={styles.statusMessage}>{config.message}</span>
        {config.showRetry && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
            title="Réessayer la connexion"
          >
            🔄 Réessayer
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ConnectionStatus;