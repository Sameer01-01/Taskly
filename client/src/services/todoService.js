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
    if (!user || !user.token) {
      console.warn('No auth token available');
      return {};
    }
    return { Authorization: `Bearer ${user.token}` };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return {};
  }
};

// Get all todos
export const getAllTodos = async () => {
  try {
    console.log('Fetching todos from:', API_URL);
    console.log('Using headers:', getAuthHeader());
    
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    
    console.log('Todos fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error.response?.data || error.message || error);
    throw error;
  }
};

// Add a new todo
export const createTodo = async (todoData) => {
  try {
    console.log('Creating todo at:', API_URL);
    console.log('Todo data:', todoData);
    console.log('Using headers:', getAuthHeader());
    
    const response = await axios.post(API_URL, todoData, {
      headers: getAuthHeader()
    });
    
    console.log('Todo created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error.response?.data || error.message || error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  try {
    console.log(`Updating todo at: ${API_URL}/${id}`);
    console.log('Update data:', todoData);
    console.log('Using headers:', getAuthHeader());
    
    const response = await axios.put(`${API_URL}/${id}`, todoData, {
      headers: getAuthHeader()
    });
    
    console.log('Todo updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error.response?.data || error.message || error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    console.log(`Deleting todo at: ${API_URL}/${id}`);
    console.log('Using headers:', getAuthHeader());
    
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
    
    console.log('Todo deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error.response?.data || error.message || error);
    throw error;
  }
}; 