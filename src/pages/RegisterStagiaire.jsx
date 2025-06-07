// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import styles from './RegisterStagiaire.module.css';

// const RegisterStagiaire = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     mot_de_passe: '',
//     nom: '',
//     prenom: '',
//     photo: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const { register, error } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     // Pour prévisualiser l'image
//   //     setPreviewUrl(URL.createObjectURL(file));
//   //     // Pour stocker l'image dans formData
//   //     setFormData({ ...formData, photo: file });
//   //   }
//   // };
//   const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     // Pour prévisualiser l'image
//     setPreviewUrl(URL.createObjectURL(file));
//     // ⬅️ Stockez le nom du fichier comme string (ou null temporairement)
//     setFormData({ ...formData, photo: file.name });  // ✅ String au lieu de File object
//   } else {
//     // ⬅️ Gérez le cas où aucun fichier n'est sélectionné
//     setFormData({ ...formData, photo: null });
//     setPreviewUrl('');
//   }
// };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
    
//   //   try {
//   //     await register(formData, 'stagiaire');
//   //     navigate('/login');
//   //   } catch (err) {
//   //     console.error('Erreur d\'inscription:', err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
  
//   try {
//     // ⬅️ Préparez les données en vous assurant que photo est une string ou null
//     const dataToSend = {
//       email: formData.email,
//       mot_de_passe: formData.mot_de_passe,
//       nom: formData.nom,
//       prenom: formData.prenom,
//       photo: formData.photo || null  // ✅ Assure que c'est string ou null
//     };
    
//     console.log("Données envoyées :", dataToSend);  // ⬅️ Pour debug
    
//     await register(dataToSend, 'stagiaire');
//     navigate('/login');
//   } catch (err) {
//     console.error('Erreur d\'inscription:', err);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className={styles.registerContainer}>
//       <div className={styles.formCard}>
//         <h2 className={styles.title}>Inscription Stagiaire</h2>
        
//         {error && <div className={styles.errorMessage}>{error}</div>}
        
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.formColumns}>
//             <div className={styles.formColumn}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className={styles.input}
//                 />
//               </div>
              
//               <div className={styles.formGroup}>
//                 <label htmlFor="mot_de_passe">Mot de passe</label>
//                 <input
//                   type="password"
//                   id="mot_de_passe"
//                   name="mot_de_passe"
//                   value={formData.mot_de_passe}
//                   onChange={handleChange}
//                   required
//                   className={styles.input}
//                 />
//               </div>
              
//               <div className={styles.formGroup}>
//                 <label htmlFor="nom">Nom</label>
//                 <input
//                   type="text"
//                   id="nom"
//                   name="nom"
//                   value={formData.nom}
//                   onChange={handleChange}
//                   required
//                   className={styles.input}
//                 />
//               </div>
              
//               <div className={styles.formGroup}>
//                 <label htmlFor="prenom">Prénom</label>
//                 <input
//                   type="text"
//                   id="prenom"
//                   name="prenom"
//                   value={formData.prenom}
//                   onChange={handleChange}
//                   required
//                   className={styles.input}
//                 />
//               </div>
//             </div>
            
//             <div className={styles.formColumn}>
//               <div className={styles.photoUploadContainer}>
//                 <label htmlFor="photo" className={styles.photoLabel}>Photo de profil</label>
                
//                 <div className={styles.photoPreviewContainer}>
//                   {previewUrl ? (
//                     <img src={previewUrl} alt="Prévisualisation" className={styles.photoPreview} />
//                   ) : (
//                     <div className={styles.photoPlaceholder}>
//                       <span className={styles.photoIcon}>📷</span>
//                       <span>Photo de profil</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className={styles.fileInputContainer}>
//                   <input
//                     type="file"
//                     id="photo"
//                     name="photo"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className={styles.fileInput}
//                   />
//                   <label htmlFor="photo" className={styles.fileInputButton}>
//                     {previewUrl ? 'Changer la photo' : 'Sélectionner une photo'}
//                   </label>
//                 </div>
//               </div>
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

