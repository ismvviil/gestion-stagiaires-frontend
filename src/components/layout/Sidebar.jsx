// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import styles from "./Sidebar.module.css";
// // import { useNotificationContext } from '../../context/NotificationContext';
// import { useConversations } from "../../hooks/useConversations"; // 🔥 NOUVEAU HOOK

// const Sidebar = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

//   const { unreadCount } = useConversations();

//   // Détecte si l'écran est mobile
//   useEffect(() => {
//     console.log("curerrrrrrrrrrrrrrent : " , currentUser);
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 480);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const isActive = (path) => {
//     // Pour les routes d'offres, on vérifie si le chemin actuel commence par la route
//     if (path === "/offres" && location.pathname.startsWith("/offres")) {
//       return styles.active;
//     }
//     if (path === "/evaluations" && location.pathname.startsWith("/evaluations")) {
//       return styles.active;
//     }
//     // Pour les autres routes, vérification exacte
//     return location.pathname === path ? styles.active : "";
//   };

//   // Définir les liens de navigation en fonction du type d'utilisateur
//   const getNavLinks = () => {
//     const links = [{ path: "/", icon: "🏠", label: "Accueil" }];

//     if (currentUser.type === "recruteur") {
//       links.push(
//         { path: "/offres", icon: "📝", label: "Mes Offres" },
//         { path: "/offres/nouvelle", icon: "➕", label: "Nouvelle Offre" },
//         { path: "/candidatures-recues", icon: "📋", label: "Candidatures" },
//         // { path: '/messages', icon: '💬', label: 'Messages', badge: unreadCount > 0 ? unreadCount : null }
//         { path: "/mes-stages", icon: "🎯", label: "Mes Stages" },
//         // 🔥 NOUVEAU : Évaluations pour recruteurs
//         { path: "/evaluations", icon: "⭐", label: "Évaluations" },
//         {
//           path: "/messages",
//           icon: "💬",
//           label: "Messages",
//           badge: unreadCount > 0 ? unreadCount : null, // 🔥 BADGE DYNAMIQUE
//         }
//       );
//     } else if (currentUser.type === "responsable_rh") {
//       links.push(
//         // { path: "/offres", icon: "📝", label: "Toutes les Offres" }, // RH peut voir toutes les offres
//         { path: "/stagiaires", icon: "👥", label: "Stagiaires" },
//         // 🔥 NOUVEAU : Dashboard évaluations pour RH (plus complet)
//         { path: "/evaluations", icon: "⭐", label: "Évaluations" },
//         { path: "/certificats", icon: "🎓", label: "Certificats" },
//         // { path: "/rapports", icon: "📊", label: "Rapports" },
//         { path: "/mes-stages", icon: "🎯", label: "Tous les Stages" },
//         // { path: '/messages', icon: '💬', label: 'Messages', badge: unreadCount > 0 ? unreadCount : null }
//         {
//           path: "/messages",
//           icon: "💬",
//           label: "Messages",
//           badge: unreadCount > 0 ? unreadCount : null, // 🔥 BADGE DYNAMIQUE
//         }
//       );
//     } else if (currentUser.type === "stagiaire") {
//       links.push(
//         { path: "/offres", icon: "🔍", label: "Offres Disponibles" }, // Stagiaires voient les offres disponibles
//         { path: "/mes-candidatures", icon: "📋", label: "Mes andidatures" },
//         { path: "/mes-stages", icon: "📚", label: "Mes Stages" },
//         // 🔥 NOUVEAU : Voir ses évaluations pour stagiaires
//         { path: "/mes-evaluations", icon: "⭐", label: "Mes Évaluations" },
//         {
//           path: "/messages",
//           icon: "💬",
//           label: "Messages",
//           badge: unreadCount > 0 ? unreadCount : null, // 🔥 BADGE DYNAMIQUE
//         }
//       );
//     }

//     links.push({ path: "/profile", icon: "👤", label: "Profil" });
//     return links;
//   };

//   const navLinks = getNavLinks();
//   const bottomNavLinks = navLinks.slice(0, Math.min(4, navLinks.length)); // Max 4 items for bottom nav

//   return (
//     <>
//       {/* Overlay pour mobile lorsque le menu est ouvert */}
//       <div
//         className={`${styles.overlay} ${collapsed ? styles.active : ""}`}
//         onClick={toggleSidebar}
//       />

//       {/* Bouton hamburger mobile */}
//       {isMobile && (
//         <button className={styles.mobileToggle} onClick={toggleSidebar}>
//           ☰
//         </button>
//       )}

//       {/* Bouton profil mobile */}
//       {isMobile && (
//         <Link to="/profile" className={styles.mobileProfileBtn}>
//           {currentUser.photo ? (
//             <img src={currentUser.photo} alt="Profil" />
//           ) : (
//             <div className={styles.avatarInitial}>
//               {currentUser.prenom?.charAt(0) || "U"}
//             </div>
//           )}
//         </Link>
//       )}

//       {/* Sidebar principale */}
//       <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
//         <div className={styles.sidebarHeader}>
//           <Link to="/" className={styles.logo}>
//             {collapsed && !isMobile ? "GS" : "Gestion des Stagiaires"}
//           </Link>
//           <button className={styles.toggleBtn} onClick={toggleSidebar}>
//             {collapsed ? "→" : "←"}
//           </button>
//         </div>

//         <div className={styles.userInfo}>
//           <div className={styles.avatar}>
//             {currentUser.photo ? (
//               <img src={currentUser.photo} alt="Avatar" />
//             ) : (
//               <div className={styles.avatarInitial}>
//                 {currentUser.prenom?.charAt(0) || "U"}
//               </div>
//             )}
//           </div>
//           {!collapsed && (
//             <div className={styles.userDetails}>
//               <div
//                 className={styles.userName}
//               >{`${currentUser.prenom} ${currentUser.nom}`}</div>
//               <div className={styles.userRole}>
//                 {currentUser.type === "recruteur" && "Recruteur"}
//                 {currentUser.type === "responsable_rh" && "Responsable RH"}
//                 {currentUser.type === "stagiaire" && "Stagiaire"}
//               </div>
//             </div>
//           )}
//         </div>

//         <ul className={styles.navMenu}>
//           {navLinks.map((link) => (
//             <li key={link.path} className={styles.navItem}>
//               {/* <Link
//                 to={link.path}
//                 className={`${styles.navLink} ${isActive(link.path)}`}
//               >
//                 <span className={styles.navIcon}>{link.icon}</span>
//                 {(!collapsed || isMobile) && (
//                   <span className={styles.navText}>{link.label}</span>
//                 )}
//               </Link> */}
//               <Link
//                 to={link.path}
//                 className={`${styles.navLink} ${isActive(link.path)}`}
//               >
//                 <span className={styles.navIcon}>{link.icon}</span>
//                 {(!collapsed || isMobile) && (
//                   <>
//                     <span className={styles.navText}>{link.label}</span>
//                     {/* 🔥 BADGE POUR LES MESSAGES NON LUS */}
//                     {link.badge && link.badge > 0 && (
//                       <span className={styles.navBadge}>{link.badge}</span>
//                     )}
//                   </>
//                 )}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className={styles.sidebarFooter}>
//           <button onClick={handleLogout} className={styles.logoutBtn}>
//             <span className={styles.navIcon}>🚪</span>
//             {(!collapsed || isMobile) && (
//               <span className={styles.navText}>Déconnexion</span>
//             )}
//           </button>
//         </div>
//         {/* //////////// */}

//         {/* //////// */}
//       </div>

//       {/* Bottom Navigation Bar pour mobile */}
//       {isMobile && (
//         <div className={styles.bottomBar}>
//           <div className={styles.bottomBarItems}>
//             {bottomNavLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`${styles.bottomBarItem} ${isActive(link.path)}`}
//               >
//                 <span className={styles.bottomBarIcon}>
//                   {link.icon}
//                   {/* 🔥 BADGE MOBILE POUR MESSAGES */}
//                   {link.badge && link.badge > 0 && (
//                     <span className={styles.mobileBadge}>{link.badge}</span>
//                   )}
//                 </span>
//                 <span>{link.label}</span>
//               </Link>
//             ))}

//             {/* Bouton pour ouvrir le drawer avec plus d'options */}
//             {navLinks.length > 4 && (
//               <button className={styles.bottomBarItem} onClick={toggleDrawer}>
//                 <span className={styles.bottomBarIcon}>•••</span>
//                 <span>Plus</span>
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Drawer pour les options supplémentaires sur mobile */}
//       {isMobile && navLinks.length > 4 && (
//         <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
//           <div className={styles.drawerHandle} />
//           <ul className={styles.navMenu}>
//             {navLinks.slice(4).map((link) => (
//               <li key={link.path} className={styles.navItem}>
//                 <Link
//                   to={link.path}
//                   className={`${styles.navLink} ${isActive(link.path)}`}
//                   onClick={() => setDrawerOpen(false)}
//                 >
//                   <span className={styles.navIcon}>{link.icon}</span>
//                   <span className={styles.navText}>{link.label}</span>
//                 </Link>
//               </li>
//             ))}
//             <li className={styles.navItem}>
//               <button onClick={handleLogout} className={styles.logoutBtn}>
//                 <span className={styles.navIcon}>🚪</span>
//                 <span className={styles.navText}>Déconnexion</span>
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Sidebar.module.css";
import { useConversations } from "../../hooks/useConversations";

// React Icons imports
import {
  HiHome,
  HiDocumentText,
  HiPlus,
  HiClipboardList,
  HiChatAlt2,
  HiOutlineChartSquareBar,
  HiStar,
  HiUsers,
  HiAcademicCap,
  HiSearch,
  HiUser,
  HiLogout,
  HiMenu,
  HiX,
  HiDotsHorizontal,
  HiOfficeBuilding,
  HiChartBar,
} from "react-icons/hi";

// const Sidebar = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
//   const [darkMode, setDarkMode] = useState(false);

//   const { unreadCount } = useConversations();

//   // Détecte si l'écran est mobile
//   useEffect(() => {
//     console.log("current : " , currentUser);
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 480);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Charge le thème depuis localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('darkMode');
//     if (savedTheme) {
//       setDarkMode(JSON.parse(savedTheme));
//     }
//   }, []);

//   // Applique le thème au document
//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//     localStorage.setItem('darkMode', JSON.stringify(darkMode));
//   }, [darkMode]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const isActive = (path) => {
//     if (path === "/offres" && location.pathname.startsWith("/offres")) {
//       return styles.active;
//     }
//     if (path === "/evaluations" && location.pathname.startsWith("/evaluations")) {
//       return styles.active;
//     }
//     return location.pathname === path ? styles.active : "";
//   };

//   // Définir les liens de navigation avec React Icons
//   const getNavLinks = () => {
//     const links = [{ path: "/", icon: HiHome, label: "Accueil" }];

//     if (currentUser.type === "recruteur") {
//       links.push(
//         { path: "/offres", icon: HiDocumentText, label: "Mes Offres" },
//         { path: "/offres/nouvelle", icon: HiPlus, label: "Nouvelle Offre" },
//         { path: "/candidatures-recues", icon: HiClipboardList, label: "Candidatures" },
//         { path: "/mes-stages", icon: HiOutlineChartSquareBar, label: "Mes Stages" },
//         { path: "/evaluations", icon: HiStar, label: "Évaluations" },
//         {
//           path: "/messages",
//           icon: HiChatAlt2,
//           label: "Messages",
//           badge: unreadCount > 0 ? unreadCount : null,
//         }
//       );
//     } else if (currentUser.type === "responsable_rh") {
//       links.push(
//         { path: "/stagiaires", icon: HiUsers, label: "Stagiaires" },
//         { path: "/evaluations", icon: HiStar, label: "Évaluations" },
//         { path: "/certificats", icon: HiAcademicCap, label: "Certificats" },
//         { path: "/mes-stages", icon: HiOutlineChartSquareBar, label: "Tous les Stages" },
//         {
//           path: "/messages",
//           icon: HiChatAlt2,
//           label: "Messages",
//           badge: unreadCount > 0 ? unreadCount : null,
//         }
//       );
//     } else if (currentUser.type === "stagiaire") {
//       links.push(
//         { path: "/offres", icon: HiSearch, label: "Offres Disponibles" },
//         { path: "/mes-candidatures", icon: HiClipboardList, label: "Mes Candidatures" },
//         { path: "/mes-stages", icon: HiOutlineChartSquareBar, label: "Mes Stages" },
//         { path: "/mes-evaluations", icon: HiStar, label: "Mes Évaluations" },
//         {
//           path: "/messages",
//           icon: HiChatAlt2,
//           label: "Messages",
//           badge: unreadCount > 0 ? unreadCount : null,
//         }
//       );
//     }

