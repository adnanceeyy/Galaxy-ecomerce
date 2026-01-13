// src/config/api.js

const RENDER_BACKEND_URL = "https://elekyobackend.onrender.com/api";
const LOCAL_BACKEND_URL = "http://localhost:5000/api";

const API_URL = import.meta.env.VITE_BACKEND_URL || RENDER_BACKEND_URL;

// Base URL for uploads (removes /api)
const BACKEND_BASE = API_URL.replace("/api", "");

export { API_URL, BACKEND_BASE };
