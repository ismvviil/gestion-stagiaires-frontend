// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   HiChartBar,
//   HiUsers,
//   HiOfficeBuilding,
//   HiTrendingUp,
//   HiCog
// } from 'react-icons/hi';
// import styles from './AdminNavbar.module.css';

// const AdminNavbar = () => {
//   const navItems = [
//     {
//       to: '/admin/dashboard',
//       icon: HiChartBar,
//       label: 'Vue d\'ensemble',
//       description: 'Statistiques générales'
//     },
//     {
//       to: '/admin/users',
//       icon: HiUsers,
//       label: 'Utilisateurs',
//       description: 'Gestion des comptes'
//     },
//     {
//       to: '/admin/enterprises',
//       icon: HiOfficeBuilding,
//       label: 'Entreprises',
//       description: 'Performance par entreprise'
//     },
//     {
//       to: '/admin/analytics',
//       icon: HiTrendingUp,
//       label: 'Analyses',
//       description: 'Tendances et évolutions'
//     }
//   ];

//   return (
//     <div className={styles.navbarContainer}>
//       <div className={styles.navbarWrapper}>
//         <div className={styles.navbarContent}>
//           <div className={styles.navbarLeft}>
//             <div className={styles.logoContainer}>
//               <h1 className={styles.logoTitle}>
//                 🔧 Administration
//               </h1>
//             </div>
            
//             <nav className={styles.navigation}>
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   className={({ isActive }) =>
//                     `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
//                   }
//                 >
//                   <item.icon className={styles.navIcon} />
//                   <div className={styles.navContent}>
//                     <div className={styles.navLabel}>{item.label}</div>
//                     <div className={styles.navDescription}>{item.description}</div>
//                   </div>
//                 </NavLink>
//               ))}
//             </nav>
//           </div>

//           <div className={styles.navbarRight}>
//             <div className={styles.adminBadge}>
//               Administration Plateforme
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminNavbar;

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HiChartBar,
  HiUsers,
  HiOfficeBuilding,
  HiTrendingUp,
  HiCog,
  HiLogout,
  HiUser,
  HiChevronDown,
  HiBell,
  HiSearch
} from 'react-icons/hi';
// import { useAuth } from '../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminNavbar.module.css';

