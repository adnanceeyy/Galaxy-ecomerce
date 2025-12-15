// src/contexts/AuthContext.jsx - Updated: Expose currentUser for Nav to display live details
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import LoginModal from './loging';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // Added: Track current user
  const timeoutRef = useRef(null);

  // Added: Sync currentUser with localStorage on mount/load
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    // Mark as initial load
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 5000); // Allow 5s for initial checks

    // Check localStorage for auto-open with delay only on initial load
    if (!currentUser && isInitialLoad) {
      timeoutRef.current = setTimeout(() => {
        setShowModal(true);
      }, 5000); // 5s delay only on initial website open
    }

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInitialLoad, currentUser]); // Added currentUser dependency

  const openModal = () => {
    // Immediately open modal (no delay) - for triggers like checkout
    setShowModal(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentUser(userData); // Added: Update local state
    setShowModal(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('users'); // Optional: Clear users DB
    setCurrentUser(null); // Added: Clear local state
    setShowModal(isInitialLoad ? false : true); // Re-show if not initial
  };

  const value = {
    isLoggedIn: !!currentUser,
    currentUser, // Added: Expose for Nav to use
    openModal,
    handleLogout,
    handleLogin, // Optional: For manual login calls
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showModal && (
        <LoginModal
          isOpen={true}
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
        />
      )}
    </AuthContext.Provider>
  );
}