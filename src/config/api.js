// src/config/api.js

const RENDER_BACKEND_URL = "https://elekyobackend.onrender.com/api";

// We force the Render URL because the Vercel environment might have a broken legacy variable
const API_URL = RENDER_BACKEND_URL; 

// Base URL for uploads (removes /api)
const BACKEND_BASE = API_URL.replace("/api", "");

export { API_URL, BACKEND_BASE };
