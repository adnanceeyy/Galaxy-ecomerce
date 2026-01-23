// src/config/api.js

const RENDER_BACKEND_URL = "https://elekyobackend.onrender.com/api";
const LOCAL_BACKEND_URL = "http://localhost:5000/api";

const API_URL = window.location.hostname === "localhost" ? LOCAL_BACKEND_URL : RENDER_BACKEND_URL; 

// Base URL for uploads (removes /api)
const BACKEND_BASE = API_URL.replace("/api", "");

/**
 * Helper to get the correct image URL.
 * Handles:
 * 1. Base64 strings (starts with data:image)
 * 2. Absolute URLs (starts with http)
 * 3. Local paths (needs BACKEND_BASE)
 */
const getImageUrl = (imagePath, fallback = "https://via.placeholder.com/300?text=No+Image") => {
  if (!imagePath) return fallback;

  // If it's already a full URL or base64, return it
  if (typeof imagePath === 'string') {
    const trimmed = imagePath.trim();
    if (trimmed.startsWith('data:image') || trimmed.startsWith('http')) {
      return trimmed;
    }
  }

  // Handle case where imagePath might be an array
  if (Array.isArray(imagePath) && imagePath.length > 0) {
    const firstImage = imagePath[0];
    if (typeof firstImage === 'string') {
      const trimmed = firstImage.trim();
      if (trimmed.startsWith('data:image') || trimmed.startsWith('http')) {
        return trimmed;
      }
      const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
      return `${BACKEND_BASE}${path}`;
    }
  }

  // Fallback for non-string paths
  if (typeof imagePath !== 'string') return fallback;

  // Standard local path handling
  const trimmed = imagePath.trim();
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${BACKEND_BASE}${path}`;
};

export { API_URL, BACKEND_BASE, getImageUrl };
