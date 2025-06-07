// src/components/stagiaires/MarketInsightsWidget.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiTrendingUp,
  HiOfficeBuilding,
  HiSparkles,
  HiUsers,
  HiArrowRight,
  HiRefresh,
  HiChartBar,
  HiLightBulb,
  HiStar,
} from "react-icons/hi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getMarketInsights } from "../../services/stagiaireService";
import styles from "./MarketInsightsWidget.module.css";

const MarketInsightsWidget = () => {
  const [marketInsights, setMarketInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMarketInsights();
  }, []);

  const loadMarketInsights = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMarketInsights();
      setMarketInsights(data);
    } catch (err) {
      setError("Erreur lors du chargement");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Couleurs pour les graphiques
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  if (loading) {
    return (
      <div className={styles.widgetContainer}>
        <div className={styles.widgetHeader}>
          <div className={styles.headerIcon}>
            <HiTrendingUp />
          </div>
          <h3 className={styles.widgetTitle}>Insights Marché</h3>
        </div>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !marketInsights) {
    return (
      <div className={styles.widgetContainer}>
        <div className={styles.widgetHeader}>
          <div className={styles.headerIcon}>
            <HiTrendingUp />
          </div>
          <h3 className={styles.widgetTitle}>Insights Marché</h3>
          <button onClick={loadMarketInsights} className={styles.refreshButton}>
            <HiRefresh />
          </button>
        </div>
        <div className={styles.errorContent}>
          <p className={styles.errorText}>Impossible de charger les données</p>
        </div>
      </div>
    );
  }

  // Préparer les données pour les mini-graphiques
  const topSectors = marketInsights.market_overview.secteurs_populaires
    .slice(0, 4)
    .map((item, index) => ({
      name:
        item.secteur.length > 12
          ? item.secteur.substring(0, 12) + "..."
          : item.secteur,
      value: item.nombre_offres,
      color: COLORS[index % COLORS.length],
    }));

  const topSkills =
    marketInsights.competences_demand.competences_les_plus_demandees.slice(
      0,
      3
    );

  return (
    <div className={styles.widgetContainer}>
      {/* Header du widget */}
      <div className={styles.widgetHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <HiTrendingUp />
          </div>
          <div className={styles.headerText}>
            <h3 className={styles.widgetTitle}>Insights Marché</h3>
            <p className={styles.widgetSubtitle}>Tendances et opportunités</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={loadMarketInsights}
            className={styles.refreshButton}
            title="Actualiser"
          >
            <HiRefresh />
          </button>
        </div>
      </div>

      {/* Statistiques clés */}
      <div className={styles.keyStatsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <HiOfficeBuilding />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {
                  marketInsights.market_overview.stats_generales
                    .total_offres_actives
                }
              </div>
              <div className={styles.statLabel}>Offres actives</div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <HiUsers />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {
                  marketInsights.market_overview.stats_generales
                    .taux_candidature_moyen
                }
                %
              </div>
              <div className={styles.statLabel}>Taux moyen</div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <HiStar />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {marketInsights.your_position.score_competitivite || "N/A"}
                {marketInsights.your_position.score_competitivite && "%"}
              </div>
              <div className={styles.statLabel}>Votre score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini graphique secteurs */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <div className={styles.chartHeaderIcon}>
            <HiChartBar />
          </div>
          <h4 className={styles.chartTitle}>Secteurs populaires</h4>
        </div>
        <div className={styles.miniChart}>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={topSectors}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {topSectors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value + " offres", "Nombre"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartLegend}>
          {topSectors.map((sector, index) => (
            <div key={index} className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: sector.color }}
              />
              <span className={styles.legendText}>{sector.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top compétences */}
      <div className={styles.skillsSection}>
        <div className={styles.skillsHeader}>
          <div className={styles.skillsHeaderIcon}>
            <HiSparkles />
          </div>
          <h4 className={styles.skillsTitle}>Compétences demandées</h4>
        </div>
        <div className={styles.skillsList}>
          {topSkills.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <div className={styles.skillInfo}>
                <span className={styles.skillName}>{skill.competence}</span>
                <span className={styles.skillPercent}>{skill.popularite}%</span>
              </div>
              <div className={styles.skillBar}>
                <div
                  className={styles.skillBarFill}
                  style={{
                    width: `${skill.popularite}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Votre position */}
      {marketInsights.your_position && (
        <div className={styles.positionSection}>
          <div className={styles.positionHeader}>
            <div className={styles.positionHeaderIcon}>
              <HiStar />
            </div>
            <h4 className={styles.positionTitle}>Votre position</h4>
          </div>
          <div className={styles.positionContent}>
            <div className={styles.positionStats}>
              <div className={styles.positionStat}>
                <span className={styles.positionLabel}>Concurrence</span>
                <span
                  className={`${styles.positionValue} ${
                    marketInsights.your_position.niveau_concurrence === "Faible"
                      ? styles.lowLevel
                      : marketInsights.your_position.niveau_concurrence ===
                        "Modéré"
                      ? styles.mediumLevel
                      : styles.highLevel
                  }`}
                >
                  {marketInsights.your_position.niveau_concurrence || "Modéré"}
                </span>
              </div>
              <div className={styles.positionStat}>
                <span className={styles.positionLabel}>Opportunités</span>
                <span className={styles.positionValue}>
                  {marketInsights.your_position.offres_compatibles ||
                    marketInsights.summary.total_opportunities}
                </span>
              </div>
            </div>

            {marketInsights.your_position.recommandations_strategiques &&
              marketInsights.your_position.recommandations_strategiques.length >
                0 && (
                <div className={styles.strategicAdvice}>
                  <div className={styles.adviceIcon}>
                    <HiLightBulb />
                  </div>
                  <p className={styles.adviceText}>
                    {
                      marketInsights.your_position
                        .recommandations_strategiques[0]
                    }
                  </p>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Footer du widget */}
      <div className={styles.widgetFooter}>
        <Link
          to="/recommendations?tab=insights"
          className={styles.viewMoreButton}
        >
          <span>Voir tous les insights</span>
          <HiArrowRight className={styles.buttonArrow} />
        </Link>
      </div>
    </div>
  );
};

export default MarketInsightsWidget;