// export default RegisterStagiaire;*


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaGraduationCap,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaCheck,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import styles from './RegisterStagiaire.module.css';
import axios from '../api/axios';
// const RegisterStagiaire = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     mot_de_passe: '',
//     nom: '',
//     prenom: '',
//     photo: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [dragActive, setDragActive] = useState(false);
//   const { register, error } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
    
//     // Clear error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors({ ...formErrors, [name]: '' });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setFormErrors({ ...formErrors, photo: 'La taille du fichier ne doit pas dépasser 5MB' });
//         return;
//       }
      
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setFormErrors({ ...formErrors, photo: 'Veuillez sélectionner une image valide' });
//         return;
//       }
      
//       setPreviewUrl(URL.createObjectURL(file));
//       setFormData({ ...formData, photo: file.name });
//       setFormErrors({ ...formErrors, photo: '' });
//     } else {
//       setFormData({ ...formData, photo: null });
//       setPreviewUrl('');
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       handleFileChange({ target: { files: [file] } });
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     if (!formData.email) errors.email = 'Email requis';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email invalide';
    
//     if (!formData.mot_de_passe) errors.mot_de_passe = 'Mot de passe requis';
//     else if (formData.mot_de_passe.length < 6) errors.mot_de_passe = 'Minimum 6 caractères';
    
//     if (!formData.nom) errors.nom = 'Nom requis';
//     if (!formData.prenom) errors.prenom = 'Prénom requis';
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setLoading(true);
    
//     try {
//       const dataToSend = {
//         email: formData.email,
//         mot_de_passe: formData.mot_de_passe,
//         nom: formData.nom,
//         prenom: formData.prenom,
//         photo: formData.photo || null
//       };
      
//       await register(dataToSend, 'stagiaire');
//       navigate('/login');
//     } catch (err) {
//       console.error('Erreur d\'inscription:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
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

//   return (
//     <div className={styles.registerContainer}>
//       {/* Animated Background Elements */}
//       <div className={styles.backgroundElements}>
//         <div className={styles.floatingIcon + ' ' + styles.icon1}>🎓</div>
//         <div className={styles.floatingIcon + ' ' + styles.icon2}>📚</div>
//         <div className={styles.floatingIcon + ' ' + styles.icon3}>💼</div>
//         <div className={styles.floatingIcon + ' ' + styles.icon4}>🚀</div>
//       </div>

//       <motion.div 
//         className={styles.formCard}
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.div className={styles.headerSection} variants={itemVariants}>
//           <div className={styles.iconContainer}>
//             <FaGraduationCap className={styles.mainIcon} />
//           </div>
//           <h2 className={styles.title}>Inscription Stagiaire</h2>
//           <p className={styles.subtitle}>Rejoignez notre plateforme et commencez votre parcours professionnel</p>
//         </motion.div>
        
//         <AnimatePresence>
//           {error && (
//             <motion.div 
//               className={styles.errorMessage}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//             >
//               <FaExclamationTriangle className={styles.errorIcon} />
//               {error}
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.formColumns}>
//             <div className={styles.formColumn}>
//               <motion.div className={styles.formGroup} variants={itemVariants}>
//                 <label htmlFor="email" className={styles.label}>
//                   <FaEnvelope className={styles.labelIcon} />
//                   Adresse email
//                 </label>
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
//                     placeholder="votre.email@exemple.com"
//                   />
//                   {!formErrors.email && formData.email && (
//                     <FaCheck className={styles.validIcon} />
//                   )}
//                 </div>
//                 {formErrors.email && (
//                   <span className={styles.errorText}>{formErrors.email}</span>
//                 )}
//               </motion.div>
              
//               <motion.div className={styles.formGroup} variants={itemVariants}>
//                 <label htmlFor="mot_de_passe" className={styles.label}>
//                   <FaLock className={styles.labelIcon} />
//                   Mot de passe
//                 </label>
//                 <div className={styles.inputContainer}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="mot_de_passe"
//                     name="mot_de_passe"
//                     value={formData.mot_de_passe}
//                     onChange={handleChange}
//                     required
//                     className={`${styles.input} ${formErrors.mot_de_passe ? styles.inputError : ''}`}
//                     placeholder="Minimum 6 caractères"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className={styles.passwordToggle}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//                 {formErrors.mot_de_passe && (
//                   <span className={styles.errorText}>{formErrors.mot_de_passe}</span>
//                 )}
//               </motion.div>
              
