// src/config/api.js

const RENDER_BACKEND_URL = "https://elekyobackend.onrender.com/api";

// We force the Render URL because the Vercel environment might have a broken legacy variable
const API_URL = RENDER_BACKEND_URL; 

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
  
  if (typeof imagePath === 'string' && (imagePath.startsWith('data:image') || imagePath.startsWith('http'))) {
    return imagePath;
  }
  
  // Ensure the path starts with / if it doesn't
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${BACKEND_BASE}${path}`;
};

export { API_URL, BACKEND_BASE, getImageUrl };
