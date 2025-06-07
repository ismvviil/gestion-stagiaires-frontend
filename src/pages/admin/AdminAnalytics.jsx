// import React from 'react';
// import { 
//   LineChart, Line, AreaChart, Area, BarChart, Bar, 
//   XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
//   PieChart, Pie, Cell 
// } from 'recharts';
// import { HiTrendingUp, HiTrendingDown, HiUsers, HiOfficeBuilding } from 'react-icons/hi';
// import { useAdminStats } from '../../hooks/useAdminStats';
// import StatCard from '../../components/admin/StatCard';
// import styles from './AdminAnalytics.module.css';

// const AdminAnalytics = () => {
//   const {
//     statsGlobales,
//     evolution,
//     statsEntreprises,
//     statsSecteurs,
//     loading,
//     error
//   } = useAdminStats();

//   console.log('🔍 Données entreprises pour tableau:', statsEntreprises);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.loadingSpinner}></div>
//         <p>Chargement des analyses...</p>
//       </div>
//     );
//   }

//   // Calcul des tendances
//   const calculerTendance = (data, field) => {
//     if (!data || data.length < 2) return { value: 0, type: 'stable' };
    
//     const recent = data.slice(-2);
//     const ancien = recent[0][field] || 0;
//     const nouveau = recent[1][field] || 0;
    
//     if (ancien === 0) return { value: 0, type: 'stable' };
    
//     const pourcentage = ((nouveau - ancien) / ancien) * 100;
//     return {
//       value: Math.abs(pourcentage).toFixed(1),
//       type: pourcentage > 0 ? 'positive' : pourcentage < 0 ? 'negative' : 'stable'
//     };
//   };

//   const tendanceInscriptions = calculerTendance(evolution, 'nouvelles_inscriptions');
//   const tendanceOffres = calculerTendance(evolution, 'nouvelles_offres');
//   const tendanceCandidatures = calculerTendance(evolution, 'nouvelles_candidatures');

//   // Données pour graphiques avancés
//   const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
//   // Données de performance par mois
//   const performanceData = evolution.map(item => ({
//     mois: item.mois,
//     tauxConversion: item.nouvelles_candidatures > 0 
//       ? ((item.stages_commences / item.nouvelles_candidatures) * 100).toFixed(1)
//       : 0,
//     tauxReussite: item.stages_commences > 0
//       ? ((item.stages_termines / item.stages_commences) * 100).toFixed(1)
//       : 0
//   }));

//   return (
//     <div className={styles.analyticsContainer}>
//       {/* Header */}
//       <div className={styles.header}>
//         <h1 className={styles.title}>Analyses Avancées</h1>
//         <p className={styles.subtitle}>
//           Tendances et insights détaillés de la plateforme
//         </p>
//       </div>

//       {/* KPIs de tendances */}
//       <div className={styles.trendsGrid}>
//         <StatCard
//           title="Croissance Inscriptions"
//           value={`${tendanceInscriptions.value}%`}
//           changeType={tendanceInscriptions.type}
//           icon={HiUsers}
//           color={tendanceInscriptions.type === 'positive' ? 'green' : 'red'}
//           description="Évolution mensuelle"
//         />
        
//         <StatCard
//           title="Croissance Offres"
//           value={`${tendanceOffres.value}%`}
//           changeType={tendanceOffres.type}
//           icon={HiOfficeBuilding}
//           color={tendanceOffres.type === 'positive' ? 'green' : 'red'}
//           description="Évolution mensuelle"
//         />
        
//         <StatCard
//           title="Croissance Candidatures"
//           value={`${tendanceCandidatures.value}%`}
//           changeType={tendanceCandidatures.type}
//           icon={HiTrendingUp}
//           color={tendanceCandidatures.type === 'positive' ? 'green' : 'red'}
//           description="Évolution mensuelle"
//         />
//       </div>

//       {/* Graphiques d'analyse */}
//       <div className={styles.chartsGrid}>
        
