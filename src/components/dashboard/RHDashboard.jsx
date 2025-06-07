import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiUsers,
  HiAcademicCap,
  HiChartBar,
  HiStar,
  HiEye,
  HiClipboard,
} from "react-icons/hi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import styles from "./RHDashboard.module.css";

const RHDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    stagiaires_actifs: 0,
    stages_termines_mois: 0,
    note_moyenne_entreprise: 0,
    certificats_generes: 0,
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [evaluationsEnAttente, setEvaluationsEnAttente] = useState([]);
  const [loading, setLoading] = useState(true);

  // Citations motivationnelles pour RH
  const motivationalQuotes = [
    "Vous orchestrez l'excellence et façonnez l'avenir professionnel ! 🎯",
    "Chaque talent développé renforce votre entreprise ! 💼",
    "Votre vision stratégique transforme les potentiels en réussites ! 📈",
    "Vous êtes l'architecte des carrières de demain ! 🏗️",
    "L'excellence RH, c'est votre signature quotidienne ! ✨",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    loadDashboardData();
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 12000);
    return () => clearInterval(quoteInterval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Charger les évaluations de l'entreprise
      const evaluationsResponse = await axiosInstance.get(
        "/evaluations?limit=100"
      );
      const evaluations = Array.isArray(evaluationsResponse.data)
        ? evaluationsResponse.data
        : [];

      // Calculer les stats
      const evaluationsEnAttente = evaluations.filter(
        (e) => e.statut === "terminee"
      );
      const notesMoyennes = evaluations
        .filter((e) => e.note_globale)
        .map((e) => e.note_globale);

      const noteMoyenne =
        notesMoyennes.length > 0
          ? (
              notesMoyennes.reduce((a, b) => a + b, 0) / notesMoyennes.length
            ).toFixed(1)
          : 0;

      setStats({
        stagiaires_actifs: 8,
        stages_termines_mois: 4,
        note_moyenne_entreprise: parseFloat(noteMoyenne),
        certificats_generes: 15,
      });

      setEvaluationsEnAttente(evaluationsEnAttente.slice(0, 3));

      // Données de performance mensuelle
      setPerformanceData([
        { mois: "Jan", stages: 6, evaluations: 5, note: 7.2 },
        { mois: "Fév", stages: 8, evaluations: 7, note: 7.8 },
        { mois: "Mar", stages: 5, evaluations: 4, note: 8.1 },
        { mois: "Avr", stages: 9, evaluations: 8, note: 7.9 },
        { mois: "Mai", stages: 7, evaluations: 6, note: 8.3 },
      ]);
    } catch (error) {
      console.error("Erreur chargement dashboard RH:", error);
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Chargement de votre tableau de bord RH...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Header d'accueil */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <div className={styles.greetingSection}>
            <h1 className={styles.welcomeTitle}>
              {getTimeGreeting()}, {currentUser.prenom} ! 👨‍💼
            </h1>
            <p className={styles.welcomeSubtitle}>
              Pilotez l'excellence RH de votre entreprise
            </p>
          </div>

          <div className={styles.motivationCard}>
            <div className={styles.motivationIcon}>🎯</div>
            <p className={styles.motivationText}>
              {motivationalQuotes[currentQuote]}
            </p>
          </div>
        </div>
      </div>

      {/* KPIs Entreprise */}
      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>
          📊 Performance de votre entreprise
        </h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiUsers className={styles.iconBlue} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.stagiaires_actifs}</div>
              <div className={styles.statLabel}>Stagiaires actifs</div>
              <div className={styles.statDescription}>
                Talents en développement
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiAcademicCap className={styles.iconGreen} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.stages_termines_mois}
              </div>
              <div className={styles.statLabel}>Stages terminés ce mois</div>
              <div className={styles.statDescription}>Missions accomplies</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiStar className={styles.iconYellow} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.note_moyenne_entreprise}/10
              </div>
              <div className={styles.statLabel}>Note moyenne entreprise</div>
              <div className={styles.statDescription}>Excellence reconnue</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiClipboard className={styles.iconPurple} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.certificats_generes}
              </div>
              <div className={styles.statLabel}>Certificats générés</div>
              <div className={styles.statDescription}>
                Reconnaissance officielle
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className={styles.contentGrid}>
        {/* Graphique performance */}
        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>📈 Performance Mensuelle</h3>
            <p className={styles.chartSubtitle}>
              Évolution de votre activité RH
            </p>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="stages" fill="#3B82F6" name="Stages" />
                <Bar dataKey="evaluations" fill="#10B981" name="Évaluations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions et tâches */}
        <div className={styles.tasksSection}>
          <h3 className={styles.tasksTitle}>📋 À faire aujourd'hui</h3>

          {evaluationsEnAttente.length > 0 && (
            <div className={styles.taskGroup}>
              <h4 className={styles.taskGroupTitle}>Évaluations à valider</h4>
              {evaluationsEnAttente.map((evaluation) => (
                <div key={evaluation.id} className={styles.taskItem}>
                  <div className={styles.taskContent}>
                    <div className={styles.taskTitle}>
                      Évaluation #{evaluation.id}
                    </div>
                    <div className={styles.taskDesc}>
                      Note: {evaluation.note_globale}/10
                    </div>
                  </div>
                  <Link
                    to={`/evaluations/${evaluation.id}`}
                    className={styles.taskAction}
                  >
                    Valider
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className={styles.quickActions}>
            <h4 className={styles.taskGroupTitle}>Actions rapides</h4>
            <Link to="/evaluations" className={styles.actionLink}>
              <HiStar /> Gérer les évaluations
            </Link>
            <Link to="/certificats" className={styles.actionLink}>
              <HiAcademicCap /> Générer des certificats
            </Link>
            <Link to="/mes-stages" className={styles.actionLink}>
              <HiChartBar /> Voir tous les stages
            </Link>
          </div>
        </div>
      </div>

      {/* Section insights */}
      <div className={styles.insightsSection}>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>💡</div>
          <div className={styles.insightContent}>
            <h3 className={styles.insightTitle}>Insight du jour</h3>
            <p className={styles.insightText}>
              Votre entreprise maintient une note moyenne de{" "}
              {stats.note_moyenne_entreprise}/10, plaçant votre organisation
              dans le top des employeurs préférés des stagiaires !
            </p>
          </div>
        </div>
      </div>

      {/* Footer motivationnel */}
      <div className={styles.footerMotivation}>
        <div className={styles.footerContent}>
          <div className={styles.footerQuote}>
            "Votre expertise RH transforme chaque stage en une expérience
            enrichissante. Continuez à élever les standards d'excellence !" 🏆
          </div>
        </div>
      </div>
    </div>
  );
};

export default RHDashboard;
