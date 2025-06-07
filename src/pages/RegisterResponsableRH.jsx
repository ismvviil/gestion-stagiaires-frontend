// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axios';
// import styles from './RegisterResponsableRH.module.css';

// const RegisterResponsableRH = () => {
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
//       await register(formData, 'responsable-rh');
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
//         <h2 className={styles.title}>Inscription Responsable RH</h2>
        
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

// export default RegisterResponsableRH;


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaBriefcase, 
  FaBuilding, 
  FaEye, 
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaUserTie,
  FaArrowRight
} from 'react-icons/fa';
import styles from './RegisterResponsableRH.module.css';

const RegisterResponsableRH = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    nom: '',
    prenom: '',
    poste: '',
    entreprise_id: ''
  });
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingEntreprises, setFetchingEntreprises] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({});
  const { register, error } = useAuth();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

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

  // Validation en temps réel
  const validateField = (name, value) => {
    let isValid = false;
    
    switch (name) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'mot_de_passe':
        isValid = value.length >= 6;
        break;
      case 'nom':
      case 'prenom':
      case 'poste':
        isValid = value.trim().length >= 2;
        break;
      case 'entreprise_id':
        isValid = value !== '';
        break;
      default:
        isValid = value.trim() !== '';
    }
    
    setFieldValidation(prev => ({
      ...prev,
      [name]: isValid
    }));
    
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(formData, 'responsable-rh');
      navigate('/login');
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFieldIcon = (fieldName) => {
    const icons = {
      email: FaEnvelope,
      mot_de_passe: FaLock,
      nom: FaUser,
      prenom: FaUser,
      poste: FaBriefcase,
      entreprise_id: FaBuilding
    };
    return icons[fieldName] || FaUser;
  };

  return (
    <div className={styles.registerContainer}>
      {/* Éléments flottants animés */}
      <div className={styles.floatingElements}>
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={styles.floatingElement}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.formCard}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <div className={styles.iconWrapper}>
            <FaUserTie className={styles.headerIcon} />
          </div>
          <h2 className={styles.title}>Inscription Responsable RH</h2>
          <p className={styles.subtitle}>
            Rejoignez notre plateforme de gestion des stagiaires
          </p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.errorMessage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <FaExclamationTriangle className={styles.errorIcon} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form className={styles.form} onSubmit={handleSubmit} variants={itemVariants}>
          <div className={styles.formGrid}>
            {/* Email */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="email" className={styles.label}>
                <FaEnvelope className={styles.labelIcon} />
                Email professionnel
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${
                    fieldValidation.email === true ? styles.inputValid :
                    fieldValidation.email === false ? styles.inputInvalid : ''
                  }`}
                  placeholder="votre.email@entreprise.com"
                />
                {fieldValidation.email && (
                  <FaCheckCircle className={styles.validIcon} />
                )}
              </div>
            </motion.div>

            {/* Mot de passe */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="mot_de_passe" className={styles.label}>
                <FaLock className={styles.labelIcon} />
                Mot de passe
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${styles.inputPassword} ${
                    fieldValidation.mot_de_passe === true ? styles.inputValid :
                    fieldValidation.mot_de_passe === false ? styles.inputInvalid : ''
                  }`}
                  placeholder="Minimum 6 caractères"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {fieldValidation.mot_de_passe && (
                  <FaCheckCircle className={styles.validIcon} />
                )}
              </div>
            </motion.div>

            {/* Nom */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="nom" className={styles.label}>
                <FaUser className={styles.labelIcon} />
                Nom de famille
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${
                    fieldValidation.nom === true ? styles.inputValid :
                    fieldValidation.nom === false ? styles.inputInvalid : ''
                  }`}
                  placeholder="Votre nom"
                />
                {fieldValidation.nom && (
                  <FaCheckCircle className={styles.validIcon} />
                )}
              </div>
            </motion.div>

            {/* Prénom */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="prenom" className={styles.label}>
                <FaUser className={styles.labelIcon} />
                Prénom
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${
                    fieldValidation.prenom === true ? styles.inputValid :
                    fieldValidation.prenom === false ? styles.inputInvalid : ''
                  }`}
                  placeholder="Votre prénom"
                />
                {fieldValidation.prenom && (
                  <FaCheckCircle className={styles.validIcon} />
                )}
              </div>
            </motion.div>

            {/* Poste */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="poste" className={styles.label}>
                <FaBriefcase className={styles.labelIcon} />
                Poste occupé
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="poste"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${
                    fieldValidation.poste === true ? styles.inputValid :
                    fieldValidation.poste === false ? styles.inputInvalid : ''
                  }`}
                  placeholder="Ex: Responsable RH, DRH, Chargé de recrutement"
                />
                {fieldValidation.poste && (
                  <FaCheckCircle className={styles.validIcon} />
                )}
              </div>
            </motion.div>

            {/* Entreprise */}
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="entreprise_id" className={styles.label}>
                <FaBuilding className={styles.labelIcon} />
                Entreprise
              </label>
              <div className={styles.inputWrapper}>
                <select
                  id="entreprise_id"
                  name="entreprise_id"
                  value={formData.entreprise_id}
                  onChange={handleChange}
                  required
                  disabled={fetchingEntreprises}
                  className={`${styles.select} ${
                    fieldValidation.entreprise_id === true ? styles.inputValid :
                    fieldValidation.entreprise_id === false ? styles.inputInvalid : ''
                  }`}
                >
                  <option value="">Sélectionner votre entreprise</option>
                  {entreprises.map((entreprise) => (
                    <option key={entreprise.id} value={entreprise.id}>
                      {entreprise.raison_social}
                    </option>
                  ))}
                </select>
                {fetchingEntreprises && (
                  <FaSpinner className={styles.loadingSpinner} />
                )}
                {fieldValidation.entreprise_id && !fetchingEntreprises && (
                  <FaCheckCircle className={styles.validIcon} />
                )}
              </div>
              {fetchingEntreprises && (
                <div className={styles.loadingIndicator}>
                  <FaSpinner className={styles.spinnerIcon} />
                  Chargement des entreprises...
                </div>
              )}
            </motion.div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <FaSpinner className={styles.spinningIcon} />
                Inscription en cours...
              </>
            ) : (
              <>
                S'inscrire en tant que Responsable RH
                <FaArrowRight className={styles.arrowIcon} />
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div className={styles.footer} variants={itemVariants}>
          <p className={styles.loginRedirect}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className={styles.loginLink}>
              Se connecter
            </Link>
          </p>
          
          <div className={styles.divider}>
            <span>ou</span>
          </div>
          
          <Link to="/register-stagiaire" className={styles.alternativeLink}>
            S'inscrire comme stagiaire
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterResponsableRH;

