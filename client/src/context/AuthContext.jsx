import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Register user
  const register = async (userData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users', userData);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
      setIsLoading(false);
      throw error;
    }
  };

  // Login user
  const login = async (userData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', userData);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Login failed. Please check your credentials.'
      );
      setIsLoading(false);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        register,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 