const AdminNavbar = ({ collapsed, onToggle }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  // Fermer les dropdowns quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    {
      to: '/admin/dashboard',
      icon: HiChartBar,
      label: 'Vue d\'ensemble',
      description: 'Statistiques générales'
    },
    {
      to: '/admin/users',
      icon: HiUsers,
      label: 'Utilisateurs',
      description: 'Gestion des comptes'
    },
    {
      to: '/admin/enterprises',
      icon: HiOfficeBuilding,
      label: 'Entreprises',
      description: 'Performance par entreprise'
    },
    {
      to: '/admin/analytics',
      icon: HiTrendingUp,
      label: 'Analyses',
      description: 'Tendances et évolutions'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    
    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }
    
    let baseUrl = 'http://localhost:8000';
    
    if (photoPath.startsWith('photos/')) {
      return `${baseUrl}/uploads/${photoPath}`;
    }
    
    return `${baseUrl}/uploads/${photoPath}`;
  };

  const getUserInitials = () => {
    if (!currentUser) return 'A';
    const firstName = currentUser.prenom || '';
    const lastName = currentUser.nom || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatUserRole = (type) => {
    switch(type) {
      case 'admin': return 'Administrateur';
      case 'recruteur': return 'Recruteur';
      case 'responsable_rh': return 'Responsable RH';
      case 'stagiaire': return 'Stagiaire';
      default: return 'Utilisateur';
    }
  };

  return (
    <div className={`${styles.navbarContainer} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.navbarWrapper}>
        <div className={styles.navbarContent}>
          <div className={styles.navbarLeft}>
            <div className={styles.logoContainer}>
              <button 
                className={styles.toggleButton}
                onClick={onToggle}
                title={collapsed ? "Étendre la barre latérale" : "Réduire la barre latérale"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              
              {!collapsed && (
                <div className={styles.logoContent}>
                  <div className={styles.logoIcon}>🔧</div>
                  <h1 className={styles.logoTitle}>Administration</h1>
                </div>
              )}
            </div>
            
            {!collapsed && (
              <nav className={styles.navigation}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                    }
                  >
                    <item.icon className={styles.navIcon} />
                    <div className={styles.navContent}>
                      <div className={styles.navLabel}>{item.label}</div>
                      <div className={styles.navDescription}>{item.description}</div>
                    </div>
                  </NavLink>
                ))}
              </nav>
            )}

            {collapsed && (
              <nav className={styles.navigationCollapsed}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.navItemCollapsed} ${isActive ? styles.navItemActive : ''}`
                    }
                    title={item.label}
                  >
                    <item.icon className={styles.navIcon} />
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          <div className={styles.navbarRight}>
            {/* {!collapsed && (
              <div className={styles.searchContainer}>
                <HiSearch className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className={styles.searchInput}
                />
              </div>
            )} */}

            {/* Notifications */}
            {/* <div className={styles.notificationContainer} ref={notificationsRef}>
              <button 
                className={styles.notificationButton}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                title="Notifications"
              >
                <HiBell className={styles.notificationIcon} />
                <span className={styles.notificationBadge}>3</span>
              </button> */}

              {/* {notificationsOpen && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationHeader}>
                    <h3>Notifications</h3>
                    <span className={styles.notificationCount}>3 nouvelles</span>
                  </div>
                  <div className={styles.notificationList}>
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationDot}></div>
                      <div className={styles.notificationContent}>
                        <p>Nouveau utilisateur inscrit</p>
                        <span>Il y a 5 minutes</span>
                      </div>
                    </div>
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationDot}></div>
                      <div className={styles.notificationContent}>
                        <p>Rapport mensuel disponible</p>
                        <span>Il y a 1 heure</span>
                      </div>
                    </div>
                    <div className={styles.notificationItem}>
                      <div className={styles.notificationDot}></div>
                      <div className={styles.notificationContent}>
                        <p>Maintenance programmée</p>
                        <span>Il y a 2 heures</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.notificationFooter}>
                    <button>Voir toutes les notifications</button>
                  </div>
                </div>
              )} */}
            {/* </div> */}

            {/* Menu utilisateur */}
            <div className={styles.userMenu} ref={dropdownRef}>
              <button 
                className={styles.userButton}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className={styles.userAvatar}>
                  {currentUser?.photo ? (
                    <img 
                      src={getPhotoUrl(currentUser.photo)} 
                      alt="Avatar" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={styles.userInitials}
                    style={{ display: currentUser?.photo ? 'none' : 'flex' }}
                  >
                    {getUserInitials()}
                  </div>
                </div>
                
                {!collapsed && (
                  <div className={styles.userInfo}>
                    <div className={styles.userName}>
                      {currentUser ? `${currentUser.prenom} ${currentUser.nom}` : 'Admin'}
                    </div>
                    <div className={styles.userRole}>
                      {currentUser ? formatUserRole(currentUser.type) : 'Administrateur'}
                    </div>
                  </div>
                )}
                
                {!collapsed && (
                  <HiChevronDown 
                    className={`${styles.chevronIcon} ${dropdownOpen ? styles.chevronOpen : ''}`} 
                  />
                )}
              </button>

              {dropdownOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownAvatar}>
                      {currentUser?.photo ? (
                        <img 
                          src={getPhotoUrl(currentUser.photo)} 
                          alt="Avatar" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={styles.dropdownInitials}
                        style={{ display: currentUser?.photo ? 'none' : 'flex' }}
                      >
                        {getUserInitials()}
                      </div>
                    </div>
                    <div className={styles.dropdownUserInfo}>
                      <div className={styles.dropdownUserName}>
                        {currentUser ? `${currentUser.prenom} ${currentUser.nom}` : 'Admin'}
                      </div>
                      <div className={styles.dropdownUserEmail}>
                        {currentUser?.email || 'admin@example.com'}
                      </div>
                    </div>
                  </div>

                  <div className={styles.dropdownDivider}></div>

                  {/* <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem}>
                      <HiUser className={styles.dropdownIcon} />
                      <span>Mon Profil</span>
                    </button>
                    <button className={styles.dropdownItem}>
                      <HiCog className={styles.dropdownIcon} />
                      <span>Paramètres</span>
                    </button>
                  </div> */}

                  <div className={styles.dropdownDivider}></div>

                  <button 
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                    onClick={handleLogout}
                  >
                    <HiLogout className={styles.dropdownIcon} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;