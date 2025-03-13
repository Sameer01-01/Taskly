import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Safe way to access environment variables in browser
const getApiUrl = () => {
  // Check if window object exists (we're in a browser)
  if (typeof window !== 'undefined') {
    // Try to get from window.__env__ if it exists (some setups use this)
    if (window.__env__ && window.__env__.VITE_API_URL) {
      return window.__env__.VITE_API_URL;
    }
    
    // Try Vite env access
    if (import.meta.env && import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
  }
  
  // Fallback to hardcoded value - REPLACE WITH YOUR ACTUAL BACKEND URL
  return 'https://todo-caoe.onrender.com';
};

const API_URL = getApiUrl();

// For debugging - remove in production
console.log('Auth API URL:', API_URL);

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
    console.log('Checking localStorage for user on load:', storedUser ? 'Found user' : 'No user found');
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Parsed user data:', { 
          email: userData.email,
          hasToken: !!userData.token,
          tokenPreview: userData.token ? `${userData.token.substr(0, 10)}...` : 'no token'
        });
        
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Register user
  const register = async (userData) => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Registering user with API URL:', `${API_URL}/api/users`);
      console.log('Registration data:', { email: userData.email, hasPassword: !!userData.password });
      
      const response = await axios.post(`${API_URL}/api/users`, userData);
      
      console.log('Registration response status:', response.status);
      console.log('Registration response has token:', !!response.data?.token);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response || error);
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
      console.log('Logging in user with API URL:', `${API_URL}/api/users/login`);
      console.log('Login attempt for email:', userData.email);
      
      const response = await axios.post(`${API_URL}/api/users/login`, userData);
      
      console.log('Login response:', {
        status: response.status,
        hasData: !!response.data,
        hasToken: !!response.data?.token,
        token: response.data?.token ? `${response.data.token.substring(0, 10)}...` : 'no token'
      });
      
      if (!response.data) {
        throw new Error('Login response missing data');
      }
      
      console.log('Storing user data in localStorage');
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Verify data was stored correctly
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log('Verified stored user data:', {
        hasStoredUser: !!storedUser,
        hasStoredToken: !!storedUser?.token
      });
      
      setUser(response.data);
      setIsAuthenticated(true);
      console.log('Authentication state updated:', { isAuthenticated: true });
      
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Login error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
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
    console.log('Logging out user');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    console.log('Authentication state cleared');
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
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 