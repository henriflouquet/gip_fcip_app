import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for the auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to update the token
  const updateToken = (newToken) => {
    setAuthToken(newToken);
  };

  const updateUser = (user) => {
    setUser(user);
  };

  const updateIsLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      setAuthToken(null);
      setUser(null);
      setIsLoggedIn(false);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        updateToken,
        user,
        updateUser,
        isLoggedIn,
        updateIsLoggedIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth in components
export const useAuth = () => useContext(AuthContext);
