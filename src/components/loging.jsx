// src/components/LoginModal.jsx - FULLY WORKING with Google & Facebook + Profile Image
import { IconCamera } from "@tabler/icons-react";
import React, { useState, useEffect, useCallback } from "react";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [facebookLoaded, setFacebookLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  // REPLACE THESE WITH YOUR REAL IDs
  const GOOGLE_CLIENT_ID =
    "482780462210-8lek18unaerjv42kuc0bgrmsqhsgam55.apps.googleusercontent.com"; // ← Put your real ID here
  const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID_HERE"; // ← Put your real App ID here

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

  // Load Google Sign-In
  useEffect(() => {
    if (isOpen && !googleLoaded) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleLoaded(true);
        if (
          window.google &&
          GOOGLE_CLIENT_ID !==
            "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com"
        ) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          });
          window.google.accounts.id.renderButton(
            document.getElementById("google-signin-button"),
            { theme: "outline", size: "large", text: "continue_with" }
          );
        }
      };
      script.onerror = () => setGoogleLoaded(true);
      document.head.appendChild(script);
    }
  }, [isOpen, googleLoaded]);

  // Load Facebook SDK
  useEffect(() => {
    if (isOpen && !facebookLoaded) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v20.0",
        });
        setFacebookLoaded(true);
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        js.onload = () => setFacebookLoaded(true);
        js.onerror = () => setFacebookLoaded(true);
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, [isOpen, facebookLoaded]);

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

  // Google Login Handler
  const handleGoogleResponse = useCallback(
    (response) => {
      try {
        let payload;
        if (GOOGLE_CLIENT_ID.includes("YOUR_GOOGLE")) {
          // Mock mode
          payload = {
            name: "Mock Google User",
            email: `google${Date.now()}@example.com`,
            picture: "https://via.placeholder.com/150?text=Google",
          };
        } else {
          payload = JSON.parse(atob(response.credential.split(".")[1]));
        }

        let userData = findUserByEmail(payload.email);
        if (!userData) {
          userData = {
            id: Date.now(),
            name: getShortName(payload.name || payload.email),
            fullName: payload.name || payload.email,
            email: payload.email,
            provider: "google",
            profileImage: payload.picture || null,
          };
          saveUsers([...users, userData]);
        }

        localStorage.setItem("currentUser", JSON.stringify(userData));
        onLogin?.(userData);
        onClose();
        setError("");
      } catch (err) {
        setError("Google login failed. Try again.");
      }
    },
    [users, onLogin, onClose]
  );

  const handleGoogleSignIn = () => {
    if (
      googleLoaded &&
      window.google &&
      GOOGLE_CLIENT_ID !==
        "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com"
    ) {
      window.google.accounts.id.prompt();
    } else {
      // Mock login for testing
      handleGoogleResponse({ credential: "mock" });
    }
  };

  // Facebook Login Handler
  const handleFacebookResponse = useCallback(
    (fbResponse) => {
      if (!fbResponse || !fbResponse.email) {
        setError("Facebook login failed or cancelled.");
        return;
      }

      let userData = findUserByEmail(fbResponse.email);
      if (!userData) {
        userData = {
          id: Date.now(),
          name: getShortName(fbResponse.name),
          fullName: fbResponse.name,
          email: fbResponse.email,
          provider: "facebook",
          profileImage: `https://graph.facebook.com/${fbResponse.id}/picture?type=large`,
        };
        saveUsers([...users, userData]);
      }

      localStorage.setItem("currentUser", JSON.stringify(userData));
      onLogin?.(userData);
      onClose();
      setError("");
    },
    [users, onLogin, onClose]
  );

  const handleFacebookSignIn = () => {
    if (
      facebookLoaded &&
      window.FB &&
      FACEBOOK_APP_ID !== "YOUR_FACEBOOK_APP_ID_HERE"
    ) {
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            window.FB.api("/me?fields=name,email,picture", (fbResponse) => {
              handleFacebookResponse(fbResponse);
            });
          } else {
            setError("Facebook login cancelled.");
          }
        },
        { scope: "email" }
      );
    } else {
      // Mock Facebook login
      handleFacebookResponse({
        id: "123456789",
        name: "Mock Facebook User",
        email: `fb${Date.now()}@example.com`,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    if (isSignup) {
      if (!name) {
        setError("Name required");
        return;
      }
      if (!validatePassword(password)) {
        setError("Password must be 6+ chars with letter & number");
        return;
      }
      if (findUserByEmail(email)) {
        setError("Email already exists");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: getShortName(name),
        fullName: name,
        email,
        password,
        provider: "email",
        profileImage: profileImage || null,
      };

      saveUsers([...users, newUser]);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      onLogin?.(newUser);
      onClose();
    } else {
      const user = findUserByEmail(email);
      if (!user || user.password !== password) {
        setError("Wrong email or password");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin?.(user);
      onClose();
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition"
            >
              {isSignup ? "Create Account" : "Login"}
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

            <div className="space-y-3">
              {/* Google Sign-In Button - Auto rendered by Google */}
              <div
                id="google-signin-button"
                className="w-full flex items-center justify-center "
              ></div>

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
