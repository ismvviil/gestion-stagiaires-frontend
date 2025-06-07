import React, { useState, useEffect } from "react";
import { userService } from "../../services/api.service";
import { getParticipantName } from "../../types/messaging.types";
import styles from "./NewConversationModal.module.css";

const NewConversationModal = ({ onCreateConversation, onClose, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Recherche d'utilisateurs
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await userService.searchUsers(searchQuery);
        // Filtrer l'utilisateur actuel
        const filteredResults = results.filter(user => user.id !== currentUser.id);
        setSearchResults(filteredResults);
      } catch (err) {
        setError(err.message);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentUser.id]);

  const handleCreateConversation = async () => {
    if (!selectedUser) return;

    try {
      await onCreateConversation(selectedUser.id);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && selectedUser) {
      handleCreateConversation();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.modalHeader}>
          <h3>Nouvelle conversation</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            title="Fermer (Échap)"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />

            {loading && (
              <div className={styles.searchLoading}>
                <div className={styles.loadingSpinner}></div>
                <span>Recherche...</span>
              </div>
            )}

            {error && (
              <div className={styles.searchError}>
                ❌ {error}
              </div>
            )}
          </div>

          <div className={styles.resultsSection}>
            {searchResults.length > 0 ? (
              <div className={styles.userList}>
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className={`${styles.userItem} ${
                      selectedUser?.id === user.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className={styles.userAvatar}>
                      {user.prenom?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>
                        {getParticipantName(user)}
                      </div>
                      <div className={styles.userDetails}>
                        {user.email} • {user.type?.replace("_", " ")}
                      </div>
                      {user.entreprise_id && (
                        <div className={styles.userCompany}>
                          Entreprise ID: {user.entreprise_id}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.length >= 2 && !loading ? (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <p>Aucun utilisateur trouvé</p>
                <span>Essayez avec d'autres mots-clés</span>
              </div>
            ) : searchQuery.length < 2 ? (
              <div className={styles.searchPrompt}>
                <div className={styles.searchPromptIcon}>👥</div>
                <p>Tapez au moins 2 caractères pour rechercher</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className={`${styles.createButton} ${
              selectedUser ? styles.createButtonActive : ""
            }`}
            onClick={handleCreateConversation}
            disabled={!selectedUser}
          >
            Démarrer la conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewConversationModal;