"use client";
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Sadiq Ahmed',
    email: 'sadiq@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Passionate frontend developer seeking global remote opportunities. I love creating beautiful, functional user experiences.',
    location: 'Global Remote',
    github: 'https://github.com/sadiq',
    linkedin: 'https://linkedin.com/in/sadiq'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, password) => {
    // Simulate login
    setIsAuthenticated(true);
    return Promise.resolve({ success: true });
  };

  const signup = (userData) => {
    // Simulate signup
    setUser({ ...user, ...userData });
    setIsAuthenticated(true);
    return Promise.resolve({ success: true });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};