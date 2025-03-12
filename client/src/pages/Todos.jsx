import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Spinner from '../components/Spinner';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch todos on initial load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
        console.error('Error fetching todos:', err);
      }
    };

    fetchTodos();
  }, []);

  // Handle adding a new todo
  const handleAddTodo = async (todo) => {
    try {
      setLoading(true);
      const newTodo = await createTodo(todo);
      setTodos([newTodo, ...todos]);
      setLoading(false);
    } catch (err) {
      setError('Failed to add todo');
      setLoading(false);
      console.error('Error adding todo:', err);
    }
  };

  // Handle updating a todo
  const handleUpdateTodo = async (todo) => {
    try {
      setLoading(true);
      const updatedTodo = await updateTodo(todo._id, todo);
      setTodos(todos.map((t) => (t._id === todo._id ? updatedTodo : t)));
      setCurrentTodo(null);
      setLoading(false);
    } catch (err) {
      setError('Failed to update todo');
      setLoading(false);
      console.error('Error updating todo:', err);
    }
  };

  // Handle toggling a todo completion status
  const handleToggleComplete = async (id) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      const updatedTodo = await updateTodo(id, {
        ...todoToToggle,
        completed: !todoToToggle.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error toggling todo:', err);
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Handle edit todo (sets it to edit mode)
  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
  };

  // Handle submitting the form
  const handleSubmit = (todo) => {
    if (todo._id) {
      handleUpdateTodo(todo);
    } else {
      handleAddTodo(todo);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Todo List</h1>
        
        <TodoForm 
          currentTodo={currentTodo} 
          onSubmit={handleSubmit} 
          setCurrentTodo={setCurrentTodo} 
        />
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        
        {loading ? (
          <Spinner />
        ) : (
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTodo}
          />
        )}
      </div>
    </div>
  );
};

export default Todos; 