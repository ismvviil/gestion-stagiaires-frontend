// import React, { useState, useEffect } from 'react';
// import { HiSearch, HiFilter, HiEye, HiUserAdd, HiUserRemove } from 'react-icons/hi';
// import AdminService from '../../services/adminService';
// import styles from './AdminUsers.module.css';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     type: '',
//     actif: null,
//     search: '',
//     skip: 0,
//     limit: 20
//   });
//   const [selectedUser, setSelectedUser] = useState(null);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const data = await AdminService.getUtilisateurs(filters);
//       setUsers(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, [filters]);

//   const handleToggleStatus = async (userId) => {
//     try {
//       await AdminService.toggleUserStatus(userId);
//       loadUsers(); // Recharger la liste
//     } catch (err) {
//       alert('Erreur lors du changement de statut: ' + err.message);
//     }
//   };

//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [field]: value,
//       skip: 0 // Reset pagination
//     }));
//   };

//   const getUserTypeLabel = (type) => {
//     const labels = {
//       'admin': 'Administrateur',
//       'responsable_rh': 'Responsable RH',
//       'recruteur': 'Recruteur',
//       'stagiaire': 'Stagiaire'
//     };
//     return labels[type] || type;
//   };

//   const getUserTypeBadge = (type) => {
//     const badges = {
//       'admin': styles.badgeAdmin,
//       'responsable_rh': styles.badgeRH,
//       'recruteur': styles.badgeRecruteur,
//       'stagiaire': styles.badgeStagiaire
//     };
//     return badges[type] || styles.badgeDefault;
//   };

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.loadingSpinner}></div>
//         <p>Chargement des utilisateurs...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.usersContainer}>
//       {/* Header */}
//       <div className={styles.header}>
//         <div>
//           <h1 className={styles.title}>Gestion des Utilisateurs</h1>
//           <p className={styles.subtitle}>
//             {users.length} utilisateur(s) trouvé(s)
//           </p>
//         </div>
//       </div>

//       {/* Filtres */}
//       <div className={styles.filtersContainer}>
//         <div className={styles.searchBox}>
//           <HiSearch className={styles.searchIcon} />
//           <input
//             type="text"
//             placeholder="Rechercher par nom, email..."
//             value={filters.search}
//             onChange={(e) => handleFilterChange('search', e.target.value)}
//             className={styles.searchInput}
//           />
//         </div>

//         <select
//           value={filters.type}
//           onChange={(e) => handleFilterChange('type', e.target.value)}
//           className={styles.filterSelect}
//         >
//           <option value="">Tous les types</option>
//           <option value="admin">Administrateurs</option>
//           <option value="responsable_rh">Responsables RH</option>
//           <option value="recruteur">Recruteurs</option>
//           <option value="stagiaire">Stagiaires</option>
//         </select>

//         <select
//           value={filters.actif === null ? '' : filters.actif.toString()}
//           onChange={(e) => handleFilterChange('actif', e.target.value === '' ? null : e.target.value === 'true')}
//           className={styles.filterSelect}
//         >
//           <option value="">Tous les statuts</option>
//           <option value="true">Actifs</option>
//           <option value="false">Inactifs</option>
//         </select>
//       </div>

//       {/* Liste des utilisateurs */}
//       <div className={styles.usersGrid}>
//         {users.map(user => (
//           <div key={user.id} className={styles.userCard}>
//             <div className={styles.userHeader}>
//               <div className={styles.userInfo}>
//                 <h3 className={styles.userName}>
//                   {user.prenom} {user.nom}
//                 </h3>
//                 <p className={styles.userEmail}>{user.email}</p>
//               </div>
//               <div className={`${styles.userBadge} ${getUserTypeBadge(user.type)}`}>
//                 {getUserTypeLabel(user.type)}
//               </div>
//             </div>

//             <div className={styles.userDetails}>
//               <div className={styles.userStat}>
//                 <span className={styles.statLabel}>Statut:</span>
//                 <span className={`${styles.statValue} ${user.actif ? styles.statusActive : styles.statusInactive}`}>
//                   {user.actif ? 'Actif' : 'Inactif'}
//                 </span>
//               </div>

//               <div className={styles.userStat}>
//                 <span className={styles.statLabel}>Inscription:</span>
//                 <span className={styles.statValue}>
//                   {new Date(user.created_at).toLocaleDateString('fr-FR')}
//                 </span>
//               </div>

//               {user.entreprise_nom && (
//                 <div className={styles.userStat}>
//                   <span className={styles.statLabel}>Entreprise:</span>
//                   <span className={styles.statValue}>{user.entreprise_nom}</span>
//                 </div>
//               )}

