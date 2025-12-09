// src/components/LoginModal.jsx
import React, { useState, useEffect, useCallback } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Google Client ID - Replace with your actual Client ID from Google Cloud Console
  const CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com'; // e.g., '123456789-abcde.apps.googleusercontent.com'

  useEffect(() => {
    if (isOpen && !googleLoaded) {
      // Dynamically load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false, // Don't auto-select; let user choose
          cancel_on_tap_outside: false,
        });
        setGoogleLoaded(true);
      };
      document.head.appendChild(script);
    }
  }, [isOpen, googleLoaded]);

  const handleGoogleResponse = useCallback((response) => {
    try {
      // Decode JWT token for user info (basic profile)
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const userData = {
        email: payload.email,
        name: payload.name,
        googleId: payload.sub,
        token: response.credential, // Send to backend for verification
      };
      setError('');
      onLogin?.(userData);
      onClose();
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error('Google response error:', err);
    }
  }, [onLogin, onClose]);

  const handleGoogleSignIn = useCallback(() => {
    if (googleLoaded && window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: Manually trigger with select_account prompt
          window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: 'email profile',
            prompt: 'select_account', // Forces account chooser to show all Google accounts
          }).requestAccessToken({
            prompt: '', // Empty to trigger popup
          }).then((tokenResponse) => {
            // This is for access token; adjust if needed, but for ID token, use the main callback
            handleGoogleResponse({ credential: tokenResponse.access_token }); // Note: For full ID token, stick to id.prompt
          }).catch((err) => {
            setError('Google sign-in cancelled or failed.');
            console.error(err);
          });
        }
      });
    } else {
      setError('Google services not loaded. Please refresh and try again.');
    }
  }, [googleLoaded, CLIENT_ID, handleGoogleResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onLogin?.({ email, password });
    onClose();
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
      <div
        className="fixed inset-0 z-[999]"
        onClick={handleClose}
      >
        {/* Blur + dark overlay full screen */}
        <div className="h-full backdrop-blur-sm bg-black/30 flex justify-center items-center p-4"
         onClick={handleClose}>
          <div
            className="bg-white rounded-xl md:p-10 w-full md:w-[900px] md:h-[650px] p-6 shadow-2xl transform transition-all duration-300 scale-100 relative z-1000"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800">Login to Your Account</h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl md:text-4xl font-bold transition-colors duration-200"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 p10">
              <div>
                <label htmlFor="email" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4dabce] focus:border-transparent transition-all duration-200 text-base"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51abcc] focus:border-transparent transition-all duration-200 text-base"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#49add1] hover:bg-[#18a3d6] text-white py-3 rounded-lg font-semibold text-base md:text-2xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center space-y-3">
              <a href="/forgot-password" className="text-[#007bee] hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                Forgot your password?
              </a>
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <a
                  href="/signup"
                  className="text-[#008cff] hover:text-blue-700 font-semibold transition-colors duration-200"
                  onClick={handleClose}
                >
                  Create one
                </a>
              </p>
              {/* Social Login */}
             <div className="space-y-2">
  <button
    type="button"
    onClick={handleGoogleSignIn}
    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-500 text-red-600 bg-white rounded-lg hover:bg-red-50 hover:border-red-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
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
    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-700 text-blue-700 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
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
      </div>
    </>
  );
}