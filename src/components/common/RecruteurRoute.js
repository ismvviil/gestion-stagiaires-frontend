import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RecruteurRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

console.log("Chargement...", loading, currentUser);
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.type !== 'recruteur') {
    return <Navigate to="/" />;
  }

  return children;
};

export default RecruteurRoute;