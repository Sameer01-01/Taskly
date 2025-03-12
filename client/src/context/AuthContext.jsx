import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is stored in localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
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