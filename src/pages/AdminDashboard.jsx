// import React from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
//   AreaChart, Area
// } from 'recharts';
// import {
//   HiUsers, HiOfficeBuilding, HiDocumentText, HiClipboardList,
//   HiChartBar, HiAcademicCap, HiTrendingUp, HiStar
// } from 'react-icons/hi';
// // import StatCard from '../../components/admin/StatCard';
// // import { useAdminStats } from '../hooks/useAdminStats';
// import styles from './AdminDashboard.module.css';
// import StatCard from '../components/admin/StatCard';
// import { useAdminStats } from '../hooks/useAdminStats';
// const AdminDashboard = () => {
//   const {
//     statsGlobales,
//     evolution,
//     statsEntreprises,
//     statsSecteurs,
//     loading,
//     error
//   } = useAdminStats();

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.loadingSpinner}></div>
//         <p className={styles.loadingText}>Chargement des statistiques...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <p className={styles.errorText}>Erreur: {error}</p>
//         <button className={styles.retryButton} onClick={() => window.location.reload()}>
//           Réessayer
//         </button>
//       </div>
//     );
//   }

//   // Données pour les graphiques
//   const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

//   // Transformation des données pour le graphique sectoriel
//   const secteurData = statsSecteurs?.map((secteur, index) => ({
//     name: secteur.secteur,
//     value: secteur.nombre_entreprises,
//     fill: chartColors[index % chartColors.length]
//   })) || [];

//   return (
//     <div className={styles.dashboardContainer}>
//       {/* Header */}
//       <div className={styles.dashboardHeader}>
//         <h1 className={styles.dashboardTitle}>Tableau de Bord Administration</h1>
//         <p className={styles.dashboardSubtitle}>
//           Vue d'ensemble de la plateforme de gestion des stagiaires
//         </p>
//       </div>

//       {/* KPIs Principaux */}
//       <div className={styles.statsGrid}>
//         <StatCard
//           title="Total Utilisateurs"
//           value={statsGlobales?.nombre_total_utilisateurs}
//           icon={HiUsers}
//           color="blue"
//           description="Tous les types d'utilisateurs"
//         />
//         <StatCard
//           title="Stagiaires"
//           value={statsGlobales?.nombre_stagiaires}
//           icon={HiAcademicCap}
//           color="green"
//           description="Utilisateurs stagiaires actifs"
//         />
//         <StatCard
//           title="Entreprises"
//           value={statsGlobales?.nombre_entreprises}
//           icon={HiOfficeBuilding}
//           color="purple"
//           description={`${statsGlobales?.entreprises_actives} actives`}
//         />
//         <StatCard
//           title="Stages Terminés"
//           value={statsGlobales?.nombre_stages_termines}
//           icon={HiChartBar}
//           color="yellow"
//           description={`Taux: ${statsGlobales?.taux_completion_stages}%`}
//         />
//         <StatCard
//           title="Candidatures"
//           value={statsGlobales?.nombre_candidatures_total}
//           icon={HiClipboardList}
//           color="indigo"
//           description={`${statsGlobales?.nombre_candidatures_acceptees} acceptées`}
//         />
//         <StatCard
//           title="Note Moyenne"
//           value={statsGlobales?.note_moyenne_globale ? `${statsGlobales.note_moyenne_globale}/10` : 'N/A'}
//           icon={HiStar}
//           color="red"
//           description="Moyenne des évaluations"
//         />
//       </div>

