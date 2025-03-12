import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/todos` : 'http://localhost:5000/api/todos';

// Helper function to get auth token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? { Authorization: `Bearer ${user.token}` } : {};
};

// Get all todos
export const getAllTodos = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Add a new todo
export const createTodo = async (todoData) => {
  try {
    console.log('Creating todo with data:', todoData);
    const response = await axios.post(API_URL, todoData, {
      headers: getAuthHeader()
    });
    console.log('Create todo response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, todoData) => {
  try {
    console.log('Updating todo with id:', id, 'and data:', todoData);
    const response = await axios.put(`${API_URL}/${id}`, todoData, {
      headers: getAuthHeader()
    });
    console.log('Update todo response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}; 