const Todo = require('../models/todoModel');

// @desc    Get user todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    console.log('Returning todos to client:', todos);
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error in getTodos:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
  try {
    console.log('Create todo request body:', req.body);
    
    if (!req.body.text) {
      return res.status(400).json({ message: 'Please add a text field' });
    }

    const todoData = {
      text: req.body.text,
      user: req.user.id,
    };

    // Add dueDate if provided
    if (req.body.dueDate) {
      console.log('Due date provided:', req.body.dueDate);
      todoData.dueDate = req.body.dueDate;
    }

    console.log('Creating todo with data:', todoData);
    const todo = await Todo.create(todoData);
    console.log('Created todo:', todo);

    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
  try {
    console.log('Update todo request - ID:', req.params.id, 'Body:', req.body);
    
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    console.log('Updated todo:', updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await todo.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
}; 