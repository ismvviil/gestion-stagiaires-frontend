// Installation nécessaire : npm install jspdf html2canvas

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  HiDownload, HiDocument, HiCheck, HiX, HiRefresh
} from 'react-icons/hi';

// Composant pour la génération de rapport
const ReportGenerator = ({ 
  statsGlobales, 
  evolution, 
  statsEntreprises, 
  statsSecteurs 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState('complet');

  // Fonction principale de génération PDF
  const generatePDFReport = async () => {
    try {
      setIsGenerating(true);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // === HEADER DU RAPPORT ===
      // Logo ou titre
      pdf.setFontSize(24);
      pdf.setTextColor(59, 130, 246); // Bleu
      pdf.text('RAPPORT ADMINISTRATIF', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(100, 116, 139); // Gris
      pdf.text('Plateforme de Gestion des Stagiaires', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' });
      
      // Ligne de séparation
      yPosition += 10;
      pdf.setDrawColor(226, 232, 240);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 15;

      // === STATISTIQUES GLOBALES ===
      pdf.setFontSize(18);
      pdf.setTextColor(15, 23, 42); // Noir
      pdf.text('📊 STATISTIQUES GÉNÉRALES', 20, yPosition);
      yPosition += 15;

      // Grid de stats principales
      const statsData = [
        { label: 'Total Utilisateurs', value: statsGlobales?.nombre_total_utilisateurs || 0, icon: '👥' },
        { label: 'Stagiaires Actifs', value: statsGlobales?.nombre_stagiaires || 0, icon: '🎓' },
        { label: 'Entreprises Partenaires', value: statsGlobales?.nombre_entreprises || 0, icon: '🏢' },
        { label: 'Stages Terminés', value: statsGlobales?.nombre_stages_termines || 0, icon: '✅' },
        { label: 'Candidatures Total', value: statsGlobales?.nombre_candidatures_total || 0, icon: '📝' },
        { label: 'Note Moyenne', value: `${statsGlobales?.note_moyenne_globale?.toFixed(1) || 'N/A'}/10`, icon: '⭐' }
      ];

      let xPos = 20;
      let colWidth = (pageWidth - 40) / 2;
      
      for (let i = 0; i < statsData.length; i++) {
        const stat = statsData[i];
        const isRightColumn = i % 2 === 1;
        
        if (isRightColumn) {
          xPos = 20 + colWidth;
        } else {
          xPos = 20;
          if (i > 0) yPosition += 12;
        }

        // Fond coloré pour chaque stat
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(xPos, yPosition - 8, colWidth - 10, 10, 2, 2, 'F');
        
        pdf.setFontSize(12);
        pdf.setTextColor(59, 130, 246);
        pdf.text(`${stat.icon} ${stat.label}:`, xPos + 5, yPosition);
        
        pdf.setTextColor(15, 23, 42);
        pdf.setFont(undefined, 'bold');
        pdf.text(String(stat.value), xPos + colWidth - 15, yPosition, { align: 'right' });
        pdf.setFont(undefined, 'normal');
      }

      yPosition += 25;

      // === MÉTRIQUES DE PERFORMANCE ===
      pdf.setFontSize(18);
      pdf.setTextColor(15, 23, 42);
      pdf.text('📈 MÉTRIQUES DE PERFORMANCE', 20, yPosition);
      yPosition += 15;

      const performanceData = [
        { 
          label: 'Taux d\'Acceptation des Candidatures', 
          value: `${statsGlobales?.taux_acceptation_candidatures || 0}%`,
          description: 'Pourcentage de candidatures acceptées'
        },
        { 
          label: 'Taux de Complétion des Stages', 
          value: `${statsGlobales?.taux_completion_stages || 0}%`,
          description: 'Pourcentage de stages terminés avec succès'
        },
        { 
          label: 'Offres Actives', 
          value: statsGlobales?.nombre_offres_actives || 0,
          description: 'Nombre d\'offres actuellement ouvertes'
        }
      ];

      performanceData.forEach(metric => {
        // Fond pour chaque métrique
        pdf.setFillColor(239, 246, 255);
        pdf.roundedRect(20, yPosition - 5, pageWidth - 40, 12, 2, 2, 'F');
        
        pdf.setFontSize(12);
        pdf.setTextColor(59, 130, 246);
        pdf.text(metric.label, 25, yPosition);
        
        pdf.setTextColor(15, 23, 42);
        pdf.setFont(undefined, 'bold');
        pdf.text(String(metric.value), pageWidth - 25, yPosition, { align: 'right' });
        pdf.setFont(undefined, 'normal');
        
        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);
        pdf.text(metric.description, 25, yPosition + 5);
        
        yPosition += 18;
      });

      // Vérifier si on a besoin d'une nouvelle page
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      // === ANALYSE PAR SECTEURS ===
      if (statsSecteurs && statsSecteurs.length > 0) {
        yPosition += 10;
        pdf.setFontSize(18);
        pdf.setTextColor(15, 23, 42);
        pdf.text('🏭 RÉPARTITION PAR SECTEURS', 20, yPosition);
        yPosition += 15;

        // Tableau des secteurs
        pdf.setFontSize(10);
        
        // Header du tableau
        pdf.setFillColor(59, 130, 246);
        pdf.rect(20, yPosition, pageWidth - 40, 8, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFont(undefined, 'bold');
        pdf.text('Secteur', 25, yPosition + 5);
        pdf.text('Entreprises', pageWidth / 2, yPosition + 5, { align: 'center' });
        pdf.text('Stages', pageWidth - 30, yPosition + 5, { align: 'right' });
        
        yPosition += 8;
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(15, 23, 42);

        statsSecteurs.forEach((secteur, index) => {
          const bgColor = index % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
          pdf.setFillColor(...bgColor);
          pdf.rect(20, yPosition, pageWidth - 40, 6, 'F');
          
          pdf.text(secteur.secteur || 'N/A', 25, yPosition + 4);
          pdf.text(String(secteur.nombre_entreprises || 0), pageWidth / 2, yPosition + 4, { align: 'center' });
          pdf.text(String(secteur.nombre_stages || 0), pageWidth - 30, yPosition + 4, { align: 'right' });
          
          yPosition += 6;
        });
      }

      // === ÉVOLUTION TEMPORELLE ===
      if (evolution && evolution.length > 0) {
        // Nouvelle page pour les graphiques
        pdf.addPage();
        yPosition = 20;
        
        pdf.setFontSize(18);
        pdf.setTextColor(15, 23, 42);
        pdf.text('📅 ÉVOLUTION TEMPORELLE (12 derniers mois)', 20, yPosition);
        yPosition += 15;

        // Données d'évolution sous forme de tableau
        pdf.setFontSize(9);
        
        // Header
        pdf.setFillColor(59, 130, 246);
        pdf.rect(20, yPosition, pageWidth - 40, 8, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFont(undefined, 'bold');
        
        const colWidth = (pageWidth - 40) / 4;
        pdf.text('Mois', 25, yPosition + 5);
        pdf.text('Inscriptions', 20 + colWidth, yPosition + 5, { align: 'center' });
        pdf.text('Offres', 20 + colWidth * 2, yPosition + 5, { align: 'center' });
        pdf.text('Candidatures', 20 + colWidth * 3, yPosition + 5, { align: 'center' });
        
        yPosition += 8;
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(15, 23, 42);

        evolution.slice(-6).forEach((month, index) => { // Derniers 6 mois seulement
          const bgColor = index % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
          pdf.setFillColor(...bgColor);
          pdf.rect(20, yPosition, pageWidth - 40, 6, 'F');
          
          pdf.text(month.mois || 'N/A', 25, yPosition + 4);
          pdf.text(String(month.nouvelles_inscriptions || 0), 20 + colWidth, yPosition + 4, { align: 'center' });
          pdf.text(String(month.nouvelles_offres || 0), 20 + colWidth * 2, yPosition + 4, { align: 'center' });
          pdf.text(String(month.nouvelles_candidatures || 0), 20 + colWidth * 3, yPosition + 4, { align: 'center' });
          
          yPosition += 6;
        });
      }

      // === FOOTER ===
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(156, 163, 175);
        pdf.text(`Page ${i} sur ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        pdf.text('Rapport généré automatiquement - Confidentiel', pageWidth / 2, pageHeight - 5, { align: 'center' });
      }

      // Sauvegarde du PDF
      const fileName = `rapport-admin-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du rapport PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  // Fonction pour capturer les graphiques et les ajouter au PDF
  const generateAdvancedPDFWithCharts = async () => {
    try {
      setIsGenerating(true);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Générer le rapport de base d'abord
      await generatePDFReport();
      
      // Capturer les graphiques s'ils existent
      const chartElements = document.querySelectorAll('.recharts-responsive-container');
      
      if (chartElements.length > 0) {
        for (let i = 0; i < chartElements.length; i++) {
          const chartElement = chartElements[i];
          
          try {
            const canvas = await html2canvas(chartElement, {
              backgroundColor: '#ffffff',
              scale: 2,
              logging: false
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pageWidth - 40;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addPage();
            pdf.setFontSize(14);
            pdf.text(`Graphique ${i + 1}`, 20, 20);
            pdf.addImage(imgData, 'PNG', 20, 30, imgWidth, imgHeight);
            
          } catch (chartError) {
            console.warn(`Erreur capture graphique ${i}:`, chartError);
          }
        }
        
        // Sauvegarder le PDF avec graphiques
        const fileName = `rapport-admin-complet-${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
      }

    } catch (error) {
      console.error('Erreur génération PDF avancé:', error);
      await generatePDFReport(); // Fallback vers rapport simple
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="report-generator">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de rapport :
        </label>
        <select 
          value={reportType} 
          onChange={(e) => setReportType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="simple">Rapport Simple (Statistiques uniquement)</option>
          <option value="complet">Rapport Complet (avec graphiques)</option>
        </select>
      </div>

      <button
        onClick={reportType === 'complet' ? generateAdvancedPDFWithCharts : generatePDFReport}
        disabled={isGenerating}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all
          ${isGenerating 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
          } text-white
        `}
      >
        {isGenerating ? (
          <>
            <HiRefresh className="animate-spin" />
            Génération en cours...
          </>
        ) : (
          <>
            <HiDownload />
            Générer Rapport PDF
          </>
        )}
      </button>
    </div>
  );
};

export default ReportGenerator;