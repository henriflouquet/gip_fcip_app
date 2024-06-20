import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

// Create a context for the auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to update the token
  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const updateUser = (user) => {
    setUser(user);
  };

  const updateIsLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
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