//               <motion.div className={styles.formGroup} variants={itemVariants}>
//                 <label htmlFor="nom" className={styles.label}>
//                   <FaUser className={styles.labelIcon} />
//                   Nom de famille
//                 </label>
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="text"
//                     id="nom"
//                     name="nom"
//                     value={formData.nom}
//                     onChange={handleChange}
//                     required
//                     className={`${styles.input} ${formErrors.nom ? styles.inputError : ''}`}
//                     placeholder="Votre nom"
//                   />
//                   {!formErrors.nom && formData.nom && (
//                     <FaCheck className={styles.validIcon} />
//                   )}
//                 </div>
//                 {formErrors.nom && (
//                   <span className={styles.errorText}>{formErrors.nom}</span>
//                 )}
//               </motion.div>
              
//               <motion.div className={styles.formGroup} variants={itemVariants}>
//                 <label htmlFor="prenom" className={styles.label}>
//                   <FaUser className={styles.labelIcon} />
//                   Prénom
//                 </label>
//                 <div className={styles.inputContainer}>
//                   <input
//                     type="text"
//                     id="prenom"
//                     name="prenom"
//                     value={formData.prenom}
//                     onChange={handleChange}
//                     required
//                     className={`${styles.input} ${formErrors.prenom ? styles.inputError : ''}`}
//                     placeholder="Votre prénom"
//                   />
//                   {!formErrors.prenom && formData.prenom && (
//                     <FaCheck className={styles.validIcon} />
//                   )}
//                 </div>
//                 {formErrors.prenom && (
//                   <span className={styles.errorText}>{formErrors.prenom}</span>
//                 )}
//               </motion.div>
//             </div>
            
//             <div className={styles.formColumn}>
//               <motion.div className={styles.photoUploadContainer} variants={itemVariants}>
//                 <label className={styles.label}>
//                   <FaCamera className={styles.labelIcon} />
//                   Photo de profil (facultatif)
//                 </label>
                
//                 <div 
//                   className={`${styles.photoDropzone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasImage : ''}`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   {previewUrl ? (
//                     <div className={styles.photoPreviewContainer}>
//                       <img src={previewUrl} alt="Prévisualisation" className={styles.photoPreview} />
//                       <div className={styles.photoOverlay}>
//                         <FaCamera className={styles.overlayIcon} />
//                         <span>Changer la photo</span>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className={styles.photoPlaceholder}>
//                       <FaUpload className={styles.uploadIcon} />
//                       <div className={styles.uploadText}>
//                         <strong>Glissez une image ici</strong>
//                         <span>ou cliquez pour sélectionner</span>
//                       </div>
//                       <div className={styles.uploadHint}>
//                         JPG, PNG ou GIF (max. 5MB)
//                       </div>
//                     </div>
//                   )}
                  
//                   <input
//                     type="file"
//                     id="photo"
//                     name="photo"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className={styles.fileInput}
//                   />
//                 </div>
                
//                 {formErrors.photo && (
//                   <span className={styles.errorText}>{formErrors.photo}</span>
//                 )}
//               </motion.div>
//             </div>
//           </div>
          
//           <motion.div className={styles.submitSection} variants={itemVariants}>
//             <button 
//               type="submit" 
//               disabled={loading} 
//               className={styles.submitButton}
//             >
//               {loading ? (
//                 <>
//                   <FaSpinner className={styles.spinnerIcon} />
//                   Inscription en cours...
//                 </>
//               ) : (
//                 <>
//                   S'inscrire comme stagiaire
//                   <FaArrowRight className={styles.buttonIcon} />
//                 </>
//               )}
//             </button>
//           </motion.div>
//         </form>
        
//         <motion.div className={styles.footer} variants={itemVariants}>
//           <p className={styles.loginRedirect}>
//             Vous avez déjà un compte ?{' '}
//             <Link to="/login" className={styles.loginLink}>
//               Se connecter
//               <FaArrowRight className={styles.linkIcon} />
//             </Link>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterStagiaire;