//         {/* Taux de conversion et réussite */}
//         {/* <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Taux de Performance</h2>
//             <p className={styles.chartSubtitle}>Conversion candidatures → stages et taux de réussite</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={performanceData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{
//                     backgroundColor: '#fff',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '6px'
//                   }}
//                   formatter={(value, name) => [`${value}%`, name]}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="tauxConversion"
//                   stroke="#3B82F6"
//                   strokeWidth={3}
//                   dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
//                   name="Taux de conversion"
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="tauxReussite"
//                   stroke="#10B981"
//                   strokeWidth={3}
//                   dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
//                   name="Taux de réussite"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div> */}

//         {/* Évolution détaillée */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Évolution Détaillée</h2>
//             <p className={styles.chartSubtitle}>Toutes les métriques sur 12 mois</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={evolution}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{
//                     backgroundColor: '#fff',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '6px'
//                   }}
//                 />
//                 <Legend />
//                 <Area
//                   type="monotone"
//                   dataKey="nouvelles_inscriptions"
//                   stackId="1"
//                   stroke="#3B82F6"
//                   fill="#3B82F6"
//                   fillOpacity={0.7}
//                   name="Inscriptions"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="nouvelles_candidatures"
//                   stackId="1"
//                   stroke="#10B981"
//                   fill="#10B981"
//                   fillOpacity={0.7}
//                   name="Candidatures"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="stages_commences"
//                   stackId="1"
//                   stroke="#F59E0B"
//                   fill="#F59E0B"
//                   fillOpacity={0.7}
//                   name="Stages commencés"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Distribution des secteurs avec plus de détails */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Analyse par Secteurs</h2>
//             <p className={styles.chartSubtitle}>Performance détaillée par domaine d'activité</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={statsSecteurs}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="secteur" 
//                   angle={-45}
//                   textAnchor="end"
//                   height={80}
//                   tick={{ fontSize: 10 }}
//                 />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip 
//                   contentStyle={{
//                     backgroundColor: '#fff',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '6px'
//                   }}
//                 />
//                 <Legend />
//                 <Bar dataKey="nombre_entreprises" fill="#3B82F6" name="Entreprises" />
//                 <Bar dataKey="nombre_offres" fill="#10B981" name="Offres" />
//                 <Bar dataKey="nombre_stages" fill="#F59E0B" name="Stages" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Tableau de performance des entreprises */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Top Entreprises Performance</h2>
//             <p className={styles.chartSubtitle}>Classement par efficacité</p>
//           </div>
//           <div className={styles.tableWrapper}>
//             <table className={styles.performanceTable}>
//               <thead>
//                 <tr>
//                   <th>Rang</th>
//                   <th>Entreprise</th>
//                   <th>Secteur</th>
//                   <th>Stages</th>
//                   <th>Note Moy.</th>
//                   <th>Performance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {statsEntreprises.slice(0, 10).map((enterprise, index) => (
//                   <tr key={enterprise.entreprise_id}>
//                     <td className={styles.rank}>#{index + 1}</td>
//                     <td className={styles.enterpriseName}>
//                       {enterprise.nom_entreprise}
//                     </td>
//                     <td className={styles.sector}>{enterprise.secteur}</td>
//                     <td className={styles.stages}>{enterprise.nombre_stages_encadres}</td>
//                     <td className={styles.rating}>
//                       {enterprise.note_moyenne_evaluations 
//                         ? `${enterprise.note_moyenne_evaluations.toFixed(1)}/10`
//                         : 'N/A'
//                       }
//                     </td>
//                     <td>
//                       <div className={styles.performanceBar}>
//                         <div 
//                           className={styles.performanceFill}
//                           style={{ 
//                             width: `${Math.min((enterprise.nombre_stages_encadres / Math.max(...statsEntreprises.map(e => e.nombre_stages_encadres))) * 100, 100)}%` 
//                           }}
//                         ></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Insights et recommandations */}
//       <div className={styles.insightsSection}>
//         <h2 className={styles.sectionTitle}>Insights & Recommandations</h2>
//         <div className={styles.insightsGrid}>
//           <div className={styles.insightCard}>
//             <h3>🎯 Taux de Réussite</h3>
//             <p>
//               Avec {statsGlobales?.taux_completion_stages}% de stages terminés avec succès, 
//               la plateforme montre d'excellentes performances.
//             </p>
//           </div>
          
//           <div className={styles.insightCard}>
//             <h3>📈 Croissance</h3>
//             <p>
//               La tendance des inscriptions est {tendanceInscriptions.type === 'positive' ? 'positive' : 'négative'}, 
//               indiquant {tendanceInscriptions.type === 'positive' ? 'une expansion' : 'un ralentissement'} de la plateforme.
//             </p>
//           </div>
          
//           <div className={styles.insightCard}>
//             <h3>🏢 Secteurs Performants</h3>
//             <p>
//               Le secteur "{statsSecteurs?.[0]?.secteur}" domine avec {statsSecteurs?.[0]?.nombre_entreprises} entreprises.
//               Considérez développer ce segment.
//             </p>
//           </div>
          
//           <div className={styles.insightCard}>
//             <h3>⭐ Qualité</h3>
//             <p>
//               Note moyenne de {statsGlobales?.note_moyenne_globale}/10 indique 
//               {statsGlobales?.note_moyenne_globale >= 8 ? 'une excellente' : 
//                statsGlobales?.note_moyenne_globale >= 6 ? 'une bonne' : 'une qualité à améliorer'} 
//               satisfaction des stages.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAnalytics;

import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart
} from 'recharts';
import { 
  HiTrendingUp, HiTrendingDown, HiUsers, HiOfficeBuilding,
  HiFilter, HiDownload, HiRefresh, HiChartBar, HiEye,
  HiCalendar, HiStar, HiAcademicCap, HiClipboardList
} from 'react-icons/hi';
import { useAdminStats } from '../../hooks/useAdminStats';
import StatCard from '../../components/admin/StatCard';
import styles from './AdminAnalytics.module.css';

const AdminAnalytics = () => {
  const {
    statsGlobales,
    evolution,
    statsEntreprises,
    statsSecteurs,
    loading,
    error
  } = useAdminStats();

  const [selectedPeriod, setSelectedPeriod] = useState('12mois');
  const [selectedChart, setSelectedChart] = useState('evolution');
  const [showInsights, setShowInsights] = useState(true);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
        <p className={styles.loadingText}>Chargement des analyses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>📊</div>
        <h3 className={styles.errorTitle}>Erreur de chargement des analyses</h3>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={() => window.location.reload()}>
          <HiRefresh className={styles.retryIcon} />
          Réessayer
        </button>
      </div>
    );
  }

  // Calcul des tendances
  const calculerTendance = (data, field) => {
    if (!data || data.length < 2) return { value: 0, type: 'stable' };
    
    const recent = data.slice(-2);
    const ancien = recent[0][field] || 0;
    const nouveau = recent[1][field] || 0;
    
    if (ancien === 0) return { value: 0, type: 'stable' };
    
    const pourcentage = ((nouveau - ancien) / ancien) * 100;
    return {
      value: Math.abs(pourcentage).toFixed(1),
      type: pourcentage > 0 ? 'positive' : pourcentage < 0 ? 'negative' : 'stable'
    };
  };

  const tendanceInscriptions = calculerTendance(evolution, 'nouvelles_inscriptions');
  const tendanceOffres = calculerTendance(evolution, 'nouvelles_offres');
  const tendanceCandidatures = calculerTendance(evolution, 'nouvelles_candidatures');
  const tendanceStages = calculerTendance(evolution, 'stages_commences');

  // Données pour graphiques avancés
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
  // Données de performance par mois
  const performanceData = evolution?.map(item => ({
    mois: item.mois.substring(5), // Garder seulement MM
    tauxConversion: item.nouvelles_candidatures > 0 
      ? ((item.stages_commences / item.nouvelles_candidatures) * 100).toFixed(1)
      : 0,
    tauxReussite: item.stages_commences > 0
      ? ((item.stages_termines / item.stages_commences) * 100).toFixed(1)
      : 0,
    activite: item.nouvelles_inscriptions + item.nouvelles_candidatures + item.nouvelles_offres
  })) || [];

  // Données des secteurs avec couleurs
  const secteursAvecCouleurs = statsSecteurs?.map((secteur, index) => ({
    ...secteur,
    fill: chartColors[index % chartColors.length]
  })) || [];

  const exportData = () => {
    console.log('Export des données analytiques...');
  };

  return (
    <div className={styles.analyticsContainer}>
      {/* Header amélioré */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>📊</span>
              Analyses Avancées
            </h1>
            <p className={styles.subtitle}>
              Tendances et insights détaillés de la plateforme
            </p>
          </div>
          
          <div className={styles.headerActions}>
            {/* <select 
              className={styles.periodSelector}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="1mois">Dernier mois</option>
              <option value="3mois">3 derniers mois</option>
              <option value="6mois">6 derniers mois</option>
              <option value="12mois">12 derniers mois</option>
            </select>
            
            <button className={styles.actionButton} onClick={exportData}>
              <HiDownload className={styles.actionIcon} />
              <span className={styles.actionText}>Exporter</span>
            </button> */}
            
            {/* <button 
              className={`${styles.actionButton} ${showInsights ? styles.actionButtonActive : ''}`}
              onClick={() => setShowInsights(!showInsights)}
            >
              <HiEye className={styles.actionIcon} />
              <span className={styles.actionText}>Insights</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* KPIs de tendances améliorés */}
      <div className={styles.trendsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tendances Clés</h2>
          <p className={styles.sectionSubtitle}>Évolution des métriques principales</p>
        </div>
        
        <div className={styles.trendsGrid}>
          <StatCard
            title="Croissance Inscriptions"
            value={`${tendanceInscriptions.value}%`}
            change={tendanceInscriptions.value}
            changeType={tendanceInscriptions.type}
            icon={HiUsers}
            color={tendanceInscriptions.type === 'positive' ? 'green' : tendanceInscriptions.type === 'negative' ? 'red' : 'blue'}
            description="Évolution mensuelle"
            loading={loading}
          />
          
          <StatCard
            title="Croissance Offres"
            value={`${tendanceOffres.value}%`}
            change={tendanceOffres.value}
            changeType={tendanceOffres.type}
            icon={HiClipboardList}
            color={tendanceOffres.type === 'positive' ? 'green' : tendanceOffres.type === 'negative' ? 'red' : 'blue'}
            description="Évolution mensuelle"
            loading={loading}
          />
          
          <StatCard
            title="Croissance Candidatures"
            value={`${tendanceCandidatures.value}%`}
            change={tendanceCandidatures.value}
            changeType={tendanceCandidatures.type}
            icon={HiTrendingUp}
            color={tendanceCandidatures.type === 'positive' ? 'green' : tendanceCandidatures.type === 'negative' ? 'red' : 'blue'}
            description="Évolution mensuelle"
            loading={loading}
          />
          
          <StatCard
            title="Croissance Stages"
            value={`${tendanceStages.value}%`}
            change={tendanceStages.value}
            changeType={tendanceStages.type}
            icon={HiAcademicCap}
            color={tendanceStages.type === 'positive' ? 'green' : tendanceStages.type === 'negative' ? 'red' : 'blue'}
            description="Évolution mensuelle"
            loading={loading}
          />
        </div>
      </div>

      {/* Navigation des graphiques */}
      <div className={styles.chartsNavigation}>
        <div className={styles.chartTabs}>
          <button 
            className={`${styles.chartTab} ${selectedChart === 'evolution' ? styles.chartTabActive : ''}`}
            onClick={() => setSelectedChart('evolution')}
          >
            <HiChartBar className={styles.tabIcon} />
            Évolution
          </button>
          <button 
            className={`${styles.chartTab} ${selectedChart === 'performance' ? styles.chartTabActive : ''}`}
            onClick={() => setSelectedChart('performance')}
          >
            <HiTrendingUp className={styles.tabIcon} />
            Performance
          </button>
          <button 
            className={`${styles.chartTab} ${selectedChart === 'secteurs' ? styles.chartTabActive : ''}`}
            onClick={() => setSelectedChart('secteurs')}
          >
            <HiOfficeBuilding className={styles.tabIcon} />
            Secteurs
          </button>
        </div>
      </div>

      {/* Graphiques d'analyse */}
      <div className={styles.chartsSection}>
        {selectedChart === 'evolution' && (
          <div className={styles.chartGrid}>
            {/* Évolution détaillée */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleGroup}>
                  <h3 className={styles.chartTitle}>Évolution Temporelle</h3>
                  <p className={styles.chartSubtitle}>Toutes les métriques sur 12 mois</p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={evolution}>
                    <defs>
                      <linearGradient id="colorInscriptions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorCandidatures" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorStages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="mois" 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="nouvelles_inscriptions"
                      stroke="#3B82F6"
                      fill="url(#colorInscriptions)"
                      strokeWidth={2}
                      name="Inscriptions"
                    />
                    <Area
                      type="monotone"
                      dataKey="nouvelles_candidatures"
                      stroke="#10B981"
                      fill="url(#colorCandidatures)"
                      strokeWidth={2}
                      name="Candidatures"
                    />
                    <Area
                      type="monotone"
                      dataKey="stages_commences"
                      stroke="#F59E0B"
                      fill="url(#colorStages)"
                      strokeWidth={2}
                      name="Stages commencés"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphique combiné activité */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleGroup}>
                  <h3 className={styles.chartTitle}>Activité Globale</h3>
                  <p className={styles.chartSubtitle}>Vue d'ensemble des activités mensuelles</p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="mois" 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="activite" 
                      fill="#E0E7FF" 
                      name="Activité totale"
                      opacity={0.7}
                    />
                    <Line
                      type="monotone"
                      dataKey="tauxConversion"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                      name="Taux conversion (%)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {selectedChart === 'performance' && (
          <div className={styles.chartGrid}>
            {/* Taux de performance */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleGroup}>
                  <h3 className={styles.chartTitle}>Taux de Performance</h3>
                  <p className={styles.chartSubtitle}>Conversion et réussite des stages</p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="mois" 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px'
                      }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tauxConversion"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                      name="Taux de conversion"
                    />
                    <Line
                      type="monotone"
                      dataKey="tauxReussite"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                      name="Taux de réussite"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tableau performance entreprises */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleGroup}>
                  <h3 className={styles.chartTitle}>Top Entreprises</h3>
                  <p className={styles.chartSubtitle}>Classement par performance</p>
                </div>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.performanceTable}>
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Entreprise</th>
                      <th>Secteur</th>
                      <th>Stages</th>
                      <th>Note</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statsEntreprises?.slice(0, 8).map((enterprise, index) => (
                      <tr key={enterprise.entreprise_id || index}>
                        <td className={styles.rank}>
                          <span className={styles.rankBadge}>#{index + 1}</span>
                        </td>
                        <td className={styles.enterpriseName}>
                          <div className={styles.enterpriseInfo}>
                            <div className={styles.enterpriseAvatar}>
                              {enterprise.nom_entreprise?.charAt(0) || 'E'}
                            </div>
                            <span>{enterprise.nom_entreprise}</span>
                          </div>
                        </td>
                        <td className={styles.sector}>
                          <span className={styles.sectorBadge}>
                            {enterprise.secteur}
                          </span>
                        </td>
                        <td className={styles.stages}>
                          <strong>{enterprise.nombre_stages_encadres || 0}</strong>
                        </td>
                        <td className={styles.rating}>
                          <div className={styles.ratingContainer}>
                            <HiStar className={styles.starIcon} />
                            <span>
                              {enterprise.note_moyenne_evaluations 
                                ? `${enterprise.note_moyenne_evaluations.toFixed(1)}`
                                : 'N/A'
                              }
                            </span>
                          </div>
                        </td>
                        <td className={styles.performanceCell}>
                          <div className={styles.performanceBar}>
                            <div 
                              className={styles.performanceFill}
                              style={{ 
                                width: `${Math.min((enterprise.nombre_stages_encadres / Math.max(...statsEntreprises.map(e => e.nombre_stages_encadres || 0))) * 100 || 0, 100)}%` 
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    )) || []}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedChart === 'secteurs' && (
          <div className={styles.chartGrid}>
            {/* Analyse par secteurs */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleGroup}>
                  <h3 className={styles.chartTitle}>Analyse par Secteurs</h3>
                  <p className={styles.chartSubtitle}>Performance détaillée par domaine</p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={statsSecteurs}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="secteur" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      axisLine={{ stroke: '#e2e8f0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="nombre_entreprises" 
                      fill="#3B82F6" 
                      name="Entreprises"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="nombre_offres" 
                      fill="#10B981" 
                      name="Offres"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="nombre_stages" 
                      fill="#F59E0B" 
                      name="Stages"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution des secteurs en pie chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleGroup}>
                  <h3 className={styles.chartTitle}>Distribution des Secteurs</h3>
                  <p className={styles.chartSubtitle}>Répartition des entreprises</p>
                </div>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={secteursAvecCouleurs}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="nombre_entreprises"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {secteursAvecCouleurs.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Insights et recommandations */}
      {showInsights && (
        <div className={styles.insightsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Insights & Recommandations</h2>
            <p className={styles.sectionSubtitle}>Analyses automatiques et conseils</p>
          </div>
          
          <div className={styles.insightsGrid}>
            <div className={styles.insightCard}>
              <div className={styles.insightHeader}>
                <div className={styles.insightIcon}>🎯</div>
                <h3 className={styles.insightTitle}>Taux de Réussite</h3>
              </div>
              <p className={styles.insightText}>
                Avec {statsGlobales?.taux_completion_stages}% de stages terminés avec succès, 
                la plateforme montre d'excellentes performances.
              </p>
              <div className={styles.insightMetric}>
                <span className={styles.metricValue}>{statsGlobales?.taux_completion_stages}%</span>
                <span className={styles.metricLabel}>de réussite</span>
              </div>
            </div>
            
            <div className={styles.insightCard}>
              <div className={styles.insightHeader}>
                <div className={styles.insightIcon}>
                  {tendanceInscriptions.type === 'positive' ? '📈' : '📉'}
                </div>
                <h3 className={styles.insightTitle}>Croissance</h3>
              </div>
              <p className={styles.insightText}>
                La tendance des inscriptions est {tendanceInscriptions.type === 'positive' ? 'positive' : 'négative'}, 
                indiquant {tendanceInscriptions.type === 'positive' ? 'une expansion' : 'un ralentissement'} de la plateforme.
              </p>
              <div className={styles.insightMetric}>
                <span className={`${styles.metricValue} ${tendanceInscriptions.type === 'positive' ? styles.positive : styles.negative}`}>
                  {tendanceInscriptions.type === 'positive' ? '+' : ''}{tendanceInscriptions.value}%
                </span>
                <span className={styles.metricLabel}>ce mois</span>
              </div>
            </div>
            
            <div className={styles.insightCard}>
              <div className={styles.insightHeader}>
                <div className={styles.insightIcon}>🏢</div>
                <h3 className={styles.insightTitle}>Secteurs Performants</h3>
              </div>
              <p className={styles.insightText}>
                Le secteur "{statsSecteurs?.[0]?.secteur}" domine avec {statsSecteurs?.[0]?.nombre_entreprises} entreprises.
                Considérez développer ce segment.
              </p>
              <div className={styles.insightMetric}>
                <span className={styles.metricValue}>{statsSecteurs?.[0]?.nombre_entreprises}</span>
                <span className={styles.metricLabel}>entreprises</span>
              </div>
            </div>
            
            <div className={styles.insightCard}>
              <div className={styles.insightHeader}>
                <div className={styles.insightIcon}>⭐</div>
                <h3 className={styles.insightTitle}>Qualité</h3>
              </div>
              <p className={styles.insightText}>
                Note moyenne de {statsGlobales?.note_moyenne_globale?.toFixed(1)}/10 indique 
                {statsGlobales?.note_moyenne_globale >= 8 ? ' une excellente' : 
                 statsGlobales?.note_moyenne_globale >= 6 ? ' une bonne' : ' une qualité à améliorer'} 
                satisfaction des stages.
              </p>
              <div className={styles.insightMetric}>
                <span className={styles.metricValue}>{statsGlobales?.note_moyenne_globale?.toFixed(1)}</span>
                <span className={styles.metricLabel}>/10</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;