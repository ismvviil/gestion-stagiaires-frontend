// import React, { useState } from 'react';
// import {
//   FaEnvelope,
//   FaUser,
//   FaBuilding,
//   FaBriefcase,
//   FaPhone,
//   FaComment,
//   FaPaperPlane,
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaSpinner,
//   FaQuestionCircle,
//   FaTools,
//   FaHandshake,
//   FaEllipsisH
// } from 'react-icons/fa';
// import axios from '../../api/axios';
// import styles from './Contact.module.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     nom: '',
//     prenom: '',
//     email: '',
//     telephone: '',
//     entreprise: '',
//     poste: '',
//     type_message: 'question',
//     sujet: '',
//     message: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');
//   const [validationErrors, setValidationErrors] = useState({});

//   // Types de messages avec icônes et descriptions
//   const messageTypes = [
//     {
//       value: 'question',
//       label: 'Question générale',
//       icon: FaQuestionCircle,
//       description: 'Questions sur la plateforme ou nos services',
//       color: '#3b82f6'
//     },
//     {
//       value: 'support',
//       label: 'Support technique',
//       icon: FaTools,
//       description: 'Problèmes techniques ou assistance',
//       color: '#f59e0b'
//     },
//     {
//       value: 'demo',
//       label: 'Demande de démonstration',
//       icon: FaBriefcase,
//       description: 'Présentation personnalisée de la plateforme',
//       color: '#10b981'
//     },
//     {
//       value: 'partenariat',
//       label: 'Proposition de partenariat',
//       icon: FaHandshake,
//       description: 'Collaborations et partenariats commerciaux',
//       color: '#8b5cf6'
//     },
//     {
//       value: 'autre',
//       label: 'Autre',
//       icon: FaEllipsisH,
//       description: 'Autre type de demande',
//       color: '#6b7280'
//     }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Supprimer l'erreur de validation quand l'utilisateur tape
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};

//     // Validation des champs requis
//     if (!formData.nom.trim()) {
//       errors.nom = 'Le nom est requis';
//     } else if (formData.nom.trim().length < 2) {
//       errors.nom = 'Le nom doit contenir au moins 2 caractères';
//     }

//     if (!formData.prenom.trim()) {
//       errors.prenom = 'Le prénom est requis';
//     } else if (formData.prenom.trim().length < 2) {
//       errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
//     }

//     if (!formData.email.trim()) {
//       errors.email = 'L\'email est requis';
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         errors.email = 'Format d\'email invalide';
//       }
//     }

//     if (!formData.sujet.trim()) {
//       errors.sujet = 'Le sujet est requis';
//     } else if (formData.sujet.trim().length < 5) {
//       errors.sujet = 'Le sujet doit contenir au moins 5 caractères';
//     }

//     if (!formData.message.trim()) {
//       errors.message = 'Le message est requis';
//     } else if (formData.message.trim().length < 10) {
//       errors.message = 'Le message doit contenir au moins 10 caractères';
//     }

//     // Validation du téléphone si fourni
//     // if (formData.telephone && formData.telephone.trim()) {
//     //   const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{8,15}$/;
//     //   if (!phoneRegex.test(formData.telephone.trim())) {
//     //     errors.telephone = 'Format de téléphone invalide';
//     //   }
//     // }

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setValidationErrors({});

//     try {
//       const response = await axios.post('/contact/', formData);
      
//       if (response.data.success) {
//         setSuccess(true);
//         setFormData({
//           nom: '',
//           prenom: '',
//           email: '',
//           telephone: '',
//           entreprise: '',
//           poste: '',
//           type_message: 'question',
//           sujet: '',
//           message: ''
//         });
//       }
//     } catch (err) {
//       if (err.response?.data?.detail) {
//         if (Array.isArray(err.response.data.detail)) {
//           // Erreurs de validation Pydantic
//           const newErrors = {};
//           err.response.data.detail.forEach(error => {
//             const field = error.loc[error.loc.length - 1];
//             newErrors[field] = error.msg;
//           });
//           setValidationErrors(newErrors);
//         } else {
//           setError(err.response.data.detail);
//         }
//       } else {
//         setError('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setSuccess(false);
//     setError('');
//     setValidationErrors({});
//   };

//   const currentMessageType = messageTypes.find(type => type.value === formData.type_message);

//   if (success) {
//     return (
//       <div className={styles.contactContainer}>
//         <div className={styles.successCard}>
//           <div className={styles.successIcon}>
//             <FaCheckCircle />
//           </div>
//           <h2 className={styles.successTitle}>Message envoyé avec succès !</h2>
//           <p className={styles.successMessage}>
//             Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
//           </p>
//           <button 
//             onClick={resetForm}
//             className={styles.newMessageButton}
//           >
//             Envoyer un nouveau message
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.contactContainer}>
//       <div className={styles.contactCard}>
//         {/* Header */}
//         <div className={styles.header}>
//           <div className={styles.headerIcon}>
//             <FaEnvelope />
//           </div>
//           <h1 className={styles.title}>Contactez-nous</h1>
//           <p className={styles.subtitle}>
//             Une question ? Un problème ? Notre équipe est là pour vous aider !
//           </p>
//         </div>

//         {/* Message d'erreur global */}
//         {error && (
//           <div className={styles.errorAlert}>
//             <FaExclamationTriangle className={styles.errorIcon} />
//             {error}
//           </div>
//         )}

//         {/* Formulaire */}
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {/* Informations personnelles */}
//           <div className={styles.section}>
//             <h3 className={styles.sectionTitle}>Informations personnelles</h3>
            
//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="prenom" className={styles.label}>
//                   <FaUser className={styles.labelIcon} />
//                   Prénom *
//                 </label>
//                 <input
//                   type="text"
//                   id="prenom"
//                   name="prenom"
//                   value={formData.prenom}
//                   onChange={handleChange}
//                   className={`${styles.input} ${validationErrors.prenom ? styles.inputError : ''}`}
//                   placeholder="Votre prénom"
//                 />
//                 {validationErrors.prenom && (
//                   <span className={styles.errorMessage}>{validationErrors.prenom}</span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="nom" className={styles.label}>
//                   <FaUser className={styles.labelIcon} />
//                   Nom *
//                 </label>
//                 <input
//                   type="text"
//                   id="nom"
//                   name="nom"
//                   value={formData.nom}
//                   onChange={handleChange}
//                   className={`${styles.input} ${validationErrors.nom ? styles.inputError : ''}`}
//                   placeholder="Votre nom"
//                 />
//                 {validationErrors.nom && (
//                   <span className={styles.errorMessage}>{validationErrors.nom}</span>
//                 )}
//               </div>
//             </div>

//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="email" className={styles.label}>
//                   <FaEnvelope className={styles.labelIcon} />
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
//                   placeholder="votre.email@exemple.com"
//                 />
//                 {validationErrors.email && (
//                   <span className={styles.errorMessage}>{validationErrors.email}</span>
//                 )}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="telephone" className={styles.label}>
//                   <FaPhone className={styles.labelIcon} />
//                   Téléphone
//                 </label>
//                 <input
//                   type="tel"
//                   id="telephone"
//                   name="telephone"
//                   value={formData.telephone}
//                   onChange={handleChange}
//                   className={`${styles.input} ${validationErrors.telephone ? styles.inputError : ''}`}
//                   placeholder="06 00 11 00 22"
//                 />
//                 {validationErrors.telephone && (
//                   <span className={styles.errorMessage}>{validationErrors.telephone}</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Informations professionnelles */}
//           <div className={styles.section}>
//             <h3 className={styles.sectionTitle}>Informations professionnelles (optionnel)</h3>
            
//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="entreprise" className={styles.label}>
//                   <FaBuilding className={styles.labelIcon} />
//                   Entreprise
//                 </label>
//                 <input
//                   type="text"
//                   id="entreprise"
//                   name="entreprise"
//                   value={formData.entreprise}
//                   onChange={handleChange}
//                   className={styles.input}
//                   placeholder="Nom de votre entreprise"
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="poste" className={styles.label}>
//                   <FaBriefcase className={styles.labelIcon} />
//                   Poste
//                 </label>
//                 <input
//                   type="text"
//                   id="poste"
//                   name="poste"
//                   value={formData.poste}
//                   onChange={handleChange}
//                   className={styles.input}
//                   placeholder="Votre fonction"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Type de message */}
//           <div className={styles.section}>
//             <h3 className={styles.sectionTitle}>Type de demande</h3>
            