const RegisterStagiaire = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    nom: '',
    prenom: '',
    photo: '' // Stockera le nom du fichier uploadé
  });
  const [selectedFile, setSelectedFile] = useState(null); // ← NOUVEAU: Stocke le fichier sélectionné
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // ← NOUVEAU: État d'upload
  const [previewUrl, setPreviewUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({ ...formErrors, photo: 'La taille du fichier ne doit pas dépasser 5MB' });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormErrors({ ...formErrors, photo: 'Veuillez sélectionner une image valide' });
        return;
      }
      
      // CORRECTION: Stocker le fichier entier, pas seulement le nom
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormErrors({ ...formErrors, photo: '' });
      
      console.log('📸 Fichier sélectionné:', file.name, 'Taille:', file.size);
    } else {
      setSelectedFile(null);
      setFormData({ ...formData, photo: null });
      setPreviewUrl('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileChange({ target: { files: [file] } });
    }
  };

  // NOUVELLE FONCTION: Upload de la photo
  const uploadPhoto = async () => {
    if (!selectedFile) {
      console.log('🚫 Pas de fichier à uploader');
      return null;
    }

    setUploading(true);
    try {
      console.log('📤 Upload de la photo en cours...', selectedFile.name);
      
      const photoFormData = new FormData();
      photoFormData.append('file', selectedFile);

      const response = await axios.post('/upload/photo', photoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('✅ Photo uploadée avec succès:', response.data);
      return response.data.filename; // Retourne "photos/abc123.jpg"
      
    } catch (error) {
      console.error('❌ Erreur upload photo:', error);
      const errorMsg = error.response?.data?.detail || 'Erreur lors de l\'upload de la photo';
      setFormErrors({ ...formErrors, photo: errorMsg });
      throw new Error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) errors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email invalide';
    
    if (!formData.mot_de_passe) errors.mot_de_passe = 'Mot de passe requis';
    else if (formData.mot_de_passe.length < 6) errors.mot_de_passe = 'Minimum 6 caractères';
    
    if (!formData.nom) errors.nom = 'Nom requis';
    if (!formData.prenom) errors.prenom = 'Prénom requis';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // ÉTAPE 1: Uploader la photo d'abord (si une photo est sélectionnée)
      let photoFilename = null;
      if (selectedFile) {
        console.log('🔄 Upload de la photo...');
        photoFilename = await uploadPhoto();
        console.log('📸 Photo uploadée:', photoFilename);
      }

      // ÉTAPE 2: Créer le compte avec le nom de la photo
      const dataToSend = {
        email: formData.email,
        mot_de_passe: formData.mot_de_passe,
        nom: formData.nom,
        prenom: formData.prenom,
        photo: photoFilename // Utiliser le nom retourné par l'upload
      };
      
      console.log('📝 Données d\'inscription envoyées:', dataToSend);
      
      await register(dataToSend, 'stagiaire');
      navigate('/login');
      
    } catch (err) {
      console.error('❌ Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <div className={styles.registerContainer}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.floatingIcon + ' ' + styles.icon1}>🎓</div>
        <div className={styles.floatingIcon + ' ' + styles.icon2}>📚</div>
        <div className={styles.floatingIcon + ' ' + styles.icon3}>💼</div>
        <div className={styles.floatingIcon + ' ' + styles.icon4}>🚀</div>
      </div>

      <motion.div 
        className={styles.formCard}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.headerSection} variants={itemVariants}>
          <div className={styles.iconContainer}>
            <FaGraduationCap className={styles.mainIcon} />
          </div>
          <h2 className={styles.title}>Inscription Stagiaire</h2>
          <p className={styles.subtitle}>Rejoignez notre plateforme et commencez votre parcours professionnel</p>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              className={styles.errorMessage}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FaExclamationTriangle className={styles.errorIcon} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formColumns}>
            <div className={styles.formColumn}>
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="email" className={styles.label}>
                  <FaEnvelope className={styles.labelIcon} />
                  Adresse email
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                    placeholder="votre.email@exemple.com"
                  />
                  {!formErrors.email && formData.email && (
                    <FaCheck className={styles.validIcon} />
                  )}
                </div>
                {formErrors.email && (
                  <span className={styles.errorText}>{formErrors.email}</span>
                )}
              </motion.div>
              
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="mot_de_passe" className={styles.label}>
                  <FaLock className={styles.labelIcon} />
                  Mot de passe
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="mot_de_passe"
                    name="mot_de_passe"
                    value={formData.mot_de_passe}
                    onChange={handleChange}
                    required
                    className={`${styles.input} ${formErrors.mot_de_passe ? styles.inputError : ''}`}
                    placeholder="Minimum 6 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.mot_de_passe && (
                  <span className={styles.errorText}>{formErrors.mot_de_passe}</span>
                )}
              </motion.div>
              
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="nom" className={styles.label}>
                  <FaUser className={styles.labelIcon} />
                  Nom de famille
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className={`${styles.input} ${formErrors.nom ? styles.inputError : ''}`}
                    placeholder="Votre nom"
                  />
                  {!formErrors.nom && formData.nom && (
                    <FaCheck className={styles.validIcon} />
                  )}
                </div>
                {formErrors.nom && (
                  <span className={styles.errorText}>{formErrors.nom}</span>
                )}
              </motion.div>
              
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="prenom" className={styles.label}>
                  <FaUser className={styles.labelIcon} />
                  Prénom
                </label>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className={`${styles.input} ${formErrors.prenom ? styles.inputError : ''}`}
                    placeholder="Votre prénom"
                  />
                  {!formErrors.prenom && formData.prenom && (
                    <FaCheck className={styles.validIcon} />
                  )}
                </div>
                {formErrors.prenom && (
                  <span className={styles.errorText}>{formErrors.prenom}</span>
                )}
              </motion.div>
            </div>
            
            <div className={styles.formColumn}>
              <motion.div className={styles.photoUploadContainer} variants={itemVariants}>
                <label className={styles.label}>
                  <FaCamera className={styles.labelIcon} />
                  Photo de profil (facultatif)
                </label>
                
                <div 
                  className={`${styles.photoDropzone} ${dragActive ? styles.dragActive : ''} ${previewUrl ? styles.hasImage : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {previewUrl ? (
                    <div className={styles.photoPreviewContainer}>
                      <img src={previewUrl} alt="Prévisualisation" className={styles.photoPreview} />
                      <div className={styles.photoOverlay}>
                        <FaCamera className={styles.overlayIcon} />
                        <span>Changer la photo</span>
                      </div>
                      {/* NOUVEAU: Indicateur d'upload */}
                      {uploading && (
                        <div className={styles.uploadingOverlay}>
                          <FaSpinner className={styles.spinnerIcon} />
                          <span>Upload en cours...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      <FaUpload className={styles.uploadIcon} />
                      <div className={styles.uploadText}>
                        <strong>Glissez une image ici</strong>
                        <span>ou cliquez pour sélectionner</span>
                      </div>
                      <div className={styles.uploadHint}>
                        JPG, PNG ou GIF (max. 5MB)
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    disabled={uploading} // Désactiver pendant l'upload
                  />
                </div>
                
                {formErrors.photo && (
                  <span className={styles.errorText}>{formErrors.photo}</span>
                )}

                {/* NOUVEAU: Information sur le fichier sélectionné */}
                {selectedFile && !uploading && (
                  <div className={styles.fileInfo}>
                    <span>📎 {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          
          <motion.div className={styles.submitSection} variants={itemVariants}>
            <button 
              type="submit" 
              disabled={loading || uploading} // Désactiver si upload en cours
              className={styles.submitButton}
            >
              {loading ? (
                <>
                  <FaSpinner className={styles.spinnerIcon} />
                  Inscription en cours...
                </>
              ) : uploading ? (
                <>
                  <FaSpinner className={styles.spinnerIcon} />
                  Upload de la photo...
                </>
              ) : (
                <>
                  S'inscrire comme stagiaire
                  <FaArrowRight className={styles.buttonIcon} />
                </>
              )}
            </button>
          </motion.div>
        </form>
        
        <motion.div className={styles.footer} variants={itemVariants}>
          <p className={styles.loginRedirect}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className={styles.loginLink}>
              Se connecter
              <FaArrowRight className={styles.linkIcon} />
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterStagiaire ;