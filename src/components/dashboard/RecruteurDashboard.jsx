import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiDocumentText,
  HiClipboardList,
  HiChartBar,
  HiStar,
  HiPlus,
  HiEye,
  HiUsers,
} from "react-icons/hi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import styles from "./RecruteurDashboard.module.css";

const RecruteurDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    offres_actives: 0,
    candidatures_recues: 0,
    stages_en_cours: 0,
    evaluations_en_attente: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Citations motivationnelles pour recruteurs
  const motivationalQuotes = [
    "Chaque talent découvert aujourd'hui façonne l'avenir de demain ! 🌟",
    "Votre expertise transforme des potentiels en succès ! 🚀",
    "Les meilleurs stages naissent de votre vision ! 💡",
    "Vous êtes le pont entre ambition et opportunité ! 🌉",
    "Aujourd'hui, créez l'expérience qui changera une carrière ! ⭐",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    loadDashboardData();
    // Rotation des citations toutes les 10 secondes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Charger les candidatures reçues
      const candidaturesResponse = await axiosInstance.get(
        "/candidatures/recues?limit=5"
      );

      // Simuler des stats (remplacer par vraies APIs)
      const offresResponse = await axiosInstance.get("/offres?limit=100");
      const offresActives =
        offresResponse.data.offres?.filter((o) => o.est_active)?.length || 0;

      setStats({
        offres_actives: offresActives,
        candidatures_recues: candidaturesResponse.data.length || 0,
        stages_en_cours: 2,
        evaluations_en_attente: 1,
      });

      // Données graphique (3 derniers mois)
      setChartData([
        { mois: "Mars", candidatures: 8, stages: 3 },
        { mois: "Avril", candidatures: 12, stages: 5 },
        {
          mois: "Mai",
          candidatures: candidaturesResponse.data.length || 0,
          stages: 2,
        },
      ]);
    } catch (error) {
      console.error("Erreur chargement dashboard recruteur:", error);
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
        <p>Chargement de votre tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Header d'accueil personnalisé */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <div className={styles.greetingSection}>
            <h1 className={styles.welcomeTitle}>
              {getTimeGreeting()}, {currentUser.prenom} ! 👋
            </h1>
            <p className={styles.welcomeSubtitle}>
              Prêt à découvrir les talents de demain ?
            </p>
          </div>

          <div className={styles.motivationCard}>
            <div className={styles.motivationIcon}>💪</div>
            <p className={styles.motivationText}>
              {motivationalQuotes[currentQuote]}
            </p>
          </div>
        </div>
      </div>

      {/* KPIs Principaux */}
      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>
          📊 Votre activité en un coup d'œil
        </h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiDocumentText className={styles.iconBlue} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.offres_actives}</div>
              <div className={styles.statLabel}>Offres actives</div>
              <div className={styles.statDescription}>
                Postes ouverts aux candidatures
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiClipboardList className={styles.iconGreen} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.candidatures_recues}
              </div>
              <div className={styles.statLabel}>Candidatures reçues</div>
              <div className={styles.statDescription}>
                En attente de votre expertise
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiChartBar className={styles.iconYellow} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stats.stages_en_cours}</div>
              <div className={styles.statLabel}>Stages en cours</div>
              <div className={styles.statDescription}>
                Talents en développement
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiStar className={styles.iconPurple} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stats.evaluations_en_attente}
              </div>
              <div className={styles.statLabel}>Évaluations en attente</div>
              <div className={styles.statDescription}>
                Votre retour compte !
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique et Actions */}
      <div className={styles.contentGrid}>
        {/* Graphique activité */}
        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>
              📈 Votre Impact ces 3 Derniers Mois
            </h3>
            <p className={styles.chartSubtitle}>
              Évolution de vos candidatures et stages
            </p>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
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
                <Area
                  type="monotone"
                  dataKey="candidatures"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  name="Candidatures"
                />
                <Area
                  type="monotone"
                  dataKey="stages"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="Stages créés"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions rapides */}
        <div className={styles.actionsSection}>
          <h3 className={styles.actionsTitle}>⚡ Actions Rapides</h3>
          <div className={styles.actionButtons}>
            <Link to="/offres/nouvelle" className={styles.actionBtn}>
              <HiPlus className={styles.btnIcon} />
              <div className={styles.btnContent}>
                <div className={styles.btnTitle}>Créer une offre</div>
                <div className={styles.btnDesc}>Publiez un nouveau poste</div>
              </div>
            </Link>

            <Link to="/candidatures-recues" className={styles.actionBtn}>
              <HiEye className={styles.btnIcon} />
              <div className={styles.btnContent}>
                <div className={styles.btnTitle}>Voir candidatures</div>
                <div className={styles.btnDesc}>Examinez les profils</div>
              </div>
            </Link>

            <Link to="/evaluations" className={styles.actionBtn}>
              <HiStar className={styles.btnIcon} />
              <div className={styles.btnContent}>
                <div className={styles.btnTitle}>Mes évaluations</div>
                <div className={styles.btnDesc}>Évaluez vos stagiaires</div>
              </div>
            </Link>

            <Link to="/mes-stages" className={styles.actionBtn}>
              <HiUsers className={styles.btnIcon} />
              <div className={styles.btnContent}>
                <div className={styles.btnTitle}>Mes stages</div>
                <div className={styles.btnDesc}>Suivez vos équipes</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Section inspiration */}
      <div className={styles.inspirationSection}>
        <div className={styles.inspirationCard}>
          <h3 className={styles.inspirationTitle}>💡 Le saviez-vous ?</h3>
          <p className={styles.inspirationText}>
            95% des stagiaires recommandent leur expérience lorsqu'ils
            bénéficient d'un encadrement de qualité. Votre accompagnement fait
            la différence !
          </p>
        </div>
      </div>

      {/* Footer motivationnel */}
      <div className={styles.footerMotivation}>
        <div className={styles.footerContent}>
          <div className={styles.footerQuote}>
            "Chaque stagiaire que vous guidez aujourd'hui devient le
            professionnel accompli de demain. Continuez à inspirer l'excellence
            !" 🌟
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruteurDashboard;
