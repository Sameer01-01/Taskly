import axios from 'axios';

// Safe way to access environment variables in browser
const getApiUrl = () => {
  // Check if window object exists (we're in a browser)
  if (typeof window !== 'undefined') {
    // Try to get from window.__env__ if it exists (some setups use this)
    if (window.__env__ && window.__env__.REACT_APP_API_URL) {
      return `${window.__env__.REACT_APP_API_URL}/api/todos`;
    }
    
    // Try regular env access (works in Create React App if properly configured)
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
      return `${process.env.REACT_APP_API_URL}/api/todos`;
    }
  }
  
  // Fallback to hardcoded value
  return 'https://todo-caoe.onrender.com/api/todos';
};

const API_URL = getApiUrl();

// For debugging - remove in production
console.log('Todo API URL:', API_URL);

// Helper function to get auth token from localStorage
const getAuthHeader = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Getting auth header, user found:', !!user);
    
    if (!user || !user.token) {
      console.warn('No auth token available in localStorage');
      return {};
    }
    
    console.log('Token preview:', user.token.substr(0, 10) + '...');
    return {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json'
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return {};
  }
};

// Get all todos
export const getAllTodos = async () => {
  try {
    const headers = getAuthHeader();
    console.log('Fetching todos from:', API_URL);
    console.log('Using auth header:', !!headers.Authorization);
    
    if (!headers.Authorization) {
      throw new Error('No authentication token available');
    }
    
    const response = await axios.get(API_URL, { headers });
    
    console.log('Todos fetched successfully:', response.data.length + ' todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      hasToken: !!getAuthHeader().Authorization
    });
    throw error;
  }
};

// Add a new todo
export const createTodo = async (todoData) => {
  try {
    const headers = getAuthHeader();
    console.log('Creating todo at:', API_URL);
    console.log('Using auth header:', !!headers.Authorization);
    
    if (!headers.Authorization) {
      throw new Error('No authentication token available');
    }
    
    const response = await axios.post(API_URL, todoData, { headers });
    
    console.log('Todo created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      hasToken: !!getAuthHeader().Authorization
    });
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  try {
    const headers = getAuthHeader();
    console.log(`Updating todo at: ${API_URL}/${id}`);
    console.log('Using auth header:', !!headers.Authorization);
    
    if (!headers.Authorization) {
      throw new Error('No authentication token available');
    }
    
    const response = await axios.put(`${API_URL}/${id}`, todoData, { headers });
    
    console.log('Todo updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      hasToken: !!getAuthHeader().Authorization
    });
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const headers = getAuthHeader();
    console.log(`Deleting todo at: ${API_URL}/${id}`);
    console.log('Using auth header:', !!headers.Authorization);
    
    if (!headers.Authorization) {
      throw new Error('No authentication token available');
    }
    
    await axios.delete(`${API_URL}/${id}`, { headers });
    
    console.log('Todo deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting todo:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      hasToken: !!getAuthHeader().Authorization
    });
    throw error;
  }
}; 