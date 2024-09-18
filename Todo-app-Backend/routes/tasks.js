// routes/taskRoutes.js
import express from 'express';
const router = express.Router();
import Task from '../models/Task.js';
import Counter from '../models/Counter.js'; // For generating unique task IDs

// GET all tasks
router.get('/tasks', async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new task
router.post('/tasks', async (req, res) => {
  try {
    const { description, status, dueDate, priority, assignedTo } = req.body;

    // Ensure that 'assignedTo' is provided
    if (!assignedTo) {
      return res.status(400).json({ message: 'Task must be assigned to someone' });
    }

    // Increment task ID using Counter model
    const taskCounter = await Counter.findOneAndUpdate(
      { id: 'taskCounter' }, // Identifier for task counter
      { $inc: { seq: 1 } }, // Increment counter by 1
      { new: true, upsert: true } // Create counter if it doesn't exist
    );

    // Create new task
    const newTask = new Task({
      taskId: taskCounter.seq, 
      description,
      status,
      dueDate,
      priority,
      assignedTo,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a task by taskId
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, status, dueDate, priority, assignedTo } = req.body;

    // Ensure that 'assignedTo' is provided
    if (!assignedTo) {
      return res.status(400).json({ message: 'Task must be assigned to someone' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { taskId: id }, // Find task by taskId
      { description, status, dueDate, priority, assignedTo },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a task by taskId
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const taskToDelete = await Task.findOneAndDelete({ taskId: id });

    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
