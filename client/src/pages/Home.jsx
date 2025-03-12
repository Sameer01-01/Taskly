import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TodoList from '../components/TodoList';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {user ? `Welcome, ${user.name || 'User'}!` : 'Task Manager'}
          </h1>
          <p className="text-text-secondary">
            {user 
              ? 'Manage your tasks efficiently with our beautiful task manager.'
              : 'Please log in to manage your tasks.'}
          </p>
        </div>
        
        <TodoList />
      </div>
    </div>
  );
};

export default Home; 