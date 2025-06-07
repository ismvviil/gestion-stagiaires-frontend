import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = null }) => {
  const { currentUser, loading } = useAuth(); // ← CHANGÉ: isLoading → loading

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier les rôles autorisés si spécifiés
  if (allowedRoles && !allowedRoles.includes(currentUser.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

// const PrivateRoute = ({ children }) => {
//   const { currentUser, loading } = useAuth();

//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };