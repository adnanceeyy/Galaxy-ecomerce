import React, { useState } from "react";
import { IconMail, IconLock, IconUser, IconCamera, IconX } from "@tabler/icons-react";
import axios from "axios";
import { API_URL } from "../config/api";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/users/login`, {
          email: formData.email,
          password: formData.password,
        });
        onLogin(res.data);
      } else {
        const res = await axios.post(`${API_URL}/users`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        onLogin(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
        >
          <IconX size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-primary mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? "Sign in to your account to continue" : "Join the Eleckyo community today"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100 flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <IconUser className="absolute top-3.5 left-4 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent transition-all"
                />
              </div>
            )}

            <div className="relative">
              <IconMail className="absolute top-3.5 left-4 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent transition-all"
              />
            </div>

            <div className="relative">
              <IconLock className="absolute top-3.5 left-4 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-accent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-500 hover:text-accent font-medium transition-colors"
            >
              {isLogin ? "New to Eleckyo? Create an account" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
