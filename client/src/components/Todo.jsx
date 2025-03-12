import React from 'react'

const Todo = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow mb-2 flex items-center justify-between ${todo.completed ? 'opacity-70' : ''}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id)}
          className="mr-3 h-5 w-5 text-blue-600"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.text}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo