import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const login = () => {
    setIsAuthenticated(true); // Questo simula il login, aggiornalo per la logica reale
  };

  const logout = () => {
    setIsAuthenticated(false); // Questo simula il logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook per usare l'auth context
export const useAuth = () => useContext(AuthContext);
