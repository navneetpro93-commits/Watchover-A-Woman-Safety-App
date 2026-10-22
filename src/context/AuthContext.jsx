import React, { createContext, useContext, useState } from 'react';

/**
 * AuthContext
 * Demonstrates CE2 Syllabus Topics:
 * - Context API: State architecture in React apps
 * - Global vs local state
 * - Authentication lifecycle (login, signup, update profile, logout)
 * - LocalStorage state hydration and synchronization
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('watchover_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = (userData) => {
    const savedRegUserStr = localStorage.getItem('watchover_registered_user');
    let registeredUser = null;
    if (savedRegUserStr) {
      try {
        registeredUser = JSON.parse(savedRegUserStr);
      } catch (err) {
        console.error("Failed to parse registered user details:", err);
      }
    }

    let activeUser = null;
    if (registeredUser) {
      activeUser = {
        ...registeredUser,
        name: userData.name || registeredUser.name,
        email: userData.email || registeredUser.email
      };
    } else {
      activeUser = {
        name: userData.name || 'WatchOver Member',
        email: userData.email || 'user@watchover.org',
        phone: userData.phone || '',
        altPhone: userData.altPhone || '',
        emergencyContacts: [],
        notifications: true,
        locationPermission: true
      };
    }

    setUser(activeUser);
    localStorage.setItem('watchover_user', JSON.stringify(activeUser));
    return activeUser;
  };

  const signup = (registeredUserData) => {
    setUser(registeredUserData);
    localStorage.setItem('watchover_user', JSON.stringify(registeredUserData));
    return registeredUserData;
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('watchover_user', JSON.stringify(updatedUserData));
    return updatedUserData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('watchover_user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        signup, 
        updateUser, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
