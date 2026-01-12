import { IconCamera } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    if (isOpen) {
      try {
        const savedUsers = localStorage.getItem("users") || "[]";
        setUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error("Failed to load users:", e);
        setUsers([]);
      }
    }
  }, [isOpen]);



  const getShortName = (fullName) => (fullName ? fullName.split(" ")[0] : "");

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const findUserByEmail = (emailToFind) =>
    users.find((u) => u.email.toLowerCase() === emailToFind.toLowerCase());

  const validatePassword = (pass) => {
    return pass.length >= 6 && /[a-zA-Z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
    try {
      const res = await axios.post(`${backendUrl}/users/google-login`, {
        token: credentialResponse.credential
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      onLogin?.(res.data);
      onClose();
    } catch (err) {
      console.error("Google Login Backend Error:", err);
      setError("Failed to sign in with Google. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
    setError("Google Login failed. Please try again.");
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

    try {
      if (isSignup) {
        if (findUserByEmail(email)) {
          throw new Error("Email already exists");
        }
        const res = await axios.post(`${backendUrl}/users`, {
          name,
          email,
          password,
          profileImage
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        onLogin?.(res.data);
        onClose();
      } else {
        const res = await axios.post(`${backendUrl}/users/login`, {
          email,
          password
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        onLogin?.(res.data);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setProfileImage(null);
    setIsSignup(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div className="bg-black/50 backdrop-blur-sm w-full h-full absolute" />
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-3 md:p-8 md:pb-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          <div className="flex justify-center p-6">
            <button
              onClick={() => setIsSignup(false)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold md:text-base transition-all ${
                !isSignup
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-base ml-4 transition-all ${
                isSignup
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isSignup && (
            <div className="flex flex-col items-center gap-3 pb-4">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 overflow-hidden bg-gray-50 flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IconCamera size={40} className="text-gray-400" />
                )}
              </div>
              <label className="text-blue-500 text-sm cursor-pointer">
                Upload photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 py-3 space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 bg-red-50 p-3 rounded-xl text-center border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : (isSignup ? "Create Account" : "Login")}
            </button>
          </form>

          <div className="p-6 pt-0 border-t border-gray-200 text-center space-y-4">
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-center w-full">
                <GoogleLogin 
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  width="100%"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-500 font-bold"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
