// src/pages/RecommendationsPage.jsx - VERSION COMPLÈTE
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiStar, 
  HiTrendingUp, 
  HiLightBulb, 
  HiRefresh,
  HiEye,
  HiChartBar,
  HiSparkles,
  HiFilter,
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiClock,
  HiExclamation,
  HiCheckCircle,
  HiAdjustments,
  HiCollection,
  HiCursorClick,
  HiArrowRight,
  HiInformationCircle
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { 
  getPersonalizedRecommendations,
  getMarketInsights,
  getCareerGuidance,
  analyzeRecommendationPotential
} from '../services/stagiaireService';
import styles from './RecommendationsPage.module.css';

const RecommendationsPage = () => {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [marketInsights, setMarketInsights] = useState(null);
  const [careerGuidance, setCareerGuidance] = useState(null);
  const [profileAnalysis, setProfileAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtres
  const [minScore, setMinScore] = useState(20);
  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState('recommendations');

  useEffect(() => {
    loadRecommendationsData();
  }, [minScore, limit]);

  const loadRecommendationsData = async () => {
    try {
      setLoading(true);
      setError('');

      // Charger les recommandations
      const recommendationsData = await getPersonalizedRecommendations({
        limit,
        min_score: minScore,
        include_similar_profiles: true
      });
      setRecommendations(recommendationsData.recommendations || []);

      // Charger l'analyse du profil
      const analysisData = await analyzeRecommendationPotential();
      setProfileAnalysis(analysisData);

      // Charger les insights marché (seulement si l'onglet est actif)
      if (activeTab === 'insights') {
        const insightsData = await getMarketInsights();
        setMarketInsights(insightsData);
      }

      // Charger les conseils carrière
      if (activeTab === 'guidance') {
        const guidanceData = await getCareerGuidance();
        setCareerGuidance(guidanceData);
      }

    } catch (err) {
      setError('Erreur lors du chargement des recommandations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    
    // Charger les données spécifiques à l'onglet
    if (tab === 'insights' && !marketInsights) {
      try {
        const insightsData = await getMarketInsights();
        setMarketInsights(insightsData);
      } catch (err) {
        console.error('Erreur insights:', err);
      }
    }
    
    if (tab === 'guidance' && !careerGuidance) {
      try {
        const guidanceData = await getCareerGuidance();
        setCareerGuidance(guidanceData);
      } catch (err) {
        console.error('Erreur guidance:', err);
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return styles.scoreExcellent;
    if (score >= 60) return styles.scoreGood;
    if (score >= 40) return styles.scoreFair;
    return styles.scorePoor;
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    if (score >= 40) return 'Moyen';
    return 'Faible';
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingIconContainer}>
            <HiSparkles className={styles.loadingIcon} />
          </div>
          <p className={styles.loadingText}>Génération de vos recommandations personnalisées...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.recommendationsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <div className={styles.titleIcon}>
              <HiStar />
            </div>
            <div className={styles.titleText}>
              <h1 className={styles.pageTitle}>Recommandations Personnalisées</h1>
              <p className={styles.pageSubtitle}>
                Offres sélectionnées spécialement pour votre profil
              </p>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <button 
              onClick={loadRecommendationsData}
              className={styles.refreshButton}
              title="Actualiser les recommandations"
            >
              <HiRefresh />
              <span>Actualiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages d'erreur */}
      {error && (
        <div className={styles.errorMessage}>
          <HiExclamation className={styles.messageIcon} />
          <span>{error}</span>
        </div>
      )}

      {/* Analyse du profil */}
      {profileAnalysis && (
        <div className={styles.profileAnalysisSection}>
          <div className={styles.analysisCard}>
            <div className={styles.analysisHeader}>
              <div className={styles.analysisHeaderIcon}>
                <HiChartBar />
              </div>
              <div className={styles.analysisHeaderText}>
                <h3 className={styles.analysisTitle}>Analyse de votre profil</h3>
                <p className={styles.analysisSubtitle}>Évaluation de votre potentiel sur le marché</p>
              </div>
            </div>
            
            <div className={styles.analysisContent}>
              <div className={styles.completenessScore}>
                <div className={styles.scoreCircle}>
                  <div className={styles.scoreNumber}>{profileAnalysis.profile_analysis.profile_completeness}%</div>
                  <div className={styles.scoreLabel}>Complétude</div>
                </div>
                <div className={styles.scoreDetails}>
                  <p className={styles.scoreDescription}>
                    {profileAnalysis.recommendation}
                  </p>
                  {profileAnalysis.profile_analysis.improvements.length > 0 && (
                    <div className={styles.improvements}>
                      <h4 className={styles.improvementsTitle}>
                        <HiLightBulb className={styles.improvementsIcon} />
                        Améliorations suggérées
                      </h4>
                      <ul className={styles.improvementsList}>
                        {profileAnalysis.profile_analysis.improvements.slice(0, 3).map((improvement, index) => (
                          <li key={index} className={styles.improvementItem}>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation onglets */}
      <div className={styles.tabsSection}>
        <div className={styles.tabsNavigation}>
          <button
            className={`${styles.tab} ${activeTab === 'recommendations' ? styles.active : ''}`}
            onClick={() => handleTabChange('recommendations')}
          >
            <HiStar className={styles.tabIcon} />
            <span>Recommandations</span>
            {recommendations.length > 0 && (
              <span className={styles.tabBadge}>{recommendations.length}</span>
            )}
          </button>
          
          <button
            className={`${styles.tab} ${activeTab === 'insights' ? styles.active : ''}`}
            onClick={() => handleTabChange('insights')}
          >
            <HiTrendingUp className={styles.tabIcon} />
            <span>Marché</span>
          </button>
          
          <button
            className={`${styles.tab} ${activeTab === 'guidance' ? styles.active : ''}`}
            onClick={() => handleTabChange('guidance')}
          >
            <HiLightBulb className={styles.tabIcon} />
            <span>Conseils</span>
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className={styles.tabContent}>
        {activeTab === 'recommendations' && (
          <div className={styles.recommendationsTab}>
            {/* Filtres */}
            <div className={styles.filtersSection}>
              <div className={styles.filtersHeader}>
                <div className={styles.filtersHeaderIcon}>
                  <HiFilter />
                </div>
                <h3 className={styles.filtersTitle}>Filtres de recommandation</h3>
              </div>
              
              <div className={styles.filtersContent}>
                <div className={styles.filterGroup}>
                  <label htmlFor="minScore" className={styles.filterLabel}>
                    <HiAdjustments className={styles.labelIcon} />
                    Score minimum: {minScore}%
                  </label>
                  <input
                    type="range"
                    id="minScore"
                    min="0"
                    max="100"
                    step="10"
                    value={minScore}
                    onChange={(e) => setMinScore(parseInt(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label htmlFor="limit" className={styles.filterLabel}>
                    <HiCollection className={styles.labelIcon} />
                    Nombre d'offres
                  </label>
                  <select
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    className={styles.selectInput}
                  >
                    <option value={5}>5 offres</option>
                    <option value={10}>10 offres</option>
                    <option value={15}>15 offres</option>
                    <option value={20}>20 offres</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Liste des recommandations */}
            <div className={styles.recommendationsListSection}>
              {recommendations.length === 0 ? (
                <div className={styles.noRecommendations}>
                  <div className={styles.emptyIcon}>
                    <HiInformationCircle />
                  </div>
                  <div className={styles.emptyContent}>
                    <h3 className={styles.emptyTitle}>
                      Aucune recommandation trouvée
                    </h3>
                    <p className={styles.emptyDescription}>
                      Complétez votre profil et ajoutez vos compétences pour obtenir des recommandations personnalisées.
                    </p>
                    <div className={styles.emptyActions}>
                      <Link to="/profile" className={styles.completeProfileButton}>
                        <HiCursorClick className={styles.buttonIcon} />
                        <span>Compléter mon profil</span>
                        <HiArrowRight className={styles.buttonArrow} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.listHeader}>
                    <h3 className={styles.listTitle}>
                      {recommendations.length} offre{recommendations.length > 1 ? 's' : ''} recommandée{recommendations.length > 1 ? 's' : ''}
                    </h3>
                    <p className={styles.listSubtitle}>
                      Triées par pertinence selon votre profil
                    </p>
                  </div>
                  
                  <div className={styles.recommendationsList}>
                    {recommendations.map((recommendation) => (
                      <div key={recommendation.offre_id} className={styles.recommendationCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.offreInfo}>
                            <h4 className={styles.offreTitle}>
                              <Link 
                                to={`/offres/${recommendation.offre_id}`}
                                className={styles.titleLink}
                              >
                                {recommendation.titre}
                              </Link>
                            </h4>
                            <div className={styles.entrepriseInfo}>
                              <HiOfficeBuilding className={styles.infoIcon} />
                              <span className={styles.entreprise}>
                                {recommendation.entreprise_nom}
                              </span>
                              {recommendation.localisation && (
                                <>
                                  <span className={styles.separator}>•</span>
                                  <HiLocationMarker className={styles.infoIcon} />
                                  <span className={styles.location}>
                                    {recommendation.localisation}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className={styles.scoreSection}>
                            <div className={`${styles.matchScore} ${getScoreColor(recommendation.match_score)}`}>
                              <div className={styles.scoreValue}>{recommendation.match_score}%</div>
                              <div className={styles.scoreText}>{getScoreLabel(recommendation.match_score)}</div>
                            </div>
                          </div>
                        </div>

                        <div className={styles.cardContent}>
                          <div className={styles.offreDetails}>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Secteur:</span>
                              <span className={styles.detailValue}>{recommendation.secteur}</span>
                            </div>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Type:</span>
                              <span className={styles.detailValue}>{recommendation.type_stage}</span>
                            </div>
                            <div className={styles.detailItem}>
                              <HiClock className={styles.detailIcon} />
                              <span className={styles.detailValue}>
                                {new Date(recommendation.date_debut).toLocaleDateString('fr-FR')} - 
                                {new Date(recommendation.date_fin).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>

                          <div className={styles.description}>
                            <p className={styles.descriptionText}>
                              {recommendation.description}
                            </p>
                          </div>

                          {recommendation.recommendation_reasons && (
                            <div className={styles.reasons}>
                              <h5 className={styles.reasonsTitle}>
                                <HiCheckCircle className={styles.reasonsIcon} />
                                Pourquoi cette offre vous correspond
                              </h5>
                              <ul className={styles.reasonsList}>
                                {recommendation.recommendation_reasons.map((reason, index) => (
                                  <li key={index} className={styles.reasonItem}>
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Scores détaillés */}
                          <div className={styles.detailedScores}>
                            <div className={styles.scoreItem}>
                              <span className={styles.scoreItemLabel}>Compétences</span>
                              <div className={styles.scoreBar}>
                                <div 
                                  className={styles.scoreBarFill}
                                  style={{ width: `${recommendation.competence_match}%` }}
                                />
                              </div>
                              <span className={styles.scoreItemValue}>{recommendation.competence_match}%</span>
                            </div>
                            
                            <div className={styles.scoreItem}>
                              <span className={styles.scoreItemLabel}>Secteur</span>
                              <div className={styles.scoreBar}>
                                <div 
                                  className={styles.scoreBarFill}
                                  style={{ width: `${recommendation.secteur_match}%` }}
                                />
                              </div>
                              <span className={styles.scoreItemValue}>{recommendation.secteur_match}%</span>
                            </div>
                            
                            <div className={styles.scoreItem}>
                              <span className={styles.scoreItemLabel}>Expérience</span>
                              <div className={styles.scoreBar}>
                                <div 
                                  className={styles.scoreBarFill}
                                  style={{ width: `${recommendation.experience_match}%` }}
                                />
                              </div>
                              <span className={styles.scoreItemValue}>{recommendation.experience_match}%</span>
                            </div>
                            
                            <div className={styles.scoreItem}>
                              <span className={styles.scoreItemLabel}>Localisation</span>
                              <div className={styles.scoreBar}>
                                <div 
                                  className={styles.scoreBarFill}
                                  style={{ width: `${recommendation.location_match}%` }}
                                />
                              </div>
                              <span className={styles.scoreItemValue}>{recommendation.location_match}%</span>
                            </div>
                          </div>
                        </div>

                        <div className={styles.cardActions}>
                          <Link
                            to={`/offres/${recommendation.offre_id}`}
                            className={styles.viewButton}
                          >
                            <HiEye />
                            <span>Voir l'offre</span>
                          </Link>
                          
                          <Link
                            to={`/offres/${recommendation.offre_id}/postuler`}
                            className={styles.applyButton}
                          >
                            <HiCursorClick />
                            <span>Postuler</span>
                            <HiArrowRight className={styles.buttonArrow} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className={styles.insightsTab}>
            {marketInsights ? (
              <div className={styles.insightsContent}>
                <div className={styles.insightsGrid}>
                  {/* Vue d'ensemble du marché */}
                  <div className={styles.insightCard}>
                    <div className={styles.insightHeader}>
                      <HiTrendingUp className={styles.insightIcon} />
                      <h3 className={styles.insightTitle}>Vue d'ensemble du marché</h3>
                    </div>
                    <div className={styles.insightContent}>
                      <div className={styles.statsList}>
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>
                            {marketInsights.market_overview.stats_generales.total_offres_actives}
                          </span>
                          <span className={styles.statLabel}>Offres actives</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>
                            {marketInsights.summary.most_demanded_skill}
                          </span>
                          <span className={styles.statLabel}>Compétence la + demandée</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>
                            {marketInsights.summary.best_sector}
                          </span>
                          <span className={styles.statLabel}>Meilleur secteur</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secteurs populaires */}
                  <div className={styles.insightCard}>
                    <div className={styles.insightHeader}>
                      <HiOfficeBuilding className={styles.insightIcon} />
                      <h3 className={styles.insightTitle}>Secteurs populaires</h3>
                    </div>
                    <div className={styles.insightContent}>
                      <div className={styles.secteursList}>
                        {marketInsights.market_overview.secteurs_populaires.slice(0, 5).map((secteur, index) => (
                          <div key={index} className={styles.secteurItem}>
                            <span className={styles.secteurName}>{secteur.secteur}</span>
                            <span className={styles.secteurCount}>{secteur.nombre_offres} offres</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compétences demandées */}
                  <div className={styles.insightCard}>
                    <div className={styles.insightHeader}>
                      <HiSparkles className={styles.insightIcon} />
                      <h3 className={styles.insightTitle}>Compétences demandées</h3>
                    </div>
                    <div className={styles.insightContent}>
                      <div className={styles.competencesList}>
                        {marketInsights.competences_demand.competences_les_plus_demandees.slice(0, 6).map((comp, index) => (
                          <div key={index} className={styles.competenceItem}>
                            <span className={styles.competenceName}>{comp.competence}</span>
                            <div className={styles.competenceBar}>
                              <div 
                                className={styles.competenceBarFill}
                                style={{ width: `${comp.popularite}%` }}
                              />
                            </div>
                            <span className={styles.competencePercent}>{comp.popularite}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Votre position */}
                  <div className={styles.insightCard}>
                    <div className={styles.insightHeader}>
                      <HiStar className={styles.insightIcon} />
                      <h3 className={styles.insightTitle}>Votre position</h3>
                    </div>
                    <div className={styles.insightContent}>
                      <div className={styles.positionStats}>
                        <div className={styles.positionItem}>
                          <span className={styles.positionLabel}>Compétitivité</span>
                          <span className={styles.positionValue}>
                            {marketInsights.your_position.score_competitivite || 'N/A'}%
                          </span>
                        </div>
                        <div className={styles.positionItem}>
                          <span className={styles.positionLabel}>Opportunités</span>
                          <span className={styles.positionValue}>
                            {marketInsights.summary.total_opportunities}
                          </span>
                        </div>
                      </div>
                      
                      {marketInsights.your_position.recommandations_strategiques && (
                        <div className={styles.strategicAdvice}>
                          <h4 className={styles.adviceTitle}>Conseils stratégiques</h4>
                          <ul className={styles.adviceList}>
                            {marketInsights.your_position.recommandations_strategiques.slice(0, 3).map((advice, index) => (
                              <li key={index} className={styles.adviceItem}>
                                {advice}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.loadingInsights}>
                <HiRefresh className={styles.loadingIcon} />
                <p>Chargement des insights marché...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'guidance' && (
          <div className={styles.guidanceTab}>
            {careerGuidance ? (
              <div className={styles.guidanceContent}>
                <div className={styles.guidanceGrid}>
                  {/* Évaluation carrière */}
                  <div className={styles.guidanceCard}>
                    <div className={styles.guidanceHeader}>
                      <HiChartBar className={styles.guidanceIcon} />
                      <h3 className={styles.guidanceTitle}>Évaluation de votre profil</h3>
                    </div>
                    <div className={styles.guidanceContent}>
                      <div className={styles.assessmentScore}>
                        <div className={styles.scoreCircle}>
                          <div className={styles.scoreNumber}>
                            {careerGuidance.career_assessment.preparation_score}%
                          </div>
                          <div className={styles.scoreLabel}>Préparation</div>
                        </div>
                        <div className={styles.scoreDetails}>
                          <p className={styles.scoreDescription}>
                            Force du profil: {careerGuidance.career_assessment.profile_strength}
                          </p>
                        </div>
                      </div>
                      
                      {careerGuidance.career_assessment.missing_competences.length > 0 && (
                        <div className={styles.missingSkills}>
                          <h4 className={styles.missingSkillsTitle}>
                            <HiExclamation className={styles.missingSkillsIcon} />
                            Compétences manquantes
                          </h4>
                          <div className={styles.skillsTags}>
                            {careerGuidance.career_assessment.missing_competences.map((skill, index) => (
                              <span key={index} className={styles.skillTag}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conseils personnalisés */}
                  <div className={styles.guidanceCard}>
                    <div className={styles.guidanceHeader}>
                      <HiLightBulb className={styles.guidanceIcon} />
                      <h3 className={styles.guidanceTitle}>Conseils personnalisés</h3>
                    </div>
                    <div className={styles.guidanceContent}>
                      <div className={styles.adviceSection}>
                        <h4 className={styles.adviceSubtitle}>Actions immédiates</h4>
                        <ul className={styles.adviceList}>
                          {careerGuidance.personalized_advice.immediate_actions.map((action, index) => (
                            <li key={index} className={styles.adviceItem}>
                              <HiCheckCircle className={styles.adviceIcon} />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {careerGuidance.personalized_advice.specialty_specific.length > 0 && (
                        <div className={styles.adviceSection}>
                          <h4 className={styles.adviceSubtitle}>Spécifique à votre domaine</h4>
                          <ul className={styles.adviceList}>
                            {careerGuidance.personalized_advice.specialty_specific.map((advice, index) => (
                              <li key={index} className={styles.adviceItem}>
                                <HiSparkles className={styles.adviceIcon} />
                                {advice}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Plan de carrière */}
                  <div className={styles.guidanceCard}>
                    <div className={styles.guidanceHeader}>
                      <HiTrendingUp className={styles.guidanceIcon} />
                      <h3 className={styles.guidanceTitle}>Votre plan de carrière</h3>
                    </div>
                    <div className={styles.guidanceContent}>
                      <div className={styles.careerPath}>
                        <div className={styles.pathStep}>
                          <div className={styles.stepHeader}>
                            <div className={styles.stepNumber}>1</div>
                            <h5 className={styles.stepTitle}>Court terme</h5>
                          </div>
                          <ul className={styles.stepList}>
                            {careerGuidance.success_pathway.short_term.map((step, index) => (
                              <li key={index} className={styles.stepItem}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.pathStep}>
                          <div className={styles.stepHeader}>
                            <div className={styles.stepNumber}>2</div>
                            <h5 className={styles.stepTitle}>Moyen terme</h5>
                          </div>
                          <ul className={styles.stepList}>
                            {careerGuidance.success_pathway.medium_term.map((step, index) => (
                              <li key={index} className={styles.stepItem}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.pathStep}>
                          <div className={styles.stepHeader}>
                            <div className={styles.stepNumber}>3</div>
                            <h5 className={styles.stepTitle}>Long terme</h5>
                          </div>
                          <ul className={styles.stepList}>
                            {careerGuidance.success_pathway.long_term.map((step, index) => (
                              <li key={index} className={styles.stepItem}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ressources d'apprentissage */}
                  <div className={styles.guidanceCard}>
                    <div className={styles.guidanceHeader}>
                      <HiSparkles className={styles.guidanceIcon} />
                      <h3 className={styles.guidanceTitle}>Ressources d'apprentissage</h3>
                    </div>
                    <div className={styles.guidanceContent}>
                      <div className={styles.resourcesSection}>
                        <h4 className={styles.resourcesSubtitle}>Plateformes en ligne</h4>
                        <div className={styles.resourcesList}>
                          {careerGuidance.learning_resources.online_platforms.map((platform, index) => (
                            <span key={index} className={styles.resourceTag}>
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.resourcesSection}>
                        <h4 className={styles.resourcesSubtitle}>Ressources gratuites</h4>
                        <div className={styles.resourcesList}>
                          {careerGuidance.learning_resources.free_resources.map((resource, index) => (
                            <span key={index} className={styles.resourceTag}>
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.resourcesSection}>
                        <h4 className={styles.resourcesSubtitle}>Certifications recommandées</h4>
                        <div className={styles.resourcesList}>
                          {careerGuidance.learning_resources.certifications.map((cert, index) => (
                            <span key={index} className={styles.resourceTag}>
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.loadingGuidance}>
                <HiRefresh className={styles.loadingIcon} />
                <p>Chargement des conseils de carrière...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;