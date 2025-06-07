// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axios';
// import styles from './RegisterRecruteur.module.css';

// const RegisterRecruteur = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     mot_de_passe: '',
//     nom: '',
//     prenom: '',
//     poste: '',
//     entreprise_id: ''
//   });
//   const [entreprises, setEntreprises] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingEntreprises, setFetchingEntreprises] = useState(true);
//   const { register, error } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEntreprises = async () => {
//       try {
//         const response = await axios.get('/entreprises');
//         setEntreprises(response.data);
//       } catch (err) {
//         console.error('Erreur lors de la récupération des entreprises:', err);
//       } finally {
//         setFetchingEntreprises(false);
//       }
//     };

//     fetchEntreprises();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       await register(formData, 'recruteur');
//       navigate('/login');
//     } catch (err) {
//       console.error('Erreur d\'inscription:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.registerContainer}>
//       <div className={styles.formCard}>
//         <h2 className={styles.title}>Inscription Recruteur</h2>
        
//         {error && <div className={styles.errorMessage}>{error}</div>}
        
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.formGrid}>
//             <div className={styles.formGroup}>
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="mot_de_passe">Mot de passe</label>
//               <input
//                 type="password"
//                 id="mot_de_passe"
//                 name="mot_de_passe"
//                 value={formData.mot_de_passe}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="nom">Nom</label>
//               <input
//                 type="text"
//                 id="nom"
//                 name="nom"
//                 value={formData.nom}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="prenom">Prénom</label>
//               <input
//                 type="text"
//                 id="prenom"
//                 name="prenom"
//                 value={formData.prenom}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="poste">Poste</label>
//               <input
//                 type="text"
//                 id="poste"
//                 name="poste"
//                 value={formData.poste}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
            
//             <div className={styles.formGroup}>
//               <label htmlFor="entreprise_id">Entreprise</label>
//               <select
//                 id="entreprise_id"
//                 name="entreprise_id"
//                 value={formData.entreprise_id}
//                 onChange={handleChange}
//                 required
//                 disabled={fetchingEntreprises}
//                 className={styles.select}
//               >
//                 <option value="">Sélectionner une entreprise</option>
//                 {entreprises.map((entreprise) => (
//                   <option key={entreprise.id} value={entreprise.id}>
//                     {entreprise.raison_social}
//                   </option>
//                 ))}
//               </select>
//               {fetchingEntreprises && <div className={styles.loadingIndicator}>Chargement des entreprises...</div>}
//             </div>
//           </div>
          
//           <button 
//             type="submit" 
//             disabled={loading} 
//             className={styles.submitButton}
//           >
//             {loading ? 'Inscription en cours...' : 'S\'inscrire'}
//           </button>
//         </form>
        
//         <p className={styles.loginRedirect}>
//           Vous avez déjà un compte ?{' '}
//           <Link to="/login" className={styles.loginLink}>Se connecter</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterRecruteur;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axios';
// import {
//   FaUserTie,
//   FaEnvelope,
//   FaLock,
//   FaUser,
//   FaBriefcase,
//   FaBuilding,
//   FaEye,
//   FaEyeSlash,
//   FaCheckCircle,
//   FaSpinner,
//   FaExclamationTriangle,
//   FaArrowRight,
//   FaUserGraduate,
//   FaChevronDown
// } from 'react-icons/fa';
// import styles from './RegisterRecruteur.module.css';

// const RegisterRecruteur = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     mot_de_passe: '',
//     nom: '',
//     prenom: '',
//     poste: '',
//     entreprise_id: ''
//   });
  
//   const [entreprises, setEntreprises] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingEntreprises, setFetchingEntreprises] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationStates, setValidationStates] = useState({});
//   const [focusedField, setFocusedField] = useState(null);
  
//   const { register, error } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEntreprises = async () => {
//       try {
//         const response = await axios.get('/entreprises');
//         setEntreprises(response.data);
//       } catch (err) {
//         console.error('Erreur lors de la récupération des entreprises:', err);
//       } finally {
//         setFetchingEntreprises(false);
//       }
//     };

//     fetchEntreprises();
//   }, []);

//   // Validation en temps réel
//   useEffect(() => {
//     const newValidationStates = {};
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     newValidationStates.email = formData.email && emailRegex.test(formData.email);
    
//     // Password validation
//     newValidationStates.mot_de_passe = formData.mot_de_passe && formData.mot_de_passe.length >= 6;
    
//     // Name validations
//     newValidationStates.nom = formData.nom && formData.nom.trim().length >= 2;
//     newValidationStates.prenom = formData.prenom && formData.prenom.trim().length >= 2;
    
//     // Position validation
//     newValidationStates.poste = formData.poste && formData.poste.trim().length >= 2;
    
//     // Company validation
//     newValidationStates.entreprise_id = formData.entreprise_id !== '';
    
//     setValidationStates(newValidationStates);
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       await register(formData, 'recruteur');
//       navigate('/login');
//     } catch (err) {
//       console.error('Erreur d\'inscription:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isFormValid = Object.values(validationStates).every(state => state === true);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0 }
//   };

//   const floatingElements = [
//     { icon: FaBriefcase, delay: 0, x: 10, y: 15 },
//     { icon: FaBuilding, delay: 1, x: 85, y: 25 },
//     { icon: FaUserTie, delay: 2, x: 15, y: 75 },
//     { icon: FaEnvelope, delay: 1.5, x: 80, y: 80 }
//   ];

//   return (
//     <div className={styles.registerContainer}>
//       {/* Éléments flottants animés */}
//       {floatingElements.map((element, index) => (
//         <motion.div
//           key={index}
//           className={styles.floatingElement}
//           style={{ left: `${element.x}%`, top: `${element.y}%` }}
//           animate={{
//             y: [0, -10, 0],
//             rotate: [0, 5, 0],
//             scale: [1, 1.1, 1]
//           }}
//           transition={{
//             duration: 4,
//             delay: element.delay,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         >
//           <element.icon />
//         </motion.div>
//       ))}

//       <motion.div
//         className={styles.formCard}
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Header avec icône */}
//         <motion.div className={styles.header} variants={itemVariants}>
//           <div className={styles.iconContainer}>
//             <FaUserTie className={styles.headerIcon} />
//           </div>
//           <h2 className={styles.title}>Inscription Recruteur</h2>
//           <p className={styles.subtitle}>
//             Rejoignez notre plateforme pour identifier les meilleurs talents
//           </p>
//         </motion.div>
        
//         {/* Message d'erreur */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               className={styles.errorMessage}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               variants={itemVariants}
//             >
//               <FaExclamationTriangle className={styles.errorIcon} />
//               {error}
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         <motion.form 
//           className={styles.form} 
//           onSubmit={handleSubmit}
//           variants={itemVariants}
//         >
//           <div className={styles.formGrid}>
//             {/* Email */}
//             <motion.div className={styles.formGroup} variants={itemVariants}>
//               <label htmlFor="email" className={styles.label}>
//                 <FaEnvelope className={styles.labelIcon} />
//                 Email professionnel *
//               </label>
//               <div className={styles.inputContainer}>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('email')}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   placeholder="votre.email@entreprise.com"
//                   className={`${styles.input} ${
//                     validationStates.email ? styles.inputValid : ''
//                   } ${focusedField === 'email' ? styles.inputFocused : ''}`}
//                 />
//                 {validationStates.email && (
//                   <motion.div
//                     className={styles.validationIcon}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <FaCheckCircle />
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
            
//             {/* Mot de passe */}
//             <motion.div className={styles.formGroup} variants={itemVariants}>
//               <label htmlFor="mot_de_passe" className={styles.label}>
//                 <FaLock className={styles.labelIcon} />
//                 Mot de passe *
//               </label>
//               <div className={styles.inputContainer}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="mot_de_passe"
//                   name="mot_de_passe"
//                   value={formData.mot_de_passe}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('mot_de_passe')}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   placeholder="Minimum 6 caractères"
//                   className={`${styles.input} ${
//                     validationStates.mot_de_passe ? styles.inputValid : ''
//                   } ${focusedField === 'mot_de_passe' ? styles.inputFocused : ''}`}
//                 />
//                 <button
//                   type="button"
//                   className={styles.passwordToggle}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//                 {validationStates.mot_de_passe && (
//                   <motion.div
//                     className={styles.validationIcon}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <FaCheckCircle />
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
            
//             {/* Nom */}
//             <motion.div className={styles.formGroup} variants={itemVariants}>
//               <label htmlFor="nom" className={styles.label}>
//                 <FaUser className={styles.labelIcon} />
//                 Nom *
//               </label>
//               <div className={styles.inputContainer}>
//                 <input
//                   type="text"
//                   id="nom"
//                   name="nom"
//                   value={formData.nom}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('nom')}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   placeholder="Votre nom de famille"
//                   className={`${styles.input} ${
//                     validationStates.nom ? styles.inputValid : ''
//                   } ${focusedField === 'nom' ? styles.inputFocused : ''}`}
//                 />
//                 {validationStates.nom && (
//                   <motion.div
//                     className={styles.validationIcon}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <FaCheckCircle />
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
            
//             {/* Prénom */}
//             <motion.div className={styles.formGroup} variants={itemVariants}>
//               <label htmlFor="prenom" className={styles.label}>
//                 <FaUser className={styles.labelIcon} />
//                 Prénom *
//               </label>
//               <div className={styles.inputContainer}>
//                 <input
//                   type="text"
//                   id="prenom"
//                   name="prenom"
//                   value={formData.prenom}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('prenom')}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   placeholder="Votre prénom"
//                   className={`${styles.input} ${
//                     validationStates.prenom ? styles.inputValid : ''
//                   } ${focusedField === 'prenom' ? styles.inputFocused : ''}`}
//                 />
//                 {validationStates.prenom && (
//                   <motion.div
//                     className={styles.validationIcon}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <FaCheckCircle />
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
            
//             {/* Poste */}
//             <motion.div className={styles.formGroup} variants={itemVariants}>
//               <label htmlFor="poste" className={styles.label}>
//                 <FaBriefcase className={styles.labelIcon} />
//                 Poste *
//               </label>
//               <div className={styles.inputContainer}>
//                 <input
//                   type="text"
//                   id="poste"
//                   name="poste"
//                   value={formData.poste}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('poste')}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   placeholder="Recruteur, Talent Acquisition..."
//                   className={`${styles.input} ${
//                     validationStates.poste ? styles.inputValid : ''
//                   } ${focusedField === 'poste' ? styles.inputFocused : ''}`}
//                 />
//                 {validationStates.poste && (
//                   <motion.div
//                     className={styles.validationIcon}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <FaCheckCircle />
//                   </motion.div>
//                 )}
//               </div>
//             </motion.div>
            
//             {/* Entreprise */}
//             <motion.div className={styles.formGroup} variants={itemVariants}>
//               <label htmlFor="entreprise_id" className={styles.label}>
//                 <FaBuilding className={styles.labelIcon} />
//                 Entreprise *
//               </label>
//               <div className={styles.selectContainer}>
//                 <select
//                   id="entreprise_id"
//                   name="entreprise_id"
//                   value={formData.entreprise_id}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('entreprise_id')}
//                   onBlur={() => setFocusedField(null)}
//                   required
//                   disabled={fetchingEntreprises}
//                   className={`${styles.select} ${
//                     validationStates.entreprise_id ? styles.selectValid : ''
//                   } ${focusedField === 'entreprise_id' ? styles.selectFocused : ''}`}
//                 >
//                   <option value="">
//                     {fetchingEntreprises ? 'Chargement...' : 'Sélectionner votre entreprise'}
//                   </option>
//                   {entreprises.map((entreprise) => (
//                     <option key={entreprise.id} value={entreprise.id}>
//                       {entreprise.raison_social}
//                     </option>
//                   ))}
//                 </select>
//                 <FaChevronDown className={styles.selectIcon} />
//                 {validationStates.entreprise_id && (
//                   <motion.div
//                     className={styles.validationIcon}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <FaCheckCircle />
//                   </motion.div>
//                 )}
//               </div>
              
//               {fetchingEntreprises && (
//                 <motion.div 
//                   className={styles.loadingIndicator}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <FaSpinner className={styles.spinner} />
//                   Chargement des entreprises...
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>
          
//           {/* Bouton de soumission */}
//           <motion.button 
//             type="submit" 
//             disabled={loading || !isFormValid}
//             className={`${styles.submitButton} ${
//               isFormValid ? styles.submitButtonReady : ''
//             }`}
//             variants={itemVariants}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? (
//               <>
//                 <FaSpinner className={styles.buttonSpinner} />
//                 Inscription en cours...
//               </>
//             ) : (
//               <>
//                 S'inscrire en tant que Recruteur
//                 <FaArrowRight className={styles.buttonIcon} />
//               </>
//             )}
//           </motion.button>
//         </motion.form>
        
//         {/* Liens de redirection */}
//         <motion.div className={styles.redirectLinks} variants={itemVariants}>
//           <p className={styles.loginRedirect}>
//             Vous avez déjà un compte ?{' '}
//             <Link to="/login" className={styles.loginLink}>
//               Se connecter
//             </Link>
//           </p>
          
//           <div className={styles.alternativeRegistration}>
//             <p className={styles.alternativeText}>Ou s'inscrire en tant que :</p>
//             <div className={styles.alternativeLinks}>
//               <Link to="/register/stagiaire" className={styles.alternativeLink}>
//                 <FaUserGraduate className={styles.alternativeIcon} />
//                 Stagiaire
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterRecruteur;

///////////////////////////////////////////////////////////////////////////////////////::


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import {
  FaUserTie,
  FaEnvelope,
  FaLock,
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaArrowRight,
  FaUserGraduate,
  FaChevronDown,
  FaPlus,
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaUsers,
  FaIndustry
} from 'react-icons/fa';
import styles from './RegisterRecruteur.module.css';

const RegisterRecruteur = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    nom: '',
    prenom: '',
    poste: '',
    mode_entreprise: 'existante', // 'existante' ou 'nouvelle'
    entreprise_id: '',
    entreprise: {
      raison_social: '',
      secteur_activite: '',
      description: '',
      adresse: '',
      ville: '',
      code_postal: '',
      pays: 'France',
      telephone: '',
      site_web: '',
      taille_entreprise: ''
    }
  });
  
  const [entreprises, setEntreprises] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingEntreprises, setFetchingEntreprises] = useState(true);
  const [searchingEntreprises, setSearchingEntreprises] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationStates, setValidationStates] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  
  const { register, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const response = await axios.get('/entreprises');
        setEntreprises(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des entreprises:', err);
      } finally {
        setFetchingEntreprises(false);
      }
    };

    fetchEntreprises();
  }, []);

  // Recherche d'entreprises en temps réel
  useEffect(() => {
    const searchEntreprises = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setSearchingEntreprises(true);
      try {
        const response = await axios.get(`/entreprises/search?q=${encodeURIComponent(searchQuery)}&limit=10`);
        setSearchResults(response.data);
      } catch (err) {
        console.error('Erreur lors de la recherche:', err);
        setSearchResults([]);
      } finally {
        setSearchingEntreprises(false);
      }
    };

    const debounceTimer = setTimeout(searchEntreprises, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Validation en temps réel
  useEffect(() => {
    const newValidationStates = {};
    
    // Validations utilisateur
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    newValidationStates.email = formData.email && emailRegex.test(formData.email);
    newValidationStates.mot_de_passe = formData.mot_de_passe && formData.mot_de_passe.length >= 6;
    newValidationStates.nom = formData.nom && formData.nom.trim().length >= 2;
    newValidationStates.prenom = formData.prenom && formData.prenom.trim().length >= 2;
    newValidationStates.poste = formData.poste && formData.poste.trim().length >= 2;
    
    // Validations entreprise selon le mode
    if (formData.mode_entreprise === 'existante') {
      newValidationStates.entreprise_id = formData.entreprise_id !== '';
    } else {
      newValidationStates.raison_social = formData.entreprise.raison_social && formData.entreprise.raison_social.trim().length >= 2;
      newValidationStates.secteur_activite = formData.entreprise.secteur_activite && formData.entreprise.secteur_activite.trim().length >= 2;
    }
    
    setValidationStates(newValidationStates);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEntrepriseChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      entreprise: { ...formData.entreprise, [name]: value }
    });
  };

  const handleModeChange = (mode) => {
    setFormData({
      ...formData,
      mode_entreprise: mode,
      entreprise_id: '',
      entreprise: {
        raison_social: '',
        secteur_activite: '',
        description: '',
        adresse: '',
        ville: '',
        code_postal: '',
        pays: 'France',
        telephone: '',
        site_web: '',
        taille_entreprise: ''
      }
    });
    setSearchQuery('');
    setSearchResults([]);
  };

  const selectEntreprise = (entreprise) => {
    setFormData({ ...formData, entreprise_id: entreprise.id });
    setSearchQuery(entreprise.raison_social);
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Préparer les données selon le nouveau format
      const submitData = {
        email: formData.email,
        mot_de_passe: formData.mot_de_passe,
        nom: formData.nom,
        prenom: formData.prenom,
        poste: formData.poste,
        mode_entreprise: formData.mode_entreprise
      };

      if (formData.mode_entreprise === 'existante') {
        submitData.entreprise_id = parseInt(formData.entreprise_id);
      } else {
        submitData.entreprise = formData.entreprise;
      }

      console.log('📝 Données à envoyer:', submitData);
      
      await register(submitData, 'recruteur');
      navigate('/login');
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const baseValid = validationStates.email && validationStates.mot_de_passe && 
                     validationStates.nom && validationStates.prenom && validationStates.poste;
    
    if (formData.mode_entreprise === 'existante') {
      return baseValid && validationStates.entreprise_id;
    } else {
      return baseValid && validationStates.raison_social && validationStates.secteur_activite;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const floatingElements = [
    { icon: FaBriefcase, delay: 0, x: 10, y: 15 },
    { icon: FaBuilding, delay: 1, x: 85, y: 25 },
    { icon: FaUserTie, delay: 2, x: 15, y: 75 },
    { icon: FaEnvelope, delay: 1.5, x: 80, y: 80 }
  ];

  const secteurs = [
    "Technologie", "Finance", "Santé", "Éducation", "Commerce", "Industrie",
    "Conseil", "Marketing", "Ressources Humaines", "Immobilier", "Transport",
    "Énergie", "Télécommunications", "Média", "Tourisme", "Agriculture", "Autre"
  ];

  const taillesEntreprise = [
    { value: "1-10", label: "1-10 employés" },
    { value: "11-50", label: "11-50 employés" },
    { value: "51-200", label: "51-200 employés" },
    { value: "200+", label: "Plus de 200 employés" }
  ];

  return (
    <div className={styles.registerContainer}>
      {/* Éléments flottants animés */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={styles.floatingElement}
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <element.icon />
        </motion.div>
      ))}

      <motion.div
        className={styles.formCard}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className={styles.header} variants={itemVariants}>
          <div className={styles.iconContainer}>
            <FaUserTie className={styles.headerIcon} />
          </div>
          <h2 className={styles.title}>Inscription Recruteur</h2>
          <p className={styles.subtitle}>
            Rejoignez notre plateforme pour identifier les meilleurs talents
          </p>
        </motion.div>
        
        {/* Message d'erreur */}
        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.errorMessage}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              variants={itemVariants}
            >
              <FaExclamationTriangle className={styles.errorIcon} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.form 
          className={styles.form} 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {/* Informations personnelles */}
          <div className={styles.sectionTitle}>
            <FaUser className={styles.sectionIcon} />
            <h3>Informations personnelles</h3>
          </div>

          <div className={styles.formGrid}>
            {/* Email */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="email" className={styles.label}>
                <FaEnvelope className={styles.labelIcon} />
                Email professionnel *
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="votre.email@entreprise.com"
                  className={`${styles.input} ${
                    validationStates.email ? styles.inputValid : ''
                  } ${focusedField === 'email' ? styles.inputFocused : ''}`}
                />
                {validationStates.email && (
                  <motion.div
                    className={styles.validationIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Mot de passe */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="mot_de_passe" className={styles.label}>
                <FaLock className={styles.labelIcon} />
                Mot de passe *
              </label>
              <div className={styles.inputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('mot_de_passe')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Minimum 6 caractères"
                  className={`${styles.input} ${
                    validationStates.mot_de_passe ? styles.inputValid : ''
                  } ${focusedField === 'mot_de_passe' ? styles.inputFocused : ''}`}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {validationStates.mot_de_passe && (
                  <motion.div
                    className={styles.validationIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Nom */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="nom" className={styles.label}>
                <FaUser className={styles.labelIcon} />
                Nom *
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('nom')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Votre nom de famille"
                  className={`${styles.input} ${
                    validationStates.nom ? styles.inputValid : ''
                  } ${focusedField === 'nom' ? styles.inputFocused : ''}`}
                />
                {validationStates.nom && (
                  <motion.div
                    className={styles.validationIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Prénom */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="prenom" className={styles.label}>
                <FaUser className={styles.labelIcon} />
                Prénom *
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('prenom')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Votre prénom"
                  className={`${styles.input} ${
                    validationStates.prenom ? styles.inputValid : ''
                  } ${focusedField === 'prenom' ? styles.inputFocused : ''}`}
                />
                {validationStates.prenom && (
                  <motion.div
                    className={styles.validationIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Poste */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="poste" className={styles.label}>
                <FaBriefcase className={styles.labelIcon} />
                Poste *
              </label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="poste"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('poste')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Recruteur, Talent Acquisition..."
                  className={`${styles.input} ${
                    validationStates.poste ? styles.inputValid : ''
                  } ${focusedField === 'poste' ? styles.inputFocused : ''}`}
                />
                {validationStates.poste && (
                  <motion.div
                    className={styles.validationIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaCheckCircle />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Section Entreprise */}
          <div className={styles.sectionTitle}>
            <FaBuilding className={styles.sectionIcon} />
            <h3>Informations entreprise</h3>
          </div>

          {/* Sélecteur de mode */}
          <motion.div className={styles.modeSelector} variants={itemVariants}>
            <div className={styles.modeButtons}>
              <button
                type="button"
                onClick={() => handleModeChange('existante')}
                className={`${styles.modeButton} ${
                  formData.mode_entreprise === 'existante' ? styles.modeButtonActive : ''
                }`}
              >
                <FaSearch className={styles.modeIcon} />
                <span>Mon entreprise existe</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('nouvelle')}
                className={`${styles.modeButton} ${
                  formData.mode_entreprise === 'nouvelle' ? styles.modeButtonActive : ''
                }`}
              >
                <FaPlus className={styles.modeIcon} />
                <span>Créer une nouvelle entreprise</span>
              </button>
            </div>
          </motion.div>

          {/* Contenu selon le mode sélectionné */}
          <AnimatePresence mode="wait">
            {formData.mode_entreprise === 'existante' ? (
              <motion.div
                key="existante"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={styles.modeContent}
                data-mode="existante"
              >
                <div className={styles.searchContainer}>
                  <label className={styles.label}>
                    <FaSearch className={styles.labelIcon} />
                    Rechercher votre entreprise *
                  </label>
                  <div className={styles.searchInputContainer}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tapez le nom de votre entreprise..."
                      className={`${styles.input} ${styles.searchInput}`}
                    />
                    {searchingEntreprises && (
                      <FaSpinner className={styles.searchSpinner} />
                    )}
                  </div>

                  {/* Résultats de recherche */}
                  {searchResults.length > 0 && (
                    <div className={styles.searchResults}>
                      {searchResults.map((entreprise) => (
                        <div
                          key={entreprise.id}
                          onClick={() => selectEntreprise(entreprise)}
                          className={`${styles.searchResult} ${
                            formData.entreprise_id === entreprise.id ? styles.searchResultSelected : ''
                          }`}
                        >
                          <div className={styles.resultMain}>
                            <strong>{entreprise.raison_social}</strong>
                            <span className={styles.resultSector}>{entreprise.secteur_activite}</span>
                          </div>
                          {entreprise.description && (
                            <div className={styles.resultDescription}>
                              {entreprise.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fallback select si pas de recherche */}
                  <div className={styles.fallbackSelect}>
                    <label className={styles.label}>
                      Ou sélectionnez dans la liste complète
                    </label>
                    <div className={styles.selectContainer}>
                      <select
                        id="entreprise_id"
                        name="entreprise_id"
                        value={formData.entreprise_id}
                        onChange={handleChange}
                        disabled={fetchingEntreprises}
                        className={`${styles.select} ${
                          validationStates.entreprise_id ? styles.selectValid : ''
                        }`}
                      >
                        <option value="">
                          {fetchingEntreprises ? 'Chargement...' : 'Sélectionner votre entreprise'}
                        </option>
                        {entreprises.map((entreprise) => (
                          <option key={entreprise.id} value={entreprise.id}>
                            {entreprise.raison_social}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className={styles.selectIcon} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="nouvelle"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.modeContent}
                data-mode="nouvelle"
              >
                <div className={styles.newCompanyForm}>
                  <div className={styles.formGrid}>
                    {/* Raison sociale */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        <FaBuilding className={styles.labelIcon} />
                        Raison sociale *
                      </label>
                      <div className={styles.inputContainer}>
                        <input
                          type="text"
                          name="raison_social"
                          value={formData.entreprise.raison_social}
                          onChange={handleEntrepriseChange}
                          required
                          placeholder="Nom officiel de l'entreprise"
                          className={`${styles.input} ${
                            validationStates.raison_social ? styles.inputValid : ''
                          }`}
                        />
                        {validationStates.raison_social && (
                          <motion.div
                            className={styles.validationIcon}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FaCheckCircle />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Secteur d'activité */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        <FaIndustry className={styles.labelIcon} />
                        Secteur d'activité *
                      </label>
                      <div className={styles.selectContainer}>
                        <select
                          name="secteur_activite"
                          value={formData.entreprise.secteur_activite}
                          onChange={handleEntrepriseChange}
                          required
                          className={`${styles.select} ${
                            validationStates.secteur_activite ? styles.selectValid : ''
                          }`}
                        >
                          <option value="">Sélectionnez un secteur</option>
                          {secteurs.map((secteur) => (
                            <option key={secteur} value={secteur}>
                              {secteur}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className={styles.selectIcon} />
                        {validationStates.secteur_activite && (
                          <motion.div
                            className={styles.validationIcon}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FaCheckCircle />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div className={`${styles.formGroup} ${styles.fullWidth}`} variants={itemVariants}>
                      <label className={styles.label}>
                        Description (optionnel)
                      </label>
                      <textarea
                        name="description"
                        value={formData.entreprise.description}
                        onChange={handleEntrepriseChange}
                        placeholder="Brève description de l'activité de l'entreprise"
                        rows="3"
                        className={styles.textarea}
                      />
                    </motion.div>

                    {/* Adresse */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        <FaMapMarkerAlt className={styles.labelIcon} />
                        Adresse
                      </label>
                      <input
                        type="text"
                        name="adresse"
                        value={formData.entreprise.adresse}
                        onChange={handleEntrepriseChange}
                        placeholder="123 Rue de la Paix"
                        className={styles.input}
                      />
                    </motion.div>

                    {/* Ville */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        Ville
                      </label>
                      <input
                        type="text"
                        name="ville"
                        value={formData.entreprise.ville}
                        onChange={handleEntrepriseChange}
                        placeholder="Paris"
                        className={styles.input}
                      />
                    </motion.div>

                    {/* Code postal */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        Code postal
                      </label>
                      <input
                        type="text"
                        name="code_postal"
                        value={formData.entreprise.code_postal}
                        onChange={handleEntrepriseChange}
                        placeholder="75001"
                        className={styles.input}
                      />
                    </motion.div>

                    {/* Téléphone */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        <FaPhone className={styles.labelIcon} />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.entreprise.telephone}
                        onChange={handleEntrepriseChange}
                        placeholder="01 23 45 67 89"
                        className={styles.input}
                      />
                    </motion.div>

                    {/* Site web */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        <FaGlobe className={styles.labelIcon} />
                        Site web
                      </label>
                      <input
                        type="url"
                        name="site_web"
                        value={formData.entreprise.site_web}
                        onChange={handleEntrepriseChange}
                        placeholder="https://www.entreprise.com"
                        className={styles.input}
                      />
                    </motion.div>

                    {/* Taille entreprise */}
                    <motion.div className={styles.formGroup} variants={itemVariants}>
                      <label className={styles.label}>
                        <FaUsers className={styles.labelIcon} />
                        Taille de l'entreprise
                      </label>
                      <div className={styles.selectContainer}>
                        <select
                          name="taille_entreprise"
                          value={formData.entreprise.taille_entreprise}
                          onChange={handleEntrepriseChange}
                          className={styles.select}
                        >
                          <option value="">Sélectionnez la taille</option>
                          {taillesEntreprise.map((taille) => (
                            <option key={taille.value} value={taille.value}>
                              {taille.label}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className={styles.selectIcon} />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Bouton de soumission */}
          <motion.button 
            type="submit" 
            disabled={loading || !isFormValid()}
            className={`${styles.submitButton} ${
              isFormValid() ? styles.submitButtonReady : ''
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <FaSpinner className={styles.buttonSpinner} />
                Inscription en cours...
              </>
            ) : (
              <>
                S'inscrire en tant que Recruteur
                <FaArrowRight className={styles.buttonIcon} />
              </>
            )}
          </motion.button>
        </motion.form>
        
        {/* Liens de redirection */}
        <motion.div className={styles.redirectLinks} variants={itemVariants}>
          <p className={styles.loginRedirect}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className={styles.loginLink}>
              Se connecter
            </Link>
          </p>
          
          <div className={styles.alternativeRegistration}>
            <p className={styles.alternativeText}>Ou s'inscrire en tant que :</p>
            <div className={styles.alternativeLinks}>
              <Link to="/register/stagiaire" className={styles.alternativeLink}>
                <FaUserGraduate className={styles.alternativeIcon} />
                Stagiaire
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterRecruteur;