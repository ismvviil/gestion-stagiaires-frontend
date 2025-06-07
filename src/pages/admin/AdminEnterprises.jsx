// import React, { useState, useEffect } from 'react';
// import { HiOfficeBuilding, HiUsers, HiDocumentText, HiChartBar } from 'react-icons/hi';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import AdminService from '../../services/adminService';
// import styles from './AdminEnterprises.module.css';

// const AdminEnterprises = () => {
//   const [enterprises, setEnterprises] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadEnterprises = async () => {
//       try {
//         setLoading(true);
//         const data = await AdminService.getStatsEntreprises(50); // Récupérer plus d'entreprises
//         setEnterprises(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEnterprises();
//   }, []);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.loadingSpinner}></div>
//         <p>Chargement des entreprises...</p>
//       </div>
//     );
//   }

//   // Données pour le graphique (top 10)
//   const chartData = enterprises.slice(0, 10).map(enterprise => ({
//     nom: enterprise.nom_entreprise.length > 15 
//       ? enterprise.nom_entreprise.substring(0, 15) + '...' 
//       : enterprise.nom_entreprise,
//     stages: enterprise.nombre_stages_encadres,
//     offres: enterprise.nombre_offres,
//     candidatures: enterprise.nombre_candidatures_recues
//   }));

//   return (
//     <div className={styles.enterprisesContainer}>
//       {/* Header */}
//       <div className={styles.header}>
//         <h1 className={styles.title}>Performance des Entreprises</h1>
//         <p className={styles.subtitle}>
//           Analyse détaillée de l'activité par entreprise
//         </p>
//       </div>

//       {/* Graphique des top entreprises */}
//       <div className={styles.chartSection}>
//         <div className={styles.chartHeader}>
//           <h2 className={styles.chartTitle}>Top 10 Entreprises</h2>
//           <p className={styles.chartSubtitle}>Classement par nombre de stages encadrés</p>
//         </div>
//         <div className={styles.chartWrapper}>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis 
//                 dataKey="nom" 
//                 angle={-45}
//                 textAnchor="end"
//                 height={100}
//                 tick={{ fontSize: 10 }}
//               />
//               <YAxis tick={{ fontSize: 12 }} />
//               <Tooltip 
//                 contentStyle={{
//                   backgroundColor: '#fff',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '6px'
//                 }}
//               />
//               <Bar dataKey="stages" fill="#3B82F6" name="Stages encadrés" />
//               <Bar dataKey="offres" fill="#10B981" name="Offres publiées" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Liste détaillée des entreprises */}
//       <div className={styles.enterprisesList}>
//         <h2 className={styles.sectionTitle}>Toutes les Entreprises</h2>
        
//         <div className={styles.enterprisesGrid}>
//           {enterprises.map((enterprise, index) => (
//             <div key={enterprise.entreprise_id} className={styles.enterpriseCard}>
//               <div className={styles.enterpriseHeader}>
//                 <div className={styles.enterpriseRank}>
//                   #{index + 1}
//                 </div>
//                 <div className={styles.enterpriseInfo}>
//                   <h3 className={styles.enterpriseName}>
//                     {enterprise.nom_entreprise}
//                   </h3>
//                   <p className={styles.enterpriseSector}>
//                     {enterprise.secteur}
//                   </p>
//                 </div>
//               </div>

//               <div className={styles.enterpriseStats}>
//                 <div className={styles.stat}>
//                   <HiUsers className={styles.statIcon} />
//                   <div className={styles.statContent}>
//                     <div className={styles.statValue}>
//                       {enterprise.nombre_recruteurs}
//                     </div>
//                     <div className={styles.statLabel}>Recruteurs</div>
//                   </div>
//                 </div>

//                 <div className={styles.stat}>
//                   <HiDocumentText className={styles.statIcon} />
//                   <div className={styles.statContent}>
//                     <div className={styles.statValue}>
//                       {enterprise.nombre_offres}
//                     </div>
//                     <div className={styles.statLabel}>Offres</div>
//                   </div>
//                 </div>

//                 <div className={styles.stat}>
//                   <HiChartBar className={styles.statIcon} />
//                   <div className={styles.statContent}>
//                     <div className={styles.statValue}>
//                       {enterprise.nombre_stages_encadres}
//                     </div>
//                     <div className={styles.statLabel}>Stages</div>
//                   </div>
//                 </div>

//                 <div className={styles.stat}>
//                   <HiOfficeBuilding className={styles.statIcon} />
//                   <div className={styles.statContent}>
//                     <div className={styles.statValue}>
//                       {enterprise.nombre_candidatures_recues}
//                     </div>
//                     <div className={styles.statLabel}>Candidatures</div>
//                   </div>
//                 </div>
//               </div>

//               {enterprise.note_moyenne_evaluations && (
//                 <div className={styles.enterpriseRating}>
//                   <span className={styles.ratingLabel}>Note moyenne:</span>
//                   <span className={styles.ratingValue}>
//                     {enterprise.note_moyenne_evaluations.toFixed(1)}/10
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {enterprises.length === 0 && !loading && (
//         <div className={styles.emptyState}>
//           <HiOfficeBuilding className={styles.emptyIcon} />
//           <p>Aucune entreprise trouvée.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminEnterprises;


import React, { useState, useEffect } from 'react';
import { 
  HiOfficeBuilding, HiUsers, HiDocumentText, HiChartBar, 
  HiStar, HiTrendingUp, HiFilter, HiDownload, HiRefresh,
  HiSearch, HiSortAscending, HiSortDescending, HiEye
} from 'react-icons/hi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, ComposedChart
} from 'recharts';
import AdminService from '../../services/adminService';
import StatCard from '../../components/admin/StatCard';
import styles from './AdminEnterprises.module.css';

const AdminEnterprises = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [filteredEnterprises, setFilteredEnterprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [sortField, setSortField] = useState('nombre_stages_encadres');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' ou 'table'

  useEffect(() => {
    const loadEnterprises = async () => {
      try {
        setLoading(true);
        const data = await AdminService.getStatsEntreprises(50);
        setEnterprises(data);
        setFilteredEnterprises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEnterprises();
  }, []);

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...enterprises];

    // Recherche
    if (searchTerm) {
      filtered = filtered.filter(enterprise =>
        enterprise.nom_entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enterprise.secteur.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par secteur
    if (selectedSector) {
      filtered = filtered.filter(enterprise => enterprise.secteur === selectedSector);
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue = a[sortField] || 0;
      let bValue = b[sortField] || 0;
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredEnterprises(filtered);
  }, [enterprises, searchTerm, selectedSector, sortField, sortDirection]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
        <p className={styles.loadingText}>Chargement des entreprises...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>🏢</div>
        <h3 className={styles.errorTitle}>Erreur de chargement</h3>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={() => window.location.reload()}>
          <HiRefresh className={styles.retryIcon} />
          Réessayer
        </button>
      </div>
    );
  }

  // Calculs des statistiques globales
  const totalStages = enterprises.reduce((sum, e) => sum + (e.nombre_stages_encadres || 0), 0);
  const totalOffres = enterprises.reduce((sum, e) => sum + (e.nombre_offres || 0), 0);
  const totalRecruteurs = enterprises.reduce((sum, e) => sum + (e.nombre_recruteurs || 0), 0);
  const averageRating = enterprises.filter(e => e.note_moyenne_evaluations)
    .reduce((sum, e, _, arr) => sum + e.note_moyenne_evaluations / arr.length, 0);

  // Données pour les graphiques
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
  const chartData = filteredEnterprises.slice(0, 10).map(enterprise => ({
    nom: enterprise.nom_entreprise.length > 15 
      ? enterprise.nom_entreprise.substring(0, 15) + '...' 
      : enterprise.nom_entreprise,
    stages: enterprise.nombre_stages_encadres || 0,
    offres: enterprise.nombre_offres || 0,
    candidatures: enterprise.nombre_candidatures_recues || 0,
    recruteurs: enterprise.nombre_recruteurs || 0
  }));

  // Données par secteur
  const sectorsData = enterprises.reduce((acc, enterprise) => {
    const sector = enterprise.secteur;
    if (!acc[sector]) {
      acc[sector] = {
        secteur: sector,
        nombre_entreprises: 0,
        total_stages: 0,
        total_offres: 0
      };
    }
    acc[sector].nombre_entreprises++;
    acc[sector].total_stages += enterprise.nombre_stages_encadres || 0;
    acc[sector].total_offres += enterprise.nombre_offres || 0;
    return acc;
  }, {});

  const sectorsArray = Object.values(sectorsData).map((sector, index) => ({
    ...sector,
    fill: chartColors[index % chartColors.length]
  }));

  const uniqueSectors = [...new Set(enterprises.map(e => e.secteur))];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportData = () => {
    console.log('Export des données des entreprises...');
  };

  const getPerformanceLevel = (stages) => {
    if (stages >= 10) return { level: 'Excellent', color: 'var(--enterprises-success)' };
    if (stages >= 5) return { level: 'Bon', color: 'var(--enterprises-warning)' };
    if (stages >= 1) return { level: 'Moyen', color: 'var(--enterprises-accent)' };
    return { level: 'Faible', color: 'var(--enterprises-danger)' };
  };

  return (
    <div className={styles.enterprisesContainer}>
      {/* Header amélioré */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>🏢</span>
              Performance des Entreprises
            </h1>
            <p className={styles.subtitle}>
              Analyse détaillée de l'activité de {enterprises.length} entreprises
            </p>
          </div>
          
          <div className={styles.headerActions}>
            {/* <button className={styles.actionButton} onClick={exportData}>
              <HiDownload className={styles.actionIcon} />
              <span className={styles.actionText}>Exporter</span>
            </button> */}
            
            <div className={styles.viewToggle}>
              <button 
                className={`${styles.viewButton} ${viewMode === 'cards' ? styles.viewButtonActive : ''}`}
                onClick={() => setViewMode('cards')}
              >
                Cards
              </button>
              <button 
                className={`${styles.viewButton} ${viewMode === 'table' ? styles.viewButtonActive : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs globales */}
      <div className={styles.statsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Vue d'Ensemble</h2>
          <p className={styles.sectionSubtitle}>Métriques globales des entreprises partenaires</p>
        </div>
        
        <div className={styles.statsGrid}>
          <StatCard
            title="Total Entreprises"
            value={enterprises.length}
            icon={HiOfficeBuilding}
            color="blue"
            description="Entreprises partenaires"
            loading={loading}
          />
          <StatCard
            title="Stages Encadrés"
            value={totalStages}
            icon={HiChartBar}
            color="green"
            description="Au total"
            loading={loading}
          />
          <StatCard
            title="Offres Publiées"
            value={totalOffres}
            icon={HiDocumentText}
            color="orange"
            description="Postes ouverts"
            loading={loading}
          />
          <StatCard
            title="Note Moyenne"
            value={averageRating ? `${averageRating.toFixed(1)}/10` : 'N/A'}
            icon={HiStar}
            color="purple"
            description="Satisfaction globale"
            loading={loading}
          />
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          <div className={styles.searchBox}>
            <HiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Tous les secteurs</option>
            {uniqueSectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="nombre_stages_encadres">Trier par stages</option>
            <option value="nombre_offres">Trier par offres</option>
            <option value="nombre_recruteurs">Trier par recruteurs</option>
            <option value="nom_entreprise">Trier par nom</option>
            <option value="note_moyenne_evaluations">Trier par note</option>
          </select>

          <button 
            className={styles.sortButton}
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          >
            {sortDirection === 'asc' ? <HiSortAscending /> : <HiSortDescending />}
          </button>
        </div>
        
        <div className={styles.resultsInfo}>
          {filteredEnterprises.length} entreprise(s) trouvée(s)
        </div>
      </div>

      {/* Graphiques */}
      <div className={styles.chartsSection}>
        <div className={styles.chartsGrid}>
          {/* Graphique principal */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h3 className={styles.chartTitle}>Top 10 Entreprises</h3>
                <p className={styles.chartSubtitle}>Performance par nombre de stages encadrés</p>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="nom" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
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
                    dataKey="stages" 
                    fill="#3B82F6" 
                    name="Stages encadrés"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="offres" 
                    fill="#10B981" 
                    name="Offres publiées"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="recruteurs"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                    name="Recruteurs"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Répartition par secteurs */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h3 className={styles.chartTitle}>Répartition par Secteurs</h3>
                <p className={styles.chartSubtitle}>Distribution des entreprises</p>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={sectorsArray}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ secteur, nombre_entreprises, percent }) => 
                      `${secteur}: ${nombre_entreprises} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="nombre_entreprises"
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {sectorsArray.map((entry, index) => (
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
      </div>

      {/* Liste des entreprises */}
      <div className={styles.enterprisesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Liste des Entreprises</h2>
          <p className={styles.sectionSubtitle}>Détails de performance par entreprise</p>
        </div>

        {viewMode === 'cards' ? (
          <div className={styles.enterprisesGrid}>
            {filteredEnterprises.map((enterprise, index) => {
              const performance = getPerformanceLevel(enterprise.nombre_stages_encadres || 0);
              
              return (
                <div key={enterprise.entreprise_id} className={styles.enterpriseCard}>
                  <div className={styles.enterpriseHeader}>
                    <div className={styles.enterpriseRank}>
                      <span className={styles.rankBadge}>#{index + 1}</span>
                    </div>
                    <div className={styles.enterpriseInfo}>
                      <h3 className={styles.enterpriseName}>
                        {enterprise.nom_entreprise}
                      </h3>
                      <p className={styles.enterpriseSector}>
                        <span className={styles.sectorBadge}>
                          {enterprise.secteur}
                        </span>
                      </p>
                    </div>
                    <div 
                      className={styles.performanceIndicator}
                      style={{ backgroundColor: performance.color }}
                    >
                      {performance.level}
                    </div>
                  </div>

                  <div className={styles.enterpriseStats}>
                    <div className={styles.stat}>
                      <div className={styles.statIcon}>
                        <HiUsers />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statValue}>
                          {enterprise.nombre_recruteurs || 0}
                        </div>
                        <div className={styles.statLabel}>Recruteurs</div>
                      </div>
                    </div>

                    <div className={styles.stat}>
                      <div className={styles.statIcon}>
                        <HiDocumentText />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statValue}>
                          {enterprise.nombre_offres || 0}
                        </div>
                        <div className={styles.statLabel}>Offres</div>
                      </div>
                    </div>

                    <div className={styles.stat}>
                      <div className={styles.statIcon}>
                        <HiChartBar />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statValue}>
                          {enterprise.nombre_stages_encadres || 0}
                        </div>
                        <div className={styles.statLabel}>Stages</div>
                      </div>
                    </div>

                    <div className={styles.stat}>
                      <div className={styles.statIcon}>
                        <HiOfficeBuilding />
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statValue}>
                          {enterprise.nombre_candidatures_recues || 0}
                        </div>
                        <div className={styles.statLabel}>Candidatures</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.enterpriseFooter}>
                    {enterprise.note_moyenne_evaluations && (
                      <div className={styles.enterpriseRating}>
                        <HiStar className={styles.starIcon} />
                        <span className={styles.ratingValue}>
                          {enterprise.note_moyenne_evaluations.toFixed(1)}/10
                        </span>
                      </div>
                    )}
                    
                    <button className={styles.detailsButton}>
                      <HiEye />
                      Détails
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
              <table className={styles.enterprisesTable}>
                <thead>
                  <tr>
                    <th>Rang</th>
                    <th 
                      className={styles.sortableHeader}
                      onClick={() => handleSort('nom_entreprise')}
                    >
                      Entreprise
                      {sortField === 'nom_entreprise' && (
                        sortDirection === 'asc' ? <HiSortAscending /> : <HiSortDescending />
                      )}
                    </th>
                    <th>Secteur</th>
                    <th 
                      className={styles.sortableHeader}
                      onClick={() => handleSort('nombre_recruteurs')}
                    >
                      Recruteurs
                      {sortField === 'nombre_recruteurs' && (
                        sortDirection === 'asc' ? <HiSortAscending /> : <HiSortDescending />
                      )}
                    </th>
                    <th 
                      className={styles.sortableHeader}
                      onClick={() => handleSort('nombre_offres')}
                    >
                      Offres
                      {sortField === 'nombre_offres' && (
                        sortDirection === 'asc' ? <HiSortAscending /> : <HiSortDescending />
                      )}
                    </th>
                    <th 
                      className={styles.sortableHeader}
                      onClick={() => handleSort('nombre_stages_encadres')}
                    >
                      Stages
                      {sortField === 'nombre_stages_encadres' && (
                        sortDirection === 'asc' ? <HiSortAscending /> : <HiSortDescending />
                      )}
                    </th>
                    <th 
                      className={styles.sortableHeader}
                      onClick={() => handleSort('note_moyenne_evaluations')}
                    >
                      Note
                      {sortField === 'note_moyenne_evaluations' && (
                        sortDirection === 'asc' ? <HiSortAscending /> : <HiSortDescending />
                      )}
                    </th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnterprises.map((enterprise, index) => {
                    const performance = getPerformanceLevel(enterprise.nombre_stages_encadres || 0);
                    
                    return (
                      <tr key={enterprise.entreprise_id}>
                        <td>
                          <span className={styles.tableRankBadge}>#{index + 1}</span>
                        </td>
                        <td className={styles.enterpriseNameCell}>
                          <div className={styles.enterpriseNameInfo}>
                            <div className={styles.enterpriseAvatar}>
                              {enterprise.nom_entreprise.charAt(0)}
                            </div>
                            <span>{enterprise.nom_entreprise}</span>
                          </div>
                        </td>
                        <td>
                          <span className={styles.tableSectorBadge}>
                            {enterprise.secteur}
                          </span>
                        </td>
                        <td className={styles.numberCell}>
                          {enterprise.nombre_recruteurs || 0}
                        </td>
                        <td className={styles.numberCell}>
                          {enterprise.nombre_offres || 0}
                        </td>
                        <td className={styles.numberCell}>
                          <strong>{enterprise.nombre_stages_encadres || 0}</strong>
                        </td>
                        <td className={styles.ratingCell}>
                          {enterprise.note_moyenne_evaluations ? (
                            <div className={styles.tableRating}>
                              <HiStar className={styles.tableStarIcon} />
                              {enterprise.note_moyenne_evaluations.toFixed(1)}
                            </div>
                          ) : (
                            <span className={styles.noRating}>N/A</span>
                          )}
                        </td>
                        <td>
                          <span 
                            className={styles.tablePerformanceBadge}
                            style={{ backgroundColor: performance.color }}
                          >
                            {performance.level}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {filteredEnterprises.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🏢</div>
          <h3 className={styles.emptyTitle}>Aucune entreprise trouvée</h3>
          <p className={styles.emptyText}>
            Aucune entreprise ne correspond aux critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminEnterprises;