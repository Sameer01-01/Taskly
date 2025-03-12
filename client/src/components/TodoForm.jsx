import React, { useState, useEffect } from 'react';

const TodoForm = ({ currentTodo, onSubmit, setCurrentTodo }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setText(currentTodo.text);
    } else {
      setText('');
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    if (currentTodo) {
      onSubmit({
        ...currentTodo,
        text,
      });
    } else {
      onSubmit({ text });
    }
    
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-grow p-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-r hover:bg-blue-700"
        >
          {currentTodo ? 'Update' : 'Add'}
        </button>
      </div>
      {currentTodo && (
        <button
          type="button"
          onClick={() => setCurrentTodo(null)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TodoForm; 