import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Gestion des Stagiaires
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Accueil
            </Link>
          </li>
          
          {currentUser ? (
            <>
              {/* Menu pour les utilisateurs connectés */}
              {currentUser.type === 'recruteur' && (
                <li className="nav-item">
                  <Link to="/offres" className="nav-links">
                    Mes Offres
                  </Link>
                </li>
              )}
              
              {currentUser.type === 'responsable_rh' && (
                <li className="nav-item">
                  <Link to="/certificats" className="nav-links">
                    Certificats
                  </Link>
                </li>
              )}
              
              {currentUser.type === 'stagiaire' && (
                <li className="nav-item">
                  <Link to="/candidatures" className="nav-links">
                    Mes Candidatures
                  </Link>
                </li>
              )}
              
              <li className="nav-item">
                <Link to="/profile" className="nav-links">
                  Mon Profil
                </Link>
              </li>
              
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links btn-logout">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Menu pour les visiteurs */}
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Connexion
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;