const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'Pending',
      assignedUser: req.user.id,
      dueDate: req.body.dueDate,
    });
    await task.save();
    const populatedTask = await task.populate('assignedUser', 'name email');
    res.json(populatedTask);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { status, search, startDate, endDate, page, limit } = req.query;
    const q = { assignedUser: req.user.id };

    if (status) q.status = status;
    if (search) q.title = { $regex: search, $options: 'i' };
    if (startDate || endDate) {
      q.dueDate = {};
      if (startDate) q.dueDate.$gte = new Date(startDate);
      if (endDate) q.dueDate.$lte = new Date(endDate);
    }

    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const [tasks, total] = await Promise.all([
        Task.find(q)
          .populate('assignedUser', 'name email')
          .sort({ dueDate: -1, createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit)),
        Task.countDocuments(q),
      ]);
      return res.json({
        tasks,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
      });
    }

    const tasks = await Task.find(q)
      .populate('assignedUser', 'name email')
      .sort({ dueDate: -1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, assignedUser: req.user.id })
      .populate('assignedUser', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignedUser: req.user.id,
      dueDate: req.body.dueDate,
    };
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedUser: req.user.id },
      updatedData,
      { new: true }
    ).populate('assignedUser', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, assignedUser: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