//               {user.nombre_candidatures !== undefined && (
//                 <div className={styles.userStat}>
//                   <span className={styles.statLabel}>Candidatures:</span>
//                   <span className={styles.statValue}>{user.nombre_candidatures}</span>
//                 </div>
//               )}

//               {user.nombre_offres !== undefined && (
//                 <div className={styles.userStat}>
//                   <span className={styles.statLabel}>Offres créées:</span>
//                   <span className={styles.statValue}>{user.nombre_offres}</span>
//                 </div>
//               )}
//             </div>

//             <div className={styles.userActions}>
//               <button
//                 onClick={() => setSelectedUser(user)}
//                 className={styles.btnView}
//               >
//                 <HiEye /> Voir détails
//               </button>
              
//               <button
//                 onClick={() => handleToggleStatus(user.id)}
//                 className={user.actif ? styles.btnDeactivate : styles.btnActivate}
//                 disabled={user.type === 'admin'}
//               >
//                 {user.actif ? <HiUserRemove /> : <HiUserAdd />}
//                 {user.actif ? 'Désactiver' : 'Activer'}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {users.length === 0 && !loading && (
//         <div className={styles.emptyState}>
//           <p>Aucun utilisateur trouvé avec ces critères.</p>
//         </div>
//       )}

//       {/* Modal détails utilisateur */}
//       {selectedUser && (
//         <div className={styles.modal} onClick={() => setSelectedUser(null)}>
//           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             <div className={styles.modalHeader}>
//               <h2>Détails de l'utilisateur</h2>
//               <button 
//                 onClick={() => setSelectedUser(null)}
//                 className={styles.modalClose}
//               >
//                 ×
//               </button>
//             </div>
//             <div className={styles.modalBody}>
//               <div className={styles.modalField}>
//                 <strong>Nom complet:</strong> {selectedUser.prenom} {selectedUser.nom}
//               </div>
//               <div className={styles.modalField}>
//                 <strong>Email:</strong> {selectedUser.email}
//               </div>
//               <div className={styles.modalField}>
//                 <strong>Type:</strong> {getUserTypeLabel(selectedUser.type)}
//               </div>
//               <div className={styles.modalField}>
//                 <strong>Statut:</strong> {selectedUser.actif ? 'Actif' : 'Inactif'}
//               </div>
//               <div className={styles.modalField}>
//                 <strong>Date d'inscription:</strong> {new Date(selectedUser.created_at).toLocaleString('fr-FR')}
//               </div>
//               {selectedUser.entreprise_nom && (
//                 <div className={styles.modalField}>
//                   <strong>Entreprise:</strong> {selectedUser.entreprise_nom}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;


import React, { useState, useEffect } from 'react';
import { 
  HiSearch, HiFilter, HiEye, HiUserAdd, HiUserRemove, 
  HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, 
  HiChevronDoubleRight, HiDownload, HiRefresh,
  HiSortAscending, HiSortDescending
} from 'react-icons/hi';
import AdminService from '../../services/adminService';
import styles from './AdminUsers.module.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState({
    type: '',
    actif: null,
    search: '',
    skip: 0,
    limit: 10
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    direction: 'desc'
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await AdminService.getUtilisateurs({
        ...filters,
        sort_field: sortConfig.field,
        sort_direction: sortConfig.direction
      });
      setUsers(data.users || data); // Adapter selon la structure de réponse
      setTotalUsers(data.total || data.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filters, sortConfig]);

  const handleToggleStatus = async (userId) => {
    try {
      await AdminService.toggleUserStatus(userId);
      loadUsers(); // Recharger la liste
    } catch (err) {
      alert('Erreur lors du changement de statut: ' + err.message);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      skip: 0 // Reset pagination
    }));
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      skip: newPage * prev.limit
    }));
  };

  const handleLimitChange = (newLimit) => {
    setFilters(prev => ({
      ...prev,
      limit: parseInt(newLimit),
      skip: 0
    }));
  };

  const getUserTypeLabel = (type) => {
    const labels = {
      'admin': 'Administrateur',
      'responsable_rh': 'Responsable RH',
      'recruteur': 'Recruteur',
      'stagiaire': 'Stagiaire'
    };
    return labels[type] || type;
  };

  const getUserTypeBadge = (type) => {
    const badges = {
      'admin': styles.badgeAdmin,
      'responsable_rh': styles.badgeRH,
      'recruteur': styles.badgeRecruteur,
      'stagiaire': styles.badgeStagiaire
    };
    return badges[type] || styles.badgeDefault;
  };

  const exportUsers = () => {
    // Fonction d'export (à implémenter selon vos besoins)
    console.log('Export des utilisateurs...');
  };

  // Calculs pour la pagination
  const currentPage = Math.floor(filters.skip / filters.limit);
  const totalPages = Math.ceil(totalUsers / filters.limit);
  const startIndex = filters.skip + 1;
  const endIndex = Math.min(filters.skip + filters.limit, totalUsers);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
        <p className={styles.loadingText}>Chargement des utilisateurs...</p>
      </div>
    );
  }

  return (
    <div className={styles.usersContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>👥</span>
              Gestion des Utilisateurs
            </h1>
            <p className={styles.subtitle}>
              {totalUsers} utilisateur(s) au total
            </p>
          </div>
          
          <div className={styles.headerActions}>
            <button 
              className={styles.actionButton}
              onClick={loadUsers}
              disabled={loading}
            >
              <HiRefresh className={styles.actionIcon} />
              <span className={styles.actionText}>Actualiser</span>
            </button>
            
            {/* <button 
              className={styles.actionButton}
              onClick={exportUsers}
            >
              <HiDownload className={styles.actionIcon} />
              <span className={styles.actionText}>Exporter</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className={styles.filtersContainer}>
        <div className={styles.filtersRow}>
          <div className={styles.searchBox}>
            <HiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher par nom, email..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Tous les types</option>
            <option value="admin">Administrateurs</option>
            <option value="responsable_rh">Responsables RH</option>
            <option value="recruteur">Recruteurs</option>
            <option value="stagiaire">Stagiaires</option>
          </select>

          <select
            value={filters.actif === null ? '' : filters.actif.toString()}
            onChange={(e) => handleFilterChange('actif', e.target.value === '' ? null : e.target.value === 'true')}
            className={styles.filterSelect}
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actifs</option>
            <option value="false">Inactifs</option>
          </select>

          <select
            value={filters.limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="5">5 par page</option>
            <option value="10">10 par page</option>
            <option value="20">20 par page</option>
            <option value="50">50 par page</option>
          </select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.usersTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('nom')}
                >
                  <span>Nom complet</span>
                  {sortConfig.field === 'nom' && (
                    sortConfig.direction === 'asc' ? 
                    <HiSortAscending className={styles.sortIcon} /> : 
                    <HiSortDescending className={styles.sortIcon} />
                  )}
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('email')}
                >
                  <span>Email</span>
                  {sortConfig.field === 'email' && (
                    sortConfig.direction === 'asc' ? 
                    <HiSortAscending className={styles.sortIcon} /> : 
                    <HiSortDescending className={styles.sortIcon} />
                  )}
                </th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('type')}
                >
                  <span>Type</span>
                  {sortConfig.field === 'type' && (
                    sortConfig.direction === 'asc' ? 
                    <HiSortAscending className={styles.sortIcon} /> : 
                    <HiSortDescending className={styles.sortIcon} />
                  )}
                </th>
                <th>Statut</th>
                <th>Entreprise</th>
                <th 
                  className={styles.sortableHeader}
                  onClick={() => handleSort('created_at')}
                >
                  <span>Inscription</span>
                  {sortConfig.field === 'created_at' && (
                    sortConfig.direction === 'asc' ? 
                    <HiSortAscending className={styles.sortIcon} /> : 
                    <HiSortDescending className={styles.sortIcon} />
                  )}
                </th>
                <th>Statistiques</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {users.map(user => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.nameCell}>
                    <div className={styles.userAvatar}>
                      {user.photo ? (
                        <img 
                          src={user.photo} 
                          alt={`${user.prenom} ${user.nom}`}
                          className={styles.avatarImage}
                        />
                      ) : (
                        <div className={styles.avatarInitials}>
                          {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className={styles.nameInfo}>
                      <div className={styles.userName}>
                        {user.prenom} {user.nom}
                      </div>
                      <div className={styles.userId}>ID: {user.id}</div>
                    </div>
                  </td>
                  
                  <td className={styles.emailCell}>
                    <a href={`mailto:${user.email}`} className={styles.emailLink}>
                      {user.email}
                    </a>
                  </td>
                  
                  <td>
                    <span className={`${styles.typeBadge} ${getUserTypeBadge(user.type)}`}>
                      {getUserTypeLabel(user.type)}
                    </span>
                  </td>
                  
                  <td>
                    <span className={`${styles.statusBadge} ${user.actif ? styles.statusActive : styles.statusInactive}`}>
                      <span className={styles.statusDot}></span>
                      {user.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  
                  <td className={styles.companyCell}>
                    {user.entreprise_nom || '-'}
                  </td>
                  
                  <td className={styles.dateCell}>
                    {new Date(user.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </td>
                  
                  <td className={styles.statsCell}>
                    <div className={styles.statsGrid}>
                      {user.nombre_candidatures !== undefined && (
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>{user.nombre_candidatures}</span>
                          <span className={styles.statLabel}>candidatures</span>
                        </div>
                      )}
                      {user.nombre_offres !== undefined && (
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>{user.nombre_offres}</span>
                          <span className={styles.statLabel}>offres</span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => setSelectedUser(user)}
                        className={styles.btnView}
                        title="Voir détails"
                      >
                        <HiEye />
                      </button>
                      
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={user.actif ? styles.btnDeactivate : styles.btnActivate}
                        disabled={user.type === 'admin'}
                        title={user.actif ? 'Désactiver' : 'Activer'}
                      >
                        {user.actif ? <HiUserRemove /> : <HiUserAdd />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>👤</div>
            <h3 className={styles.emptyTitle}>Aucun utilisateur trouvé</h3>
            <p className={styles.emptyText}>
              Aucun utilisateur ne correspond aux critères de recherche.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalUsers > 0 && (
        <div className={styles.paginationContainer}>
          <div className={styles.paginationInfo}>
            Affichage de {startIndex} à {endIndex} sur {totalUsers} utilisateurs
          </div>
          
          <div className={styles.paginationControls}>
            <button
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
              className={styles.paginationButton}
              title="Première page"
            >
              <HiChevronDoubleLeft />
            </button>
            
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={styles.paginationButton}
              title="Page précédente"
            >
              <HiChevronLeft />
            </button>
            
            <div className={styles.paginationPages}>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (currentPage <= 2) {
                  pageNum = i;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${styles.paginationButton} ${currentPage === pageNum ? styles.paginationButtonActive : ''}`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className={styles.paginationButton}
              title="Page suivante"
            >
              <HiChevronRight />
            </button>
            
            <button
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
              className={styles.paginationButton}
              title="Dernière page"
            >
              <HiChevronDoubleRight />
            </button>
          </div>
        </div>
      )}

      {/* Modal détails utilisateur */}
      {selectedUser && (
        <div className={styles.modal} onClick={() => setSelectedUser(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <span className={styles.modalIcon}>👤</span>
                Détails de l'utilisateur
              </h2>
              <button 
                onClick={() => setSelectedUser(null)}
                className={styles.modalClose}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalUserHeader}>
                <div className={styles.modalAvatar}>
                  {selectedUser.photo ? (
                    <img 
                      src={selectedUser.photo} 
                      alt={`${selectedUser.prenom} ${selectedUser.nom}`}
                      className={styles.modalAvatarImage}
                    />
                  ) : (
                    <div className={styles.modalAvatarInitials}>
                      {selectedUser.prenom?.charAt(0)}{selectedUser.nom?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.modalUserInfo}>
                  <h3 className={styles.modalUserName}>
                    {selectedUser.prenom} {selectedUser.nom}
                  </h3>
                  <p className={styles.modalUserEmail}>{selectedUser.email}</p>
                  <span className={`${styles.modalUserType} ${getUserTypeBadge(selectedUser.type)}`}>
                    {getUserTypeLabel(selectedUser.type)}
                  </span>
                </div>
              </div>
              
              <div className={styles.modalFields}>
                <div className={styles.modalField}>
                  <strong>Statut:</strong> 
                  <span className={`${styles.modalFieldValue} ${selectedUser.actif ? styles.statusActive : styles.statusInactive}`}>
                    {selectedUser.actif ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <div className={styles.modalField}>
                  <strong>Date d'inscription:</strong> 
                  <span className={styles.modalFieldValue}>
                    {new Date(selectedUser.created_at).toLocaleString('fr-FR')}
                  </span>
                </div>
                {selectedUser.entreprise_nom && (
                  <div className={styles.modalField}>
                    <strong>Entreprise:</strong> 
                    <span className={styles.modalFieldValue}>{selectedUser.entreprise_nom}</span>
                  </div>
                )}
                {selectedUser.nombre_candidatures !== undefined && (
                  <div className={styles.modalField}>
                    <strong>Candidatures:</strong> 
                    <span className={styles.modalFieldValue}>{selectedUser.nombre_candidatures}</span>
                  </div>
                )}
                {selectedUser.nombre_offres !== undefined && (
                  <div className={styles.modalField}>
                    <strong>Offres créées:</strong> 
                    <span className={styles.modalFieldValue}>{selectedUser.nombre_offres}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;