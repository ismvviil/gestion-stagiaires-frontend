import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StagiaireRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.type !== 'stagiaire') {
    return <Navigate to="/" />;
  }

  return children;
};

export default StagiaireRoute;