// ============================================================================
// 1. CORRECTION StagiaireDashboard.jsx - Gestion des endpoints manquants
// ============================================================================

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   HiClipboardList,
//   HiChartBar,
//   HiStar,
//   HiAcademicCap,
//   HiSearch,
//   HiEye,
//   HiCheckCircle,
// } from "react-icons/hi";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useAuth } from "../../context/AuthContext";
// import axiosInstance from "../../api/axios";
// import styles from "./StagiaireDashboard.module.css";

// const StagiaireDashboard = () => {
//   const { currentUser } = useAuth();
//   const [stats, setStats] = useState({
//     mes_candidatures: 0,
//     stage_en_cours: 0,
//     missions_completees: 0,
//     missions_total: 0,
//     ma_note_moyenne: 0,
//   });
//   const [progressionData, setProgressionData] = useState([]);
//   const [prochainesMissions, setProchainesMissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Citations motivationnelles pour stagiaires
//   const motivationalQuotes = [
//     "Chaque expérience vous rapproche de vos rêves professionnels ! 🌟",
//     "Votre apprentissage d'aujourd'hui forge votre expertise de demain ! 📚",
//     "Osez, apprenez, grandissez - c'est votre moment ! 🚀",
//     "Chaque mission est une opportunité de briller ! ✨",
//     "Votre potentiel n'attend que d'être révélé ! 💎",
//   ];

//   const [currentQuote, setCurrentQuote] = useState(0);

//   useEffect(() => {
//     loadDashboardData();
//     const quoteInterval = setInterval(() => {
//       setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
//     }, 8000);

//     return () => clearInterval(quoteInterval);
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);

//       // CORRECTION 1: Gestion des endpoints avec fallback
//       let candidatures = [];
//       let evaluations = [];

//       // Essayer de charger les candidatures
//       try {
//         const candidaturesResponse = await axiosInstance.get("/candidatures/mes-candidatures");
//         candidatures = candidaturesResponse.data?.candidatures || candidaturesResponse.data || [];

//         // Filtrer pour ne garder que celles du stagiaire connecté
//         if (currentUser && currentUser.id) {
//           candidatures = candidatures.filter(c => c.stagiaire_id === currentUser.id);
//         }
//       } catch (candidaturesError) {
//         console.warn("Endpoint /mes-candidatures non trouvé, utilisation de /candidatures:", candidaturesError);

//         // Fallback vers l'endpoint général
//         try {
//           const allCandidaturesResponse = await axiosInstance.get("/candidatures/mes-candidatures");
//           const allCandidatures = allCandidaturesResponse.data?.candidatures || allCandidaturesResponse.data || [];
//           candidatures = allCandidatures.filter(c => c.stagiaire_id === currentUser.id);
//         } catch (fallbackError) {
//           console.error("Impossible de charger les candidatures:", fallbackError);
//           candidatures = [];
//         }
//       }

//       // Essayer de charger les évaluations
//       try {
//         const evaluationsResponse = await axiosInstance.get("/evaluations");
//         const allEvaluations = evaluationsResponse.data?.evaluations || evaluationsResponse.data || [];

//         // Filtrer pour ne garder que celles du stagiaire connecté
//         evaluations = allEvaluations.filter(e => e.stagiaire_id === currentUser.id);
//       } catch (evaluationsError) {
//         console.warn("Erreur chargement évaluations:", evaluationsError);
//         evaluations = [];
//       }

//       // Calculer la note moyenne
//       const notesMoyennes = evaluations
//         .filter((e) => e.note_globale && e.note_globale > 0)
//         .map((e) => parseFloat(e.note_globale));

//       const noteMoyenne =
//         notesMoyennes.length > 0
//           ? (notesMoyennes.reduce((a, b) => a + b, 0) / notesMoyennes.length).toFixed(1)
//           : 0;

//       // Calculer les stats réelles
//       const stagesEnCours = candidatures.filter(c =>
//         c.status === "acceptee" || c.status === "en_cours"
//       ).length;

//       setStats({
//         mes_candidatures: candidatures.length,
//         stage_en_cours: stagesEnCours,
//         missions_completees: Math.min(evaluations.length, 5), // Simule missions basées sur évaluations
//         missions_total: Math.max(evaluations.length + 2, 5), // Toujours au moins 5
//         ma_note_moyenne: parseFloat(noteMoyenne),
//       });

//       // Données de progression basées sur les vraies données
//       const progressionBaseData = [
//         { semaine: "S1", progression: 20, missions: 1 },
//         { semaine: "S2", progression: 45, missions: 2 },
//         { semaine: "S3", progression: 60, missions: Math.min(evaluations.length, 3) },
//         { semaine: "S4", progression: Math.min(85, 20 + (evaluations.length * 15)), missions: evaluations.length },
//       ];

//       setProgressionData(progressionBaseData);

//       // Missions dynamiques basées sur les candidatures
//       const missionsDynamiques = candidatures
//         .filter(c => c.status === "acceptee")
//         .slice(0, 3)
//         .map((candidature, index) => ({
//           id: candidature.id,
//           titre: candidature.offre?.titre || `Mission ${index + 1}`,
//           echeance: index === 0 ? "Dans 3 jours" : "Dans 1 semaine",
//           priorite: index === 0 ? "haute" : "normale"
//         }));

//       // Ajouter des missions par défaut si pas assez
//       if (missionsDynamiques.length === 0) {
//         missionsDynamiques.push(
//           {
//             id: 1,
//             titre: "Recherche d'opportunités",
//             echeance: "Continu",
//             priorite: "normale",
//           },
//           {
//             id: 2,
//             titre: "Mise à jour profil",
//             echeance: "Cette semaine",
//             priorite: "normale",
//           }
//         );
//       }

//       setProchainesMissions(missionsDynamiques);

//     } catch (error) {
//       console.error("Erreur générale chargement dashboard stagiaire:", error);

//       // Données par défaut en cas d'erreur complète
//       setStats({
//         mes_candidatures: 0,
//         stage_en_cours: 0,
//         missions_completees: 0,
//         missions_total: 3,
//         ma_note_moyenne: 0,
//       });

//       setProgressionData([
//         { semaine: "S1", progression: 0, missions: 0 },
//         { semaine: "S2", progression: 0, missions: 0 },
//         { semaine: "S3", progression: 0, missions: 0 },
//         { semaine: "S4", progression: 0, missions: 0 },
//       ]);

//       setProchainesMissions([
//         {
//           id: 1,
//           titre: "Commencer votre recherche",
//           echeance: "Dès maintenant",
//           priorite: "haute",
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTimeGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Bonjour";
//     if (hour < 18) return "Bon après-midi";
//     return "Bonsoir";
//   };

//   const getProgressionMessage = () => {
//     if (stats.missions_total === 0) return "Commencez votre aventure ! 🚀";

//     const percentage = (stats.missions_completees / stats.missions_total) * 100;
//     if (percentage >= 80) return "Excellent travail ! 🏆";
//     if (percentage >= 60) return "Très bien, continuez ! 👍";
//     if (percentage >= 40) return "Bon rythme ! 📈";
//     return "C'est parti ! 🚀";
//   };

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.loadingSpinner}></div>
//         <p>Chargement de votre espace personnel...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboardContainer}>
//       {/* Header d'accueil */}
//       <div className={styles.welcomeSection}>
//         <div className={styles.welcomeContent}>
//           <div className={styles.greetingSection}>
//             <h1 className={styles.welcomeTitle}>
//               {getTimeGreeting()}, {currentUser?.prenom || 'Stagiaire'} ! 🎓
//             </h1>
//             <p className={styles.welcomeSubtitle}>
//               Votre aventure professionnelle continue !
//             </p>
//           </div>

//           <div className={styles.motivationCard}>
//             <div className={styles.motivationIcon}>🌟</div>
//             <p className={styles.motivationText}>
//               {motivationalQuotes[currentQuote]}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* KPIs Personnel */}
//       <div className={styles.statsSection}>
//         <h2 className={styles.sectionTitle}>📊 Votre parcours en chiffres</h2>
//         <div className={styles.statsGrid}>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <HiClipboardList className={styles.iconBlue} />
//             </div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>{stats.mes_candidatures}</div>
//               <div className={styles.statLabel}>Mes candidatures</div>
//               <div className={styles.statDescription}>Opportunités saisies</div>
//             </div>
//           </div>

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <HiAcademicCap className={styles.iconGreen} />
//             </div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>{stats.stage_en_cours}</div>
//               <div className={styles.statLabel}>Stage en cours</div>
//               <div className={styles.statDescription}>Expérience active</div>
//             </div>
//           </div>

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <HiCheckCircle className={styles.iconYellow} />
//             </div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>
//                 {stats.missions_completees}/{stats.missions_total}
//               </div>
//               <div className={styles.statLabel}>Missions complétées</div>
//               <div className={styles.statDescription}>
//                 {getProgressionMessage()}
//               </div>
//             </div>
//           </div>

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <HiStar className={styles.iconPurple} />
//             </div>
//             <div className={styles.statContent}>
//               <div className={styles.statValue}>
//                 {stats.ma_note_moyenne > 0 ? `${stats.ma_note_moyenne}/10` : 'N/A'}
//               </div>
//               <div className={styles.statLabel}>Ma note moyenne</div>
//               <div className={styles.statDescription}>
//                 {stats.ma_note_moyenne > 0 ? 'Performance reconnue' : 'En attente d\'évaluation'}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contenu principal */}
//       <div className={styles.contentGrid}>
//         {/* Graphique progression */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h3 className={styles.chartTitle}>📈 Ma Progression</h3>
//             <p className={styles.chartSubtitle}>Évolution de vos compétences</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={progressionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="semaine" />
//                 <YAxis />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#fff",
//                     border: "1px solid #e5e7eb",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="progression"
//                   stroke="#3B82F6"
//                   strokeWidth={3}
//                   dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
//                   name="Progression (%)"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Prochaines missions */}
//         <div className={styles.missionsSection}>
//           <h3 className={styles.missionsTitle}>🎯 Mes Prochaines Missions</h3>

//           {prochainesMissions.length > 0 ? (
//             <div className={styles.missionsList}>
//               {prochainesMissions.map((mission) => (
//                 <div key={mission.id} className={styles.missionItem}>
//                   <div className={styles.missionContent}>
//                     <div className={styles.missionTitle}>{mission.titre}</div>
//                     <div className={styles.missionEcheance}>
//                       {mission.echeance}
//                     </div>
//                   </div>
//                   <div
//                     className={`${styles.missionPriorite} ${
//                       styles[mission.priorite]
//                     }`}
//                   >
//                     {mission.priorite === "haute" ? "🔥" : "📅"}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className={styles.noMissions}>
//               <p>
//                 Aucune mission en cours. Profitez pour explorer de nouvelles
//                 offres ! 🔍
//               </p>
//             </div>
//           )}

//           <div className={styles.quickActions}>
//             <h4 className={styles.actionsTitle}>Actions rapides</h4>
//             <Link to="/offres" className={styles.actionLink}>
//               <HiSearch /> Explorer les offres
//             </Link>
//             <Link to="/mes-candidatures" className={styles.actionLink}>
//               <HiEye /> Mes candidatures
//             </Link>
//             <Link to="/mes-stages" className={styles.actionLink}>
//               <HiChartBar /> Mes stages
//             </Link>
//             <Link to="/evaluations" className={styles.actionLink}>
//               <HiStar /> Mes évaluations
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Section conseils */}
//       <div className={styles.tipsSection}>
//         <div className={styles.tipCard}>
//           <div className={styles.tipIcon}>💡</div>
//           <div className={styles.tipContent}>
//             <h3 className={styles.tipTitle}>Conseil du jour</h3>
//             <p className={styles.tipText}>
//               N'hésitez pas à demander des retours réguliers à votre encadrant.
//               Le feedback est la clé de votre progression professionnelle !
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer motivationnel */}
//       <div className={styles.footerMotivation}>
//         <div className={styles.footerContent}>
//           <div className={styles.footerQuote}>
//             "Chaque jour de stage est une nouvelle page de votre histoire
//             professionnelle. Écrivez-la avec passion et détermination !" 📝✨
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StagiaireDashboard;

// ============================================================================
// STAGIAIRE DASHBOARD - VERSION PROFESSIONNELLE AVEC REACT ICONS
// ============================================================================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiClipboardList, // Candidatures
  HiChartBar, // Stages/Analytics
  HiStar, // Évaluations/Notes
  HiAcademicCap, // Formation/Académique
  HiSearch, // Recherche
  HiEye, // Voir/Consulter
  HiCheckCircle, // Missions complétées
  HiTrendingUp, // Progression
  HiLightBulb, // Conseils
  HiCursorClick, // Objectifs/Missions
  HiClock, // Temps/Échéance
  HiRefresh, // Actualiser
  HiChevronRight, // Navigation
  HiSparkles, // Motivation/Excellence
  HiHeart, // Passion
  HiRocketLaunch, // Ambition (si disponible, sinon HiLightningBolt)
} from "react-icons/hi";
import { HiArrowTrendingUp, HiRocketLaunch as HiRocket } from "react-icons/hi2"; // Icons v2 si disponibles
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import styles from "./StagiaireDashboard.module.css";

import RecommendationsWidget from "../stagiaires/RecommendationsWidget";
import MarketInsightsWidget from "../stagiaires/MarketInsightsWidget";

const StagiaireDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    mes_candidatures: 0,
    stage_en_cours: 0,
    missions_completees: 0,
    missions_total: 0,
    ma_note_moyenne: 0,
  });
  const [progressionData, setProgressionData] = useState([]);
  const [prochainesMissions, setProchainesMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Citations motivationnelles professionnelles pour stagiaires
  const motivationalQuotes = [
    {
      text: "Chaque expérience vous rapproche de vos rêves professionnels",
      icon: HiSparkles,
      accent: "success",
    },
    {
      text: "Votre apprentissage d'aujourd'hui forge votre expertise de demain",
      icon: HiAcademicCap,
      accent: "info",
    },
    {
      text: "Osez, apprenez, grandissez - c'est votre moment",
      icon: HiTrendingUp,
      accent: "warning",
    },
    {
      text: "Chaque mission est une opportunité de briller",
      icon: HiCursorClick,
      accent: "purple",
    },
    {
      text: "Votre potentiel n'attend que d'être révélé",
      icon: HiRocket || HiLightBulb,
      accent: "primary",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    loadDashboardData();
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      let candidatures = [];
      let evaluations = [];

      // Charger les candidatures avec fallback
      try {
        const candidaturesResponse = await axiosInstance.get(
          "/candidatures/mes-candidatures"
        );
        candidatures =
          candidaturesResponse.data?.candidatures ||
          candidaturesResponse.data ||
          [];

        if (currentUser && currentUser.id) {
          candidatures = candidatures.filter(
            (c) => c.stagiaire_id === currentUser.id
          );
        }
      } catch (candidaturesError) {
        console.warn(
          "Endpoint /mes-candidatures non trouvé:",
          candidaturesError
        );
        candidatures = [];
      }

      // Charger les évaluations
      try {
        const evaluationsResponse = await axiosInstance.get("/evaluations");
        const allEvaluations =
          evaluationsResponse.data?.evaluations ||
          evaluationsResponse.data ||
          [];
        evaluations = allEvaluations.filter(
          (e) => e.stagiaire_id === currentUser.id
        );
      } catch (evaluationsError) {
        console.warn("Erreur chargement évaluations:", evaluationsError);
        evaluations = [];
      }

      // Calculer la note moyenne
      const notesMoyennes = evaluations
        .filter((e) => e.note_globale && e.note_globale > 0)
        .map((e) => parseFloat(e.note_globale));

      const noteMoyenne =
        notesMoyennes.length > 0
          ? (
              notesMoyennes.reduce((a, b) => a + b, 0) / notesMoyennes.length
            ).toFixed(1)
          : 0;

      // Calculer les stats réelles
      const stagesEnCours = candidatures.filter(
        (c) => c.status === "acceptee" || c.status === "en_cours"
      ).length;

      setStats({
        mes_candidatures: candidatures.length,
        stage_en_cours: stagesEnCours,
        missions_completees: Math.min(evaluations.length, 5),
        missions_total: Math.max(evaluations.length + 2, 5),
        ma_note_moyenne: parseFloat(noteMoyenne),
      });

      // Données de progression
      const progressionBaseData = [
        { semaine: "S1", progression: 20, missions: 1 },
        { semaine: "S2", progression: 45, missions: 2 },
        {
          semaine: "S3",
          progression: 60,
          missions: Math.min(evaluations.length, 3),
        },
        {
          semaine: "S4",
          progression: Math.min(85, 20 + evaluations.length * 15),
          missions: evaluations.length,
        },
      ];

      setProgressionData(progressionBaseData);

      // Missions dynamiques
      const missionsDynamiques = candidatures
        .filter((c) => c.status === "acceptee")
        .slice(0, 3)
        .map((candidature, index) => ({
          id: candidature.id,
          titre: candidature.offre?.titre || `Mission ${index + 1}`,
          echeance: index === 0 ? "Dans 3 jours" : "Dans 1 semaine",
          priorite: index === 0 ? "haute" : "normale",
          icon: index === 0 ? HiCursorClick : HiClipboardList,
        }));

      // Missions par défaut si nécessaire
      if (missionsDynamiques.length === 0) {
        missionsDynamiques.push(
          {
            id: 1,
            titre: "Recherche d'opportunités",
            echeance: "Continu",
            priorite: "normale",
            icon: HiSearch,
          },
          {
            id: 2,
            titre: "Mise à jour profil",
            echeance: "Cette semaine",
            priorite: "normale",
            icon: HiEye,
          }
        );
      }

      setProchainesMissions(missionsDynamiques);
    } catch (error) {
      console.error("Erreur générale chargement dashboard stagiaire:", error);

      // Données par défaut
      setStats({
        mes_candidatures: 0,
        stage_en_cours: 0,
        missions_completees: 0,
        missions_total: 3,
        ma_note_moyenne: 0,
      });

      setProgressionData([
        { semaine: "S1", progression: 0, missions: 0 },
        { semaine: "S2", progression: 0, missions: 0 },
        { semaine: "S3", progression: 0, missions: 0 },
        { semaine: "S4", progression: 0, missions: 0 },
      ]);

      setProchainesMissions([
        {
          id: 1,
          titre: "Commencer votre recherche",
          echeance: "Dès maintenant",
          priorite: "haute",
          icon: HiSearch,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  const getProgressionMessage = () => {
    if (stats.missions_total === 0) return "Commencez votre aventure ! 🚀";

    const percentage = (stats.missions_completees / stats.missions_total) * 100;
    if (percentage >= 80) return "Excellent travail ! 🏆";
    if (percentage >= 60) return "Très bien, continuez ! 👍";
    if (percentage >= 40) return "Bon rythme ! 📈";
    return "C'est parti ! 🚀";
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingIconContainer}>
            <HiRefresh className={styles.loadingIcon} />
          </div>
          <p className={styles.loadingText}>
            Chargement de votre espace personnel...
          </p>
        </div>
      </div>
    );
  }

  const currentMotivation = motivationalQuotes[currentQuote];
  const MotivationIcon = currentMotivation.icon;

  return (
    <div className={styles.dashboardContainer}>
      {/* Header d'accueil professionnel */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <div className={styles.greetingSection}>
            <div className={styles.greetingIcon}>
              <HiAcademicCap />
            </div>
            <div className={styles.greetingText}>
              <h1 className={styles.welcomeTitle}>
                {getTimeGreeting()}, {currentUser?.prenom || "Stagiaire"} !
              </h1>
              <p className={styles.welcomeSubtitle}>
                Votre aventure professionnelle continue chaque jour
              </p>
            </div>
          </div>

          <div
            className={`${styles.motivationCard} ${
              styles[currentMotivation.accent]
            }`}
          >
            <div className={styles.motivationIconContainer}>
              <MotivationIcon className={styles.motivationIcon} />
            </div>
            <div className={styles.motivationContent}>
              <p className={styles.motivationText}>{currentMotivation.text}</p>
              <div className={styles.motivationProgress}>
                <div className={styles.progressDots}>
                  {motivationalQuotes.map((_, index) => (
                    <div
                      key={index}
                      className={`${styles.progressDot} ${
                        index === currentQuote ? styles.active : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Personnel avec icônes modernes */}
      <div className={styles.statsSection}>
        <div className={styles.statsHeader}>
          <div className={styles.statsHeaderIcon}>
            <HiChartBar />
          </div>
          <div className={styles.statsHeaderText}>
            <h2 className={styles.sectionTitle}>Votre parcours en chiffres</h2>
            <p className={styles.sectionSubtitle}>
              Synthèse de votre progression professionnelle
            </p>
          </div>
          <button onClick={loadDashboardData} className={styles.refreshButton}>
            <HiRefresh />
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.primary}`}>
            <div className={styles.statIcon}>
              <HiClipboardList />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.mes_candidatures}</div>
              <div className={styles.statLabel}>Mes candidatures</div>
              <div className={styles.statDescription}>Opportunités saisies</div>
            </div>
            <div className={styles.statTrend}>
              <HiTrendingUp />
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.success}`}>
            <div className={styles.statIcon}>
              <HiAcademicCap />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.stage_en_cours}</div>
              <div className={styles.statLabel}>Stage en cours</div>
              <div className={styles.statDescription}>Expérience active</div>
            </div>
            <div className={styles.statTrend}>
              <HiSparkles />
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className={styles.statIcon}>
              <HiCheckCircle />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.missions_completees}/{stats.missions_total}
              </div>
              <div className={styles.statLabel}>Missions complétées</div>
              <div className={styles.statDescription}>
                {getProgressionMessage()}
              </div>
            </div>
            <div className={styles.statProgress}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${
                    (stats.missions_completees / stats.missions_total) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.info}`}>
            <div className={styles.statIcon}>
              <HiStar />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.ma_note_moyenne > 0
                  ? `${stats.ma_note_moyenne}/10`
                  : "N/A"}
              </div>
              <div className={styles.statLabel}>Ma note moyenne</div>
              <div className={styles.statDescription}>
                {stats.ma_note_moyenne > 0
                  ? "Performance reconnue"
                  : "En attente d'évaluation"}
              </div>
            </div>
            {stats.ma_note_moyenne > 0 && (
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <HiStar
                    key={star}
                    className={
                      star <= Math.round(stats.ma_note_moyenne / 2)
                        ? styles.starFilled
                        : styles.starEmpty
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenu principal amélioré */}
      <div className={styles.contentGrid}>
        {/* Graphique progression avec header */}
        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <div className={styles.chartHeaderIcon}>
              <HiTrendingUp />
            </div>
            <div className={styles.chartHeaderText}>
              <h3 className={styles.chartTitle}>Ma Progression</h3>
              <p className={styles.chartSubtitle}>
                Évolution de vos compétences
              </p>
            </div>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={progressionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="semaine"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="progression"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: "#1d4ed8" }}
                  name="Progression (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Missions avec icônes */}
        <div className={styles.missionsSection}>
          <div className={styles.missionsHeader}>
            <div className={styles.missionsHeaderIcon}>
              <HiCursorClick />
            </div>
            <h3 className={styles.missionsTitle}>Prochaines Missions</h3>
          </div>

          {prochainesMissions.length > 0 ? (
            <div className={styles.missionsList}>
              {prochainesMissions.map((mission) => {
                const MissionIcon = mission.icon || HiCursorClick;
                return (
                  <div
                    key={mission.id}
                    className={`${styles.missionItem} ${
                      styles[mission.priorite]
                    }`}
                  >
                    <div className={styles.missionIcon}>
                      <MissionIcon />
                    </div>
                    <div className={styles.missionContent}>
                      <div className={styles.missionTitle}>{mission.titre}</div>
                      <div className={styles.missionEcheance}>
                        <HiClock className={styles.clockIcon} />
                        {mission.echeance}
                      </div>
                    </div>
                    <div className={styles.missionPriorite}>
                      {mission.priorite === "haute" ? (
                        <HiSparkles className={styles.priorityHigh} />
                      ) : (
                        <HiClock className={styles.priorityNormal} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.noMissions}>
              <div className={styles.noMissionsIcon}>
                <HiSearch />
              </div>
              <p className={styles.noMissionsText}>
                Aucune mission en cours. Profitez pour explorer de nouvelles
                opportunités !
              </p>
            </div>
          )}

          <div className={styles.quickActions}>
            <h4 className={styles.actionsTitle}>
              <HiLightBulb className={styles.actionsTitleIcon} />
              Actions rapides
            </h4>

            <div className={styles.actionsList}>
              <Link
                to="/offres"
                className={`${styles.actionLink} ${styles.primary}`}
              >
                <HiSearch className={styles.actionIcon} />
                <span>Explorer les offres</span>
                <HiChevronRight className={styles.actionArrow} />
              </Link>

              <Link
                to="/mes-candidatures"
                className={`${styles.actionLink} ${styles.info}`}
              >
                <HiEye className={styles.actionIcon} />
                <span>Mes candidatures</span>
                <HiChevronRight className={styles.actionArrow} />
              </Link>

              <Link
                to="/mes-stages"
                className={`${styles.actionLink} ${styles.success}`}
              >
                <HiChartBar className={styles.actionIcon} />
                <span>Mes stages</span>
                <HiChevronRight className={styles.actionArrow} />
              </Link>

              <Link
                to="/evaluations"
                className={`${styles.actionLink} ${styles.warning}`}
              >
                <HiStar className={styles.actionIcon} />
                <span>Mes évaluations</span>
                <HiChevronRight className={styles.actionArrow} />
              </Link>
              <Link
                to="/recommendations"
                className={`${styles.actionLink} ${styles.purple}`}
              >
                <HiStar className={styles.actionIcon} />
                <span>Recommandations</span>
                <HiChevronRight className={styles.actionArrow} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🆕 NOUVELLE SECTION - Widgets Recommandations et Insights */}
      <div className={styles.widgetsSection}>
        <div className={styles.widgetsSectionHeader}>
          <div className={styles.sectionHeaderIcon}>
            <HiSparkles />
          </div>
          <div className={styles.sectionHeaderText}>
            <h2 className={styles.sectionTitle}>Recommandations & Insights</h2>
            <p className={styles.sectionSubtitle}>
              Découvrez les opportunités personnalisées et les tendances du
              marché
            </p>
          </div>
        </div>

        <div className={styles.widgetsGrid}>
          {/* Widget Recommandations */}
          <div className={styles.widgetWrapper}>
            <RecommendationsWidget />
          </div>

          {/* Widget Insights Marché */}
          <div className={styles.widgetWrapper}>
            <MarketInsightsWidget />
          </div>
        </div>
      </div>

      {/* Section conseils modernisée */}
      <div className={styles.tipsSection}>
        <div className={styles.tipCard}>
          <div className={styles.tipIconContainer}>
            <HiLightBulb className={styles.tipIcon} />
          </div>
          <div className={styles.tipContent}>
            <h3 className={styles.tipTitle}>Conseil du jour</h3>
            <p className={styles.tipText}>
              N'hésitez pas à demander des retours réguliers à votre encadrant.
              Le feedback est la clé de votre progression professionnelle !
            </p>
          </div>
          <div className={styles.tipAction}>
            <HiHeart className={styles.tipActionIcon} />
          </div>
        </div>
      </div>

      {/* Footer motivationnel */}
      <div className={styles.footerMotivation}>
        <div className={styles.footerContent}>
          <div className={styles.footerIcon}>
            <HiSparkles />
          </div>
          <div className={styles.footerQuote}>
            "Chaque jour de stage est une nouvelle page de votre histoire
            professionnelle. Écrivez-la avec passion et détermination !"
          </div>
          <div className={styles.footerDecoration}>
            <HiHeart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagiaireDashboard;
