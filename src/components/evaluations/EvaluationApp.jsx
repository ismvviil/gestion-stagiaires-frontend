// src/components/evaluations/EvaluationApp.jsx - ADAPTATION
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // 🔥 Import ton contexte
import { 
  FaHome, 
  FaFileAlt, 
  FaCertificate, 
  FaChartBar,
  FaArrowLeft,
  FaPlus,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import EvaluationDashboard from '../dashboard/EvaluationDashboard';
import EvaluationList from './EvaluationList';
import EvaluationForm from './EvaluationForm';
import EvaluationDetails from './EvaluationDetails';
import CertificateManager from '../certificates/CertificateManager';
import styles from './EvaluationApp.module.css';
import StageSelector from './StageSelector';
// import { useAuth } from '../../context/AuthContext';

// const EvaluationApp = ({ userType = null, initialView = 'dashboard' }) => {
//   const [currentView, setCurrentView] = useState(initialView);
//   const [selectedEvaluation, setSelectedEvaluation] = useState(null);
//   const [selectedStage, setSelectedStage] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // 🔥 Utilise ton contexte d'authentification existant
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     // Adapter la vue initiale selon le type d'utilisateur
//     if (userType === 'stagiaire') {
//       setCurrentView('evaluations'); // Stagiaires voient directement leurs évaluations
//     }
//   }, [userType]);

//    const getNavigationItems = () => {
//     const items = [];
    
//     // Dashboard seulement pour RH et Recruteurs
//     if (!userType || userType !== 'stagiaire') {
//       items.push({
//         id: 'dashboard',
//         label: 'Tableau de Bord',
//         icon: FaHome,
//         description: 'Vue d\'ensemble'
//       });
//     }

//     items.push({
//       id: 'evaluations',
//       label: userType === 'stagiaire' ? 'Mes Évaluations' : 'Évaluations',
//       icon: FaFileAlt,
//       description: userType === 'stagiaire' ? 'Voir mes évaluations' : 'Gérer les évaluations'
//     });

//      // Certificats seulement pour RH
//     if (currentUser?.type === 'responsable_rh') {
//       items.push({
//         id: 'certificates',
//         label: 'Certificats',
//         icon: FaCertificate,
//         description: 'Gérer les certificats'
//       });
//     }

//     return items;
//   };

//    const navigationItems = getNavigationItems();

//   const handleNavigate = (viewId) => {
//     setCurrentView(viewId);
//     setSelectedEvaluation(null);
//     setSelectedStage(null);
//   };

//   const handleCreateEvaluation = (stageId = null) => {
//     setSelectedStage(stageId);
//     setCurrentView('create-evaluation');
//   };

//   const handleViewEvaluationDetails = (evaluation) => {
//     setSelectedEvaluation(evaluation);
//     setCurrentView('evaluation-details');
//   };

//   const handleEditEvaluation = (evaluation) => {
//     setSelectedEvaluation(evaluation);
//     setCurrentView('edit-evaluation');
//   };

//   const handleEvaluationSubmit = async (evaluationData) => {
//     try {
//       const url = selectedEvaluation 
//         ? `/api/v1/evaluations/${selectedEvaluation.id}`
//         : '/api/v1/evaluations/';
      
//       const method = selectedEvaluation ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(evaluationData)
//       });

//       if (response.ok) {
//         setCurrentView('evaluations');
//         setSelectedEvaluation(null);
//         setSelectedStage(null);
//       } else {
//         throw new Error('Erreur lors de la sauvegarde');
//       }
//     } catch (error) {
//       console.error('Erreur:', error);
//       throw error;
//     }
//   };

//   const handleBackToList = () => {
//     setCurrentView('evaluations');
//     setSelectedEvaluation(null);
//     setSelectedStage(null);
//   };

//   const getPageTitle = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return 'Tableau de Bord';
//       case 'evaluations':
//         return 'Gestion des Évaluations';
//       case 'create-evaluation':
//         return 'Nouvelle Évaluation';
//       case 'edit-evaluation':
//         return 'Modifier l\'Évaluation';
//       case 'evaluation-details':
//         return 'Détails de l\'Évaluation';
//       case 'certificates':
//         return 'Gestion des Certificats';
//       default:
//         return 'Évaluations';
//     }
//   };

//   const renderBreadcrumb = () => {
//     const breadcrumbItems = [];

//     if (currentView === 'dashboard') {
//       breadcrumbItems.push({ label: 'Tableau de Bord', active: true });
//     } else if (currentView === 'evaluations') {
//       breadcrumbItems.push({ label: 'Évaluations', active: true });
//     } else if (currentView === 'create-evaluation') {
//       breadcrumbItems.push(
//         { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
//         { label: 'Nouvelle Évaluation', active: true }
//       );
//     } else if (currentView === 'edit-evaluation') {
//       breadcrumbItems.push(
//         { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
//         { label: 'Modifier', active: true }
//       );
//     } else if (currentView === 'evaluation-details') {
//       breadcrumbItems.push(
//         { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
//         { label: 'Détails', active: true }
//       );
//     } else if (currentView === 'certificates') {
//       breadcrumbItems.push({ label: 'Certificats', active: true });
//     }

//     return (
//       <nav className={styles.breadcrumb}>
//         {breadcrumbItems.map((item, index) => (
//           <span key={index} className={styles.breadcrumbItem}>
//             {item.onClick ? (
//               <button
//                 onClick={item.onClick}
//                 className={styles.breadcrumbLink}
//               >
//                 {item.label}
//               </button>
//             ) : (
//               <span className={item.active ? styles.breadcrumbActive : ''}>
//                 {item.label}
//               </span>
//             )}
//             {index < breadcrumbItems.length - 1 && (
//               <span className={styles.breadcrumbSeparator}>/</span>
//             )}
//           </span>
//         ))}
//       </nav>
//     );
//   };

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return (
//           <EvaluationDashboard
//             onCreateEvaluation={() => handleCreateEvaluation()}
//             onViewEvaluations={() => setCurrentView('evaluations')}
//             onViewCertificates={() => setCurrentView('certificates')}
//           />
//         );

//       case 'evaluations':
//         return (
//           <EvaluationList
//             onCreateNew={() => handleCreateEvaluation()}
//             onViewDetails={handleViewEvaluationDetails}
//             onEdit={handleEditEvaluation}
//           />
//         );

//       case 'create-evaluation':
//         return (
//           <EvaluationForm
//             stageId={selectedStage}
//             onSubmit={handleEvaluationSubmit}
//             onCancel={handleBackToList}
//           />
//         );

//       case 'edit-evaluation':
//         return (
//           <EvaluationForm
//             evaluation={selectedEvaluation}
//             onSubmit={handleEvaluationSubmit}
//             onCancel={handleBackToList}
//           />
//         );

//       case 'evaluation-details':
//         return (
//           <EvaluationDetails
//             evaluationId={selectedEvaluation?.id}
//             onEdit={handleEditEvaluation}
//             onClose={handleBackToList}
//           />
//         );

//       case 'certificates':
//         return <CertificateManager />;

//       default:
//         return <div>Vue non trouvée</div>;
//     }
//   };

//    const canShowBackButton = () => {
//     return ['create-evaluation', 'edit-evaluation', 'evaluation-details'].includes(currentView);
//   };


//   return (
//     <div className={styles.evaluationApp}>
//       {/* Sidebar */}
//       <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
//         <div className={styles.sidebarHeader}>
//           <div className={styles.sidebarLogo}>
//             <FaChartBar className={styles.logoIcon} />
//             <span className={styles.logoText}>Évaluations</span>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className={styles.sidebarToggle}
//           >
//             {sidebarOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         <nav className={styles.sidebarNav}>
//           {navigationItems.map(item => {
//             const IconComponent = item.icon;
//             const isActive = currentView === item.id || 
//               (item.id === 'evaluations' && ['create-evaluation', 'edit-evaluation', 'evaluation-details'].includes(currentView));

//             return (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavigate(item.id)}
//                 className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
//               >
//                 <IconComponent className={styles.navIcon} />
//                 {sidebarOpen && (
//                   <div className={styles.navContent}>
//                     <span className={styles.navLabel}>{item.label}</span>
//                     <span className={styles.navDescription}>{item.description}</span>
//                   </div>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {sidebarOpen && currentUser && (
//           <div className={styles.sidebarFooter}>
//             <div className={styles.userInfo}>
//               <div className={styles.userAvatar}>
//                 {currentUser.prenom?.[0]}{currentUser.nom?.[0]}
//               </div>
//               <div className={styles.userDetails}>
//                 <span className={styles.userName}>
//                   {currentUser.prenom} {currentUser.nom}
//                 </span>
//                 <span className={styles.userRole}>
//                   {currentUser.type === 'responsable_rh' ? 'Responsable RH' : 'Recruteur'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         {/* Top Bar */}
//         <header className={styles.topBar}>
//           <div className={styles.topBarLeft}>
//             {canShowBackButton() && (
//               <button
//                 onClick={handleBackToList}
//                 className={styles.backButton}
//               >
//                 <FaArrowLeft className={styles.backIcon} />
//                 Retour
//               </button>
//             )}
//             <div className={styles.pageHeader}>
//               <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
//               {renderBreadcrumb()}
//             </div>
//           </div>
          
//           <div className={styles.topBarRight}>
//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className={styles.menuButton}
//               >
//                 <FaBars />
//               </button>
//             )}
//           </div>
//         </header>

//         {/* Page Content */}
//         <div className={styles.pageContent}>
//           {renderCurrentView()}
//         </div>
//       </main>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div 
//           className={styles.overlay}
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default EvaluationApp;
import axios from "../../api/axios";
import { useSearchParams } from 'react-router-dom'; // 🔥 Ajouter cet import

// const EvaluationApp = ({ userType = null, initialView = 'dashboard' }) => {
//   const [currentView, setCurrentView] = useState(initialView);
//   const [selectedEvaluation, setSelectedEvaluation] = useState(null);
//   const [selectedStage, setSelectedStage] = useState(null);

//   // 🔥 Pour récupérer le stageId depuis l'URL
//   const [searchParams] = useSearchParams();

//   // 🔥 Utilise ton contexte d'authentification existant
//   const { currentUser } = useAuth();

//   // useEffect(() => {
//   //   // Adapter la vue initiale selon le type d'utilisateur
//   //   if (userType === 'stagiaire') {
//   //     setCurrentView('evaluations'); // Stagiaires voient directement leurs évaluations
//   //   }
//   // }, [userType]);
//   useEffect(() => {
//     // Adapter la vue initiale selon le type d'utilisateur
//     if (userType === 'stagiaire') {
//       setCurrentView('evaluations'); // Stagiaires voient directement leurs évaluations
//     }

//     // 🔥 Vérifier si on vient avec un stageId dans l'URL
//     const stageIdFromUrl = searchParams.get('stageId');
//     if (stageIdFromUrl) {
//       setSelectedStage(parseInt(stageIdFromUrl));
//       setCurrentView('create-evaluation');
//     }
//   }, [userType, searchParams]);

//   const getNavigationItems = () => {
//     const items = [];
    
//     // Dashboard seulement pour RH et Recruteurs
//     if (!userType || userType !== 'stagiaire') {
//       items.push({
//         id: 'dashboard',
//         label: 'Tableau de Bord',
//         icon: FaHome,
//         description: 'Vue d\'ensemble'
//       });
//     }

//     items.push({
//       id: 'evaluations',
//       label: userType === 'stagiaire' ? 'Mes Évaluations' : 'Évaluations',
//       icon: FaFileAlt,
//       description: userType === 'stagiaire' ? 'Voir mes évaluations' : 'Gérer les évaluations'
//     });

//     // Certificats seulement pour RH
//     if (currentUser?.type === 'responsable_rh') {
//       items.push({
//         id: 'certificates',
//         label: 'Certificats',
//         icon: FaCertificate,
//         description: 'Gérer les certificats'
//       });
//     }

//     return items;
//   };

//   const navigationItems = getNavigationItems();

//   const handleNavigate = (viewId) => {
//     setCurrentView(viewId);
//     setSelectedEvaluation(null);
//     setSelectedStage(null);
//   };

//   const handleCreateEvaluation = (stageId = null) => {
//     // setSelectedStage(stageId);
//     // setCurrentView('create-evaluation');
//     if (stageId) {
//       // Si on a déjà un stageId (venant d'un autre composant)
//       setSelectedStage(stageId);
//       setCurrentView('create-evaluation');
//     } else {
//       // Sinon, afficher le sélecteur de stage
//       setCurrentView('select-stage');
//     }
//   };

//   const handleViewEvaluationDetails = (evaluation) => {
//     setSelectedEvaluation(evaluation);
//     setCurrentView('evaluation-details');
//   };

//   const handleEditEvaluation = (evaluation) => {
//     setSelectedEvaluation(evaluation);
//     setCurrentView('edit-evaluation');
//   };
//    // 🔥 CORRECTION: Utiliser axios au lieu de fetch
//   const handleEvaluationSubmit = async (evaluationData) => {
//     try {
//       console.log('Données à envoyer:', evaluationData); // Debug

//       if (selectedEvaluation) {
//         // Modification d'une évaluation existante
//         const response = await axios.put(
//           `/evaluations/${selectedEvaluation.id}`,
//           evaluationData
//         );
//         console.log('Évaluation modifiée:', response.data);
//       } else {
//         // Création d'une nouvelle évaluation
//         const response = await axios.post('/evaluations/', evaluationData);
//         console.log('Évaluation créée:', response.data);
//       }

//       // Retour à la liste des évaluations
//       setCurrentView('evaluations');
//       setSelectedEvaluation(null);
//       setSelectedStage(null);

//     } catch (error) {
//       console.error('Erreur détaillée:', error);
      
//       // Afficher plus de détails sur l'erreur
//       if (error.response) {
//         console.error('Status:', error.response.status);
//         console.error('Data:', error.response.data);
//         console.error('Headers:', error.response.headers);
//       } else if (error.request) {
//         console.error('Request:', error.request);
//       } else {
//         console.error('Error message:', error.message);
//       }
      
//       throw error;
//     }
//   };

//   const handleBackToList = () => {
//     setCurrentView('evaluations');
//     setSelectedEvaluation(null);
//     setSelectedStage(null);
//   };

//   const getPageTitle = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return 'Tableau de Bord - Évaluations';
//       case 'evaluations':
//         return 'Gestion des Évaluations';
//       case 'create-evaluation':
//         return 'Nouvelle Évaluation';
//       case 'edit-evaluation':
//         return 'Modifier l\'Évaluation';
//       case 'evaluation-details':
//         return 'Détails de l\'Évaluation';
//       case 'certificates':
//         return 'Gestion des Certificats';
//       default:
//         return 'Évaluations';
//     }
//   };

//   const renderBreadcrumb = () => {
//     const breadcrumbItems = [];

//     if (currentView === 'dashboard') {
//       breadcrumbItems.push({ label: 'Tableau de Bord', active: true });
//     } else if (currentView === 'evaluations') {
//       breadcrumbItems.push({ label: 'Évaluations', active: true });
//     } else if (currentView === 'create-evaluation') {
//       breadcrumbItems.push(
//         { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
//         { label: 'Nouvelle Évaluation', active: true }
//       );
//     } else if (currentView === 'edit-evaluation') {
//       breadcrumbItems.push(
//         { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
//         { label: 'Modifier', active: true }
//       );
//     } else if (currentView === 'evaluation-details') {
//       breadcrumbItems.push(
//         { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
//         { label: 'Détails', active: true }
//       );
//     } else if (currentView === 'certificates') {
//       breadcrumbItems.push({ label: 'Certificats', active: true });
//     }

//     return (
//       <nav className={styles.breadcrumb}>
//         {breadcrumbItems.map((item, index) => (
//           <span key={index} className={styles.breadcrumbItem}>
//             {item.onClick ? (
//               <button
//                 onClick={item.onClick}
//                 className={styles.breadcrumbLink}
//               >
//                 {item.label}
//               </button>
//             ) : (
//               <span className={item.active ? styles.breadcrumbActive : ''}>
//                 {item.label}
//               </span>
//             )}
//             {index < breadcrumbItems.length - 1 && (
//               <span className={styles.breadcrumbSeparator}>/</span>
//             )}
//           </span>
//         ))}
//       </nav>
//     );
//   };

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case 'dashboard':
//         return (
//           <EvaluationDashboard
//             onCreateEvaluation={() => handleCreateEvaluation()}
//             onViewEvaluations={() => setCurrentView('evaluations')}
//             onViewCertificates={() => setCurrentView('certificates')}
//           />
//         );

//       case 'evaluations':
//         return (
//           <EvaluationList
//             onCreateNew={() => handleCreateEvaluation()}
//             onViewDetails={handleViewEvaluationDetails}
//             onEdit={handleEditEvaluation}
//           />
//         );
//         case 'select-stage':
//         return (
//           <StageSelector
//             onStageSelected={(stageId) => {
//               setSelectedStage(stageId);
//               setCurrentView('create-evaluation');
//             }}
//             onCancel={handleBackToList}
//           />
//         );
//       case 'create-evaluation':
//         return (
//           <EvaluationForm
//             stageId={selectedStage}
//             onSubmit={handleEvaluationSubmit}
//             onCancel={handleBackToList}
//           />
//         );

//       case 'edit-evaluation':
//         return (
//           <EvaluationForm
//             evaluation={selectedEvaluation}
//             onSubmit={handleEvaluationSubmit}
//             onCancel={handleBackToList}
//           />
//         );

//       case 'evaluation-details':
//         return (
//           <EvaluationDetails
//             evaluationId={selectedEvaluation?.id}
//             onEdit={handleEditEvaluation}
//             onClose={handleBackToList}
//           />
//         );

//       case 'certificates':
//         return <CertificateManager />;

//       default:
//         return <div>Vue non trouvée</div>;
//     }
//   };

//   const canShowBackButton = () => {
//     return ['create-evaluation', 'edit-evaluation', 'evaluation-details', 'select-stage'].includes(currentView);
//   };

//   const canShowCreateButton = () => {
//     return currentView === 'evaluations' && (!userType || userType !== 'stagiaire');
//   };

//   return (
//     <div className={styles.evaluationApp}>
//       {/* Header avec navigation horizontale */}
//       <header className={styles.appHeader}>
//         {/* Navigation principale */}
//         <nav className={styles.mainNavigation}>
//           <div className={styles.navTabs}>
//             {navigationItems.map(item => {
//               const IconComponent = item.icon;
//               const isActive = currentView === item.id || 
//                 (item.id === 'evaluations' && ['create-evaluation', 'edit-evaluation', 'evaluation-details'].includes(currentView));

//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNavigate(item.id)}
//                   className={`${styles.navTab} ${isActive ? styles.navTabActive : ''}`}
//                 >
//                   <IconComponent className={styles.navTabIcon} />
//                   <span className={styles.navTabLabel}>{item.label}</span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Actions à droite */}
//           <div className={styles.navActions}>
//             {canShowCreateButton() && (
//               <button
//                 onClick={() => handleCreateEvaluation()}
//                 className={styles.createButton}
//               >
//                 <FaPlus className={styles.createIcon} />
//                 Nouvelle Évaluation
//               </button>
//             )}
//           </div>
//         </nav>

//         {/* Top Bar avec titre et breadcrumb */}
//         <div className={styles.topBar}>
//           <div className={styles.topBarLeft}>
//             {canShowBackButton() && (
//               <button
//                 onClick={handleBackToList}
//                 className={styles.backButton}
//               >
//                 <FaArrowLeft className={styles.backIcon} />
//                 Retour
//               </button>
//             )}
//             <div className={styles.pageHeader}>
//               <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
//               {renderBreadcrumb()}
//             </div>
//           </div>
          
//           <div className={styles.topBarRight}>
//             {currentUser && (
//               <div className={styles.userInfo}>
//                 <div className={styles.userAvatar}>
//                   {currentUser.prenom?.[0]}{currentUser.nom?.[0]}
//                 </div>
//                 <div className={styles.userDetails}>
//                   <span className={styles.userName}>
//                     {currentUser.prenom} {currentUser.nom}
//                   </span>
//                   <span className={styles.userRole}>
//                     {currentUser.type === 'responsable_rh' ? 'Responsable RH' : 'Recruteur'}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         <div className={styles.pageContent}>
//           {renderCurrentView()}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EvaluationApp;

const EvaluationApp = ({ userType = null, initialView = 'dashboard' }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Adapter la vue initiale selon le type d'utilisateur
    if (userType === 'stagiaire') {
      setCurrentView('evaluations'); // Stagiaires voient directement leurs évaluations
    }

    // Vérifier si on vient avec un stageId dans l'URL
    const stageIdFromUrl = searchParams.get('stageId');
    if (stageIdFromUrl) {
      setSelectedStage(parseInt(stageIdFromUrl));
      setCurrentView('create-evaluation');
    }
  }, [userType, searchParams]);

  // 🔧 Fonction pour formater le rôle utilisateur
  const formatUserRole = (userType) => {
    switch (userType) {
      case 'responsable_rh':
        return 'Responsable RH';
      case 'recruteur':
        return 'Recruteur';
      case 'stagiaire':
        return 'Stagiaire';
      default:
        return 'Utilisateur';
    }
  };

  const getNavigationItems = () => {
    const items = [];
    
    // 🔧 Dashboard seulement pour RH et Recruteurs
    if (currentUser?.type && ['responsable_rh', 'recruteur'].includes(currentUser.type)) {
      items.push({
        id: 'dashboard',
        label: 'Tableau de Bord',
        icon: FaHome,
        description: 'Vue d\'ensemble'
      });
    }

    items.push({
      id: 'evaluations',
      label: currentUser?.type === 'stagiaire' ? 'Mes Évaluations' : 'Évaluations',
      icon: FaFileAlt,
      description: currentUser?.type === 'stagiaire' ? 'Voir mes évaluations' : 'Gérer les évaluations'
    });

    // 🔧 Certificats pour RH et (optionnellement) stagiaires
    if (currentUser?.type === 'responsable_rh') {
      items.push({
        id: 'certificates',
        label: 'Certificats',
        icon: FaCertificate,
        description: 'Gérer les certificats'
      });
    } else if (currentUser?.type === 'stagiaire') {
      items.push({
        id: 'certificates',
        label: 'Mes Certificats',
        icon: FaCertificate,
        description: 'Voir mes certificats'
      });
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    setSelectedEvaluation(null);
    setSelectedStage(null);
  };

  const handleCreateEvaluation = (stageId = null) => {
    // 🔧 Vérifier que l'utilisateur peut créer des évaluations
    if (currentUser?.type === 'stagiaire') {
      alert('Les stagiaires ne peuvent pas créer d\'évaluations');
      return;
    }

    if (stageId) {
      setSelectedStage(stageId);
      setCurrentView('create-evaluation');
    } else {
      setCurrentView('select-stage');
    }
  };

  const handleViewEvaluationDetails = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setCurrentView('evaluation-details');
  };

  const handleEditEvaluation = (evaluation) => {
    // 🔧 Vérifier que l'utilisateur peut modifier des évaluations
    if (currentUser?.type === 'stagiaire') {
      alert('Les stagiaires ne peuvent pas modifier les évaluations');
      return;
    }

    setSelectedEvaluation(evaluation);
    setCurrentView('edit-evaluation');
  };

  const handleEvaluationSubmit = async (evaluationData) => {
    try {
      console.log('Données à envoyer:', evaluationData);

      if (selectedEvaluation) {
        const response = await axios.put(
          `/evaluations/${selectedEvaluation.id}`,
          evaluationData
        );
        console.log('Évaluation modifiée:', response.data);
      } else {
        const response = await axios.post('/evaluations/', evaluationData);
        console.log('Évaluation créée:', response.data);
      }

      setCurrentView('evaluations');
      setSelectedEvaluation(null);
      setSelectedStage(null);

    } catch (error) {
      console.error('Erreur détaillée:', error);
      
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      
      throw error;
    }
  };

  const handleBackToList = () => {
    setCurrentView('evaluations');
    setSelectedEvaluation(null);
    setSelectedStage(null);
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Tableau de Bord - Évaluations';
      case 'evaluations':
        return currentUser?.type === 'stagiaire' ? 'Mes Évaluations' : 'Gestion des Évaluations';
      case 'create-evaluation':
        return 'Nouvelle Évaluation';
      case 'edit-evaluation':
        return 'Modifier l\'Évaluation';
      case 'evaluation-details':
        return 'Détails de l\'Évaluation';
      case 'certificates':
        return currentUser?.type === 'stagiaire' ? 'Mes Certificats' : 'Gestion des Certificats';
      default:
        return 'Évaluations';
    }
  };

  const renderBreadcrumb = () => {
    const breadcrumbItems = [];

    if (currentView === 'dashboard') {
      breadcrumbItems.push({ label: 'Tableau de Bord', active: true });
    } else if (currentView === 'evaluations') {
      breadcrumbItems.push({ 
        label: currentUser?.type === 'stagiaire' ? 'Mes Évaluations' : 'Évaluations', 
        active: true 
      });
    } else if (currentView === 'create-evaluation') {
      breadcrumbItems.push(
        { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
        { label: 'Nouvelle Évaluation', active: true }
      );
    } else if (currentView === 'edit-evaluation') {
      breadcrumbItems.push(
        { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
        { label: 'Modifier', active: true }
      );
    } else if (currentView === 'evaluation-details') {
      breadcrumbItems.push(
        { label: 'Évaluations', onClick: () => setCurrentView('evaluations') },
        { label: 'Détails', active: true }
      );
    } else if (currentView === 'certificates') {
      breadcrumbItems.push({ 
        label: currentUser?.type === 'stagiaire' ? 'Mes Certificats' : 'Certificats', 
        active: true 
      });
    }

    return (
      <nav className={styles.breadcrumb}>
        {breadcrumbItems.map((item, index) => (
          <span key={index} className={styles.breadcrumbItem}>
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={styles.breadcrumbLink}
              >
                {item.label}
              </button>
            ) : (
              <span className={item.active ? styles.breadcrumbActive : ''}>
                {item.label}
              </span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <span className={styles.breadcrumbSeparator}>/</span>
            )}
          </span>
        ))}
      </nav>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <EvaluationDashboard
            onCreateEvaluation={() => handleCreateEvaluation()}
            onViewEvaluations={() => setCurrentView('evaluations')}
            onViewCertificates={() => setCurrentView('certificates')}
          />
        );

      case 'evaluations':
        return (
          <EvaluationList
            onCreateNew={() => handleCreateEvaluation()}
            onViewDetails={handleViewEvaluationDetails}
            onEdit={handleEditEvaluation}
          />
        );

      case 'select-stage':
        return (
          <StageSelector
            onStageSelected={(stageId) => {
              setSelectedStage(stageId);
              setCurrentView('create-evaluation');
            }}
            onCancel={handleBackToList}
          />
        );

      case 'create-evaluation':
        return (
          <EvaluationForm
            stageId={selectedStage}
            onSubmit={handleEvaluationSubmit}
            onCancel={handleBackToList}
          />
        );

      case 'edit-evaluation':
        return (
          <EvaluationForm
            evaluation={selectedEvaluation}
            onSubmit={handleEvaluationSubmit}
            onCancel={handleBackToList}
          />
        );

      case 'evaluation-details':
        return (
          <EvaluationDetails
            evaluationId={selectedEvaluation?.id}
            onEdit={handleEditEvaluation}
            onClose={handleBackToList}
          />
        );

      case 'certificates':
        return <CertificateManager />;

      default:
        return <div>Vue non trouvée</div>;
    }
  };

  const canShowBackButton = () => {
    return ['create-evaluation', 'edit-evaluation', 'evaluation-details', 'select-stage'].includes(currentView);
  };

  const canShowCreateButton = () => {
    // 🔧 Seulement RH et Recruteurs peuvent créer
    return currentView === 'evaluations' && 
           currentUser?.type && 
           ['responsable_rh', 'recruteur'].includes(currentUser.type);
  };

  return (
    <div className={styles.evaluationApp}>
      {/* Header avec navigation horizontale */}
      <header className={styles.appHeader}>
        {/* Navigation principale */}
        <nav className={styles.mainNavigation}>
          <div className={styles.navTabs}>
            {navigationItems.map(item => {
              const IconComponent = item.icon;
              const isActive = currentView === item.id || 
                (item.id === 'evaluations' && ['create-evaluation', 'edit-evaluation', 'evaluation-details'].includes(currentView));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`${styles.navTab} ${isActive ? styles.navTabActive : ''}`}
                >
                  <IconComponent className={styles.navTabIcon} />
                  <span className={styles.navTabLabel}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions à droite */}
          <div className={styles.navActions}>
            {canShowCreateButton() && (
              <button
                onClick={() => handleCreateEvaluation()}
                className={styles.createButton}
              >
                <FaPlus className={styles.createIcon} />
                Nouvelle Évaluation
              </button>
            )}
          </div>
        </nav>

        {/* Top Bar avec titre et breadcrumb */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            {canShowBackButton() && (
              <button
                onClick={handleBackToList}
                className={styles.backButton}
              >
                <FaArrowLeft className={styles.backIcon} />
                Retour
              </button>
            )}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
              {renderBreadcrumb()}
            </div>
          </div>
          
          <div className={styles.topBarRight}>
            {currentUser && (
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {currentUser.prenom?.[0]}{currentUser.nom?.[0]}
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>
                    {currentUser.prenom} {currentUser.nom}
                  </span>
                  <span className={styles.userRole}>
                    {formatUserRole(currentUser.type)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.pageContent}>
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default EvaluationApp;