// src/components/stagiaires/MarketInsightsDashboard.jsx - VERSION COMPLÈTE
import React from 'react';
import { 
  HiTrendingUp, 
  HiOfficeBuilding, 
  HiSparkles, 
  HiStar,
  HiChartBar,
  HiLocationMarker,
  HiClock,
  HiUsers,
  HiLightBulb,
  HiExclamation,
  HiCheckCircle
} from 'react-icons/hi';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import styles from './MarketInsightsDashboard.module.css';

const MarketInsightsDashboard = ({ marketInsights }) => {
  if (!marketInsights) {
    return (
      <div className={styles.loadingContainer}>
        <HiChartBar className={styles.loadingIcon} />
        <p>Chargement des insights marché...</p>
      </div>
    );
  }

  // Couleurs pour les graphiques
  const COLORS = {
    primary: '#3b82f6',
    success: '#10b981', 
    warning: '#f59e0b',
    danger: '#ef4444',
    purple: '#8b5cf6',
    teal: '#14b8a6'
  };

  const CHART_COLORS = [COLORS.primary, COLORS.success, COLORS.warning, COLORS.purple, COLORS.teal];

  // Préparer les données pour les graphiques
  const sectorsData = marketInsights.market_overview.secteurs_populaires.slice(0, 8).map(item => ({
    name: item.secteur.length > 15 ? item.secteur.substring(0, 15) + '...' : item.secteur,
    value: item.nombre_offres,
    fullName: item.secteur
  }));

  const competencesData = marketInsights.competences_demand.competences_les_plus_demandees.slice(0, 10).map(item => ({
    name: item.competence,
    popularite: item.popularite,
    nombre_offres: item.nombre_offres
  }));

  const locationsData = marketInsights.market_overview.localisations_populaires.slice(0, 6).map(item => ({
    name: item.ville,
    value: item.nombre_offres
  }));

  return (
    <div className={styles.insightsDashboard}>
      {/* Vue d'ensemble */}
      <div className={styles.overviewSection}>
        <div className={styles.sectionHeader}>
          <HiTrendingUp className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Vue d'ensemble du marché</h2>
        </div>
        
        <div className={styles.overviewGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiOfficeBuilding />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {marketInsights.market_overview.stats_generales.total_offres_actives}
              </div>
              <div className={styles.statLabel}>Offres actives</div>
              <div className={styles.statDescription}>Opportunités disponibles</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiUsers />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {marketInsights.market_overview.stats_generales.total_candidatures}
              </div>
              <div className={styles.statLabel}>Candidatures</div>
              <div className={styles.statDescription}>Demandes soumises</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiChartBar />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {marketInsights.market_overview.stats_generales.taux_candidature_moyen}%
              </div>
              <div className={styles.statLabel}>Taux moyen</div>
              <div className={styles.statDescription}>Candidatures par offre</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <HiSparkles />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {marketInsights.summary.most_demanded_skill}
              </div>
              <div className={styles.statLabel}>Top compétence</div>
              <div className={styles.statDescription}>La plus demandée</div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className={styles.chartsSection}>
        <div className={styles.chartsGrid}>
          {/* Secteurs populaires */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <HiOfficeBuilding className={styles.chartIcon} />
              <h3 className={styles.chartTitle}>Secteurs les plus demandés</h3>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name, props) => [value + ' offres', props.payload.fullName]}
                  />
                  <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Compétences demandées */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <HiSparkles className={styles.chartIcon} />
              <h3 className={styles.chartTitle}>Compétences les plus recherchées</h3>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competencesData} layout="horizontal" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [value + '%', 'Popularité']}
                  />
                  <Bar dataKey="popularite" fill={COLORS.success} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Localisations populaires */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <HiLocationMarker className={styles.chartIcon} />
              <h3 className={styles.chartTitle}>Villes avec le plus d'offres</h3>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={locationsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {locationsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [value + ' offres', 'Nombre d\'offres']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Types de stages */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <HiClock className={styles.chartIcon} />
              <h3 className={styles.chartTitle}>Types de stages populaires</h3>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketInsights.market_overview.types_stages} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="type" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [value + ' offres', 'Nombre d\'offres']}
                  />
                  <Bar dataKey="nombre_offres" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Votre position sur le marché */}
      <div className={styles.positionSection}>
        <div className={styles.sectionHeader}>
          <HiStar className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Votre position sur le marché</h2>
        </div>
        
        <div className={styles.positionGrid}>
          <div className={styles.positionCard}>
            <div className={styles.positionHeader}>
              <HiChartBar className={styles.positionIcon} />
              <h3 className={styles.positionTitle}>Score de compétitivité</h3>
            </div>
            <div className={styles.positionContent}>
              <div className={styles.competitivityScore}>
                <div className={styles.scoreCircle}>
                  <div className={styles.scoreNumber}>
                    {marketInsights.your_position.score_competitivite || 'N/A'}
                    {marketInsights.your_position.score_competitivite && '%'}
                  </div>
                  <div className={styles.scoreLabel}>Compétitivité</div>
                </div>
                <div className={styles.scoreInterpretation}>
                  {marketInsights.your_position.score_competitivite >= 80 && (
                    <div className={styles.excellentScore}>
                      <HiCheckCircle />
                      <span>Excellent positionnement</span>
                    </div>
                  )}
                  {marketInsights.your_position.score_competitivite >= 60 && marketInsights.your_position.score_competitivite < 80 && (
                    <div className={styles.goodScore}>
                      <HiTrendingUp />
                      <span>Bon positionnement</span>
                    </div>
                  )}
                  {marketInsights.your_position.score_competitivite < 60 && (
                    <div className={styles.improvementScore}>
                      <HiExclamation />
                      <span>Amélioration possible</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.positionCard}>
            <div className={styles.positionHeader}>
              <HiUsers className={styles.positionIcon} />
              <h3 className={styles.positionTitle}>Analyse concurrentielle</h3>
            </div>
            <div className={styles.positionContent}>
              <div className={styles.competitionStats}>
                <div className={styles.competitionItem}>
                  <span className={styles.competitionLabel}>Profils similaires</span>
                  <span className={styles.competitionValue}>
                    {marketInsights.your_position.profils_similaires_count || 0}
                  </span>
                </div>
                <div className={styles.competitionItem}>
                  <span className={styles.competitionLabel}>Offres compatibles</span>
                  <span className={styles.competitionValue}>
                    {marketInsights.your_position.offres_compatibles || marketInsights.summary.total_opportunities}
                  </span>
                </div>
                <div className={styles.competitionItem}>
                  <span className={styles.competitionLabel}>Niveau de concurrence</span>
                  <span className={`${styles.competitionValue} ${
                    marketInsights.your_position.niveau_concurrence === 'Faible' ? styles.lowCompetition :
                    marketInsights.your_position.niveau_concurrence === 'Modéré' ? styles.moderateCompetition :
                    styles.highCompetition
                  }`}>
                    {marketInsights.your_position.niveau_concurrence || 'Modéré'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.positionCard}>
            <div className={styles.positionHeader}>
              <HiSparkles className={styles.positionIcon} />
              <h3 className={styles.positionTitle}>Vos avantages uniques</h3>
            </div>
            <div className={styles.positionContent}>
              {marketInsights.your_position.competences_uniques && marketInsights.your_position.competences_uniques.length > 0 ? (
                <div className={styles.uniqueSkills}>
                  {marketInsights.your_position.competences_uniques.map((skill, index) => (
                    <span key={index} className={styles.uniqueSkillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className={styles.noUniqueSkills}>
                  <HiLightBulb className={styles.noSkillsIcon} />
                  <p>Développez des compétences uniques pour vous démarquer</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conseils stratégiques */}
      <div className={styles.adviceSection}>
        <div className={styles.sectionHeader}>
          <HiLightBulb className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Conseils stratégiques</h2>
        </div>
        
        <div className={styles.adviceGrid}>
          {marketInsights.your_position.recommandations_strategiques && 
           marketInsights.your_position.recommandations_strategiques.map((advice, index) => (
            <div key={index} className={styles.adviceCard}>
              <div className={styles.adviceIcon}>
                {index === 0 && <HiStar />}
                {index === 1 && <HiTrendingUp />}
                {index === 2 && <HiSparkles />}
                {index > 2 && <HiLightBulb />}
              </div>
              <div className={styles.adviceContent}>
                <p className={styles.adviceText}>{advice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tendances du marché */}
      <div className={styles.trendsSection}>
        <div className={styles.sectionHeader}>
          <HiTrendingUp className={styles.sectionIcon} />
          <h2 className={styles.sectionTitle}>Tendances du marché</h2>
        </div>
        
        <div className={styles.trendsGrid}>
          <div className={styles.trendCard}>
            <div className={styles.trendHeader}>
              <HiOfficeBuilding className={styles.trendIcon} />
              <h3 className={styles.trendTitle}>Secteurs en croissance</h3>
            </div>
            <div className={styles.trendList}>
              {['Tech', 'E-commerce', 'Digital', 'Data Science', 'IA'].map((sector, index) => (
                <span key={index} className={styles.trendTag}>
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.trendCard}>
            <div className={styles.trendHeader}>
              <HiSparkles className={styles.trendIcon} />
              <h3 className={styles.trendTitle}>Compétences émergentes</h3>
            </div>
            <div className={styles.trendList}>
              {['Intelligence Artificielle', 'Cybersécurité', 'Cloud Computing', 'DevOps'].map((skill, index) => (
                <span key={index} className={styles.trendTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.trendCard}>
            <div className={styles.trendHeader}>
              <HiClock className={styles.trendIcon} />
              <h3 className={styles.trendTitle}>Formats populaires</h3>
            </div>
            <div className={styles.trendList}>
              {['Télétravail', 'Hybride', 'Stage long (6 mois+)', 'Stage projet'].map((format, index) => (
                <span key={index} className={styles.trendTag}>
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsightsDashboard;