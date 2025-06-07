// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "../api/axios";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Vérifier si un token existe dans localStorage
//     const token = localStorage.getItem("token");

//     if (token) {
//       // Récupérer les informations de l'utilisateur à partir du localStorage
//       const userStr = localStorage.getItem("user");
//       // if (userStr) {
//       //   try {
//       //     const userObj = JSON.parse(userStr);
//       //     setCurrentUser(userObj);
//       //   } catch (err) {
//       //     console.error('Erreur lors de l\'analyse des données utilisateur:', err);
//       //     localStorage.removeItem('user');
//       //     localStorage.removeItem('token');
//       //   }
//       // } else {
//       //   // Si aucune information utilisateur n'est disponible, récupérer depuis l'API
//       //   const getUserInfo = async () => {
//       //     try {
//       //       const response = await axios.get('/users/me', {
//       //         headers: {
//       //           'Authorization': `Bearer ${token}`
//       //         }
//       //       });

//       //       const userData = response.data;
//       //       setCurrentUser({
//       //         id: userData.id,
//       //         email: userData.email,
//       //         nom: userData.nom,
//       //         prenom: userData.prenom,
//       //         type: userData.type
//       //       });

//       //       // Stocker les informations utilisateur dans localStorage
//       //       localStorage.setItem('user', JSON.stringify({
//       //         id: userData.id,
//       //         email: userData.email,
//       //         nom: userData.nom,
//       //         prenom: userData.prenom,
//       //         type: userData.type
//       //       }));
//       //     } catch (err) {
//       //       console.error('Erreur lors de la récupération des informations utilisateur:', err);
//       //       // Si le token est invalide ou expiré, on le supprime
//       //       localStorage.removeItem('token');
//       //       localStorage.removeItem('user');
//       //     } finally {
//       //       setLoading(false);
//       //     }
//       //   };

//       //   getUserInfo();
//       // }
//       if (userStr) {
//         try {
//           const userObj = JSON.parse(userStr);
//           setCurrentUser(userObj);
//           setLoading(false); // 👉 ajoute ceci ici
//         } catch (err) {
//           console.error(
//             "Erreur lors de l'analyse des données utilisateur:",
//             err
//           );
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           setLoading(false); // 👉 ajoute aussi ici, sinon ça reste bloqué en cas d'erreur
//         }
//       } else {
//         const getUserInfo = async () => {
//           try {
//             const response = await axios.get("/users/me", {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             });

//             const userData = response.data;
//             setCurrentUser({
//               id: userData.id,
//               email: userData.email,
//               nom: userData.nom,
//               prenom: userData.prenom,
//               type: userData.type,
//               entreprise_id: userData.entreprise_id, 
//             });

//             localStorage.setItem(
//               "user",
//               JSON.stringify({
//                 id: userData.id,
//                 email: userData.email,
//                 nom: userData.nom,
//                 prenom: userData.prenom,
//                 type: userData.type,
//                 entreprise_id: userData.entreprise_id,
//               })
//             );
//           } catch (err) {
//             console.error(
//               "Erreur lors de la récupération des informations utilisateur:",
//               err
//             );
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//           } finally {
//             setLoading(false); // ✅ ici c'est déjà bon
//           }
//         };

//         getUserInfo();
//       }
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       setError(null);

//       // Utiliser FormData au lieu de JSON pour l'authentification OAuth2
//       const formData = new FormData();
//       formData.append("username", email); // FastAPI OAuth2 attend 'username'
//       formData.append("password", password);

//       const response = await axios.post("/auth/login", formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       });

//       const { access_token } = response.data;

//       // Stocker le token dans localStorage
//       localStorage.setItem("token", access_token);

//       // Configurer Axios pour inclure le token dans les en-têtes
//       axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

//       // Récupérer les informations de l'utilisateur
//       const userResponse = await axios.get("/users/me");
//       const userData = userResponse.data;

//       // Stocker les informations utilisateur
//       setCurrentUser({
//         id: userData.id,
//         email: userData.email,
//         nom: userData.nom,
//         prenom: userData.prenom,
//         type: userData.type,
//         entreprise_id: userData.entreprise_id, 

//       });

//       // Stocker les informations utilisateur dans localStorage
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           id: userData.id,
//           email: userData.email,
//           nom: userData.nom,
//           prenom: userData.prenom,
//           type: userData.type,
//           entreprise_id: userData.entreprise_id, 
//         })
//       );