//     links.push({ path: "/profile", icon: HiUser, label: "Profil" });
//     return links;
//   };

//   const navLinks = getNavLinks();
//   const bottomNavLinks = navLinks.slice(0, Math.min(4, navLinks.length));

//   return (
//     <>
//       {/* Overlay pour mobile */}
//       <div
//         className={`${styles.overlay} ${collapsed ? styles.active : ""}`}
//         onClick={toggleSidebar}
//       />

//       {/* Bouton hamburger mobile */}
//       {isMobile && (
//         <button className={styles.mobileToggle} onClick={toggleSidebar}>
//           {collapsed ? <HiMenu size={24} /> : <HiX size={24} />}
//         </button>
//       )}

//       {/* Bouton profil mobile */}
//       {isMobile && (
//         <Link to="/profile" className={styles.mobileProfileBtn}>
//           {currentUser.photo ? (
//             <img src={currentUser.photo} alt="Profil" />
//           ) : (
//             <div className={styles.avatarInitial}>
//               {currentUser.prenom?.charAt(0) || "U"}
//             </div>
//           )}
//         </Link>
//       )}

//       {/* Sidebar principale */}
//       <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
//         <div className={styles.sidebarHeader}>
//           <Link to="/" className={styles.logo}>
//             {collapsed && !isMobile ? "GS" : "Gestion des Stagiaires"}
//           </Link>
//           <div className={styles.headerControls}>
//             <button
//               className={styles.themeToggle}
//               onClick={toggleTheme}
//               title={darkMode ? "Mode clair" : "Mode sombre"}
//             >
//               {darkMode ? "☀️" : "🌙"}
//             </button>
//             {!isMobile && (
//               <button className={styles.toggleBtn} onClick={toggleSidebar}>
//                 {collapsed ? "→" : "←"}
//               </button>
//             )}
//           </div>
//         </div>

//         <div className={styles.userInfo}>
//           <div className={styles.avatar}>
//             {
//             currentUser.photo ? (
//               <img src={currentUser.photo} alt="Avatar" />
//               // <div className={styles.avatarInitial}>
//               //   {currentUser.prenom?.charAt(0) || "U"}
//               // </div>
//             ) : (
//               <div className={styles.avatarInitial}>
//                 {currentUser.prenom?.charAt(0) || "U"}
//               </div>
//             )}
//           </div>
//           {!collapsed && (
//             <div className={styles.userDetails}>
//               <div className={styles.userName}>
//                 {`${currentUser.prenom} ${currentUser.nom}`}
//               </div>
//               <div className={styles.userRole}>
//                 {currentUser.type === "recruteur" && "Recruteur"}
//                 {currentUser.type === "responsable_rh" && "Responsable RH"}
//                 {currentUser.type === "stagiaire" && "Stagiaire"}
//               </div>
//             </div>
//           )}
//         </div>

//         <nav className={styles.navMenu}>
//           {navLinks.map((link) => {
//             const IconComponent = link.icon;
//             return (
//               <div key={link.path} className={styles.navItem}>
//                 <Link
//                   to={link.path}
//                   className={`${styles.navLink} ${isActive(link.path)}`}
//                 >
//                   <span className={styles.navIcon}>
//                     <IconComponent size={20} />
//                   </span>
//                   {(!collapsed || isMobile) && (
//                     <>
//                       <span className={styles.navText}>{link.label}</span>
//                       {link.badge && link.badge > 0 && (
//                         <span className={styles.navBadge}>{link.badge}</span>
//                       )}
//                     </>
//                   )}
//                 </Link>
//               </div>
//             );
//           })}
//         </nav>

//         <div className={styles.sidebarFooter}>
//           <button onClick={handleLogout} className={styles.logoutBtn}>
//             <span className={styles.navIcon}>
//               <HiLogout size={20} />
//             </span>
//             {(!collapsed || isMobile) && (
//               <span className={styles.navText}>Déconnexion</span>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Bottom Navigation Bar pour mobile */}
//       {isMobile && (
//         <div className={styles.bottomBar}>
//           <div className={styles.bottomBarItems}>
//             {bottomNavLinks.map((link) => {
//               const IconComponent = link.icon;
//               return (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   className={`${styles.bottomBarItem} ${isActive(link.path)}`}
//                 >
//                   <span className={styles.bottomBarIcon}>
//                     <IconComponent size={20} />
//                     {link.badge && link.badge > 0 && (
//                       <span className={styles.mobileBadge}>{link.badge}</span>
//                     )}
//                   </span>
//                   <span className={styles.bottomBarText}>{link.label}</span>
//                 </Link>
//               );
//             })}

//             {navLinks.length > 4 && (
//               <button className={styles.bottomBarItem} onClick={toggleDrawer}>
//                 <span className={styles.bottomBarIcon}>
//                   <HiDotsHorizontal size={20} />
//                 </span>
//                 <span className={styles.bottomBarText}>Plus</span>
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Drawer pour mobile */}
//       {isMobile && navLinks.length > 4 && (
//         <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
//           <div className={styles.drawerHandle} />
//           <nav className={styles.drawerNav}>
//             {navLinks.slice(4).map((link) => {
//               const IconComponent = link.icon;
//               return (
//                 <div key={link.path} className={styles.navItem}>
//                   <Link
//                     to={link.path}
//                     className={`${styles.navLink} ${isActive(link.path)}`}
//                     onClick={() => setDrawerOpen(false)}
//                   >
//                     <span className={styles.navIcon}>
//                       <IconComponent size={20} />
//                     </span>
//                     <span className={styles.navText}>{link.label}</span>
//                     {link.badge && link.badge > 0 && (
//                       <span className={styles.navBadge}>{link.badge}</span>
//                     )}
//                   </Link>
//                 </div>
//               );
//             })}
//             <div className={styles.navItem}>
//               <button onClick={handleLogout} className={styles.logoutBtn}>
//                 <span className={styles.navIcon}>
//                   <HiLogout size={20} />
//                 </span>
//                 <span className={styles.navText}>Déconnexion</span>
//               </button>
//             </div>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import {
//   HiHome,
//   HiDocumentText,
//   HiPlus,
//   HiClipboardList,
//   HiChatAlt2,
//   HiOutlineChartSquareBar,
//   HiStar,
//   HiUsers,
//   HiAcademicCap,
//   HiSearch,
//   HiUser,
//   HiLogout,
//   HiMenu,
//   HiX,
//   HiDotsHorizontal
// } from "react-icons/hi";

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [darkMode, setDarkMode] = useState(false);

  const { unreadCount } = useConversations();

  // const [avatarError, setAvatarError] = useState(false);

  // Fonction pour construire l'URL complète de la photo
  // Dans votre Sidebar.jsx
  const getPhotoUrl = (photoPath) => {
    if (!photoPath) return null;

    // Si c'est déjà une URL complète
    if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
      return photoPath;
    }

    let baseUrl = "http://localhost:8000";

    // Si le chemin commence par "photos/", utiliser tel quel
    if (photoPath.startsWith("photos/")) {
      return `${baseUrl}/uploads/${photoPath}`;
    }

    // Sinon, ancien format (compatibilité)
    return `${baseUrl}/uploads/${photoPath}`;
  };

  // Détecte si l'écran est mobile
  useEffect(() => {
    console.log("current : ", currentUser);

    // Debug pour la photo
    if (currentUser?.photo) {
      console.log("Photo path from backend:", currentUser.photo);
      console.log("Full photo URL:", getPhotoUrl(currentUser.photo));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentUser]);

  // Charge le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Applique le thème au document
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const isActive = (path) => {
    if (path === "/offres" && location.pathname.startsWith("/offres")) {
      return styles.active;
    }
    if (
      path === "/evaluations" &&
      location.pathname.startsWith("/evaluations")
    ) {
      return styles.active;
    }
    return location.pathname === path ? styles.active : "";
  };

  // Définir les liens de navigation avec React Icons
  const getNavLinks = () => {
    const links = [{ path: "/", icon: HiHome, label: "Accueil" }];

    if (currentUser.type === "admin") {
      links.push(
        {
          path: "/admin/dashboard",
          icon: HiOutlineChartSquareBar,
          label: "Tableau de Bord",
        }
        // { path: "/admin/users", icon: HiUsers, label: "Gestion Utilisateurs" },
        // {
        //   path: "/admin/enterprises",
        //   icon: HiOfficeBuilding,
        //   label: "Entreprises",
        // },
        // { path: "/admin/statistics", icon: HiChartBar, label: "Statistiques" },
        // {
        //   path: "/messages",
        //   icon: HiChatAlt2,
        //   label: "Messages",
        //   badge: unreadCount > 0 ? unreadCount : null,
        // }
      );
    }
    if (currentUser.type === "recruteur") {
      links.push(
        { path: "/offres", icon: HiDocumentText, label: "Mes Offres" },
        { path: "/offres/nouvelle", icon: HiPlus, label: "Nouvelle Offre" },
        {
          path: "/candidatures-recues",
          icon: HiClipboardList,
          label: "Candidatures",
        },
        {
          path: "/mes-stages",
          icon: HiOutlineChartSquareBar,
          label: "Mes Stages",
        },
        { path: "/evaluations", icon: HiStar, label: "Évaluations" },
        {
          path: "/messages",
          icon: HiChatAlt2,
          label: "Messages",
          badge: unreadCount > 0 ? unreadCount : null,
        }
      );
    } else if (currentUser.type === "responsable_rh") {
      links.push(
        { path: "/stagiaires", icon: HiUsers, label: "Stagiaires" },
        { path: "/evaluations", icon: HiStar, label: "Évaluations" },
        { path: "/certificats", icon: HiAcademicCap, label: "Certificats" },
        {
          path: "/mes-stages",
          icon: HiOutlineChartSquareBar,
          label: "Tous les Stages",
        },
        {
          path: "/messages",
          icon: HiChatAlt2,
          label: "Messages",
          badge: unreadCount > 0 ? unreadCount : null,
        }
      );
    } else if (currentUser.type === "stagiaire") {
      links.push(
        { path: "/offres", icon: HiSearch, label: "Offres Disponibles" },
        {
          path: "/mes-candidatures",
          icon: HiClipboardList,
          label: "Mes Candidatures",
        },
        {
          path: "/recommendations",
          icon: HiStar,
          label: "Recommandations",
        },
        {
          path: "/mes-stages",
          icon: HiOutlineChartSquareBar,
          label: "Mes Stages",
        },
        { path: "/mes-evaluations", icon: HiStar, label: "Mes Évaluations" },
        {
          path: "/messages",
          icon: HiChatAlt2,
          label: "Messages",
          badge: unreadCount > 0 ? unreadCount : null,
        }
      );
    }

    links.push({ path: "/profile", icon: HiUser, label: "Profil" });
    return links;
  };

  const navLinks = getNavLinks();
  const bottomNavLinks = navLinks.slice(0, Math.min(4, navLinks.length));

  return (
    <>
      {/* Overlay pour mobile */}
      <div
        className={`${styles.overlay} ${collapsed ? styles.active : ""}`}
        onClick={toggleSidebar}
      />

      {/* Bouton hamburger mobile */}
      {isMobile && (
        <button className={styles.mobileToggle} onClick={toggleSidebar}>
          {collapsed ? <HiMenu size={24} /> : <HiX size={24} />}
        </button>
      )}

      {/* Bouton profil mobile - CORRIGÉ */}
      {isMobile && (
        <Link to="/profile" className={styles.mobileProfileBtn}>
          {currentUser.photo ? (
            <img
              src={getPhotoUrl(currentUser.photo)}
              alt="Profil"
              onError={(e) => {
                console.error(
                  "Failed to load mobile profile image:",
                  getPhotoUrl(currentUser.photo)
                );
                e.target.style.display = "none";
                // Afficher le div suivant (initiales)
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.display = "flex";
                }
              }}
              onLoad={() => {
                console.log("Mobile profile image loaded successfully");
              }}
            />
          ) : null}
          <div
            className={styles.avatarInitial}
            style={{ display: currentUser.photo ? "none" : "flex" }}
          >
            {currentUser.prenom?.charAt(0) || "U"}
          </div>
        </Link>
      )}

      {/* Sidebar principale */}
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.sidebarHeader}>
          {/* <Link to="/" className={styles.logo}>
            {collapsed && !isMobile ? "GS" : "Gestion des Stagiaires"}
          </Link> */}
          <Link to="/" className={`${styles.logo} ${styles.fadeScale}`}>
            <img
              src="/img_withwritewhite.png"
              alt="Logo White"
              className={`${styles.logoImg} ${styles.logoDefault}`}
            />
            <img
              src="/img_withwriteblack.png"
              alt="Logo Black"
              className={`${styles.logoImg} ${styles.logoHover}`}
            />
          </Link>
          <div className={styles.headerControls}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            {!isMobile && (
              <button className={styles.toggleBtn} onClick={toggleSidebar}>
                {collapsed ? "→" : "←"}
              </button>
            )}
          </div>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {/* SECTION CORRIGÉE - Avatar principal */}
            {currentUser.photo ? (
              <img
                src={getPhotoUrl(currentUser.photo)}
                alt="Avatar"
                onError={(e) => {
                  console.error(
                    "Failed to load avatar image:",
                    getPhotoUrl(currentUser.photo)
                  );
                  e.target.style.display = "none";
                  // Afficher le div suivant (initiales)
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = "flex";
                  }
                }}
                onLoad={() => {
                  console.log("Avatar image loaded successfully");
                }}
                style={{ display: "block" }}
              />
            ) : null}
            <div
              className={styles.avatarInitial}
              style={{ display: currentUser.photo ? "none" : "flex" }}
            >
              {currentUser.prenom?.charAt(0) || "U"}
            </div>
          </div>
          {!collapsed && (
            <div className={styles.userDetails}>
              <div className={styles.userName}>
                {`${currentUser.prenom} ${currentUser.nom}`}
              </div>
              <div className={styles.userRole}>
                {currentUser.type === "recruteur" && "Recruteur"}
                {currentUser.type === "responsable_rh" && "Responsable RH"}
                {currentUser.type === "stagiaire" && "Stagiaire"}
              </div>
            </div>
          )}
        </div>

        <nav className={styles.navMenu}>
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <div key={link.path} className={styles.navItem}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path)}`}
                >
                  <span className={styles.navIcon}>
                    <IconComponent size={20} />
                  </span>
                  {(!collapsed || isMobile) && (
                    <>
                      <span className={styles.navText}>{link.label}</span>
                      {link.badge && link.badge > 0 && (
                        <span className={styles.navBadge}>{link.badge}</span>
                      )}
                    </>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <span className={styles.navIcon}>
              <HiLogout size={20} />
            </span>
            {(!collapsed || isMobile) && (
              <span className={styles.navText}>Déconnexion</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar pour mobile */}
      {isMobile && (
        <div className={styles.bottomBar}>
          <div className={styles.bottomBarItems}>
            {bottomNavLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${styles.bottomBarItem} ${isActive(link.path)}`}
                >
                  <span className={styles.bottomBarIcon}>
                    <IconComponent size={20} />
                    {link.badge && link.badge > 0 && (
                      <span className={styles.mobileBadge}>{link.badge}</span>
                    )}
                  </span>
                  <span className={styles.bottomBarText}>{link.label}</span>
                </Link>
              );
            })}

            {navLinks.length > 4 && (
              <button className={styles.bottomBarItem} onClick={toggleDrawer}>
                <span className={styles.bottomBarIcon}>
                  <HiDotsHorizontal size={20} />
                </span>
                <span className={styles.bottomBarText}>Plus</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Drawer pour mobile */}
      {isMobile && navLinks.length > 4 && (
        <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
          <div className={styles.drawerHandle} />
          <nav className={styles.drawerNav}>
            {navLinks.slice(4).map((link) => {
              const IconComponent = link.icon;
              return (
                <div key={link.path} className={styles.navItem}>
                  <Link
                    to={link.path}
                    className={`${styles.navLink} ${isActive(link.path)}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span className={styles.navIcon}>
                      <IconComponent size={20} />
                    </span>
                    <span className={styles.navText}>{link.label}</span>
                    {link.badge && link.badge > 0 && (
                      <span className={styles.navBadge}>{link.badge}</span>
                    )}
                  </Link>
                </div>
              );
            })}
            <div className={styles.navItem}>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <span className={styles.navIcon}>
                  <HiLogout size={20} />
                </span>
                <span className={styles.navText}>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