//       {/* Graphiques */}
//       <div className={styles.chartsContainer}>
//         {/* Évolution temporelle */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Évolution sur 12 mois</h2>
//             <p className={styles.chartSubtitle}>Tendances des inscriptions et activités</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={evolution}>
//                 <CartesianGrid strokeDasharray="3 3" className={styles.chartGrid} />
//                 <XAxis 
//                   dataKey="mois" 
//                   className={styles.chartAxis}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <YAxis className={styles.chartAxis} tick={{ fontSize: 12 }} />
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
//                   fillOpacity={0.6}
//                   name="Nouvelles inscriptions"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="nouvelles_offres"
//                   stackId="1"
//                   stroke="#10B981"
//                   fill="#10B981"
//                   fillOpacity={0.6}
//                   name="Nouvelles offres"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="stages_termines"
//                   stackId="1"
//                   stroke="#F59E0B"
//                   fill="#F59E0B"
//                   fillOpacity={0.6}
//                   name="Stages terminés"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Performance des entreprises */}
//         {/* <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Top 10 Entreprises</h2>
//             <p className={styles.chartSubtitle}>Classement par nombre de stages encadrés</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={statsEntreprises?.slice(0, 10)} layout="horizontal">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" tick={{ fontSize: 11 }} />
//                 <YAxis 
//                   dataKey="nom_entreprise" 
//                   type="category" 
//                   width={120}
//                   tick={{ fontSize: 10 }}
//                 />
//                 <Tooltip 
//                   contentStyle={{
//                     backgroundColor: '#fff',
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '6px'
//                   }}
//                 />
//                 <Bar dataKey="nombre_stages_encadres" fill="#3B82F6" name="Stages encadrés" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div> */}
//         {/* Activité par mois */}
// <div className={styles.chartSection}>
//   <div className={styles.chartHeader}>
//     <h2 className={styles.chartTitle}>Activité Mensuelle</h2>
//     <p className={styles.chartSubtitle}>Nouvelles inscriptions et candidatures par mois</p>
//   </div>
//   <div className={styles.chartWrapper}>
//     <ResponsiveContainer width="100%" height={350}>
//       <LineChart data={evolution}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis 
//           dataKey="mois" 
//           tick={{ fontSize: 12 }}
//         />
//         <YAxis tick={{ fontSize: 12 }} />
//         <Tooltip 
//           contentStyle={{
//             backgroundColor: '#fff',
//             border: '1px solid #e5e7eb',
//             borderRadius: '6px'
//           }}
//         />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="nouvelles_inscriptions"
//           stroke="#3B82F6"
//           strokeWidth={3}
//           dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
//           name="Nouvelles inscriptions"
//         />
//         <Line
//           type="monotone"
//           dataKey="nouvelles_candidatures"
//           stroke="#10B981"
//           strokeWidth={3}
//           dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
//           name="Nouvelles candidatures"
//         />
//         <Line
//           type="monotone"
//           dataKey="nouvelles_offres"
//           stroke="#F59E0B"
//           strokeWidth={3}
//           dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
//           name="Nouvelles offres"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// </div>

//         {/* Répartition par secteurs */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Répartition par Secteurs</h2>
//             <p className={styles.chartSubtitle}>Distribution des entreprises par secteur d'activité</p>
//           </div>
//           <div className={styles.chartWrapper}>
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   data={secteurData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {secteurData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.fill} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Métriques de performance */}
//         <div className={styles.chartSection}>
//           <div className={styles.chartHeader}>
//             <h2 className={styles.chartTitle}>Métriques de Performance</h2>
//             <p className={styles.chartSubtitle}>Indicateurs clés de la plateforme</p>
//           </div>
//           <div className={styles.metricsGrid}>
//             <div className={styles.metricCard}>
//               <div className={styles.metricValue}>
//                 {statsGlobales?.taux_acceptation_candidatures || 0}%
//               </div>
//               <div className={styles.metricLabel}>Taux d'acceptation</div>
//               <div className={styles.metricDescription}>Candidatures acceptées</div>
//             </div>
            
//             <div className={styles.metricCard}>
//               <div className={styles.metricValue}>
//                 {statsGlobales?.taux_completion_stages || 0}%
//               </div>
//               <div className={styles.metricLabel}>Taux de completion</div>
//               <div className={styles.metricDescription}>Stages terminés avec succès</div>
//             </div>
            
//             <div className={styles.metricCard}>
//               <div className={styles.metricValue}>
//                 {statsGlobales?.nombre_offres_actives || 0}
//               </div>
//               <div className={styles.metricLabel}>Offres actives</div>
//               <div className={styles.metricDescription}>Postes ouverts actuellement</div>
//             </div>
            
//             <div className={styles.metricCard}>
//               <div className={styles.metricValue}>
//                 {statsGlobales?.nombre_certificats_generes || 0}
//               </div>
//               <div className={styles.metricLabel}>Certificats générés</div>
//               <div className={styles.metricDescription}>Attestations de fin de stage</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer avec informations supplémentaires */}
//       <div className={styles.dashboardFooter}>
//         <div className={styles.footerStats}>
//           <div className={styles.footerStat}>
//             <span className={styles.footerStatLabel}>Dernière mise à jour:</span>
//             <span className={styles.footerStatValue}>
//               {new Date().toLocaleDateString('fr-FR')}
//             </span>
//           </div>
//           <div className={styles.footerStat}>
//             <span className={styles.footerStatLabel}>Total recruteurs:</span>
//             <span className={styles.footerStatValue}>
//               {statsGlobales?.nombre_recruteurs || 0}
//             </span>
//           </div>
//           <div className={styles.footerStat}>
//             <span className={styles.footerStatLabel}>Total RH:</span>
//             <span className={styles.footerStatValue}>
//               {statsGlobales?.nombre_rh || 0}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  HiUsers, HiOfficeBuilding, HiDocumentText, HiClipboardList,
  HiChartBar, HiAcademicCap, HiTrendingUp, HiStar, HiRefresh,
  HiDownload, HiFilter, HiViewGrid, HiCog, HiCheckCircle,
  HiBriefcase, HiAcademicCap as HiCertificate, HiChartPie,
  HiTrendingDown, HiShieldCheck, HiLightBulb
} from 'react-icons/hi';
import { 
  MdDashboard, MdBusinessCenter, MdTrendingUp, MdAssignment,
  MdVerifiedUser, MdAnalytics
} from 'react-icons/md';
import { 
  FaChartLine, FaUserTie, FaBuilding, FaCertificate,
  FaClipboardCheck, FaPercentage
} from 'react-icons/fa';
import StatCard from '../components/admin/StatCard';
import { useAdminStats } from '../hooks/useAdminStats';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const {
    statsGlobales,
    evolution,
    statsEntreprises,
    statsSecteurs,
    loading,
    error
  } = useAdminStats();

  const [selectedPeriod, setSelectedPeriod] = useState('12mois');
  const [autoRefresh, setAutoRefresh] = useState(true);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
        <p className={styles.loadingText}>Chargement des statistiques...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>
          <HiShieldCheck className="text-red-500 text-4xl" />
        </div>
        <h3 className={styles.errorTitle}>Erreur de chargement</h3>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={() => window.location.reload()}>
          <HiRefresh className={styles.retryIcon} />
          Réessayer
        </button>
      </div>
    );
  }

  // Données pour les graphiques
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Transformation des données pour le graphique sectoriel
  const secteurData = statsSecteurs?.map((secteur, index) => ({
    name: secteur.secteur,
    value: secteur.nombre_entreprises,
    fill: chartColors[index % chartColors.length]
  })) || [];

  return (
    <div className={styles.dashboardContainer}>
      {/* Header amélioré */}
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.dashboardTitle}>
              <MdDashboard className={styles.titleIcon} />
              Tableau de Bord Administration
            </h1>
            <p className={styles.dashboardSubtitle}>
              Vue d'ensemble de la plateforme de gestion des stagiaires
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
            </select> */}
            
            {/* <button className={styles.actionButton}>
              <HiDownload className={styles.actionIcon} />
              <span className={styles.actionText}>Exporter</span>
            </button> */}
            
            <button 
              className={`${styles.actionButton} ${autoRefresh ? styles.actionButtonActive : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <HiRefresh className={styles.actionIcon} />
              <span className={styles.actionText}>Auto-refresh</span>
            </button>
          </div>
        </div>
        
        {/* Status bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusItem}>
            <div className={styles.statusDot}></div>
            <span>Système opérationnel</span>
          </div>
          <div className={styles.statusItem}>
            <span>Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </div>

      {/* KPIs Principaux avec animations */}
      <div className={styles.statsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Indicateurs Clés</h2>
          <p className={styles.sectionSubtitle}>Métriques principales en temps réel</p>
        </div>
        
        <div className={styles.statsGrid}>
          <StatCard
            title="Total Utilisateurs"
            value={statsGlobales?.nombre_total_utilisateurs}
            icon={HiUsers}
            color="blue"
            description="Tous les types d'utilisateurs"
            loading={loading}
          />
          <StatCard
            title="Stagiaires"
            value={statsGlobales?.nombre_stagiaires}
            icon={HiAcademicCap}
            color="green"
            description="Utilisateurs stagiaires actifs"
            loading={loading}
          />
          <StatCard
            title="Entreprises"
            value={statsGlobales?.nombre_entreprises}
            icon={HiOfficeBuilding}
            color="purple"
            description={`${statsGlobales?.entreprises_actives} actives`}
            loading={loading}
          />
          <StatCard
            title="Stages Terminés"
            value={statsGlobales?.nombre_stages_termines}
            icon={HiChartBar}
            color="orange"
            description={`Taux: ${statsGlobales?.taux_completion_stages}%`}
            loading={loading}
          />
          <StatCard
            title="Candidatures"
            value={statsGlobales?.nombre_candidatures_total}
            icon={HiClipboardList}
            color="indigo"
            description={`${statsGlobales?.nombre_candidatures_acceptees} acceptées`}
            loading={loading}
          />
          <StatCard
            title="Note Moyenne"
            value={statsGlobales?.note_moyenne_globale ? `${statsGlobales.note_moyenne_globale}/10` : 'N/A'}
            icon={HiStar}
            color="red"
            description="Moyenne des évaluations"
            loading={loading}
          />
        </div>
      </div>

      {/* Section Graphiques */}
      <div className={styles.chartsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Analyses & Tendances</h2>
          <p className={styles.sectionSubtitle}>Visualisation des données temporelles et sectorielles</p>
        </div>
        
        <div className={styles.chartsContainer}>
          {/* Évolution temporelle */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h3 className={styles.chartTitle}>Évolution sur 12 mois</h3>
                <p className={styles.chartSubtitle}>Tendances des inscriptions et activités</p>
              </div>
              <div className={styles.chartActions}>
                <button className={styles.chartActionButton}>
                  <HiFilter />
                </button>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={evolution}>
                  <defs>
                    <linearGradient id="colorInscriptions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorOffres" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorStages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
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
                    name="Nouvelles inscriptions"
                  />
                  <Area
                    type="monotone"
                    dataKey="nouvelles_offres"
                    stroke="#10B981"
                    fill="url(#colorOffres)"
                    strokeWidth={2}
                    name="Nouvelles offres"
                  />
                  <Area
                    type="monotone"
                    dataKey="stages_termines"
                    stroke="#F59E0B"
                    fill="url(#colorStages)"
                    strokeWidth={2}
                    name="Stages terminés"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activité par mois */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h3 className={styles.chartTitle}>Activité Mensuelle</h3>
                <p className={styles.chartSubtitle}>Nouvelles inscriptions et candidatures par mois</p>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={evolution}>
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
                  <Line
                    type="monotone"
                    dataKey="nouvelles_inscriptions"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#3B82F6', strokeWidth: 2 }}
                    name="Nouvelles inscriptions"
                  />
                  <Line
                    type="monotone"
                    dataKey="nouvelles_candidatures"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#10B981', strokeWidth: 2 }}
                    name="Nouvelles candidatures"
                  />
                  <Line
                    type="monotone"
                    dataKey="nouvelles_offres"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#F59E0B', strokeWidth: 2 }}
                    name="Nouvelles offres"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Répartition par secteurs */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h3 className={styles.chartTitle}>Répartition par Secteurs</h3>
                <p className={styles.chartSubtitle}>Distribution des entreprises par secteur d'activité</p>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={secteurData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {secteurData.map((entry, index) => (
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

          {/* Métriques de performance */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h3 className={styles.chartTitle}>Métriques de Performance</h3>
                <p className={styles.chartSubtitle}>Indicateurs clés de la plateforme</p>
              </div>
            </div>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <div className={styles.metricIcon}>
                    <MdTrendingUp className="text-green-500 text-2xl" />
                  </div>
                  <div className={styles.metricValue}>
                    {statsGlobales?.taux_acceptation_candidatures || 0}%
                  </div>
                </div>
                <div className={styles.metricLabel}>Taux d'acceptation</div>
                <div className={styles.metricDescription}>Candidatures acceptées</div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <div className={styles.metricIcon}>
                    <HiCheckCircle className="text-blue-500 text-2xl" />
                  </div>
                  <div className={styles.metricValue}>
                    {statsGlobales?.taux_completion_stages || 0}%
                  </div>
                </div>
                <div className={styles.metricLabel}>Taux de completion</div>
                <div className={styles.metricDescription}>Stages terminés avec succès</div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <div className={styles.metricIcon}>
                    <HiBriefcase className="text-purple-500 text-2xl" />
                  </div>
                  <div className={styles.metricValue}>
                    {statsGlobales?.nombre_offres_actives || 0}
                  </div>
                </div>
                <div className={styles.metricLabel}>Offres actives</div>
                <div className={styles.metricDescription}>Postes ouverts actuellement</div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <div className={styles.metricIcon}>
                    <FaCertificate className="text-orange-500 text-2xl" />
                  </div>
                  <div className={styles.metricValue}>
                    {statsGlobales?.nombre_certificats_generes || 0}
                  </div>
                </div>
                <div className={styles.metricLabel}>Certificats générés</div>
                <div className={styles.metricDescription}>Attestations de fin de stage</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer amélioré */}
      <div className={styles.dashboardFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerStats}>
            <div className={styles.footerStat}>
              <span className={styles.footerStatLabel}>Dernière mise à jour:</span>
              <span className={styles.footerStatValue}>
                {new Date().toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className={styles.footerStat}>
              <span className={styles.footerStatLabel}>Total recruteurs:</span>
              <span className={styles.footerStatValue}>
                {statsGlobales?.nombre_recruteurs || 0}
              </span>
            </div>
            <div className={styles.footerStat}>
              <span className={styles.footerStatLabel}>Total RH:</span>
              <span className={styles.footerStatValue}>
                {statsGlobales?.nombre_rh || 0}
              </span>
            </div>
          </div>
          
          {/* <div className={styles.footerActions}>
            <button className={styles.footerButton}>
              Générer rapport
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;