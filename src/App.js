import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterRecruteur from "./pages/RegisterRecruteur";
import RegisterResponsableRH from "./pages/RegisterResponsableRH";
import RegisterStagiaire from "./pages/RegisterStagiaire";
import "./App.css";
import MainLayout from "./components/MainLayout";
import RecruteurRoute from "./components/common/RecruteurRoute";
import OffreForm from "./components/offres/OffreForm.js";
import PrivateRoute from "./components/common/PrivateRoute";
import OffresList from "./components/offres/OffresList.jsx";
import OffreDetail from "./components/offres/OffreDetail.jsx";
import StagiaireRoute from "./components/common/StagiaireRoute.js";
import CandidatureForm from "./components/candidatures/CandidatureForm.js";
import MesCandidatures from "./components/candidatures/MesCandidatures.js";
import CandidaturesRecues from "./components/candidatures/CandidaturesRecues.jsx";
// import Messaging from "./pages/Messaging.jsx";
// import { NotificationProvider } from "./context/NotificationContext.jsx";

// import MessagingLayout from "./components/messaging/MessagingLayout.js";
import MessagingPage from "./pages/MessagingPage.jsx";
import StagesList from "./pages/stages/StagesList.jsx";
import StageDetail from "./components/stages/StageDetail.jsx";
import MissionsList from "./components/missions/MissionsList.jsx";
import MissionForm from "./components/missions/MissionForm.jsx";
import MissionDetail from "./components/missions/MissionDetail.jsx";
import { useWebSocket } from "./hooks/useWebSocket.js";

// 🔥 NOUVEAUX COMPOSANTS D'ÉVALUATIONS
import EvaluationApp from "./components/evaluations/EvaluationApp.jsx";
import CertificateVerification from "./pages/CertificateVerification.jsx";
import RHRoute from "./components/common/RHRoute.jsx";
import Contact from "./components/contact/Contact.jsx";
// import RHRoute from "./components/common/RHRoute.jsx";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminRoute from "./components/common/AdminRoute.jsx";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEnterprises from "./pages/admin/AdminEnterprises";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import StagiaireProfile from "./pages/StagiaireProfile.jsx";
import RecommendationsPage from "./pages/RecommendationsPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* 🔥 ROUTES SANS MAINLAYOUT (pas de navbar) */}
            <Route path="/verify" element={<CertificateVerification />} />
            <Route
              path="/verify/:codeUnique"
              element={<CertificateVerification />}
            />
            {/* 🆕 ROUTES ADMIN - VERSION CORRIGÉE */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="enterprises" element={<AdminEnterprises />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* 🔥 ROUTES AVEC MAINLAYOUT (avec navbar) */}
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    {/* Routes publiques */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/register/recruteur"
                      element={<RegisterRecruteur />}
                    />
                    <Route
                      path="/register/responsable-rh"
                      element={<RegisterResponsableRH />}
                    />
                    <Route
                      path="/register/stagiaire"
                      element={<RegisterStagiaire />}
                    />

                    {/* 🆕 NOUVELLE ROUTE CONTACT - Accessible à tous */}
                    <Route path="/contact" element={<Contact />} />

                    {/* Routes protégées pour les recruteurs */}
                    <Route
                      path="/offres/nouvelle"
                      element={
                        <RecruteurRoute>
                          <OffreForm />
                        </RecruteurRoute>
                      }
                    />
                    <Route
                      path="/offres/modifier/:offreId"
                      element={
                        <RecruteurRoute>
                          <OffreForm />
                        </RecruteurRoute>
                      }
                    />
                    <Route
                      path="/offres/:offreId"
                      element={
                        <PrivateRoute>
                          <OffreDetail />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/offres"
                      element={
                        <PrivateRoute>
                          <OffresList />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/candidatures-recues"
                      element={
                        <RecruteurRoute>
                          <CandidaturesRecues />
                        </RecruteurRoute>
                      }
                    />

                    {/* Routes protégées pour les stagiaires */}

                    <Route
                      path="/profile"
                      element={
                        <StagiaireRoute>
                          <StagiaireProfile />
                        </StagiaireRoute>
                      }
                    />
                     <Route
                      path="/recommendations"
                      element={
                        <StagiaireRoute>
                          <RecommendationsPage />
                        </StagiaireRoute>
                      }
                    />
                    <Route
                      path="/offres/:offreId/postuler"
                      element={
                        <StagiaireRoute>
                          <CandidatureForm />
                        </StagiaireRoute>
                      }
                    />
                    <Route
                      path="/mes-candidatures"
                      element={
                        <StagiaireRoute>
                          <MesCandidatures />
                        </StagiaireRoute>
                      }
                    />

                    {/* 🔥 ROUTES D'ÉVALUATIONS */}
                    {/* Dashboard évaluations pour RH et Recruteurs */}
                    <Route
                      path="/evaluations/*"
                      element={
                        <PrivateRoute
                          allowedRoles={["responsable_rh", "recruteur"]}
                        >
                          <EvaluationApp />
                        </PrivateRoute>
                      }
                    />

                    {/* Vue évaluations pour stagiaires (lecture seule) */}
                    <Route
                      path="/mes-evaluations"
                      element={
                        <StagiaireRoute>
                          <EvaluationApp userType="stagiaire" />
                        </StagiaireRoute>
                      }
                    />

                    {/* Route certificats pour RH */}
                    <Route
                      path="/certificats"
                      element={
                        <RHRoute>
                          <EvaluationApp initialView="certificates" />
                        </RHRoute>
                      }
                    />

                    {/* 🔥 ROUTE MESSAGERIE - Accessible à tous les utilisateurs connectés */}
                    <Route
                      path="/messages"
                      element={
                        <PrivateRoute>
                          <MessagingPage />
                        </PrivateRoute>
                      }
                    />

                    {/* Routes pour les STAGES - Accessibles aux recruteurs et stagiaires */}
                    <Route
                      path="/mes-stages"
                      element={
                        <PrivateRoute>
                          <StagesList />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/stages/:stageId"
                      element={
                        <PrivateRoute>
                          <StageDetail />
                        </PrivateRoute>
                      }
                    />

                    {/* Routes pour les MISSIONS */}
                    <Route
                      path="/stages/:stageId/missions"
                      element={
                        <PrivateRoute>
                          <MissionsList />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/missions/nouvelle/:stageId"
                      element={
                        <RecruteurRoute>
                          <MissionForm />
                        </RecruteurRoute>
                      }
                    />
                    <Route
                      path="/missions/:missionId"
                      element={
                        <PrivateRoute>
                          <MissionDetail />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/missions/modifier/:missionId"
                      element={
                        <RecruteurRoute>
                          <MissionForm />
                        </RecruteurRoute>
                      }
                    />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
