import { useState, useEffect, useContext } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { AuthContext } from '../context/AuthContext';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTodo, setCurrentTodo] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await getAllTodos();
      console.log("Fetched todos:", fetchedTodos);
      setTodos(fetchedTodos);
      setError('');
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text, dueDate) => {
    try {
      console.log("Adding todo with dueDate:", dueDate);
      const newTodo = await createTodo({ text, dueDate });
      console.log("New todo created:", newTodo);
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (id, text, dueDate) => {
    try {
      console.log("Updating todo with dueDate:", dueDate);
      const updatedTodo = await updateTodo(id, { text, dueDate });
      console.log("Updated todo:", updatedTodo);
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
      setCurrentTodo(null);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      const updatedTodo = await updateTodo(id, { 
        completed: !todoToUpdate.completed 
      });
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error('Error toggling todo completion:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleEditTodo = (todo) => {
    console.log("Editing todo:", todo);
    setCurrentTodo(todo);
  };

  const handleCancelEdit = () => {
    setCurrentTodo(null);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-surface-1 rounded-lg shadow-lg">
        <p className="text-text-primary text-lg">Please log in to manage your todos.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <TodoForm 
        onAddTodo={handleAddTodo} 
        currentTodo={currentTodo} 
        onUpdateTodo={handleUpdateTodo}
        onCancelEdit={handleCancelEdit}
      />
      
      {error && (
        <div className="bg-error/20 text-error p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : todos.length === 0 ? (
        <div className="bg-surface-2 p-6 rounded-lg text-center">
          <p className="text-text-secondary">No todos yet. Add one above!</p>
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          {todos.map(todo => (
            <Todo
              key={todo._id}
              todo={todo}
              onDelete={() => handleDeleteTodo(todo._id)}
              onToggleComplete={() => handleToggleComplete(todo._id)}
              onEdit={() => handleEditTodo(todo)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList; 