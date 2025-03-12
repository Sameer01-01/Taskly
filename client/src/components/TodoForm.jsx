import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoForm = ({ onAddTodo, currentTodo, onUpdateTodo, onCancelEdit }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (currentTodo) {
      setText(currentTodo.text);
      
      // Debug current todo
      console.log('Current todo for editing:', currentTodo);
      
      // Ensure dueDate is correctly parsed from string to Date object
      if (currentTodo.dueDate) {
        try {
          const date = new Date(currentTodo.dueDate);
          console.log('Parsed date for editing:', date);
          setDueDate(date);
        } catch (error) {
          console.error('Error parsing date from currentTodo:', error);
          setDueDate(null);
        }
      } else {
        setDueDate(null);
      }
    } else {
      setText('');
      setDueDate(null);
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    if (currentTodo) {
      console.log('Updating todo with due date:', dueDate);
      // Convert Date object to ISO string for API
      const dueDateString = dueDate ? dueDate.toISOString() : null;
      console.log('Due date string for API:', dueDateString);
      onUpdateTodo(currentTodo._id, text, dueDateString);
    } else {
      console.log('Adding todo with due date:', dueDate);
      // Convert Date object to ISO string for API
      const dueDateString = dueDate ? dueDate.toISOString() : null;
      console.log('Due date string for API:', dueDateString);
      onAddTodo(text, dueDateString);
    }
    
    setText('');
    setDueDate(null);
  };

  const handleDateChange = (date) => {
    console.log("Date selected:", date);
    console.log("Date type:", date ? typeof date : 'null');
    if (date) {
      console.log("ISO string:", date.toISOString());
    }
    setDueDate(date);
  };

  return (
    <div className="bg-surface-2 p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="taskly-input w-full"
            data-testid="todo-input"
          />
          
          <div className="flex items-center space-x-2">
            <DatePicker
              selected={dueDate}
              onChange={handleDateChange}
              placeholderText="Set due date (optional)"
              dateFormat="MMM d, yyyy"
              className="taskly-input w-full"
              isClearable
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          
          {dueDate && (
            <div className="text-xs text-success">
              Due date set to: {dueDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          {currentTodo ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                Editing: {currentTodo.text.substring(0, 20)}{currentTodo.text.length > 20 ? '...' : ''}
              </span>
              <button
                type="button"
                onClick={() => {
                  setText('');
                  setDueDate(null);
                  onCancelEdit();
                }}
                className="text-xs px-2 py-1 bg-surface-3 text-text-secondary rounded hover:bg-surface-4 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div></div>
          )}
          
          <button
            type="submit"
            className="taskly-btn-primary flex items-center space-x-1"
            disabled={!text.trim()}
          >
            {currentTodo ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span>Update Task</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm; 