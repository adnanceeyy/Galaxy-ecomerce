// src/components/LoginModal.jsx - Enhanced: Email/password stored in localStorage ("users" array). Login reuses saved credentials across sessions. All features professional.
import React, { useState, useEffect, useCallback } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [facebookLoaded, setFacebookLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com';
  const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID_HERE';

  useEffect(() => {
    if (isOpen) {
      try {
        const savedUsers = localStorage.getItem("users") || "[]";
        setUsers(JSON.parse(savedUsers));
        console.log('Loaded users from localStorage:', JSON.parse(savedUsers)); // Debug: See saved accounts
      } catch (e) {
        console.error("Failed to load users:", e);
        setUsers([]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !googleLoaded) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google script loaded');
        setGoogleLoaded(true);
        if (window.google && GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE') {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          });
        }
      };
      script.onerror = () => {
        console.warn('Google script failed (using mock)');
        setGoogleLoaded(true);
      };
      document.head.appendChild(script);
    }
  }, [isOpen, googleLoaded, GOOGLE_CLIENT_ID]);

  useEffect(() => {
    if (isOpen && !facebookLoaded) {
      window.fbAsyncInit = function () {
        console.log('FB script loaded');
        setFacebookLoaded(true);
        if (FACEBOOK_APP_ID !== 'YOUR_FACEBOOK_APP_ID_HERE') {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v20.0'
          });
        }
      };

      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        js.onerror = () => {
          console.warn('FB script failed (using mock)');
          setFacebookLoaded(true);
        };
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }, [isOpen, facebookLoaded, FACEBOOK_APP_ID]);

  // Force-enable after 2s if scripts hang
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (!googleLoaded) setGoogleLoaded(true);
        if (!facebookLoaded) setFacebookLoaded(true);
        console.log('Forced enable for mocks');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, googleLoaded, facebookLoaded]);

  const getShortName = (fullName) => fullName ? fullName.split(' ')[0] : '';

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log('Saved users to localStorage:', updatedUsers); // Debug: Confirm save
  };

  const findUserByEmail = (emailToFind) => users.find(u => u.email === emailToFind);

  const validatePassword = (pass) => {
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    return hasLetter && hasNumber && pass.length >= 6;
  };

  const handleGoogleResponse = useCallback((response) => {
    try {
      let payload;
      if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        payload = JSON.parse(response.credential);
      } else {
        payload = JSON.parse(atob(response.credential.split('.')[1]));
      }
      let userData = findUserByEmail(payload.email);
      if (!userData) {
        userData = {
          id: Date.now(),
          name: getShortName(payload.name),
          fullName: payload.name,
          email: payload.email,
          googleId: payload.sub,
          token: response.credential || 'mock-google-token',
          provider: 'google',
        };
        saveUsers([...users, userData]);
      }
      setError('');
      localStorage.setItem("currentUser", JSON.stringify(userData));
      onLogin?.(userData);
      onClose();
      console.log('Google login success:', userData);
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error('Google response error:', err);
    }
  }, [users, onLogin, onClose, GOOGLE_CLIENT_ID]);

  const handleGoogleSignIn = useCallback(() => {
    console.log('Google button clicked, loaded:', googleLoaded);
    if (googleLoaded && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else if (googleLoaded) {
      const mockPayload = {
        sub: 'mockgoogle' + Date.now(),
        name: 'Mock Google User',
        email: 'mockuser@gmail.com'
      };
      const mockResponse = {
        credential: JSON.stringify(mockPayload)
      };
      handleGoogleResponse(mockResponse);
    } else {
      setError('Google not ready. Refresh and try again.');
    }
  }, [googleLoaded, handleGoogleResponse, GOOGLE_CLIENT_ID]);

  const handleFacebookResponse = useCallback((response, fbResponse) => {
    if (response.status === 'connected' || FACEBOOK_APP_ID === 'YOUR_FACEBOOK_APP_ID_HERE') {
      let userData = findUserByEmail(fbResponse.email);
      if (!userData) {
        userData = {
          id: Date.now(),
          name: getShortName(fbResponse.name),
          fullName: fbResponse.name,
          email: fbResponse.email,
          facebookId: fbResponse.id,
          token: response.authResponse?.accessToken || 'mock-facebook-token',
          provider: 'facebook',
        };
        saveUsers([...users, userData]);
      }
      setError('');
      localStorage.setItem("currentUser", JSON.stringify(userData));
      onLogin?.(userData);
      onClose();
      console.log('FB login success:', userData);
    } else {
      setError('Facebook sign-in cancelled.');
    }
  }, [users, onLogin, onClose, FACEBOOK_APP_ID]);

  const handleFacebookSignIn = useCallback(() => {
    console.log('FB button clicked, loaded:', facebookLoaded);
    if (facebookLoaded && window.FB) {
      window.FB.login(function(response) {
        if (response.authResponse) {
          window.FB.api('/me?fields=name,email', function(fbResponse) {
            handleFacebookResponse(response, fbResponse);
          });
        } else {
          handleFacebookResponse(response, null);
        }
      }, { scope: 'email' });
    } else if (facebookLoaded) {
      const mockFbResponse = {
        id: 'mockfb' + Date.now(),
        name: 'Mock Facebook User',
        email: 'mockfbuser@facebook.com'
      };
      const mockResponse = {
        status: 'connected',
        authResponse: { accessToken: 'mockfbtoken' }
      };
      handleFacebookResponse(mockResponse, mockFbResponse);
    } else {
      setError('Facebook not ready. Refresh and try again.');
    }
  }, [facebookLoaded, handleFacebookResponse, FACEBOOK_APP_ID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (isSignup && !name) {
      setError('Name is required for signup.');
      return;
    }
    if (isSignup) {
      if (!validatePassword(password)) {
        setError('Password must contain at least one letter, one number, and be 6+ characters.');
        return;
      }
      if (findUserByEmail(email)) {
        setError('Email already exists. Please login instead.');
        return;
      }
      const newUser = {
        id: Date.now(),
        name: getShortName(name),
        fullName: name,
        email,
        password, // Stored plain for mock; hash in prod
        provider: 'email',
      };
      saveUsers([...users, newUser]); // Saves to "users" array in localStorage
      localStorage.setItem("currentUser", JSON.stringify(newUser)); // Sets active user
      setError('');
      onLogin?.(newUser); // Triggers live updates (e.g., Nav)
      onClose();
      console.log('Signup success - User saved to localStorage');
    } else {
      // Login: Search "users" array in localStorage for match
      const existingUser = findUserByEmail(email);
      if (!existingUser || existingUser.password !== password) {
        setError('Invalid email or password. Check your credentials.');
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(existingUser)); // Sets active user
      setError('');
      onLogin?.(existingUser); // Triggers live updates
      onClose();
      console.log('Login success - Reused from localStorage');
    }
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={handleClose}>
        <div className="bg-black/50 backdrop-blur-sm w-full h-full absolute" onClick={handleClose} />
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 mx-auto transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center p-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <button className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200" onClick={handleClose}>
              &times;
            </button>
          </div>

          <div className="flex justify-center p-6 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className={`px-6 py-3 rounded-full font-semibold text-base transition-all ${!isSignup ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className={`px-6 py-3 rounded-full font-semibold text-base ml-4 transition-all ${isSignup ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {isSignup && (
              <div>
                <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  className="w-full pr-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {isSignup && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must include at least one letter, one number, and be 6+ characters.
                </p>
              )}
            </div>
            {error && (
              <div className="relative">
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200 text-center animate-pulse">
                  {error}
                </p>
                <button
                  onClick={() => setError('')}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs"
                >
                  &times;
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSignup && !validatePassword(password)}
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="p-6 pt-0 border-t border-gray-200 text-center space-y-4">
            {!isSignup && (
              <a href="/forgot-password" className="text-blue-500 hover:text-blue-600 font-medium block text-sm">
                Forgot password?
              </a>
            )}
            <p className="text-gray-600 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {isSignup ? 'Login' : 'Sign up'}
              </button>
            </p>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={!googleLoaded}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                onClick={handleFacebookSignIn}
                disabled={!facebookLoaded}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}