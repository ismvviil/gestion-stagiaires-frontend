import axiosInstance from "../api/axios";

// ===== PROFIL STAGIAIRE =====
export const getStagiaireProfile = async () => {
  try {
    const response = await axiosInstance.get("/stagiaires/profile");
    return response.data;
  } catch (error) {
    console.error("Erreur getStagiaireProfile:", error);
    throw error;
  }
};

export const updateStagiaireProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put(
      "/stagiaires/profile",
      profileData
    );
    return response.data;
  } catch (error) {
    console.error("Erreur updateStagiaireProfile:", error);
    throw error;
  }
};

export const getStagiaireStats = async () => {
  try {
    const response = await axiosInstance.get("/stagiaires/profile/stats");
    return response.data;
  } catch (error) {
    console.error("Erreur getStagiaireStats:", error);
    throw error;
  }
};

// ===== UPLOAD PHOTO =====
export const uploadProfilePhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      "/stagiaires/profile/upload-photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur uploadProfilePhoto:", error);
    throw error;
  }
};

export const deleteProfilePhoto = async () => {
  try {
    const response = await axiosInstance.delete("/stagiaires/profile/photo");
    return response.data;
  } catch (error) {
    console.error("Erreur deleteProfilePhoto:", error);
    throw error;
  }
};

// ===== UPLOAD CV ET ANALYSE =====
export const uploadCV = async (file, analyze = true) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("analyze", analyze);

    const response = await axiosInstance.post(
      "/stagiaires/profile/upload-cv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur uploadCV:", error);
    throw error;
  }
};

export const analyzeCV = async () => {
  try {
    const response = await axiosInstance.post("/stagiaires/profile/analyze-cv");
    return response.data;
  } catch (error) {
    console.error("Erreur analyzeCV:", error);
    throw error;
  }
};

// ===== COMPÉTENCES =====
export const getCompetences = async () => {
  try {
    const response = await axiosInstance.get("/stagiaires/profile/competences");
    return response.data;
  } catch (error) {
    console.error("Erreur getCompetences:", error);
    throw error;
  }
};

// ===== RECOMMANDATIONS =====
export const getRecommendations = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/stagiaires/recommendations", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur getRecommendations:", error);
    throw error;
  }
};

export const analyzeRecommendationPotential = async () => {
  try {
    const response = await axiosInstance.get(
      "/stagiaires/recommendations/analyze"
    );
    return response.data;
  } catch (error) {
    console.error("Erreur analyzeRecommendationPotential:", error);
    throw error;
  }
};

export const testMatchWithOffer = async (offreId) => {
  try {
    const response = await axiosInstance.get(
      `/stagiaires/recommendations/test-match/${offreId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur testMatchWithOffer:", error);
    throw error;
  }
};

export const getMarketInsights = async () => {
  try {
    const response = await axiosInstance.get("/stagiaires/market-insights");
    return response.data;
  } catch (error) {
    console.error("Erreur getMarketInsights:", error);
    throw error;
  }
};

export const getBulkAnalysis = async (params = {}) => {
  try {
    const response = await axiosInstance.get(
      "/stagiaires/recommendations/bulk-analyze",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur getBulkAnalysis:", error);
    throw error;
  }
};

export const getCareerGuidance = async () => {
  try {
    const response = await axiosInstance.get("/stagiaires/career-guidance");
    return response.data;
  } catch (error) {
    console.error("Erreur getCareerGuidance:", error);
    throw error;
  }
};

// ===== HELPER FUNCTIONS =====
export const getPhotoUrl = (photoPath) => {
  if (!photoPath) return null;

  // Si c'est déjà une URL complète
  if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
    return photoPath;
  }

  const baseUrl =
    process.env.REACT_APP_API_URL?.replace("/api/v1", "") ||
    "http://localhost:8000";

  // Si le chemin commence par "photos/", utiliser tel quel
  if (photoPath.startsWith("photos/")) {
    return `${baseUrl}/uploads/${photoPath}`;
  }

  // Sinon, ancien format (compatibilité)
  return `${baseUrl}/uploads/${photoPath}`;
};

export const formatCompetences = (competencesString) => {
  if (!competencesString) return [];
  return competencesString
    .split(",")
    .map((comp) => comp.trim())
    .filter((comp) => comp.length > 0);
};

export const getCVUrl = (cvFilename) => {
  if (!cvFilename) return null;
  const baseUrl =
    process.env.REACT_APP_API_URL?.replace("/api/v1", "") ||
    "http://localhost:8000";
  return `${baseUrl}/uploads/cv/${cvFilename}`;
};

// ===== RECOMMANDATIONS PERSONNALISÉES =====
/////////////////////////////////////////////////////////////////::

export const getPersonalizedRecommendations = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      limit: params.limit || 10,
      min_score: params.min_score || 20.0,
      include_similar_profiles: params.include_similar_profiles || true,
    });

    const response = await axiosInstance.get(
      `/stagiaires/recommendations?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations:", error);
    throw error;
  }
};

export const bulkAnalyzeRecommendations = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      limit: params.limit || 20,
      min_score: params.min_score || 30.0,
      export_format: params.export_format || "json",
    });

    const response = await axiosInstance.get(
      `/stagiaires/recommendations/bulk-analyze?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'analyse en masse:", error);
    throw error;
  }
};

// ===== ANALYSE CV =====
export const analyzeCv = async () => {
  try {
    const response = await axiosInstance.post("/stagiaires/profile/analyze-cv");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'analyse du CV:", error);
    throw error;
  }
};

export const uploadCv = async (cvFile, analyze = true) => {
  try {
    const formData = new FormData();
    formData.append("file", cvFile);
    formData.append("analyze", analyze);

    const response = await axiosInstance.post(
      "/stagiaires/profile/upload-cv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'upload du CV:", error);
    throw error;
  }
};

export const getStagiaireCompetences = async () => {
  try {
    const response = await axiosInstance.get("/stagiaires/profile/competences");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des compétences:", error);
    throw error;
  }
};
