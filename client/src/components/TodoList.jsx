import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onDelete, onToggleComplete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList; 