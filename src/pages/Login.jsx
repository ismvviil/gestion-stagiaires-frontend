// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import styles from './Login.module.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login, error } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const success = await login(email, password);
//       if (success) {
//         navigate('/');
//       }
//     } catch (err) {
//       console.error('Erreur de connexion:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <h2 className={styles.title}>Connexion</h2>

//       {error && <div className={styles.errorMessage}>{error}</div>}

//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="password">Mot de passe</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           className={styles.submitButton}
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? 'Connexion en cours...' : 'Se connecter'}
//         </button>
//       </form>

//       <p className={styles.redirectText}>
//         Vous n'avez pas de compte ?{' '}
//         <Link className={styles.redirectLink} to="/register">S'inscrire</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useState , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
  FaShieldAlt,
  FaArrowRight,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const { login, error } = useAuth();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const success = await login(email, password);
  //     if (success) {
  //       navigate('/');
  //     }
  //   } catch (err) {
  //     console.error('Erreur de connexion:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // / Effet pour rediriger selon le type d'utilisateur
  useEffect(() => {
    if (currentUser) {
      // Vérifier le type d'utilisateur et rediriger
      if (currentUser.type === "admin" || currentUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      // La redirection sera gérée par useEffect
      // Ne pas naviguer manuellement ici
    } catch (err) {
      console.error("Erreur de connexion:", err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const floatingElements = [
    { icon: FaUserCircle, delay: 0, x: 10, y: 20 },
    { icon: FaShieldAlt, delay: 2, x: 85, y: 15 },
    { icon: FaSignInAlt, delay: 4, x: 5, y: 75 },
  ];

  return (
    <div className={styles.loginContainer}>
      {/* Éléments flottants d'arrière-plan */}
      {floatingElements.map((elem, index) => (
        <motion.div
          key={index}
          className={styles.floatingElement}
          style={{ left: `${elem.x}%`, top: `${elem.y}%` }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            delay: elem.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <elem.icon />
        </motion.div>
      ))}

      <motion.div
        className={styles.loginCard}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className={styles.header} variants={itemVariants}>
          <motion.div
            className={styles.iconContainer}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaSignInAlt className={styles.headerIcon} />
          </motion.div>
          <h2 className={styles.title}>Connexion</h2>
          <p className={styles.subtitle}>
            Accédez à votre espace de gestion des stagiaires
          </p>
        </motion.div>

        {/* Message d'erreur */}
        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.errorMessage}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.5rem" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaExclamationTriangle className={styles.errorIcon} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulaire */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {/* Champ Email */}
          <motion.div
            className={`${styles.formGroup} ${
              focusedField === "email" ? styles.focused : ""
            }`}
            variants={itemVariants}
          >
            <label htmlFor="email" className={styles.label}>
              <FaEnvelope className={styles.labelIcon} />
              Adresse e-mail
            </label>
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                placeholder="votre.email@exemple.com"
                required
              />
              <motion.div
                className={styles.inputIcon}
                animate={{ scale: focusedField === "email" ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope />
              </motion.div>
            </div>
          </motion.div>

          {/* Champ Mot de passe */}
          <motion.div
            className={`${styles.formGroup} ${
              focusedField === "password" ? styles.focused : ""
            }`}
            variants={itemVariants}
          >
            <label htmlFor="password" className={styles.label}>
              <FaLock className={styles.labelIcon} />
              Mot de passe
            </label>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                placeholder="••••••••"
                required
              />
              <motion.div
                className={styles.inputIcon}
                animate={{ scale: focusedField === "password" ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <FaLock />
              </motion.div>
              <motion.button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </motion.button>
            </div>
          </motion.div>

          {/* Options supplémentaires */}
          <motion.div className={styles.formOptions} variants={itemVariants}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkboxLabel}>Se souvenir de moi</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Mot de passe oublié ?
            </Link>
          </motion.div>

          {/* Bouton de soumission */}
          <motion.button
            className={`${styles.submitButton} ${
              loading ? styles.loading : ""
            }`}
            type="submit"
            disabled={loading}
            variants={itemVariants}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.buttonContent}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <FaSpinner />
                  </motion.div>
                  <span>Connexion en cours...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.buttonContent}
                >
                  <FaSignInAlt />
                  <span>Se connecter</span>
                  <motion.div
                    className={styles.buttonArrow}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div className={styles.footer} variants={itemVariants}>
          <div className={styles.divider}>
            <span className={styles.dividerText}>ou</span>
          </div>
          <p className={styles.redirectText}>
            Vous n'avez pas encore de compte ?
          </p>
          <Link className={styles.redirectLink} to="/register">
            <FaArrowRight className={styles.redirectIcon} />
            Créer un compte
          </Link>
        </motion.div>

        {/* Indicateurs de sécurité */}
        <motion.div className={styles.securityBadges} variants={itemVariants}>
          <div className={styles.securityBadge}>
            <FaShieldAlt />
            <span>Connexion sécurisée</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