//             <div className={styles.messageTypeGrid}>
//               {messageTypes.map((type) => {
//                 const IconComponent = type.icon;
//                 return (
//                   <label
//                     key={type.value}
//                     className={`${styles.messageTypeCard} ${
//                       formData.type_message === type.value ? styles.messageTypeActive : ''
//                     }`}
//                     style={{ '--type-color': type.color }}
//                   >
//                     <input
//                       type="radio"
//                       name="type_message"
//                       value={type.value}
//                       checked={formData.type_message === type.value}
//                       onChange={handleChange}
//                       className={styles.messageTypeRadio}
//                     />
//                     <div className={styles.messageTypeIcon}>
//                       <IconComponent />
//                     </div>
//                     <div className={styles.messageTypeInfo}>
//                       <span className={styles.messageTypeLabel}>{type.label}</span>
//                       <span className={styles.messageTypeDescription}>{type.description}</span>
//                     </div>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Message */}
//           <div className={styles.section}>
//             <h3 className={styles.sectionTitle}>Votre message</h3>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="sujet" className={styles.label}>
//                 <FaComment className={styles.labelIcon} />
//                 Sujet *
//               </label>
//               <input
//                 type="text"
//                 id="sujet"
//                 name="sujet"
//                 value={formData.sujet}
//                 onChange={handleChange}
//                 className={`${styles.input} ${validationErrors.sujet ? styles.inputError : ''}`}
//                 placeholder="Résumé de votre demande"
//               />
//               {validationErrors.sujet && (
//                 <span className={styles.errorMessage}>{validationErrors.sujet}</span>
//               )}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="message" className={styles.label}>
//                 <FaComment className={styles.labelIcon} />
//                 Message *
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={6}
//                 className={`${styles.textarea} ${validationErrors.message ? styles.inputError : ''}`}
//                 placeholder="Décrivez votre demande en détail..."
//               />
//               {validationErrors.message && (
//                 <span className={styles.errorMessage}>{validationErrors.message}</span>
//               )}
//               <div className={styles.characterCount}>
//                 {formData.message.length} / 2000 caractères
//               </div>
//             </div>
//           </div>

//           {/* Bouton d'envoi */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`${styles.submitButton} ${loading ? styles.submitButtonLoading : ''}`}
//           >
//             {loading ? (
//               <>
//                 <FaSpinner className={styles.spinner} />
//                 Envoi en cours...
//               </>
//             ) : (
//               <>
//                 <FaPaperPlane className={styles.submitIcon} />
//                 Envoyer le message
//               </>
//             )}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className={styles.footer}>
//           <p className={styles.footerText}>
//             💡 Notre équipe vous répondra généralement dans les 24 heures.
//           </p>
//           <p className={styles.footerText}>
//             Pour les urgences, contactez directement : 
//             <a href="mailto:souifiiismail@gmail.com" className={styles.emailLink}>
//               souifiiismail@gmail.com
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import {
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaPhone,
  FaComment,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaQuestionCircle,
  FaTools,
  FaHandshake,
  FaEllipsisH
} from 'react-icons/fa';
import axios from '../../api/axios';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    poste: '',
    type_message: 'question',
    sujet: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Types de messages avec icônes et descriptions
  const messageTypes = [
    {
      value: 'question',
      label: 'Question générale',
      icon: FaQuestionCircle,
      description: 'Questions sur la plateforme ou nos services',
      color: '#3b82f6'
    },
    {
      value: 'support',
      label: 'Support technique',
      icon: FaTools,
      description: 'Problèmes techniques ou assistance',
      color: '#f59e0b'
    },
    {
      value: 'demo',
      label: 'Demande de démonstration',
      icon: FaBriefcase,
      description: 'Présentation personnalisée de la plateforme',
      color: '#10b981'
    },
    {
      value: 'partenariat',
      label: 'Proposition de partenariat',
      icon: FaHandshake,
      description: 'Collaborations et partenariats commerciaux',
      color: '#8b5cf6'
    },
    {
      value: 'autre',
      label: 'Autre',
      icon: FaEllipsisH,
      description: 'Autre type de demande',
      color: '#6b7280'
    }
  ];

  // Fonction pour formater le numéro de téléphone marocain
  const formatMoroccanPhone = (value) => {
    // Supprimer tous les caractères non numériques
    const numbers = value.replace(/\D/g, '');
    
    // Limiter à 10 chiffres pour les numéros marocains
    const limitedNumbers = numbers.slice(0, 10);
    
    // Formater selon le pattern marocain: XX XX XX XX XX
    if (limitedNumbers.length >= 2) {
      let formatted = limitedNumbers.slice(0, 2);
      if (limitedNumbers.length >= 4) {
        formatted += ' ' + limitedNumbers.slice(2, 4);
      }
      if (limitedNumbers.length >= 6) {
        formatted += ' ' + limitedNumbers.slice(4, 6);
      }
      if (limitedNumbers.length >= 8) {
        formatted += ' ' + limitedNumbers.slice(6, 8);
      }
      if (limitedNumbers.length >= 10) {
        formatted += ' ' + limitedNumbers.slice(8, 10);
      }
      return formatted;
    }
    
    return limitedNumbers;
  };

  // Fonction pour valider le numéro de téléphone marocain
  const validateMoroccanPhone = (phone) => {
    if (!phone || !phone.trim()) return true; // Optionnel
    
    // Supprimer les espaces pour la validation
    const cleanPhone = phone.replace(/\s/g, '');
    
    // Vérifier le format: 10 chiffres commençant par 06, 07, 05, etc.
    const moroccanMobileRegex = /^(06|07|05)[0-9]{8}$/;
    const moroccanLandlineRegex = /^(05)[0-9]{8}$/;
    
    return moroccanMobileRegex.test(cleanPhone) || moroccanLandlineRegex.test(cleanPhone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Formater le téléphone en temps réel
    if (name === 'telephone') {
      processedValue = formatMoroccanPhone(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Supprimer l'erreur de validation quand l'utilisateur tape
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validation des champs requis
    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      errors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est requis';
    } else if (formData.prenom.trim().length < 2) {
      errors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
    }

    if (!formData.sujet.trim()) {
      errors.sujet = 'Le sujet est requis';
    } else if (formData.sujet.trim().length < 5) {
      errors.sujet = 'Le sujet doit contenir au moins 5 caractères';
    }

    if (!formData.message.trim()) {
      errors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    // Validation du téléphone marocain
    if (formData.telephone && formData.telephone.trim()) {
      if (!validateMoroccanPhone(formData.telephone.trim())) {
        errors.telephone = 'Format de téléphone marocain invalide (ex: 06 00 11 22 33)';
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError('');
    setValidationErrors({});

    try {
      // Nettoyer le numéro de téléphone avant l'envoi (supprimer les espaces)
      const cleanedFormData = {
        ...formData,
        telephone: formData.telephone ? formData.telephone.replace(/\s/g, '') : ''
      };

      const response = await axios.post('/contact/', cleanedFormData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          entreprise: '',
          poste: '',
          type_message: 'question',
          sujet: '',
          message: ''
        });
      }
    } catch (err) {
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Erreurs de validation Pydantic
          const newErrors = {};
          err.response.data.detail.forEach(error => {
            const field = error.loc[error.loc.length - 1];
            newErrors[field] = error.msg;
          });
          setValidationErrors(newErrors);
        } else {
          setError(err.response.data.detail);
        }
      } else {
        setError('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError('');
    setValidationErrors({});
  };

  if (success) {
    return (
      <div className={styles.contactContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h2 className={styles.successTitle}>Message envoyé avec succès !</h2>
          <p className={styles.successMessage}>
            Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
          </p>
          <button 
            onClick={resetForm}
            className={styles.newMessageButton}
          >
            Envoyer un nouveau message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactCard}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FaEnvelope />
          </div>
          <h1 className={styles.title}>Contactez-nous</h1>
          <p className={styles.subtitle}>
            Une question ? Un problème ? Notre équipe est là pour vous aider !
          </p>
        </div>

        {/* Message d'erreur global */}
        {error && (
          <div className={styles.errorAlert}>
            <FaExclamationTriangle className={styles.errorIcon} />
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Informations personnelles */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informations personnelles</h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="prenom" className={styles.label}>
                  <FaUser className={styles.labelIcon} />
                  Prénom *
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`${styles.input} ${validationErrors.prenom ? styles.inputError : ''}`}
                  placeholder="Votre prénom"
                />
                {validationErrors.prenom && (
                  <span className={styles.errorMessage}>{validationErrors.prenom}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nom" className={styles.label}>
                  <FaUser className={styles.labelIcon} />
                  Nom *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`${styles.input} ${validationErrors.nom ? styles.inputError : ''}`}
                  placeholder="Votre nom"
                />
                {validationErrors.nom && (
                  <span className={styles.errorMessage}>{validationErrors.nom}</span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <FaEnvelope className={styles.labelIcon} />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
                  placeholder="votre.email@exemple.com"
                />
                {validationErrors.email && (
                  <span className={styles.errorMessage}>{validationErrors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telephone" className={styles.label}>
                  <FaPhone className={styles.labelIcon} />
                  Téléphone (Maroc)
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`${styles.input} ${validationErrors.telephone ? styles.inputError : ''}`}
                  placeholder="06 00 11 22 33"
                  maxLength="14" // XX XX XX XX XX = 14 caractères avec espaces
                />
                {validationErrors.telephone && (
                  <span className={styles.errorMessage}>{validationErrors.telephone}</span>
                )}
                <div className={styles.phoneHint}>
                  <small>Format accepté : 06 00 11 22 33 (mobile) ou 05 XX XX XX XX (fixe)</small>
                </div>
              </div>
            </div>
          </div>

          {/* Informations professionnelles */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informations professionnelles (optionnel)</h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="entreprise" className={styles.label}>
                  <FaBuilding className={styles.labelIcon} />
                  Entreprise
                </label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="poste" className={styles.label}>
                  <FaBriefcase className={styles.labelIcon} />
                  Poste
                </label>
                <input
                  type="text"
                  id="poste"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Votre fonction"
                />
              </div>
            </div>
          </div>

          {/* Type de message */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Type de demande</h3>
            
            <div className={styles.messageTypeGrid}>
              {messageTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`${styles.messageTypeCard} ${
                      formData.type_message === type.value ? styles.messageTypeActive : ''
                    }`}
                    style={{ '--type-color': type.color }}
                  >
                    <input
                      type="radio"
                      name="type_message"
                      value={type.value}
                      checked={formData.type_message === type.value}
                      onChange={handleChange}
                      className={styles.messageTypeRadio}
                    />
                    <div className={styles.messageTypeIcon}>
                      <IconComponent />
                    </div>
                    <div className={styles.messageTypeInfo}>
                      <span className={styles.messageTypeLabel}>{type.label}</span>
                      <span className={styles.messageTypeDescription}>{type.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Votre message</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="sujet" className={styles.label}>
                <FaComment className={styles.labelIcon} />
                Sujet *
              </label>
              <input
                type="text"
                id="sujet"
                name="sujet"
                value={formData.sujet}
                onChange={handleChange}
                className={`${styles.input} ${validationErrors.sujet ? styles.inputError : ''}`}
                placeholder="Résumé de votre demande"
              />
              {validationErrors.sujet && (
                <span className={styles.errorMessage}>{validationErrors.sujet}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                <FaComment className={styles.labelIcon} />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`${styles.textarea} ${validationErrors.message ? styles.inputError : ''}`}
                placeholder="Décrivez votre demande en détail..."
              />
              {validationErrors.message && (
                <span className={styles.errorMessage}>{validationErrors.message}</span>
              )}
              <div className={styles.characterCount}>
                {formData.message.length} / 2000 caractères
              </div>
            </div>
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitButton} ${loading ? styles.submitButtonLoading : ''}`}
          >
            {loading ? (
              <>
                <FaSpinner className={styles.spinner} />
                Envoi en cours...
              </>
            ) : (
              <>
                <FaPaperPlane className={styles.submitIcon} />
                Envoyer le message
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            💡 Notre équipe vous répondra généralement dans les 24 heures.
          </p>
          <p className={styles.footerText}>
            Pour les urgences, contactez directement : 
            <a href="mailto:souifiiismail@gmail.com" className={styles.emailLink}>
              souifiiismail@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;