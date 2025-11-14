const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import the Task Model

// @route   GET /api/tasks
// @desc    Get All Tasks
router.get('/', async (req, res) => {
  try {
    // Sort tasks by the most recently created
    const tasks = await Task.find().sort({ createdAt: -1 }); 
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// @route   POST /api/tasks
// @desc    Create A Task
router.post('/', async (req, res) => {
  const newTask = new Task({
    text: req.body.text // Get text from request body
  });

  try {
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    // 400 status if validation (e.g., missing 'text') fails
    res.status(400).json({ message: 'Error creating task: ' + err.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a Task (e.g., toggle completion status)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Can contain { text: 'new text' } or { completed: true }

  try {
    // { new: true } returns the updated document
    const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task: ' + err.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete A Task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task successfully deleted', deletedTask: task });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task: ' + err.message });
  }
});

module.exports = router;