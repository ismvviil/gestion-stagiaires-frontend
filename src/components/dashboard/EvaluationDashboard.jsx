// src/components/dashboard/EvaluationDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  FaChartBar,
  FaUsers,
  FaCertificate,
  FaStar,
  FaArrowUp,
  FaCalendarAlt,
  FaFileAlt,
  FaThumbsUp,
  FaEye,
  FaPlus,
  FaLock
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import styles from "./EvaluationDashboard.module.css";
import axios from '../../api/axios';
import axiosInstance from "../../api/axios";
// const EvaluationDashboard = ({
//   onCreateEvaluation,
//   onViewEvaluations,
//   onViewCertificates,
// }) => {
//   const [stats, setStats] = useState(null);
//   const [recentEvaluations, setRecentEvaluations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);

//     try {
//       // Statistiques entreprise
//       const statsResponse = await axiosInstance.get(
//         "/evaluations/statistiques/entreprise"
//       );
//       setStats(statsResponse.data);

//       // Dernières évaluations
//       const evaluationsResponse = await axiosInstance.get(
//         "/evaluations/?limit=5"
//       );
//       console.log("dattatattattatta : " , evaluationsResponse.data);
//       setRecentEvaluations(evaluationsResponse.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement du dashboard:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatStatCards = () => {
//     if (!stats) return [];

//     return [
//       {
//         title: "Total Évaluations",
//         value: stats.nombre_evaluations_total,
//         icon: FaFileAlt,
//         color: "#3498db",
//         trend: null,
//       },
//       {
//         title: "Évaluations Validées",
//         value: stats.nombre_evaluations_validees,
//         icon: FaThumbsUp,
//         color: "#27ae60",
//         trend: `${Math.round(
//           (stats.nombre_evaluations_validees / stats.nombre_evaluations_total) *
//             100
//         )}%`,
//       },
//       {
//         title: "Note Moyenne",
//         value: stats.note_moyenne ? stats.note_moyenne.toFixed(1) : "N/A",
//         icon: FaStar,
//         color: "#f39c12",
//         trend: stats.note_moyenne ? "/10" : null,
//       },
//       {
//         title: "Taux Recommandation",
//         value: stats.taux_recommandation_embauche
//           ? `${Math.round(stats.taux_recommandation_embauche)}%`
//           : "N/A",
//         icon: FaArrowUp,
//         color: "#9b59b6",
//         trend: null,
//       },
//     ];
//   };

//   const formatMentionData = () => {
//     if (!stats?.repartition_mentions) return [];

//     return Object.entries(stats.repartition_mentions).map(
//       ([mention, count]) => ({
//         name: mention,
//         value: count,
//         percentage: Math.round((count / stats.nombre_evaluations_total) * 100),
//       })
//     );
//   };

//   const getMentionColor = (mention) => {
//     const colors = {
//       Excellent: "#27ae60",
//       "Très Bien": "#2980b9",
//       Bien: "#3498db",
//       "Assez Bien": "#f39c12",
//       Passable: "#e67e22",
//       Insuffisant: "#e74c3c",
//     };
//     return colors[mention] || "#95a5a6";
//   };
//  const renderStatCard = (stat, index) => {
//     const IconComponent = stat.icon;
    
//     return (
//       <div key={index} className={styles.statCard}>
//         <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
//           <IconComponent className={styles.iconComponent} />
//         </div>
//         <div className={styles.statContent}>
//           <h3 className={styles.statValue}>{stat.value}</h3>
//           <p className={styles.statTitle}>{stat.title}</p>
//           {stat.trend && (
//             <span className={styles.statTrend}>{stat.trend}</span>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderRecentEvaluations = () => {
//     return recentEvaluations.map(evaluation => (
//       <div key={evaluation.id} className={styles.recentItem}>
//         <div className={styles.itemInfo}>
//           <h4 className={styles.itemTitle}>
//             {evaluation.stage?.stagiaire?.prenom} {evaluation.stage?.stagiaire?.nom}
//           </h4>
//           <p className={styles.itemSubtitle}>
//             {/* 🔥 TITRE : Offre > Description > Fallback */}
//             {evaluation.stage?.candidature?.offre?.titre || 
//              evaluation.stage?.description || 
//              `Stage #${evaluation.stage_id}`}
//           </p>
//           <span className={styles.itemDate}>
//             {new Date(evaluation.date_evaluation).toLocaleDateString('fr-FR')}
//           </span>
//         </div>
//         <div className={styles.itemStatus}>
//           <span className={`${styles.statusBadge} ${styles[`status${evaluation.statut.charAt(0).toUpperCase() + evaluation.statut.slice(1)}`]}`}>
//             {evaluation.statut}
//           </span>
//           {evaluation.note_globale && (
//             <span className={styles.itemScore}>
//               {evaluation.note_globale.toFixed(1)}/10
//             </span>
//           )}
//         </div>
        
//       </div>
//     ));
//   };

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <div className={styles.spinner}></div>
//         <p>Chargement du tableau de bord...</p>
//       </div>
//     );
//   }

//   const statCards = formatStatCards();
//   const mentionData = formatMentionData();

//   return (
//     <div className={styles.dashboard}>
//       {/* Header */}
//       <div className={styles.header}>
//         <div className={styles.headerLeft}>
//           <h1 className={styles.title}>
//             <FaChartBar className={styles.titleIcon} />
//             Tableau de Bord - Évaluations
//           </h1>
//           <p className={styles.subtitle}>
//             Vue d'ensemble des évaluations et certificats de stage
//           </p>
//         </div>
//         <div className={styles.headerActions}>
//           <button
//             onClick={onCreateEvaluation}
//             className={styles.primaryButton}
//           >
//             <FaPlus className={styles.buttonIcon} />
//             Nouvelle Évaluation
//           </button>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className={styles.statsGrid}>
//         {statCards.map((stat, index) => renderStatCard(stat, index))}
//       </div>

//       {/* Charts Section */}
//       <div className={styles.chartsSection}>
//         {/* Mentions Distribution */}
//         <div className={styles.chartCard}>
//           <div className={styles.chartHeader}>
//             <h3 className={styles.chartTitle}>
//               <FaStar className={styles.chartIcon} />
//               Répartition des Mentions
//             </h3>
//           </div>
//           <div className={styles.chartContent}>
//             {mentionData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={mentionData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percentage }) => `${name} (${percentage}%)`}
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {mentionData.map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={getMentionColor(entry.name)} 
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className={styles.noData}>
//                 <FaChartBar className={styles.noDataIcon} />
//                 <p>Aucune donnée disponible</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Evolution Chart (placeholder) */}
//         <div className={styles.chartCard}>
//           <div className={styles.chartHeader}>
//             <h3 className={styles.chartTitle}>
//               <FaArrowUp className={styles.chartIcon} />
//               Évolution des Notes
//             </h3>
//           </div>
//           <div className={styles.chartContent}>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={[
//                   { mois: 'Jan', moyenne: 7.2 },
//                   { mois: 'Fév', moyenne: 7.8 },
//                   { mois: 'Mar', moyenne: 8.1 },
//                   { mois: 'Avr', moyenne: 7.9 },
//                   { mois: 'Mai', moyenne: 8.3 },
//                   { mois: 'Juin', moyenne: 8.5 }
//                 ]}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mois" />
//                 <YAxis domain={[0, 10]} />
//                 <Tooltip />
//                 <Line 
//                   type="monotone" 
//                   dataKey="moyenne" 
//                   stroke="#3498db" 
//                   strokeWidth={3}
//                   dot={{ fill: '#3498db', strokeWidth: 2, r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions & Recent Activity */}
//       <div className={styles.bottomSection}>
//         {/* Quick Actions */}
//         <div className={styles.quickActions}>
//           <h3 className={styles.sectionTitle}>Actions Rapides</h3>
//           <div className={styles.actionGrid}>
//             <button
//               onClick={onCreateEvaluation}
//               className={styles.actionCard}
//             >
//               <FaPlus className={styles.actionIcon} />
//               <span className={styles.actionText}>Créer une évaluation</span>
//             </button>
            
//             <button
//               onClick={onViewEvaluations}
//               className={styles.actionCard}
//             >
//               <FaEye className={styles.actionIcon} />
//               <span className={styles.actionText}>Voir toutes les évaluations</span>
//             </button>
            
//             <button
//               onClick={onViewCertificates}
//               className={styles.actionCard}
//             >
//               <FaCertificate className={styles.actionIcon} />
//               <span className={styles.actionText}>Gérer les certificats</span>
//             </button>
            
//             <button
//               onClick={() => window.open('/verify', '_blank')}
//               className={styles.actionCard}
//             >
//               <FaUsers className={styles.actionIcon} />
//               <span className={styles.actionText}>Page de vérification</span>
//             </button>
//           </div>
//         </div>

//         {/* Recent Evaluations */}
//         <div className={styles.recentActivity}>
//           <div className={styles.activityHeader}>
//             <h3 className={styles.sectionTitle}>Évaluations Récentes</h3>
//             <button
//               onClick={onViewEvaluations}
//               className={styles.viewAllButton}
//             >
//               Voir tout
//             </button>
//           </div>
//           <div className={styles.recentList}>
//             {recentEvaluations.length > 0 ? (
//               renderRecentEvaluations()
//             ) : (
//               <div className={styles.noRecentActivity}>
//                 <FaFileAlt className={styles.noActivityIcon} />
//                 <p>Aucune évaluation récente</p>
//                 <button
//                   onClick={onCreateEvaluation}
//                   className={styles.createFirstButton}
//                 >
//                   Créer votre première évaluation
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Summary Footer */}
//       {stats && (
//         <div className={styles.summaryFooter}>
//           <div className={styles.summaryCard}>
//             <h4 className={styles.summaryTitle}>Résumé de Performance</h4>
//             <div className={styles.summaryContent}>
//               <div className={styles.summaryItem}>
//                 <span className={styles.summaryLabel}>Évaluations complétées:</span>
//                 <span className={styles.summaryValue}>
//                   {stats.nombre_evaluations_validees} / {stats.nombre_evaluations_total}
//                 </span>
//               </div>
              
