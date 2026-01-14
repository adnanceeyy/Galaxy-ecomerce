import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconMail, IconLock, IconUser, IconBrandGoogle, IconCamera } from "@tabler/icons-react";
import { API_URL } from "../config/api";
import { useAuth } from "../components/AuthWrapper";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const { handleLogin: login } = useAuth(); // Destructure handleLogin as login
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
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
    try {
      // Send ID token (credential) to backend to verify and get user data
      const res = await axios.post(`${API_URL}/users/google-login`, {
        token: credentialResponse.credential // Now sending the ID token
      });
      login(res.data);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google Login Backend Error:", err);
      toast.error("Failed to sign in with Google. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
    toast.error("Google Login failed. Please try again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Notify user if it takes too long (Cold Start handling)
    const slowServerToast = setTimeout(() => {
      toast("Starting up the secure server... this might take 30-60 seconds!", {
        icon: '🚀',
        duration: 10000,
      });
    }, 4000);

    try {
      const config = { timeout: 60000 }; // 60s timeout for cold starts

      if (isLogin) {
        // LOGIN logic
        const res = await axios.post(`${API_URL}/users/login`, {
          email: formData.email,
          password: formData.password
        }, config);

        clearTimeout(slowServerToast);
        login(res.data);
        toast.success("Logged in successfully!");
        navigate("/");

      } else {
        // REGISTER logic
        if (formData.password !== formData.confirmPassword) {
          clearTimeout(slowServerToast);
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        const res = await axios.post(`${API_URL}/users`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profileImage: profileImage
        }, config);

        clearTimeout(slowServerToast);
        login(res.data);
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      clearTimeout(slowServerToast);
      console.error(err);

      let msg = "An error occurred. Please try again.";
      if (err.code === 'ECONNABORTED') {
        msg = "Request timed out. The server might be waking up, please try again.";
      } else if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }

      toast.error(msg);
      setError(msg);
    } finally {
      clearTimeout(slowServerToast);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-800 py-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="px-6 py-6 bg-primary text-white text-center">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight inline-block mb-1">Eleckyo</Link>
          <p className="text-blue-100 text-[11px]">{isLogin ? "Welcome Back" : "Create an Account"}</p>
        </div>

        {/* Form */}
        <div className="p-6">

          {!isLogin && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center relative group">
                {profileImage ? (
                  <img src={profileImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <IconUser size={32} className="text-gray-300" />
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                  <IconCamera size={20} className="text-white" />
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs text-gray-400 font-medium">Add Profile Picture (Optional)</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <IconUser className="absolute top-3.5 left-4 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
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
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
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
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <IconLock className="absolute top-3.5 left-4 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent hover:text-accent-hover font-bold ml-1"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>

          {/* Social (Mock) */}
          <div className="mt-8">
            <div className="relative text-center mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <span className="relative bg-white px-4 text-xs text-gray-500 uppercase tracking-wide">Or continue with</span>
            </div>
            <div className="flex flex-col gap-4">
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
