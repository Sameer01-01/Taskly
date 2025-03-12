import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

// Helper function to get auth token
const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// Get all todos
export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Add a new todo
export const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, todo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, todo, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}; 