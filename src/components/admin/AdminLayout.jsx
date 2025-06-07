// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import AdminNavbar from './AdminNavbar';
// import styles from './AdminLayout.module.css';

// const AdminLayout = () => {
//   return (
//     <div className={styles.layoutContainer}>
//       <AdminNavbar />
      
//       <main className={styles.mainContent}>
//         <div className={styles.contentWrapper}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import AdminNavbar from './AdminNavbar';
// import styles from './AdminLayout.module.css';

// const AdminLayout = () => {
//   console.log('🔥 AdminLayout est en train de se rendre !');
  
//   return (
//     <div className={styles.layoutContainer}>
//       <AdminNavbar />
      
//       <main className={styles.mainContent} >
//         <div className={styles.contentWrapper}>
//           {/* <h2 style={{ color: 'white' }}>AVANT OUTLET</h2> */}
//           <Outlet />
//           {/* <h2 style={{ color: 'white' }}>APRÈS OUTLET</h2> */}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Gestion du responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.layoutContainer} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      {/* Background pattern decoratif */}
      <div className={styles.backgroundPattern}></div>
      
      {/* Sidebar/Navbar */}
      <AdminNavbar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Zone de contenu principal */}
      <main className={styles.mainContent}>
        {/* Header de la page avec breadcrumb */}
        <header className={styles.pageHeader}>
          <div className={styles.breadcrumbContainer}>
            <span className={styles.breadcrumb}>Administration</span>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>Tableau de bord</span>
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.refreshBtn} title="Actualiser">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* <div className={styles.notificationDot}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.notificationBadge}>3</span>
            </div> */}
          </div>
        </header>

        {/* Contenu de la page */}
        <div className={styles.contentWrapper}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </div>

        {/* Footer discret */}
        <footer className={styles.pageFooter}>
          <div className={styles.footerContent}>
            <span className={styles.footerText}>
              © 2025 Plateforme de Gestion des Stages
            </span>
            <span className={styles.footerVersion}>v2.1.0</span>
          </div>
        </footer>
      </main>

      {/* Overlay pour mobile */}
      {!sidebarCollapsed && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default AdminLayout;