//               {stats.note_moyenne && (
//                 <div className={styles.summaryItem}>
//                   <span className={styles.summaryLabel}>Performance moyenne:</span>
//                   <span className={`${styles.summaryValue} ${
//                     stats.note_moyenne >= 8 ? styles.excellent :
//                     stats.note_moyenne >= 6 ? styles.good : styles.average
//                   }`}>
//                     {stats.note_moyenne >= 8 ? 'Excellente' :
//                      stats.note_moyenne >= 6 ? 'Bonne' : 'Moyenne'}
//                     ({stats.note_moyenne.toFixed(1)}/10)
//                   </span>
//                 </div>
//               )}

//               {stats.taux_recommandation_embauche && (
//                 <div className={styles.summaryItem}>
//                   <span className={styles.summaryLabel}>Taux de recommandation:</span>
//                   <span className={`${styles.summaryValue} ${
//                     stats.taux_recommandation_embauche >= 80 ? styles.excellent :
//                     stats.taux_recommandation_embauche >= 60 ? styles.good : styles.average
//                   }`}>
//                     {Math.round(stats.taux_recommandation_embauche)}%
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



const EvaluationDashboard = ({
  onCreateEvaluation,
  onViewEvaluations,
  onViewCertificates,
}) => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentEvaluations, setRecentEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 🔧 Pour les stagiaires, ne pas charger les statistiques (ils n'y ont pas accès)
      if (currentUser?.type !== "stagiaire") {
        const statsResponse = await axiosInstance.get(
          "/evaluations/statistiques/entreprise"
        );
        setStats(statsResponse.data);
      }

      // Dernières évaluations selon le rôle
      const evaluationsResponse = await axiosInstance.get(
        "/evaluations/?limit=5"
      );
      console.log("📊 Données dashboard reçues:", evaluationsResponse.data);
      setRecentEvaluations(evaluationsResponse.data);
      
    } catch (error) {
      console.error("Erreur lors du chargement du dashboard:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔧 Adapter le titre selon le rôle
  const getDashboardTitle = () => {
    switch (currentUser?.type) {
      case "stagiaire":
        return "Mes Évaluations de Stage";
      case "recruteur":
        return "Tableau de Bord - Mes Évaluations";
      case "responsable_rh":
        return "Tableau de Bord - Évaluations Entreprise";
      default:
        return "Tableau de Bord - Évaluations";
    }
  };

  // 🔧 Adapter la description selon le rôle
  const getDashboardSubtitle = () => {
    switch (currentUser?.type) {
      case "stagiaire":
        return "Consultez vos évaluations et certificats de stage";
      case "recruteur":
        return "Vue d'ensemble de vos évaluations et certificats de stage";
      case "responsable_rh":
        return "Vue d'ensemble des évaluations et certificats de l'entreprise";
      default:
        return "Vue d'ensemble des évaluations";
    }
  };

  // 🔧 Vérifier si l'utilisateur peut créer des évaluations
  const canCreateEvaluations = () => {
    return currentUser?.type && ["responsable_rh", "recruteur"].includes(currentUser.type);
  };

  // 🔧 Vérifier si l'utilisateur peut accéder aux certificats
  const canAccessCertificates = () => {
    return currentUser?.type && ["responsable_rh", "recruteur", "stagiaire"].includes(currentUser.type);
  };

  const formatStatCards = () => {
    if (!stats) return [];

    const scope = stats.scope || "de l'entreprise";
    
    return [
      {
        title: `Total Évaluations ${scope}`,
        value: stats.nombre_evaluations_total,
        icon: FaFileAlt,
        color: "#3498db",
        trend: null,
      },
      {
        title: `Évaluations Validées ${scope}`,
        value: stats.nombre_evaluations_validees,
        icon: FaThumbsUp,
        color: "#27ae60",
        trend: stats.nombre_evaluations_total > 0 
          ? `${Math.round((stats.nombre_evaluations_validees / stats.nombre_evaluations_total) * 100)}%`
          : "0%",
      },
      {
        title: "Note Moyenne",
        value: stats.note_moyenne ? stats.note_moyenne.toFixed(1) : "N/A",
        icon: FaStar,
        color: "#f39c12",
        trend: stats.note_moyenne ? "/10" : null,
      },
      {
        title: "Taux Recommandation",
        value: stats.taux_recommandation_embauche
          ? `${Math.round(stats.taux_recommandation_embauche)}%`
          : "N/A",
        icon: FaArrowUp,
        color: "#9b59b6",
        trend: null,
      },
    ];
  };

  const formatMentionData = () => {
    if (!stats?.repartition_mentions) return [];

    return Object.entries(stats.repartition_mentions).map(
      ([mention, count]) => ({
        name: mention,
        value: count,
        percentage: Math.round((count / stats.nombre_evaluations_total) * 100),
      })
    );
  };

  const getMentionColor = (mention) => {
    const colors = {
      Excellent: "#27ae60",
      "Très Bien": "#2980b9",
      Bien: "#3498db",
      "Assez Bien": "#f39c12",
      Passable: "#e67e22",
      Insuffisant: "#e74c3c",
    };
    return colors[mention] || "#95a5a6";
  };

  const renderStatCard = (stat, index) => {
    const IconComponent = stat.icon;
    
    return (
      <div key={index} className={styles.statCard}>
        <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
          <IconComponent className={styles.iconComponent} />
        </div>
        <div className={styles.statContent}>
          <h3 className={styles.statValue}>{stat.value}</h3>
          <p className={styles.statTitle}>{stat.title}</p>
          {stat.trend && (
            <span className={styles.statTrend}>{stat.trend}</span>
          )}
        </div>
      </div>
    );
  };

  const renderRecentEvaluations = () => {
    return recentEvaluations.map(evaluation => (
      <div key={evaluation.id} className={styles.recentItem}>
        <div className={styles.itemInfo}>
          <h4 className={styles.itemTitle}>
            {evaluation.stage?.stagiaire?.prenom} {evaluation.stage?.stagiaire?.nom}
          </h4>
          <p className={styles.itemSubtitle}>
            {evaluation.stage?.candidature?.offre?.titre || 
             evaluation.stage?.description || 
             `Stage #${evaluation.stage_id}`}
          </p>
          <span className={styles.itemDate}>
            {new Date(evaluation.date_evaluation).toLocaleDateString('fr-FR')}
          </span>
        </div>
        <div className={styles.itemStatus}>
          <span className={`${styles.statusBadge} ${styles[`status${evaluation.statut.charAt(0).toUpperCase() + evaluation.statut.slice(1)}`]}`}>
            {evaluation.statut}
          </span>
          {evaluation.note_globale && (
            <span className={styles.itemScore}>
              {evaluation.note_globale.toFixed(1)}/10
            </span>
          )}
        </div>
      </div>
    ));
  };

  // 🔧 Actions rapides adaptées selon le rôle
  const renderQuickActions = () => {
    const actions = [];

    // 🔧 Voir les évaluations - pour tous
    actions.push(
      <button
        key="view-evaluations"
        onClick={onViewEvaluations}
        className={styles.actionCard}
      >
        <FaEye className={styles.actionIcon} />
        <span className={styles.actionText}>
          {currentUser?.type === "stagiaire" ? "Mes évaluations" : "Voir toutes les évaluations"}
        </span>
      </button>
    );

    // 🔧 Créer une évaluation - seulement RH et Recruteurs
    if (canCreateEvaluations()) {
      actions.push(
        <button
          key="create-evaluation"
          onClick={onCreateEvaluation}
          className={styles.actionCard}
        >
          <FaPlus className={styles.actionIcon} />
          <span className={styles.actionText}>Créer une évaluation</span>
        </button>
      );
    }

    // 🔧 Certificats - selon le rôle
    if (canAccessCertificates()) {
      actions.push(
        <button
          key="certificates"
          onClick={onViewCertificates}
          className={styles.actionCard}
        >
          <FaCertificate className={styles.actionIcon} />
          <span className={styles.actionText}>
            {currentUser?.type === "stagiaire" ? "Mes certificats" : "Gérer les certificats"}
          </span>
        </button>
      );
    }

    // 🔧 Page de vérification - pour tous
    actions.push(
      <button
        key="verification"
        onClick={() => window.open('/verify', '_blank')}
        className={styles.actionCard}
      >
        <FaUsers className={styles.actionIcon} />
        <span className={styles.actionText}>Page de vérification</span>
      </button>
    );

    return actions;
  };

  if (error) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorContent}>
          <h2>⚠️ Erreur de chargement</h2>
          {error.response?.status === 403 ? (
            <div>
              <p>Vous n'avez pas accès à ce tableau de bord.</p>
              <p>Rôle détecté: {currentUser?.type || "Non défini"}</p>
              <button onClick={fetchDashboardData} className={styles.retryButton}>
                Réessayer
              </button>
            </div>
          ) : (
            <div>
              <p>Une erreur s'est produite lors du chargement des données.</p>
              <button onClick={fetchDashboardData} className={styles.retryButton}>
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  const statCards = formatStatCards();
  const mentionData = formatMentionData();

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <FaChartBar className={styles.titleIcon} />
            {getDashboardTitle()}
          </h1>
          <p className={styles.subtitle}>
            {getDashboardSubtitle()}
          </p>
          {/* 🔧 Indicateurs de rôle */}
          {currentUser?.type === "recruteur" && (
            <span className={styles.roleIndicator}>
              👤 Vue Recruteur - Vos données uniquement
            </span>
          )}
          {currentUser?.type === "stagiaire" && (
            <span className={styles.roleIndicator}>
              🎓 Vue Stagiaire - Lecture seule
            </span>
          )}
        </div>
        <div className={styles.headerActions}>
          {/* 🔧 Bouton conditionnel selon le rôle */}
          {canCreateEvaluations() ? (
            <button
              onClick={onCreateEvaluation}
              className={styles.primaryButton}
            >
              <FaPlus className={styles.buttonIcon} />
              Nouvelle Évaluation
            </button>
          ) : (
            <div className={styles.readOnlyIndicator}>
              <FaLock className={styles.lockIcon} />
              <span>Mode lecture seule</span>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards - Seulement pour RH et Recruteurs */}
      {stats && (
        <div className={styles.statsGrid}>
          {statCards.map((stat, index) => renderStatCard(stat, index))}
        </div>
      )}

      {/* Charts Section - Seulement pour RH et Recruteurs */}
      {stats && (
        <div className={styles.chartsSection}>
          {/* Mentions Distribution */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>
                <FaStar className={styles.chartIcon} />
                Répartition des Mentions
              </h3>
            </div>
            <div className={styles.chartContent}>
              {mentionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mentionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mentionData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getMentionColor(entry.name)} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.noData}>
                  <FaChartBar className={styles.noDataIcon} />
                  <p>Aucune donnée disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Evolution Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>
                <FaArrowUp className={styles.chartIcon} />
                Évolution des Notes
              </h3>
            </div>
            <div className={styles.chartContent}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { mois: 'Jan', moyenne: 7.2 },
                    { mois: 'Fév', moyenne: 7.8 },
                    { mois: 'Mar', moyenne: 8.1 },
                    { mois: 'Avr', moyenne: 7.9 },
                    { mois: 'Mai', moyenne: 8.3 },
                    { mois: 'Juin', moyenne: 8.5 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="moyenne" 
                    stroke="#3498db" 
                    strokeWidth={3}
                    dot={{ fill: '#3498db', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h3 className={styles.sectionTitle}>Actions Rapides</h3>
          <div className={styles.actionGrid}>
            {renderQuickActions()}
          </div>
        </div>

        {/* Recent Evaluations */}
        <div className={styles.recentActivity}>
          <div className={styles.activityHeader}>
            <h3 className={styles.sectionTitle}>
              {currentUser?.type === "stagiaire" ? "Mes Évaluations" : "Évaluations Récentes"}
            </h3>
            <button
              onClick={onViewEvaluations}
              className={styles.viewAllButton}
            >
              Voir tout
            </button>
          </div>
          <div className={styles.recentList}>
            {recentEvaluations.length > 0 ? (
              renderRecentEvaluations()
            ) : (
              <div className={styles.noRecentActivity}>
                <FaFileAlt className={styles.noActivityIcon} />
                <p>
                  {currentUser?.type === "stagiaire" 
                    ? "Aucune évaluation disponible" 
                    : "Aucune évaluation récente"
                  }
                </p>
                {canCreateEvaluations() && (
                  <button
                    onClick={onCreateEvaluation}
                    className={styles.createFirstButton}
                  >
                    Créer votre première évaluation
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Footer - Seulement pour RH et Recruteurs */}
      {stats && (
        <div className={styles.summaryFooter}>
          <div className={styles.summaryCard}>
            <h4 className={styles.summaryTitle}>
              {currentUser?.type === "recruteur" ? "Résumé de Vos Performances" : "Résumé de Performance"}
            </h4>
            <div className={styles.summaryContent}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Évaluations complétées:</span>
                <span className={styles.summaryValue}>
                  {stats.nombre_evaluations_validees} / {stats.nombre_evaluations_total}
                </span>
              </div>
              
              {stats.note_moyenne && (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Performance moyenne:</span>
                  <span className={`${styles.summaryValue} ${
                    stats.note_moyenne >= 8 ? styles.excellent :
                    stats.note_moyenne >= 6 ? styles.good : styles.average
                  }`}>
                    {stats.note_moyenne >= 8 ? 'Excellente' :
                     stats.note_moyenne >= 6 ? 'Bonne' : 'Moyenne'}
                    ({stats.note_moyenne.toFixed(1)}/10)
                  </span>
                </div>
              )}

              {stats.taux_recommandation_embauche && (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Taux de recommandation:</span>
                  <span className={`${styles.summaryValue} ${
                    stats.taux_recommandation_embauche >= 80 ? styles.excellent :
                    stats.taux_recommandation_embauche >= 60 ? styles.good : styles.average
                  }`}>
                    {Math.round(stats.taux_recommandation_embauche)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationDashboard;