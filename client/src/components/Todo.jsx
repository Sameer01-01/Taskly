import React, { useState, useEffect } from 'react';

const Todo = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Debug logs
  useEffect(() => {
    console.log('Todo prop:', todo);
    console.log('Due date value:', todo.dueDate);
    console.log('Due date type:', todo.dueDate ? typeof todo.dueDate : 'null');
  }, [todo]);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return null;
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };
  
  // Check if due date is today, past due, or upcoming
  const getDueDateStatus = (dateString) => {
    if (!dateString) return null;
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const dueDate = new Date(dateString);
      dueDate.setHours(0, 0, 0, 0);
      
      if (dueDate.getTime() === today.getTime()) {
        return 'today';
      } else if (dueDate < today) {
        return 'overdue';
      } else {
        return 'upcoming';
      }
    } catch (error) {
      console.error('Error getting due date status:', error);
      return null;
    }
  };
  
  // Direct formatting for debugging
  const rawDueDate = todo.dueDate ? new Date(todo.dueDate).toString() : 'No due date';
  
  const dueDateStatus = getDueDateStatus(todo.dueDate);
  const formattedDueDate = formatDate(todo.dueDate);
  
  return (
    <div 
      className={`taskly-task-item group ${todo.completed ? 'border-opacity-50' : ''} ${isHovered ? 'scale-[1.01]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center flex-1 min-w-0">
        <div 
          onClick={() => onToggleComplete(todo._id)}
          className={`h-5 w-5 rounded flex-shrink-0 cursor-pointer mr-3 border grid place-items-center transition-all duration-300 ease-in-out
          ${todo.completed 
            ? 'bg-primary border-primary' 
            : 'border-border hover:border-primary bg-surface-3'}`}
        >
          {todo.completed && (
            <svg className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        
        <div className="min-w-0 flex-1">
          <p className={`text-sm ${todo.completed ? 'line-through text-text-tertiary' : 'text-text-primary'} truncate transition-all duration-300`}>
            {todo.text}
          </p>
          
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-text-tertiary flex items-center">
              <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
              </svg>
              <span>Created: </span>
              {new Date(todo.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </p>
            
            {todo.dueDate && (
              <div className="flex items-center">
                <span className="mx-1 text-text-tertiary text-xs">•</span>
                <span className={`text-xs rounded-full px-2 py-0.5 flex items-center ${
                  todo.completed
                    ? 'bg-surface-3 text-text-tertiary' 
                    : dueDateStatus === 'overdue'
                      ? 'bg-red-900/20 text-error'
                      : dueDateStatus === 'today'
                        ? 'bg-orange-900/20 text-warning'
                        : 'bg-green-900/20 text-success'
                }`}>
                  <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>
                  <span>Due: {formattedDueDate}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(todo)}
          className="h-8 w-8 rounded-md bg-surface-3 hover:bg-surface text-text-secondary hover:text-primary flex items-center justify-center transition-all duration-200"
          aria-label="Edit task"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </button>
        
        <button
          onClick={() => onDelete(todo._id)}
          className="h-8 w-8 rounded-md bg-surface-3 hover:bg-error hover:bg-opacity-10 text-text-secondary hover:text-error flex items-center justify-center transition-all duration-200"
          aria-label="Delete task"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Todo;