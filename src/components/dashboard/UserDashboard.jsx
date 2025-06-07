import React from "react";
import { useAuth } from "../../context/AuthContext";
import RecruteurDashboard from "./RecruteurDashboard";
import RHDashboard from "./RHDashboard";
import StagiaireDashboard from "./StagiaireDashboard";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Chargement de votre espace...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={styles.errorContainer}>
        <h2>Accès non autorisé</h2>
        <p>Veuillez vous connecter pour accéder à votre tableau de bord.</p>
      </div>
    );
  }

  // Redirection admin vers dashboard séparé
  if (currentUser.type === "admin") {
    window.location.href = "/admin/dashboard";
    return null;
  }

  // Rendu conditionnel selon le type d'utilisateur
  switch (currentUser.type) {
    case "recruteur":
      return <RecruteurDashboard />;
    case "responsable_rh":
      return <RHDashboard />;
    case "stagiaire":
      return <StagiaireDashboard />;
    default:
      return (
        <div className={styles.defaultDashboard}>
          <h2>Tableau de bord</h2>
          <p>Bienvenue, {currentUser.prenom} !</p>
          <p>Type d'utilisateur : {currentUser.type}</p>
        </div>
      );
  }
};

export default UserDashboard;