//       return true;
//     } catch (err) {
//       console.error("Erreur lors de la connexion:", err);
//       const errorMsg =
//         err.response?.data?.detail ||
//         "Une erreur est survenue lors de la connexion";
//       setError(
//         typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
//       );
//       return false;
//     }
//   };

//   const register = async (userData, userType) => {
//     try {
//       setError(null);
//       const response = await axios.post(`/auth/register/${userType}`, userData);
//       return response.data;
//     } catch (err) {
//       console.error("Erreur lors de l'inscription:", err);
//       const errorMsg =
//         err.response?.data?.detail ||
//         "Une erreur est survenue lors de l'inscription";
//       setError(
//         typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
//       );
//       throw err;
//     }
//   };

//   const logout = () => {
//     // Supprimer le token et les informations utilisateur du localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Réinitialiser l'état de l'utilisateur
//     setCurrentUser(null);

//     // Supprimer le token des en-têtes Axios
//     delete axios.defaults.headers.common["Authorization"];
//   };

//   const value = {
//     currentUser,
//     loading,
//     error,
//     login,
//     register,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error(
//       "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
//     );
//   }
//   return context;
// };


import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier si un token existe dans localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Récupérer les informations de l'utilisateur à partir du localStorage
      const userStr = localStorage.getItem("user");
      
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setCurrentUser(userObj);
          setLoading(false);
        } catch (err) {
          console.error(
            "Erreur lors de l'analyse des données utilisateur:",
            err
          );
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setLoading(false);
        }
      } else {
        const getUserInfo = async () => {
          try {
            const response = await axios.get("/users/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const userData = response.data;
            
            // CORRECTION: Inclure TOUS les champs reçus du backend
            const userToStore = {
              id: userData.id,
              email: userData.email,
              nom: userData.nom,
              prenom: userData.prenom,
              type: userData.type,
              entreprise_id: userData.entreprise_id,
              photo: userData.photo, // ← AJOUT IMPORTANT
              actif: userData.actif,
              created_at: userData.created_at,
              updated_at: userData.updated_at
            };
            
            setCurrentUser(userToStore);
            localStorage.setItem("user", JSON.stringify(userToStore));
            
          } catch (err) {
            console.error(
              "Erreur lors de la récupération des informations utilisateur:",
              err
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } finally {
            setLoading(false);
          }
        };

        getUserInfo();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);

      // Utiliser FormData au lieu de JSON pour l'authentification OAuth2
      const formData = new FormData();
      formData.append("username", email); // FastAPI OAuth2 attend 'username'
      formData.append("password", password);

      const response = await axios.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;

      // Stocker le token dans localStorage
      localStorage.setItem("token", access_token);

      // Configurer Axios pour inclure le token dans les en-têtes
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      // Récupérer les informations de l'utilisateur
      const userResponse = await axios.get("/users/me");
      const userData = userResponse.data;

      console.log("🔍 Données utilisateur reçues lors du login:", userData);

      // CORRECTION: Stocker TOUS les champs reçus
      const userToStore = {
        id: userData.id,
        email: userData.email,
        nom: userData.nom,
        prenom: userData.prenom,
        type: userData.type,
        entreprise_id: userData.entreprise_id,
        photo: userData.photo, // ← AJOUT IMPORTANT
        actif: userData.actif,
        created_at: userData.created_at,
        updated_at: userData.updated_at
      };

      // Stocker les informations utilisateur
      setCurrentUser(userToStore);

      // Stocker les informations utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(userToStore));

      console.log("💾 Données utilisateur stockées:", userToStore);

      return true;
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      const errorMsg =
        err.response?.data?.detail ||
        "Une erreur est survenue lors de la connexion";
      setError(
        typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
      );
      return false;
    }
  };

  const register = async (userData, userType) => {
    try {
      setError(null);
      const response = await axios.post(`/auth/register/${userType}`, userData);
      return response.data;
    } catch (err) {
      console.error("Erreur lors de l'inscription:", err);
      const errorMsg =
        err.response?.data?.detail ||
        "Une erreur est survenue lors de l'inscription";
      setError(
        typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg
      );
      throw err;
    }
  };

  const logout = () => {
    // Supprimer le token et les informations utilisateur du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Réinitialiser l'état de l'utilisateur
    setCurrentUser(null);

    // Supprimer le token des en-têtes Axios
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};